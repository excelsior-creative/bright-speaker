# Next

Ready specs are queued below. Agents should work only from these specs and keep changes scoped to one spec/risk tier per PR.

## Ready

1. `ceo/specs/2026-04-27-browser-support-speak-fallback.md`
   - **Owner:** Devon
   - **Reviewer:** Quinn
   - **Risk:** R2; escalates to R4 if new STT vendors, student-data storage, privacy commitments, auth, or production deploy changes are introduced.
   - **Outcome:** Unsupported browsers and speech/camera errors get friendly in-page fallback UX; no silent recording failure.
   - **Verification:** `pnpm test`, `pnpm lint`, manual smoke for supported/unsupported browser paths before merge.

## Recently completed

- `ceo/specs/2026-04-27-phase-0-trust-data-flow.md` — completed 2026-04-29 in docs-only PR #18. Produced current-state trust/data-flow documentation and a draft educator trust summary in `ceo/compliance.md`; no public legal copy or product code changed.

## Proposed next after current ready specs

- `ceo/specs/2026-05-06-functional-mvp-completion-plan.md`
  - **Status:** proposed, not ready for implementation until Brandon gives explicit R4 approval.
  - **Why:** Brandon asked for a real plan to finish a functional MVP; this converts the teacher class-code pilot into an implementable MVP sequence.
  - **Risk:** R4 before implementation/deployment because it touches auth, roles, class membership, persisted student-session records, and children/student data.
  - **Promotion gate:** Brandon approves the R4 implementation scope, then Devon can execute in small PRs with Quinn review before merge/deploy.
- `ceo/specs/2026-04-29-teacher-class-code-pilot-backbone.md`
  - **Status:** superseded as the product-direction spec by the more granular MVP completion plan above; retain as source context.
  - **Why:** G-stack alignment locked teacher class-code pilot as the first real product workflow.
  - **Risk:** R4 before implementation/deployment because it touches auth, roles, class membership, persisted student-session records, and children/student data.
  - **Promotion gate:** use `ceo/specs/2026-05-06-functional-mvp-completion-plan.md` for implementation sequencing.

## Blocked / needs decision

- Open historical PR queue still needs triage (#2, #5, #8, #9, #10, #11, #12, #13 as of the 2026-04-27 nightly routine). Do not merge/deploy without the repo's normal review and approval gates.
- Public trust/legal copy, real student pilots, analytics/error-tracking vendors, and any student-data persistence changes require separate approval evidence.
