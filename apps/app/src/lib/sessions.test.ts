import { describe, expect, it } from "vitest";
import {
  applySessionToProgress,
  computeLevel,
  defaultProgress,
  getXpForNextLevel,
} from "./sessions-types";

const TODAY = "Sun Apr 19 2026";
const YESTERDAY = "Sat Apr 18 2026";

describe("applySessionToProgress", () => {
  it("unlocks first-session, low-filler, and eye-contact badges on a strong first session", () => {
    const result = applySessionToProgress({
      progress: defaultProgress(),
      session: {
        promptId: 1,
        promptTitle: "Tell a Funny Story",
        score: 90,
        fillerCount: 1,
        fillerWords: [{ word: "um", count: 1 }],
        duration: 60,
        eyeContactPercent: 92,
        wordsPerMinute: 120,
        xpEarned: 45,
        transcript: "One time I told a fun story",
      },
      today: TODAY,
      yesterday: YESTERDAY,
    });

    expect(result.newBadges).toEqual([
      "First Speech",
      "Low Filler",
      "Eye Contact Pro",
    ]);
    expect(result.levelUp).toBeNull();
    expect(result.progress).toMatchObject({
      level: 1,
      totalSessions: 1,
      xp: 45,
      streak: 1,
      badges: ["First Speech", "Low Filler", "Eye Contact Pro"],
    });
  });

  it("reports levelUp and Level 2 badge when xp crosses the threshold", () => {
    const starting = {
      level: 1,
      xp: 80,
      totalSessions: 1,
      streak: 1,
      lastSessionDate: YESTERDAY,
      badges: ["First Speech"],
    };

    const result = applySessionToProgress({
      progress: starting,
      session: {
        promptId: 3,
        promptTitle: "Explain How to Make a Sandwich",
        score: 80,
        fillerCount: 3,
        fillerWords: [{ word: "like", count: 3 }],
        duration: 60,
        eyeContactPercent: 75,
        wordsPerMinute: 130,
        xpEarned: 30,
        transcript: "First you get bread and peanut butter",
      },
      today: TODAY,
      yesterday: YESTERDAY,
    });

    expect(result.levelUp).toEqual({ previousLevel: 1, newLevel: 2 });
    expect(result.newBadges).toEqual(["Level 2"]);
    expect(result.progress).toMatchObject({
      level: 2,
      xp: 110,
      totalSessions: 2,
      streak: 2,
      badges: ["First Speech", "Level 2"],
    });
  });

  it("does not mutate the progress object passed in", () => {
    const starting = defaultProgress();
    applySessionToProgress({
      progress: starting,
      session: {
        promptId: 1,
        promptTitle: "t",
        score: 50,
        fillerCount: 5,
        fillerWords: [],
        duration: 60,
        eyeContactPercent: 40,
        wordsPerMinute: 100,
        xpEarned: 25,
        transcript: "",
      },
      today: TODAY,
      yesterday: YESTERDAY,
    });
    expect(starting).toEqual(defaultProgress());
  });
});

describe("level math", () => {
  it("computeLevel maps xp to the right tier", () => {
    expect(computeLevel(0)).toBe(1);
    expect(computeLevel(99)).toBe(1);
    expect(computeLevel(100)).toBe(2);
    expect(computeLevel(5000)).toBe(7);
    expect(computeLevel(99999)).toBe(7);
  });

  it("getXpForNextLevel returns the next threshold", () => {
    expect(getXpForNextLevel(1)).toBe(100);
    expect(getXpForNextLevel(2)).toBe(250);
    expect(getXpForNextLevel(7)).toBe(9999);
  });
});
