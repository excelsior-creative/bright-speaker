import Link from "next/link";
import Logo from "./Logo";

export default function SiteNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <Link href="/" aria-label="Bright Speaker home">
        <Logo size="md" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-4 text-sm font-semibold text-foreground/60">
        <Link href="/for-educators" className="hidden sm:inline hover:text-warm-coral transition px-2 py-1">
          Teachers
        </Link>
        <Link href="/for-schools" className="hidden sm:inline hover:text-warm-coral transition px-2 py-1">
          Schools
        </Link>
        <Link href="/pilot" className="hidden md:inline hover:text-warm-coral transition px-2 py-1">
          Pilots
        </Link>
        <Link href="/blog" className="hidden md:inline hover:text-warm-coral transition px-2 py-1">
          Resources
        </Link>
        <Link
          href="/dashboard"
          className="bg-warm-coral text-white px-5 py-2 rounded-full font-bold hover:bg-warm-coral-dark transition btn-playful shadow-lg shadow-warm-coral/25"
        >
          Try it
        </Link>
      </div>
    </nav>
  );
}
