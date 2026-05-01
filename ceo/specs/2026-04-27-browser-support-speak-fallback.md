---
title: Browser Support and /speak Graceful Fallback
status: ready
risk_tier: R2
owner: Devon
reviewer: Quinn
created: 2026-04-27
source:
  - ceo/backlog.md#product--practice-flow
  - LAUNCH_CHECKLIST.md#08-pre-flight-smoke-test
  - LAUNCH_CHECKLIST.md#23-browser-support-matrix
okr:
  - KR 1.1
  - KR 4.4
---

# Browser Support and `/speak` Graceful Fallback Spec

## Outcome

Students and teachers get a clear, friendly, in-page explanation when `/speak` cannot record because the browser lacks camera/mic access or Web Speech support. The current silent Web Speech failure is eliminated, and the product has a small browser-support matrix that can later feed the `/for-schools` FAQ.

## Current state

- `apps/app/src/app/speak/page.tsx` already handles `navigator.mediaDevices.getUserMedia` absence and several camera/mic permission errors through `mediaError`.
- `initSpeechRecognition()` silently does nothing when `SpeechRecognition` / `webkitSpeechRecognition` is unavailable.
- `startRecording()` calls `initSpeechRecognition()`, enters recording, starts webcam, and starts the timer even if no speech recognition object exists.
- Launch checklist calls out Firefox/unsupported-browser graceful error as Phase 0.8 and browser support matrix as Phase 2.3.

## Scope

1. Add explicit speech-recognition support detection before entering recording.
2. Show a kid-friendly + teacher-useful in-page fallback when speech recognition is unsupported.
3. Keep the app from starting a scored session if it cannot capture transcript today.
4. Improve speech-recognition runtime error handling enough that common failures become visible instead of console-only.
5. Add/update lightweight tests for the support-detection helper.
6. Add a browser-support note in `ceo/compliance.md` or a small `ceo/browser-support.md` document for current verified/expected behavior.

## Non-goals

- Do not add a new speech-to-text provider.
- Do not send audio to a new third-party service.
- Do not change scoring methodology beyond preventing unsupported sessions from starting.
- Do not build full on-device STT or Whisper/WebGPU support.
- Do not change auth, persistence, teacher dashboard, or production deploy settings.

## Risk tier and approval evidence

- Effective tier: **R2** because this changes student-facing practice UX around camera/mic/speech capture but does not introduce new vendors, storage, accounts, or production deployment.
- Escalates to **R4** if the implementation adds third-party STT, persists new student data, changes privacy/retention commitments, enables real student pilots, or modifies auth/account flows.
- Approval evidence to implement: Brandon's 2026-04-27 Slack instruction in `#cb-brightspeaker` to move the project forward, plus this checked-in spec.
- Production deployment remains a separate gate; do not deploy without the repo's required approval evidence.

## Acceptance criteria

- [ ] Unsupported speech-recognition browsers see an in-page alert before recording starts; no silent failure and no scoring timer starts.
- [ ] The alert says Chrome/Edge on a Chromebook/laptop is the recommended path for the current pilot and avoids blaming the child.
- [ ] Camera/mic permission failures still show the existing friendly in-page error with a retry path.
- [ ] `recognition.onerror` maps common errors (`not-allowed`, `audio-capture`, `network`, `no-speech`, default) to visible, understandable messages.
- [ ] The "Start Speaking" button remains keyboard-accessible and can be clicked again after a recoverable error.
- [ ] At least one unit test covers the speech-recognition support helper for supported and unsupported window shapes.
- [ ] `pnpm test` passes.
- [ ] `pnpm lint` passes, or any pre-existing unrelated lint issue is documented in the PR.
- [ ] No new dependency, vendor, env var, analytics, or external data processor is added.

## Verification plan

1. Unit: run `pnpm test` from repo root.
2. Static: run `pnpm lint` from repo root.
3. Manual smoke locally or in preview:
   - Chrome/Chromium with camera/mic allowed: session can start, transcript can populate, and results can be reached.
   - Browser context with `SpeechRecognition` and `webkitSpeechRecognition` absent: clicking "Start Speaking" shows the fallback and recording does not start.
   - Permission denied: friendly camera/mic permission message appears and retry remains available.
4. Confirm `git diff` contains no new third-party integrations, env vars, or production deploy changes.

## Implementation slices

### Slice 1 — Extract capability detection

- Modify: `apps/app/src/app/speak/page.tsx`
- Prefer a small exported helper in a new file if testing the page directly is awkward:
  - Create: `apps/app/src/lib/browserSupport.ts`
  - Test: `apps/app/src/lib/browserSupport.test.ts`
- Suggested helper shape:
  - `getSpeechRecognitionCtor(win: Window | undefined)` returns the constructor or `null`.
  - `hasSpeechRecognition(win: Window | undefined)` returns boolean.
- Add tests for:
  - no `window`
  - `SpeechRecognition` present
  - `webkitSpeechRecognition` present
  - neither present

### Slice 2 — Gate recording start

- Modify: `apps/app/src/app/speak/page.tsx`
- Before `startWebcam()` or before setting `phase` to `recording`, check speech-recognition support.
- If unsupported, set `mediaError` to a clear message and return without starting webcam, timer, face detection, or scoring.
- Keep message in-page using the existing `role="alert"` rendering.

### Slice 3 — Make runtime speech errors visible

- Modify: `apps/app/src/app/speak/page.tsx`
- In `recognition.onerror`, map common event errors to visible `mediaError` copy.
- On fatal recognition errors, stop webcam/timer safely and return to `prep` if recording cannot continue.
- Avoid storing or transmitting any additional data.

### Slice 4 — Document support matrix

- Create or modify one of:
  - `ceo/browser-support.md`, or
  - `ceo/compliance.md` if the trust doc spec has already created a browser-support section.
- Include current expected support: Chrome/Edge best, Safari/iPad needs verification, Firefox unsupported for Web Speech in current implementation.
- Label unverified devices as unverified until a human/device smoke test occurs.

### Slice 5 — Verify and hand off

- Run `pnpm test`.
- Run `pnpm lint`.
- Append journal note with test results and any manual smoke limitations.
- Hand off to Quinn for QA/security/privacy review before merge.

## Restart notes

If paused, restart from `apps/app/src/app/speak/page.tsx` around `initSpeechRecognition()` and `startRecording()`. The key invariant is: no speech recognition support means no recording session starts and no new third-party service is introduced.