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
    slug: "how-to-teach-public-speaking-elementary-school",
    title: "How to teach public speaking in elementary school",
    excerpt:
      "A practical year at a glance for K–5 teachers. Daily five-minute reps, a three-part rubric, and what actually sticks. Maps to SL.K–SL.5.",
    date: "2026-04-23",
    readMinutes: 9,
    audience: "K–5 teachers & literacy coaches",
  },
  {
    slug: "why-pauses-beat-um",
    title: "Why pauses beat “um”",
    excerpt:
      "A short, printable explainer elementary teachers can use to teach young students that pauses are a strength, not a stumble. Includes a one-page classroom handout and three mini-drills.",
    date: "2026-04-22",
    readMinutes: 5,
    audience: "K–5 classroom teachers",
  },
  {
    slug: "five-minute-elementary-speaking-warmup",
    title: "A 5-minute speaking warm-up for elementary classrooms",
    excerpt:
      "A low-prep, standards-aligned warm-up you can run every morning in a K-5 classroom. Maps to SL.K–SL.5. Works with or without technology.",
    date: "2026-04-20",
    readMinutes: 7,
    audience: "K–5 classroom teachers",
  },
  {
    slug: "reduce-filler-words-k12",
    title: "How to help K-12 students actually reduce filler words",
    excerpt:
      "Telling a student to \"stop saying um\" doesn't work. Here's what does — with a 10-minute weekly practice cadence that fits into any ELA classroom.",
    date: "2026-04-17",
    readMinutes: 6,
    audience: "ELA & speech coaches",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-10">
          <Link href="/" className="text-sm font-semibold text-foreground/40 hover:text-warm-coral">
            ← Back
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-foreground mb-3">Classroom resources</h1>
        <p className="text-foreground/60 text-lg mb-10 max-w-2xl">
          Practical writing for K-12 teachers and coaches — what we&apos;ve
          learned about helping students become better speakers, and what
          research actually says.
        </p>

        <div className="space-y-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-warm p-6 block hover:scale-[1.005] transition group"
            >
              <div className="flex items-center gap-2 text-xs text-foreground/40 font-semibold mb-2">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readMinutes} min read</span>
                <span>·</span>
                <span>{p.audience}</span>
              </div>
              <h2 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
                {p.title}
              </h2>
              <p className="text-foreground/60 leading-relaxed text-sm">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
