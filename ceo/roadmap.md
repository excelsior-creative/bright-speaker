# Roadmap

_Prioritized initiatives. Update weekly._
_Tags: [P] product · [G] GTM · [T] trust/compliance._

## Now (this month)

- **[T] Data flow documentation** in `compliance.md` — current ready
  spec, required before real student pilots or stronger trust claims.
- **[P] `/speak` browser-support fallback** — current ready spec; no
  silent failure when Web Speech/camera/mic support is missing.
- **[P] Teacher class-code pilot backbone** — next major product spine:
  teacher creates class/code, students practice, teacher sees results,
  and pilot evidence can be summarized. Proposed spec exists; promote
  only after R4 implementation approval because it touches student
  records/auth/data handling.
- **[G] Marketing site v1 for teacher pilots.** `/for-schools`,
  `/for-educators`, public trust page, and pricing should frame a
  30-day teacher pilot, not pretend district readiness is complete.
- **[G] Outreach cadence v1.** Prioritize K-5 classroom teachers,
  Title I elementary principals, and literacy/instructional coaches;
  Brandon reviews/sends.

## Next (6–10 weeks)

- **[P] Class roster via Google Classroom.** Only after the manual
  class-code pilot loop works and Google Workspace for Education SSO is
  live. Requires PR.
- **[P] Assignable prompts + streak prompts from teacher.**
- **[P] K-5 activity library v1.** 30 grade-banded prompts mapped to
  Common Core SL.K-SL.5, designed for classroom assignment.
- **[P] Pilot evidence package v1.** CSV/summary export, confidence
  survey, and principal-ready outcome narrative.
- **[P] LLM feedback coach layer** — constructive tips only, pre-tested
  prompts, never evaluative-of-the-person. Requires PR and teacher
  review before rollout.
- **[G] 3 pilot agreements signed.** Letter-of-intent pilots, no
  payment, 30-day engagement, weekly check-ins.
- **[G] First case study** (even a single-classroom one; with
  teacher quotes and anonymized outcomes).
- **[T] Formal privacy policy + ToS** — Brandon drives; legal review
  required before publishing.

## Later (this quarter, later half, or deferred)

- Speech pacing coach (adaptive prompts that push a student's growth
  edge).
- Multi-session progress analytics (student-facing).
- Parent view (read-only progress; optional).
- NSDA / state association partnership conversation.
- District-level admin tools (provisioning, SSO with Google Workspace
  Edu, CSV roster imports, SIS hooks).
- Voice clarity / volume feedback.
- Accessibility for students without cameras (audio-only mode) — this
  is both a11y AND a privacy-conscious default.
- Native mobile app. Probably not needed.
- Multi-language support. Probably after English adoption proves out.

## Explicitly de-scoped

- Peer-to-peer / multiplayer speaking (moderation risk).
- Live teacher-student video monitoring (privacy risk; different
  product category).
- Speech-therapy clinical positioning (regulated).
- Adult / professional market (crowded; different GTM).
