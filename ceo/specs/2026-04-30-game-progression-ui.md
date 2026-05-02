---
title: Game-like progression and UI polish
status: active
owner: Timmy
risk: R2
source: Brandon Slack request, 2026-04-30
---

# Game-like progression and UI polish

## Intent

Make BrightSpeaker feel more like a game loop for kids: students should understand what level/world they are in, what comes next, and why practicing again is exciting.

## Scope

- Add a durable, testable progression model for level names, XP thresholds, world themes, next rewards, and visual metadata.
- Improve dashboard UI so progression feels like a map/quest path instead of only numeric XP.
- Improve practice/results UI so completing a session feels like finishing a quest, with next-level context and reward previews.
- Keep all state local-only; no auth, accounts, analytics, paid gates, or new student-data persistence.

## Non-goals / risk gates

- No backend persistence, rosters, auth, teacher dashboard, or child-data storage changes.
- No LLM-generated coaching feedback.
- No external vendors or analytics.
- No legal/privacy claims beyond existing current-state wording.

## Verification

- Add tests for the progression model before implementation.
- Run `pnpm test`, `pnpm lint`, `pnpm --filter @bright-speaker/app build`, and `git diff --check`.
- Browser-smoke dashboard and `/speak?prompt=1` if local dev server is available.
