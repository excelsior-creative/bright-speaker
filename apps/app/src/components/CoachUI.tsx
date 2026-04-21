"use client";

import { useEffect, useState } from "react";

function KidFigure({ color = "#FF7A59" }: { color?: string }) {
  return (
    <svg viewBox="0 0 200 260" style={{ maxWidth: 260, display: "block", margin: "0 auto" }}>
      <circle cx="100" cy="70" r="42" fill="#F4C9A8" stroke="#1B2340" strokeWidth="3" />
      <path
        d="M60 58 Q64 30 100 28 Q138 30 140 58 Q128 48 100 48 Q72 48 60 58 Z"
        fill="#3A2A1E"
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="86" cy="72" r="3.5" fill="#1B2340" />
      <circle cx="114" cy="72" r="3.5" fill="#1B2340" />
      <path d="M88 88 Q100 96 112 88" stroke="#1B2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path
        d="M50 160 Q50 120 100 118 Q150 120 150 160 L150 240 Q150 250 140 250 L60 250 Q50 250 50 240 Z"
        fill={color}
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="160" r="5" fill="#FFF8EC" stroke="#1B2340" strokeWidth="2" />
      <path d="M50 160 Q28 180 34 210" stroke="#1B2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 160 Q172 180 166 210" stroke="#1B2340" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

type MetricProps = {
  label: string;
  value: number;
  color: "fill" | "fill-coral" | "fill-sun" | "fill-blue";
  range: string;
};

function Metric({ label, value, color, range }: MetricProps) {
  return (
    <div className="grid gap-[6px]">
      <div className="flex justify-between items-baseline text-[13px]">
        <span className="font-bold flex items-center gap-1.5">{label}</span>
        <span className="font-mono-ui text-[var(--ink-2)] text-[11px] font-medium">{range}</span>
      </div>
      <div className="metric-bar">
        <div className={`fill ${color === "fill" ? "" : color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const TIPS = [
  { icon: "👀", text: "Nice! You looked at the camera 8 times — great eye contact." },
  { icon: "🌱", text: "Try slowing down just a little on the ending for extra oomph." },
  { icon: "🔊", text: "Your voice got stronger at the end — awesome energy!" },
  { icon: "🧍", text: "Feet planted, shoulders back — you look confident!" },
];

export default function CoachUI() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const tip = TIPS[tick % TIPS.length];
  const seed = (n: number) => 72 + ((Math.sin((tick + n) * 1.37) + 1) / 2) * 22;

  const metrics: MetricProps[] = [
    { label: "Eye contact", value: Math.round(seed(1)), range: "good", color: "fill" },
    { label: "Pacing", value: Math.round(seed(2)), range: "just right", color: "fill-sun" },
    { label: "Volume", value: Math.round(seed(3)), range: "clear", color: "fill-coral" },
    { label: "Posture", value: Math.round(seed(4)), range: "strong", color: "fill-blue" },
  ];

  return (
    <div className="mock">
      <div className="mock-chrome">
        <div className="dots">
          <span /><span /><span />
        </div>
        <div className="url">brightspeaker.com/classroom/demo/activity</div>
      </div>
      <div className="mock-body">
        <div className="mock-video">
          <span className="pill-live">Live coaching</span>
          <div className="mock-student">
            <span className="label">Camera preview · on-device only</span>
            <div style={{ width: "70%", filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.3))" }}>
              <KidFigure color="#FF7A59" />
            </div>
            <svg
              viewBox="0 0 400 300"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            >
              <g stroke="#3DBE8B" strokeWidth="2" fill="none" opacity="0.85">
                <rect x="140" y="50" width="120" height="120" rx="12" />
                <circle cx="200" cy="110" r="4" fill="#3DBE8B" />
                <text x="266" y="60" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#3DBE8B">
                  face · 98%
                </text>
              </g>
              <g stroke="#FFB627" strokeWidth="2" fill="none" opacity="0.9">
                <line x1="160" y1="180" x2="240" y2="180" />
                <text x="246" y="184" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#FFB627">
                  shoulders · level
                </text>
              </g>
            </svg>
          </div>
          <div className="bottom-row">
            <span className="timer">⏱  00:42 / 01:30  ·  Opinion speech</span>
            <div className="controls">
              <div className="ctrl">⏸</div>
              <div className="ctrl stop">■</div>
            </div>
          </div>
        </div>
        <div className="mock-coach">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                Coaching feedback
              </div>
              <h4 className="font-display font-extrabold text-[17px] mt-0.5 tracking-tight">
                Great work, Maya!
              </h4>
            </div>
            <div className="coach-xp">+24 XP</div>
          </div>
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
          <div className="tip-box">
            <span style={{ flex: "0 0 22px" }}>{tip.icon}</span>
            <span>{tip.text}</span>
          </div>
          <div>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] mb-1.5">
              Badges unlocked
            </div>
            <div className="flex gap-1.5">
              <span className="badge-chip earned">★ 3-day streak</span>
              <span className="badge-chip earned2">✦ Eye-contact pro</span>
              <span className="badge-chip">+ new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
