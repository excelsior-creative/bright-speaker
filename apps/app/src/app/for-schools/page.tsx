import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Server, Lock, FileText, CheckCircle2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For schools & districts — Bright Speaker",
  description:
    "How Bright Speaker fits into an elementary Chromebook program: student data handling, Google Workspace for Education sign-in, classroom pilots, and the path from a single teacher to a district license.",
  openGraph: {
    title: "Bright Speaker for schools & districts",
    description:
      "Private-by-design K–5 speaking practice. Chromebook-native. Free pilots.",
  },
};

const STEPS = [
  {
    step: "01",
    title: "Free classroom pilot",
    desc: "A single teacher runs Bright Speaker with one class for 30 days. We provide onboarding and sit down with them at day 30 to review what worked.",
  },
  {
    step: "02",
    title: "Building rollout",
    desc: "If the pilot clears, we expand to the building — more classrooms, shared prompts, and a building admin seat. Still free while we work through compliance with your district.",
  },
  {
    step: "03",
    title: "District license",
    desc: "Per-student annual pricing designed for building budgets. Google Workspace for Education SSO, roster provisioning, named support, and a DPA signed before any paid deployment goes live.",
  },
];

const DATA_ITEMS = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Video never leaves the device",
    desc: "The webcam stream is processed in the browser. It is not uploaded, not stored, not shared. Every speaking session is private to the student.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Minimum viable data",
    desc: "We store what we need to show a student their progress: transcripts, scores, badges, timestamps. We don't ask for a birthdate, a phone number, or a home address.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Sign in with Google Workspace for Education",
    desc: "Your students use the school account they already have. No new password, no student-facing email collection outside your domain.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "DPA on request for paid deployments",
    desc: "We will work through a data privacy agreement aligned with your district's standards — NDPA, SDPC, or your local variant — before any paid deployment goes live.",
  },
];

const FAQS = [
  {
    q: "Does Bright Speaker work on our Chromebooks?",
    a: "Yes. The app runs in Chrome, uses the student's webcam and microphone, and needs no installs or extensions. We recommend Chromebooks made in the last four years; older models can run it but may show a slight lag on the eye-contact analysis.",
  },
  {
    q: "How does sign-in work?",
    a: "Teachers and students sign in with their Google Workspace for Education accounts. We do not create separate Bright Speaker passwords. A district admin can restrict access to their managed domain.",
  },
  {
    q: "What happens to the student video?",
    a: "It stays on the student's device. The camera stream is used for live eye-contact feedback in the browser and is discarded when the session ends. We never upload, store, or share student video.",
  },
  {
    q: "Is the AI feedback safe for kids?",
    a: "Today, our feedback is rule-based — specific, warm, and kid-appropriate by design. Before we ship any LLM-generated feedback to students, we review the output shape with K–12 teachers. Feedback is about the speaking, not the speaker.",
  },
  {
    q: "What does a pilot cost?",
    a: "Nothing during the pilot window. When we publish commercial pricing, it's designed for building budgets — not enterprise SaaS. Title I elementary schools get a 50% discount off list.",
  },
  {
    q: "Can we sign a DPA?",
    a: "Yes, before any paid deployment. For pilots, we'll work with your team if a DPA is a pre-pilot requirement, using a template aligned with your district's standards.",
  },
  {
    q: "Is this K–5 only?",
    a: "We're K–5 first on purpose — elementary is where oral-language reps are scarcest and our model fits best. The product also works for 6–12 classrooms; we just don't lead with that audience today.",
  },
];

export default function ForSchools() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="pill mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--blue)] inline-block" />
            For schools &amp; districts
          </span>
          <h1 className="text-[clamp(36px,4.2vw,58px)] mb-5">
            Elementary speaking practice that takes student data seriously.
          </h1>
          <p className="lede mx-auto">
            Bright Speaker is built for the realities of your Chromebook
            program: browser-based, no install, Google Workspace for
            Education sign-in, and a private-by-design architecture that
            keeps student video on the device.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/contact" className="btn btn-coral">
              Start a pilot conversation
            </Link>
            <Link href="/privacy" className="btn btn-ghost btn-sm">
              Read our data &amp; privacy stance →
            </Link>
          </div>
        </div>

        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="eyebrow">Adoption path</span>
            <h2 className="text-[clamp(28px,3vw,38px)] mt-3 mb-3">
              The path from one classroom to a district license
            </h2>
            <p className="text-[var(--ink-2)] max-w-2xl mx-auto">
              We don&apos;t expect a district to buy a speaking tool they
              haven&apos;t seen in a classroom. Here&apos;s how we work with
              schools today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((p) => (
              <div key={p.step} className="step">
                <div className="step-num">{p.step}</div>
                <h3 className="font-display text-[20px] mb-2">{p.title}</h3>
                <p className="text-[15px] text-[var(--ink-2)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="eyebrow">Student data</span>
            <h2 className="text-[clamp(28px,3vw,38px)] mt-3 mb-3">
              What we do with student data
            </h2>
            <p className="text-[var(--ink-2)] max-w-2xl mx-auto">
              Short version: we minimize what we collect, we don&apos;t
              upload video, and we won&apos;t make compliance claims we
              can&apos;t back up. The longer version lives on our{" "}
              <Link
                href="/privacy"
                className="text-[var(--coral)] font-semibold hover:underline"
              >
                privacy &amp; data page
              </Link>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DATA_ITEMS.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="w-10 h-10 rounded-xl bg-[var(--cream-2)] border-[2.5px] border-[var(--ink)] text-[var(--blue)] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display text-[20px] mb-2">{f.title}</h3>
                <p className="text-[15px] text-[var(--ink-2)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="card p-6 mt-6 bg-[var(--cream-2)]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--sun-ink)] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[var(--ink)] leading-relaxed">
                <strong>About compliance claims.</strong> Bright Speaker
                is pre-launch. We do not currently hold SOC 2
                certification, a COPPA Safe Harbor attestation, or a
                published FERPA opinion letter. We will be transparent
                about where we are in that work at every step of a
                procurement conversation. If your district requires
                specific artifacts to run a pilot, tell us — we&apos;ll
                tell you honestly whether we have them yet.
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="eyebrow">FAQ</span>
            <h2 className="text-[clamp(28px,3vw,38px)] mt-3">
              The questions we hear most
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="band-ink rounded-[28px] p-10 md:p-14 text-white text-center border-[2.5px] border-[var(--ink)] shadow-[6px_6px_0_var(--ink)]">
          <h2 className="text-[clamp(28px,3.2vw,42px)] mb-3 text-white">
            Talk to us about a pilot
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-7 text-[17px] leading-relaxed">
            The fastest way to evaluate Bright Speaker is to watch a
            classroom use it for three weeks. We&apos;ll handle setup, the
            teacher walkthrough, and the day-30 review. Pilots are free.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start a pilot conversation
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
