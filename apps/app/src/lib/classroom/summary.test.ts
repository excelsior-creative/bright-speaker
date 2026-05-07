import { describe, expect, it } from "vitest";
import { buildPilotSummary } from "./summary";

describe("pilot summary", () => {
  it("turns classroom metrics into a principal-ready, non-claimy summary", () => {
    const summary = buildPilotSummary({
      className: "Mrs. Rivera - Grade 4",
      studentCount: 4,
      sessionCount: 10,
      averageScore: 82,
      averageSessionsPerStudent: 2.5,
      dateRange: "May 1–May 30",
      topPrompts: ["Tell a Funny Story", "Describe Your Favorite Place"],
    });

    expect(summary).toContain("Mrs. Rivera - Grade 4");
    expect(summary).toContain("10 practice sessions");
    expect(summary).toContain("2.5 sessions per student");
    expect(summary).not.toMatch(/proved|guaranteed|certified|formal learning-outcomes claim/i);
  });
});
