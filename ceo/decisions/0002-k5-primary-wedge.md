# 0002 — K–5 elementary is the primary wedge

**Date:** 2026-04-20
**Supersedes:** None (refines 0001)
**Status:** Accepted

## Context

Decision 0001 (2026-04-17) picked "educator wedge over direct-to-
consumer," targeting speech/debate coaches (6–12) and ELA teachers
(grades 4–8) as the wedge audience. Between night 1 and tonight,
Brandon shipped two meaningful changes that moved the positioning:

- **PR #3 (2026-04-18)** redesigned the landing page using a new
  sticker-brand visual system and changed the headline audience to
  "every kid in the room," with hero pills reading "Ages 5–11" and
  "Common Core SL.K–SL.5."
- **PR #4 (2026-04-18)** made a production-readiness pass that kept
  the K–5 framing, added SL.K–SL.5 standards alignment across the
  copy, and introduced a "Title I 50% discount" CTA.

The site as of tonight speaks to elementary teachers, elementary
principals, and families of ages-5–11 children. It does not speak to
a high-school debate coach at the hero level. That's a material
shift from the strategy doc.

Meanwhile: the **product** is still well-suited to 6–12 users. The
60-second prompt loop, filler/eye-contact/pacing feedback, and XP
rewards are not age-gated in the code. The filler-word list actually
over-flags younger speakers (see backlog), which is a bug that
matters more under a K–5 headline.

## Decision

**K–5 elementary is Bright Speaker's primary wedge.** The public
site, the prompt library, the rewards, the outreach targets, the
conferences, and the SEO corpus should all align to this.

**6–12 remains a supported lane, not a marketed lane.** Speech and
debate coaches, middle-school ELA teachers who run oral presentation
units — they can use Bright Speaker, and we'll keep a backlog of
6–12-specific drafts ready if a coach raises a hand. But we stop
leading the site with them.

## Why K–5 first (not 6–12)

1. **Fewer competitors in the K–5 frame.** Orai, Speeko, Yoodli,
   Poised are all adult. Debate software is 6–12. The K–5 elementary
   frame is the emptiest quadrant on our positioning map.
2. **Buyer clarity.** An elementary principal with a Title I
   discretionary budget is a faster close than a 9–12 debate coach
   who has to route through the activities director. The principal
   is also a repeat purchaser across grade bands.
3. **Standards alignment is tighter.** Common Core SL.K–SL.5 is a
   cleaner "why should we adopt this" story than a patchwork of
   state speech/debate frameworks.
4. **"Kid launches with a class code" fits elementary better.** K–5
   kids can't manage their own logins anyway; pilots don't need
   auth. Middle and high school students can have their own accounts
   — a feature we don't have yet.
5. **The product is lower-stakes in K–5.** A 60-second warm-up is
   low-risk in a 2nd-grade room. In a debate context, students
   expect higher-fidelity coaching, which we can't credibly claim
   until the LLM coach layer ships.

## What changes (besides the site, which already shipped)

- `strategy.md` — revised 2026-04-20 to name K–5 as the primary
  wedge. 6–12 relegated to a secondary lane.
- `gtm.md` — revised 2026-04-20. New primary ICP: elementary
  classroom teachers + Title I elementary principals. New
  conferences: NAESP, ILA, ASCD, NCTE elementary. SEO corpus
  rewritten toward elementary queries.
- Outreach drafts queued tonight lead with a Title I elementary
  principal draft. Speech/debate + middle-school ELA drafts from
  night 1 stay in `outreach-drafts/` and are still valid, but will
  be sent as a lower-priority batch.
- Blog content queue reorients around K–5 topics. Tonight's new
  post targets a 5-minute elementary speaking warm-up — with
  SL-standard mapping inline.
- Prompt library expansion (backlog) prioritizes K–5 prompts.
- Filler-word detector grade-band tuning (backlog) moves up in
  priority, because K–5 is where over-flagging hurts the most.

## What doesn't change

- Product architecture — browser-first, private by design, no
  video off-device. These bets still hold.
- Rule-based feedback for the MVP loop. LLM layer still behind a
  teacher-review gate.
- Pricing structure — the Classroom / School / District tiers
  already work for K–5. Just honest-copy-passed tonight.
- Decision 0001's choice of educator-over-direct-to-consumer.

## Risks

1. **Speech/debate community may read the shift as abandonment.**
   Mitigation: keep the night-1 outreach drafts live; send them in
   a second cadence. Personal reply to any coach who writes in.
2. **Chromebook Web Speech API accuracy on kindergartener voices is
   unverified.** Children's ASR is harder than adults. If 2nd-grade
   session-completion rate is low in a pilot, revisit.
3. **The `for-schools` / `for-educators` pages still use the old
   warm-coral design system.** They survive the K–5 content shift
   but look disconnected from the sticker-brand homepage. Not
   urgent, but visible.

## Sunset criteria

We revisit this decision if:

- A speech/debate association initiates a formal partnership
  conversation before we have an elementary pilot case study.
- Two or more K–5 pilots fail to produce 50%+ weekly student
  participation.
- A well-resourced K–5 competitor (Yoodli-for-kids, or a big ELA
  vendor) ships before we have a published case study.
