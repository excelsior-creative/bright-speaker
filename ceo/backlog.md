# Backlog

_Unscheduled. Tag with area. Groom weekly; promote to roadmap when ready._

## Product — practice flow

- [P][a11y] Keyboard-accessible "End Session" (focusable, Enter to
  activate; already a button, verify focus styles). Baseline a11y
  (skip link, aria-live, aria-hidden icons) shipped night 2.
- [P][a11y] Focus management across phase transitions
  (prep → recording → results). A screen-reader user should land
  on the new heading each phase.
- [P][perf] `tinyFaceDetector` weights are loaded on every `/speak`
  visit. Cache via service worker or preload on dashboard.
  Requires testing on a cold cache.
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

- [G][site] Add a case-study template page so we can ship a case
  study the minute we have one.
- [G][site] Design a real OG image (currently metadata set; need
  actual image assets at `/og/*`).
- [G][site] `/for-speech-debate` coach-specific landing page
  (expand the Night-1 coach outreach draft into a page).
- [G][seo] Confirm brightspeaker.com is indexable — still 403 as
  of night 2. Open ask to Brandon.
- [G][content] Blog posts — tracked:
  - ✅ How to help middle-schoolers reduce filler words (night 1).
  - ✅ A 10-minute weekly speaking drill for ELA classrooms (night 2).
  - Speech & debate practice on a budget.
  - What research actually says about practice-based speaking
    improvement in K-12.
  - "Eye contact" for middle schoolers: what we're actually
    teaching when we teach it.
- [G][outreach] Enrich the ICP list. Start with NSDA coach directory
  and state speech association rosters. **Deferred two nights —
  pick up first on the next night with research tool access.**
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
