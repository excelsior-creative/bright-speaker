# Next

Ready specs are queued below. Agents should work only from these specs and keep changes scoped to one spec/risk tier per PR.

## Ready

No ready specs are queued after the browser-support and progression/UI polish work. Brandon/Peter should promote the next approved spec before agents pick up additional implementation work.

## Recently completed

- `ceo/specs/2026-04-30-game-progression-ui.md` — completed 2026-04-30 in branch `feat/game-progression-polish`. Added local-only game progression levels/worlds, dashboard adventure-map polish, and quest-complete result UX; no auth, persistence, analytics, or backend changes.
- `ceo/specs/2026-04-27-browser-support-speak-fallback.md` — completed 2026-04-30 in PR #20. Added direct browser-demo CTAs, redesigned speaking interface, and visible speech/camera fallback messaging.
- `ceo/specs/2026-04-27-phase-0-trust-data-flow.md` — completed 2026-04-29 in docs-only PR #18. Produced current-state trust/data-flow documentation and a draft educator trust summary in `ceo/compliance.md`; no public legal copy or product code changed.

## Proposed next after current ready specs

- `ceo/specs/2026-04-29-teacher-class-code-pilot-backbone.md`
  - **Status:** proposed, not ready.
  - **Why:** G-stack alignment locked teacher class-code pilot as the first real product workflow.
  - **Risk:** R4 before implementation/deployment because it touches auth, roles, class membership, persisted student-session records, and children/student data.
  - **Promotion gate:** finish/merge the current trust/data-flow and browser-support specs, then get explicit Brandon approval for the R4 implementation scope.

## Blocked / needs decision

- Historical PR queue is cleared down to PR #5 (`Persistent sessions in Neon behind Clerk auth`), which remains deferred/rebuild-from-current-main because it touches Clerk/Neon/auth/session persistence and requires separate R4 approval evidence.
- Public trust/legal copy, real student pilots, analytics/error-tracking vendors, and any student-data persistence changes require separate approval evidence.
