import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { joinClassAction } from "./actions";

export default async function JoinPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const classCode = typeof params.class === "string" ? params.class : "";
  const error = typeof params.error === "string" ? params.error : "";

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/"><Logo size="md" /></Link>
        <Link href="/dashboard" className="text-sm font-bold text-foreground/50 hover:text-warm-coral">Teacher sign in</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_0.9fr] gap-8 items-center">
        <section className="card-warm p-8 md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-warm-teal-light text-warm-teal-dark px-4 py-2 text-sm font-extrabold mb-5">
            <ShieldCheck className="w-4 h-4" /> Class code practice
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Join your BrightSpeaker class</h1>
          <p className="text-xl text-foreground/60 font-semibold mb-8">
            Enter the code from your teacher, choose a display name, and start a 60-second speaking practice. No student account needed.
          </p>
          {error && <div role="alert" className="bg-warm-coral-light border-2 border-warm-coral text-warm-coral-dark rounded-2xl p-4 mb-5 font-bold">{error}</div>}
          <form action={joinClassAction} className="space-y-4">
            <div>
              <label htmlFor="classCode" className="block text-sm font-extrabold text-foreground mb-2">Class code</label>
              <input id="classCode" name="classCode" defaultValue={classCode} required placeholder="RIVERA7" className="w-full uppercase tracking-widest rounded-2xl border-2 border-border-warm bg-background px-4 py-4 text-xl font-extrabold outline-none focus:border-warm-coral" />
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-extrabold text-foreground mb-2">First name or initials</label>
              <input id="displayName" name="displayName" required maxLength={32} placeholder="Ana" className="w-full rounded-2xl border-2 border-border-warm bg-background px-4 py-4 font-semibold outline-none focus:border-warm-coral" />
            </div>
            <button type="submit" className="w-full rounded-2xl bg-warm-coral text-white py-4 font-extrabold text-lg shadow-xl btn-playful flex items-center justify-center gap-2">
              Start class practice <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </section>

        <aside className="space-y-4">
          {[
            ["🎙️", "Practice one prompt at a time"],
            ["👀", "Camera coaching stays in the browser"],
            ["🔒", "We do not store audio or video"],
          ].map(([emoji, text]) => (
            <div key={text} className="card-warm p-5 flex items-center gap-4">
              <span className="text-3xl">{emoji}</span>
              <span className="font-extrabold text-foreground/70">{text}</span>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
}
