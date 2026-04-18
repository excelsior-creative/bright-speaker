import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border-warm py-10 px-6 bg-surface/50 mt-16">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-extrabold text-foreground mb-2">
            <span className="text-warm-orange">Bright</span>
            <span className="text-warm-teal">Speaker</span>
          </div>
          <p className="text-foreground/50 leading-relaxed">
            Speaking practice, built for K-12.
          </p>
        </div>

        <div>
          <div className="font-bold text-foreground mb-3">For schools</div>
          <ul className="space-y-2 text-foreground/60">
            <li><Link href="/for-schools" className="hover:text-warm-coral transition">Schools &amp; districts</Link></li>
            <li><Link href="/for-educators" className="hover:text-warm-coral transition">Teachers &amp; coaches</Link></li>
            <li><Link href="/pilot" className="hover:text-warm-coral transition">Classroom pilots</Link></li>
            <li><Link href="/blog" className="hover:text-warm-coral transition">Classroom resources</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-bold text-foreground mb-3">Product</div>
          <ul className="space-y-2 text-foreground/60">
            <li><Link href="/dashboard" className="hover:text-warm-coral transition">Try a practice session</Link></li>
            <li><Link href="/privacy" className="hover:text-warm-coral transition">Privacy &amp; data</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-bold text-foreground mb-3">Company</div>
          <ul className="space-y-2 text-foreground/60">
            <li><Link href="/contact" className="hover:text-warm-coral transition">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-warm-coral transition">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border-warm flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/40">
        <p>© {new Date().getFullYear()} Bright Speaker. Built for classrooms.</p>
        <p>Student video never leaves the device.</p>
      </div>
    </footer>
  );
}
