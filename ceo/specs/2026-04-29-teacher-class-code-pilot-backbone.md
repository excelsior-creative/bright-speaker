---
title: Teacher Class-Code Pilot Backbone v1
status: proposed
risk_tier: R4
owner: Peter
reviewer: Quinn
created: 2026-04-29
source:
  - ceo/decisions/0003-teacher-pilot-to-school-platform.md
  - ceo/strategy.md#v1-product-direction-locked-2026-04-29
  - ceo/roadmap.md#now-this-month
---

# Teacher Class-Code Pilot Backbone v1 Spec

## Outcome

BrightSpeaker has the first real pilot workflow: a K-5 teacher creates a class, shares a class code, students join/practice without confusing admin burden, sessions persist in a server-side data model, and the teacher can see enough progress evidence to discuss expansion with a principal.

## G-stack basis

The accepted G-stack direction is teacher-pilot-first → school/district platform. The first workflow is:

> Teacher creates a class + gives students a class code → students practice → teacher sees results → pilot evidence can be summarized for a principal.

## Scope

1. Define teacher/student roles and class-code join flow.
2. Gate teacher dashboard and student practice through the minimal auth/session model needed for a real pilot.
3. Persist sessions server-side with privacy-minimized fields.
4. Add teacher class view: roster, last session, total sessions, average/recent score, completion count.
5. Preserve the existing warm student practice loop, XP/badges, and rule-based feedback.
6. Produce a basic pilot summary for teacher/principal review.
7. Document data-flow, retention, deletion, and subprocessor implications before any real student pilot.

## Non-goals

- No Google Classroom roster import in v1.
- No SIS integration.
- No parent accounts.
- No direct student self-signup outside teacher/class-code flow.
- No LLM-generated feedback.
- No speech therapy or clinical claims.
- No public compliance claims beyond approved trust copy.

## Risk tier and approval evidence

- Effective tier: **R4 before implementation/deployment** because this introduces auth/roles, class membership, persisted student-session records, and pilot-readiness around children/student data.
- Docs/spec drafting is R1, but implementation must not start until Brandon approves the R4 scope and required privacy/legal guardrails are explicit.
- Requires Quinn review before merge and Brandon approval before any production deployment or real-student pilot.

## Acceptance criteria

- [ ] Teacher can create a class and see a unique class code.
- [ ] Student can enter a class code and complete a practice session without managing an adult-style account flow.
- [ ] Session records persist server-side with only fields required for pilot evidence.
- [ ] Teacher dashboard shows class roster/progress: last session, total sessions, completion status, and score trend/summary.
- [ ] Pilot summary can be exported or copied for principal review.
- [ ] Data-flow documentation is updated before any real student data is collected.
- [ ] No new vendor/subprocessor is added without approval.
- [ ] No video leaves the device; no audio/STT strategy changes without separate approval.

## Verification plan

- Unit/integration tests for class-code creation/join and session persistence.
- Role/access tests proving one teacher cannot see another teacher's class.
- `pnpm test`, `pnpm lint`, and `pnpm build`.
- Manual smoke: teacher creates class → student joins → student practices → teacher sees result → pilot summary generated.
- Privacy review against `ceo/compliance.md` before production deployment.

## Restart notes

This spec is intentionally **proposed**, not ready. Promote it only after the current trust/data-flow and browser-support specs are handled and Brandon approves the R4 implementation scope.
