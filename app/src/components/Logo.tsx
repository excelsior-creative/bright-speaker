"use client";

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 56, text: "text-3xl" },
};

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/mascot-logo.png"
        alt="Bright Speaker mascot"
        width={s.icon}
        height={s.icon}
        className="rounded-xl"
        priority
      />
      {showText && (
        <span className={`${s.text} font-extrabold tracking-tight`}>
          <span className="text-warm-orange">Bright</span>
          <span className="text-warm-teal">Speaker</span>
        </span>
      )}
    </div>
  );
}
