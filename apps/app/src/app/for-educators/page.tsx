import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For teachers & coaches — Bright Speaker",
  description:
    "How Bright Speaker fits into an elementary classroom day: 5-minute warm-ups, Common Core SL.K–SL.5 alignment, private-by-design practice, and no new grading pile. Free during pilots.",
  openGraph: {
    title: "Bright Speaker for teachers & coaches",
    description:
      "Speaking practice that doesn't add another video pile to grade. Built for K–5 classrooms.",
  },
  alternates: { canonical: "/for-educators" },
};

const FEATURES = [
  {
    icon: "🎤",
    title: "Filler-word coaching",
    body: "The live counter catches the classic K–5 culprits — \"um,\" \"uh,\" \"er,\" \"ah\" — without over-flagging the normal stuff kids say. Over a few sessions, the pause habit starts to stick.",
  },
  {
    icon: "👀",
    title: "Eye contact in frame",
    body: "On-device camera analysis shows students a friendly reminder when they drift off-camera. The video itself never leaves the Chromebook.",
  },
  {
    icon: "⏱",
    title: "60-second reps",
    body: "Students pick a prompt and speak for one minute. Short enough to fit a morning-meeting warm-up, long enough to build speaking stamina.",
  },
  {
    icon: "👩‍🏫",
    title: "Classroom view (coming soon)",
    body: "See who's practicing, how often, and where they're stuck. CSV export for your own gradebook or parent reports. Pilot teachers help shape what ships.",
  },
  {
    icon: "📚",
    title: "Aligned to SL.K–SL.5",
    body: "Every prompt maps to Common Core Speaking & Listening standards: conversation rules (SL.1), presentation (SL.4), and adaptation (SL.6). No new rubric to build.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    body: "Student video is processed in the browser and never uploaded. Transcripts and scores are all we store. No ads, no reselling, no surprise data flows.",
  },
];

const WEEK = [
  {
    day: "Monday",
    body: "Whole class does one 60-second warm-up during morning meeting or bell-work. Picks a prompt, speaks, sees their result. Nobody has to share.",
  },
  {
    day: "Wednesday",
    body: "Assign a prompt that ties to this week's unit — retell the story, describe a character, explain how something works. Students practice once before a real presentation day.",
  },
  {
    day: "Friday",
    body: "Open the teacher view for two minutes: who practiced, who didn't, who's stuck. Call out growth, not grades. Done.",
  },
];

const AUDIENCE = [
  {
    emoji: "🎒",
    title: "K–5 classroom teachers",
    body: "The oral-presentation expectations in SL.K–SL.5 are real, and your morning meeting is already doing some of the work. BrightSpeaker gives every student the reps a single teacher can&apos;t realistically run 1:1.",
    bullets: [
      "Fits a 5-minute morning-meeting slot with zero prep.",
      "Feedback is about the speaking, not the speaker.",
      "Works on the Chromebooks or iPads you already have.",
    ],
  },
  {
    emoji: "📖",
    title: "Middle-school ELA (6–8)",
    body: "The oral presentation unit is valuable and exhausting to run at scale. BrightSpeaker gives every student low-stakes reps leading up to the real presentation, so presentation day feels earned.",
    bullets: [
      "Same prompts, same standards map, same privacy stance.",
      "Student-facing feedback stays warm and growth-framed.",
      "Speech &amp; debate coaches use it as between-meeting homework.",
    ],
  },
];

export default function ForEducators() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      {/* ---------- Hero ---------- */}
      <section className="pt-10 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <span className="pill mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--coral)] inline-block" />
            For teachers &amp; coaches
          </span>
          <h1 className="text-[clamp(40px,4.8vw,64px)]">
            Speaking reps for every student —{" "}
            <span
              style={{
                background:
                  "linear-gradient(180deg, transparent 62%, var(--sun) 62%, var(--sun) 92%, transparent 92%)",
                padding: "0 4px",
              }}
            >
              without another video pile to grade
            </span>
            .
          </h1>
          <p className="mt-6 text-[19px] text-[var(--ink-2)] max-w-[62ch] mx-auto leading-[1.5]">
            BrightSpeaker gives your students structured, private practice on
            the things that make a speaker: filler words, pacing, and eye
            contact. You get a classroom view. They get reps.
          </p>

          <div className="flex gap-3.5 mt-8 flex-wrap justify-center">
            <Link href="/dashboard" className="btn btn-primary">Try a practice session →</Link>
            <Link href="/contact" className="btn">Talk to us about a pilot</Link>
          </div>
          <div className="flex gap-[22px] mt-7 flex-wrap text-sm font-semibold text-[var(--ink-2)] justify-center">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">🧒 Ages 5–11 first</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">📚 Aligned to SL.K–SL.5</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">💻 Chromebook &amp; iPad ready</span>
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="band-paper py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">What your students get</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              A speaking coach for every kid in the room.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="text-[28px]">{f.icon}</div>
                <h3 className="mt-3.5 text-[22px]">{f.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] mt-1.5">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Weekly cadence ---------- */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">A week of BrightSpeaker</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              A realistic cadence. No new prep.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-[18px]">
            {WEEK.map((row) => (
              <div key={row.day} className="step">
                <div
                  className="step-num"
                  style={{
                    background: "var(--coral)",
                    color: "#fff",
                    width: "auto",
                    padding: "2px 14px",
                    borderRadius: 999,
                  }}
                >
                  {row.day}
                </div>
                <p className="text-[var(--ink-2)] text-[15px] mt-2 mb-0 leading-relaxed">{row.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Audiences ---------- */}
      <section className="band-paper py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Who it&apos;s for</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              Built for the teacher we had in mind from day one.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-[18px]">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="feature-card">
                <div className="text-[32px]">{a.emoji}</div>
                <h3 className="mt-3 text-[24px]">{a.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] mt-2 leading-relaxed">
                  {a.body}
                </p>
                <ul className="list-none p-0 mt-4 grid gap-2 text-[15px]">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 items-start">
                      <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span>
                      <span className="text-[var(--ink-2)]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="footer-cta">
            <div>
              <span className="eyebrow" style={{ color: "var(--sun)" }}>
                Ready when you are
              </span>
              <h2 className="mt-2.5">Try it with a classroom this semester.</h2>
              <p>
                Free 30-day pilots, no install, a 20-minute onboarding call
                with the founder. We&apos;re looking for a small number of
                K–5 classrooms to help us make this product what it needs
                to be.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Link href="/contact" className="btn btn-primary">Start a pilot →</Link>
              <Link href="/dashboard" className="btn" style={{ background: "#fff" }}>
                Or try a session first
              </Link>
              <span className="text-[13px] text-center" style={{ color: "#B9C0D4" }}>
                Questions?{" "}
                <a href="mailto:hello@brightspeaker.com" className="text-white underline">
                  hello@brightspeaker.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
