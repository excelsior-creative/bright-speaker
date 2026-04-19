import { SparkyMark } from "./Sparky";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 52, text: "text-3xl" },
};

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <SparkyMark size={s.icon} />
      {showText && (
        <span className={`${s.text} font-display font-extrabold tracking-tight text-[var(--ink)]`}>
          BrightSpeaker
        </span>
      )}
    </div>
  );
}
