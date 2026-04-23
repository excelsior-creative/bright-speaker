# Backlog

_Unscheduled. Tag with area. Groom weekly; promote to roadmap when ready._

## Product — practice flow

- [P][a11y] Add `aria-live` region to live filler count and timer so
  screen readers announce updates.
- [P][a11y] Keyboard-accessible "End Session" (focusable, Enter to
  activate; already a button, verify focus styles).
- [P][ux] "Watch Demo" button on landing currently does nothing. Either
  wire to a short Loom or remove until we have one.
- [P][bug] `startWebcam` error path just `alert()`s. Replace with a
  friendly in-page state that explains how to grant permission,
  with a retry button.
- [P][bug] If speech recognition isn't supported (Safari, Firefox
  historically), the user sees a silent failure. Detect and show a
  "please use Chrome on your school Chromebook" message.
- [P][bug] Filler word "so" and "well" are over-flagged; they're often
  legitimate speech. Tune the detector.
- [P][bug] `liveFillerCount` counts `"actually"` and `"literally"` —
  age-inappropriate flagging for younger students. Consider a grade-
  band-tuned filler list.
- [P][perf] `tinyFaceDetector` weights are loaded on every `/speak`
  visit. Cache via service worker or preload on dashboard.
- [P][ux] Session length fixed at 60s; add 30s and 90s options per PRD.
- [P][ux] Prompt library is 6 prompts. Expand to 30+ with grade-band
  tagging (K–2, 3–5, 6–8, 9–12).
- [P][ux] Results screen "Try Again" resets state but doesn't restart
  the stopwatch cleanly; verify.
- [P][content] Feedback tips are static. When we add LLM feedback,
  bake "about the speaking, not the speaker" into the prompt.

## Product — auth / data

- [P][auth] Clerk is installed but doesn't gate anything. `/dashboard`
  and `/speak` are accessible without sign-in.
- [P][auth] Wire Google Workspace for Education SSO (Clerk supports
  Google SSO; need Workspace admin-consent flow for school domains).
- [P][data] Migrate session history from localStorage to a server-side
  DB scoped to the authed user. (Neon DB is in `package.json`; not
  wired up yet.)
- [P][data] Add a teacher role and a class concept.

## GTM / marketing

- [G][site] ~~Add a pricing page (pilot-only framing for now).~~
  Done 2026-04-23 as `/pilot` with "After the pilot" tier section.
- [G][site] Add a "Trust & privacy" page explaining data flows in
  plain language.
- [G][site] Add a case-study template page so we can ship a case
  study the minute we have one.
- [G][site] OG image + Twitter card for social shares.
- [G][seo] Robots + sitemap + indexable. Currently 403'd from our
  own WebFetch bot — confirm with Brandon the site is publicly
  reachable.
- [G][content] Blog posts:
  - ~~How to help middle-schoolers reduce filler words.~~ Shipped
    night 1 as `/blog/reduce-filler-words-k12`.
  - A 10-minute weekly speaking drill for ELA classrooms.
  - Speech & debate practice on a budget.
  - What research actually says about practice-based speaking
    improvement in K-12.
  - Case-study template page for the first pilot's day-30 report.
  - FAQ page for pilots (companion to `/pilot`).
- [G][outreach] Enrich the ICP list. Start with NSDA coach directory
  and state speech association rosters.
- [G][outreach] Draft a summer-pilot pitch for fall launches.

## Trust / compliance

- [T] Data flow diagram: camera, mic, ASR, face detection, storage.
- [T] COPPA checklist: parental consent mechanism for <13 if we ever
  ship direct-to-student signup.
- [T] FERPA sub-processor list (Clerk, Vercel, Neon).
- [T] Data deletion flow (on teacher/student request).
- [T] Retention policy (how long do we keep transcripts / scores?).
- [T] Plain-English privacy explainer (not the legal policy; a public
  page a teacher can skim in 30 seconds).

## Infrastructure / hygiene

- [P][infra] Add CI: typecheck, lint, test, build on every PR.
- [P][infra] Add basic error logging (Sentry or similar) — gate on
  approval because it's a third-party data processor.
- [P][infra] Bundle-size budget for `/speak` (face-api.js is ~2MB).
- [P][infra] Preview-deploys per branch via Vercel.
