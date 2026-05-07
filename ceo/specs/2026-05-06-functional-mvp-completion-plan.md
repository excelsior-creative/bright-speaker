---
title: Functional MVP Completion Plan
status: proposed
risk_tier: R4
owner: Timmy
reviewer: Quinn
created: 2026-05-06
source:
  - ceo/strategy.md#v1-product-direction-locked-2026-04-29
  - ceo/specs/2026-04-29-teacher-class-code-pilot-backbone.md
  - ceo/compliance.md#before-the-first-real-student-pilot
---

# Functional MVP Completion Plan

> **For Hermes:** Use `subagent-driven-development` after Brandon explicitly approves the R4 implementation scope. Keep each PR scoped to one slice below and require Quinn review before merge/deploy.

**Goal:** Ship a functional BrightSpeaker MVP that one K-5 teacher can use with one class: create a class, share a class code, let students practice, see progress, and export/copy a principal-ready pilot summary.

**Architecture:** Keep the student speaking loop browser-first and privacy-minimized. Add a small server-side classroom backbone around the existing app: teacher-authenticated class creation, code-based student join, minimal session persistence, teacher progress view, and pilot summary. Do not add new AI/STT vendors, video upload/storage, SIS import, Google Classroom integration, parent accounts, or analytics in this MVP.

**Tech Stack:** Next.js 16 App Router, React 19, Clerk for teacher auth, Neon/Postgres for minimal classroom/session records, Vitest for domain logic tests, Playwright/manual smoke for the complete classroom loop.

---

## MVP definition

The MVP is complete when this manual smoke path works on a deployed preview:

1. Teacher signs in.
2. Teacher creates a class named `Mrs. Rivera - Grade 4`.
3. App generates a short class code such as `RIVERA7`.
4. Student opens `/join`, enters the class code, chooses a display name or initials, and lands in the practice flow without adult-style account creation.
5. Student completes one speaking prompt.
6. Session summary persists server-side with privacy-minimized fields.
7. Teacher dashboard shows that student's latest session and class totals.
8. Teacher opens/copies a pilot summary suitable for a principal.
9. Data-flow docs, privacy notes, and deletion/export posture are updated before any real student pilot.

## Non-goals for this MVP

- No Google Classroom/SIS rostering.
- No parent accounts or direct student self-signup.
- No LLM-generated feedback.
- No new STT, transcription, analytics, or error-tracking vendor.
- No uploaded/stored audio or video.
- No public legal/compliance claims beyond approved, factual data-flow copy.
- No production rollout to real students until Brandon approves R4 deployment and privacy/legal guardrails.

## Approval gate

Implementation touches auth, class membership, persisted student-session records, and children/student data. Effective tier is **R4**.

Before code work starts, Brandon must explicitly approve this implementation scope. Before production deployment or real student use, Brandon must separately approve deployment/pilot readiness after Quinn review.

Recommended approval text:

> Approved for BrightSpeaker R4 MVP implementation: teacher class creation, class-code join, privacy-minimized student session persistence, teacher progress dashboard, and principal-ready pilot summary. No new STT/AI/analytics vendor, no stored audio/video, no real-student production pilot until separate deployment approval.

---

## Slice 0 — Clean the runway

**Objective:** Make the current repo safe to build from and prevent stale conflicting work from polluting the MVP path.

**Files:**
- Update: `ceo/next.md`
- Update: `ceo/INBOX.md`
- No product code changes.

**Steps:**
1. Close or leave alone stale open PR #21 (`feat/game-progression-polish`) because it is conflicting and not required for the MVP backbone.
2. Do not merge PR #5 directly. Treat it as research/reference for the new R4 classroom persistence implementation because it is conflicting and predates the class-code product direction.
3. Keep `ceo/specs/2026-04-27-browser-support-speak-fallback.md` as the only pre-MVP R2 hardening item; it can run in parallel or before the MVP branch.
4. Confirm local dev readiness with `pnpm install`, then run `pnpm test`, `pnpm lint`, `pnpm build`.

**Verification:**
- `gh pr list` shows only understood historical PRs.
- Baseline commands pass before MVP implementation starts, or failures are documented as separate blocking issues.

## Slice 1 — Add classroom domain model and data access

**Objective:** Define the minimum data model for teachers, classes, anonymous class-code students, and practice sessions.

**Files:**
- Create: `apps/app/src/lib/classroom/types.ts`
- Create: `apps/app/src/lib/classroom/code.ts`
- Create: `apps/app/src/lib/classroom/schema.sql`
- Create: `apps/app/src/lib/classroom/repository.ts`
- Create: `apps/app/src/lib/classroom/repository.test.ts`

**Model:**
- `classes`: `id`, `teacher_user_id`, `name`, `code`, `grade_band`, `created_at`, `archived_at`.
- `class_students`: `id`, `class_id`, `display_name`, `join_token`, `created_at`, `deleted_at`.
- `practice_sessions`: `id`, `class_id`, `student_id`, `prompt_id`, `prompt_title`, `score`, `filler_count`, `duration_seconds`, `eye_contact_percent`, `words_per_minute`, `xp_earned`, `transcript_excerpt_or_hash`, `created_at`.

**Privacy rule:** Do not store raw audio/video. Keep transcript storage either disabled or capped/minimized until Brandon approves exact retention/deletion language.

**Verification:**
- Unit tests prove class codes are unique-ish, normalized, and reject ambiguous characters.
- Repository tests can run against a test database or mocked DB boundary.

## Slice 2 — Teacher class creation

**Objective:** Let a signed-in teacher create and view classes with generated codes.

**Files:**
- Create: `apps/app/src/app/dashboard/classes/page.tsx`
- Create: `apps/app/src/app/dashboard/classes/actions.ts`
- Create: `apps/app/src/components/classroom/CreateClassForm.tsx`
- Modify: `apps/app/src/app/dashboard/page.tsx`
- Modify: `apps/app/src/app/dashboard/layout.tsx`

**Behavior:**
- Teacher auth required via Clerk.
- Teacher creates a class with name + optional grade band.
- Server action creates the class under `auth().userId`.
- Dashboard shows active classes and shareable class code.
- Teacher cannot see or mutate another teacher's classes.

**Verification:**
- Access tests for signed-out redirect.
- Unit/integration test for authorization helper.
- Manual smoke: sign in → create class → see code.

## Slice 3 — Student class-code join flow

**Objective:** Students join with a code and start practice without adult account creation.

**Files:**
- Create: `apps/app/src/app/join/page.tsx`
- Create: `apps/app/src/app/join/actions.ts`
- Create: `apps/app/src/components/classroom/JoinClassForm.tsx`
- Modify: `apps/app/src/app/speak/page.tsx`

**Behavior:**
- Student enters class code + first name/initials only.
- App creates a class-scoped student record and short-lived join token/session cookie.
- Successful join redirects to `/speak?class=<code>&student=<token>` or equivalent secure route state.
- Invalid/archived class code gives a warm, kid-safe error.

**Verification:**
- Tests for code lookup and archived-class rejection.
- Manual smoke: `/join` → enter code → lands in practice.

## Slice 4 — Persist privacy-minimized student practice sessions

**Objective:** Move the MVP evidence that teachers need from browser-only localStorage into class-scoped server records.

**Files:**
- Create: `apps/app/src/app/api/classroom/sessions/route.ts` or server action equivalent.
- Modify: `apps/app/src/app/speak/page.tsx`
- Modify: `apps/app/src/lib/sessions.ts` only as a compatibility wrapper.
- Create: tests for session validation and authz.

**Behavior:**
- Existing anonymous/local demo mode still works outside class context.
- In class context, session completion posts only MVP metrics needed by the teacher.
- Validate numeric bounds and prompt metadata server-side.
- Do not store audio/video.
- Transcript storage is either omitted or limited to approved excerpt/hash strategy.

**Verification:**
- Tests reject invalid class/student tokens.
- Tests prove one class cannot write into another class.
- Manual smoke: class student completes prompt → server record exists.

## Slice 5 — Teacher progress dashboard

**Objective:** Give the teacher enough evidence to run a 30-day pilot.

**Files:**
- Create: `apps/app/src/app/dashboard/classes/[classId]/page.tsx`
- Create: `apps/app/src/components/classroom/ClassProgressTable.tsx`
- Create: `apps/app/src/components/classroom/ClassSummaryCards.tsx`

**Behavior:**
- Teacher sees roster display names, latest session date, total sessions, average score, best recent score, completion count, and last prompt.
- Empty state explains how to share the class code.
- No cross-teacher data leakage.

**Verification:**
- Authorization tests.
- Manual smoke: teacher sees student session after completion.

## Slice 6 — Principal-ready pilot summary

**Objective:** Produce the MVP artifact that makes the product sellable beyond a single teacher.

**Files:**
- Create: `apps/app/src/app/dashboard/classes/[classId]/summary/page.tsx`
- Create: `apps/app/src/components/classroom/PilotSummary.tsx`
- Optional: `apps/app/src/lib/classroom/summary.ts` + tests.

**Behavior:**
- Summary includes class name, date range, number of students, total sessions, average sessions/student, completion trend, top practice categories, and plain-English interpretation.
- Include a copy-to-clipboard button.
- Avoid claims about learning outcomes that the data does not prove.

**Verification:**
- Summary math tests.
- Manual smoke: summary opens and can be copied for a principal.

## Slice 7 — Privacy, deletion/export, and pilot-readiness docs

**Objective:** Ensure the MVP can be shown responsibly without overstating compliance.

**Files:**
- Update: `ceo/compliance.md`
- Update: `apps/app/src/app/privacy/page.tsx`
- Update: `apps/app/src/app/terms/page.tsx` only if needed.
- Create: deletion/export backlog issue or implement minimal teacher-delete if approved.

**Behavior:**
- Docs reflect server-stored class/session records.
- Public copy is factual: no COPPA/FERPA certification claims.
- Retention/deletion stance is documented before real pilots.

**Verification:**
- Quinn review against `ceo/compliance.md`.
- Manual copy review for prohibited claims.

## Slice 8 — End-to-end smoke and release packet

**Objective:** Prove MVP readiness on a preview before any production deployment.

**Files:**
- Create: `apps/app/tests/mvp-classroom.spec.ts` if Playwright credentials/local env allow.
- Update: `ceo/journal/YYYY-MM-DD.md` with smoke evidence.

**Verification commands:**
- `pnpm test`
- `pnpm lint`
- `pnpm build`
- Manual smoke: teacher creates class → student joins → student practices → teacher sees progress → summary copied.

**Release gate:**
- Quinn review passed.
- Brandon separately approves production deployment / pilot readiness.
- No real-student pilot until privacy/legal guardrails are explicitly approved.

---

## Recommended implementation order

1. Get Brandon's R4 implementation approval using the approval text above.
2. Run Slice 0 to clean baseline and install dependencies.
3. Build Slices 1–2 in PR 1: data model + teacher class creation.
4. Build Slices 3–4 in PR 2: join flow + session persistence.
5. Build Slices 5–6 in PR 3: progress dashboard + pilot summary.
6. Build Slice 7 in PR 4: privacy/docs/deletion-export posture.
7. Run Slice 8 before production deployment.

## Owners

- **Timmy/Peter:** Maintain this plan, scope, approval gates, and handoffs.
- **Devon:** Implement product/code slices after approval.
- **Quinn:** Review authz, privacy minimization, tests, and release readiness.
- **Brandon:** Approve R4 implementation scope and later production/pilot deployment.
