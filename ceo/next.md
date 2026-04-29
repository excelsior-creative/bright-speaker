# Next

Ready specs are queued below. Agents should work only from these specs and keep changes scoped to one spec/risk tier per PR.

## Ready

1. `ceo/specs/2026-04-27-phase-0-trust-data-flow.md`
   - **Owner:** Peter
   - **Risk:** R1 unless public/legal claims are published or student-data handling changes.
   - **Outcome:** Current-state trust/data-flow documentation and draft educator trust summary.
   - **Verification:** `git diff --check`; over-claim review; app tests only if public/product code changes.

2. `ceo/specs/2026-04-27-browser-support-speak-fallback.md`
   - **Owner:** Devon
   - **Reviewer:** Quinn
   - **Risk:** R2; escalates to R4 if new STT vendors, student-data storage, privacy commitments, auth, or production deploy changes are introduced.
   - **Outcome:** Unsupported browsers and speech/camera errors get friendly in-page fallback UX; no silent recording failure.
   - **Verification:** `pnpm test`, `pnpm lint`, manual smoke for supported/unsupported browser paths before merge.

## Proposed next after current ready specs

- `ceo/specs/2026-04-29-teacher-class-code-pilot-backbone.md`
  - **Status:** proposed, not ready.
  - **Why:** G-stack alignment locked teacher class-code pilot as the first real product workflow.
  - **Risk:** R4 before implementation/deployment because it touches auth, roles, class membership, persisted student-session records, and children/student data.
  - **Promotion gate:** finish/merge the current trust/data-flow and browser-support specs, then get explicit Brandon approval for the R4 implementation scope.

## Blocked / needs decision

- Open historical PR queue still needs triage (#2, #5, #8, #9, #10, #11, #12, #13 as of the 2026-04-27 nightly routine). Do not merge/deploy without the repo's normal review and approval gates.
- Public trust/legal copy, real student pilots, analytics/error-tracking vendors, and any student-data persistence changes require separate approval evidence.
