# Compliance — COPPA / FERPA notes

_Running list. Not a legal document. Brandon drives formal compliance
before any paid pilot._

## Overall stance

Bright Speaker is a K-12 product. We will be held to COPPA (under 13)
and FERPA (student educational records) standards the moment a real
school deploys us. Today we are pre-pilot, but every architecture
choice should be made as if a district DPO will audit us next month.

## Current data flows (as of 2026-04-26)

1. **Camera + microphone** → the student's browser, via
   `getUserMedia`. Stream is attached to a `<video>` element and a
   media recorder.
2. **Video** — NEVER leaves the device. Not uploaded, not stored.
   ✅ Good.
3. **Audio** — Fed into the browser's Web Speech API
   (`webkitSpeechRecognition`). On Chrome this **is** transmitted to
   Google's speech servers for ASR. ⚠️ This is a real data flow we
   need to disclose.
4. **Transcript** — Returned from Web Speech API, stored in
   browser `localStorage`. ✅ Local only today.
5. **Face detection** — `face-api.js` runs entirely in the browser.
   No face data leaves the device. ✅ Good.
6. **Scores, XP, badges, session history** — `localStorage` today.
   When we add server-side persistence, this becomes FERPA-scope
   educational record data. Plan for it.
7. **Auth (Clerk)** — Installed but not gating routes. When gated,
   email / name / profile photo transit through Clerk's
   infrastructure. Clerk will be a sub-processor.
8. **Hosting (Vercel)** — Standard edge + serverless. Sub-processor.

## Data flow diagram (KR 5.1)

This is the per-data-element flow as the product behaves on `main`
today (2026-04-26). It is a working artifact, not a privacy policy.
Update it whenever the product changes; supersede on every PR that
touches camera, microphone, or storage.

```
                      STUDENT'S BROWSER
                     (Chromebook, Chrome)

  ┌─────────────────────────────────────────────────────────┐
  │  CAMERA  ────────►  <video> element  (never uploaded)   │
  │                              │                          │
  │                              ▼                          │
  │                      face-api.js                        │
  │                   (in-browser, WASM)                    │
  │                              │                          │
  │                              ▼                          │
  │                  eye-contact heuristic                  │
  │                  (face-box centered)                    │
  │                              │                          │
  │                              ▼                          │
  │                      "score" number                     │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  MIC  ──►  Web Speech API  ────────►  GOOGLE servers    │
  │             (browser-native)              ▲             │
  │                              │            │             │
  │                              ▼            │             │
  │                       transcript ◄────────┘             │
  │                              │                          │
  │                              ▼                          │
  │                  filler-word counter                    │
  │                  WPM / pace counter                     │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  RESULTS PAGE                                           │
  │  score, XP, badges, transcript, timestamps              │
  │                              │                          │
  │                              ▼                          │
  │     localStorage (this browser only, ~100 sessions)     │
  └─────────────────────────────────────────────────────────┘
```

**Data elements that touch a third party today:**

| Element                | Where it goes                | Sub-processor   |
|------------------------|------------------------------|-----------------|
| Live audio (during session) | Web Speech API → Google    | Google          |
| Page request / static asset | Vercel edge + origin       | Vercel          |
| Future: Clerk identity     | Clerk infrastructure        | Clerk (planned) |
| Future: Session record     | Neon Postgres (US-East)     | Neon (planned)  |

**Data elements that do NOT leave the device today:**

- Raw video from the camera.
- Face landmark coordinates from `face-api.js`.
- Score, XP, badges (until persisted; localStorage only today).

**What changes when PR #5 ("Persistent sessions in Neon behind
Clerk auth") merges:**

- `/dashboard`, `/history`, `/speak`, `/api/sessions`, `/api/progress`
  become auth-gated. Anonymous students lose access; school-rostered
  Google-Workspace students gain durable, cross-device sessions.
- Session records (score, XP, transcript, timestamps, prompt id)
  move from `localStorage` to Neon Postgres, keyed on Clerk
  `userId`. **At this moment they begin to constitute "education
  records" under FERPA** if a school is the customer.
- Clerk becomes a sub-processor for student identity (email, name,
  avatar). Neon becomes a sub-processor for session records.
- Student transcripts become server-stored. We must add: a 20k-char
  cap (the PR has it), a documented retention policy (we don't yet),
  a per-school deletion mechanism (we don't yet), and a per-student
  export for FERPA disclosure requests (we don't yet).
- The data-flow diagram above gains a new arrow: results → POST
  `/api/sessions` → Neon Postgres.

**Open compliance items that should be done in the same PR cycle
as PR #5 lands**:

1. Add a documented retention policy (suggest: 13 months rolling,
   purge older).
2. Add a teacher-initiated per-student deletion endpoint.
3. Add a transcript export endpoint scoped to the authed user, so
   FERPA disclosure is mechanically possible.
4. Update `/privacy` to reflect server-stored session records.

## Sub-processor list (living)

| Vendor | Purpose | Student PII? | DPA signed? |
|---|---|---|---|
| Vercel | Hosting | Server logs may include IPs | No |
| Clerk | Auth | Email, name, avatar | No |
| Neon | DB (not wired) | Planned: session records | No |
| Google (Web Speech API) | ASR | **Student voice audio** during session | N/A — browser-level |

This Google dependency is the most significant data flow kids'
voices go through a third party's ASR, via the browser. Two
mitigations to consider:

- Disclose it plainly on a public trust page.
- Long-term, evaluate on-device ASR (Whisper.cpp, web-native
  SpeechRecognition, or a self-hosted ASR) to avoid the
  third-party flow entirely. Track in backlog.

## COPPA-adjacent considerations

- **Direct-to-student signup**: today anyone can access `/dashboard`
  and `/speak` without authentication. When we gate with Clerk, if
  students under 13 sign up directly (not school-rostered), we
  need verifiable parental consent per COPPA. Easiest path: only
  allow student access via school-provisioned Google Workspace
  accounts, where the school serves in loco parentis under the
  FTC's school-authorization exception. Flag to Brandon.
- **No ad tracking, no third-party analytics cookies** — hold this
  line. If we want product analytics, use something privacy-first
  (PostHog self-hosted, Plausible). Gate on approval.
- **Data minimization**: only collect what we use. We do not need
  student birthdate, phone, home address, etc.

## FERPA-adjacent considerations

- Session scores become "education records" the moment they're
  stored server-side and tied to a roster-provisioned student.
- Schools are the data controllers; we process on their behalf.
  When we sign school contracts, we need a DPA that declares us a
  "school official with a legitimate educational interest" under
  FERPA §99.31(a)(1) so the school doesn't need separate parental
  consent for us to access records.
- Deletion / amendment rights: a school must be able to request
  deletion or correction of a student's records. Build this into
  the teacher dashboard from day 1 of persistent storage.

## State-level (things to track, not solve yet)

- California (AB 1584, SOPIPA): tighter than federal.
- New York Education Law §2-d: specific data-security
  requirements and a breach notification regime.
- Illinois SOPPA: requires signed DPA, annual data inventory.
- COPPA-adjacent state laws: CO, CT, NH, and others have adopted
  student data privacy rules.

Hold these until we have a real pilot in a specific state; then
comply with that state's flavor.

## Age-appropriate feedback

A compliance-adjacent product issue. AI feedback to a seventh-
grader that calls her speaking "weak" or "boring" is not a GDPR
violation, but it's the kind of thing that ends a pilot and a
reputation. Rules we will hold ourselves to:

1. Feedback is about the speaking, not the speaker.
2. No "good / bad" framing; growth framing only.
3. No ranking students against each other.
4. Every new LLM-generated feedback prompt reviewed by a K-12
   teacher before it ships.
5. Profanity / harmful-content filters on both transcript
   processing and generated feedback.

## Open questions for Brandon (formal-compliance track)

1. Do we have a Data Processing Agreement template ready? We'll
   need one for the first pilot that goes through procurement.
2. Terms of Service + Privacy Policy — who drafts? (Counsel,
   Iubenda, other?)
3. Are we comfortable claiming "COPPA-aligned" in educator copy
   before we have a formal review? Recommendation: don't. Say
   "private by design" + describe the actual data flow.
4. Student Data Privacy Consortium (SDPC) registration? Can be a
   differentiator in certain district RFPs.

## Things we will NOT do

- Never claim compliance certifications we haven't achieved
  (SOC 2, COPPA-compliant, FERPA-ready, etc.).
- Never send student recordings to any third party without
  explicit authorization.
- Never send transcripts to an LLM without stripping obvious
  identifiers and making the data flow clear in our trust page.
- Never build a parent-report email that goes out without a
  teacher's involvement — goes against the school-as-controller
  model.
