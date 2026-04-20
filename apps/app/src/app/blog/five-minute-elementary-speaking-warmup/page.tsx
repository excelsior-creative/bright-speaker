import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "A 5-minute speaking warm-up for elementary classrooms",
  description:
    "A low-prep, standards-aligned warm-up you can run every morning in a K-5 classroom. Maps to Common Core SL.K through SL.5. Works with or without technology.",
  openGraph: {
    title: "A 5-minute speaking warm-up for elementary classrooms",
    description:
      "A low-prep K-5 warm-up that builds oral language every single morning — with or without technology.",
    type: "article",
    publishedTime: "2026-04-20",
  },
  alternates: { canonical: "/blog/five-minute-elementary-speaking-warmup" },
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
          <span>April 20, 2026</span>
          <span>·</span>
          <span>7 min read</span>
          <span>·</span>
          <span>K–5 classroom teachers</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          A 5-minute speaking warm-up for elementary classrooms
        </h1>

        <p className="text-lg text-foreground/70 leading-relaxed mb-10">
          Every elementary teacher we talk to says the same thing:
          &ldquo;I&apos;d love to build more speaking into my day, but I don&apos;t
          have the time.&rdquo; The Common Core speaking and listening
          standards (SL.K&ndash;SL.5) are real; a good morning meeting is
          a real anchor; most curricula don&apos;t do much with either. This
          is a low-prep, 5-minute daily warm-up that fits in before
          literacy block and actually moves the needle on oral language.
        </p>

        <article className="prose-like text-foreground/80 leading-relaxed space-y-5">
          <h2 className="text-2xl font-extrabold text-foreground mt-8">Why 5 minutes is enough</h2>
          <p>
            Oral language grows through reps, not events. A single
            20-minute &ldquo;presentation day&rdquo; puts one student at the
            front of the room while the other 23 practice listening. A
            5-minute warm-up gives every kid a turn. Over a 36-week year,
            that&apos;s about 15 hours of practice per student &mdash; which
            is more than most K&ndash;5 kids will get across an entire
            elementary career otherwise.
          </p>
          <p>
            The warm-up below has three design principles:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No new prep for the teacher.</strong> You can run
              it with a sentence stem on the board and nothing else.
            </li>
            <li>
              <strong>Every kid speaks, every day.</strong> Not just the
              hand-raisers.
            </li>
            <li>
              <strong>The feedback is about the speaking, not the
              speaker.</strong> We celebrate the reps, not judge the
              voice.
            </li>
          </ul>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">The warm-up, minute by minute</h2>

          <h3 className="text-xl font-extrabold text-foreground mt-6">Minute 0:00&ndash;0:30 &mdash; The prompt</h3>
          <p>
            Put one sentence stem on the board. Pick one from the cycle
            below. Read it aloud. Don&apos;t over-explain.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Monday: <em>&ldquo;One thing that surprised me this weekend
              was&hellip;&rdquo;</em></li>
            <li>Tuesday: <em>&ldquo;If I could teach the class one thing
              today, it would be&hellip;&rdquo;</em></li>
            <li>Wednesday: <em>&ldquo;My favorite part of yesterday&apos;s
              read-aloud was&hellip; because&hellip;&rdquo;</em></li>
            <li>Thursday: <em>&ldquo;Something I&apos;m still wondering
              about&hellip;&rdquo;</em></li>
            <li>Friday: <em>&ldquo;A question I would ask the author of
              our book is&hellip;&rdquo;</em></li>
          </ul>

          <h3 className="text-xl font-extrabold text-foreground mt-6">Minute 0:30&ndash;1:30 &mdash; Think time</h3>
          <p>
            Sixty seconds of silence. Kids close their eyes or look at
            the stem. No talking. This is the hardest part to protect,
            and the part that makes the whole thing work. Think time is
            the difference between a confident sentence and an
            uh-filled ramble.
          </p>

          <h3 className="text-xl font-extrabold text-foreground mt-6">Minute 1:30&ndash;4:30 &mdash; Partner reps</h3>
          <p>
            Turn to your shoulder partner. Partner A speaks for 45
            seconds, uninterrupted. Partner B listens. Switch. Repeat
            once. Four reps total, about three minutes of talking.
          </p>
          <p>
            The rule we teach: <strong>&ldquo;When your partner pauses,
            you wait. Pauses are not the end of the sentence.&rdquo;</strong>
            This single rule does more to reduce filler words than
            almost anything else. Kids fill pauses with &ldquo;um&rdquo;
            because they&apos;re afraid of losing their turn. Protect
            their turn, and the silence becomes comfortable.
          </p>

          <h3 className="text-xl font-extrabold text-foreground mt-6">Minute 4:30&ndash;5:00 &mdash; One share</h3>
          <p>
            Pick one student to share to the whole group. Vary who. The
            shy kids get a turn too &mdash; not today, but on a day
            you&apos;ve noticed they had something good with their
            partner. The rest of the class applauds the <em>rep</em>,
            not the content.
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">Standards alignment</h2>
          <p>
            This warm-up pulls against most of the Common Core speaking
            and listening standards across K&ndash;5 every single day:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>SL.K.1 / SL.1.1 / SL.2.1:</strong> follow
              agreed-upon rules for discussion.</li>
            <li><strong>SL.K.6 / SL.1.6 / SL.2.6:</strong> speak audibly,
              produce complete sentences.</li>
            <li><strong>SL.3.1 / SL.4.1 / SL.5.1:</strong> engage
              effectively in collaborative discussions.</li>
            <li><strong>SL.3.4 / SL.4.4 / SL.5.4:</strong> report on a
              topic with organization and detail.</li>
          </ul>
          <p>
            You don&apos;t need to call these standards out to students.
            Keep the anchor chart simple: <em>&ldquo;We speak clearly, we
            take our turn, we listen all the way through.&rdquo;</em>
          </p>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">How to make it stick</h2>
          <p>
            Three habits from classrooms that run this warm-up well:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Pick the same 5 minutes every day.</strong>
              Post-recess, pre-read-aloud, or right before math.
              Consistency matters more than which slot.
            </li>
            <li>
              <strong>Resist the urge to correct.</strong> Elementary
              students need 4&ndash;6 weeks of low-stakes reps before they
              can absorb public feedback. Praise the reps, not the
              polish, until Thanksgiving.
            </li>
            <li>
              <strong>Celebrate a streak.</strong> A classroom paper
              chain, one link per day the warm-up ran, is shockingly
              motivating for K&ndash;2. Kids ask for it on days you
              forget.
            </li>
          </ol>

          <h2 className="text-2xl font-extrabold text-foreground mt-10">Where Bright Speaker fits (or doesn&apos;t)</h2>
          <p>
            This warm-up works with or without a device. If you&apos;re
            on a 1:1 Chromebook cart, Bright Speaker is designed for
            exactly this moment: students open a class code, pick the
            day&apos;s prompt, and get a 60-second private rep with
            kid-friendly coaching on eye contact, pace, and filler
            words. The teacher sees a simple per-student picture of who
            practiced and where they&apos;re growing.
          </p>
          <p>
            But the best version of this warm-up is the version you
            actually run. If that&apos;s a sentence stem and shoulder
            partners, do that. If it&apos;s Bright Speaker, do that. The
            reps are the point.
          </p>

          <div
            className="mt-12 p-6 rounded-3xl border-2 border-warm-coral/20 bg-warm-coral-light"
          >
            <p className="font-extrabold text-foreground mb-2">
              Want to try Bright Speaker with your class?
            </p>
            <p className="text-foreground/70 text-sm mb-4">
              We run free 30-day pilots with one classroom at a time.
              Chromebook-native, no student accounts required, and the
              student video never leaves the device.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-warm-coral text-white px-6 py-3 rounded-xl font-bold btn-playful"
            >
              Start a pilot conversation →
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
