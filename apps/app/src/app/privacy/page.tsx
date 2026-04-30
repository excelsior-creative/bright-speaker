import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy & data — Bright Speaker",
  description:
    "A plain-English summary of what Bright Speaker collects, where it flows, and what we deliberately don't do with student data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
        <h1 className="text-[clamp(36px,4.2vw,54px)] mt-3 mb-3">
          Privacy &amp; data
        </h1>
        <p className="lede mb-10">
          What Bright Speaker collects, where it flows, and what we
          deliberately don&apos;t do. Written in plain English.
        </p>

        <div className="card p-5 mb-10 bg-[var(--cream-2)] text-sm text-[var(--ink)] leading-relaxed">
          <strong>This is an overview, not a legal document.</strong>{" "}
          Bright Speaker is pre-launch. A formal privacy policy and terms
          of service are being drafted and will replace this page before
          any paid deployment. In the meantime, this is an honest
          description of how the product works today.
        </div>

        <section className="space-y-6 text-[var(--ink)] leading-relaxed">
          <h2 className="text-2xl mt-4">What leaves the student&apos;s device</h2>
          <ul className="space-y-3 list-disc pl-6">
            <li>
              <strong>Student video: nothing.</strong> The webcam stream is
              processed in the browser for the eye-contact indicator. It is
              not uploaded, not stored, and not shared.
            </li>
            <li>
              <strong>Student audio:</strong> the browser&apos;s built-in Speech
              Recognition API is used to convert speech to text during a
              session. In Chrome, this means audio is transmitted to
              Google&apos;s speech-recognition service to produce a transcript.
              This is a standard browser capability. We&apos;re working on
              an on-device alternative.
            </li>
            <li>
              <strong>Transcript:</strong> the text of what a student said
              during a session. Today it is stored in the browser&apos;s local
              storage. When we introduce authenticated accounts, it will be
              stored in our database, tied to the student&apos;s account.
            </li>
            <li>
              <strong>Scores, XP, and badges:</strong> numerical results of a
              session, stored the same way as transcripts.
            </li>
          </ul>

          <h2 className="text-2xl mt-10">What we don&apos;t collect</h2>
          <ul className="space-y-3 list-disc pl-6">
            <li>We don&apos;t ask for a student&apos;s birthdate, phone number, home address, or parent email.</li>
            <li>We don&apos;t use third-party ad trackers or cookies.</li>
            <li>We don&apos;t build a profile of a student to sell or share.</li>
            <li>We don&apos;t enable peer-to-peer messaging or social features that would create a moderation surface in a K-12 product.</li>
          </ul>

          <h2 className="text-2xl mt-10">Who we work with (sub-processors)</h2>
          <p>
            To run the product, we rely on a small number of services.
            Today these include:
          </p>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Vercel</strong> — hosts the website.</li>
            <li><strong>Clerk</strong> — handles authentication when it&apos;s enabled.</li>
            <li><strong>Neon</strong> — our managed PostgreSQL database (not yet in use for student data).</li>
            <li><strong>Google</strong> — provides the browser-level Speech Recognition API that Chrome uses for transcription.</li>
          </ul>
          <p className="text-sm text-[var(--ink-2)]">
            When we sign a data privacy agreement with a school, we&apos;ll
            disclose the current sub-processor list there as well.
          </p>

          <h2 className="text-2xl mt-10">About COPPA and FERPA</h2>
          <p>
            Bright Speaker is designed for K-12 schools. That means COPPA
            (for students under 13) and FERPA (for education records)
            apply to any real deployment. We do not yet hold formal
            compliance certifications like a COPPA Safe Harbor attestation
            or a SOC 2 report. We&apos;ll be transparent about what we&apos;ve
            completed and what&apos;s in progress in any procurement
            conversation. If a school or district requires a signed data
            processing agreement to run a pilot, we&apos;ll work through the
            language with you.
          </p>

          <h2 className="text-2xl mt-10">Deletion and questions</h2>
          <p>
            You can clear all session data for your browser from the{" "}
            <Link href="/history" className="text-[var(--coral)] font-semibold hover:underline">
              history page
            </Link>
            . When we move to authenticated accounts, teachers and
            administrators will be able to delete student records from
            their dashboard.
          </p>
          <p>
            Questions, corrections, or a data-deletion request? Write us{" "}
            <Link href="/contact" className="text-[var(--coral)] font-semibold hover:underline">
              here
            </Link>
            .
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
