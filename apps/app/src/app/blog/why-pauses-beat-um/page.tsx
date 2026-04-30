import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: 'Why pauses beat "um": a 2-minute explainer for your classroom',
  description:
    "A short, classroom-ready explanation of why pauses make a student sound more confident than fillers. Print it, post it, or read it aloud during your next speaking warm-up.",
  openGraph: {
    title: 'Why pauses beat "um"',
    description:
      "A 2-minute classroom-ready explainer kids can actually remember. K–5 first, useful through middle school.",
    type: "article",
    publishedTime: "2026-04-24",
  },
  alternates: { canonical: "/blog/why-pauses-beat-um" },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      <main className="max-w-[760px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--coral)]"
          >
            ← All resources
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--ink-2)] font-semibold mb-3 font-mono-ui">
          <span>April 24, 2026</span>
          <span>·</span>
          <span>4 min read</span>
          <span>·</span>
          <span>K–5 classroom teachers</span>
        </div>

        <h1 className="text-[clamp(36px,4.8vw,56px)] mb-5">
          Why pauses beat &ldquo;um&rdquo;
        </h1>

        <p className="lede mb-10">
          A short, classroom-ready explanation of why silence is one of
          the most confident things a speaker can do. Print it, post it,
          or read it aloud during your next speaking warm-up.
        </p>

        <article className="text-[var(--ink)] leading-relaxed space-y-5 text-[17px]">
          <h2 className="text-2xl mt-8">The two-minute version</h2>
          <p>
            When a student says &ldquo;um,&rdquo; &ldquo;uh,&rdquo; or
            &ldquo;like,&rdquo; they&apos;re usually not thinking. They&apos;re
            holding their turn. Elementary students fill pauses because
            they&apos;re afraid somebody else will jump in. That fear is
            reasonable &mdash; classrooms are full of interruption &mdash;
            but the habit it builds sounds like nervousness, not thinking.
          </p>
          <p>
            A pause does something different. It tells the listener:
            <em> I&apos;m still going. I&apos;m picking the right word.
            I&apos;m trusting you to wait.</em> That&apos;s the voice of a
            confident speaker.
          </p>
          <p>
            The trick isn&apos;t saying &ldquo;don&apos;t say um.&rdquo;
            The trick is teaching the class to protect each other&apos;s
            pauses.
          </p>

          <div className="card p-6 my-8 bg-[var(--cream-2)]">
            <p className="font-display text-[18px] mb-2">
              The anchor-chart version
            </p>
            <p className="m-0 text-[var(--ink)] text-[16px]">
              <strong>Pauses are not the end of the sentence.</strong>{" "}
              When your partner pauses, you wait. A pause is a sign they
              are picking the best word.
            </p>
          </div>

          <h2 className="text-2xl mt-10">What kids can actually say instead</h2>
          <p>
            &ldquo;Stop saying um&rdquo; doesn&apos;t work, because kids
            don&apos;t know they&apos;re saying it. A specific substitute
            does. Teach two:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Silence.</strong> Count to one in your head.
              That&apos;s a long pause for a listener. Zero to you.
            </li>
            <li>
              <strong>A bridge phrase.</strong> &ldquo;Let me think&hellip;&rdquo;
              or &ldquo;What I mean is&hellip;&rdquo; are full sentences
              that buy the same time as an &ldquo;um&rdquo; while sounding
              like you&apos;re still in charge.
            </li>
          </ul>

          <h2 className="text-2xl mt-10">A 60-second classroom drill</h2>
          <p>
            The best way to teach this is to make it a game. Three steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Pair kids up.</strong> Partner A speaks for 60
              seconds about a topic they care about. Partner B&apos;s only
              job is to count &mdash; silently, on their fingers &mdash;
              the number of &ldquo;um,&rdquo; &ldquo;uh,&rdquo; and
              &ldquo;like&rdquo; fillers.
            </li>
            <li>
              <strong>Swap.</strong> Partner B speaks, Partner A counts.
            </li>
            <li>
              <strong>Second round, one rule change.</strong> Now when you
              feel an &ldquo;um&rdquo; coming, close your mouth and count
              to one. Partner counts again. Fillers usually drop by about
              half in a single round.
            </li>
          </ol>
          <p>
            Celebrate the drop. Don&apos;t announce individual counts. The
            point isn&apos;t the number &mdash; it&apos;s that students
            <em> feel</em> what a pause does.
          </p>

          <h2 className="text-2xl mt-10">What about younger kids?</h2>
          <p>
            In kindergarten and first grade, the language is simpler but
            the instinct is the same. Try:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              &ldquo;Big-kid speakers use their thinking face instead of
              their thinking noise.&rdquo;
            </li>
            <li>
              Model it. Say a sentence with an obvious pause. Then ask:
              &ldquo;Did I sound unsure, or did I sound like I was
              picking?&rdquo;
            </li>
            <li>
              Don&apos;t count fillers with K&ndash;1 students. Count
              pauses. &ldquo;How many good thinking moments did you
              hear?&rdquo;
            </li>
          </ul>

          <h2 className="text-2xl mt-10">Why we&apos;re writing about this</h2>
          <p>
            Bright Speaker is a browser-based practice tool that gives
            every elementary student 60-second speaking reps on a
            Chromebook. Our live coaching surfaces filler words in real
            time &mdash; and the thing we&apos;ve seen in classrooms is
            that students don&apos;t need to be told their filler count.
            They need to be taught that pauses are safe. This post is
            what we wish more anchor charts said.
          </p>
          <p>
            The warm-up above works with or without a device. If you
            want students to see their own filler count after a rep, our
            free classroom pilot gets you there in about five minutes.
          </p>

          <div className="card p-6 mt-10 bg-[var(--sun)]/20">
            <p className="font-display text-[20px] mb-2">
              Want to try Bright Speaker with your class?
            </p>
            <p className="text-[var(--ink)] text-[15px] mb-4">
              Free 30-day pilots. Chromebook-native. No student accounts
              required. Student video never leaves the device. Title I
              schools get 50% off list once we publish pricing.
            </p>
            <Link href="/contact" className="btn btn-coral btn-sm">
              Start a pilot conversation →
            </Link>
          </div>

          <h2 className="text-2xl mt-12">Print version</h2>
          <p>
            Three lines for a poster, a writing folder, or the back of a
            nameplate:
          </p>
          <div className="card p-6 font-display text-[20px] leading-snug space-y-2">
            <p className="m-0">A pause is not a mistake.</p>
            <p className="m-0">A pause is picking the right word.</p>
            <p className="m-0">When a speaker pauses, the class waits.</p>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
