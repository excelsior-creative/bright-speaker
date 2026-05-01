# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🟡 PR backlog triage follow-up
- **Posted:** 2026-04-26; updated during conflict resolution.
- **Context:** Historical PR queue was triaged after #9, #10, #18, and #20 landed. Remaining open PRs are documented with per-PR conflict-audit comments.
- **Current recommendation:** close/supersede stale duplicates (#2, #8), re-cut R4 persistence work (#5), salvage focused GTM/design/resource work from #11/#12/#13 as separate current-main PRs.

### 🔴 1 — Is brightspeaker.com reachable by crawlers? (ESCALATED)
- **Posted:** 2026-04-17 (night 1); reiterated night 2; escalated on night 3.
- **Context:** Earlier nightly WebFetch checks returned 403 for https://brightspeaker.com. Since then, production has been smoke-tested successfully in browser and with `curl`, but Search Console live inspection is still the right crawler truth source.
- **What I need (one of these, not all):**
  1. Confirm Google Search Console live URL inspection returns 200.
  2. If it is Vercel Deployment Protection: disable for production (keep on previews).
  3. If it is Cloudflare/WAF: allow Googlebot, Bingbot, and common user agents.
  4. If the site is intentionally gated pre-launch: tell me which URL to treat as production for SEO/social sharing.

### 🟡 2 — Approve draft outreach emails (five personas now queued)
- **Posted:** 2026-04-17 (nights 1 & 2 & 3).
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
  - `ceo/outreach-drafts/2026-04-20-title-i-elementary-principal-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-22-elementary-literacy-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-23-independent-k5-enrichment-director-cold-intro.md`
- **Context:** Drafts cover the K–5 ICP plus secondary speech/debate lane. Pipeline is still zero sent.
- **What I need:** Your review + edits + personalization, then you send. Even one send per week moves the pipeline.

### 🟢 3 — FYI: no analytics yet
- **Posted:** 2026-04-17 (night 1) — no change tonight.
- **Context:** Zero server-side telemetry. Can't answer "how many sessions were completed this week."
- **Recommendation:** Vercel Analytics. Free tier, privacy-first, already a sub-processor (assuming you're on Vercel). Cheapest path to answering basic traffic questions.
- **What I need:** Your go-ahead to enable.

### 🟢 4 — FYI: privacy policy / terms are still stubs
- **Posted:** 2026-04-17 (night 1) — still true.
- **Context:** `/privacy` and `/terms` are plain-English stubs. Formal legal drafting still blocked on you.
- **What I need:** Eventually, counsel or Iubenda. Not urgent.

### 🟢 5 — FYI: K–5 is now the primary wedge
- **Posted:** 2026-04-20 (night 2).
- **Context:** PR #3 and PR #4 shifted the site's positioning to K–5 elementary. Reconciled in `strategy.md` and `decisions/0002-k5-primary-wedge.md`.
- **What I need:** Confirm this matches your intent. If not, we can revert the positioning documents; the homepage is your call.

### 🟢 6 — FYI: design-system split between homepage and the rest
- **Posted:** 2026-04-20 (night 2).
- **Context:** The sticker-brand homepage still differs from several older warm-coral pages. PR #12 contains a larger reconciliation pass but should be re-cut/verified from current `main` before merge.
- **What I need:** Nothing immediately unless you want me to prioritize the design-system reconciliation.

## Resolved

### ✅ PR backlog triage
- **Resolved:** 2026-04-30 / 2026-05-01.
- **Resolution:** Historical PRs were audited systematically. #9, #10, #13, #18, and #20 landed; #2 and #8 were closed as superseded; #5 remains deferred as R4 auth/persistence work; #11/#12 require focused salvage from current `main` if still wanted.
