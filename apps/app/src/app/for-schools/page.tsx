import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Server, Lock, FileText, CheckCircle2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For schools & districts — Bright Speaker",
  description:
    "How Bright Speaker fits into a Chromebook district: student data handling, Google Workspace for Education sign-in, classroom pilots, and the path from a single teacher to a district license.",
  openGraph: {
    title: "Bright Speaker for schools & districts",
    description:
      "Private-by-design K-12 speaking practice. Chromebook-native. Free pilots.",
  },
};

export default function ForSchools() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-5xl mx-auto px-6 pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-warm-purple-light text-warm-purple px-4 py-2 rounded-full text-sm font-bold mb-6">
            🏫 For schools &amp; districts
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
            K-12 speaking practice that takes student data seriously.
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed">
            Bright Speaker is built for the realities of your Chromebook
            program: browser-based, no install, Google Workspace for
            Education sign-in, and a private-by-design architecture that
            keeps student video on the device.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
            >
              Start a pilot conversation
            </Link>
            <Link
              href="/privacy"
              className="text-foreground/70 hover:text-warm-teal-dark font-semibold px-4 py-4 transition"
            >
              Read our data &amp; privacy stance →
            </Link>
          </div>
        </div>

        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-foreground mb-3">
              The path from one classroom to a district license
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We don&apos;t expect a district to buy a speaking tool they
              haven&apos;t seen in a classroom. Here&apos;s how we work with schools
              today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
                desc: "Per-student annual pricing designed for building budgets. DPA signed on request, Google Workspace for Education SSO, roster provisioning, and named support.",
              },
            ].map((p) => (
              <div key={p.step} className="card-warm p-6">
                <div className="text-warm-coral font-mono text-sm font-bold mb-2">{p.step}</div>
                <h3 className="font-extrabold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-foreground mb-3">
              What we do with student data
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Short version: we minimize what we collect, we don&apos;t upload
              video, and we won&apos;t make compliance claims we can&apos;t back
              up. The longer version lives on our{" "}
              <Link href="/privacy" className="text-warm-coral font-semibold hover:underline">
                privacy &amp; data page
              </Link>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Video never leaves the device",
                desc: "The webcam stream is processed in the browser. It is not uploaded, not stored, not shared. Every speaking session is private to the student.",
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: "Minimum viable data",
                desc: "We store what we need to show a student their progress: transcripts, scores, badges, timestamps. We don&apos;t ask for a birthdate, a phone number, or a home address.",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Sign in with Google Workspace for Education",
                desc: "Your students use the school account they already have. No new password, no student-facing email collection outside your domain.",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "DPA-ready for paid deployments",
                desc: "We will sign a data privacy agreement aligned with your district&apos;s standards — NDPA, SDPC, or your local variant — before a paid deployment goes live.",
              },
            ].map((f) => (
              <div key={f.title} className="card-warm p-6">
                <div className="w-10 h-10 rounded-xl bg-warm-teal-light text-warm-teal-dark flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="card-warm p-6 mt-6 bg-warm-gold-light/40 border-warm-gold/40">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-warm-gold-dark flex-shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80 leading-relaxed">
                <strong>About compliance claims.</strong> Bright Speaker is
                pre-launch. We do not currently hold SOC 2 certification, a
                COPPA Safe Harbor attestation, or a published FERPA opinion
                letter. We will be transparent about where we are in that
                work at every step of a procurement conversation. If your
                district requires specific artifacts to run a pilot, tell
                us — we&apos;ll tell you honestly whether we have them yet.
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
            The questions we hear most
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Does Bright Speaker work on our Chromebooks?",
                a: "Yes. The app runs in Chrome, uses the student's webcam and microphone, and needs no installs or extensions. We recommend Chromebooks made in the last 4 years; older models can run it but may show a slight lag on the eye-contact analysis.",
              },
              {
                q: "How does sign-in work?",
                a: "Teachers and students sign in with their Google Workspace for Education accounts. We do not create separate Bright Speaker passwords. A district admin can restrict access to their managed domain.",
              },
              {
                q: "What happens to the student video?",
                a: "It stays on the student's device. The camera stream is used for live eye-contact feedback in the browser, and it's discarded when the session ends. We never upload, store, or share student video.",
              },
              {
                q: "Is the AI feedback safe for kids?",
                a: "Today, our feedback is rule-based — specific, warm, and kid-appropriate by design. Before we ship any LLM-generated feedback to students, we review the output shape with K-12 teachers. Feedback is about the speaking, not the speaker.",
              },
              {
                q: "What does a pilot cost?",
                a: "Nothing during the pilot window. When we publish commercial pricing, it's designed for building budgets — not enterprise SaaS.",
              },
              {
                q: "Can we sign a DPA?",
                a: "Yes, before any paid deployment. For pilots, we'll work with your team if a DPA is a pre-pilot requirement, using a template aligned with your district's standards.",
              },
            ].map((item) => (
              <details key={item.q} className="card-warm p-5 group">
                <summary className="font-bold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-warm-coral group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-brand-gradient rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-extrabold mb-3">Talk to us about a pilot</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            The fastest way to evaluate Bright Speaker is to watch a
            classroom use it for three weeks. We&apos;ll handle setup, the
            teacher walkthrough, and the day-30 review. Pilots are free.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-warm-coral px-8 py-4 rounded-2xl font-extrabold btn-playful shadow-lg"
          >
            Start a pilot conversation
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
