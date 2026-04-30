import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquareHeart, School } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Bright Speaker",
  description:
    "Get in touch about a classroom pilot, a district conversation, or a product question.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[900px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--coral)]"
          >
            ← Back
          </Link>
        </div>

        <span className="eyebrow">Say hi</span>
        <h1 className="text-[clamp(36px,4.2vw,54px)] mt-3 mb-3">
          Get in touch
        </h1>
        <p className="lede mb-10">
          The fastest way to reach us is email. We read everything and
          reply within a school day.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <a
            href="mailto:hello@brightspeaker.com?subject=Bright%20Speaker%20%E2%80%94%20classroom%20pilot"
            className="feature-card block hover:translate-x-[-1px] hover:translate-y-[-1px] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--cream-2)] border-[2.5px] border-[var(--ink)] text-[var(--coral)] flex items-center justify-center mb-4">
              <School className="w-5 h-5" />
            </div>
            <h3 className="font-display text-[20px] mb-2 group-hover:text-[var(--coral)] transition">
              Classroom or district pilot
            </h3>
            <p className="text-[15px] text-[var(--ink-2)] leading-relaxed mb-3">
              Want to try Bright Speaker with students this semester? Tell
              us about your classroom and we&apos;ll set you up.
            </p>
            <span className="text-sm font-bold text-[var(--coral)]">
              hello@brightspeaker.com →
            </span>
          </a>

          <a
            href="mailto:hello@brightspeaker.com?subject=Bright%20Speaker%20%E2%80%94%20question"
            className="feature-card block hover:translate-x-[-1px] hover:translate-y-[-1px] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--cream-2)] border-[2.5px] border-[var(--ink)] text-[var(--green)] flex items-center justify-center mb-4">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <h3 className="font-display text-[20px] mb-2 group-hover:text-[var(--coral)] transition">
              Product question or feedback
            </h3>
            <p className="text-[15px] text-[var(--ink-2)] leading-relaxed mb-3">
              Spotted a bug? Idea for a prompt? A concern about how
              something works with kids? We want to hear it.
            </p>
            <span className="text-sm font-bold text-[var(--coral)]">
              hello@brightspeaker.com →
            </span>
          </a>
        </div>

        <div className="card p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--cream-2)] border-[2.5px] border-[var(--ink)] text-[var(--blue)] flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-[18px] mb-1">
              Not a teacher or admin?
            </h3>
            <p className="text-[15px] text-[var(--ink-2)] leading-relaxed">
              We&apos;re focused on schools right now. If you&apos;re a parent
              who&apos;d like Bright Speaker at your child&apos;s school, the
              most helpful thing you can do is forward us to your
              child&apos;s classroom teacher or building principal. We&apos;ll
              take it from there.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
