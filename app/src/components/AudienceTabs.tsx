"use client";

import { useState } from "react";
import Link from "next/link";

type TabKey = "teachers" | "admins" | "parents";

const DATA: Record<
  TabKey,
  { title: string; photo: string; photoTone: "cream" | "blue" | "coral" | "green"; items: string[] }
> = {
  teachers: {
    title: "Give every student the practice the whole class needs.",
    photo: "photo: teacher at whiteboard, smiling with students",
    photoTone: "coral",
    items: [
      "Assign a prompt — every kid practices simultaneously.",
      "See real-time progress per student, per standard.",
      "Export evidence for parent-teacher conferences in one click.",
      "No lesson prep: 80+ ready-to-use activities library.",
    ],
  },
  admins: {
    title: "District-scale speaking instruction, without the procurement headaches.",
    photo: "photo: principal meeting with staff in library",
    photoTone: "blue",
    items: [
      "Signed DPA, SOC 2 Type II, and full privacy documentation.",
      "Clever, ClassLink & Google SSO.",
      "Per-student annual licensing, transparent pricing.",
      "School-level analytics rolled up to district dashboards.",
    ],
  },
  parents: {
    title: "Help your kid find their voice — at school and at home.",
    photo: "photo: parent and child on couch with laptop",
    photoTone: "green",
    items: [
      "See a weekly email summary of what your child practiced.",
      "Unlock at-home practice mode through the school license.",
      "Age-appropriate, ad-free, and privacy-first.",
      "Built with a child development specialist.",
    ],
  },
};

const LABELS: Record<TabKey, string> = {
  teachers: "For Teachers",
  admins: "For Administrators",
  parents: "For Parents",
};

function TabPhoto({ label, tone }: { label: string; tone: "cream" | "blue" | "coral" | "green" }) {
  const bg = { cream: "#FDEFD4", blue: "#D6E0F2", coral: "#FFE0D6", green: "#D6F0E3" }[tone];
  const stripe = { cream: "#F4E0B5", blue: "#B8C8E5", coral: "#FFC9B5", green: "#B5E0C8" }[tone];
  const id = `stripe-audience-${tone}`;
  return (
    <svg viewBox="0 0 700 520" width="100%" style={{ display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="18" height="18" fill={bg} />
          <rect width="9" height="18" fill={stripe} opacity="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="520" fill={`url(#${id})`} />
      <rect x="150" y="238" width="400" height="44" rx="8" fill="#FFF8EC" stroke="#1B2340" strokeWidth="2" />
      <text
        x="350"
        y="265"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="14"
        fill="#1B2340"
        fontWeight="500"
        letterSpacing="0.08em"
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

export function AudienceTabsClient() {
  const [tab, setTab] = useState<TabKey>("teachers");
  const data = DATA[tab];

  return (
    <section className="py-24 band-paper">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="eyebrow block mb-3.5">For everyone in a kid&apos;s circle</span>
          <h2 className="text-[clamp(34px,3.8vw,52px)]">
            One product. Different superpowers for each role.
          </h2>
        </div>

        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {(Object.keys(DATA) as TabKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className="btn btn-sm"
              style={
                tab === k
                  ? { background: "var(--ink)", color: "#fff" }
                  : undefined
              }
            >
              {LABELS[k]}
            </button>
          ))}
        </div>

        <div
          className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center p-10 md:p-12"
          style={{
            background: "#fff",
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-hard-lg)",
          }}
        >
          <div>
            <h3 className="text-[34px] leading-[1.05]">{data.title}</h3>
            <ul className="list-none p-0 mt-5 grid gap-2.5">
              {data.items.map((it) => (
                <li key={it} className="flex gap-3 items-start text-base">
                  <span
                    className="inline-flex items-center justify-center font-black text-[13px]"
                    style={{
                      flex: "0 0 22px",
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: "var(--sun)",
                      border: "2px solid var(--ink)",
                      marginTop: 2,
                    }}
                  >
                    ✓
                  </span>
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link href="/contact" className="btn btn-primary">Book a demo</Link>
              <Link href="/dashboard" className="btn">Start a free pilot</Link>
            </div>
          </div>
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              border: "2.5px solid var(--ink)",
            }}
          >
            <TabPhoto label={data.photo} tone={data.photoTone} />
          </div>
        </div>
      </div>
    </section>
  );
}
