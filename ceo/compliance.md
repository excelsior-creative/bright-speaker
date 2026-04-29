# Compliance — COPPA / FERPA notes

_Running list. Not a legal document. Brandon drives formal compliance
before any paid pilot._

## Overall stance

Bright Speaker is a K-12 product. We will be held to COPPA (under 13)
and FERPA (student educational records) standards the moment a real
school deploys us. Today we are pre-pilot, but every architecture
choice should be made as if a district DPO will audit us next month.

## Phase 0 current data flow (as of 2026-04-29)

This table is an internal current-state artifact for pilot readiness. It is not a legal policy, a DPA, or a compliance certification. File references reflect the code reviewed during the 2026-04-29 nightly routine.

| Data / signal | Capture or source | Processing location | Storage / retention today | Third parties involved today | User-facing promise today | Open gap before real student pilots |
|---|---|---|---|---|---|---|
| Camera / video frames | `/speak` requests camera access with `navigator.mediaDevices.getUserMedia({ video: true, audio: true })` in `apps/app/src/app/speak/page.tsx` lines 138-145. The stream is attached to the in-page `<video>` element at lines 161-167 and rendered at line 387. | Student browser only for the live webcam preview and face detection. | Not uploaded and not intentionally stored. Tracks are stopped in `stopWebcam()` at lines 169-174 and cleanup calls it on unmount / session end. | Browser/device APIs; Vercel only serves the app shell. | Public `/privacy` says student video is processed in-browser and is not uploaded, stored, or shared. | Keep this invariant when adding teacher dashboards, recordings, QA tooling, or support workflows; any video recording/storage would raise the work to R4 and require Brandon/counsel approval. |
| Microphone / audio stream | Same `getUserMedia({ video: true, audio: true })` request in `apps/app/src/app/speak/page.tsx` lines 138-145. | Browser captures the stream; Web Speech recognition is initialized client-side in `initSpeechRecognition()` at lines 176-218. | Bright Speaker does not save an audio file today. The browser speech-recognition provider may process audio transiently to produce transcripts. | Browser vendor speech-recognition service. In Chrome, the public privacy page currently discloses Google speech-recognition processing. | Public `/privacy` says Chrome may transmit audio to Google's speech-recognition service and that an on-device alternative is a future goal. | Finalize STT strategy and district disclosure language before pilots. Do not add Deepgram, Whisper server processing, analytics, or any other audio processor without a separate approved spec. |
| Browser speech recognition / transcript text | `initSpeechRecognition()` reads `SpeechRecognition` / `webkitSpeechRecognition` from `window`, sets `continuous`, `interimResults`, and `lang`, then appends final results to React state in `apps/app/src/app/speak/page.tsx` lines 176-218. | Browser plus browser speech-recognition provider. Transcript assembly and filler counting happen in React state. | Final transcript is saved into browser `localStorage` through `saveSession()` in `apps/app/src/lib/sessions.ts` lines 45-58. Session history is capped to the 100 most recent records at line 53. | Browser vendor speech-recognition service; no LLM or server-side transcript processor is called by current code. | Public `/privacy` says transcripts are localStorage today and will move to a database only when authenticated accounts are introduced. | Transcripts can become FERPA-scope education records once tied to a class/student account. Need retention, deletion, access-control, and DPA language before server persistence. |
| Face detection / eye-contact signal | `face-api.js` is lazy-loaded and tiny face detector weights load from `/models` in `apps/app/src/app/speak/page.tsx` lines 100-109. `detectEyeContact()` estimates whether the face is in the center zone at lines 111-136. | Student browser only. Model files are served statically from `apps/app/public/models/`. | Raw frames and detections are not stored. Boolean eye-contact samples are kept in React state during a session; the aggregate percentage is saved in the local session record via line 289. | `face-api.js` package and static model assets served by Vercel; no external face-analysis API. | Public `/privacy` says webcam processing is in-browser and video is not uploaded. | Homepage/educator copy must not overstate this as gaze tracking, body-language AI, or MediaPipe unless implementation changes. Any biometric/face-data commitments need review. |
| Session scores, XP, badges, and progress history | Results are computed in `endRecording()` in `apps/app/src/app/speak/page.tsx` lines 268-300 and saved through `saveSession()`. Progress/badges update in `apps/app/src/lib/sessions.ts` lines 61-110. | Browser only. | Browser `localStorage` keys `bright_speaker_sessions` and `bright_speaker_progress` in `apps/app/src/lib/sessions.ts` lines 35-37. `getSessions()` reads local history at lines 38-43. | None beyond the browser/runtime today. | Public `/privacy` says scores, XP, badges, and transcripts are stored in the browser today. | Server-side history, teacher views, CSV exports, or class rosters move this into FERPA scope and require authz, deletion, retention, DPA, and audit decisions. |
| Auth/account providers | Clerk packages are installed in `apps/app/package.json` lines 14-15 and sign-in/sign-up routes exist, but current `/speak` and `/dashboard` access is not fully gated by a teacher/student role model. | Clerk-hosted/auth infrastructure when enabled; Next.js app runtime for routes. | No current student classroom records are persisted server-side by Bright Speaker. Clerk may process account metadata for users who sign in. | Clerk. Neon is present as a dependency for planned database work, not current session persistence. | Current docs state Clerk is installed/planned and formal account flows are not yet the production student-data model. | Define teacher/student roles, school-domain controls, parental/school consent path, account deletion, and roster data minimization before live pilots. |
| Hosting/runtime and operational logs | Next.js app served by Vercel. Static model assets and pages are delivered from the app repo. | Vercel hosting/edge/serverless runtime. | Server/platform logs may contain request metadata such as IP, path, user agent, and timestamps depending on Vercel configuration. | Vercel. | Public `/privacy` lists Vercel as the website host and notes subprocessors will be disclosed in school agreements. | Confirm deployment visibility, crawler access, production env vars, log retention, and subprocessor/DPA terms before district procurement. |

### Draft educator trust summary — non-legal copy

Bright Speaker is built to practice speaking without turning a student's camera into a surveillance tool. In the current pre-pilot product, webcam video is used only inside the student's browser for the live preview and simple eye-contact indicator; Bright Speaker does not upload or store student video. The practice transcript, score, XP, badges, and history are stored locally in the browser today, not in a school roster database. The biggest current disclosure item is speech recognition: Chrome's built-in Speech Recognition API may send student audio to Google's speech-recognition service to create the transcript. Before any real student pilot, Bright Speaker still needs Brandon/counsel approval on the formal privacy policy, terms, DPA/subprocessor language, retention/deletion rules, and the final speech-to-text strategy.

### Before the first real student pilot

- [ ] Brandon/counsel approve formal Privacy Policy, Terms of Service, and any Data Processing Agreement language.
- [ ] Decide whether the Phase 0 Web Speech API path is acceptable for pilots or whether on-device / contracted STT is required first.
- [ ] Define retention and deletion rules for transcripts, scores, XP, badges, class rosters, and account metadata.
- [ ] Define teacher/student roles, school authorization, and under-13 consent path before enabling classroom accounts.
- [ ] Confirm subprocessor list and DPA posture for Vercel, Clerk, Neon, and the selected STT provider/browser path.
- [ ] Review public marketing/legal copy so it describes current behavior without claiming COPPA compliance, FERPA compliance, DPA readiness, SOC 2, Student Privacy Pledge status, counsel review, or biometric/gaze-analysis capabilities that do not exist.

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
