import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Forbidden-strings regression test for the honesty pass.
 *
 * Every time we redesign a page, over-optimistic compliance or product
 * claims tend to sneak back in. This test is the "checklist as code"
 * proposed in ceo/journal/2026-04-20.md: it scans the app source for
 * claims we are not allowed to make until they are actually true.
 *
 * If a legitimate future use of one of these terms exists (e.g. a
 * blog post comparing us to MediaPipe, or a real signed Student
 * Privacy Pledge), update `FORBIDDEN` accordingly — but only with
 * sign-off that the underlying claim is real.
 */

const SRC_ROOT = join(__dirname, "..");
const APP_ROOT = join(SRC_ROOT, "..");

// Files / directories to skip when scanning. The test file itself is
// excluded because it necessarily contains every forbidden string.
const SKIP = new Set([
  "node_modules",
  ".next",
  ".turbo",
  "honesty.test.ts",
]);

const EXT_RE = /\.(tsx?|mdx?|css)$/;

type Forbidden = {
  /** Pattern to search for. String = case-insensitive exact match. */
  needle: string | RegExp;
  /** Why this claim is forbidden — printed on failure. */
  reason: string;
};

/**
 * Lines that legitimately contain a forbidden word in an honest-disclaimer
 * context (e.g. "we do not hold SOC 2 certification"). These are explicit
 * per-line escapes; prefer rewriting copy to avoid the forbidden term if
 * you can, and only add to this list for clearly negative/future-tense
 * statements that a reasonable educator would not read as a live claim.
 */
const ALLOW_LINE_PATTERNS: RegExp[] = [
  /not currently hold SOC 2/i,
  /no SOC 2 attestation yet/i,
  /or a SOC 2 report/i,
  /Clever and ClassLink rostering are on the roadmap/i,
];

const FORBIDDEN: Forbidden[] = [
  {
    needle: "MediaPipe",
    reason:
      "We use face-api.js, not MediaPipe. Removed from marketing copy in the night-2 honesty pass.",
  },
  {
    needle: /\bSOC ?2\b/i,
    reason:
      "No SOC 2 attestation exists. Do not list SOC 2 as an included feature, certification, or capability.",
  },
  {
    needle: "Student Privacy Pledge",
    reason:
      "Not signed. Claiming membership in the pledge is false until Brandon signs.",
  },
  {
    needle: /Built for (COPPA|FERPA)/i,
    reason:
      "No COPPA or FERPA formal review has been completed. Use 'Private by design' instead.",
  },
  {
    needle: /COPPA[- ]compliant/i,
    reason:
      "We do not claim COPPA compliance until a formal review has been completed.",
  },
  {
    needle: /FERPA[- ](compliant|ready|certified)/i,
    reason:
      "We do not claim FERPA compliance/readiness/certification until a formal review has been completed.",
  },
  {
    needle: /\bClever\b/,
    reason:
      "Clever SSO/rostering is not integrated. Do not list Clever as an available feature.",
  },
  {
    needle: /\bClassLink\b/,
    reason:
      "ClassLink SSO/rostering is not integrated. Do not list ClassLink as an available feature.",
  },
  {
    needle: /mrs\.?[- ]?rivera/i,
    reason:
      "Fabricated teacher name from the homepage mock (full name or URL slug). Flagged in LAUNCH_CHECKLIST Appendix A; use a generic label like 'classroom demo'.",
  },
  {
    needle: /80\+\s+(activities|prompts)/i,
    reason:
      "The prompt library has 6 entries, not 80+. Do not inflate.",
  },
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, acc);
    } else if (EXT_RE.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

function findMatches(
  content: string,
  pattern: string | RegExp,
): { line: number; text: string }[] {
  const lines = content.split("\n");
  const matches: { line: number; text: string }[] = [];
  const re =
    typeof pattern === "string"
      ? new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
      : new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  for (let i = 0; i < lines.length; i++) {
    if (!re.test(lines[i])) continue;
    re.lastIndex = 0;
    if (ALLOW_LINE_PATTERNS.some((allow) => allow.test(lines[i]))) continue;
    matches.push({ line: i + 1, text: lines[i].trim() });
  }
  return matches;
}

describe("honesty pass (forbidden strings)", () => {
  const files = walk(SRC_ROOT);

  for (const { needle, reason } of FORBIDDEN) {
    const label =
      typeof needle === "string" ? `"${needle}"` : `/${needle.source}/`;
    it(`app source does not contain ${label}`, () => {
      const hits: string[] = [];
      for (const file of files) {
        const content = readFileSync(file, "utf8");
        const matches = findMatches(content, needle);
        for (const m of matches) {
          const rel = relative(APP_ROOT, file);
          hits.push(`  ${rel}:${m.line}  ${m.text}`);
        }
      }
      if (hits.length > 0) {
        throw new Error(
          `Forbidden claim ${label} appears in the source:\n${hits.join(
            "\n",
          )}\n\nWhy this is forbidden:\n  ${reason}\n\nIf the underlying claim has become true, update apps/app/src/lib/honesty.test.ts with sign-off.`,
        );
      }
      expect(hits).toEqual([]);
    });
  }
});
