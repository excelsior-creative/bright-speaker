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
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[760px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--coral)]"
          >
            ← Back
          </Link>
        </div>

        <span className="eyebrow">Trust</span>
        <h1 className="text-[clamp(36px,4.2vw,54px)] mt-3 mb-3">Terms</h1>
        <p className="lede mb-10">
          The short version of what using Bright Speaker means right now.
        </p>

        <div className="card p-5 mb-10 bg-[var(--cream-2)] text-sm text-[var(--ink)] leading-relaxed">
          <strong>Pre-launch product.</strong> A formal terms-of-service
          document is being drafted. Until it&apos;s published, the points
          below describe the spirit of how we think about the product.
          Anything that matters to your school or district should be in a
          signed agreement, and we&apos;ll sign one before any paid
          deployment.
        </div>

        <section className="space-y-6 text-[var(--ink)] leading-relaxed">
          <h2 className="text-2xl">What Bright Speaker is</h2>
          <p>
            A browser-based practice tool that helps K-12 students build
            confidence as speakers. It&apos;s provided as-is while we build
            toward launch. Features change. Bugs happen. We&apos;ll tell you
            when they do.
          </p>

          <h2 className="text-2xl">What it&apos;s not</h2>
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

          <h2 className="text-2xl">Acceptable use</h2>
          <p>
            Use Bright Speaker to practice speaking. Don&apos;t use it to
            harass other people, generate harmful content, or do anything
            that would reasonably be disallowed in a classroom.
          </p>

          <h2 className="text-2xl">Your data</h2>
          <p>
            See the{" "}
            <Link href="/privacy" className="text-[var(--coral)] font-semibold hover:underline">
              privacy &amp; data page
            </Link>
            . In short: student video stays on the device, we store
            transcripts and scores, and we don&apos;t use student data for
            advertising.
          </p>

          <h2 className="text-2xl">Changes</h2>
          <p>
            We&apos;ll publish a formal terms document when we launch.
            Until then, if you use Bright Speaker and something about how
            it works matters to you, tell us.
          </p>

          <p className="text-xs text-[var(--ink-2)]/70 mt-10 font-mono-ui">
            Last updated: 2026-04-24.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
