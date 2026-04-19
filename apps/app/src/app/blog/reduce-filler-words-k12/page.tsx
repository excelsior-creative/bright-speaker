import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "How to help K-12 students actually reduce filler words",
  description:
    "Telling a student to stop saying \"um\" doesn't work. Here's a research-backed, 10-minute weekly practice cadence that does — for ELA teachers and speech coaches.",
  openGraph: {
    title: "How to help K-12 students actually reduce filler words",
    description:
      "A 10-minute weekly practice cadence that fits any ELA classroom or speech & debate program.",
    type: "article",
    publishedTime: "2026-04-17",
  },
  alternates: { canonical: "/blog/reduce-filler-words-k12" },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      <main className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-6">
          <Link href="/blog" className="text-sm font-semibold text-foreground/40 hover:text-warm-coral">
            ← All resources
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-foreground/40 font-semibold mb-3">
          <span>April 17, 2026</span>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <span>ELA &amp; speech coaches</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          How to help K-12 students actually reduce filler words
        </h1>

        <p className="text-lg text-foreground/70 leading-relaxed mb-10">
          &ldquo;Um,&rdquo; &ldquo;uh,&rdquo; &ldquo;like,&rdquo; &ldquo;you
          know&rdquo;: filler words are the single easiest thing to hear in
          a student presentation, and the single hardest thing to coach.
          Most of the advice out there is some version of &ldquo;just stop
          saying them,&rdquo; which is useless — because fillers aren&apos;t a
          speaking problem, they&apos;re a thinking-and-speaking-
          at-the-same-time problem.
        </p>

        <article className="prose-like text-foreground/80 leading-relaxed space-y-5">
          <h2 className="text-2xl font-extrabold text-foreground mt-8">Why filler words happen in the first place</h2>
          <p>
            When a student doesn&apos;t know what they&apos;re going to say
            next, their brain fills the silence with a neutral sound. That
            sound is almost always &ldquo;um,&rdquo; &ldquo;uh,&rdquo; or —
            increasingly in middle-school classrooms — &ldquo;like.&rdquo;
            Linguists call these &ldquo;filled pauses,&rdquo; and they&apos;re a
            completely normal feature of how humans speak.
          </p>
          <p>
            Fillers become a problem not because they&apos;re wrong, but
            because they reduce the clarity and credibility of a student&apos;s
            message. Research from communication studies (Bortfeld et al.,
            Lake et al., and many others) consistently finds that
            listeners rate speakers with fewer fillers as more confident,
            more prepared, and easier to follow — even when the underlying
            content is identical.
          </p>
          <p>
            The fix, then, isn&apos;t to punish the filler. It&apos;s to build
            the student&apos;s comfort with <em>silence</em>. A student who
            is comfortable pausing for half a second while they collect
            their next sentence sounds more confident than a student who
            fills every micro-silence with &ldquo;um.&rdquo;
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">What actually works</h2>
          <p>Three things, in rough order of impact:</p>
          <ol className="space-y-3 list-decimal pl-6">
            <li>
              <strong>Feedback loops with short, low-stakes reps.</strong>{" "}
              A student needs to hear themselves say fillers to start
              noticing them. Metacognitive awareness of filler words is
              the single biggest lever; and awareness comes from
              repetition with immediate, specific feedback.
            </li>
            <li>
              <strong>A replacement behavior, explicitly taught.</strong>{" "}
              &ldquo;Pause instead of saying um&rdquo; is the replacement.
              Model the pause yourself. Let students sit with silence.
              Many of them have literally never been allowed to pause
              mid-sentence in school.
            </li>
            <li>
              <strong>Distributed practice, not massed.</strong> Ten
              minutes a week across ten weeks will beat a single
              two-hour unit every time. This is the classic
              spaced-repetition finding from cognitive science, and it
              holds for speech just as it does for vocabulary.
            </li>
          </ol>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">A 10-minute weekly cadence</h2>
          <p>
            Here&apos;s a cadence that fits into almost any ELA classroom
            or speech &amp; debate program without rearranging your
            unit plans.
          </p>

          <div className="card-warm p-5 my-4 bg-warm-teal-light/40 border-warm-teal/30">
            <h3 className="font-extrabold text-warm-teal-dark mb-3">The 3-minute warm-up (Monday)</h3>
            <p className="text-sm">
              Every student opens a 60-second speaking prompt on their
              Chromebook — something low-stakes (&ldquo;describe your
              weekend&rdquo;). After speaking, they look at their filler
              count. They don&apos;t compare to anyone else.
            </p>
          </div>

          <div className="card-warm p-5 my-4 bg-warm-gold-light/40 border-warm-gold/30">
            <h3 className="font-extrabold text-warm-gold-dark mb-3">The 5-minute targeted rep (Wednesday)</h3>
            <p className="text-sm">
              This one ties to the week&apos;s unit. If you&apos;re on
              persuasive writing, students do a 60-second opinion.
              If you&apos;re on informational text, a 60-second
              how-to. After speaking, each student writes one
              sentence: &ldquo;Next time I&apos;ll pause when I feel
              _____.&rdquo;
            </p>
          </div>

          <div className="card-warm p-5 my-4 bg-warm-coral-light/40 border-warm-coral/30">
            <h3 className="font-extrabold text-warm-coral-dark mb-3">The 2-minute celebration (Friday)</h3>
            <p className="text-sm">
              Pull up the classroom view. Don&apos;t announce scores.
              Instead, name a specific, observed improvement: &ldquo;I
              noticed Jamal paused three times this week where last
              week he would&apos;ve said um — that&apos;s huge.&rdquo;
            </p>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">A few words on tone</h2>
          <p>
            Every piece of feedback a kid gets about their speaking
            should be about the speaking, not the speaker. &ldquo;You
            used 12 filler words&rdquo; is descriptive and fine. &ldquo;You&apos;re
            a rambler&rdquo; is a character judgment and will land hard.
            Kids internalize adult feedback about their voice faster
            than anything else — it&apos;s worth being precise about the
            verbs we use.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">How Bright Speaker fits in</h2>
          <p>
            Bright Speaker is designed around exactly this cadence. A
            student opens a 60-second prompt on their Chromebook,
            speaks, and sees a live filler-word count plus a
            kid-appropriate wrap-up screen. The video stays on the
            device; we store transcripts and scores so students can see
            their own trend across sessions. We don&apos;t rank students
            against each other.
          </p>
          <p>
            If you&apos;d like to use Bright Speaker with a class this
            semester, pilots are free while we build. Email us at{" "}
            <a
              href="mailto:hello@brightspeaker.com?subject=Classroom%20pilot%20%E2%80%94%20filler%20words"
              className="text-warm-coral font-semibold hover:underline"
            >
              hello@brightspeaker.com
            </a>{" "}
            or read the{" "}
            <Link href="/for-educators" className="text-warm-coral font-semibold hover:underline">
              teacher page
            </Link>{" "}
            for more.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">Further reading</h2>
          <ul className="space-y-2 list-disc pl-6 text-sm">
            <li>Bortfeld, H., Leon, S. D., Bloom, J. E., Schober, M. F., &amp; Brennan, S. E. (2001). <em>Disfluency rates in conversation</em>.</li>
            <li>Lake, J. K., Humphreys, K. R., &amp; Cardy, S. (2011). <em>Listener vs. speaker-oriented aspects of speech</em>.</li>
            <li>Common Core State Standards, Speaking &amp; Listening: SL.1, SL.4, SL.6.</li>
          </ul>
        </article>

        <div className="mt-16 card-warm p-8 text-center bg-brand-gradient text-white">
          <h2 className="text-2xl font-extrabold mb-3">Try the 10-minute cadence with your class</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Bright Speaker is free for teacher and coach pilots this
            semester. Setup takes 10 minutes. We&apos;ll walk you through
            it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-warm-coral px-8 py-4 rounded-2xl font-extrabold btn-playful shadow-lg"
          >
            Start a classroom pilot
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
