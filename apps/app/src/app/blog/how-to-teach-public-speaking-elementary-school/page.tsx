import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "How to teach public speaking in elementary school — Bright Speaker",
  description:
    "A practical year-at-a-glance for K–5 teachers: how to build oral language into a real classroom without adding a new subject. Maps to Common Core SL.K–SL.5.",
  keywords: [
    "how to teach public speaking in elementary school",
    "elementary speaking practice activities",
    "Common Core SL.K SL.5 speaking checklist",
    "oral language activities for elementary",
    "K-5 oral presentation",
    "elementary speaking rubric Common Core",
  ],
  openGraph: {
    title: "How to teach public speaking in elementary school",
    description:
      "A practical year at a glance for K–5 teachers. Five minutes a day, SL.K–SL.5 aligned, no curriculum re-write required.",
    type: "article",
    publishedTime: "2026-04-23",
  },
  alternates: { canonical: "/blog/how-to-teach-public-speaking-elementary-school" },
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
          <span>April 23, 2026</span>
          <span>·</span>
          <span>9 min read</span>
          <span>·</span>
          <span>K–5 classroom teachers &amp; literacy coaches</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          How to teach public speaking in elementary school
        </h1>

        <p className="text-lg text-foreground/70 leading-relaxed mb-10">
          The Common Core speaking and listening standards (SL.K through
          SL.5) are in every state&apos;s framework in some form, but most
          elementary curricula leave them to the teacher to invent on the
          fly. Here&apos;s what a year of oral-language practice can look
          like when it&apos;s treated like reading or math — a little bit
          every day, scoped to the grade, and celebrated out loud.
        </p>

        <article className="prose-like text-foreground/80 leading-relaxed space-y-5">
          <h2 className="text-2xl font-extrabold text-foreground mt-8">
            The problem with &ldquo;presentation day&rdquo;
          </h2>
          <p>
            Most elementary speaking practice in U.S. classrooms looks like
            this: four times a year, the class does presentations. One
            student stands at the front. The other twenty-three practice
            sitting and listening. The teacher grades a rubric. The unit is
            over.
          </p>
          <p>
            That&apos;s not public-speaking practice — that&apos;s a
            summative event. A fifth-grader who graduates from an elementary
            that teaches speaking this way has gotten maybe fifteen minutes
            of speaking reps across six years. That&apos;s not a skill gap.
            That&apos;s a skill absence.
          </p>
          <p>
            The fix is not a new curriculum. It&apos;s redistributing
            speaking time so every kid speaks a little every day, in a
            low-stakes way, with feedback that&apos;s about the speaking,
            not the speaker.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            A year at a glance
          </h2>
          <p>
            Here&apos;s a rough scope and sequence that maps to SL.K–SL.5.
            It assumes one short speaking practice per day (about 5
            minutes), anchored to your morning meeting or literacy warm-up.
          </p>

          <div className="card-warm p-6 mt-4 mb-4">
            <h3 className="text-lg font-extrabold text-foreground mb-3">
              Fall (August–October) — Speaking in complete sentences
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <strong>SL.K.6 / SL.1.6:</strong> Speak audibly in complete
                thoughts. Daily sentence stems at morning meeting.
              </li>
              <li>
                <strong>SL.2.6:</strong> Produce complete sentences. Swap
                stems for open prompts after week four.
              </li>
              <li>
                <strong>SL.3.6 / SL.4.6:</strong> Differentiate formal and
                informal speech. &ldquo;How would you say it to your
                friend? To the principal?&rdquo;
              </li>
            </ul>
          </div>

          <div className="card-warm p-6 mb-4">
            <h3 className="text-lg font-extrabold text-foreground mb-3">
              Winter (November–February) — Adding detail and pace
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <strong>SL.1.4 / SL.2.4:</strong> Describe with relevant
                details. Weekly &ldquo;three things about&rdquo; stems.
              </li>
              <li>
                <strong>SL.3.4:</strong> Report on a topic with appropriate
                pace. Introduce the idea that slow is powerful.
              </li>
              <li>
                <strong>SL.4.4 / SL.5.4:</strong> Organized, descriptive,
                logical sequence. Book-report or opinion-speech drills.
              </li>
            </ul>
          </div>

          <div className="card-warm p-6 mb-4">
            <h3 className="text-lg font-extrabold text-foreground mb-3">
              Spring (March–June) — Eye contact, audience awareness, &amp; pause
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <strong>SL.K.1–SL.5.1:</strong> Conversation rules. Pair
                speaking practice so students rehearse listening too.
              </li>
              <li>
                <strong>SL.5.6 / SL.4.6:</strong> Adapt language to context
                and task. Different prompts for different &ldquo;rooms.&rdquo;
              </li>
              <li>
                Optional capstone week: a 60-second retelling or opinion
                speech that lets the year&apos;s reps land.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            The daily routine that makes it stick
          </h2>
          <p>
            Reps beat events. The single most important change most
            elementary classrooms can make is swapping one quarterly
            presentation day for a five-minute daily warm-up. Here is one
            structure that works:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Minute one:</strong> The teacher reads the day&apos;s
              prompt aloud. (&ldquo;Tell us about something you&apos;re
              looking forward to this weekend.&rdquo;)
            </li>
            <li>
              <strong>Minutes two to four:</strong> Every student speaks
              for 30 seconds, either to a partner, to a camera (at a
              Chromebook cart), or to the class in rotation.
            </li>
            <li>
              <strong>Minute five:</strong> One specific, public
              celebration. Not &ldquo;great job&rdquo; — something like
              &ldquo;I heard three details in Marco&apos;s first
              sentence.&rdquo; The celebration is the coaching.
            </li>
          </ul>
          <p>
            We walk through this minute-by-minute in a separate post:{" "}
            <Link
              href="/blog/five-minute-elementary-speaking-warmup"
              className="text-warm-coral hover:underline"
            >
              A 5-minute speaking warm-up for elementary classrooms
            </Link>
            . Print it, pin it, use it tomorrow.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            What to actually listen for
          </h2>
          <p>
            A good elementary speaking rubric has three moving parts, not
            ten. The fewer you have, the more specific your feedback can
            be. Here&apos;s a short list that tracks SL.K–SL.5 without
            turning into a checklist monster:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Audibility.</strong> Can the back of the room hear
              them without the speaker being asked to repeat? This alone is
              most of SL.K.6 and SL.1.6.
            </li>
            <li>
              <strong>Complete thoughts.</strong> Does the sentence go
              somewhere? A sentence starter can help — &ldquo;I
              think&hellip; because&hellip;&rdquo;
            </li>
            <li>
              <strong>Pace and pause.</strong> Instead of calling out
              filler words (which shames young speakers), notice when a kid
              pauses instead of rushing. Pauses beat &ldquo;um.&rdquo;
            </li>
          </ul>
          <p>
            Eye contact can be a fourth in 3rd–5th, but be careful with
            it: some students look away because of culture, neurodivergence,
            or ELL context, and rigid &ldquo;look at me&rdquo; coaching can
            cause harm. Treat it as an invitation, not a requirement.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            What to avoid
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Don&apos;t grade early reps.</strong> The first
              eight weeks are for reps. Grading too soon teaches kids that
              speaking is a test to fail.
            </li>
            <li>
              <strong>Don&apos;t over-correct fillers.</strong>{" "}
              &ldquo;Like&rdquo; and &ldquo;you know&rdquo; are developmentally
              appropriate for K–5 speech. Flag true hesitations
              (&ldquo;um,&rdquo; &ldquo;uh&rdquo;) and leave the rest alone.
            </li>
            <li>
              <strong>Don&apos;t use peer-to-peer public ranking.</strong>{" "}
              &ldquo;Who&apos;s the best speaker in the class?&rdquo; is a
              harmful frame in K–5. Compare a kid only to their own
              earlier reps.
            </li>
            <li>
              <strong>Don&apos;t make the quiet kid go first.</strong>{" "}
              Volunteer order matters. Build low-stakes private reps into
              the cycle so the quiet kids get practice without the
              audience tax.
            </li>
          </ul>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            Where a tool helps (and where it doesn&apos;t)
          </h2>
          <p>
            We build Bright Speaker, so take this with the appropriate
            salt: a camera-based practice tool is useful when a teacher
            wants every kid to get private reps without using adult
            classroom time. A shared Chromebook cart with a 60-second
            prompt and on-device coaching is meaningfully better than
            &ldquo;practice at home.&rdquo;
          </p>
          <p>
            A tool is not useful when it replaces the teacher. The public
            celebration at minute five — the specific, warm, name-by-name
            observation — has to come from a human who knows the kid.
            That&apos;s the whole game.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">
            If you want a hand
          </h2>
          <p>
            We&apos;re running a handful of free 30-day pilots with K–5
            classrooms this spring and fall. No cost, one teacher, one
            classroom, a simple day-30 report. If your school would be a
            fit,{" "}
            <Link href="/pilot" className="text-warm-coral hover:underline">
              here&apos;s the pilot page
            </Link>
            , or you can{" "}
            <Link href="/contact" className="text-warm-coral hover:underline">
              write to us directly
            </Link>
            .
          </p>
          <p>
            Either way — whether you use Bright Speaker or not — the
            single best change an elementary classroom can make for
            speaking is the same: trade the quarterly presentation day for
            five minutes of everyday reps. The rest is celebration.
          </p>
        </article>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <Link href="/blog" className="text-sm font-semibold text-foreground/40 hover:text-warm-coral">
            ← All resources
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
