import { describe, expect, it } from "vitest";
import {
  LEVELS,
  getLevelDefinition,
  getLevelProgress,
  getNextMilestone,
  getRecommendedQuest,
} from "./progression";

describe("game progression", () => {
  it("maps XP to named levels with next-level progress", () => {
    const progress = getLevelProgress(110);

    expect(progress.currentLevel.level).toBe(2);
    expect(progress.currentLevel.name).toBe("Warm-Up Wanderer");
    expect(progress.nextLevel?.level).toBe(3);
    expect(progress.xpIntoLevel).toBe(10);
    expect(progress.xpForThisLevel).toBe(150);
    expect(progress.percentToNextLevel).toBe(7);
  });

  it("caps max-level progress without inventing a missing next level", () => {
    const progress = getLevelProgress(9000);

    expect(progress.currentLevel).toEqual(LEVELS.at(-1));
    expect(progress.nextLevel).toBeNull();
    expect(progress.xpToNextLevel).toBe(0);
    expect(progress.percentToNextLevel).toBe(100);
  });

  it("returns the next visible milestone for badges, streaks, and levels", () => {
    expect(getNextMilestone({ level: 2, xp: 110, totalSessions: 4, streak: 2, lastSessionDate: null, badges: ["First Speech"] })).toMatchObject({
      label: "3-day streak",
      remaining: 1,
    });

    expect(getNextMilestone({ level: 3, xp: 260, totalSessions: 8, streak: 4, lastSessionDate: null, badges: ["First Speech", "Streak 3"] })).toMatchObject({
      label: "10 Sessions badge",
      remaining: 2,
    });
  });

  it("recommends quests from the student's current level", () => {
    expect(getRecommendedQuest({ level: 1, xp: 0, totalSessions: 0, streak: 0, lastSessionDate: null, badges: [] })).toMatchObject({
      promptId: 1,
      title: "First Spark Quest",
    });

    expect(getRecommendedQuest({ level: 5, xp: 1000, totalSessions: 12, streak: 5, lastSessionDate: null, badges: [] })).toMatchObject({
      promptId: 5,
      title: "Debate Arena",
    });
  });

  it("falls back to level one for invalid level lookups", () => {
    expect(getLevelDefinition(0)).toEqual(LEVELS[0]);
    expect(getLevelDefinition(99)).toEqual(LEVELS.at(-1));
  });
});
