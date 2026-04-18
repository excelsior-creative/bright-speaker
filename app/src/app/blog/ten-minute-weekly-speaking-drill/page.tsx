import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "A 10-minute weekly speaking drill for ELA classrooms",
  description:
    "A Monday-morning-friendly speaking drill that fits inside a full ELA block: five minutes of practice, five minutes of reflection, and a progress line that actually moves. Printable handout included.",
  openGraph: {
    title: "A 10-minute weekly speaking drill for ELA classrooms",
    description:
      "Five minutes of practice, five minutes of reflection. A weekly speaking drill you can run on Monday morning with nothing but a Chromebook.",
    type: "article",
    publishedTime: "2026-04-18",
  },
  alternates: { canonical: "/blog/ten-minute-weekly-speaking-drill" },
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
          <span>April 18, 2026</span>
          <span>·</span>
          <span>7 min read</span>
          <span>·</span>
          <span>ELA teachers, grades 4–8</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          A 10-minute weekly speaking drill for ELA classrooms
        </h1>

        <p className="text-lg text-foreground/70 leading-relaxed mb-8">
          If you&apos;ve ever thought &quot;I&apos;d do more speaking work
          with my students if I had a spare period a week,&quot; this is for
          you. The drill below takes ten minutes. It does not require a
          binder, a scoring rubric, or a second teacher. It fits on a
          Chromebook and a timer. Do it once a week for a semester and you
          will see the kind of student-confidence shift that most oral
          communication units promise and few deliver.
        </p>

        <article className="prose prose-lg max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-foreground mt-8">Why a drill, not a unit</h2>
          <p>
            Most K-12 speaking curricula front-load a unit — a week of
            explicit instruction, a project, a presentation, assessment,
            done. The problem is that speaking, like any motor skill, is
            acquired through distributed practice. Five speeches across a
            single unit produces a smaller durable skill gain than one
            speech a week across a semester, because the skill has time to
            consolidate between reps. (This is the same reason piano
            teachers don&apos;t ask students to practice scales for three
            hours once a month.)
          </p>
          <p>
            The trick is making the reps small enough that they actually
            happen. Ten minutes on a Monday morning is the budget that
            survives contact with reality.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">The drill, minute by minute</h2>
          <p>
            Here&apos;s the full cadence. Each week uses the same structure,
            but the prompt changes.
          </p>

          <div className="card-warm p-6 my-6">
            <ol className="list-decimal pl-6 space-y-3 text-foreground/80">
              <li>
                <strong className="text-foreground">Minute 0–1: set the prompt.</strong>{" "}
                Post the week&apos;s prompt on the board. One sentence, no
                worksheet. (Examples below.)
              </li>
              <li>
                <strong className="text-foreground">Minute 1–3: think &amp; jot.</strong>{" "}
                Students get two minutes of silent think-time and may jot
                three bullet points — not a script.
              </li>
              <li>
                <strong className="text-foreground">Minute 3–4: one focus.</strong>{" "}
                Everyone picks ONE thing to work on this week. Not five,
                one. Options on the focus list: &quot;pause instead of
                um,&quot; &quot;look at the camera,&quot; &quot;slow
                down,&quot; &quot;start with a hook.&quot;
              </li>
              <li>
                <strong className="text-foreground">Minute 4–5: practice.</strong>{" "}
                One 60-second recording. Students do this on their own
                device. You&apos;re not watching; they&apos;re not
                performing for you. This is the reps.
              </li>
              <li>
                <strong className="text-foreground">Minute 5–8: reflect.</strong>{" "}
                Students watch their own recording (or read the transcript)
                and answer three questions in one sentence each:
                <ol className="list-disc pl-6 mt-2">
                  <li>What did I do well?</li>
                  <li>What did I do with my focus?</li>
                  <li>What will I try next week?</li>
                </ol>
              </li>
              <li>
                <strong className="text-foreground">Minute 8–10: one share.</strong>{" "}
                One student volunteers to share their reflection aloud —
                not the speech, the reflection. Rotate each week. Applause
                is automatic.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">Twelve prompts for the semester</h2>
          <p>
            Prompts are organized from low-stakes (story) to higher-stakes
            (opinion). Swap in your own; the shape matters more than the
            content.
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Tell us about a time you were really proud of yourself.</li>
            <li>Describe a place that feels like home.</li>
            <li>Teach us how to do something you&apos;re good at.</li>
            <li>Retell the last book you finished — in a minute.</li>
            <li>If you could change one school rule, which and why?</li>
            <li>Introduce a character from a book as if they were joining our class.</li>
            <li>Argue for the best invention of the last 100 years.</li>
            <li>Explain a tricky idea from math or science to a fourth grader.</li>
            <li>Tell us about someone who shaped who you are.</li>
            <li>Describe an ordinary object as if it were magical.</li>
            <li>Make the case for something most people disagree with you about.</li>
            <li>Reflect: how is your speaking different than when we started?</li>
          </ol>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">Why the &quot;one focus&quot; move matters</h2>
          <p>
            The single biggest mistake in teaching speaking is asking
            students to improve on five dimensions at once. Eye contact.
            Pacing. Volume. Filler words. Organization. A seventh grader
            presented with all five shuts down and defaults to whatever is
            comfortable — usually reading off notes in a monotone. One
            focus per week, cycled through the list, produces a different
            kind of attention: deliberate, narrow, and durable. Coaches
            call this the &quot;one-thing drill,&quot; and it&apos;s how
            athletes get good at a motor skill faster than the rest of the
            class gets good at theirs.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">What to say when a kid says &quot;I hate this&quot;</h2>
          <p>
            Some students will push back. Speaking in front of a camera
            feels vulnerable — and for an anxious student, a small practice
            can feel like a big performance. Two things help:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Name the reps framing explicitly.</strong>{" "}
              &quot;This isn&apos;t a performance. It&apos;s one rep. You
              don&apos;t have to be good yet.&quot;
            </li>
            <li>
              <strong>Let them record alone.</strong>{" "}
              The teacher is not the audience. A camera is a lower-stakes
              listener than a classroom.
            </li>
          </ul>
          <p>
            Usually by week four the pushback becomes ownership: students
            start referencing their previous week&apos;s focus unprompted.
            That&apos;s the target behavior.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">What progress looks like</h2>
          <p>
            You&apos;re not grading these. You&apos;re looking for a trend
            line, over a semester, across four dimensions:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Average filler-word count per session going down.</li>
            <li>Words per minute landing in the 110–150 band.</li>
            <li>Recordings that sound like a student talking, not reading.</li>
            <li>Reflections that get more specific over time.</li>
          </ul>
          <p>
            That last one is the leading indicator. When a student writes
            &quot;I paused three times instead of saying um&quot; instead
            of &quot;it was okay,&quot; you have a speaker.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">A printable handout</h2>
          <p>
            Below is the drill as a one-page student handout. Copy this
            into a Google Doc, print a single double-sided page, and give
            one to each student on the first Monday. The second side is a
            weekly reflection log you tear off and hand in — optional.
          </p>

          <div className="card-warm p-6 my-6">
            <h3 className="font-extrabold text-foreground text-lg mb-3">📄 The Monday Morning Speaker Drill</h3>
            <p className="text-sm text-foreground/80 mb-3"><strong>Time:</strong> 10 minutes, once a week.</p>
            <p className="text-sm text-foreground/80 mb-3"><strong>What you need:</strong> Your device, a prompt, a focus.</p>
            <h4 className="font-bold text-foreground mt-4 mb-2">Today&apos;s prompt</h4>
            <p className="text-sm text-foreground/70 italic mb-3">(Your teacher posts this. Don&apos;t overthink it.)</p>
            <h4 className="font-bold text-foreground mt-4 mb-2">Your focus this week (pick ONE)</h4>
            <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-0.5">
              <li>Pause instead of saying &quot;um&quot; or &quot;like&quot;</li>
              <li>Look at the camera</li>
              <li>Slow down and take your time</li>
              <li>Start with a hook (a question, a scene, a bold claim)</li>
              <li>End with a clear finish (not &quot;...yeah.&quot;)</li>
            </ul>
            <h4 className="font-bold text-foreground mt-4 mb-2">Do the rep</h4>
            <p className="text-sm text-foreground/80 mb-3">
              Set a 60-second timer. Speak. Try not to stop.
            </p>
            <h4 className="font-bold text-foreground mt-4 mb-2">Reflect (one sentence each)</h4>
            <ol className="list-decimal pl-5 text-sm text-foreground/80 space-y-0.5">
              <li>What did I do well?</li>
              <li>What did I do with my focus?</li>
              <li>What will I try next week?</li>
            </ol>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mt-8">Running this with Bright Speaker</h2>
          <p>
            If you&apos;d like the practice half (the 60-second rep with
            live feedback on filler words, pacing, and eye contact) to run
            without you setting up anything, that&apos;s what{" "}
            <Link href="/for-educators" className="text-warm-coral underline font-semibold">
              Bright Speaker
            </Link>{" "}
            does. Student video never leaves the device; you get a class
            view with session counts and aggregate progress. The drill
            above works with or without us.
          </p>

          <p>
            If you try it, tell us what you changed. Every weekly cadence
            we&apos;ve seen work in real classrooms looks a little
            different — a better prompt list, a different share norm, a
            two-minute reframe — and we&apos;d like to learn from yours.
          </p>
        </article>

        <div className="mt-12 card-warm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-extrabold text-foreground mb-1">Want to run this with your class?</h3>
            <p className="text-sm text-foreground/60">
              30-day Bright Speaker pilots are free. One classroom, 20-minute onboarding call.
            </p>
          </div>
          <Link
            href="/pilot"
            className="bg-warm-coral text-white px-6 py-3 rounded-xl font-extrabold btn-playful shadow-lg shadow-warm-coral/30 whitespace-nowrap"
          >
            See the pilot →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
