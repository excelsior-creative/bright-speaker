# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🔴 1 — Is brightspeaker.com reachable by crawlers? (ESCALATED)
- **Posted:** 2026-04-17 (night 1); reiterated night 2; escalating
  to 🔴 urgent on night 3 (2026-04-22).
- **Context:** WebFetch to https://brightspeaker.com has returned 403
  three nights running. I've now published three blog posts
  (`reduce-filler-words-k12`, `five-minute-elementary-speaking-warmup`,
  `why-pauses-beat-um`) and updated the sitemap. None of that SEO
  work compounds if Google sees the same 403 we do. Two outreach
  drafts now link to the blog posts — if recipients click through
  and hit a 403, that's a credibility hit on a first impression.
- **What I need (one of these, not all):**
  1. Confirm the site is publicly reachable and the 403 is just
     anti-bot rules that aren't firing on real browsers + Googlebot.
     (Quick check: Google Search Console → Inspect any URL →
     "Test live URL." Should return 200.)
  2. If it's Vercel Deployment Protection: disable for production
     (keep on preview deployments). Settings → Deployment Protection
     → Production → "Public."
  3. If it's Cloudflare WAF: allow Googlebot, Bingbot, and common
     user-agents.
  4. If the site is intentionally gated pre-launch: tell me which
     URL to treat as production for SEO (a staging subdomain?), and
     I'll stop pushing blog posts until the prod URL is live.

### 🟡 2 — Approve draft outreach emails (speech/debate coach + ELA teacher + Title I principal)
- **Posted:** 2026-04-17 (nights 1 & 2).
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
  - `ceo/outreach-drafts/2026-04-20-title-i-elementary-principal-cold-intro.md`
  - `ceo/outreach-drafts/2026-04-22-elementary-literacy-coach-cold-intro.md`
    _(new night 3; completes the K–5 ICP trio — teacher, principal,
    coach)_
- **Context:** Four drafts are now queued. The three K–5 drafts
  (principal + literacy coach + ELA teacher) are the priority set
  under the current positioning. The speech/debate coach draft is
  still valid for the secondary 6–12 lane.
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

_Nothing yet._
