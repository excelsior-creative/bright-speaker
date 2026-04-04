import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProgress, getSessions, saveSession, type SessionRecord } from "./sessions";

const storage = new Map<string, string>();

const localStorageMock = {
  getItem: vi.fn((key: string) => storage.get(key) ?? null),
  setItem: vi.fn((key: string, value: string) => {
    storage.set(key, value);
  }),
  removeItem: vi.fn((key: string) => {
    storage.delete(key);
  }),
  clear: vi.fn(() => {
    storage.clear();
  }),
};

beforeEach(() => {
  storage.clear();
  vi.clearAllMocks();
  Object.defineProperty(globalThis, "window", {
    value: globalThis,
    configurable: true,
  });
  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageMock,
    configurable: true,
  });
  Object.defineProperty(globalThis, "crypto", {
    value: { randomUUID: () => "session-1" },
    configurable: true,
  });
});

describe("saveSession rewards", () => {
  it("returns unlocked badges for a first strong session", () => {
    const result = saveSession({
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
    });

    expect(result.newBadges).toEqual([
      "First Speech",
      "Low Filler",
      "Eye Contact Pro",
    ]);
    expect(result.levelUp).toBeNull();
    expect(getProgress()).toMatchObject({
      level: 1,
      totalSessions: 1,
      xp: 45,
      badges: ["First Speech", "Low Filler", "Eye Contact Pro"],
    });
  });

  it("returns level-up metadata when a session crosses a threshold", () => {
    const existingSession: SessionRecord = {
      id: "existing",
      promptId: 2,
      promptTitle: "Describe Your Favorite Place",
      date: new Date("2026-04-03T12:00:00.000Z").toISOString(),
      score: 90,
      fillerCount: 0,
      fillerWords: [],
      duration: 60,
      eyeContactPercent: 90,
      wordsPerMinute: 115,
      xpEarned: 80,
      transcript: "My favorite place is the beach",
    };

    localStorage.setItem("bright_speaker_sessions", JSON.stringify([existingSession]));
    localStorage.setItem(
      "bright_speaker_progress",
      JSON.stringify({
        level: 1,
        xp: 80,
        totalSessions: 1,
        streak: 1,
        lastSessionDate: new Date().toDateString(),
        badges: ["First Speech"],
      })
    );

    const result = saveSession({
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
    });

    expect(result.levelUp).toEqual({ previousLevel: 1, newLevel: 2 });
    expect(result.newBadges).toEqual(["Level 2"]);
    expect(getProgress()).toMatchObject({
      level: 2,
      xp: 110,
      totalSessions: 2,
      badges: ["First Speech", "Level 2"],
    });
    expect(getSessions()[0].id).toBe("session-1");
  });
});
