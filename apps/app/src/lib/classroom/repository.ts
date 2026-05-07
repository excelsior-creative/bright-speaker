import { neon } from "@neondatabase/serverless";
import { generateClassCode, normalizeClassCode } from "./code";
import type {
  ClassProgress,
  Classroom,
  ClassStudent,
  CreateClassInput,
  JoinedClassroom,
  JoinClassInput,
  PracticeSession,
  RecordPracticeSessionInput,
} from "./types";

type Sql = ReturnType<typeof neon>;
type DbRow = Record<string, unknown>;

async function queryRows(sqlQuery: Promise<unknown>): Promise<DbRow[]> {
  return (await sqlQuery) as DbRow[];
}

export interface ClassroomRepository {
  createClass(input: CreateClassInput): Promise<Classroom>;
  listClassesForTeacher(teacherUserId: string): Promise<Classroom[]>;
  getClassForTeacher(classId: string, teacherUserId: string): Promise<Classroom | null>;
  archiveClass(classId: string, teacherUserId: string): Promise<boolean>;
  joinClass(input: JoinClassInput): Promise<JoinedClassroom | null>;
  recordPracticeSession(input: RecordPracticeSessionInput): Promise<PracticeSession | null>;
  getClassProgress(classId: string, teacherUserId: string): Promise<ClassProgress | null>;
}

const globalStore = globalThis as typeof globalThis & { __brightSpeakerClassroomRepo?: ClassroomRepository };

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
}

function now() {
  return new Date().toISOString();
}

function cleanName(name: string, fallback: string) {
  const cleaned = name.trim().replace(/\s+/g, " ").slice(0, 80);
  return cleaned || fallback;
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

function toClass(row: Record<string, unknown>): Classroom {
  return {
    id: String(row.id),
    teacherUserId: String(row.teacher_user_id),
    name: String(row.name),
    code: String(row.code),
    gradeBand: row.grade_band ? (String(row.grade_band) as Classroom["gradeBand"]) : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
    archivedAt: row.archived_at ? new Date(String(row.archived_at)).toISOString() : null,
  };
}

function toStudent(row: Record<string, unknown>): ClassStudent {
  return {
    id: String(row.id),
    classId: String(row.class_id),
    displayName: String(row.display_name),
    joinToken: String(row.join_token),
    createdAt: new Date(String(row.created_at)).toISOString(),
    deletedAt: row.deleted_at ? new Date(String(row.deleted_at)).toISOString() : null,
  };
}

function toSession(row: Record<string, unknown>): PracticeSession {
  return {
    id: String(row.id),
    classId: String(row.class_id),
    studentId: String(row.student_id),
    promptId: Number(row.prompt_id),
    promptTitle: String(row.prompt_title),
    score: Number(row.score),
    fillerCount: Number(row.filler_count),
    durationSeconds: Number(row.duration_seconds),
    eyeContactPercent: Number(row.eye_contact_percent),
    wordsPerMinute: Number(row.words_per_minute),
    xpEarned: Number(row.xp_earned),
    transcriptExcerpt: row.transcript_excerpt ? String(row.transcript_excerpt) : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

function buildProgress(classroom: Classroom, students: ClassStudent[], sessions: PracticeSession[]): ClassProgress {
  const rows = students
    .filter((student) => !student.deletedAt)
    .map((student) => {
      const mine = sessions
        .filter((session) => session.studentId === student.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const averageScore = mine.length ? Math.round(mine.reduce((sum, session) => sum + session.score, 0) / mine.length) : null;
      return {
        student,
        latestSession: mine[0] ?? null,
        totalSessions: mine.length,
        averageScore,
        bestScore: mine.length ? Math.max(...mine.map((session) => session.score)) : null,
        lastPromptTitle: mine[0]?.promptTitle ?? null,
      };
    });

  const sortedSessions = [...sessions].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const promptCounts = new Map<string, number>();
  for (const session of sessions) promptCounts.set(session.promptTitle, (promptCounts.get(session.promptTitle) ?? 0) + 1);
  const averageScore = sessions.length ? Math.round(sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length) : null;
  const dateRange = sortedSessions.length
    ? `${new Date(sortedSessions[0].createdAt).toLocaleDateString()} – ${new Date(sortedSessions[sortedSessions.length - 1].createdAt).toLocaleDateString()}`
    : "No practice yet";

  return {
    classroom,
    students: rows,
    totals: {
      studentCount: rows.length,
      sessionCount: sessions.length,
      averageScore,
      averageSessionsPerStudent: rows.length ? Number((sessions.length / rows.length).toFixed(1)) : 0,
      dateRange,
      topPrompts: [...promptCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([prompt]) => prompt),
    },
  };
}

function normalizeSessionInput(input: RecordPracticeSessionInput) {
  return {
    classCode: normalizeClassCode(input.classCode),
    joinToken: input.joinToken.trim(),
    promptId: clampNumber(input.promptId, 1, 999),
    promptTitle: cleanName(input.promptTitle, "Speaking practice"),
    score: clampNumber(input.score, 0, 100),
    fillerCount: clampNumber(input.fillerCount, 0, 999),
    durationSeconds: clampNumber(input.durationSeconds, 0, 600),
    eyeContactPercent: clampNumber(input.eyeContactPercent, -1, 100),
    wordsPerMinute: clampNumber(input.wordsPerMinute, 0, 400),
    xpEarned: clampNumber(input.xpEarned, 0, 1000),
    transcriptExcerpt: input.transcriptExcerpt ? input.transcriptExcerpt.trim().slice(0, 280) : null,
  };
}

export function createInMemoryClassroomRepository(): ClassroomRepository {
  const classes: Classroom[] = [];
  const students: ClassStudent[] = [];
  const sessions: PracticeSession[] = [];

  return {
    async createClass(input) {
      let code = generateClassCode(input.name);
      while (classes.some((klass) => klass.code === code)) code = generateClassCode(input.name);
      const classroom: Classroom = {
        id: id("cls"),
        teacherUserId: input.teacherUserId,
        name: cleanName(input.name, "Untitled class"),
        code,
        gradeBand: input.gradeBand ?? null,
        createdAt: now(),
        archivedAt: null,
      };
      classes.push(classroom);
      return classroom;
    },
    async listClassesForTeacher(teacherUserId) {
      return classes.filter((klass) => klass.teacherUserId === teacherUserId && !klass.archivedAt).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getClassForTeacher(classId, teacherUserId) {
      return classes.find((klass) => klass.id === classId && klass.teacherUserId === teacherUserId) ?? null;
    },
    async archiveClass(classId, teacherUserId) {
      const classroom = classes.find((klass) => klass.id === classId && klass.teacherUserId === teacherUserId);
      if (!classroom) return false;
      classroom.archivedAt = now();
      return true;
    },
    async joinClass(input) {
      const code = normalizeClassCode(input.classCode);
      const classroom = classes.find((klass) => klass.code === code && !klass.archivedAt);
      if (!classroom) return null;
      const student: ClassStudent = {
        id: id("stu"),
        classId: classroom.id,
        displayName: cleanName(input.displayName, "Student").slice(0, 32),
        joinToken: crypto.randomUUID().replace(/-/g, ""),
        createdAt: now(),
        deletedAt: null,
      };
      students.push(student);
      return { classroom, student };
    },
    async recordPracticeSession(input) {
      const clean = normalizeSessionInput(input);
      const classroom = classes.find((klass) => klass.code === clean.classCode && !klass.archivedAt);
      if (!classroom) return null;
      const student = students.find((candidate) => candidate.classId === classroom.id && candidate.joinToken === clean.joinToken && !candidate.deletedAt);
      if (!student) return null;
      const session: PracticeSession = {
        id: id("ses"),
        classId: classroom.id,
        studentId: student.id,
        promptId: clean.promptId,
        promptTitle: clean.promptTitle,
        score: clean.score,
        fillerCount: clean.fillerCount,
        durationSeconds: clean.durationSeconds,
        eyeContactPercent: clean.eyeContactPercent,
        wordsPerMinute: clean.wordsPerMinute,
        xpEarned: clean.xpEarned,
        transcriptExcerpt: clean.transcriptExcerpt,
        createdAt: now(),
      };
      sessions.push(session);
      return session;
    },
    async getClassProgress(classId, teacherUserId) {
      const classroom = classes.find((klass) => klass.id === classId && klass.teacherUserId === teacherUserId);
      if (!classroom) return null;
      const classStudents = students.filter((student) => student.classId === classId);
      const classSessions = sessions.filter((session) => session.classId === classId);
      return buildProgress(classroom, classStudents, classSessions);
    },
  };
}

class NeonClassroomRepository implements ClassroomRepository {
  constructor(private sql: Sql) {}

  async createClass(input: CreateClassInput): Promise<Classroom> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = generateClassCode(input.name);
      try {
        const rows = await queryRows(this.sql`
          insert into classroom_classes (id, teacher_user_id, name, code, grade_band)
          values (${id("cls")}, ${input.teacherUserId}, ${cleanName(input.name, "Untitled class")}, ${code}, ${input.gradeBand ?? null})
          returning *
        `);
        return toClass(rows[0]);
      } catch (error) {
        if (attempt === 4) throw error;
      }
    }
    throw new Error("Unable to generate a unique class code");
  }

  async listClassesForTeacher(teacherUserId: string): Promise<Classroom[]> {
    const rows = await queryRows(this.sql`select * from classroom_classes where teacher_user_id = ${teacherUserId} and archived_at is null order by created_at desc`);
    return rows.map((row) => toClass(row));
  }

  async getClassForTeacher(classId: string, teacherUserId: string): Promise<Classroom | null> {
    const rows = await queryRows(this.sql`select * from classroom_classes where id = ${classId} and teacher_user_id = ${teacherUserId} limit 1`);
    return rows[0] ? toClass(rows[0]) : null;
  }

  async archiveClass(classId: string, teacherUserId: string): Promise<boolean> {
    const rows = await queryRows(this.sql`update classroom_classes set archived_at = now() where id = ${classId} and teacher_user_id = ${teacherUserId} returning id`);
    return rows.length > 0;
  }

  async joinClass(input: JoinClassInput): Promise<JoinedClassroom | null> {
    const classroomRows = await queryRows(this.sql`select * from classroom_classes where code = ${normalizeClassCode(input.classCode)} and archived_at is null limit 1`);
    if (!classroomRows[0]) return null;
    const classroom = toClass(classroomRows[0]);
    const studentRows = await queryRows(this.sql`
      insert into classroom_students (id, class_id, display_name, join_token)
      values (${id("stu")}, ${classroom.id}, ${cleanName(input.displayName, "Student").slice(0, 32)}, ${crypto.randomUUID().replace(/-/g, "")})
      returning *
    `);
    return { classroom, student: toStudent(studentRows[0]) };
  }

  async recordPracticeSession(input: RecordPracticeSessionInput): Promise<PracticeSession | null> {
    const clean = normalizeSessionInput(input);
    const rows = await queryRows(this.sql`
      select s.*, c.id as class_id
      from classroom_students s
      join classroom_classes c on c.id = s.class_id
      where c.code = ${clean.classCode}
        and c.archived_at is null
        and s.join_token = ${clean.joinToken}
        and s.deleted_at is null
      limit 1
    `);
    if (!rows[0]) return null;
    const student = toStudent(rows[0]);
    const saved = await queryRows(this.sql`
      insert into classroom_practice_sessions (
        id, class_id, student_id, prompt_id, prompt_title, score, filler_count,
        duration_seconds, eye_contact_percent, words_per_minute, xp_earned, transcript_excerpt
      ) values (
        ${id("ses")}, ${student.classId}, ${student.id}, ${clean.promptId}, ${clean.promptTitle}, ${clean.score}, ${clean.fillerCount},
        ${clean.durationSeconds}, ${clean.eyeContactPercent}, ${clean.wordsPerMinute}, ${clean.xpEarned}, ${clean.transcriptExcerpt}
      ) returning *
    `);
    return toSession(saved[0]);
  }

  async getClassProgress(classId: string, teacherUserId: string): Promise<ClassProgress | null> {
    const classroom = await this.getClassForTeacher(classId, teacherUserId);
    if (!classroom) return null;
    const studentRows = await queryRows(this.sql`select * from classroom_students where class_id = ${classId} and deleted_at is null order by created_at asc`);
    const sessionRows = await queryRows(this.sql`select * from classroom_practice_sessions where class_id = ${classId} order by created_at desc`);
    return buildProgress(
      classroom,
      studentRows.map((row) => toStudent(row)),
      sessionRows.map((row) => toSession(row)),
    );
  }
}

export function getClassroomRepository(): ClassroomRepository {
  if (process.env.DATABASE_URL) return new NeonClassroomRepository(neon(process.env.DATABASE_URL));
  globalStore.__brightSpeakerClassroomRepo ??= createInMemoryClassroomRepository();
  return globalStore.__brightSpeakerClassroomRepo;
}
