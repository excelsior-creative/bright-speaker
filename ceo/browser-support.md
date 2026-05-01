# Browser Support Matrix

_Last updated: 2026-04-30_

BrightSpeaker's current browser demo uses in-browser camera access plus the browser-provided Web Speech API for live transcription. No new speech-to-text vendor or data processor is introduced by the current implementation.

## Current expected behavior

| Browser / device | Status | Notes |
| --- | --- | --- |
| Chrome on Chromebook/laptop | Recommended | Best current path for camera, microphone, and speech recognition. |
| Edge on laptop | Recommended | Expected to support the same Web Speech flow as Chromium. |
| Safari on iPad/Mac | Needs device smoke test | Camera support is expected; speech-recognition behavior must be verified before claiming official support. |
| Firefox | Unsupported for current speech demo | Firefox can view the site, but the current Web Speech-based demo should show an in-page fallback instead of starting a scored session. |

## Product rule

If speech recognition is not available, `/speak` must not start webcam capture, the timer, or scoring. The student should see a friendly message that recommends Chrome/Edge and avoids blaming the child.

## Future notes

- Any third-party STT, persistent audio handling, auth changes, or student-data storage changes escalate beyond this R2 support/fallback work and need separate approval.
- Production claims should stay conservative until Brandon or QA verifies target school devices.
