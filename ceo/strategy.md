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
something weird to a seventh-grader.

## GTM thesis

Direct-to-consumer is a grind for a kids product. Teachers hand-
adopting a new tool is slow. The leverage point is district-level
speech/ELA curriculum decisions, but those cycles are 6–18 months.

Our wedge: speech & debate programs and middle-school ELA teachers
who care about communication outcomes and have personal agency. They
pilot it, see results, and become the internal champion for a
district-wide purchase.

## Target customer (refined over time — current best guess)

- **Wedge 1 — Speech & debate coaches**, 6th–12th grade. Highly
  motivated, autonomous spenders for small-ticket tools. Word-of-mouth
  inside state activity associations.
- **Wedge 2 — ELA teachers grades 4–8**, especially those running oral
  presentation units or Socratic seminars.
- **Expansion** — building-level adoption → district-level license.

Not our ICP (for now):
- PreK / K–2 — too young for webcam-based self-practice.
- High-stakes test-prep (college interview coaching, etc.) — exists
  already in adult products (Yoodli, Orai).
- Adult / professional — the competitive field is crowded; kids is the
  wedge.

## Pricing thesis (draft — not yet tested)

- **Teacher tier (free forever)**: one classroom, up to ~35 students,
  core practice loop, basic teacher dashboard. Funnel.
- **School license**: ~$3–$6 per student per year, unlocks assignment
  tools, rostering, richer analytics, admin controls.
- **District license**: negotiated, with MSA, includes SSO, data
  residency talk, BAA-adjacent terms.

Validate with ≥5 educator conversations before committing to numbers.

## Bets we are making

1. **Browser-first is enough.** Chromebook + Web Speech API + client-
   side face detection is sufficient for MVP. No native app.
2. **Rule-based feedback is sufficient for the MVP loop.** LLM layer
   comes later for constructive coaching tips, not scoring.
3. **Speech/debate coaches are the fastest wedge** into school
   adoption, faster than top-down district sales.
4. **Privacy-first architecture is a feature, not overhead.** No video
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
