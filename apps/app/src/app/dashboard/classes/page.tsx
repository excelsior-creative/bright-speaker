import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Copy, ExternalLink, PlusCircle, Users } from "lucide-react";
import Logo from "@/components/Logo";
import { getClassroomRepository } from "@/lib/classroom/repository";
import { CreateClassForm } from "@/components/classroom/CreateClassForm";

export default async function ClassesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard/classes");
  const params = await searchParams;
  const classes = await getClassroomRepository().listClassesForTeacher(userId);

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/dashboard"><Logo size="md" /></Link>
        <Link href="/dashboard" className="text-sm font-bold text-foreground/50 hover:text-warm-coral">Practice dashboard</Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
        <section className="card-warm p-8 h-fit">
          <span className="inline-flex items-center gap-2 rounded-full bg-warm-teal-light text-warm-teal-dark px-4 py-2 text-sm font-extrabold mb-5">
            <PlusCircle className="w-4 h-4" /> Teacher MVP
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Create a BrightSpeaker class</h1>
          <p className="text-foreground/60 font-semibold mb-6">
            Generate a short class code students can use at <code className="bg-muted px-1.5 py-0.5 rounded">/join</code>. No student accounts, no stored audio/video.
          </p>
          {params.created && <div className="bg-warm-teal-light text-warm-teal-dark border-2 border-warm-teal rounded-2xl p-4 mb-5 font-bold">Class created. Share the code when you are ready.</div>}
          {params.error && <div className="bg-warm-coral-light text-warm-coral-dark border-2 border-warm-coral rounded-2xl p-4 mb-5 font-bold">{String(params.error)}</div>}
          <CreateClassForm />
        </section>

        <section className="card-warm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">Your classes</h2>
              <p className="text-foreground/50 font-semibold">Share codes and open progress dashboards.</p>
            </div>
            <Users className="w-9 h-9 text-warm-coral" />
          </div>

          {classes.length === 0 ? (
            <div className="bg-muted rounded-2xl p-6 text-center text-foreground/55 font-semibold">
              No classes yet. Create one to unlock the student join flow and pilot summary.
            </div>
          ) : (
            <div className="space-y-4">
              {classes.map((klass) => (
                <article key={klass.id} className="rounded-2xl border-2 border-border-warm bg-background/70 p-5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground">{klass.name}</h3>
                      <p className="text-sm text-foreground/45 font-semibold">Created {new Date(klass.createdAt).toLocaleDateString()}</p>
                      <div className="mt-3 inline-flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark rounded-xl px-4 py-2 font-extrabold tracking-widest text-lg">
                        <Copy className="w-4 h-4" /> {klass.code}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-48">
                      <Link href={`/join?class=${klass.code}`} className="text-center rounded-xl bg-warm-coral text-white px-4 py-3 font-extrabold shadow btn-playful">Preview student join</Link>
                      <Link href={`/dashboard/classes/${klass.id}`} className="text-center rounded-xl bg-warm-teal-light text-warm-teal-dark px-4 py-3 font-extrabold flex items-center justify-center gap-2">
                        Progress <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
