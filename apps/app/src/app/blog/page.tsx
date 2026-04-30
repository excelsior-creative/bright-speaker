import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Classroom resources — Bright Speaker",
  description:
    "Practical, classroom-tested writing on elementary speaking practice: standards-aligned warm-ups, filler words, oral language, and the research behind the reps.",
};

const posts = [
  {
    slug: "why-pauses-beat-um",
    title: "Why pauses beat \"um\": a 2-minute explainer for your classroom",
    excerpt:
      "What to say when a student asks why they can't just keep talking. A print-ready explainer you can post in the classroom or tape inside a writing folder.",
    date: "2026-04-24",
    readMinutes: 4,
    audience: "K–5 classroom teachers",
  },
  {
    slug: "five-minute-elementary-speaking-warmup",
    title: "A 5-minute speaking warm-up for elementary classrooms",
    excerpt:
      "A low-prep, standards-aligned warm-up you can run every morning in a K–5 classroom. Maps to SL.K–SL.5. Works with or without technology.",
    date: "2026-04-20",
    readMinutes: 7,
    audience: "K–5 classroom teachers",
  },
  {
    slug: "reduce-filler-words-k12",
    title: "How to help K–12 students actually reduce filler words",
    excerpt:
      'Telling a student to "stop saying um" doesn\'t work. Here\'s what does — with a 10-minute weekly practice cadence that fits into any ELA classroom.',
    date: "2026-04-17",
    readMinutes: 6,
    audience: "ELA & speech coaches",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[960px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--coral)]"
          >
            ← Back
          </Link>
        </div>

        <span className="eyebrow">Classroom resources</span>
        <h1 className="text-[clamp(36px,4.2vw,54px)] mt-3 mb-3">
          Writing for the way classrooms actually run
        </h1>
        <p className="lede mb-10">
          Practical notes for K–12 teachers and coaches — what we&apos;ve
          learned about helping students become better speakers, and what
          research actually says.
        </p>

        <div className="space-y-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="feature-card block hover:translate-x-[-1px] hover:translate-y-[-1px] transition group"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--ink-2)] font-semibold mb-2 font-mono-ui">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readMinutes} min read</span>
                <span>·</span>
                <span>{p.audience}</span>
              </div>
              <h2 className="font-display text-[24px] mb-2 group-hover:text-[var(--coral)] transition">
                {p.title}
              </h2>
              <p className="text-[var(--ink-2)] leading-relaxed text-[15px]">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
