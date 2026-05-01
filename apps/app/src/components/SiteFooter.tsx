import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="pt-[60px] pb-10 mt-20 border-t-2 border-dashed border-[var(--line)] text-sm text-[var(--ink-2)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-5 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="mb-3.5"><Logo size="md" /></div>
            <p className="m-0 text-sm max-w-[280px] text-[var(--ink-2)]">
              The AI speech coach built just for K–5. Purpose-built. Privacy-first. Play-powered.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[14px] mb-3.5 text-[var(--ink)]">Product</h4>
            <ul className="list-none p-0 m-0 grid gap-2">
              <li><Link href="/#features" className="hover:text-[var(--ink)] transition">Features</Link></li>
              <li><Link href="/#how" className="hover:text-[var(--ink)] transition">How it works</Link></li>
              <li><Link href="/#pricing" className="hover:text-[var(--ink)] transition">Pricing</Link></li>
              <li><Link href="/#standards" className="hover:text-[var(--ink)] transition">Standards map</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[14px] mb-3.5 text-[var(--ink)]">For schools</h4>
            <ul className="list-none p-0 m-0 grid gap-2">
              <li><Link href="/pilot" className="hover:text-[var(--ink)] transition">Free 30-day pilot</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--ink)] transition">Book a demo</Link></li>
              <li><Link href="/for-educators" className="hover:text-[var(--ink)] transition">For teachers</Link></li>
              <li><Link href="/for-schools" className="hover:text-[var(--ink)] transition">District quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[14px] mb-3.5 text-[var(--ink)]">Trust</h4>
            <ul className="list-none p-0 m-0 grid gap-2">
              <li><Link href="/privacy" className="hover:text-[var(--ink)] transition">Privacy</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--ink)] transition">Data &amp; student records</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--ink)] transition">DPA (on request)</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--ink)] transition">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[14px] mb-3.5 text-[var(--ink)]">Company</h4>
            <ul className="list-none p-0 m-0 grid gap-2">
              <li><Link href="/resources" className="hover:text-[var(--ink)] transition">Free resources</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--ink)] transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--ink)] transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6 border-t border-[var(--line)]">
          <span>© {new Date().getFullYear()} BrightSpeaker, PBC. Made for kids in the U.S.</span>
          <span>hello@brightspeaker.com</span>
        </div>
      </div>
    </footer>
  );
}
