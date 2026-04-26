# INBOX — asks for Brandon

_Mirror of Slack asks (channel C0AD94TPCLQ). Resolve with a link to
the journal night where it was resolved._

## Open

### 🔴 0 — PR backlog: six open drafts since night 2, none merged

- **Posted:** 2026-04-26 (night 4). Was implicit in prior nights;
  promoting to top-of-INBOX tonight because it's now actively
  costing us.
- **Context:** Six open draft PRs on `main` (#2, #5, #8, #9, #10,
  #11, #12), oldest is from 2026-04-18. Each new night's branch
  forked from `main` while `main` hadn't moved, so future-night
  branches kept independently re-doing the same work — `/pilot`
  page (#2, #11), "why-pauses-beat-um" blog post (#8, #9, #12),
  K–5 filler-word tuning (#2, #8, #9), design reconciliation of
  `/for-schools` + `/for-educators` (#8, #12), the lint fix on
  `speak/page.tsx:304` (#8, #9, #12), and an honesty regression
  test (#8, #9). They will conflict heavily on merge.
- **Recommended merge / close order** (pick the freshest of each
  category, close the older variants as superseded):
  1. **Merge PR #5** — "Persistent sessions in Neon behind Clerk
     auth." Foundational; fully orthogonal; oldest non-superseded
     PR. Requires `DATABASE_URL` and Clerk envs in Vercel before
     deploying — Brandon's call. Drafts compliance.md should
     accompany this.
  2. **Merge PR #10** — bstack Playwright harness. Infra; does
     not touch app surfaces. Requires `BROWSERSTACK_USERNAME` /
     `_ACCESS_KEY` in env to actually exercise.
  3. **Merge PR #12** — most recent design reconciliation +
     second blog post + lint fix; supersedes the design
     reconciliation in PR #8.
  4. **Merge PR #9** — grade-banded fillers + honesty regression
     test + fourth K–5 outreach draft. The honesty test from #9
     is a tighter implementation than #8's; supersedes #8's test.
  5. **Merge PR #11** — `/pilot` landing page + a third blog
     post on a different topic (`how-to-teach-public-speaking-
     elementary-school`) + enrichment-director outreach. The
     `/pilot` here is a fresher take than PR #2's. Sitemap
     conflicts with tonight's branch — trivial to resolve.
  6. **Close PR #8 as superseded** by #9 + #12. The CoachUI URL
     fix in #8 is its only non-redundant piece — cherry-pick if
     desired, otherwise re-do as a one-line follow-up.
  7. **Close PR #2 as superseded** by #11 (pilot page) + #9
     (filler tuning) + tonight's `layout.tsx` honesty fix.
- **What I need:** Brandon to triage the queue in one sitting.
  Two hours of review now saves a week of compounding conflicts.
- **What I'm doing in the meantime:** Tonight (night 4) I am
  shipping ONLY work that does not touch any of the above
  variants — no `/pilot`, no second-blog-post variant, no design
  reconciliation, no filler tuning, no honesty test, no DB work.
  Tonight's work is a CI workflow, a new `/resources` hub +
  printable SL.K-SL.5 checklist, a new outreach draft persona,
  and a one-line metadata honesty fix.

### 🔴 1 — Is brightspeaker.com reachable by crawlers?
- **Posted:** 2026-04-17 (night 1) — still open 2026-04-26 (night 4).
- **Context:** WebFetch to https://brightspeaker.com returned 403
  on nights 1, 2, 3, and again tonight (night 4). Could be Vercel
  deployment protection, Cloudflare WAF, or a preview-only deployment.
  If this is intentional (pre-launch gating), fine — but we can't
  rank in search if search engines also get 403'd, and the blog post
  work from every night won't compound. Six PRs of GTM and product
  work are sitting on top of a site no crawler can reach.
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
