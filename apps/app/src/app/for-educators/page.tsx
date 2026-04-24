import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Mic, Eye, Clock, Users, Shield } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For teachers & coaches — Bright Speaker",
  description:
    "How Bright Speaker fits into elementary ELA, oral language routines, and classroom speaking practice. Browser-based, Chromebook-native, free during pilots.",
  openGraph: {
    title: "Bright Speaker for teachers & coaches",
    description:
      "Speaking practice that doesn't add another video pile to grade.",
  },
};

const FEATURES = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Filler-word coaching",
    desc: 'The live counter catches "um," "uh," "like," and "you know" as students speak. Over a few sessions, the pause habit starts to stick.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Eye contact in frame",
    desc: "On-device camera analysis shows students a friendly reminder when they drift off-camera. The video itself never leaves the Chromebook.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "60-second reps",
    desc: "Students pick a prompt and speak for one minute. Short enough to fit in a morning warm-up, long enough to build real speaking stamina.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Classroom view",
    desc: "See which students are practicing, how often, and where they're stuck. CSV export for your own gradebook or progress reports.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Aligned to SL.K–SL.5",
    desc: "Prompts map to Common Core Speaking & Listening standards for kindergarten through fifth grade — the same strands your team is already planning around.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Private by design",
    desc: "Student video is processed in the browser and never uploaded. We store transcripts and scores. No ads, no reselling, no surprise data flows.",
  },
];

const WEEK = [
  {
    day: "Monday",
    what: "Whole class does one 60-second warm-up during morning meeting or arrival bell-work — pick a prompt, speak, see the coach's reaction.",
  },
  {
    day: "Wednesday",
    what: "Assign a prompt tied to the week's unit — a show-and-tell retell, an opinion speech, a book talk, a how-to explanation.",
  },
  {
    day: "Friday",
    what: "Open the classroom view for two minutes. Who practiced? Who's hiding from the camera? Who's growing? Celebrate growth, not grades.",
  },
];

export default function ForEducators() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="pill mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--coral)] inline-block" />
            For teachers &amp; coaches
          </span>
          <h1 className="text-[clamp(36px,4.2vw,58px)] mb-5">
            Speaking reps for every kid in the room — without adding another video pile to grade.
          </h1>
          <p className="lede mx-auto">
            Bright Speaker gives elementary students structured, private
            practice on the things that actually make a speaker: filler
            words, pacing, and eye contact. You get a classroom view.
            They get reps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/dashboard" className="btn btn-coral">
              Try a practice session
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-sm">
              Talk to us about a classroom pilot →
            </Link>
          </div>
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="w-10 h-10 rounded-xl bg-[var(--cream-2)] border-[2.5px] border-[var(--ink)] text-[var(--coral)] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-display text-[20px] mb-2">{f.title}</h3>
              <p className="text-[15px] text-[var(--ink-2)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="card p-8 md:p-10 mb-20">
          <span className="eyebrow">A realistic week</span>
          <h2 className="text-[clamp(28px,3vw,38px)] mt-3 mb-2">
            How a week with Bright Speaker looks
          </h2>
          <p className="text-[var(--ink-2)] mb-6 max-w-[56ch]">
            Nothing added to your prep. No grading pile. A cadence designed
            for the way elementary classrooms actually run.
          </p>
          <div className="space-y-4">
            {WEEK.map((row) => (
              <div key={row.day} className="flex gap-4 items-start">
                <div className="w-24 flex-shrink-0 font-display font-extrabold text-[var(--coral)]">
                  {row.day}
                </div>
                <div className="text-[var(--ink-2)] leading-relaxed">
                  {row.what}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-8">
            <span className="eyebrow">Who this is for</span>
            <h2 className="text-[clamp(28px,3vw,38px)] mt-3">
              Built first for the elementary classroom we hear from most
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8">
              <div className="text-3xl mb-3">🍎</div>
              <h3 className="font-display text-[22px] mb-2">
                K–5 classroom teachers
              </h3>
              <p className="text-[15px] text-[var(--ink-2)] leading-relaxed mb-4">
                Show-and-tell, book talks, morning-meeting shares, and
                Socratic circles are already on your calendar. Bright
                Speaker gives every student low-stakes reps between the
                real moments — so presentation day feels less scary and
                more earned.
              </p>
              <ul className="text-[14px] text-[var(--ink-2)] space-y-2">
                <li>• Fits a 5-minute warm-up without prep.</li>
                <li>• Feedback is about the speaking, not the speaker.</li>
                <li>• Maps to SL.K–SL.5 your admin already tracks.</li>
              </ul>
            </div>

            <div className="card p-8">
              <div className="text-3xl mb-3">🏫</div>
              <h3 className="font-display text-[22px] mb-2">
                Elementary principals &amp; literacy coaches
              </h3>
              <p className="text-[15px] text-[var(--ink-2)] leading-relaxed mb-4">
                Oral language is under-resourced in elementary schedules.
                A school-wide practice routine, kept private by design and
                built for Chromebooks, is a small lift with a big
                signal — especially in Title I buildings, where our 50%
                discount reads as alignment, not a giveaway.
              </p>
              <ul className="text-[14px] text-[var(--ink-2)] space-y-2">
                <li>• Building-level view of where practice is happening.</li>
                <li>• Runs on the Chromebook cart you already have.</li>
                <li>• Title I discount applied in writing, pre-pilot.</li>
              </ul>
            </div>
          </div>

          <details className="card p-6 mt-6 group">
            <summary className="font-display font-bold text-[18px] cursor-pointer list-none flex items-center justify-between">
              Middle-school ELA &amp; 6–12 speech/debate coaches welcome
              <span className="text-[var(--coral)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-[var(--ink-2)] leading-relaxed text-[15px]">
              Bright Speaker was designed for K–5 first, but the practice
              loop works for older students too. Middle-school ELA
              teachers running oral presentation units, and speech &amp;
              debate coaches running homework reps between tournaments,
              are on our outreach list. The product experience is the
              same; the prompt library will grow toward 6–12 as pilots
              come online.
            </p>
          </details>
        </section>

        <section className="band-ink rounded-[28px] p-10 md:p-14 text-white text-center border-[2.5px] border-[var(--ink)] shadow-[6px_6px_0_var(--ink)]">
          <h2 className="text-[clamp(28px,3.2vw,42px)] mb-3 text-white">
            Try it with a classroom this semester
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-7 text-[17px] leading-relaxed">
            Free 30-day pilots, no install, Google Workspace for Education
            sign-in, and a 20-minute onboarding call with the founder.
            We&apos;re looking for a small number of elementary classrooms
            to help us make this product what it needs to be.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a pilot
            </Link>
            <Link
              href="/dashboard"
              className="text-white/90 font-semibold underline underline-offset-4 hover:text-white transition px-3 py-2"
            >
              Or try a session first →
            </Link>
          </div>
        </section>

        <div className="mt-16 text-center text-[var(--ink-2)] text-sm flex items-center justify-center gap-2">
          <Image
            src="/brand/mascot-logo.png"
            alt=""
            width={32}
            height={32}
            className="rounded-lg"
          />
          Speaking is a muscle. Bright Speaker gives every kid the reps.
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
