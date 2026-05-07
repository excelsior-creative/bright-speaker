import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChevronLeft, ClipboardList, Users } from "lucide-react";
import Logo from "@/components/Logo";
import { getClassroomRepository } from "@/lib/classroom/repository";

export default async function ClassProgressPage({ params }: { params: Promise<{ classId: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard/classes");
  const { classId } = await params;
  const progress = await getClassroomRepository().getClassProgress(classId, userId);
  if (!progress) redirect("/dashboard/classes");

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/dashboard"><Logo size="md" /></Link>
        <Link href="/dashboard/classes" className="flex items-center gap-2 text-sm font-bold text-foreground/50 hover:text-warm-coral"><ChevronLeft className="w-4 h-4" /> Classes</Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-wide font-extrabold text-warm-coral mb-2">Class progress</p>
            <h1 className="text-4xl font-extrabold text-foreground">{progress.classroom.name}</h1>
            <p className="text-foreground/55 font-semibold mt-2">Class code <span className="tracking-widest font-extrabold text-warm-gold-dark">{progress.classroom.code}</span></p>
          </div>
          <Link href={`/dashboard/classes/${classId}/summary`} className="rounded-2xl bg-warm-coral text-white px-5 py-3 font-extrabold shadow btn-playful flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Pilot summary
          </Link>
        </div>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            ["Students", progress.totals.studentCount],
            ["Sessions", progress.totals.sessionCount],
            ["Avg score", progress.totals.averageScore ?? "—"],
            ["Sessions/student", progress.totals.averageSessionsPerStudent],
          ].map(([label, value]) => (
            <div key={label} className="card-warm p-5 text-center">
              <div className="text-3xl font-extrabold text-warm-coral">{value}</div>
              <div className="text-sm font-bold text-foreground/45 mt-1">{label}</div>
            </div>
          ))}
        </section>

        <section className="card-warm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-7 h-7 text-warm-teal" />
            <h2 className="text-2xl font-extrabold text-foreground">Roster progress</h2>
          </div>
          {progress.students.length === 0 ? (
            <div className="bg-muted rounded-2xl p-6 text-center font-semibold text-foreground/55">No students have joined yet. Share the class code or preview the join link.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase tracking-wide text-foreground/40">
                  <tr>
                    <th className="py-3">Student</th><th>Sessions</th><th>Latest prompt</th><th>Avg</th><th>Best</th><th>Last session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-warm">
                  {progress.students.map((row) => (
                    <tr key={row.student.id} className="font-semibold text-foreground/70">
                      <td className="py-4 font-extrabold text-foreground">{row.student.displayName}</td>
                      <td>{row.totalSessions}</td>
                      <td>{row.lastPromptTitle ?? "—"}</td>
                      <td>{row.averageScore ?? "—"}</td>
                      <td>{row.bestScore ?? "—"}</td>
                      <td>{row.latestSession ? new Date(row.latestSession.createdAt).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
