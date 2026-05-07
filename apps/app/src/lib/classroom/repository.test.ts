import { beforeEach, describe, expect, it } from "vitest";
import { createInMemoryClassroomRepository } from "./repository";

describe("classroom repository", () => {
  let repo: ReturnType<typeof createInMemoryClassroomRepository>;

  beforeEach(() => {
    repo = createInMemoryClassroomRepository();
  });

  it("keeps teacher classes isolated by Clerk user id", async () => {
    const first = await repo.createClass({ teacherUserId: "teacher_a", name: "Mrs. Rivera - Grade 4", gradeBand: "3-5" });
    await repo.createClass({ teacherUserId: "teacher_b", name: "Mr. Lee - Grade 5", gradeBand: "3-5" });

    await expect(repo.getClassForTeacher(first.id, "teacher_b")).resolves.toBeNull();
    await expect(repo.listClassesForTeacher("teacher_a")).resolves.toHaveLength(1);
    await expect(repo.listClassesForTeacher("teacher_b")).resolves.toHaveLength(1);
  });

  it("lets a student join with a normalized active class code", async () => {
    const klass = await repo.createClass({ teacherUserId: "teacher_a", name: "Mrs. Rivera - Grade 4", gradeBand: "3-5" });

    const join = await repo.joinClass({ classCode: klass.code.toLowerCase(), displayName: "Ana" });

    expect(join).not.toBeNull();
    expect(join?.classroom.id).toBe(klass.id);
    expect(join?.student.displayName).toBe("Ana");
    expect(join?.student.joinToken).toHaveLength(32);
  });

  it("rejects archived class codes", async () => {
    const klass = await repo.createClass({ teacherUserId: "teacher_a", name: "Archived class" });
    await repo.archiveClass(klass.id, "teacher_a");

    await expect(repo.joinClass({ classCode: klass.code, displayName: "Ana" })).resolves.toBeNull();
  });

  it("persists privacy-minimized sessions only for the matching class and student token", async () => {
    const klass = await repo.createClass({ teacherUserId: "teacher_a", name: "Mrs. Rivera - Grade 4" });
    const join = await repo.joinClass({ classCode: klass.code, displayName: "Ana" });
    expect(join).not.toBeNull();

    const saved = await repo.recordPracticeSession({
      classCode: klass.code,
      joinToken: join!.student.joinToken,
      promptId: 1,
      promptTitle: "Tell a Funny Story",
      score: 88,
      fillerCount: 1,
      durationSeconds: 60,
      eyeContactPercent: 75,
      wordsPerMinute: 120,
      xpEarned: 44,
      transcriptExcerpt: "One time our class...",
    });

    expect(saved?.transcriptExcerpt).toBe("One time our class...");
    expect(saved).not.toHaveProperty("audio");
    await expect(repo.recordPracticeSession({ ...saved!, classCode: "BAD123", joinToken: join!.student.joinToken })).resolves.toBeNull();
  });

  it("summarizes class progress for a teacher", async () => {
    const klass = await repo.createClass({ teacherUserId: "teacher_a", name: "Mrs. Rivera - Grade 4" });
    const ana = await repo.joinClass({ classCode: klass.code, displayName: "Ana" });
    const ben = await repo.joinClass({ classCode: klass.code, displayName: "Ben" });
    await repo.recordPracticeSession({ classCode: klass.code, joinToken: ana!.student.joinToken, promptId: 1, promptTitle: "Story", score: 80, fillerCount: 2, durationSeconds: 50, eyeContactPercent: 70, wordsPerMinute: 110, xpEarned: 40 });
    await repo.recordPracticeSession({ classCode: klass.code, joinToken: ben!.student.joinToken, promptId: 2, promptTitle: "Place", score: 90, fillerCount: 0, durationSeconds: 60, eyeContactPercent: 82, wordsPerMinute: 130, xpEarned: 45 });

    const summary = await repo.getClassProgress(klass.id, "teacher_a");

    expect(summary?.students).toHaveLength(2);
    expect(summary?.totals.sessionCount).toBe(2);
    expect(summary?.totals.averageScore).toBe(85);
    await expect(repo.getClassProgress(klass.id, "teacher_b")).resolves.toBeNull();
  });
});
