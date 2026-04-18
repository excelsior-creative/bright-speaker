/**
 * Kid-appropriate filler-word detection.
 *
 * Rationale: adult public-speaking tools often flag "so", "well", "yeah",
 * "right", "actually", "literally", "basically" as fillers. For K-12 speech,
 * those words are frequently legitimate — "Well, first you need flour..." is
 * a valid transition, not a tic. Over-flagging punishes normal kid speech
 * and undercuts the goal of building confidence. We stick to true
 * disfluencies and one common verbal tic ("like", "you know").
 */

export type FillerWord = string;

const CORE_FILLERS: FillerWord[] = [
  // True disfluencies — across grade bands.
  "um",
  "uh",
  "er",
  "erm",
  "hmm",
  "uhh",
  "umm",
];

const TIC_FILLERS: FillerWord[] = [
  // Common verbal tics we do count, but only at threshold (see below).
  "like",
  "you know",
];

export const FILLER_WORDS: FillerWord[] = [...CORE_FILLERS, ...TIC_FILLERS];

export interface FillerMatch {
  word: FillerWord;
  count: number;
}

/**
 * Count filler occurrences in a transcript. Case-insensitive; whole-word
 * boundaries. We escape any regex-special characters so multi-word tics
 * ("you know") and apostrophe-bearing words stay safe.
 */
export function countFillers(transcript: string): number {
  return FILLER_WORDS.reduce((count, filler) => {
    return count + matchCount(transcript, filler);
  }, 0);
}

export function analyzeTranscript(transcript: string): FillerMatch[] {
  return FILLER_WORDS
    .map((word) => ({ word, count: matchCount(transcript, word) }))
    .filter((m) => m.count > 0)
    .sort((a, b) => b.count - a.count);
}

function matchCount(transcript: string, filler: string): number {
  const escaped = filler.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");
  return transcript.match(regex)?.length ?? 0;
}
