# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🔴 0 — Five open draft PRs stacked up; nothing has shipped since 2026-04-20
- **Posted:** 2026-04-23 (night 3).
- **Context:** Nightly autonomous CEO work has produced four
  consecutive "Night 3" branches, of which three sit unreviewed
  (#8, #9, and tonight's). Plus PR #5 (Neon+Clerk auth — the
  production auth track), PR #10 (bstack harness), and stale PR
  #2 (superseded night-2 attempt). `main` hasn't advanced since
  PR #7 on 2026-04-20.
- **The problem:** Nightly compounding only works if code merges.
  Every extra night without review adds rebase surface and the
  honesty/design/filler improvements haven't touched production
  yet.
- **Recommendation / order of attention:**
  1. Close PR #2 (superseded, pre-monorepo).
  2. Review+merge PR #8 (smallest: design reconciliation +
     honesty regression test + filler tuning).
  3. Review+merge PR #9 (grade-banded filler profiles + blog
     post + lint fix; overlaps with #8 so one of them will need
     a small rebase).
  4. Review+merge PR #10 (bstack harness, self-contained).
  5. Review PR #5 (auth — biggest blast radius; needs real time).
  6. My tonight's PR lands last or in any order; deliberately
     orthogonal to the others.
- **What I need:** An hour of review time this week, or a steer
  on which subset you want to land first.

### 🔴 1 — Is brightspeaker.com reachable by crawlers?
- **Posted:** 2026-04-17 (night 1). **Escalated to 🔴 on 2026-04-23
  — fourth night open.**
- **Context:** WebFetch to https://brightspeaker.com has returned
  403 on nights 1, 2, 3, and 4. Could be Vercel deployment
  protection, Cloudflare WAF, or a preview-only deployment. If
  this is intentional (pre-launch gating), fine — but we can't
  rank in search if search engines also get 403'd, and four
  nights of blog + pilot-page work is compounding into a dark
  void.
- **What I need:** Confirm the site is publicly reachable, or tell
  me the deployment URL I should be treating as the "real" site
  for SEO and social sharing work. If preview-only, give me the
  preview URL so the outreach drafts can link correctly.

### 🟡 2 — Approve draft outreach emails (five personas now queued)
- **Posted:** 2026-04-17 (nights 1 & 2 & 3).
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
  - `ceo/outreach-drafts/2026-04-20-title-i-elementary-principal-cold-intro.md`
    _(leads the K–5 ICP pivot per decision 0002)_
  - `ceo/outreach-drafts/2026-04-23-independent-k5-enrichment-director-cold-intro.md`
    _(new tonight; independent / private K–5 fast-signing lane)_
- **Context:** Five drafts now cover the core K–5 ICP (classroom
  teacher, ELA/speech coach, Title I principal, literacy coach
  _[in PR #9]_, enrichment director). Pipeline still at zero sent.
- **What I need:** Your review + edits + personalization, then you
  send. Even one send per week moves the pipeline.

### 🟢 3 — FYI: no analytics yet
- **Posted:** 2026-04-17 (night 1) — no change tonight.
- **Context:** Zero server-side telemetry. Can't answer "how many
  sessions were completed this week."
- **Recommendation:** Vercel Analytics. Free tier, privacy-first,
  already a sub-processor (assuming you're on Vercel). Cheapest
  path to answering basic traffic questions.
- **What I need:** Your go-ahead to enable.

### 🟢 4 — FYI: privacy policy / terms are still stubs
- **Posted:** 2026-04-17 (night 1) — still true.
- **Context:** `/privacy` and `/terms` are plain-English stubs.
  Tonight's honesty pass made the homepage consistent with this
  stance. Formal legal drafting still blocked on you.
- **What I need:** Eventually, counsel or Iubenda. Not urgent.

### 🟢 5 — FYI: K–5 is now the primary wedge
- **Posted:** 2026-04-20 (night 2).
- **Context:** PR #3 and PR #4 shifted the site's positioning to K–5
  elementary. I took that as read and reconciled `strategy.md`,
  `gtm.md`, and `product-notes.md` around it. Full reasoning in
  `ceo/decisions/0002-k5-primary-wedge.md`. The 6–12 speech/debate
  lane is demoted to secondary, not cut.
- **What I need:** Confirm this matches your intent. If not, we can
  revert the positioning documents; the homepage is your call.

### 🟢 6 — FYI: design-system split between homepage and the rest
- **Posted:** 2026-04-20 (night 2).
- **Context:** The new sticker-brand homepage doesn't match
  `/for-schools`, `/for-educators`, `/privacy`, `/terms`, `/contact`,
  `/blog`, `/history`, or `/dashboard` — those are still on the
  warm-coral/warm-teal design. Copy is honest, but the brand looks
  disconnected when a visitor leaves the homepage.
- **What I need:** Nothing immediately. Queued for a later night
  unless you want me to prioritize.

## Resolved

### ✅ 0 — Ready-spec queue is no longer empty
- **Resolved:** 2026-04-27.
- **Resolution:** Brandon asked to move the project forward in `#cb-brightspeaker`, so Peter promoted two ready specs into `ceo/specs/` and listed them in `ceo/next.md`:
  1. `ceo/specs/2026-04-27-phase-0-trust-data-flow.md`
  2. `ceo/specs/2026-04-27-browser-support-speak-fallback.md`
- **Still open:** historical PR queue triage and public/deploy approval gates remain separate blockers.
