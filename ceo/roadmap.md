# Roadmap

_Prioritized initiatives. Update weekly._
_Tags: [P] product · [G] GTM · [T] trust/compliance._

## Now (this month)

- **[P] Teacher dashboard v1** — class list, per-student totals, last
  session. No roster import yet; manual class codes.
- **[P] Real auth gating + per-user sessions in a DB.** Clerk is
  installed; needs to actually gate `/dashboard`, `/speak`, `/history`
  and sessions need to persist server-side. Requires PR.
- **[G] Marketing site v1 for educators.** `/for-schools`,
  `/for-educators`, public trust page, pricing "pilot-only" page.
- **[G] Outreach cadence v1.** 10 drafted emails / week to speech
  coaches and ELA teachers; Brandon sends.
- **[T] Data flow documentation** in `compliance.md`.

## Next (6–10 weeks)

- **[P] Class roster via Google Classroom.** Only if Google Workspace
  for Education SSO is live first. Requires PR.
- **[P] Assignable prompts + streak prompts from teacher.**
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
