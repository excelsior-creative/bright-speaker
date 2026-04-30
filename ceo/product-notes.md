# Product notes

_What the product actually is today, as of 2026-04-24. Keep accurate._

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
- **Styling**: Tailwind v4 with a single "sticker-brand" design
  system (cream background, hard 2.5px ink borders, chunky 4–6px drop
  shadows, Bricolage Grotesque display + Nunito body + JetBrains Mono
  utility). As of night 3 (2026-04-24), `/for-educators`,
  `/for-schools`, `/privacy`, `/terms`, `/contact`, and `/blog` have
  been ported to sticker-brand (`.btn`, `.btn-coral`, `.pill`,
  `.card`, `.feature-card`, `.step`, `.faq-item`, `.eyebrow`, `.lede`
  utilities from globals.css). The legacy warm-coral/warm-teal
  palette still cascades via CSS-variable aliases in `globals.css` so
  `/history`, `/dashboard`, `/speak`, and the individual blog posts
  continue to render fine; their visual reconciliation is queued
  (`CoachUI.tsx`, `/speak` recording UI, `/history` list still have
  the old warm-* visual treatment).
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
- `/for-educators` — sticker-brand as of 2026-04-24; leads with K–5
  classroom teachers + elementary principals/coaches; 6–12 audience
  demoted to an accordion block.
- `/for-schools` — sticker-brand as of 2026-04-24; hero says
  "Elementary speaking practice"; FAQ explicitly addresses "Is this
  K–5 only?" with a "K–5 first, K–12 compatible" answer; District
  step in the rollout path no longer pre-commits a signed DPA — says
  "DPA signed before any paid deployment goes live."
- `/privacy` — plain-English data-flow page. Explicitly non-legal.
- `/terms` — plain-language stub.
- `/contact` — mailto-backed (`hello@brightspeaker.com`). Phase 0.3 of
  the launch checklist replaces this with a real form.
- `/blog` — sticker-brand as of 2026-04-24. Three posts listed:
  why-pauses-beat-um (2026-04-24), five-minute-elementary-speaking-
  warmup (2026-04-20), reduce-filler-words-k12 (2026-04-17).
- `/blog/why-pauses-beat-um` — new K–5 explainer post, sticker-brand.
- `/blog/five-minute-elementary-speaking-warmup` — night-2 post;
  still on legacy warm-coral page-chrome. Queued for reconciliation.
- `/blog/reduce-filler-words-k12` — night-1 post; same as above.
- `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]` — Clerk pages.
- `/robots.ts`, `/sitemap.ts` — SEO basics.

## ICP shift recorded in PR #3

The landing page hero now says **"Built for ages 5–11"** and the
standards map shows **SL.K–SL.5**. This is a material shift from
night-1 strategy, which targeted ELA grades 4–8 and speech/debate
6–12. Reconciled in `strategy.md` and `decisions/0002-k5-primary-
wedge.md` on 2026-04-20.

## G-stack alignment (2026-04-29)

Brandon accepted Timmy's recommended G-stack path: BrightSpeaker is a
**teacher pilot tool first** and a **school/district edtech platform
second**. The first real workflow is teacher creates a class/code →
students practice → teacher sees results → pilot evidence can be
summarized for a principal. See `decisions/0003-teacher-pilot-to-school-
platform.md`.

Product implications:

- prioritize teacher class creation, class-code entry, persisted student
  sessions, teacher progress view, and pilot summary;
- keep the kid surface warm/simple: practice activities, feedback, XP,
  badges;
- keep feedback rule-based until LLM coaching is teacher-reviewed;
- treat privacy/data-flow documentation as part of the product surface;
- do not optimize for parent/B2C, adult coaching, live monitoring,
  speech therapy, or peer/multiplayer.

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
  as a thing to optionally tighten. Not shipped yet.

## Known issues / smells

- `/speak`, `/history`, `/dashboard`, and `CoachUI` still use the
  legacy warm-coral page-chrome. Queue for reconciliation.
- `startWebcam` error path still uses `alert()` (per LAUNCH_CHECKLIST
  2.x and existing backlog).
- Filler word list still over-flags younger students ("so", "well",
  "actually", "literally"). Backlog item for grade-band tuning. Must
  ship as a PR (feedback-logic change, kid-facing).
- Face-API weights load on every `/speak` visit. Cache via service
  worker.
- Silent failure on non-Web-Speech browsers (Firefox).
- `public/brand/favicon-source.png` is a 1.8 MB unused source file.
- `brightspeaker.com` still 403s to WebFetch — crawler/indexability
  unknown. Open ask in INBOX #1 (open 3 nights running).

## Lint / typecheck state (2026-04-24)

- `pnpm run lint` — 0 errors, 1 pre-existing warning
  (`layout.tsx:69` custom-font placement).
- `npx tsc --noEmit` — clean.
- `pnpm run test` — 2/2 pass.
- The previous `speak/page.tsx:304` "set-state-in-effect" lint error
  is fixed. The init-face-detection async work now runs inside an
  IIFE with a `cancelled` guard so the setState can't fire after
  unmount, and the lint rule no longer flags a synchronous setState
  path inside the effect body.
