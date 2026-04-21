import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Why pauses beat \"um\" — a 2-minute explainer for K–5 classrooms",
  description:
    "The fastest way to help an elementary student stop saying \"um\" is not to tell them to stop saying \"um.\" Here's what actually works — a one-page explainer you can print for your classroom.",
  openGraph: {
    title: "Why pauses beat \"um\"",
    description:
      "A 2-minute, print-ready explainer for K–5 teachers on the one thing that actually reduces filler words.",
    type: "article",
    publishedTime: "2026-04-21",
  },
  alternates: { canonical: "/blog/why-pauses-beat-um" },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm font-semibold"
            style={{ color: "var(--ink-2)" }}
          >
            ← All resources
          </Link>
        </div>

        <div
          className="flex items-center gap-2 text-xs font-semibold mb-3"
          style={{ color: "var(--ink-2)" }}
        >
          <span>April 21, 2026</span>
          <span>·</span>
          <span>2 min read</span>
          <span>·</span>
          <span>K–5 classroom teachers</span>
        </div>

        <h1 className="text-[clamp(36px,4.2vw,56px)] leading-[1.02] mb-5">
          Why pauses beat &ldquo;um&rdquo;
        </h1>

        <p className="text-[19px] mb-10 leading-relaxed" style={{ color: "var(--ink-2)" }}>
          A two-minute explainer you can read to your class on a Monday
          morning — or tape up next to the morning meeting spot.
          Everything below is also printable as a one-pager for the
          speaking corner of your classroom.
        </p>

        <article className="space-y-5 text-[17px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
          <h2 className="text-[26px] mt-8" style={{ color: "var(--ink)" }}>
            The short version
          </h2>
          <p>
            Kids don&apos;t say &ldquo;um&rdquo; because they have a
            bad habit. They say &ldquo;um&rdquo; because they&apos;re
            afraid that if they stop making sound, someone will take
            their turn. The fastest way to reduce filler words in a
            K&ndash;5 classroom isn&apos;t to tell kids to stop saying
            &ldquo;um.&rdquo; It&apos;s to make pauses feel safe.
          </p>

          <div
            className="feature-card"
            style={{ background: "var(--cream-2)" }}
          >
            <strong className="font-display text-[18px] block mb-2" style={{ color: "var(--ink)" }}>
              One rule, read it aloud:
            </strong>
            <p className="m-0" style={{ color: "var(--ink-2)" }}>
              &ldquo;When your partner pauses, you wait. Pauses are not
              the end of the sentence.&rdquo;
            </p>
          </div>

          <h2 className="text-[26px] mt-10" style={{ color: "var(--ink)" }}>
            Why &ldquo;just stop saying um&rdquo; doesn&apos;t work
          </h2>
          <p>
            Tell a 2nd grader to stop saying &ldquo;um&rdquo; and
            she&apos;ll do one of three things: freeze up, whisper, or
            say &ldquo;um&rdquo; twice as often while she watches her
            own mouth. The word isn&apos;t the problem. The gap is. If
            a kid believes a silent second means &ldquo;turn&apos;s
            over,&rdquo; she&apos;ll fill the second with whatever her
            mouth knows how to do.
          </p>
          <p>
            Adults do this too &mdash; but we&apos;ve learned that
            silence in a boardroom means &ldquo;she&apos;s
            thinking.&rdquo; Kids haven&apos;t learned that yet. Our
            job is to teach them.
          </p>

          <h2 className="text-[26px] mt-10" style={{ color: "var(--ink)" }}>
            What to do instead (three moves, pick one)
          </h2>

          <h3 className="text-[20px] mt-6" style={{ color: "var(--ink)" }}>
            1. Count a silent three.
          </h3>
          <p>
            When you&apos;re the listener, if your speaker pauses,
            count to three silently before you jump in. This works in
            partner talk, Socratic circles, and morning meeting.
            It&apos;s also the single highest-leverage move a teacher
            can model &mdash; kids copy what they see.
          </p>

          <h3 className="text-[20px] mt-6" style={{ color: "var(--ink)" }}>
            2. Swap one word.
          </h3>
          <p>
            When you hear a kid about to say &ldquo;um,&rdquo; you can
            coach them to swap it for &ldquo;hmm&rdquo; or for a full
            breath. &ldquo;Hmm&rdquo; reads as thinking. &ldquo;Um&rdquo;
            reads as stalling. Same sound length, different meaning.
          </p>

          <h3 className="text-[20px] mt-6" style={{ color: "var(--ink)" }}>
            3. Reward the pause, not the fluency.
          </h3>
          <p>
            When a kid finishes a sentence with a clean pause in the
            middle of it, name it: &ldquo;I noticed you paused and
            kept your turn &mdash; that&apos;s a speaker move.&rdquo;
            Kids repeat what gets named. They also stop chasing
            smoothness as the goal.
          </p>

          <h2 className="text-[26px] mt-10" style={{ color: "var(--ink)" }}>
            What we count as a filler word (and what we don&apos;t)
          </h2>
          <p>
            A note from our own classroom practice: we only flag the
            universal hesitations &mdash; &ldquo;um,&rdquo;
            &ldquo;uh,&rdquo; &ldquo;er,&rdquo; &ldquo;ah.&rdquo;
            Words like &ldquo;like,&rdquo; &ldquo;you know,&rdquo; and
            &ldquo;sort of&rdquo; are part of how K&ndash;5 kids
            actually talk (&ldquo;I like pizza,&rdquo; &ldquo;you
            know the park?&rdquo;). Flagging them feels punitive, and
            it teaches kids to hedge their own real speech. The goal
            isn&apos;t to polish kids into miniature adults. The goal
            is to help them hold the floor, think, and be heard.
          </p>

          <div
            className="feature-card"
            style={{ background: "var(--sun)" }}
          >
            <strong
              className="font-display text-[18px] block mb-2"
              style={{ color: "var(--ink)" }}
            >
              One-sentence takeaway for kids:
            </strong>
            <p className="m-0" style={{ color: "var(--ink)" }}>
              &ldquo;When you need to think, take a breath. Your
              turn is still your turn.&rdquo;
            </p>
          </div>

          <h2 className="text-[26px] mt-10" style={{ color: "var(--ink)" }}>
            Where BrightSpeaker fits
          </h2>
          <p>
            A counter can show a kid how often &ldquo;um&rdquo;
            shows up in their speech, which makes the habit visible
            without making it shameful. Everything above works with or
            without a tool; the reps are the point. If you want
            60-second practice reps with a live filler counter and
            on-device video that never leaves the Chromebook, that&apos;s
            the short version of what we do.
          </p>
          <p>
            If not &mdash; print this page, tape it to the wall, and
            enjoy the quieter pauses.
          </p>

          <div className="mt-12 pt-6" style={{ borderTop: "2.5px solid var(--line)" }}>
            <p className="text-sm" style={{ color: "var(--ink-2)" }}>
              Want BrightSpeaker for your classroom? Pilots are free
              for 30 days.{" "}
              <Link href="/contact" className="font-bold" style={{ color: "var(--blue)" }}>
                Start a pilot conversation →
              </Link>
            </p>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
