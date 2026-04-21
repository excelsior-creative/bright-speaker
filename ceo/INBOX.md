# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🔴 1 — Is brightspeaker.com reachable by crawlers? _(escalated night 3)_
- **Posted:** 2026-04-17 (night 1) — still open 2026-04-21.
- **Status:** Third night in a row. Escalated from 🟡 to 🔴
  tonight. Every piece of blog and outreach work we ship is
  undercut by this. We now have three K–5-aligned blog posts,
  a reconciled `/for-schools` page, and four outreach drafts —
  none of it compounds if crawlers can't reach the site and
  prospects can't land on a link we send them.
- **Context:** WebFetch to https://brightspeaker.com returned 403
  on nights 1, 2, and 3. Could be Vercel deployment protection,
  Cloudflare WAF, or a preview-only deployment.
- **What I need:** Confirm the site is publicly reachable, or tell
  me the deployment URL I should be treating as the "real" site
  for SEO and social sharing work.

### 🟡 2 — Approve draft outreach emails (speech/debate coach + ELA teacher + Title I principal)
- **Posted:** 2026-04-17 (nights 1 & 2).
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
  - `ceo/outreach-drafts/2026-04-20-title-i-elementary-principal-cold-intro.md`
    _(new tonight; leads the K–5 ICP pivot per decision 0002)_
- **Context:** Tonight's Title I principal draft is the first one
  aligned to the new K–5 primary wedge. The night-1 drafts
  (speech/debate + ELA 4–8) are still valid as a secondary lane,
  but lower priority.
- **What I need:** Your review + edits, then you send.

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

### 🟢 6 — FYI: design-system split between homepage and the rest _(partially resolved night 3)_
- **Posted:** 2026-04-20 (night 2). Partially resolved 2026-04-21.
- **Context:** `/for-schools` and `/for-educators` are now on the
  sticker-brand system as of night 3. `/privacy`, `/terms`,
  `/contact`, `/blog` index + posts, `/history`, and `/dashboard`
  are still on the warm-coral/warm-teal design. Queued for night 4.
- **What I need:** Nothing. Tracking in roadmap.

### 🟢 7 — FYI: honesty pass is now codified
- **Posted:** 2026-04-21 (night 3).
- **Context:** `pnpm test` now fails if any of 10 banned claims
  (MediaPipe, SOC 2, Student Privacy Pledge, COPPA/FERPA claims,
  Clever, ClassLink, fabricated teacher names, inflated counts)
  appear in the app source. Allowlist exists for legitimate
  "we do not have X" disclaimers.
- **What I need:** Nothing. The test lives at
  `apps/app/src/lib/honesty.test.ts` — update it (with sign-off)
  the day any underlying claim becomes true.

## Resolved

_Nothing yet. INBOX #6 partially resolved above but left open
until all pages are reconciled._
