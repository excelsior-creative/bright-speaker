import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Free 30-day classroom pilot — Bright Speaker",
  description:
    "A 30-day, no-cost pilot for one K–5 classroom. One teacher, a Chromebook cart, and a 20-minute onboarding call. We share a simple report at day 30. That's it.",
  openGraph: {
    title: "Free 30-day classroom pilot — Bright Speaker",
    description:
      "A 30-day, no-cost pilot for one K–5 classroom. Private by design, aligned to SL.K–SL.5, built for the way elementary classrooms actually run.",
    type: "website",
  },
  alternates: { canonical: "/pilot" },
};

const INCLUDED = [
  {
    icon: "🎥",
    title: "The full product",
    body: "Six speaking activities, on-device eye-contact coaching, filler-word feedback tuned for elementary grades, and XP/badges that reward the reps.",
  },
  {
    icon: "🧭",
    title: "A 20-minute onboarding call",
    body: "We sit with the teacher, walk through the warm-up, set three success criteria together, and leave them with a one-page printable for the class.",
  },
  {
    icon: "📊",
    title: "A day-30 report",
    body: "Session-completion rate, filler-word delta between first and last session (per student, anonymized), and a five-question teacher confidence survey.",
  },
  {
    icon: "🪶",
    title: "Weekly check-ins",
    body: "A 10-minute email or call each week. Nothing hostile, nothing hard-sell — we want to know what's working and what's getting in the way.",
  },
];

const ASKS = [
  {
    n: "1",
    title: "One teacher, one classroom, 30 days",
    body: "We've had the best results when a single teacher pilots with their own class. Multi-classroom and building-wide pilots are great — they come after a first teacher says yes.",
  },
  {
    n: "2",
    title: "Two practice sessions a week",
    body: "That's it. A 5-minute warm-up before literacy block twice a week is the minimum needed for the day-30 report to mean anything.",
  },
  {
    n: "3",
    title: "Chromebooks (or iPads, or laptops)",
    body: "Whatever your classroom already has with a camera and a microphone. No installs, no new accounts. Works on any modern browser in Chrome, Edge, or Safari.",
  },
  {
    n: "4",
    title: "A 20-minute sit-down at day 30",
    body: "We walk through the report together. If it worked, we talk about next steps — another classroom, a building rollout, or a quiet thank-you. No pressure.",
  },
];

const PRIVACY = [
  "Student video never leaves the device. On-device face detection only.",
  "No student accounts required during the pilot — class-code entry on a shared Chromebook works fine.",
  "Chrome's built-in Web Speech API handles transcription (audio goes to Google, same as any Chromebook dictation). We disclose this plainly rather than paper over it.",
  "No ads, no data brokering, no third-party analytics on the student surface.",
  "We'll sign a DPA on request. We don't currently hold SOC 2, COPPA, or FERPA certifications — we'll tell you that directly instead of hiding it in small print.",
];

const NOT_THIS = [
  "A billing trap. The 30 days are free and there's no auto-conversion.",
  "A surveillance tool. No teacher-facing live video monitoring. No peer rooms.",
  "A replacement for the teacher. The teacher still sets the activity and still celebrates the student.",
  "A clinical speech-therapy product. If a student has an IEP or a speech need that calls for a therapist, Bright Speaker is not that. We're warm-up reps.",
];

export default function PilotPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-10 pb-20">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <span className="pill mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] inline-block" />
            Accepting spring &amp; fall 2026 pilots
          </span>
          <h1 className="text-[clamp(40px,4.8vw,68px)] leading-[1] mb-6">
            30 days.{" "}
            <span
              style={{
                background:
                  "linear-gradient(180deg, transparent 62%, var(--sun) 62%, var(--sun) 92%, transparent 92%)",
                padding: "0 4px",
              }}
            >
              One classroom.
            </span>{" "}
            No cost.
          </h1>
          <p className="lede mt-5">
            We&apos;re looking for a handful of K–5 classrooms to run a free
            30-day pilot of Bright Speaker this spring and fall. One teacher,
            the Chromebook cart you already have, and twenty minutes twice a
            week. At day 30 we share a simple report and you decide what
            happens next.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            <Link href="/contact" className="btn btn-primary">
              Start a pilot conversation →
            </Link>
            <Link href="/for-educators" className="btn">
              See the teacher view
            </Link>
          </div>
          <div className="flex gap-[22px] mt-7 flex-wrap text-sm font-semibold text-[var(--ink-2)]">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              🔒 Private by design
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              📚 Aligned to SL.K–SL.5
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              🎒 Ages 5–11
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              💸 $0 during the pilot
            </span>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="band-paper py-20">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-3.5">What you get</span>
            <h2 className="text-[clamp(32px,3.6vw,48px)]">
              A real tool, a real partner, and a day-30 report you can share.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-[18px]">
            {INCLUDED.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="text-[28px]">{item.icon}</div>
                <h3 className="mt-3.5 text-[22px]">{item.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] mt-1.5">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we ask */}
      <section className="py-20">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-3.5">What we ask</span>
            <h2 className="text-[clamp(32px,3.6vw,48px)]">
              Four small commitments. That&apos;s the whole deal.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-[18px]">
            {ASKS.map((ask) => (
              <div key={ask.n} className="step">
                <div className="step-num">{ask.n}</div>
                <h3 className="text-[20px] leading-[1.2] mb-1.5">{ask.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] m-0">{ask.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we measure success */}
      <section className="band-paper py-20">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-3.5">How we define success</span>
            <h2 className="text-[clamp(32px,3.6vw,48px)]">
              Three honest numbers. One teacher voice.
            </h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              We pick these together at onboarding. You can swap any of them
              for something that matters more in your classroom.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            <div className="feature-card" style={{ background: "var(--cream-2)" }}>
              <div className="text-[28px]">📈</div>
              <h3 className="mt-3.5 text-[22px]">Completion rate</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                Of assigned sessions, how many students finished. Our target is
                ≥70% by week three.
              </p>
            </div>
            <div className="feature-card" style={{ background: "var(--sun)" }}>
              <div className="text-[28px]">🎯</div>
              <h3 className="mt-3.5 text-[22px]">Filler-word delta</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                Average fillers per minute, first session vs. last. Anonymized
                per student. Shared only with the teacher.
              </p>
            </div>
            <div className="feature-card" style={{ background: "var(--coral)", color: "#fff" }}>
              <div className="text-[28px]">🗣️</div>
              <h3 className="mt-3.5 text-[22px]" style={{ color: "#fff" }}>
                Teacher confidence
              </h3>
              <p className="mt-1.5" style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
                Five-question pre/post survey on how the teacher feels about
                oral-language growth in their class.
              </p>
            </div>
            <div className="feature-card" style={{ background: "var(--blue)", color: "#fff" }}>
              <div className="text-[28px]">💬</div>
              <h3 className="mt-3.5 text-[22px]" style={{ color: "#fff" }}>
                Student voice
              </h3>
              <p className="mt-1.5" style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
                Optional one-sentence kid check-ins — what felt hard, what got
                easier. Never used for evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="py-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-3.5">Private by design</span>
            <h2 className="text-[clamp(32px,3.6vw,48px)]">
              What happens to student data, in plain English.
            </h2>
          </div>
          <div className="card p-8 md:p-10">
            <ul className="space-y-4 text-[var(--ink-2)] text-[16px] leading-relaxed">
              {PRIVACY.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span
                    className="shrink-0 inline-block w-6 h-6 rounded-full bg-[var(--green)] text-white font-bold text-[13px] flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-dashed border-[var(--line)] text-sm text-[var(--ink-2)]">
              The full data-flow breakdown lives on our{" "}
              <Link href="/privacy" className="underline hover:text-[var(--ink)]">
                privacy page
              </Link>
              . No lawyer-speak; just what is captured, where it goes, and how
              long it stays.
            </div>
          </div>
        </div>
      </section>

      {/* What we're not */}
      <section className="band-paper py-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-3.5">What this pilot is not</span>
            <h2 className="text-[clamp(28px,3vw,40px)]">
              Four things we want to be honest about.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-[18px]">
            {NOT_THIS.map((line) => (
              <div key={line} className="card-warm p-6">
                <p className="text-[var(--ink-2)] text-[15px] m-0 leading-relaxed">
                  <span className="font-bold text-[var(--ink)]">Not: </span>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing after */}
      <section className="py-20">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-3.5">After the pilot</span>
            <h2 className="text-[clamp(32px,3.6vw,48px)]">
              If it works, pricing is built for building budgets.
            </h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              No auto-conversion. After day 30 you decide whether Bright
              Speaker earns a line item in next year&apos;s budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-[18px]">
            <div className="tier">
              <div className="eyebrow">Teacher Free</div>
              <div className="tier-price">
                $0<small> / forever</small>
              </div>
              <p className="text-[var(--ink-2)] text-[15px] m-0">
                One classroom, up to about 35 students. Core practice loop and
                basic teacher view.
              </p>
              <ul className="list-none p-0 m-0 grid gap-2 text-[14px] text-[var(--ink-2)]">
                <li>✓ All six speaking activities</li>
                <li>✓ On-device coaching</li>
                <li>✓ Class-code entry</li>
              </ul>
            </div>
            <div className="tier tier-featured">
              <div className="eyebrow" style={{ color: "var(--ink)" }}>
                School
              </div>
              <div className="tier-price">
                $3<small> /student /year</small>
              </div>
              <p className="text-[var(--ink)] text-[15px] m-0 font-semibold">
                Building-wide. Title I schools: 50% off, no questions asked.
              </p>
              <ul className="list-none p-0 m-0 grid gap-2 text-[14px] text-[var(--ink)]">
                <li>✓ Assignable prompts by class</li>
                <li>✓ Admin seat + teacher roster</li>
                <li>✓ CSV export for progress reports</li>
                <li>✓ DPA signed on request</li>
              </ul>
            </div>
            <div className="tier">
              <div className="eyebrow">District</div>
              <div className="tier-price">
                Custom<small></small>
              </div>
              <p className="text-[var(--ink-2)] text-[15px] m-0">
                Multi-building rollouts with Google Workspace for Education
                SSO, DPA, data-residency discussion, and priority support.
              </p>
              <ul className="list-none p-0 m-0 grid gap-2 text-[14px] text-[var(--ink-2)]">
                <li>✓ Everything in School</li>
                <li>✓ Google Workspace for Education SSO</li>
                <li>✓ Roster provisioning</li>
                <li>✓ Named success partner</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-[var(--ink-2)] max-w-[60ch] mx-auto">
            Pricing is indicative for spring/fall 2026 pilots and will be
            confirmed in writing before any paid conversion. Some School and
            District features above (SSO, roster provisioning, DPA templating)
            are on the near-term roadmap and shipped with pilot partners.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="band-ink py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <span className="eyebrow block mb-3.5">One small ask</span>
          <h2 className="text-[clamp(32px,3.8vw,52px)]" style={{ color: "#fff" }}>
            If this sounds like your classroom, we&apos;d love to meet the
            teacher.
          </h2>
          <p className="mt-4 max-w-[60ch] mx-auto text-[17px]" style={{ color: "rgba(255,255,255,0.8)" }}>
            Tell us about the school. We&apos;ll reply within two business
            days with three time options for a 20-minute intro call.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap justify-center">
            <Link href="/contact" className="btn btn-primary">
              Start a pilot conversation →
            </Link>
            <Link href="/blog/five-minute-elementary-speaking-warmup" className="btn">
              Read the warm-up first
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
