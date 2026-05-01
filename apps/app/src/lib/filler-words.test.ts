import { describe, it, expect } from "vitest";
import { analyzeFillers, countFillers, fillerWordsFor, DEFAULT_GRADE_BAND } from "./filler-words";

describe("filler-words", () => {
  describe("fillerWordsFor", () => {
    it("K-2 only flags 'um' and 'uh' so normal kid speech isn't penalized", () => {
      const list = fillerWordsFor("K-2");
      expect(list).toEqual(["um", "uh"]);
      expect(list).not.toContain("like");
      expect(list).not.toContain("sort of");
    });

    it("3-5 adds a few more but still excludes conversational fillers", () => {
      const list = fillerWordsFor("3-5");
      expect(list).toContain("like");
      expect(list).not.toContain("you know");
      expect(list).not.toContain("i mean");
    });

    it("6-12 includes the full adult-grade list", () => {
      const list = fillerWordsFor("6-12");
      expect(list).toContain("you know");
      expect(list).toContain("i mean");
      expect(list).toContain("sort of");
      expect(list).toContain("kind of");
    });

    it("defaults to the middle band (3-5) when called without a band", () => {
      expect(DEFAULT_GRADE_BAND).toBe("3-5");
      expect(fillerWordsFor()).toEqual(fillerWordsFor("3-5"));
    });
  });

  describe("countFillers", () => {
    it("counts only band-appropriate fillers in K-2", () => {
      const transcript = "um I like my dog uh you know he is so cool";
      // K-2 counts only "um" and "uh" → 2
      expect(countFillers(transcript, "K-2")).toBe(2);
    });

    it("adds 'like' in 3-5", () => {
      const transcript = "um I like my dog uh you know he is so cool";
      // 3-5 counts "um", "like", "uh" → 3
      expect(countFillers(transcript, "3-5")).toBe(3);
    });

    it("counts multi-word fillers correctly in 6-12", () => {
      const transcript = "um I mean like you know sort of kind of uh";
      // "um", "i mean", "like", "you know", "sort of", "kind of", "uh" → 7
      expect(countFillers(transcript, "6-12")).toBe(7);
    });

    it("is case-insensitive and uses word boundaries", () => {
      // "umbrella" should NOT match "um"; "Like." should match "like".
      const transcript = "Um, I took my umbrella. Like, it was raining.";
      expect(countFillers(transcript, "3-5")).toBe(2);
    });
  });

  describe("analyzeFillers", () => {
    it("returns per-word counts only for band-appropriate words", () => {
      const transcript = "um um uh like like like you know";
      const k2 = analyzeFillers(transcript, "K-2");
      expect(k2).toEqual([
        { word: "um", count: 2 },
        { word: "uh", count: 1 },
      ]);

      const g35 = analyzeFillers(transcript, "3-5");
      expect(g35).toContainEqual({ word: "like", count: 3 });
      expect(g35.some(f => f.word === "you know")).toBe(false);
    });

    it("skips fillers with zero matches", () => {
      const transcript = "I walked home";
      expect(analyzeFillers(transcript, "6-12")).toEqual([]);
    });
  });
});
