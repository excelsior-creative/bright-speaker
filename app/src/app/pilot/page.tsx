import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Users, Calendar, BarChart3, Shield } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "30-day classroom pilot — Bright Speaker",
  description:
    "Free 30-day Bright Speaker pilots for K-12 classrooms and speech programs. One classroom, up to 35 students, clear success criteria, and a 20-minute onboarding call. No cost, no commitment.",
  openGraph: {
    title: "Bright Speaker — 30-day classroom pilot",
    description:
      "Free classroom pilots for teachers and coaches. Set it up in 20 minutes.",
  },
};

export default function PilotPage() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-warm-teal-light text-warm-teal-dark px-4 py-2 rounded-full text-sm font-bold mb-6">
            Free pilots open now
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
            A 30-day classroom pilot, on us.
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Try Bright Speaker with your students for a month. No cost, no
            procurement dance, no long form. One classroom, clear success
            criteria, a 20-minute onboarding call. At day 30 we sit down
            together and look at what changed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
            >
              Start a pilot conversation
            </Link>
            <Link
              href="/for-educators"
              className="text-foreground/70 hover:text-warm-teal-dark font-semibold px-4 py-4 transition"
            >
              See how teachers use it →
            </Link>
          </div>
        </div>

        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="card-warm p-6">
            <Users className="w-8 h-8 text-warm-coral mb-3" aria-hidden="true" />
            <h2 className="font-extrabold text-foreground mb-2">What you get</h2>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>One classroom set up in Bright Speaker, up to 35 students.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>60-second webcam practice with live feedback on filler words, pacing, and eye contact.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Teacher view with class list, session counts, and CSV export.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>20-minute onboarding call to walk your class through day one.</span>
              </li>
            </ul>
          </div>

          <div className="card-warm p-6">
            <Calendar className="w-8 h-8 text-warm-purple mb-3" aria-hidden="true" />
            <h2 className="font-extrabold text-foreground mb-2">What we ask</h2>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Assign two practice sessions a week for 30 days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>A 20-minute wrap-up call at day 30 to tell us what worked.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Permission to anonymize aggregate results for a case study — you get final say on anything that publishes.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="card-warm p-8 mb-12">
          <div className="flex items-start gap-4">
            <BarChart3 className="w-10 h-10 text-warm-teal flex-shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">What we measure together</h2>
              <p className="text-foreground/70 mb-4">
                Three success criteria, picked up front. Honest numbers at day 30.
              </p>
              <ol className="space-y-3 text-foreground/70">
                <li>
                  <strong className="text-foreground">Session completion rate.</strong>{" "}
                  Do students finish what they start?
                </li>
                <li>
                  <strong className="text-foreground">Filler-word trajectory.</strong>{" "}
                  Does the average filler count per student drop between first
                  session and last?
                </li>
                <li>
                  <strong className="text-foreground">Teacher-reported confidence delta.</strong>{" "}
                  A short pre/post survey — do you see a change in real
                  speaking contexts like class discussion or presentations?
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-warm-purple-light rounded-3xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <Shield className="w-10 h-10 text-warm-purple flex-shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">Private by design</h2>
              <p className="text-foreground/70 mb-3">
                Student video never leaves the device. Transcripts and scores
                stay scoped to your class. We don&apos;t run ads, we don&apos;t sell
                data, and we don&apos;t build features that push parent-facing
                reporting around teachers.
              </p>
              <p className="text-foreground/60 text-sm">
                We don&apos;t make formal compliance claims (COPPA-compliant,
                FERPA-certified, SOC 2) because we haven&apos;t completed those
                reviews — we&apos;ll do the work before any paid deployment.
                If your district requires a Data Privacy Agreement to run a
                pilot, email us; we&apos;ll work through the language.{" "}
                <Link href="/privacy" className="text-warm-purple underline font-semibold">
                  Read the full privacy stance →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">What it costs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-warm p-6 text-center">
              <div className="text-warm-teal font-extrabold mb-1">Pilot</div>
              <div className="text-4xl font-extrabold text-foreground mb-2">Free</div>
              <p className="text-sm text-foreground/60">30 days, one classroom, full feature access.</p>
            </div>
            <div className="card-warm p-6 text-center">
              <div className="text-warm-coral font-extrabold mb-1">Teacher</div>
              <div className="text-4xl font-extrabold text-foreground mb-2">Free</div>
              <p className="text-sm text-foreground/60">
                Indefinite free tier for individual teachers, one classroom,
                core practice loop.
              </p>
            </div>
            <div className="card-warm p-6 text-center">
              <div className="text-warm-purple font-extrabold mb-1">School / district</div>
              <div className="text-4xl font-extrabold text-foreground mb-2">Talk to us</div>
              <p className="text-sm text-foreground/60">
                Per-student pricing designed for building budgets, not
                enterprise procurement. Published after our first cohort of
                pilots closes.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Ready to try it with your class?</h2>
          <p className="text-foreground/70 mb-6">
            Reply with your school, grade band, and class size. We&apos;ll
            schedule a 20-minute onboarding call and send a one-page guide
            for introducing Bright Speaker to students on day one.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
          >
            Start a pilot conversation
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
