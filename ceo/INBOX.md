# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🟡 1 — Is brightspeaker.com reachable by crawlers?
- **Posted:** 2026-04-17 (night 1) — still open 2026-04-20.
- **Context:** WebFetch to https://brightspeaker.com returned 403
  on night 1 and again tonight (night 2). Could be Vercel deployment
  protection, Cloudflare WAF, or a preview-only deployment. If this
  is intentional (pre-launch gating), fine — but we can't rank in
  search if search engines also get 403'd, and the blog post work
  from nights 1 and 2 won't compound.
- **What I need:** Confirm the site is publicly reachable, or tell
  me the deployment URL I should be treating as the "real" site
  for SEO and social sharing work.

### 🟡 2 — Approve draft outreach emails (5 drafts now)
- **Posted:** 2026-04-17 (nights 1, 2, 3).
- **Files:**
  - `ceo/outreach-drafts/2026-04-17-speech-debate-coach-cold-intro.md`
    _(6–12, secondary wedge)_
  - `ceo/outreach-drafts/2026-04-17-ela-teacher-cold-intro.md`
    _(6–8 ELA, secondary wedge)_
  - `ceo/outreach-drafts/2026-04-17-pilot-program-one-pager.md`
    _(persona-agnostic leave-behind)_
  - `ceo/outreach-drafts/2026-04-20-title-i-elementary-principal-cold-intro.md`
    _(K–5 primary, equity-framed)_
  - `ceo/outreach-drafts/2026-04-24-elementary-literacy-coach-cold-intro.md`
    _(K–5 primary, standards-framed — NEW tonight)_
- **Context:** Two drafts now explicitly target the K–5 primary
  wedge. The literacy-coach draft is a new persona — a high-leverage
  recipient who advises buildings and thinks in SL.K–SL.5 language.
  It's timed for end-of-April professional-learning planning.
- **What I need:** Your review + edits on any of the five, then you
  send.

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

### 🟢 6 — FYI: design-system split (partially addressed)
- **Posted:** 2026-04-20 (night 2). Updated 2026-04-24 (night 3).
- **Context:** Night 3 ported `/for-educators`, `/for-schools`,
  `/privacy`, `/terms`, `/contact`, and `/blog` to sticker-brand
  using the existing `.btn`, `.pill`, `.card`, `.step`, `.faq-item`,
  `.eyebrow`, `.lede` utilities in `globals.css`. Page-chrome for
  `/speak`, `/history`, `/dashboard` and the two older blog-post
  pages still uses legacy warm-* classes — the CSS aliases keep
  them rendering OK but the visual feel is slightly different.
- **What I need:** Nothing immediately. Remaining reconciliation
  queued for a later night.

### 🟢 7 — FYI: new K–5 blog post live
- **Posted:** 2026-04-24 (night 3).
- **Context:** `/blog/why-pauses-beat-um` is a 4-minute explainer
  on pauses vs. fillers with a print-ready anchor chart. Second
  K–5 post following night 2's 5-minute warm-up. Sitemap updated
  (and backfilled to include the night-2 post which I had missed).

## Resolved

### ✅ 0 — Ready-spec queue is no longer empty
- **Resolved:** 2026-04-27.
- **Resolution:** Brandon asked to move the project forward in `#cb-brightspeaker`, so Peter promoted two ready specs into `ceo/specs/` and listed them in `ceo/next.md`:
  1. `ceo/specs/2026-04-27-phase-0-trust-data-flow.md`
  2. `ceo/specs/2026-04-27-browser-support-speak-fallback.md`
- **Still open:** historical PR queue triage and public/deploy approval gates remain separate blockers.
