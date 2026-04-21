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
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main id="main" className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-10">
          <Link href="/" className="text-sm font-semibold text-foreground/60 hover:text-warm-coral">
            ← Back
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-foreground mb-3">Get in touch</h1>
        <p className="text-foreground/60 text-lg mb-10">
          The fastest way to reach us is email. We read everything and
          reply within a school day.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <a
            href="mailto:hello@brightspeaker.com?subject=Bright%20Speaker%20%E2%80%94%20classroom%20pilot"
            className="card-warm p-6 block hover:scale-[1.01] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-warm-coral-light text-warm-coral flex items-center justify-center mb-4">
              <School className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
              Classroom or district pilot
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-3">
              Want to try Bright Speaker with students this semester? Tell
              us about your classroom and we&apos;ll set you up.
            </p>
            <span className="text-sm font-bold text-warm-coral">hello@brightspeaker.com →</span>
          </a>

          <a
            href="mailto:hello@brightspeaker.com?subject=Bright%20Speaker%20%E2%80%94%20question"
            className="card-warm p-6 block hover:scale-[1.01] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-warm-teal-light text-warm-teal-dark flex items-center justify-center mb-4">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
              Product question or feedback
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-3">
              Spotted a bug? Idea for a prompt? A concern about how
              something works with kids? We want to hear it.
            </p>
            <span className="text-sm font-bold text-warm-coral">hello@brightspeaker.com →</span>
          </a>
        </div>

        <div className="card-warm p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-warm-purple-light text-warm-purple flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground mb-1">Not a teacher or admin?</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              We&apos;re focused on schools right now. If you&apos;re a parent
              who&apos;d like Bright Speaker at your child&apos;s school, the
              most helpful thing you can do is forward us to your
              child&apos;s ELA teacher or debate coach. We&apos;ll take it
              from there.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
