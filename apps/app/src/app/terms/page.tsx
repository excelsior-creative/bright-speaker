import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms — Bright Speaker",
  description:
    "Bright Speaker's terms of use. A formal terms-of-service document is being drafted and will replace this page before commercial launch.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main id="main" className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-10">
          <Link href="/" className="text-sm font-semibold text-foreground/60 hover:text-warm-coral">
            ← Back
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-foreground mb-3">Terms</h1>
        <p className="text-foreground/60 text-lg mb-10">
          The short version of what using Bright Speaker means right now.
        </p>

        <div className="card-warm p-5 mb-10 bg-warm-gold-light/40 border-warm-gold/40 text-sm text-foreground/80 leading-relaxed">
          <strong>Pre-launch product.</strong> A formal terms-of-service
          document is being drafted. Until it&apos;s published, the points
          below describe the spirit of how we think about the product.
          Anything that matters to your school or district should be in a
          signed agreement, and we&apos;ll sign one before any paid
          deployment.
        </div>

        <section className="space-y-6 text-foreground/80 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-foreground">What Bright Speaker is</h2>
          <p>
            A browser-based practice tool that helps K-12 students build
            confidence as speakers. It&apos;s provided as-is while we build
            toward launch. Features change. Bugs happen. We&apos;ll tell you
            when they do.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground">What it&apos;s not</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li>
              It&apos;s not a certified assessment tool. Scores are for
              practice motivation, not for grading students in a way that
              affects the permanent record.
            </li>
            <li>
              It&apos;s not speech therapy. If a student has clinical speech
              needs, please work with a licensed speech-language
              pathologist.
            </li>
            <li>
              It&apos;s not a replacement for a teacher. It&apos;s extra reps
              between the real speaking moments in a classroom.
            </li>
          </ul>

          <h2 className="text-2xl font-extrabold text-foreground">Acceptable use</h2>
          <p>
            Use Bright Speaker to practice speaking. Don&apos;t use it to
            harass other people, generate harmful content, or do anything
            that would reasonably be disallowed in a classroom.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground">Your data</h2>
          <p>
            See the{" "}
            <Link href="/privacy" className="text-warm-coral font-semibold hover:underline">
              privacy &amp; data page
            </Link>
            . In short: student video stays on the device, we store
            transcripts and scores, and we don&apos;t use student data for
            advertising.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground">Changes</h2>
          <p>
            We&apos;ll publish a formal terms document when we launch.
            Until then, if you use Bright Speaker and something about how
            it works matters to you, tell us.
          </p>

          <p className="text-xs text-foreground/60 mt-10">
            Last updated: 2026-04-17.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
