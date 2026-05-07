import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { getClassroomRepository } from "@/lib/classroom/repository";
import { buildPilotSummary } from "@/lib/classroom/summary";

export default async function PilotSummaryPage({ params }: { params: Promise<{ classId: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard/classes");
  const { classId } = await params;
  const progress = await getClassroomRepository().getClassProgress(classId, userId);
  if (!progress) redirect("/dashboard/classes");
  const summary = buildPilotSummary({
    className: progress.classroom.name,
    studentCount: progress.totals.studentCount,
    sessionCount: progress.totals.sessionCount,
    averageScore: progress.totals.averageScore,
    averageSessionsPerStudent: progress.totals.averageSessionsPerStudent,
    dateRange: progress.totals.dateRange,
    topPrompts: progress.totals.topPrompts,
  });

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/dashboard"><Logo size="md" /></Link>
        <Link href={`/dashboard/classes/${classId}`} className="flex items-center gap-2 text-sm font-bold text-foreground/50 hover:text-warm-coral"><ChevronLeft className="w-4 h-4" /> Progress</Link>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <section className="card-warm p-8 md:p-10">
          <p className="text-sm uppercase tracking-wide font-extrabold text-warm-coral mb-2">Principal-ready pilot summary</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">{progress.classroom.name}</h1>
          <p className="text-foreground/55 font-semibold mb-6">Copy this into an email or deck as early pilot evidence. It avoids outcome claims and compliance overstatements.</p>
          <pre className="whitespace-pre-wrap rounded-2xl bg-muted p-6 text-foreground/75 font-semibold leading-relaxed border-2 border-border-warm">{summary}</pre>
          <p className="mt-5 text-sm font-bold text-foreground/45">Tip: select the text above and copy. A client-side copy button can be added after the first teacher smoke test.</p>
        </section>
      </main>
    </div>
  );
}
