import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "For schools & districts — Bright Speaker",
  description:
    "How Bright Speaker fits into an elementary Chromebook program: private-by-design student data handling, Google Workspace for Education sign-in, and the path from a single K–5 classroom to a district license.",
  openGraph: {
    title: "Bright Speaker for schools & districts",
    description:
      "Private-by-design speaking practice for K–5 classrooms. Chromebook-native. Pilots are free.",
  },
  alternates: { canonical: "/for-schools" },
};

const STEPS = [
  {
    n: 1,
    title: "Free classroom pilot",
    body: "One K–5 teacher runs BrightSpeaker with their class for 30 days. We host a 20-minute onboarding call and a 20-minute day-30 review. No paperwork, no payment.",
  },
  {
    n: 2,
    title: "Building rollout",
    body: "If the pilot clears, we expand to the building — more classrooms, shared prompts, a building admin seat. Still free while we work through your district's data review.",
  },
  {
    n: 3,
    title: "School or district license",
    body: "Per-student annual pricing designed for elementary building budgets. Google Workspace for Education SSO, roster provisioning, a signed DPA, and named support.",
  },
];

const DATA_ITEMS = [
  {
    title: "Video never leaves the device",
    body: "The webcam stream is processed in the browser. It is not uploaded, not stored, not shared. Every practice session is private to the student.",
  },
  {
    title: "Minimum viable data",
    body: "We store what we need to show a student their progress: transcripts, scores, badges, timestamps. We do not ask for birthdate, phone, or home address.",
  },
  {
    title: "Sign in with Google Workspace for Education",
    body: "Teachers use the school account they already have. Student access in pilots runs with class-code entry so kids never need a new password. Workspace SSO is on the near-term roadmap for paid deployments.",
  },
  {
    title: "DPA-ready for paid deployments",
    body: "We will sign a data privacy agreement aligned with your district's standards — NDPA, SDPC, or your local variant — before a paid deployment goes live.",
  },
];

const FAQS = [
  {
    q: "Does BrightSpeaker work on our Chromebooks?",
    a: "Yes. The app runs in Chrome, uses the student's webcam and microphone, and needs no installs or extensions. We recommend Chromebooks made in the last four years; older models can run it but may show a slight lag on the eye-contact analysis.",
  },
  {
    q: "How does sign-in work?",
    a: "Teachers sign in with Google Workspace for Education. During a pilot, students join with a class code on a shared Chromebook — no new student account required. Workspace SSO for students is on the near-term roadmap for paid deployments, and a district admin can restrict access to a managed domain.",
  },
  {
    q: "What happens to the student video?",
    a: "It stays on the student's device. The camera stream is used for live eye-contact feedback in the browser, and it's discarded when the session ends. We never upload, store, or share student video.",
  },
  {
    q: "Is the feedback safe for kids?",
    a: "Today, our feedback is rule-based — specific, warm, and age-appropriate by design. Before we ship any LLM-generated feedback to students, we review every prompt with K–5 teachers. Feedback is about the speaking, not the speaker. No ranking, no 'bad job,' no comparisons between kids.",
  },
  {
    q: "What about speech-to-text — where does the audio go?",
    a: "Chrome's built-in Web Speech API transcribes the student's audio, which in Chrome means the audio stream is sent to Google for transcription — the same path used by Google Docs voice typing. We disclose this plainly on our privacy page. On-device speech-to-text is on our roadmap.",
  },
  {
    q: "What does a pilot cost?",
    a: "Nothing during the pilot window. When we publish commercial pricing, it is designed for elementary building budgets — not enterprise SaaS. Title I schools get a standing 50% discount.",
  },
  {
    q: "Can we sign a DPA?",
    a: "Yes, before any paid deployment. For pilots, we will work with your team if a DPA is a pre-pilot requirement, using a template aligned with your district's standards (NDPA or SDPC).",
  },
];

export default function ForSchools() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      {/* ---------- Hero ---------- */}
      <section className="pt-10 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <span className="pill mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--blue)] inline-block" />
            For schools &amp; districts
          </span>
          <h1 className="text-[clamp(40px,4.8vw,64px)]">
            Elementary speaking practice that{" "}
            <span
              style={{
                background:
                  "linear-gradient(180deg, transparent 62%, var(--sun) 62%, var(--sun) 92%, transparent 92%)",
                padding: "0 4px",
              }}
            >
              takes student data seriously
            </span>
            .
          </h1>
          <p className="mt-6 text-[19px] text-[var(--ink-2)] max-w-[62ch] mx-auto leading-[1.5]">
            BrightSpeaker is built for the realities of a K–5 Chromebook program:
            browser-based, no install, Google Workspace for Education sign-in
            for teachers, and a private-by-design architecture that keeps
            student video on the device.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap justify-center">
            <Link href="/contact" className="btn btn-primary">Start a pilot conversation →</Link>
            <Link href="/privacy" className="btn">Read our data &amp; privacy stance</Link>
          </div>
          <div className="flex gap-[22px] mt-7 flex-wrap text-sm font-semibold text-[var(--ink-2)] justify-center">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">🔒 100% on-device video</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">🏫 Title I 50% discount</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">📚 Aligned to SL.K–SL.5</span>
          </div>
        </div>
      </section>

      {/* ---------- Path: pilot → building → district ---------- */}
      <section className="band-paper py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">How we work with schools</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              The path from one classroom to a district license.
            </h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              We don&apos;t expect a district to buy a speaking tool they haven&apos;t seen
              in a classroom. We meet teachers where they are, then scale on proof.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-[18px]">
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <div className="step-num">{String(s.n).padStart(2, "0")}</div>
                <h3 className="text-[22px] leading-[1.2] mb-1.5">{s.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] m-0">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Data stance ---------- */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">What we do with student data</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              We minimize what we collect and we won&apos;t make claims we can&apos;t back up.
            </h2>
            <p className="mt-4 max-w-[64ch] mx-auto text-[var(--ink-2)] text-lg">
              The short version is below. The long version lives on our{" "}
              <Link href="/privacy" className="font-bold" style={{ color: "var(--blue)" }}>
                privacy &amp; data page
              </Link>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-[18px]">
            {DATA_ITEMS.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="text-[22px]">
                  <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span>
                </div>
                <h3 className="mt-3 text-[20px]">{item.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] mt-1.5">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="feature-card mt-6" style={{ background: "var(--cream-2)" }}>
            <div className="flex items-start gap-3">
              <span style={{ color: "var(--sun-ink)", fontWeight: 900, fontSize: 18 }}>!</span>
              <div className="text-[15px] text-[var(--ink-2)] leading-relaxed">
                <strong className="font-display text-[var(--ink)]">About compliance claims.</strong>{" "}
                BrightSpeaker is pre-launch. We do not currently hold SOC 2
                certification, a COPPA Safe Harbor attestation, or a published
                FERPA opinion letter. We are transparent about where we are in
                that work at every step of a procurement conversation. If your
                district requires specific artifacts to run a pilot, tell us —
                we&apos;ll tell you honestly whether we have them yet.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Wedge / secondary lane ---------- */}
      <section className="band-paper py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Who we serve today</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">
              Elementary first. Middle school welcome.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-[18px]">
            <div className="feature-card">
              <div className="text-[28px]">🎒</div>
              <h3 className="mt-3.5 text-[22px]">K–5 classrooms (our focus)</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                Prompts, rewards, feedback tone, and coaching signals are
                designed for ages 5–11. We map to Common Core SL.K–SL.5.
                Title I schools get a standing 50% discount — equity baked
                into the pricing, not bolted on.
              </p>
            </div>
            <div className="feature-card" style={{ background: "var(--cream-2)" }}>
              <div className="text-[28px]">🎤</div>
              <h3 className="mt-3.5 text-[22px]">Middle-school ELA &amp; speech/debate</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                The core practice loop works fine for grades 6–8 and for
                speech/debate programs. We&apos;re a great fit for classrooms
                already running oral presentations; we&apos;re not currently
                the headline product for varsity competitive events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Questions from IT &amp; curriculum</span>
            <h2 className="text-[clamp(32px,3.4vw,48px)]">The questions we hear most.</h2>
          </div>
          <div className="grid gap-2.5 max-w-[820px] mx-auto">
            {FAQS.map((item, i) => (
              <details key={item.q} className="faq-item" open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="footer-cta">
            <div>
              <span className="eyebrow" style={{ color: "var(--sun)" }}>Ready when you are</span>
              <h2 className="mt-2.5">Talk to us about a pilot.</h2>
              <p>
                The fastest way to evaluate BrightSpeaker is to watch an
                elementary classroom use it for three weeks. We&apos;ll handle
                setup, the teacher walkthrough, and the day-30 review.
                Pilots are free.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Link href="/contact" className="btn btn-primary">Start a pilot conversation →</Link>
              <Link href="/privacy" className="btn" style={{ background: "#fff" }}>
                Read our privacy stance
              </Link>
              <span className="text-[13px] text-center" style={{ color: "#B9C0D4" }}>
                District procurement?{" "}
                <a href="mailto:hello@brightspeaker.com" className="text-white underline">
                  hello@brightspeaker.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
