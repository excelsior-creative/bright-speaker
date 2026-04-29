# OKRs — Q2 2026 (Apr–Jun)

_Updated: 2026-04-29 after G-stack alignment._

Two tracks: Product and GTM. Progress tracked nightly in journals.

## Objective 1 (Product): A K-5 student can complete speaking reps twice a week

**KR 1.1** — Practice flow runs end-to-end on Chromebook Chrome with
webcam + mic, from dashboard → 60s session → results, with <3s of
perceived latency at each transition. _(Baseline: unverified on a real
Chromebook; need to test.)_

**KR 1.2** — AI feedback is age-appropriate and never evaluative-of-
the-person. Reviewed by at least one K-12 teacher before we ship any
LLM-generated feedback to actual students. _(Currently rule-based;
gate on this before enabling an LLM feedback layer.)_

**KR 1.3** — Session data persists per-user in a real database behind
auth, not localStorage. _(Currently localStorage; requires PR; not a
night-1 ship.)_

**KR 1.4** — Core flow passes Lighthouse a11y ≥95 and WCAG AA color
contrast. _(Baseline unknown; audit early in quarter.)_

## Objective 2 (Product): Teacher can see what their classroom is doing

**KR 2.1** — Teacher can create a class and share a class code.

**KR 2.2** — Teacher view lists students in a class, with last-
session date, total sessions, and average/recent score.

**KR 2.3** — Teacher can assign a specific prompt to a class.

**KR 2.4** — Exports or summarizes a classroom pilot report for a
principal/curriculum-coach review.

## Objective 3 (GTM): First 3 pilot schools in motion

**KR 3.1** — 30 qualified educator conversations with K-5 classroom
teachers, Title I elementary principals, and literacy/instructional
coaches by end of Q2. Keep 6-12 speech/debate as a secondary lane.
_(Baseline: 0.)_

**KR 3.2** — 3 signed pilot agreements (no payment required for
pilot; formal pilot letter signed). _(Baseline: 0.)_

**KR 3.3** — 1 elementary principal/curriculum leader reviews a
teacher-pilot evidence package and gives explicit expansion feedback.

## Objective 4 (GTM): A marketing site an educator trusts

**KR 4.1** — Dedicated `/for-schools` and `/for-educators` pages
live, with positioning that leads with student outcomes, not
features. _(Night 1 ships the v1.)_

**KR 4.2** — Privacy stance and data-flow summary public on the site
(non-legally-binding plain-English page, paired with a formal
privacy policy when Brandon approves the legal language).

**KR 4.3** — 6 educator-focused blog posts / resource pages live,
targeting keywords like "reduce filler words in students,"
"classroom speech practice activities," "middle school public
speaking rubric."

**KR 4.4** — Site Lighthouse SEO ≥95; sitemap + robots live;
indexable by search engines. _(Currently 403 to crawlers — resolve.)_

## Objective 5 (Trust): Kids' data story is ready for a real pilot

**KR 5.1** — Data flow diagram in `compliance.md` covers every piece
of student data the product touches: where it's captured, where it's
sent, how long it's retained, who can access it.

**KR 5.2** — COPPA/FERPA gaps list is explicit and prioritized,
ready for Brandon to drive formal compliance work before the first
pilot goes live.

**KR 5.3** — No student video leaves the device. Confirmed by
architecture review and reflected on a public-facing trust page.
