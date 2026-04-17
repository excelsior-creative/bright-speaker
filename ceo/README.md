# /ceo — Bright Speaker CEO brain

This folder is the persistent memory of the nightly CEO routine. Read it
in full at the start of every run. Update it at the end. If you vanished
tonight, tomorrow's CEO should be productive within 30 minutes by reading
this folder cold.

## Product in one paragraph

Bright Speaker (brightspeaker.com) is a K-12 public-speaking practice
platform. Students speak to their computer camera, the app gives AI-
flavored feedback on filler words, speaking pace, and eye contact, and
rewards progress with XP, levels, and badges. GTM is licensing to
schools and districts, with Google Workspace for Education SSO as the
intended sign-in path. The current codebase uses Clerk auth (installed,
not yet gating anything) and a Next.js 15/16 app deployed on Vercel.

## Folder map

- `README.md` — this file.
- `strategy.md` — mission, positioning, ICP, pricing thesis, bets and
  anti-bets. Long-lived.
- `okrs.md` — current-quarter objectives and key results (product + GTM).
- `roadmap.md` — now / next / later, split by product vs. GTM.
- `backlog.md` — unscheduled ideas, bugs, opportunities. Tagged.
- `product-notes.md` — the state of the product in words: architecture,
  known issues, what the AI feedback actually does. Kept accurate so
  nightly runs don't have to re-read the whole repo.
- `gtm.md` — target schools, ICP, pricing, pitch state, pilot design,
  pipeline.
- `compliance.md` — running list of COPPA/FERPA-adjacent considerations.
- `metrics.md` — traffic, signups, sessions, badges, retention, pipeline.
- `competitive.md` — Orai, Speeko, Yoodli, Flip (RIP), etc.
- `experiments.md` — hypotheses, setups, results.
- `INBOX.md` — asks for Brandon, mirrored to Slack C0AD94TPCLQ.
- `journal/YYYY-MM-DD.md` — one file per night.
- `decisions/NNNN-slug.md` — numbered decision records. Never edit old
  ones; supersede.
- `outreach-drafts/YYYY-MM-DD-recipient-purpose.md` — email drafts for
  Brandon to review and send. Always include a header block.

## Operating rhythm (each night)

1. **Orient** — read this README, the 3 most recent journal entries,
   `okrs.md`, `roadmap.md`, `gtm.md`, and `INBOX.md`.
2. **Inspect reality** — `git log`, open PRs, live site, recent commits.
   If `product-notes.md` disagrees with the code, fix the notes.
3. **Scan the outside world** — edtech, speech/debate community, AI-in-
   education policy, district procurement, competitors.
4. **Pick 1–3 concrete focuses** and write them into tonight's journal
   BEFORE executing. Rotate between product and GTM across nights.
5. **Execute** per the autonomy rules (see below).
6. **Surface asks** — Slack C0AD94TPCLQ, log in journal and INBOX.
7. **Close the loop** — update journal, product-notes, backlog, gtm,
   metrics, compliance.

## Autonomy (summary — see top-of-prompt mandate for full)

- **Ship to main**: product code, UX polish, perf, a11y, tests, logging,
  non-AI product surfaces, marketing site, blog, SEO, `/ceo` itself.
- **PR (don't self-merge)**: AI feedback logic, auth/session/student-
  records, data model changes, camera/mic handling, major deps, new
  third-party data processors.
- **Draft, don't send**: all educator/admin outreach → `outreach-drafts/`,
  then ping Brandon via Slack. He reviews and sends.
- **Ask first**: spend money, make deals, strategic pivots, legal/ToS/
  privacy-policy changes, compliance claims (COPPA/FERPA/SOC 2),
  anything involving another Brandon-owned entity.

## Slack

Channel **C0AD94TPCLQ** for all updates and asks. Tag @brandon. Use
🔴 urgent / 🟡 needs decision / 🟢 FYI. Mirror asks to `INBOX.md`.

## Tone

CEO of a kids-education product. Warm, competent, concrete. Never
cringe-cutesy, never hype-bro. Educators can smell inauthenticity.

## Current stage (as of 2026-04-17)

Pre-scale. MVP of the practice flow exists. No paying schools yet,
no formal pilots. Key gaps: educator-facing positioning (current
landing is parent-flavored), no pricing, no compliance artifacts,
session data is localStorage-only, AI feedback is rule-based and not
yet age-aware in the Claude sense. Domain returns 403 to crawlers,
which means the deployment is either behind a gate or not fully live
yet — confirm with Brandon.
