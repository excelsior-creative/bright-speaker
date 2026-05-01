import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Free classroom resources for K-5 speaking",
  description:
    "Free, printable, standards-aligned resources for elementary teachers — speaking checklists, anchor charts, and observation tools mapped to Common Core SL.K-SL.5. No sign-in required.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Free K-5 speaking resources for elementary teachers",
    description:
      "Printable, standards-aligned classroom tools for K-5 oral language practice. No sign-in required.",
    type: "website",
    url: "/resources",
  },
};

const resources = [
  {
    slug: "sl-k-5-speaking-checklist",
    title: "SL.K-SL.5 speaking observation checklist",
    summary:
      "A one-page printable checklist mapped to every Common Core Speaking & Listening standard from kindergarten through fifth grade. Built for a clipboard during a Friday morning meeting.",
    audience: "K-5 teachers, instructional coaches",
    format: "Printable, 1 page",
    standards: "SL.K.4-6, SL.1.4-6, SL.2.4-6, SL.3.4-6, SL.4.4-6, SL.5.4-6",
  },
];

export default function ResourcesIndex() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground/40 hover:text-warm-coral"
          >
            &larr; Back
          </Link>
        </div>

        <div className="eyebrow mb-3">For teachers</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
          Free classroom resources
        </h1>
        <p className="lede mb-12">
          Printable, standards-aligned tools for elementary speaking
          practice. Use them with Bright Speaker, with another tool, or
          with nothing at all. The reps are the point.
        </p>

        <div className="space-y-5">
          {resources.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="card-warm p-6 block hover:scale-[1.005] transition group"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/40 font-semibold mb-3">
                <span>{r.format}</span>
                <span>&middot;</span>
                <span>{r.audience}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
                {r.title}
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-3">
                {r.summary}
              </p>
              <div className="text-xs text-foreground/50 font-mono">
                Standards: {r.standards}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-dashed border-[var(--line)] text-sm text-foreground/60">
          <p className="mb-2">
            More coming. If there&apos;s a specific tool you wish existed
            for your K-5 classroom, write us at{" "}
            <a
              href="mailto:hello@brightspeaker.com"
              className="font-semibold text-warm-coral hover:underline"
            >
              hello@brightspeaker.com
            </a>
            .
          </p>
          <p>
            All resources are free to print, copy, and share with other
            teachers. No sign-in or email required.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
