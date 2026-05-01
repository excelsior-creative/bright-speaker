import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Regression guard for compliance and capability claims that keep
// sneaking back into public copy during redesigns. Edit with care;
// if a claim becomes true (formally backed), remove the pattern
// here AND add the supporting artifact in /ceo/compliance.md.
//
// Any file that needs to legitimately contain these strings as data
// (this test file, for example) should include the marker
// "honesty-allowlist" in a comment near the top.
const FORBIDDEN: { label: string; pattern: RegExp }[] = [
  { label: "MediaPipe reference (we use face-api.js)", pattern: /mediapipe/i },
  // "SOC 2" on its own is fine in honest denials ("we don't hold SOC 2 certification");
  // the overclaims that keep creeping back are the specific assertive forms.
  { label: "'SOC 2 Type II' / 'SOC 2 certified' / 'SOC 2 compliant' claim", pattern: /SOC\s*2\s*(Type\s*II|certified|compliant)\b/i },
  { label: "Student Privacy Pledge claim", pattern: /Student Privacy Pledge/i },
  { label: "'COPPA certified' / 'COPPA compliant'", pattern: /COPPA[\s-]*(certified|compliant)/i },
  { label: "'FERPA certified' / 'FERPA compliant'", pattern: /FERPA[\s-]*(certified|compliant)/i },
  { label: "'Built for COPPA' / 'Built for FERPA'", pattern: /Built for (COPPA|FERPA)/i },
  { label: "Clever SSO claim (not implemented)", pattern: /Clever\s+SSO/i },
  { label: "ClassLink SSO claim (not implemented)", pattern: /ClassLink\s+SSO/i },
];

// "signed DPA" is only acceptable with the "on request" qualifier.
const SIGNED_DPA = /signed\s+DPA(?!\s*\(on request\))/i;
const ALLOWLIST_MARKER = "honesty-allowlist";

const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".turbo", "models", "dist", "build"]);
const INCLUDE_EXT = new Set([".tsx", ".ts", ".mdx", ".md"]);

// vitest runs with cwd = the package root (apps/app), so derive the
// source tree from there. This is stable across ESM/CJS resolution.
const APP_ROOT = process.cwd();
const SRC = path.join(APP_ROOT, "src");

function walk(dir: string, acc: string[] = []): string[] {
  let entries: string[] = [];
  try { entries = readdirSync(dir); } catch { return acc; }
  for (const name of entries) {
    if (EXCLUDE_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    let s;
    try { s = statSync(full); } catch { continue; }
    if (s.isDirectory()) {
      walk(full, acc);
    } else if (INCLUDE_EXT.has(path.extname(name))) {
      acc.push(full);
    }
  }
  return acc;
}

function scanFiles(): { file: string; content: string }[] {
  const files = walk(SRC);
  return files.map(file => ({ file, content: readFileSync(file, "utf8") }))
    .filter(({ content }) => !content.includes(ALLOWLIST_MARKER));
}

// honesty-allowlist: this file intentionally contains the forbidden
// strings as regex data; the marker above excludes it from its own scan.
describe("honesty regression — public copy must not drift into unverifiable claims", () => {
  const scanned = scanFiles();

  it("finds source files to scan (sanity)", () => {
    expect(scanned.length).toBeGreaterThan(5);
  });

  for (const { label, pattern } of FORBIDDEN) {
    it(`never appears in source: ${label}`, () => {
      const hits: string[] = [];
      for (const { file, content } of scanned) {
        const lines = content.split(/\r?\n/);
        lines.forEach((line, idx) => {
          if (pattern.test(line)) {
            const rel = path.relative(APP_ROOT, file);
            hits.push(`${rel}:${idx + 1}: ${line.trim()}`);
          }
        });
      }
      expect(hits, `Forbidden pattern "${label}" found:\n${hits.join("\n")}`).toEqual([]);
    });
  }

  it("'signed DPA' only appears qualified as '(on request)'", () => {
    const hits: string[] = [];
    for (const { file, content } of scanned) {
      const lines = content.split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (SIGNED_DPA.test(line)) {
          const rel = path.relative(APP_ROOT, file);
          hits.push(`${rel}:${idx + 1}: ${line.trim()}`);
        }
      });
    }
    expect(hits, `Unqualified "signed DPA" found (should be "DPA (on request)"):\n${hits.join("\n")}`).toEqual([]);
  });
});
