# BrightSpeaker — Production Launch Checklist

Last updated: 2026-04-18
Branch: `claude/production-readiness-review-y1fRh`

This is the ordered, opinionated punch list to take BrightSpeaker from "demo-ready
marketing site with a working practice flow" to "paid K-12 pilot I'm comfortable
putting in front of a district."

It is organized in four phases. Do them in order. Each item has a concrete
"done when" so nothing is fuzzy.

---

## Phase 0 — Ship the current site as a pilot-request funnel

Goal: the site you have today, positioned honestly, collecting real leads. No new
product features required. You can do this in a day.

### 0.1 Point a real domain at Vercel
- [ ] Purchase / confirm `brightspeaker.com` DNS access.
- [ ] Deploy the `main` branch to Vercel project.
- [ ] Add `brightspeaker.com` and `www.brightspeaker.com` as custom domains.
- [ ] Confirm HTTPS certificates issue.
- [ ] Hit `https://brightspeaker.com/sitemap.xml` and `/robots.txt` — both should return 200.
- Done when: `brightspeaker.com` loads the home page over HTTPS.

### 0.2 Environment variables in Vercel
- [ ] `CLERK_SECRET_KEY` (production)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (production)
- [ ] `CLERK_SIGN_IN_URL` / `CLERK_SIGN_UP_URL` (or leave defaults)
- [ ] Any analytics keys (see 0.4)
- [ ] Any email provider key (see 0.3)
- Done when: Preview deploys render the nav's Sign-in button without console errors.

### 0.3 Replace the `mailto:` contact flow with a real lead form
The current `/contact` page sends everything to `hello@brightspeaker.com` via mailto.
That's fragile (no spam protection, no CRM capture, no confirmation).
- [ ] Pick an email provider (Resend is the easiest fit with Next.js).
- [ ] Add a `/api/contact` route handler that accepts `{ name, email, role, school, message }`.
- [ ] Server-side validation + honeypot + rate limit (upstash or simple in-memory).
- [ ] Send to `hello@brightspeaker.com` via Resend, plus a confirmation email to the submitter.
- [ ] Replace the two mailto cards on `/contact` with a real `<form>`.
- [ ] Add a success state ("We'll reply within a school day").
- Done when: Submitting the form delivers an email to your inbox and the user sees a success screen.

### 0.4 Analytics + error tracking
- [ ] Install Vercel Analytics or Plausible (privacy-first is the brand fit).
- [ ] Install Sentry (free tier) — wrap layout + middleware.
- [ ] Verify a test event fires from `/` and `/speak`.
- Done when: You can see a pageview in analytics and a test error in Sentry.

### 0.5 Social image (OG)
- [ ] The current OG image is `/brand/mascot-logo.png` (512x512 square). Create a proper
      1200x630 OG card with the product headline.
- [ ] Update `openGraph.images` and `twitter.images` in `app/src/app/layout.tsx`.
- [ ] Test with OpenGraph.xyz and the LinkedIn post inspector.
- Done when: A shared link renders a proper preview card on Slack, LinkedIn, and Twitter/X.

### 0.6 Legal content review
- [ ] Have a lawyer review `app/src/app/privacy/page.tsx` and `app/src/app/terms/page.tsx`.
      These are honest drafts and correctly labeled as pre-launch overviews, but before
      collecting a single school dollar you need a real Privacy Policy and Terms of
      Service document.
- [ ] Swap the "Last updated" date on both when you replace them.
- [ ] Add a cookie banner only if you end up using non-essential cookies (skip it otherwise).
- Done when: Both pages link to lawyer-reviewed documents.

### 0.7 Honesty pass on marketing copy
Already done in this branch, but double-check before launch:
- [x] Removed fabricated school logos ("Riverside USD", etc.) from homepage.
- [x] Removed fabricated testimonials from homepage.
- [x] Removed "Student Privacy Pledge signer" claim (not actually signed).
- [x] Downgraded "MediaPipe pose + face landmarks" claim to match the actual
      face-api.js implementation.
- [x] Downgraded the "Teacher dashboard" and "English & Spanish prompts"
      feature cards to "coming soon" states.
- [x] Updated the FAQ to describe SSO and Chrome Web Speech API honestly.
- [ ] Review the pricing page (`app/src/app/page.tsx` pricing section) — the School
      and District tiers still promise features (Clever/ClassLink SSO, roster sync,
      SOC 2 Type II, signed DPA, PD & teacher training) that don't exist yet. Decide:
      keep them as aspirational tier features (acceptable in B2B sales copy) OR gate
      them behind "Talk to us about enterprise" rather than listing them as included.
- [ ] Review `app/src/app/for-schools/page.tsx` — the "What we do with student data"
      section is honest. The "Sign in with Google Workspace for Education" card
      *promises* this works today; it does not yet. Either implement it (Phase 1)
      or soften the wording.

### 0.8 Pre-flight smoke test
- [ ] In production, open `/speak?prompt=1` on a Chromebook, iPad, and a MacBook.
- [ ] Verify camera + mic permission prompt works.
- [ ] Verify eye-contact coaching loads (models in `/public/models` are served).
- [ ] Verify speech transcription captures words in Chrome.
- [ ] Verify "Start Speaking" on Firefox / unsupported browser shows a graceful error
      (the new `mediaError` state should help, but add a Web Speech detection too).
- [ ] Verify `/history` shows the session you just recorded.
- [ ] Verify `/history` → "Clear History" works.
- Done when: You've personally completed one full practice session on each target device.

**Phase 0 exit criteria:** A prospective teacher or district admin can land on the
site, read the pitch, read the real privacy page, fill out a lead form, and receive a
confirmation email. You can complete a practice session on a Chromebook.

---

## Phase 1 — Build the "teacher + student" product behind auth

Goal: actual multi-user support so a classroom pilot isn't fiction. This is the
biggest chunk of real engineering work.

### 1.1 Data model (Neon Postgres)
- [ ] Define schemas for: `users` (teachers), `classes`, `enrollments` (class codes
      or student slugs), `sessions` (the practice records currently in localStorage),
      `badges`.
- [ ] Pick an ORM — Drizzle fits the Neon + Next.js stack cleanly.
- [ ] Wire `DATABASE_URL` into Vercel env (Neon provides a pooled connection string).
- [ ] Create initial migration.
- Done when: `drizzle-kit push` works against Neon and you can read/write a `session` row from a server action.

### 1.2 Clerk roles + routing
- [ ] In Clerk, define roles: `teacher`, `student`, (eventually `admin`).
- [ ] Gate `/dashboard` to signed-in `teacher` users only.
- [ ] Add `/student` (or `/practice`) for student-side — may or may not require sign-in.
      Easiest pilot model: student enters a class code → writes their first name → session.
- [ ] Add a `/teacher` index with the list of classes.
- [ ] Add `/teacher/[classId]` with class roster + per-student progress.
- Done when: A teacher account sees their class data; a student account can't see it.

### 1.3 Replace localStorage session storage
- [ ] Move `app/src/lib/sessions.ts` from localStorage to a server action that writes
      to Neon, keyed by `(studentId, classId)`.
- [ ] Keep a short-lived optimistic update in memory for the results screen.
- [ ] Update `/history` to fetch from the server.
- [ ] Add a "Clear my history" teacher-only action that actually deletes rows.
- Done when: Clearing browser storage does not lose a student's progress.

### 1.4 Teacher dashboard MVP
- [ ] Class roster view: name, last session, streak, recent score trend.
- [ ] Per-student detail: list of sessions with transcript, filler count, eye contact.
- [ ] CSV export button.
- [ ] "Assign a prompt" (just marks a prompt as today's assigned one for the class).
- Done when: You can sit next to a teacher during a pilot and show them today's class activity.

### 1.5 Google Workspace for Education sign-in
- [ ] Turn on Google as a Clerk social connection.
- [ ] Add a hosted-domain restriction option (per-school lockdown).
- [ ] Update `/for-schools` FAQ to describe the real flow.
- Done when: A teacher can sign in with their `@theirschool.org` account.

### 1.6 Sign-out & account deletion
- [ ] "Sign out" in the UserButton menu (Clerk provides).
- [ ] Self-serve account deletion that also deletes the user's classes + student records.
- [ ] Document the retention policy in the privacy page.
- Done when: A teacher can delete their own data end-to-end without emailing you.

**Phase 1 exit criteria:** A teacher can create a class, share a class code, watch
kids practice, see real per-student progress, and export a CSV. Losing the device
doesn't lose the data.

---

## Phase 2 — Product credibility: metrics, accessibility, reliability

Goal: BrightSpeaker actually measures the things the homepage says it measures,
works for every student, and doesn't break.

### 2.1 Upgrade the coaching engine
- [ ] Decide: stay on face-api.js or move to MediaPipe (which is what the pitch promises).
      MediaPipe gives you pose + face landmarks for real and is also free to run in-browser.
- [ ] Add real gaze-direction estimation (not just "face is centered"). Face-api's
      face landmarks or MediaPipe's iris model will get you there.
- [ ] Add a volume-estimation signal from the microphone (`AnalyserNode` RMS).
      Show it during recording and feed it into the score.
- [ ] Add a pacing signal (already have WPM — surface it better).
- [ ] Tighten filler-word detection: right now it's a regex list. Consider adding
      common mid-sentence hesitation patterns like "aaand", "soooo".
- [ ] Ship a "tips" panel per metric explaining what it means and how to improve.
- Done when: The homepage claim "reads body language, not just voice" is defensible.

### 2.2 Speech-to-text alternative
The Web Speech API works in Chrome/Edge/Safari only, and in Chrome it streams audio
to Google. Both facts make district IT teams nervous.
- [ ] Evaluate on-device STT options: Whisper-tiny via WebGPU/transformers.js, Vosk,
      or Deepgram (server-side, better accuracy, K-12 friendly).
- [ ] If on-device: lazy-load the model the same way face-api.js loads.
- [ ] Update `/privacy` copy to match the new reality.
- Done when: A district can sign a DPA without carving out Chrome's speech API as an exception.

### 2.3 Browser support matrix
- [ ] Explicitly test on: Chrome on Chromebook, Safari on iPad, Edge on Windows,
      Chrome on Mac, Firefox on Mac. Document what works where.
- [ ] Add a browser-compatibility banner on `/speak` if the browser lacks Web Speech
      (currently silent — user never sees an error).
- Done when: Your for-schools FAQ can confidently list supported browsers.

### 2.4 Accessibility pass
K-12 sales can die on a WCAG check. Today the product is only partially accessible.
- [ ] Run the axe DevTools scan on every page; fix violations.
- [ ] Live transcript region → `aria-live="polite"` so screen readers announce words.
- [ ] Eye-contact pill + filler counter → non-color status indicator (icon + text, not just color).
- [ ] Every icon-only button → `aria-label`.
- [ ] Keyboard: you can complete a session without a mouse.
- [ ] Color contrast: the `text-foreground/40` / `/30` utilities on cream backgrounds
      are likely AA-fails — audit with Stark or Contrast Checker.
- [ ] Reduced-motion: the `animate-bounce-in` and similar animations should respect
      `prefers-reduced-motion`.
- Done when: Lighthouse Accessibility ≥ 95 on home, dashboard, speak, history.

### 2.5 Error boundaries & loading states
- [ ] Add a top-level `error.tsx` in `src/app/` with a friendly "something went wrong" + retry.
- [ ] Add `loading.tsx` for pages that fetch.
- [ ] Handle face-api model load failure visibly (today it's `console.error` and silent degradation).
- Done when: Killing the network mid-session does not leave a blank white screen.

### 2.6 Performance
- [ ] Run Lighthouse on `/`, `/for-educators`, `/for-schools`. Target ≥ 90 perf.
- [ ] Migrate the Google Fonts `<link>` in `app/src/app/layout.tsx` to `next/font/google`
      (ESLint warns about this today). This clears the one lint warning and eliminates
      a render-blocking request.
- [ ] Verify all `/public/brand/*.png` images are served with correct `width`/`height`
      props through `next/image` (mascot-logo is already via `next/image`; audit others).
- Done when: Lighthouse Performance ≥ 90 on mobile for the marketing pages.

**Phase 2 exit criteria:** BrightSpeaker works well on every realistic K-12 device,
is accessible to kids with screen readers and motor differences, measures what it
claims to measure, and doesn't crash on bad networks.

---

## Phase 3 — Selling into schools for real money

Goal: you can say yes to procurement and get signed.

### 3.1 Data Privacy Agreement (DPA)
- [ ] Draft a DPA aligned with the NDPA (Student Privacy Pledge standard template)
      and the SDPC exhibit template. Both are free.
- [ ] Have your lawyer review.
- [ ] Host the blank template at `/dpa` or keep it in Notion — either works.
- [ ] Be prepared to sign a district's template instead (most districts insist).
- Done when: A district can request a DPA and receive it the same day.

### 3.2 Compliance posture
- [ ] Student Privacy Pledge: actually sign it (this was falsely claimed in the
      hero pill before the honesty pass). It's free: https://studentprivacypledge.org/
- [ ] File a COPPA-friendly statement on the privacy page.
- [ ] Decide whether to pursue SOC 2 Type II (6–12 months, ~$20k+). For a pilot-stage
      company, start with a SOC 2 Type I and publish the bridge letter.
- [ ] Publish a sub-processor list at `/sub-processors`.
- [ ] Publish a security overview (incident response, data retention, encryption in
      transit/at rest) at `/security`.
- Done when: You can link a district to a real artifact for every compliance claim.

### 3.3 Payment & billing
- [ ] Decide: invoice-based billing (which is how K-12 actually buys) or self-serve
      Stripe (faster but atypical).
- [ ] Build an admin console for issuing/revoking licenses and tracking seat counts.
- [ ] Per-student pricing: add the metering logic (currently the homepage quotes
      $4/$3 per student per year but nothing in the app counts seats).
- Done when: You can invoice a school for 42 students and they can turn on exactly 42 seats.

### 3.4 Pilot playbook
- [ ] Write an onboarding doc: "Here's how to run a 30-day pilot with one classroom."
- [ ] Create a 20-minute demo script.
- [ ] Decide on a pilot success metric (e.g., ≥70% weekly student participation).
- [ ] Schedule a day-30 review template (what went well, what didn't, next steps).
- Done when: You can hand a pilot playbook to another human on your team and they can run it.

### 3.5 Support channel
- [ ] Route `hello@brightspeaker.com` into a shared inbox or Linear/Intercom.
- [ ] Add an SLA in the terms doc ("we respond within one school day").
- [ ] Add an in-app "Report an issue" link on `/speak` and `/history`.
- Done when: No support request can be silently lost.

---

## Appendix A — Known issues documented for the next engineer

These are things I noticed during the review that don't have to block launch but
should be written down somewhere other than Brandon's head.

- **`/proxy.ts` is the Next 16 rename of middleware.** If you upgrade to Next 17+,
  watch for this to move again.
- **Face-api's TinyFaceDetector** only returns a face box. The code interprets
  "face centered horizontally" as "looking at camera." That's very coarse. A kid
  looking at the floor while centered scores well. Fix in Phase 2.1.
- **Filler-word detection is regex-based**. After the honesty pass, the list is
  `["um","uh","er","ah","like","you know","i mean","sort of","kind of"]`. That's
  defensible but it will match literal "like" in sentences like "I like pizza."
  Consider tagging for POS-aware detection, or at least hedging the metric with a
  confidence score.
- **The `CoachUI` mock on the homepage** uses live-animated fake metrics and a
  "Mrs. Rivera" URL. It's clearly a mock, but if you want to tighten the honesty
  pass further, consider using a generic URL like `brightspeaker.com/classroom/demo`.
- **`SignInButton` on the nav** signs users in but nothing in the app yet depends
  on authentication state. Once you do Phase 1, audit this button's landing page.
- **`/history` is a client page that reads localStorage.** After Phase 1.3, the
  server data will not be available during the first paint; add a loading state.
- **`public/brand/favicon-source.png`** is a 1.8MB source file checked into git.
  It's not referenced by code — consider moving to design assets or deleting.

---

## Appendix B — What the repository looks like today

- **Frontend:** Next.js 16.1.6, React 19, Tailwind v4, TypeScript strict.
- **Auth:** Clerk v7 (`@clerk/nextjs`) wired in `src/proxy.ts` and `RootLayout`.
- **Database:** `@neondatabase/auth` listed in deps but the Neon client isn't used anywhere in source code.
- **ML:** `face-api.js` loaded lazily in `/speak`. Model files in `public/models/`.
- **Testing:** Vitest. Two passing tests in `src/lib/sessions.test.ts`.
- **Hosting target:** Vercel.
- **Build:** `next build` clean. ESLint: 1 warning (page custom font), 0 errors.

---

## TL;DR launch call

If you had to ship something this week:
1. Do Phase 0 (one focused day).
2. Start running pilot-request conversations off the honest version of the site.
3. Do Phase 1 in parallel over 2–3 weeks.
4. Phase 2 and 3 are ~6–10 weeks of sustained work; plan them before promising
   anything in a procurement call.

The site is technically solid, but the product it describes is bigger than the
product you have. That's the gap to close before launch — not the code quality.
