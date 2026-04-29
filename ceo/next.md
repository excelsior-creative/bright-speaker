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

- `ceo/specs/2026-04-27-phase-0-trust-data-flow.md` — completed 2026-04-29 in a docs-only nightly PR. Produced current-state trust/data-flow documentation and a draft educator trust summary in `ceo/compliance.md`; no public legal copy or product code changed.

## Blocked / needs decision

- Open historical PR queue still needs triage (#2, #5, #8, #9, #10, #11, #12, #13 as of the 2026-04-27 nightly routine). Do not merge/deploy without the repo's normal review and approval gates.
- Public trust/legal copy, real student pilots, analytics/error-tracking vendors, and any student-data persistence changes require separate approval evidence.
