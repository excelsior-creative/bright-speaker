---
title: Phase 0 Trust/Data-Flow Documentation
status: ready
risk_tier: R1
owner: Peter
created: 2026-04-27
source:
  - ceo/roadmap.md#now-this-month
  - ceo/backlog.md#trust--compliance
  - LAUNCH_CHECKLIST.md#06-legal-content-review
okr:
  - KR 4.2
  - KR 5.1
  - KR 5.3
---

# Phase 0 Trust/Data-Flow Documentation Spec

## Outcome

BrightSpeaker has a plain-English, internally accurate trust/data-flow artifact that an educator can review before a pilot conversation. It should document every current student-data touchpoint, make clear that student video stays on-device today, and identify the formal COPPA/FERPA/legal gaps that still require Brandon/counsel before paid district pilots.

## Current state

- `ceo/compliance.md` exists but needs a concise data-flow section tied to the current product behavior.
- Public `/privacy` and `/terms` pages are honest pre-launch stubs, not counsel-reviewed policies.
- Current `/speak` implementation uses camera/mic in-browser, `face-api.js` models served from `/models`, browser Web Speech API for transcript capture where supported, and localStorage via `apps/app/src/lib/sessions.ts` for session history/progress.
- Roadmap/OKRs explicitly call for data-flow documentation and a public trust stance.

## Scope

1. Update `ceo/compliance.md` with a Phase 0 data-flow table covering:
   - camera/video frames
   - microphone/audio stream
   - browser speech recognition/transcript text
   - face detection/eye-contact signal
   - session scores and progress history
   - auth/account providers currently present but not fully gated
   - hosting/runtime providers visible in the repo
2. Add a short "educator trust summary" draft suitable for later public copy.
3. Add explicit COPPA/FERPA/privacy gaps and decisions needed before real student pilots.
4. Cross-link the relevant backlog/launch checklist items so later agents know what was satisfied and what remains blocked.

## Non-goals

- Do not replace the public privacy policy or terms with legal language.
- Do not add new subprocessors, analytics, error tracking, CRM, or lead-form vendors.
- Do not change product code, data storage, auth, or production deployment.
- Do not claim compliance certification, Student Privacy Pledge status, SOC 2, signed DPA, or counsel review.

## Risk tier and approval evidence

- Effective tier: **R1** because this is internal documentation and non-binding draft copy only.
- Escalates to **R4** if the work publishes legal/compliance claims publicly, enables student data collection, adds third-party processors, changes retention/deletion commitments, or handles actual child/student data.
- Approval evidence for R1: Brandon's 2026-04-27 Slack instruction in `#cb-brightspeaker` to move the project forward, plus this checked-in spec.
- Required before public/client-facing use: Brandon approval and counsel/privacy review for any legal-policy language.

## Acceptance criteria

- [ ] `ceo/compliance.md` contains a current-state data-flow table with capture/source, processing location, storage/retention, third parties, user-facing promise, and open gap for each data type.
- [ ] The doc explicitly states whether student video leaves the browser in the current implementation, with file references backing the claim.
- [ ] The doc explicitly states that Web Speech API behavior may send audio/transcript processing to the browser vendor and that this is a district-trust gap until a final STT strategy is chosen.
- [ ] The doc includes a short educator-facing trust summary labeled as draft/non-legal copy.
- [ ] The doc lists COPPA/FERPA/DPA/retention/deletion open decisions without claiming completion.
- [ ] No production code, public legal copy, deployment settings, or third-party services are changed.

## Verification plan

1. Inspect `apps/app/src/app/speak/page.tsx` and `apps/app/src/lib/sessions.ts` to confirm the data-flow statements match current code.
2. Run `git diff --check`.
3. No app tests required if only `ceo/compliance.md` changes; if public page copy is touched, run `pnpm lint` and `pnpm build`.
4. Reviewer checks for over-claims: no "COPPA compliant," "FERPA compliant," "DPA ready," "Student Privacy Pledge signer," or "lawyer reviewed" language.

## Implementation slices

### Slice 1 — Current-state evidence pass

- Read:
  - `apps/app/src/app/speak/page.tsx`
  - `apps/app/src/lib/sessions.ts`
  - `apps/app/src/app/privacy/page.tsx`
  - `apps/app/src/app/terms/page.tsx`
  - `package.json`
  - `apps/app/package.json`
- Capture specific line/file references for camera/mic access, Web Speech API usage, localStorage, face-api, Clerk/Neon presence.

### Slice 2 — Compliance doc update

- Modify: `ceo/compliance.md`
- Add a "Phase 0 current data flow" section with a markdown table.
- Add a "Draft educator trust summary" section.
- Add a "Before first real student pilot" checklist.

### Slice 3 — Review and handoff

- Run `git diff --check`.
- Append a journal note summarizing the doc update and remaining blockers.
- Create/hand off PR to Quinn for over-claim review.

## Restart notes

If paused, restart by reading this spec, then diffing `ceo/compliance.md`. Do not publish public trust/legal copy without explicit Brandon/counsel approval.