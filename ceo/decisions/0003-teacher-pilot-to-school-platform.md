# Decision 0003 — Teacher Pilot Tool First, School Platform Next

- **Date:** 2026-04-29
- **Status:** Accepted
- **Source:** Brandon/Timmy G-stack office-hours thread in Slack C0AD94TPCLQ
- **Risk:** R1 for strategy/docs; R2/R4 gates apply before implementation involving auth, student records, recordings, privacy/legal claims, or production deployment.

## Decision

BrightSpeaker is a **teacher pilot tool first** and a **school/district edtech product second**.

The product should optimize the first real workflow around a K-5 classroom teacher who can run a small pilot quickly, while building the trust/data architecture required to graduate into school and district licenses.

## Locked G-stack choices

1. **Business thesis:** Teacher pilot tool → school/district edtech platform.
2. **Primary v1 user:** K-5 classroom teacher first, student second, principal/curriculum leader as evaluator and expansion buyer.
3. **First end-to-end workflow:** Teacher creates a class and class code; students practice; teacher sees results; pilot evidence can be exported or summarized for a principal.
4. **Student surface:** Class-code entry, simple practice activities, warm feedback, XP/badges, and no confusing account/admin burden for the child.
5. **Teacher surface:** Class creation, activity launch/assignment, student roster by code, per-student progress, class-level completion, and a lightweight pilot summary.
6. **Principal/evaluator surface:** Evidence package, not a daily dashboard: usage, completion, confidence survey signal, anonymized improvement summary, and trust/data-flow summary.
7. **Content model:** Grade-banded K-5 speaking activities mapped to Common Core SL.K-SL.5; prompts should be classroom-real, short, and teacher assignable.
8. **Feedback model:** Rule-based, age-appropriate coaching remains the MVP default. LLM feedback is deferred until teacher-reviewed and constrained to constructive tips about the speaking, never judgments about the student.
9. **Trust posture:** Privacy-first architecture is part of the product, not polish. No overclaiming COPPA/FERPA/SOC 2. No public legal commitments until Brandon/counsel approve.
10. **Monetization:** Free/low-friction teacher pilots generate evidence; paid school licenses follow; district sales come after trust artifacts and pilot proof.
11. **Success metrics:** A teacher can run two sessions per week with one class; students complete reps without support burden; the teacher can show a principal a clear usage/outcome summary after 30 days.

## Implications

- The next product backbone is not a prettier standalone student practice loop. It is the **class-code pilot loop**.
- Auth, roles, class codes, persistence, and teacher-visible progress become strategic enablers, not generic infrastructure.
- Public messaging should invite teachers into a pilot while staying honest about pre-launch/trust state.
- District-readiness claims must wait for actual privacy/legal/compliance artifacts.
- Parent/B2C, adult coaching, speech therapy, peer/multiplayer, and live teacher-student video monitoring remain out of scope.

## Follow-up specs

Create or refine specs in this order after the currently queued trust/browser-support specs:

1. **Teacher class-code pilot backbone v1** — class creation, student class-code join, persisted sessions, teacher progress view, and pilot summary. This will likely be R4 before production use because it touches student records/auth/data handling.
2. **K-5 activity library v1** — 30 grade-banded prompts mapped to SL.K-SL.5 with teacher assignment metadata.
3. **Pilot evidence package v1** — CSV/summary export, confidence survey, and principal-ready outcome narrative.

## Supersedes / clarifies

- Clarifies decision 0001 by making the educator wedge specifically teacher-pilot-first rather than broad educator adoption.
- Extends decision 0002 by making the K-5 wedge operational: class-code pilot loop, teacher progress view, principal evidence package.
