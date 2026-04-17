# 0001 — Lead with educator wedge, not direct-to-parent

**Status:** Accepted
**Date:** 2026-04-17
**Decider:** Nightly CEO routine (to be confirmed by Brandon)

## Context

The current landing page (`src/app/page.tsx`) uses parent-flavored
hero copy ("Help Your Child speak with confidence"). The mandate
from Brandon is GTM through licensing to schools and districts,
with Google Workspace for Education SSO as the implied sign-in path.

Going direct-to-parent is a different business: higher CAC,
impulse-purchase price points (<$10/mo), app-store distribution,
and the engagement decay of any kids' subscription product.
Selling to schools is slower per deal but the unit economics and
compounding effects (teachers recommend other teachers, districts
adopt building-wide) are what justify the K-12 positioning.

## Decision

Position Bright Speaker primarily for educators. Specifically:

1. Keep a warm, family-legible landing page (parents are a top-of-
   funnel source of teacher-aware demand), but add dedicated
   `/for-schools` and `/for-educators` pages that are the
   canonical entry points for professional buyers.
2. Wedge through **speech & debate coaches** and **ELA teachers
   grades 4–8**, not district-level RFPs.
3. Pricing page describes pilot-only pricing for now. Commercial
   pricing after ≥5 educator pricing conversations.
4. All cold outreach is educator-directed, not parent-directed.
5. The free tier is teacher-scoped ("one classroom, up to 35
   students"), not per-student.

## Consequences

- Marketing site structure: `/for-schools`, `/for-educators`,
  `/pricing`, `/trust`, `/contact` become first-class routes.
- Blog and SEO content target educator-intent keywords, not
  parent-intent.
- Product priorities tilt toward teacher view, classroom codes,
  and school SSO over parent dashboards.
- We will still take teacher-facing signups without a district,
  because the wedge requires individual-teacher adoption.

## Alternatives considered

- **Pure direct-to-parent**: rejected; doesn't match the licensing-
  to-schools mandate and creates CAC economics we can't win.
- **Top-down district RFPs only**: rejected for pre-pilot stage;
  cycle time too long. Return to this after we have 3 pilots and
  a case study.

## How this can change

- A speech/debate association signals interest in a formal
  partnership. Accelerate top-down.
- Teacher adoption stalls after ≥60 educator conversations with
  low conversion. Re-examine wedge assumptions.
