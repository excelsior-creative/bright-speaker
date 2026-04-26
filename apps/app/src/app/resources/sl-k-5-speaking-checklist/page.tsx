import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "SL.K-SL.5 speaking observation checklist (printable)",
  description:
    "A free printable speaking observation checklist for elementary teachers, mapped to every Common Core Speaking & Listening standard from kindergarten through fifth grade. One page, clipboard-ready.",
  alternates: { canonical: "/resources/sl-k-5-speaking-checklist" },
  openGraph: {
    title: "Printable SL.K-SL.5 speaking observation checklist",
    description:
      "One-page, clipboard-ready Common Core speaking observation tool for elementary classrooms.",
    type: "article",
    url: "/resources/sl-k-5-speaking-checklist",
  },
};

type Row = {
  code: string;
  shortName: string;
  observable: string;
};

const KINDERGARTEN: Row[] = [
  {
    code: "SL.K.4",
    shortName: "Describe people, places, things, events",
    observable:
      "Names the topic. Adds at least one detail. Speaks loud enough for a friend to hear.",
  },
  {
    code: "SL.K.5",
    shortName: "Add drawings or visuals to descriptions",
    observable:
      "Shows or points to a drawing/object. Connects the visual to what they are saying.",
  },
  {
    code: "SL.K.6",
    shortName: "Speak audibly and express ideas clearly",
    observable:
      "Audible to the teacher from across a small group. Slows down when asked.",
  },
];

const GRADE_1: Row[] = [
  {
    code: "SL.1.4",
    shortName: "Describe with relevant details",
    observable:
      "Names the topic. Adds two or more details. Stays on topic for the full turn.",
  },
  {
    code: "SL.1.5",
    shortName: "Add drawings/visuals to clarify",
    observable:
      "Uses a visual to support the description. Refers to it during the turn.",
  },
  {
    code: "SL.1.6",
    shortName: "Produce complete sentences when appropriate",
    observable:
      "Most utterances are complete sentences. Self-corrects fragments when prompted.",
  },
];

const GRADE_2: Row[] = [
  {
    code: "SL.2.4",
    shortName: "Tell a story or recount with facts and details",
    observable:
      "Sequences events in order. Includes a beginning, middle, and end. Adds at least one specific detail.",
  },
  {
    code: "SL.2.5",
    shortName: "Create audio recordings; add visuals to clarify",
    observable:
      "Comfortable being recorded for self-review. Uses a visual purposefully when relevant.",
  },
  {
    code: "SL.2.6",
    shortName: "Produce complete sentences in formal contexts",
    observable:
      "Uses complete sentences when speaking to the whole class. Pace allows audience to follow.",
  },
];

const GRADE_3: Row[] = [
  {
    code: "SL.3.4",
    shortName: "Report on a topic with appropriate facts",
    observable:
      "States the topic clearly. Includes at least three relevant facts or descriptive details. Stays on topic.",
  },
  {
    code: "SL.3.5",
    shortName: "Create engaging audio recordings; add visuals",
    observable:
      "Voice has expression (not monotone). Visuals or recordings reinforce the spoken content.",
  },
  {
    code: "SL.3.6",
    shortName: "Speak in complete sentences for clarity",
    observable:
      "Adapts vocabulary to the audience. Few filler words (um, uh) interrupt the message.",
  },
];

const GRADE_4: Row[] = [
  {
    code: "SL.4.4",
    shortName: "Report on a topic; tell a story; recount an experience",
    observable:
      "Organized: introduction, supporting points, closing. Speaks at an understandable pace. Maintains eye contact with the audience.",
  },
  {
    code: "SL.4.5",
    shortName: "Add multimedia/visuals to enhance development",
    observable:
      "Uses visuals or recordings that develop the main idea (not just decorate).",
  },
  {
    code: "SL.4.6",
    shortName: "Differentiate between formal and informal English",
    observable:
      "Adjusts register for the audience. Uses formal English in a presentation context.",
  },
];

const GRADE_5: Row[] = [
  {
    code: "SL.5.4",
    shortName: "Report on a topic with logical organization and facts",
    observable:
      "Clear introduction, body, and closing. Three or more relevant facts/details. Maintains audience eye contact for most of the turn.",
  },
  {
    code: "SL.5.5",
    shortName: "Include multimedia and visuals to enhance themes",
    observable:
      "Visuals or audio meaningfully advance the topic. Speaker references them naturally.",
  },
  {
    code: "SL.5.6",
    shortName: "Adapt speech to varied contexts and tasks",
    observable:
      "Pace, volume, and word choice match the audience. Recovers from a misstep without abandoning the turn.",
  },
];

type Section = { label: string; rows: Row[] };

const SECTIONS: Section[] = [
  { label: "Kindergarten", rows: KINDERGARTEN },
  { label: "Grade 1", rows: GRADE_1 },
  { label: "Grade 2", rows: GRADE_2 },
  { label: "Grade 3", rows: GRADE_3 },
  { label: "Grade 4", rows: GRADE_4 },
  { label: "Grade 5", rows: GRADE_5 },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="print:hidden">
        <SiteNav />
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-6 print:hidden">
          <Link
            href="/resources"
            className="text-sm font-semibold text-foreground/40 hover:text-warm-coral"
          >
            &larr; All resources
          </Link>
        </div>

        <div className="eyebrow mb-3 print:hidden">Printable resource</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-3">
          SL.K-SL.5 speaking observation checklist
        </h1>
        <p className="lede mb-6 print:text-base print:mb-4">
          A clipboard-ready, one-page tool for elementary teachers and
          coaches. Each row is a behavior you can actually see or hear
          in a 60-second turn. Tick it, leave a one-word note, move on.
        </p>

        <div className="flex flex-wrap gap-3 mb-8 print:hidden">
          <PrintButton />
          <Link href="/blog" className="btn btn-ghost btn-sm">
            Read the blog
          </Link>
        </div>

        <article className="space-y-6 print:space-y-4">
          {SECTIONS.map((section) => (
            <section
              key={section.label}
              className="card-warm p-5 print:shadow-none print:border print:border-black print:p-3"
            >
              <h2 className="text-xl font-extrabold text-foreground mb-3 print:text-lg print:mb-2">
                {section.label}
              </h2>
              <ul className="space-y-2">
                {section.rows.map((row) => (
                  <li
                    key={row.code}
                    className="flex items-start gap-3 print:gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex-shrink-0 inline-block w-4 h-4 border-2 border-foreground rounded-sm print:w-3.5 print:h-3.5"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-mono text-warm-coral font-bold print:text-black">
                        {row.code} &middot; {row.shortName}
                      </div>
                      <div className="text-sm text-foreground/80 leading-snug print:text-foreground">
                        {row.observable}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>

        <div className="mt-12 pt-8 border-t border-dashed border-[var(--line)] text-sm text-foreground/60 print:mt-6 print:pt-4">
          <p className="mb-3">
            <strong className="text-foreground">How to use it.</strong>{" "}
            Print one per student or one per class. During a 60-second
            speaking turn, tick what you observe and jot a single word
            in the margin. Quarterly, revisit and look for movement.
            Don&apos;t score; observe.
          </p>
          <p className="mb-3 print:hidden">
            <strong className="text-foreground">A note on tone.</strong>{" "}
            This checklist is observational, not evaluative. The codes
            on the left are CCSS Speaking &amp; Listening standards
            (Anchor 4-6 strands) verbatim shorthand; the &ldquo;what to
            look for&rdquo; column is what we&apos;ve seen actually work
            in elementary classrooms. Edit it, recombine it, attach it
            to your district rubric. Free to print, copy, and share.
          </p>
          <p className="print:hidden">
            Made by{" "}
            <Link href="/" className="font-semibold hover:underline">
              Bright Speaker
            </Link>
            . If you want every kid in your class to get 10x the
            speaking reps without you grading another video pile, that
            is the product we are building.{" "}
            <Link
              href="/contact"
              className="font-semibold text-warm-coral hover:underline"
            >
              Say hi.
            </Link>
          </p>
          <p className="hidden print:block text-xs">
            brightspeaker.com/resources/sl-k-5-speaking-checklist &middot;
            Free to copy and share.
          </p>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}

