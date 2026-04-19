interface SparkyProps {
  size?: number;
  wink?: boolean;
  waving?: boolean;
}

export function Sparky({ size = 120, wink = false, waving = false }: SparkyProps) {
  const rays = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 120 144"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sparky, the BrightSpeaker mascot"
      role="img"
    >
      {rays.map((a) => (
        <g key={a} transform={`rotate(${a} 60 52)`}>
          <rect
            x="58"
            y="4"
            width="4"
            height="10"
            rx="2"
            fill="#FFB627"
            stroke="#1B2340"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      ))}
      <path
        d="M60 18 C40 18 28 32 28 50 C28 62 34 70 40 76 L40 86 Q40 90 44 90 L76 90 Q80 90 80 86 L80 76 C86 70 92 62 92 50 C92 32 80 18 60 18 Z"
        fill="#FFD166"
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="48" cy="42" rx="8" ry="12" fill="#FFF8EC" opacity="0.6" />
      {wink ? (
        <>
          <circle cx="49" cy="54" r="4.5" fill="#1B2340" />
          <path
            d="M66 54 Q71 52 76 54"
            stroke="#1B2340"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <circle cx="49" cy="54" r="4.5" fill="#1B2340" />
          <circle cx="71" cy="54" r="4.5" fill="#1B2340" />
          <circle cx="50.5" cy="52.5" r="1.2" fill="#fff" />
          <circle cx="72.5" cy="52.5" r="1.2" fill="#fff" />
        </>
      )}
      <path
        d="M50 64 Q60 72 70 64"
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="42" cy="64" r="3" fill="#FF7A59" opacity="0.55" />
      <circle cx="78" cy="64" r="3" fill="#FF7A59" opacity="0.55" />
      <rect x="40" y="90" width="40" height="5" fill="#E8DEC5" stroke="#1B2340" strokeWidth="2.5" />
      <rect x="42" y="95" width="36" height="5" fill="#FFF" stroke="#1B2340" strokeWidth="2.5" />
      <rect x="40" y="100" width="40" height="5" fill="#E8DEC5" stroke="#1B2340" strokeWidth="2.5" />
      <rect x="34" y="107" width="52" height="22" rx="11" fill="#2E5EAA" stroke="#1B2340" strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={44 + i * 8} cy={114} r="1.4" fill="#FFF8EC" />
          <circle cx={44 + i * 8} cy={122} r="1.4" fill="#FFF8EC" />
        </g>
      ))}
      <path
        d="M60 129 Q60 138 68 140"
        stroke="#1B2340"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {waving && (
        <g transform="translate(86 58) rotate(20)">
          <circle cx="0" cy="0" r="9" fill="#FFD166" stroke="#1B2340" strokeWidth="2.5" />
          <rect x="-2" y="-9" width="4" height="6" rx="1.5" fill="#FFD166" stroke="#1B2340" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

interface SparkyMarkProps {
  size?: number;
  className?: string;
}

export function SparkyMark({ size = 36, className }: SparkyMarkProps) {
  const rays = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {rays.map((a) => (
        <g key={a} transform={`rotate(${a} 60 52)`}>
          <rect
            x="58"
            y="6"
            width="4"
            height="8"
            rx="2"
            fill="#FFB627"
            stroke="#1B2340"
            strokeWidth="2.5"
          />
        </g>
      ))}
      <path
        d="M60 22 C42 22 30 34 30 50 C30 62 36 70 42 76 L42 86 Q42 90 46 90 L74 90 Q78 90 78 86 L78 76 C84 70 90 62 90 50 C90 34 78 22 60 22 Z"
        fill="#FFB627"
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="51" cy="52" r="4" fill="#1B2340" />
      <circle cx="69" cy="52" r="4" fill="#1B2340" />
      <path
        d="M50 62 Q60 70 70 62"
        stroke="#1B2340"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="42" y="90" width="36" height="4" fill="#1B2340" />
      <rect
        x="44"
        y="96"
        width="32"
        height="14"
        rx="6"
        fill="#2E5EAA"
        stroke="#1B2340"
        strokeWidth="3"
      />
    </svg>
  );
}
