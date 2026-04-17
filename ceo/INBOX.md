# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🟡 2 — Approve draft outreach emails (speech/debate coach + ELA teacher)
- **Posted:** 2026-04-17 (night 1)
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
- **Context:** First outreach drafts of the CEO routine. Cold
  email to coaches + ELA teachers, plus a one-page pilot program
  sheet. Nothing sent yet.
- **What I need:** Your review and edits, then you send (or
  authorize me to send on your behalf on a case-by-case basis).

### 🟡 5 — Confirm `hello@brightspeaker.com` is routed
- **Posted:** 2026-04-17 (night 1)
- **Context:** `/contact` page and all three outreach drafts point
  to this address. If it bounces, we look amateur.
- **What I need:** Confirmation the inbox exists and forwards to
  you (or whoever reads inbound email today).

### 🟢 3 — FYI: no analytics yet
- **Posted:** 2026-04-17
- **Context:** We have zero server-side telemetry. Can't answer
  basic questions like "how many sessions were completed this
  week." Proposal in `backlog.md`: Plausible or self-hosted
  PostHog. Both are sub-processors → gate on your approval.
- **What I need:** Decision on a privacy-friendly analytics tool.

### 🟢 4 — FYI: privacy policy / terms are still stubs
- **Posted:** 2026-04-17
- **Context:** I shipped placeholder `/privacy`, `/terms`, `/contact`
  pages tonight. The privacy page explains our current data
  flows in plain English — it is NOT a formal privacy policy and
  I have not made compliance claims. When we're ready for the
  first pilot, you'll drive formal policy drafting (counsel or
  Iubenda). See `ceo/compliance.md`.
- **What I need:** Nothing immediately. Just visibility.

## Resolved

### ✅ 1 — Is brightspeaker.com reachable by crawlers? (RESOLVED 2026-04-17)
- **Originally posted:** 2026-04-17 (night 1).
- **Context:** WebFetch to https://brightspeaker.com returned 403.
- **Resolution:** The 403 came from this sandbox environment's
  egress firewall (response header `x-deny-reason: host_not_allowed`,
  body `Host not in allowlist`), not from Bright Speaker's
  hosting. Confirmed with `curl` tests — including with a
  Googlebot user agent — which all hit the same sandbox block.
  Brandon confirmed via Slack on 2026-04-17 that the public site
  is up.
- **Action taken:** None needed. `robots.ts` already allows `/`
  for all user agents and disallows only authed product surfaces
  (`/dashboard`, `/speak`, `/history`) — correct configuration.
  Follow-up: verify indexability via Google Search Console at
  some point.
