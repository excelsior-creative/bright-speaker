"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Clock, Eye, Mic, Trophy, ChevronLeft, Trash2, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import { clearSessions, deleteSessionById, fetchSessions, type SessionRecord } from "@/lib/sessions";

function formatDate(isoString: string) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function getScoreGrade(score: number) {
  if (score >= 90) return { grade: "A+", color: "text-warm-teal bg-warm-teal-light" };
  if (score >= 80) return { grade: "A", color: "text-warm-teal bg-warm-teal-light" };
  if (score >= 70) return { grade: "B", color: "text-warm-gold-dark bg-warm-gold-light" };
  if (score >= 60) return { grade: "C", color: "text-warm-gold-dark bg-warm-gold-light" };
  return { grade: "D", color: "text-warm-coral bg-warm-coral-light" };
}

const promptEmojis: Record<number, string> = {
  1: "😄", 2: "🌴", 3: "🥪", 4: "💡", 5: "🐱🐕", 6: "📚",
};

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await fetchSessions();
        if (!cancelled) setSessions(s);
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load sessions");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const clearHistory = async () => {
    if (!confirm("Clear all session history? This cannot be undone.")) return;
    setClearing(true);
    try {
      await clearSessions();
      setSessions([]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to clear history");
    } finally {
      setClearing(false);
    }
  };

  const deleteOne = async (id: string) => {
    if (!confirm("Delete this session? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteSessionById(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      setExpandedId(prev => (prev === id ? null : prev));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete session");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-foreground/50 hover:text-warm-coral transition text-sm font-semibold">
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
      </nav>

      <main id="main" className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-foreground/60 hover:text-warm-coral text-sm font-semibold transition">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Session History</h1>
              <p className="text-foreground/50 text-sm">{loaded ? `${sessions.length} sessions recorded` : "Loading..."}</p>
            </div>
          </div>
          {loaded && sessions.length > 0 && (
            <button
              onClick={clearHistory}
              disabled={clearing}
              className="flex items-center gap-2 text-warm-coral hover:text-warm-coral-dark text-sm font-bold transition disabled:opacity-50"
            >
              {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Clear History
            </button>
          )}
        </div>

        {!loaded && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 text-foreground/50 text-sm mb-4"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading sessions…
          </div>
        )}
        {loadError && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-warm-coral-light text-warm-coral-dark text-sm font-semibold"
          >
            Couldn&apos;t load sessions: {loadError}
          </div>
        )}

        {/* Empty state */}
        {loaded && sessions.length === 0 && (
          <div className="card-warm p-12 text-center">
            <Mic className="w-16 h-16 text-foreground/10 mx-auto mb-4" />
            <h2 className="text-xl font-extrabold text-foreground mb-2">No sessions yet</h2>
            <p className="text-foreground/50 mb-6">Complete your first practice session to see your history here.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-warm-coral text-white px-6 py-3 rounded-xl font-bold btn-playful shadow-lg"
            >
              Start Practicing
            </Link>
          </div>
        )}

        {/* Sessions list */}
        {loaded && sessions.length > 0 && (
          <div className="space-y-4">
            {sessions.map((session) => {
              const { grade, color } = getScoreGrade(session.score);
              const isExpanded = expandedId === session.id;

              return (
                <div key={session.id} className="card-warm overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : session.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-muted transition text-left"
                  >
                    <span className="text-3xl flex-shrink-0">
                      {promptEmojis[session.promptId] || "🎙️"}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground truncate">{session.promptTitle}</div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(session.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {session.eyeContactPercent >= 0 ? `${session.eyeContactPercent}% eye contact` : "eye contact —"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mic className="w-3 h-3" />
                          {session.wordsPerMinute} WPM
                        </span>
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center hidden sm:block">
                        <div className="text-lg font-extrabold text-warm-coral">{session.fillerCount}</div>
                        <div className="text-xs text-foreground/60 font-semibold">fillers</div>
                      </div>
                      <div className="text-center hidden sm:block">
                        <div className="text-lg font-extrabold text-warm-gold-dark">+{session.xpEarned}</div>
                        <div className="text-xs text-foreground/60 font-semibold">XP</div>
                      </div>
                      <div className={`flex items-center justify-center w-14 h-14 rounded-xl font-extrabold text-xl ${color}`}>
                        {grade}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border-warm p-5 bg-muted">
                      <div className="grid sm:grid-cols-4 gap-4 mb-4">
                        <div className="card-warm p-3 text-center">
                          <div className="text-xl font-extrabold text-foreground">{session.score}</div>
                          <div className="text-xs text-foreground/60 font-semibold">Score</div>
                        </div>
                        <div className="card-warm p-3 text-center">
                          <div className="text-xl font-extrabold text-warm-coral">{session.fillerCount}</div>
                          <div className="text-xs text-foreground/60 font-semibold">Filler Words</div>
                        </div>
                        <div className="card-warm p-3 text-center">
                          <div className="text-xl font-extrabold text-warm-gold-dark">
                            {session.eyeContactPercent >= 0 ? `${session.eyeContactPercent}%` : "—"}
                          </div>
                          <div className="text-xs text-foreground/60 font-semibold">Eye Contact</div>
                        </div>
                        <div className="card-warm p-3 text-center">
                          <div className="text-xl font-extrabold text-warm-teal">{session.wordsPerMinute}</div>
                          <div className="text-xs text-foreground/60 font-semibold">WPM</div>
                        </div>
                      </div>

                      {session.fillerWords.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-bold text-foreground mb-2">Filler words:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.fillerWords.map((f, i) => (
                              <span key={i} className="bg-warm-coral-light text-warm-coral-dark px-3 py-1 rounded-full text-xs font-semibold">
                                &quot;{f.word}&quot; × {f.count}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {session.transcript && (
                        <div>
                          <p className="text-sm font-bold text-foreground mb-2">Transcript:</p>
                          <p className="text-sm text-foreground/60 card-warm p-3 leading-relaxed">
                            {session.transcript || "No transcript recorded"}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm text-warm-gold-dark font-bold">
                          <Trophy className="w-4 h-4" />
                          +{session.xpEarned} XP earned in this session
                        </div>
                        <button
                          onClick={() => deleteOne(session.id)}
                          disabled={deletingId === session.id}
                          className="flex items-center gap-1.5 text-xs font-bold text-warm-coral hover:text-warm-coral-dark transition disabled:opacity-50"
                          aria-label={`Delete session from ${formatDate(session.date)}`}
                        >
                          {deletingId === session.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Delete session
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
