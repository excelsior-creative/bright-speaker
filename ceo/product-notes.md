# Product notes

_What the product actually is today, as of 2026-04-17. Keep accurate._

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
- "Watch Demo" button does nothing.
- Footer Privacy / Terms / Contact links are `href="#"`.
- Silent failure on speech-API unsupported browsers.
- Filler word list includes `"so"`, `"well"`, `"yeah"`, `"actually"`,
  `"literally"` — over-flags normal speech for younger kids.
- Face-API weights (~300KB+ per shard) are loaded on every
  `/speak` visit.
- `startWebcam` uses `alert()` on failure — not great UX for kids.
- Brand pages (`/for-schools`, `/for-educators`, privacy, terms,
  contact) don't exist yet — **shipped tonight (2026-04-17)**.
- No sitemap, robots, or OG image. **Shipped tonight.**
- Live site (`brightspeaker.com`) returned 403 to WebFetch on
  2026-04-17. Might be Vercel deployment protection / preview
  gating. **Flag to Brandon.**
