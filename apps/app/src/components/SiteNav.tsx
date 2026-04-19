import Link from "next/link";
import Logo from "./Logo";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";

export default function SiteNav() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10">
      <nav className="flex items-center justify-between py-5">
        <Link href="/" aria-label="BrightSpeaker home">
          <Logo size="md" />
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-[var(--ink-2)] whitespace-nowrap">
          <Link href="/#how" className="hover:text-[var(--ink)] transition">How it works</Link>
          <Link href="/#features" className="hover:text-[var(--ink)] transition">Features</Link>
          <Link href="/#standards" className="hover:text-[var(--ink)] transition">Standards</Link>
          <Link href="/#privacy" className="hover:text-[var(--ink)] transition">Privacy</Link>
          <Link href="/#pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
        </div>

        <div className="flex items-center gap-2.5">
          <Show when="signed-out">
            <SignInButton>
              <button className="btn btn-ghost btn-sm hidden sm:inline-flex">Sign in</button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Link href="/contact" className="btn btn-primary btn-sm">Book a demo</Link>
        </div>
      </nav>
    </div>
  );
}
