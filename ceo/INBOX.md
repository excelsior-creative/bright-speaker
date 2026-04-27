# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🟡 0 — Ready-spec queue is empty; choose the next two specs
- **Posted:** 2026-04-27 nightly CEO routine.
- **Context:** `ceo/next.md` currently says no ready specs are queued and explicitly instructs agents not to invent work when fewer than two ready items exist. `ceo/specs/` contains only `.gitkeep`, so tonight stopped before implementation.
- **Recommended backlog-to-spec conversions:**
  1. **Phase 0 trust/data-flow documentation** — convert the roadmap/backlog trust item into a scoped spec for `ceo/compliance.md` and any public plain-English trust copy needed. Low-risk docs; supports KR 5.1.
  2. **Browser support + `/speak` graceful fallback** — convert the unsupported Web Speech / webcam permission UX backlog items into a scoped implementation spec. This should explicitly define risk tier because it touches camera/mic UX.
  3. **Open PR triage / merge plan** — there are multiple open historical nightly PRs (#2, #5, #8, #9, #10, #11, #12, #13). Decide which should merge, rebase, or close before adding more parallel product work.
- **What I need:** Promote at least two approved specs into `ceo/specs/` and list them in `ceo/next.md`, or tell me which existing open PRs to prioritize for review/merge.

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
