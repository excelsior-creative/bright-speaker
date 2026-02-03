# SpeakUp - Product Requirements Document

**Project:** SpeakUp - AI Communication Coach for Kids
**Version:** 0.1 (MVP)
**Created:** 2026-02-01
**Owner:** Brandon Johnson

---

## 🎯 Vision

Train K-12 students to become confident, clear communicators through gamified AI coaching. Kids practice speaking to their webcam, and AI provides real-time feedback and encouragement.

---

## 🧩 Problem Statement

1. Kids get almost zero structured practice on verbal communication in school
2. Teachers don't have bandwidth for 1:1 speech coaching
3. Filler words (um, like, you know) become ingrained habits early
4. Shyness/anxiety around public speaking starts in childhood and compounds
5. No existing solution specifically designed for K-12

---

## 👤 Target Users

### Primary: Students (K-12)
- Age range: 5-18 years old
- Tech comfort: Chromebook users (school-issued)
- Motivation: Gamification, achievements, leveling up

### Secondary: Teachers
- Need: Track student progress, assign activities
- Pain: No time for 1:1 communication coaching

### Tertiary: Parents
- Want: Help kids build confidence
- Use case: After-school practice, competition prep

---

## 🏗️ MVP Scope

### Core User Flow

```
1. Student logs in
2. Sees their current level/progress
3. Selects or is assigned a speaking activity
4. Prompt appears on screen (story starter, topic, question)
5. Student clicks "Start Speaking"
6. Webcam + mic activate
7. Student speaks while AI monitors:
   - Speech transcription (what they say)
   - Filler word detection (um, uh, like, you know, yeah)
   - Speaking pace (too fast/slow)
   - Eye contact (looking at camera vs away)
   - Clarity score
8. Timer/progress indicator shows during speech
9. Student clicks "Done" or time expires
10. Results screen shows:
    - Congratulatory message
    - Score breakdown (filler words, eye contact, clarity)
    - "What to work on next time" tip
    - XP earned, progress toward next level
11. Return to dashboard, see updated progress
```

### MVP Features

#### Must Have (P0)
- [ ] User authentication (student accounts)
- [ ] Simple dashboard showing current level
- [ ] Speaking prompts library (10-20 starter prompts)
- [ ] Webcam/mic capture during speaking
- [ ] Real-time speech transcription
- [ ] Filler word detection and counting
- [ ] Basic eye contact detection (looking at camera Y/N)
- [ ] Session timer (30-60-90 second options)
- [ ] Results screen with score + feedback
- [ ] XP/points system
- [ ] Level progression (Levels 1-5 for MVP)

#### Should Have (P1)
- [ ] Speaking pace analysis (words per minute)
- [ ] Age-appropriate prompts by grade level
- [ ] Achievement badges
- [ ] Progress history/chart
- [ ] Parent/teacher view (read-only progress)

#### Could Have (P2)
- [ ] Video playback of session
- [ ] Detailed eye contact tracking (% of time)
- [ ] Voice clarity/volume analysis
- [ ] Google Classroom integration
- [ ] Multiple user profiles per device

#### Won't Have (MVP)
- Peer practice / multiplayer
- Live teacher monitoring
- District-wide analytics
- Native mobile apps
- Multi-language support

---

## 📊 Metrics for MVP Success

| Metric | Target |
|--------|--------|
| Session completion rate | >70% |
| Return sessions (same user) | >3 per week |
| Avg session duration | 2-5 minutes |
| Filler word reduction | 20% over 10 sessions |
| User satisfaction (qualitative) | Positive feedback from 5+ test users |

---

## 🛠️ Technical Architecture

### Stack
- **Frontend:** Next.js 15+ (React, TypeScript)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes (serverless)
- **Database:** Neon (PostgreSQL)
- **Auth:** Clerk (supports school SSO later)
- **Hosting:** Vercel
- **Speech-to-Text:** Web Speech API (free) → Deepgram (paid, better accuracy)
- **AI Feedback:** Claude API (age-appropriate responses)
- **Eye Contact:** TensorFlow.js face-mesh (client-side)

### Key Technical Considerations

1. **Privacy (COPPA)**
   - Minimize data collection
   - No persistent video storage
   - Parental consent flows for <13
   - Clear privacy policy

2. **Browser Compatibility**
   - Must work on Chrome (Chromebooks)
   - Webcam/mic permissions handling
   - Fallback for unsupported browsers

3. **Real-time Processing**
   - Speech transcription: client-side Web Speech API
   - Filler detection: local processing
   - Eye contact: TensorFlow.js face-mesh (runs in browser)
   - No video sent to server (privacy)

4. **Gamification**
   - XP for completing sessions
   - Level thresholds (e.g., 100 XP per level)
   - Visual progress bar
   - Celebratory animations on level-up

---

## 🎨 UX/UI Direction

### Visual Style
- Bright, friendly colors (not corporate)
- Kid-appropriate but not childish (works for teens too)
- Mascot character? (optional - could be later)
- Clear, large UI elements (touch-friendly)
- Celebration animations (confetti, stars)

### Key Screens
1. **Login/Signup** - Simple, school-friendly
2. **Dashboard** - Level, XP, recent activity, start button
3. **Prompt Selection** - Browse/assigned prompts
4. **Speaking Session** - Webcam view, prompt, timer
5. **Results** - Score, feedback, encouragement
6. **Profile/Progress** - History, achievements, settings

---

## 📅 Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Next.js, Tailwind, Neon)
- [ ] Auth setup (Clerk)
- [ ] Basic database schema (users, sessions, scores)
- [ ] Landing page
- [ ] Login/signup flow

### Phase 2: Core Features (Week 2)
- [ ] Dashboard UI
- [ ] Webcam/mic capture component
- [ ] Speech transcription integration
- [ ] Filler word detection logic
- [ ] Basic prompts system

### Phase 3: Analysis & Feedback (Week 3)
- [ ] Eye contact detection (TensorFlow.js)
- [ ] Results/scoring algorithm
- [ ] AI feedback generation (Claude)
- [ ] Results screen UI
- [ ] XP/level system

### Phase 4: Polish & Test (Week 4)
- [ ] Gamification polish (animations, sounds)
- [ ] Progress tracking UI
- [ ] Bug fixes
- [ ] Test with real kids
- [ ] Iterate based on feedback

---

## 🔒 Privacy & Safety

### COPPA Compliance
- [ ] Parental consent mechanism for <13
- [ ] Minimal data collection
- [ ] No third-party ad tracking
- [ ] Clear privacy policy
- [ ] Data deletion on request

### Content Safety
- [ ] Age-appropriate prompts only
- [ ] No chat/messaging between users
- [ ] AI feedback reviewed for appropriateness
- [ ] Report mechanism for issues

---

## 📝 Open Questions

1. **Domain choice:** speakup.gg vs speakuplearn.com?
2. **Initial test users:** Brandon's kids? Friends' kids?
3. **Pricing model:** Free MVP → paid school licenses?
4. **Teacher dashboard:** Include in MVP or V2?
5. **Video recording:** Store locally for playback? Privacy concerns.

---

## 📚 Research & References

- **Competitive analysis:** `memory/projects/speakup-kids-research.md`
- **Market research:** Orai, Speeko, Yoodli (all adult-focused)
- **Speech API docs:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **TensorFlow face-mesh:** https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection

---

*Last updated: 2026-02-01*
