# Product notes

_What the product actually is today, as of 2026-04-20. Keep accurate._

## Repo layout

**As of 2026-04-19 the repo is a pnpm monorepo managed by Turbo.** The
app now lives at `apps/app/`. The top-level `/app` directory from night 1
has been moved into `apps/app/`. Any docs that say "`src/app/page.tsx`"
now mean `apps/app/src/app/page.tsx`.

Top-level files:

- `package.json` + `pnpm-workspace.yaml` + `turbo.json` — monorepo
  plumbing.
- `apps/app/` — the Next.js app.
- `PRD.md` — original product doc.
- `LAUNCH_CHECKLIST.md` — Brandon's ordered path from today's state to
  a first paid pilot. Read this before planning product work.

## Stack

- **Framework**: Next.js 16.1.6 App Router, React 19, TypeScript 5.
- **Styling**: Tailwind v4. The landing page now uses a distinct
  "sticker-brand" design system (cream background, hard borders,
  high-contrast sun/coral/blue fills, chunky drop shadows). The
  older warm-coral/warm-teal palette still lives on `/for-schools`,
  `/for-educators`, `/privacy`, `/terms`, `/contact`, `/blog`,
  `/history`, `/dashboard`, `/speak`. **This is a design-system split
  that should be reconciled** — see backlog.
- **Auth**: Clerk (`@clerk/nextjs` ^7.0.4). Middleware at
  `apps/app/src/proxy.ts` wraps everything with `clerkMiddleware()`.
  `apps/app/src/app/sign-in/[[...sign-in]]/page.tsx` and `.../sign-up/`
  pages exist and render Clerk components. **No routes are gated yet**
  — `/dashboard`, `/speak`, `/history` remain publicly accessible.
  `SiteNav` renders `SignInButton` + `SignUpButton`; the dashboard has
  its own layout that wires a `UserButton`.
- **Database**: `@neondatabase/auth` in deps; no server code reads or
  writes a DB. Session state remains in `localStorage`.
- **Speech-to-text**: Web Speech API (`webkitSpeechRecognition`),
  client-side only. In Chrome this streams audio to Google —
  disclosed on `/privacy` and (as of tonight) on the homepage panel.
- **Face detection**: `face-api.js` ^0.22.2, `tinyFaceDetector`
  weights in `apps/app/public/models`. "Eye contact" = face box
  centered horizontally in the video frame. Not gaze tracking.
- **Hosting**: Vercel. Domain `brightspeaker.com` returned 403 to
  WebFetch on 2026-04-20 (still). Either deployment protection or a
  WAF rule. Open ask in INBOX #1.
- **Testing**: Vitest. `apps/app/src/lib/sessions.test.ts` covers
  reward/level logic. 2/2 green.

## Routes (under `apps/app/src/app/`)

- `/` — sticker-brand landing page. Hero ("A personal speech coach for
  every kid in the room"), value strip, 4-step how-it-works,
  feature grid, Common Core SL.K–SL.5 standards map, privacy dark-mode
  section, audience tabs (teachers/admins/parents), who-it's-for,
  pricing (Classroom $4 / School $3 / District "let's talk"), FAQ,
  footer CTA.
- `/dashboard` — level/XP card, prompts grid, recent sessions, badges.
  Now wrapped in a `dashboard/layout.tsx` that uses the app header.
- `/speak?prompt=N` — three-phase flow: prep → recording (60s) →
  results. Webcam preview, live transcript, live filler counter, live
  eye-contact pill.
- `/history` — full session list, expandable; clear-history button.
- `/for-educators`, `/for-schools` — still on the older warm-coral/
  warm-teal design. Copy is on the honest side.
- `/privacy` — plain-English data-flow page. Explicitly non-legal.
- `/terms` — plain-language stub.
- `/contact` — mailto-backed (`hello@brightspeaker.com`). Phase 0.3 of
  the launch checklist replaces this with a real form.
- `/blog`, `/blog/reduce-filler-words-k12` — first post.
- `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]` — Clerk pages.
- `/robots.ts`, `/sitemap.ts` — SEO basics.

## ICP shift recorded in PR #3

The landing page hero now says **"Built for ages 5–11"** and the
standards map shows **SL.K–SL.5**. This is a material shift from
night-1 strategy, which targeted ELA grades 4–8 and speech/debate
6–12. Reconciled in `strategy.md` and `decisions/0002-k5-primary-
wedge.md` on 2026-04-20.

## Data model (current, client-side)

Unchanged from night 1. `localStorage` keys `bright_speaker_sessions`
and `bright_speaker_progress`, capped at 100 sessions.

**Implication**: Data is per-browser, not per-user. A pilot needs
Phase 1 of `LAUNCH_CHECKLIST.md` (Clerk roles + Neon schema + server
actions).

## Scoring formula

Unchanged. `apps/app/src/app/speak/page.tsx:calculateScore`:

- Start at 100.
- Subtract `min(fillerCount * 5, 40)` for filler words.
- +10 if eye contact ≥ 80%; −20 if < 50%.
- +10 if WPM in [100, 160]; −10 if WPM > 180 or < 80.
- Clamp to [0, 100].

XP = `round(score / 2)` per session. Level thresholds in
`apps/app/src/lib/sessions.ts`: `[0, 100, 250, 500, 1000, 2000, 5000]`.

## Badges

Unchanged: "First Speech", "Streak 3", "Streak 7", "Level 2",
"10 Sessions", "Low Filler", "Eye Contact Pro".

## AI feedback

**Still rule-based; no LLM call.** The `if/else` ladder in
`speak/page.tsx` is unchanged. LLM layer stays roadmap-only until we
have teacher review per OKR 1.2.

## What's honest on the site now (2026-04-20)

Tonight's honesty pass on the homepage:

- Removed "MediaPipe" claims (we use `face-api.js`). Replaced with
  "in-browser face detection." Also cleared "MediaPipe classroom" from
  the SEO keyword list and the coaching-feature photo caption.
- Replaced "Built for COPPA" / "Built for FERPA" pills with "Private
  by design" / "On-device video" / "No ad tracking" / "No student
  data sold." Compliance.md is explicit that we don't claim COPPA/
  FERPA until we have a formal review.
- Removed "signed DPAs" + "full-day audit log" from the Privacy list
  (neither exists). Disclosed Google Web Speech API ASR explicitly in
  the public panel.
- Tightened hero + STEPS copy that claimed "posture, pacing, volume"
  — posture and volume aren't implemented. Now says "eye contact,
  filler words, and pacing."
- Pricing tiers:
  - School: "Clever, ClassLink, Google" SSO → "Google Workspace for
    Education SSO" only, with a small caveat below the tier listing
    some items are on the near-term roadmap.
  - District: "SOC 2 Type II & security review" → "Security review
    on request," with a pre-launch disclosure below.
- `AudienceTabs.tsx`: removed "Signed DPA, SOC 2 Type II" claim,
  "80+ activities" (we have 6), "Clever + ClassLink SSO," and the
  parent-email + at-home features that don't exist.
- `SiteFooter.tsx`: "COPPA & FERPA" footer link → "Data & student
  records"; "DPA" link → "DPA (on request)" → routes to `/contact`.

## Still overclaiming somewhere

- `apps/app/src/components/CoachUI.tsx` is a mock with "Mrs. Rivera"
  + animated fake metrics. Called out in LAUNCH_CHECKLIST Appendix A
  as a thing to optionally tighten. Not shipped tonight.
- `/for-schools` still uses warm-coral/warm-teal; hasn't been
  reconciled against the sticker-brand homepage. Copy is honest.

## Known issues / smells

- The `/for-schools` and `/for-educators` pages live in a different
  design system than the homepage. Needs an unified visual pass.
- `startWebcam` error path still uses `alert()` (per LAUNCH_CHECKLIST
  2.x and existing backlog).
- Filler word list still over-flags younger students ("so", "well",
  "actually", "literally"). Backlog item for grade-band tuning.
- Face-API weights load on every `/speak` visit. Cache via service
  worker.
- Silent failure on non-Web-Speech browsers (Firefox).
- `public/brand/favicon-source.png` is a 1.8 MB unused source file.
- `brightspeaker.com` still 403s to WebFetch — crawler/indexability
  unknown. Open ask in INBOX.
