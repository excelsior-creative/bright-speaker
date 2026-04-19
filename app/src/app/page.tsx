import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CoachUI from "@/components/CoachUI";
import { Sparky } from "@/components/Sparky";
import { AudienceTabsClient } from "@/components/AudienceTabs";

const STEPS = [
  { n: 1, icon: "🎯", title: "Pick an activity", body: "Story retelling, show-and-tell, opinion speech, book report, or a prompt the teacher assigns." },
  { n: 2, icon: "🎥", title: "Speak to the camera", body: "Students practice on a Chromebook, iPad, or laptop — with privacy built right in." },
  { n: 3, icon: "🤖", title: "Get real-time coaching", body: "On-device AI reads body language, pacing, and volume — offering kid-friendly encouragement." },
  { n: 4, icon: "🏆", title: "Earn XP and badges", body: "Streaks, achievements, and a teacher dashboard turn steady practice into real growth." },
];

const STANDARDS = [
  { code: "SL.K.1", desc: "Follow conversation rules" },
  { code: "SL.K.6", desc: "Speak audibly, express thoughts" },
  { code: "SL.1.4", desc: "Describe with relevant details" },
  { code: "SL.1.6", desc: "Produce complete sentences" },
  { code: "SL.2.4", desc: "Tell a story with facts" },
  { code: "SL.2.6", desc: "Use formal English when needed" },
  { code: "SL.3.4", desc: "Report on a topic, pace & detail" },
  { code: "SL.3.6", desc: "Speak in complete sentences" },
  { code: "SL.4.4", desc: "Organized, descriptive speech" },
  { code: "SL.4.6", desc: "Differentiate formal/informal" },
  { code: "SL.5.4", desc: "Logical sequence, main ideas" },
  { code: "SL.5.6", desc: "Adapt to context & task" },
];

const PRIVACY_ITEMS = [
  {
    title: "On-device processing",
    body: "Video stays in the browser. Only aggregate metrics (e.g. \"spoke for 48s\") are sent to the dashboard.",
  },
  {
    title: "No student accounts required",
    body: "Students launch with a class code. Optional SSO via Clever, ClassLink, or Google for Education.",
  },
  {
    title: "Transparent data practices",
    body: "Plain-English privacy policy, signed DPAs, and a full-day audit log available to admins.",
  },
  {
    title: "No ads. Ever.",
    body: "B2B only. We don't sell, broker, or monetize student data in any form.",
  },
];

const PRINCIPLES = [
  {
    title: "For the quiet kid",
    body: "Low-stakes reps in a private space. No stage, no peers watching — just the student, the prompt, and a friendly coach.",
    i: "1",
  },
  {
    title: "For the classroom teacher",
    body: "Designed to fit a 5-minute warm-up slot. No new grading pile, no lesson re-write, no curriculum retraining required.",
    i: "2",
  },
  {
    title: "For the IT director",
    body: "Browser-based, no install, and student video never leaves the device. Plain-English privacy page and a DPA on request.",
    i: "3",
  },
];

const FAQS = [
  {
    q: "Do students need to sign up or create accounts?",
    a: "During a pilot, no — students practice on a shared device and progress lives on that device. For paid deployments we're adding Google Workspace for Education sign-in; Clever and ClassLink rostering are on the roadmap.",
  },
  {
    q: "Does the video really never leave the device?",
    a: "Correct. Face detection runs locally in the browser. Student video is never uploaded, stored, or shared. The one caveat: live speech-to-text in Chrome uses the browser's built-in Web Speech API, which streams audio to Google for transcription — same as any Chromebook dictation. We describe this in plain English on our privacy page.",
  },
  {
    q: "What devices does BrightSpeaker work on?",
    a: "Any modern browser with a camera: Chromebooks, iPads, laptops. No installs required. We officially support Chrome, Edge, and Safari from the last two major versions.",
  },
  {
    q: "How long does it take to get set up in a classroom?",
    a: "About five minutes. Teachers sign up, create a class, share the class code, and kids start their first activity. No curriculum retraining required.",
  },
  {
    q: "How is BrightSpeaker different from adult speech coaching tools?",
    a: "Purpose-built for ages 5–11. The language, rewards, prompts, and feedback tone are designed with a child development specialist. Adult-focused tools assume reading ability, self-critique, and long attention spans — things we can't take for granted in K–5.",
  },
  {
    q: "What about ELL students or speech differences?",
    a: "BrightSpeaker evaluates growth over time, not a fixed accent or speech target — we celebrate every student's own voice. Spanish prompts and per-student weighting for IEPs are on our near-term roadmap; if your classroom needs them sooner, tell us.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteNav />

      {/* ---------- Hero ---------- */}
      <section className="relative pt-10 pb-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.05fr_1.3fr] gap-14 items-center">
          <div className="relative">
            <span className="pill mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] inline-block" />
              New · Teacher-assigned prompts
            </span>
            <h1 className="text-[clamp(44px,5.2vw,76px)]">
              A{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, transparent 62%, var(--sun) 62%, var(--sun) 92%, transparent 92%)",
                  padding: "0 4px",
                }}
              >
                personal speech coach
              </span>{" "}
              for every kid in the room.
            </h1>
            <p className="mt-6 text-[20px] text-[var(--ink-2)] max-w-[48ch] leading-[1.5]">
              BrightSpeaker turns public speaking into a game K–5 students actually ask to play.
              Real-time coaching on eye contact, pacing, posture, and volume — all on the kid&apos;s
              device. No video ever leaves the classroom.
            </p>
            <div className="flex gap-3.5 mt-8 flex-wrap">
              <Link href="/contact" className="btn btn-primary">Book a demo →</Link>
              <Link href="/dashboard" className="btn">Start a free pilot</Link>
            </div>
            <div className="flex gap-[22px] mt-7 flex-wrap text-sm font-semibold text-[var(--ink-2)]">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">🔒 100% on-device video</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">📚 Aligned to SL.K–SL.5</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">🎒 Built for ages 5–11</span>
            </div>

            <div className="sticker hidden md:inline-block" style={{ top: -8, right: 20, transform: "rotate(4deg)" }}>
              +24 XP ⚡
            </div>
          </div>

          <div className="relative">
            <CoachUI />
            <div
              className="hidden md:block absolute"
              style={{ top: -48, right: -16, zIndex: 3, transform: "rotate(8deg)" }}
            >
              <Sparky size={110} waving />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Value strip ---------- */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-3">
          <span className="eyebrow">Built for the way K–5 classrooms actually run</span>
        </div>
        <div className="flex gap-10 justify-center flex-wrap items-center py-8 text-[var(--ink-2)] font-display font-bold text-base md:text-lg">
          <span>🔒 100% on-device video</span>
          <span>🎯 Common Core SL.K–SL.5</span>
          <span>💻 Chromebook &amp; iPad ready</span>
          <span>🧒 Ages 5–11</span>
          <span>⏱ 60-second reps</span>
        </div>
      </div>

      {/* ---------- How it works ---------- */}
      <section id="how" className="band-paper py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">How it works</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">Four taps to speaking practice — every kid, every day.</h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              No setup, no installs, no accounts for students to manage. Teachers assign, kids speak,
              BrightSpeaker coaches.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4.5" style={{ gap: "18px" }}>
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div className="text-[28px] mb-1">{s.icon}</div>
                <h3 className="text-[22px] leading-[1.2] mb-1.5">{s.title}</h3>
                <p className="text-[var(--ink-2)] text-[15px] m-0">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section id="features" className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">What&apos;s inside</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">Built for the way kids actually learn to speak.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            <div
              className="feature-card lg:col-span-2 grid md:grid-cols-2 p-0 overflow-hidden"
              style={{ gap: 0 }}
            >
              <div className="p-7">
                <div className="text-[28px]">👀</div>
                <h3 className="mt-3.5 text-[22px]">On-device coaching signals</h3>
                <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                  In-browser face detection tracks camera-facing eye contact. Live transcription surfaces
                  filler words and words-per-minute. More signals — posture, volume, expression —
                  are on the roadmap.
                </p>
              </div>
              <div
                className="min-h-[240px] bg-[var(--cream-2)] flex items-center justify-center"
                style={{ borderLeft: "2.5px solid var(--ink)" }}
              >
                <PhotoPlaceholder label="photo: 2nd grader speaking, MediaPipe overlay" tone="blue" />
              </div>
            </div>

            <div className="feature-card" style={{ background: "var(--sun)" }}>
              <div className="text-[28px]">🏅</div>
              <h3 className="mt-3.5 text-[22px]">XP, badges &amp; streaks</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                Rewards growth, not perfection. Designed with a child development specialist so kids come
                back tomorrow.
              </p>
            </div>

            <div className="feature-card" style={{ background: "var(--cream-2)" }}>
              <div className="text-[28px]">🎙️</div>
              <h3 className="mt-3.5 text-[22px]">Six speaking activities</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                Age-appropriate prompts from kindergarten show-and-tell to fifth grade opinion speeches.
              </p>
              <div className="flex gap-2.5 flex-wrap mt-4">
                <span className="chip"><span className="chip-dot" />Story retelling</span>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--coral)" }} />Show &amp; tell</span>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--blue)" }} />Opinion speech</span>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--green)" }} />Book report</span>
                <span className="chip"><span className="chip-dot" style={{ background: "#B36BE8" }} />Free talk</span>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--ink)" }} />Teacher prompts</span>
              </div>
            </div>

            <div className="feature-card" style={{ background: "var(--coral)", color: "#fff" }}>
              <div className="text-[28px]">👩‍🏫</div>
              <h3 className="mt-3.5 text-[22px]" style={{ color: "#fff" }}>Teacher view (coming soon)</h3>
              <p className="mt-1.5" style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
                A classroom view that shows who&apos;s practicing and where they&apos;re stuck is in active
                development. Pilot teachers help shape it.
              </p>
            </div>

            <div className="feature-card">
              <div className="text-[28px]">🌎</div>
              <h3 className="mt-3.5 text-[22px]">Growth over accent</h3>
              <p className="text-[var(--ink-2)] text-[15px] mt-1.5">
                We score progress over time, not a fixed speech target — designed with ELL and speech
                differences in mind. Spanish prompts are on the near-term roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Standards ---------- */}
      <section id="standards" className="band-paper py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Standards alignment</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">
              Every activity maps to Common Core SL.K–SL.5.
            </h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              Meet your speaking &amp; listening standards without building a single rubric. Reports map
              to each substandard so you can share evidence with parents and admin.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {STANDARDS.map((s) => (
              <div key={s.code} className="std">
                <span className="std-code">{s.code}</span>
                <span className="std-desc">{s.desc}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/for-educators" className="btn">See full standards map →</Link>
          </div>
        </div>
      </section>

      {/* ---------- Privacy ---------- */}
      <section id="privacy" className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div
            className="grid md:grid-cols-2 overflow-hidden"
            style={{
              background: "var(--ink)",
              color: "#fff",
              border: "2.5px solid var(--ink)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-hard-lg)",
            }}
          >
            <div className="p-10 md:p-12">
              <span className="eyebrow" style={{ color: "var(--sun)" }}>Privacy &amp; safety</span>
              <h2 className="text-[clamp(34px,3.8vw,52px)] mt-3" style={{ color: "#fff" }}>
                The video never leaves the device. Period.
              </h2>
              <p className="mt-4 text-[17px]" style={{ color: "#D6DAE6" }}>
                All pose and face analysis happens locally in the browser using MediaPipe. We never
                upload, store, or transmit student video — so COPPA, FERPA, and your district&apos;s data
                team can breathe easy.
              </p>
              <div className="mt-7 flex gap-2 flex-wrap">
                {["Built for COPPA", "Built for FERPA", "On-device video", "No ad tracking"].map((label) => (
                  <span
                    key={label}
                    className="pill"
                    style={{
                      background: "#fff",
                      color: "var(--ink)",
                      borderColor: "#fff",
                      boxShadow: "0 2px 0 rgba(0,0,0,0.25)",
                    }}
                  >
                    <span style={{ color: "var(--green)", fontWeight: 900, marginRight: 2 }}>✓</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-10 md:p-12 flex flex-col gap-4" style={{ background: "#141A30" }}>
              {PRIVACY_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 items-start rounded-[14px] p-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="flex items-center justify-center rounded-full font-black"
                    style={{
                      flex: "0 0 28px",
                      width: 28,
                      height: 28,
                      background: "var(--green)",
                      color: "var(--ink)",
                    }}
                  >
                    ✓
                  </span>
                  <div>
                    <strong className="font-display text-[17px] block mb-1">{item.title}</strong>
                    <span style={{ color: "#B9C0D4", fontSize: 14 }}>{item.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Audience ---------- */}
      <AudienceTabsClient />

      {/* ---------- Who it's for ---------- */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Who it&apos;s for</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">Designed for the three people in every K–5 speaking moment.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRINCIPLES.map((p) => (
              <div key={p.i} className="quote">
                <div className="flex gap-3 items-center">
                  <div className="quote-avatar">{p.i}</div>
                  <strong className="font-display text-[18px] text-[var(--ink)]">{p.title}</strong>
                </div>
                <p className="m-0 text-[16px] leading-[1.5] text-[var(--ink-2)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section id="pricing" className="band-paper py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Simple, per-student pricing</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">Priced for classrooms. Scaled for districts.</h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-[var(--ink-2)] text-lg">
              Every plan includes unlimited activities, the teacher dashboard, and full privacy
              documentation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-[18px]">
            <div className="tier">
              <h3 className="text-2xl">Classroom</h3>
              <div className="tier-price">$4<small> / student / year</small></div>
              <p className="text-[var(--ink-2)] text-sm m-0">
                For a single teacher or small school (up to 100 students).
              </p>
              <ul className="list-none p-0 m-0 mt-2 grid gap-2 text-[15px]">
                {["All six speaking activities", "Teacher dashboard", "XP, badges & streaks", "Email support"].map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="btn mt-auto">Start a free pilot</Link>
            </div>

            <div className="tier tier-featured">
              <span className="pill self-start" style={{ background: "#fff" }}>Most popular</span>
              <h3 className="text-2xl">School</h3>
              <div className="tier-price">$3<small> / student / year</small></div>
              <p className="text-[var(--ink-2)] text-sm m-0">
                For K–5 schools (100–800 students). Everything in Classroom, plus:
              </p>
              <ul className="list-none p-0 m-0 mt-2 grid gap-2 text-[15px]">
                {["SSO: Clever, ClassLink, Google", "Roster sync & bulk admin", "School-level analytics", "Dedicated onboarding specialist"].map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn mt-auto">Book a demo</Link>
            </div>

            <div className="tier">
              <h3 className="text-2xl">District</h3>
              <div className="tier-price">Let&apos;s talk</div>
              <p className="text-[var(--ink-2)] text-sm m-0">
                For multi-school districts. Everything in School, plus:
              </p>
              <ul className="list-none p-0 m-0 mt-2 grid gap-2 text-[15px]">
                {["Signed DPA & custom procurement", "District rollup reporting", "PD & teacher training", "SOC 2 Type II & security review"].map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn mt-auto">Get a quote</Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[var(--ink-2)]">
            Title I school?{" "}
            <Link href="/contact" className="font-bold" style={{ color: "var(--blue)" }}>
              Ask about our 50% discount →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="eyebrow block mb-3.5">Questions teachers ask us</span>
            <h2 className="text-[clamp(34px,3.8vw,52px)]">The things you were about to email us.</h2>
          </div>
          <div className="grid gap-2.5 max-w-[820px] mx-auto">
            {FAQS.map((f, i) => (
              <details key={f.q} className="faq-item" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer CTA ---------- */}
      <section id="demo" className="pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="footer-cta">
            <div>
              <span className="eyebrow" style={{ color: "var(--sun)" }}>Ready when you are</span>
              <h2 className="mt-2.5">Bring BrightSpeaker to your classroom this month.</h2>
              <p>
                Pilots start in under a week. No contract, no credit card — just a class code and a
                roomful of kids who can&apos;t wait to share.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Link href="/contact" className="btn btn-primary">Book a 20-min demo →</Link>
              <Link href="/dashboard" className="btn" style={{ background: "#fff" }}>
                Start a free 30-day pilot
              </Link>
              <span className="text-[13px] text-center" style={{ color: "#B9C0D4" }}>
                Questions?{" "}
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

/* ---------- Photo placeholder ---------- */

function PhotoPlaceholder({
  label,
  tone = "cream",
  w = 800,
  h = 500,
}: {
  label: string;
  tone?: "cream" | "blue" | "coral" | "green" | "ink";
  w?: number;
  h?: number;
}) {
  const bg = { cream: "#FDEFD4", blue: "#D6E0F2", coral: "#FFE0D6", green: "#D6F0E3", ink: "#2A3450" }[tone];
  const stripe = { cream: "#F4E0B5", blue: "#B8C8E5", coral: "#FFC9B5", green: "#B5E0C8", ink: "#1B2340" }[tone];
  const ink = tone === "ink" ? "#FFF8EC" : "#1B2340";
  const id = `stripe-${label.replace(/\W/g, "").slice(0, 10)}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="18" height="18" fill={bg} />
          <rect width="9" height="18" fill={stripe} opacity="0.5" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
      <g>
        <rect
          x={w / 2 - 200}
          y={h / 2 - 22}
          width="400"
          height="44"
          rx="8"
          fill="#FFF8EC"
          stroke={ink}
          strokeWidth="2"
        />
        <text
          x={w / 2}
          y={h / 2 + 5}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="14"
          fill={ink}
          fontWeight="500"
          letterSpacing="0.08em"
        >
          {label.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
