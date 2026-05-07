interface PilotSummaryInput {
  className: string;
  studentCount: number;
  sessionCount: number;
  averageScore: number | null;
  averageSessionsPerStudent: number;
  dateRange: string;
  topPrompts: string[];
}

export function buildPilotSummary(input: PilotSummaryInput): string {
  const scoreLine = input.averageScore === null
    ? "The class has not completed a scored practice session yet."
    : `Average practice score is ${input.averageScore}/100 across completed sessions.`;
  const promptLine = input.topPrompts.length
    ? `Most-used prompts: ${input.topPrompts.join(", ")}.`
    : "Prompt usage will appear after students complete practice sessions.";

  return [
    `BrightSpeaker pilot snapshot: ${input.className}`,
    `Date range: ${input.dateRange}.`,
    `${input.studentCount} students joined and completed ${input.sessionCount} practice sessions (${input.averageSessionsPerStudent} sessions per student).`,
    scoreLine,
    promptLine,
    "Interpretation: this snapshot shows classroom engagement and speaking-practice completion only. It should be used as early pilot evidence, not as proof of academic gains.",
    "Suggested next step: run the routine weekly, compare participation over time, and collect teacher notes before expanding beyond the first classroom.",
  ].join("\n\n");
}
