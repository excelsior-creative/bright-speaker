export type GradeBand = "K-2" | "3-5" | "6-12";

// Developmentally tuned filler lists. Younger bands keep a shorter
// list so normal childhood speech patterns (like "like") aren't
// flagged as a problem.
const PROFILES: Record<GradeBand, readonly string[]> = {
  "K-2": ["um", "uh"],
  "3-5": ["um", "uh", "er", "ah", "like"],
  "6-12": ["um", "uh", "er", "ah", "like", "you know", "i mean", "sort of", "kind of"],
};

export const DEFAULT_GRADE_BAND: GradeBand = "3-5";

export function fillerWordsFor(band: GradeBand = DEFAULT_GRADE_BAND): readonly string[] {
  return PROFILES[band] ?? PROFILES[DEFAULT_GRADE_BAND];
}

export function countFillers(transcript: string, band: GradeBand = DEFAULT_GRADE_BAND): number {
  const list = fillerWordsFor(band);
  return list.reduce((count, filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, "gi");
    return count + (transcript.match(regex)?.length ?? 0);
  }, 0);
}

export function analyzeFillers(
  transcript: string,
  band: GradeBand = DEFAULT_GRADE_BAND
): { word: string; count: number }[] {
  const list = fillerWordsFor(band);
  const results: { word: string; count: number }[] = [];
  list.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, "gi");
    const matches = transcript.match(regex);
    if (matches && matches.length > 0) {
      results.push({ word: filler, count: matches.length });
    }
  });
  return results;
}
