import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Mic, Eye, Clock, Users, Shield } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For teachers & coaches — Bright Speaker",
  description:
    "How Bright Speaker fits into ELA units, speech & debate practice, and Socratic seminars. Browser-based speaking practice for K-12 classrooms. Free during pilots.",
  openGraph: {
    title: "Bright Speaker for teachers & coaches",
    description:
      "Speaking practice that doesn't add another video pile to grade.",
  },
};

export default function ForEducators() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-5xl mx-auto px-6 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-warm-teal-light text-warm-teal-dark px-4 py-2 rounded-full text-sm font-bold mb-6">
            🍎 For teachers &amp; coaches
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
            Speaking reps for every student — without adding another video pile to grade.
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed">
            Bright Speaker gives your students structured, private practice
            on the things that actually make a speaker: filler words, pacing,
            and eye contact. You get a classroom view. They get reps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
            >
              Try a practice session
            </Link>
            <Link
              href="/pilot"
              className="text-foreground/70 hover:text-warm-teal-dark font-semibold px-4 py-4 transition"
            >
              See the 30-day classroom pilot →
            </Link>
          </div>
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Mic className="w-6 h-6" />,
              title: "Filler-word coaching",
              desc: "The live counter catches \"um,\" \"uh,\" \"like,\" and \"you know\" as students speak. Over a few sessions, the pause habit starts to stick.",
            },
            {
              icon: <Eye className="w-6 h-6" />,
              title: "Eye contact in frame",
              desc: "On-device camera analysis shows students a friendly reminder when they drift off-camera. The video itself never leaves the Chromebook.",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "60-second reps",
              desc: "Students pick a prompt and speak for one minute. Short enough to fit in a warm-up, long enough to build real speaking stamina.",
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Classroom view",
              desc: "See which students are practicing, how often, and where they're stuck. CSV export for your own gradebook or progress reports.",
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: "Aligned to SL standards",
              desc: "Prompts map to Common Core Speaking & Listening strands: presentation (SL.4), clarity (SL.6), and collaborative conversations (SL.1).",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Private by design",
              desc: "Student video is processed in the browser and never uploaded. We store transcripts and scores. No ads, no reselling, no surprise data flows.",
            },
          ].map((f) => (
            <div key={f.title} className="card-warm p-6">
              <div className="w-10 h-10 rounded-xl bg-warm-coral-light text-warm-coral flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-extrabold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="card-warm p-8 mb-20">
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            How a week with Bright Speaker looks
          </h2>
          <p className="text-foreground/60 mb-6">
            A realistic cadence — nothing added to your prep, and no grading pile.
          </p>
          <div className="space-y-4">
            {[
              { day: "Monday", what: "Whole class does one 60-second warm-up session during morning routine or bell-work (picks a prompt, speaks, sees their result)." },
              { day: "Wednesday", what: "Assign a prompt that ties to the week's unit (book talk, persuasive argument, how-to explanation)." },
              { day: "Friday", what: "Open the teacher view for two minutes: who practiced, who didn't, who's stuck on filler words. Call out growth, not grades." },
            ].map((row) => (
              <div key={row.day} className="flex gap-4 items-start">
                <div className="w-24 flex-shrink-0 font-extrabold text-warm-coral">{row.day}</div>
                <div className="text-foreground/70 leading-relaxed">{row.what}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
            Built for the coach and teacher we were thinking about from day one
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-warm p-8">
              <div className="text-3xl mb-3">🎤</div>
              <h3 className="font-extrabold text-foreground mb-2">Speech &amp; debate coaches</h3>
              <p className="text-foreground/60 leading-relaxed mb-4">
                You can&apos;t run 1:1 drills with 30 kids. Structured reps
                between practices are how an average speaker becomes a
                varsity-level one. Use Bright Speaker as homework reps, as
                pre-tournament prep, or as open-lab practice during rotations.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Assign prompts that match the event (extemp, persuasive, informative).</li>
                <li>• See which students are actually practicing outside of meetings.</li>
                <li>• Pull a CSV for your program&apos;s own growth reporting.</li>
              </ul>
            </div>

            <div className="card-warm p-8">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-extrabold text-foreground mb-2">ELA teachers, grades 4–8</h3>
              <p className="text-foreground/60 leading-relaxed mb-4">
                The oral presentation unit is valuable — and exhausting to run
                at scale. Bright Speaker gives every student low-stakes reps
                leading up to the real presentation, so the presentation day
                feels less scary and more earned.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Fits a 5-minute warm-up slot without prep.</li>
                <li>• Student-facing feedback is about the speaking, not the speaker.</li>
                <li>• Maps to Speaking &amp; Listening standards your admin already knows.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-brand-gradient rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-extrabold mb-3">Try it with a classroom this semester</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Free 30-day pilots, no install, Google Workspace for Education
            sign-in, and a 20-minute onboarding call with the founder.
            We&apos;re looking for a small number of classrooms to help us
            make this product what it needs to be.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="bg-white text-warm-coral px-8 py-4 rounded-2xl font-extrabold btn-playful shadow-lg"
            >
              Start a pilot
            </Link>
            <Link
              href="/dashboard"
              className="text-white/90 font-semibold underline underline-offset-4 hover:text-white transition px-4 py-4"
            >
              Or try a session first →
            </Link>
          </div>
        </section>

        <div className="mt-16 text-center text-foreground/40 text-sm flex items-center justify-center gap-2">
          <Image src="/brand/mascot-logo.png" alt="" width={32} height={32} className="rounded-lg" />
          Speaking is a muscle. Bright Speaker gives every student the reps.
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
