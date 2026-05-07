import { describe, expect, it } from "vitest";
import { generateClassCode, normalizeClassCode, isSafeClassCode } from "./code";

describe("class code helpers", () => {
  it("generates kid-readable codes without ambiguous characters", () => {
    const codes = Array.from({ length: 100 }, () => generateClassCode("Mrs. Rivera - Grade 4"));

    expect(codes.every((code) => /^[A-HJ-NP-Z2-9]{6}$/.test(code))).toBe(true);
    expect(codes.every(isSafeClassCode)).toBe(true);
  });

  it("normalizes pasted codes and removes separators", () => {
    expect(normalizeClassCode(" rivera-7 ")).toBe("RIVERA7");
    expect(normalizeClassCode("ab cd 23")).toBe("ABCD23");
  });

  it("rejects ambiguous classroom codes", () => {
    expect(isSafeClassCode("CLASS1")).toBe(false);
    expect(isSafeClassCode("HELLO0")).toBe(false);
    expect(isSafeClassCode("SAFE27")).toBe(true);
  });
});
