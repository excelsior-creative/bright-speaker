# Product notes

_What the product actually is today, as of 2026-04-18. Keep accurate._

## Stack

- **Framework**: Next.js 16.1.6 App Router, React 19, TypeScript 5.
- **Styling**: Tailwind v4 with a custom "Playful & Warm" palette
  (`warm-coral`, `warm-gold`, `warm-teal`, `warm-purple`) in
  `src/app/globals.css`.
- **Auth**: Clerk (`@clerk/nextjs` ^7.0.4). Middleware at
  `src/proxy.ts` wraps everything with `clerkMiddleware()` but **no
  routes are actually gated**. Sign-in/up buttons render in the
  header but `/dashboard`, `/speak`, `/history` are publicly
  accessible today.
- **Database**: `@neondatabase/auth` in deps but **no server code
  reads or writes a DB**. All session state is in browser
  `localStorage`.
- **Speech-to-text**: Web Speech API (`webkitSpeechRecognition`),
  client-side only. Falls back silently on unsupported browsers.
- **Face detection**: `face-api.js` ^0.22.2, `tinyFaceDetector`
  weights loaded from `/public/models`. Client-side only. "Eye
  contact" is detected as "face box horizontally within the
  center 60% of the video frame" — not true gaze tracking.
- **Hosting**: Vercel (inferred from Next.js conventions; domain
  `brightspeaker.com` is live but returned 403 to WebFetch on
  2026-04-17 — verify deployment status with Brandon).
- **Testing**: Vitest; one test file (`sessions.test.ts`) covers
  reward/level logic.

## Routes

- `/` — landing page. Parent-flavored hero ("Help Your Child…").
  Features cards, "How It Works" 4-step strip, CTA block, footer.
  Footer has `href="#"` stubs for Privacy / Terms / Contact
  (broken).
- `/dashboard` — level/XP card, prompts grid (6 prompts, filterable
  by Easy/Medium/Hard), recent sessions, badges.
- `/speak?prompt=N` — three phases: `prep` → `recording` (60s fixed)
  → `results`. Webcam preview, live transcript, live filler count,
  live eye-contact pill.
- `/history` — full session list, expandable; clear-history button.
- `/practice` — 301 redirect to `/speak` (via `next.config.ts`).
- `/for-educators`, `/for-schools` — educator-facing landing pages
  (shipped night 1).
- `/pilot` — dedicated 30-day classroom pilot page (shipped
  night 2). Linked from nav, footer, homepage CTA, and both
  educator landing pages.
- `/blog`, `/blog/reduce-filler-words-k12`,
  `/blog/ten-minute-weekly-speaking-drill` — classroom resources
  (2 posts as of night 2).
- `/privacy`, `/terms`, `/contact` — plain-English stubs. No
  formal compliance claims.

## Data model (current, client-side)

Keys in `localStorage`:

- `bright_speaker_sessions` — array of `SessionRecord`:
  `{ id, promptId, promptTitle, date, score, fillerCount,
     fillerWords[], duration, eyeContactPercent, wordsPerMinute,
     xpEarned, transcript }`. Capped at 100 most recent.
- `bright_speaker_progress` — `UserProgress`:
  `{ level, xp, totalSessions, streak, lastSessionDate, badges[] }`.

**Implication**: Data is per-browser, not per-user. Clearing cookies
or switching devices wipes progress. Not suitable for a pilot.

## Filler-word detection (updated night 2)

Canonical list lives in `src/lib/fillerWords.ts`, covered by
`src/lib/fillerWords.test.ts` (8 tests).

**Counted:**
- Core disfluencies: `um, uh, er, erm, hmm, uhh, umm`.
- Common verbal tics: `like`, `you know`.

**Explicitly NOT counted** (tuned night 2 because they
over-flagged normal kid speech):
- `so`, `well`, `yeah`, `right`, `actually`, `literally`,
  `basically`.

Detection is case-insensitive with whole-word boundaries.
Multi-word tics ("you know") are safe-escaped before regex.

## Scoring formula

In `src/app/speak/page.tsx:calculateScore`:

- Start at 100.
- Subtract `min(fillerCount * 5, 40)` for filler words.
- +10 if eye contact ≥ 80%; −20 if < 50%.
- +10 if WPM in [100, 160]; −10 if WPM > 180 or < 80.
- Clamp to [0, 100].

XP = `round(score / 2)` per session.

## Level thresholds

In `src/lib/sessions.ts`: `[0, 100, 250, 500, 1000, 2000, 5000]`
XP cumulative for levels 1–7.

## Badges (all static strings today)

- "First Speech" (first session)
- "Streak 3" / "Streak 7"
- "Level 2"
- "10 Sessions"
- "Low Filler" (≤2 fillers in a session)
- "Eye Contact Pro" (≥80% in a session)

## AI feedback (important)

**There is no actual LLM call in the product today.** Despite the
PRD's mention of Claude API feedback, the "tips for next time" on
the results screen are a small `if/else` ladder in `speak/page.tsx`:

- `fillerCount > 3` → "Try pausing instead of saying um or like"
- `eyeContactPercent < 70` → "Practice looking right at the camera"
- `wordsPerMinute > 160` → "Slow down a bit — take your time!"
- `wordsPerMinute < 100` → "Try to speak a little faster with more
  energy"
- Always: "Great job completing this session!"

Before we ship any LLM-generated feedback to a student, we need a
teacher to review the prompt and the output shape. See
`compliance.md` and `okrs.md` KR 1.2.

## Known issues / smells

- Home link in `app/page.tsx` uses the `Play` icon import that's
  mostly decorative; harmless but dead weight.
- Face-API weights (~300KB+ per shard) are loaded on every
  `/speak` visit. Candidate for service-worker or preload
  caching. Bumped to night 3+.
- Eye contact detection is a face-box centering proxy, not gaze.
  Honest-copy on the results screen is fine; don't market it
  as "eye tracking."
- Live site (`brightspeaker.com`) returned 403 to WebFetch on
  2026-04-17 and again on 2026-04-18. Still open with Brandon.

## Fixed on night 2 (2026-04-18)

- `alert()` on webcam failure → inline kid-friendly error panel
  with a retry button, three distinct error states
  (permission / device / unknown).
- Silent failure when Web Speech API is unsupported → detects
  Safari/Firefox on load and renders an inline "Use Chrome"
  notice before the student starts a session.
- Over-flagged filler words (`so, well, yeah, right, actually,
  literally, basically`) → removed from the detection list;
  see Filler-word detection section above.
- `/speak` a11y gaps → skip link to main, `aria-label` on the
  countdown timer, `aria-live="polite"` on the live filler
  counter, `aria-hidden` on decorative icons.
