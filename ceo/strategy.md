# Strategy

_Long-lived. Edit deliberately. Capture changes in `decisions/`._

## Mission

Help every K-12 student become a confident, clear speaker — regardless
of whether their school can afford 1:1 communication coaching.

## Product thesis

Speaking is a muscle you build through reps with feedback. Kids rarely
get reps (teachers don't have time) and almost never get structured
feedback. A webcam-based practice platform with AI-assisted feedback
can give every kid 10–20x more reps than they'd otherwise get, with
the encouragement layer that keeps them coming back.

The reps matter more than the AI. A rule-based, age-appropriate
feedback layer that reliably catches filler words, pacing, and eye
contact is more valuable than a high-accuracy LLM score that says
something weird to a child.

## V1 product direction locked 2026-04-29

BrightSpeaker is a **teacher pilot tool first** and a **school/district
edtech platform second**. See `decisions/0003-teacher-pilot-to-school-
platform.md`.

The first real product workflow is:

> Teacher creates a class + gives students a class code → students
> practice → teacher sees results → pilot evidence can be summarized for
> a principal.

This means the next product backbone is not a generic student practice
app or a prettier landing page. It is a privacy-minimized classroom pilot
loop with:

- teacher-created classes and class codes;
- student practice with no confusing adult-style account burden;
- server-side persistence scoped to the class/teacher;
- teacher-visible progress evidence; and
- a principal-ready pilot summary after 30 days.

## GTM thesis

Direct-to-consumer is a grind for a kids product. Teachers hand-
adopting a new tool is slow. District-level curriculum decisions are
valuable but too slow as the first proof point.

The immediate GTM path is **teacher pilot → principal evidence → school
license → district expansion**. The teacher pilot must be lightweight
enough for one K-5 teacher to start quickly, while the product and trust
artifacts are built so a principal or curriculum leader can say yes to
expansion without feeling that the first pilot was a toy.

**Updated 2026-04-20.** The homepage redesign (PR #3 + production-
readiness pass PR #4) and the follow-on copy updates have shifted
our primary wedge to **K–5 elementary classrooms**, with Common
Core SL.K–SL.5 as the alignment story and a Title I discount as an
equity-forward pricing signal. See `decisions/0002-k5-primary-
wedge.md`. The 6–12 speech/debate angle remains a secondary lane
(the product works fine for that audience), but our positioning,
prompts, rewards, FAQ, and outreach are now K–5 first.

## Target customer (current, 2026-04-20)

- **Wedge 1 — K–5 ELA / classroom teachers**, especially those who
  already run oral-presentation units, show-and-tell, or Socratic-
  style circles. A single teacher can run a pilot on the Chromebook
  cart they already have.
- **Wedge 2 — K–5 building principals and curriculum coaches**,
  particularly at Title I schools where oral-language instructional
  time is under-resourced and our 50% Title I pricing reads as
  alignment, not a discount gimmick.
- **Wedge 3 (secondary, not primary) — Middle-school ELA + speech/
  debate coaches, 6–12.** Still a fit, still on our outreach list,
  but not the headline story on the site.
- **Expansion** — building-level adoption → district-level license
  under an elementary-curriculum VP.

Not our ICP (for now):
- Pre-K. Too young for webcam-based self-practice; different product
  category.
- High-stakes test-prep (college interview coaching, etc.) — exists
  already in adult products (Yoodli, Orai).
- Adult / professional — crowded field; kids is the wedge.

## Pricing thesis (draft — not yet tested)

- **Teacher tier (free forever)**: one classroom, up to ~35 students,
  core practice loop, basic teacher dashboard. Funnel.
- **School license**: ~$3–$6 per student per year, unlocks assignment
  tools, rostering, richer analytics, admin controls.
- **District license**: negotiated, with MSA, includes SSO, data
  residency talk, BAA-adjacent terms.

Validate with ≥5 educator conversations before committing to numbers.

Pilot packaging: 30-day teacher pilots are the validation motion. They
should include explicit success criteria at kickoff and a principal-
ready evidence summary at day 30.

## Bets we are making

1. **Browser-first is enough.** Chromebook + Web Speech API + client-
   side face detection is sufficient for MVP. No native app.
2. **Rule-based feedback is sufficient for the MVP loop.** LLM layer
   comes later for constructive coaching tips, not scoring.
3. **K–5 elementary is the primary wedge.** Rep-based speaking practice
   tied to SL.K–SL.5 is where the classroom need is clearest and the
   "no student accounts, kid launches with a class code" story is most
   compelling. Title I principals are our acquisition engine. _(Revised
   2026-04-20; see decision 0002.)_
4. **Teacher pilot first, platform second.** The first product must make
   one teacher successful with one class before we optimize for district
   administration. _(Locked 2026-04-29; see decision 0003.)_
5. **Privacy-first architecture is a feature, not overhead.** No video
   leaves the device; transcripts minimized; explicit data flow story
   is a competitive advantage in the K-12 procurement conversation.

## Bets we are NOT making (yet)

- No native mobile app.
- No live teacher-student video monitoring.
- No peer/multiplayer speaking (moderation risk in K-12).
- No parent-facing B2C billing (too high CAC for the price point).
- No multi-language at launch (English only).
- No speech-therapy / clinical positioning (regulated; different
  buyer; different product).

## What would change this strategy

- A competitor ships a polished K-12 product with district traction
  before we have a pilot. Re-evaluate the wedge.
- Chromebook Web Speech API quality proves too poor in classroom
  acoustics. Reconsider native or server-side ASR.
- A speech/debate association signals interest in a formal partnership.
  Accelerate, don't bottom-up.
