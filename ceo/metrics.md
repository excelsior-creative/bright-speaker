# Metrics

_What we know and what we wish we knew._

_Last checked: 2026-04-22 (night 3)._

## Traffic / site

| Metric | Value | Source | Notes |
|---|---|---|---|
| Monthly uniques | unknown | — | No analytics wired up |
| Top entry pages | unknown | — | — |
| Lighthouse perf | unknown | — | Audit in next run |
| Lighthouse SEO | unknown | — | Audit in next run |
| Indexable | **unclear — 403 to bot** | WebFetch 2026-04-17 | Confirm with Brandon |

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
| Cold emails drafted | 5 (cumulative) | `outreach-drafts/` — 3 K–5 + 1 speech/debate + 1 pilot one-pager |
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
   (sample transcript set). _Partial: grade-banded list shipped
   2026-04-22, should materially reduce K–5 false positives._
4. Time-to-first-session for a new visitor on a Chromebook.

## Content inventory (night-3 snapshot)

| Asset | Count | Notes |
|---|---|---|
| Blog posts live | 3 | All educator-intent, two K–5 + one ELA/6–12 |
| Outreach drafts ready | 5 | 3 K–5 roles + 1 speech/debate + 1 pilot 1-pager |
| Public marketing pages | 8 | / + for-schools + for-educators + privacy + terms + contact + blog + 3 blog posts |
| Decision records | 2 | 0001 educator-wedge, 0002 K–5 primary |
| Test suites | 3 | sessions, filler-words, honesty-regression. 22/22 |
