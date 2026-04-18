import { describe, it, expect } from "vitest";
import { analyzeTranscript, countFillers, FILLER_WORDS } from "./fillerWords";

describe("fillerWords — kid-appropriate list", () => {
  it("counts true disfluencies", () => {
    const t = "Um, so I was like, uh, thinking about it, you know?";
    // um (1), uh (1), like (1), you know (1) = 4
    expect(countFillers(t)).toBe(4);
  });

  it("does NOT flag legitimate kid speech like 'so', 'well', 'yeah', 'right'", () => {
    const t =
      "Well, first you need bread. So then you add peanut butter. Yeah, right in the middle.";
    expect(countFillers(t)).toBe(0);
  });

  it("does NOT flag 'actually', 'literally', 'basically'", () => {
    const t = "Actually my favorite dog is literally the best. Basically it's a mutt.";
    expect(countFillers(t)).toBe(0);
  });

  it("is case-insensitive and whole-word only", () => {
    expect(countFillers("Uh oh, UMbrella!")).toBe(1); // "Uh" only; "UMbrella" excluded
  });

  it("handles multi-word tics like 'you know'", () => {
    const t = "I was, you know, going to the store, you know, with my mom.";
    expect(countFillers(t)).toBe(2);
  });

  it("returns analyzed breakdown sorted by count", () => {
    const t = "um uh um like uh um you know";
    const result = analyzeTranscript(t);
    expect(result[0]).toEqual({ word: "um", count: 3 });
    // uh (2), like (1), you know (1) — order among ties is stable on count
    expect(result.map((m) => m.word)).toContain("uh");
    expect(result.map((m) => m.word)).toContain("like");
    expect(result.map((m) => m.word)).toContain("you know");
  });

  it("empty transcript yields zero", () => {
    expect(countFillers("")).toBe(0);
    expect(analyzeTranscript("")).toEqual([]);
  });

  it("exports a non-empty filler list", () => {
    expect(FILLER_WORDS.length).toBeGreaterThan(0);
  });
});
