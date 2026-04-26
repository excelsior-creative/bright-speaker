# Metrics

_What we know and what we wish we knew._

_Last checked: 2026-04-26 (night 4)._

## Traffic / site

| Metric | Value | Source | Notes |
|---|---|---|---|
| Monthly uniques | unknown | — | No analytics wired up |
| Top entry pages | unknown | — | — |
| Lighthouse perf | unknown | — | Audit in next run |
| Lighthouse SEO | unknown | — | Audit in next run |
| Indexable | **unclear — 403 to bot, 4 nights running** | WebFetch 2026-04-26 | INBOX #1 escalated 🔴 |
| Public pages on `main` | 12 | this repo | / · /for-educators · /for-schools · /privacy · /terms · /contact · /blog (+2 posts) · /resources (+1 page) · /sign-in · /sign-up |

## Product — usage

All current data is in the user's `localStorage`; we have no server-
side telemetry, so these are **unmeasurable today**:

- Signups
- Active users (DAU / WAU / MAU)
- Practice sessions started
- Practice sessions completed
- Session completion rate
- Average session length
- Badges earned / week
- Retention by cohort
- Level distribution

**Gap**: we need lightweight, privacy-friendly server-side
telemetry. Proposal in backlog. Gate third-party analytics on
Brandon approval (sub-processor).

## GTM — pipeline

| Stage | Count | Source |
|---|---|---|
| Cold emails drafted | 5 | `outreach-drafts/` (3 from night 1, 1 night 2, 1 night 4) |
| Cold emails sent | 0 | — |
| Replies | 0 | — |
| Demo booked | 0 | — |
| Pilot agreements signed | 0 | — |
| Pilot schools live | 0 | — |

## Revenue

$0. No pricing published, no transactions.

## What I wish I had access to

- Vercel analytics for brightspeaker.com (traffic, top pages).
- Google Search Console registration for the domain.
- A privacy-first product analytics tool (PostHog / Plausible)
  with anonymous session tracking, after Brandon approval.
- A real conversion funnel once we have auth gating.
- An educator email list for outbound cadence management.

## Baselines to establish this week

1. Lighthouse perf / a11y / SEO of landing + `/speak`.
2. Site reachability from crawlers (resolve the 403 issue).
3. Number of filler-word false positives in the current detector
   (sample transcript set).
4. Time-to-first-session for a new visitor on a Chromebook.
