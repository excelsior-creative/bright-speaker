"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Sparkles, Clock, Eye, Mic, Trophy, ChevronLeft, Trash2 } from "lucide-react";
import { getSessions, type SessionRecord } from "@/lib/sessions";

function formatDate(isoString: string) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function getScoreGrade(score: number) {
  if (score >= 90) return { grade: "A+", color: "text-emerald-600 bg-emerald-50" };
  if (score >= 80) return { grade: "A", color: "text-emerald-600 bg-emerald-50" };
  if (score >= 70) return { grade: "B", color: "text-amber-600 bg-amber-50" };
  if (score >= 60) return { grade: "C", color: "text-amber-600 bg-amber-50" };
  return { grade: "D", color: "text-red-500 bg-red-50" };
}

const promptEmojis: Record<number, string> = {
  1: "😄", 2: "🌴", 3: "🥪", 4: "💡", 5: "🐱🐕", 6: "📚",
};

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setSessions(getSessions());
    setLoaded(true);
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all session history? This cannot be undone.")) {
      localStorage.removeItem("bright_speaker_sessions");
      setSessions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-amber-600 bg-clip-text text-transparent">
            Bright Speaker
          </span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition text-sm font-medium">
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Session History</h1>
              <p className="text-gray-600 text-sm">{loaded ? `${sessions.length} sessions recorded` : "Loading..."}</p>
            </div>
          </div>
          {loaded && sessions.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          )}
        </div>

        {/* Empty state */}
        {loaded && sessions.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <Mic className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No sessions yet</h2>
            <p className="text-gray-600 mb-6">Complete your first practice session to see your history here.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
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
                <div
                  key={session.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* Main row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : session.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition text-left"
                  >
                    <span className="text-3xl flex-shrink-0">
                      {promptEmojis[session.promptId] || "🎙️"}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{session.promptTitle}</div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(session.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {session.eyeContactPercent}% eye contact
                        </span>
                        <span className="flex items-center gap-1">
                          <Mic className="w-3 h-3" />
                          {session.wordsPerMinute} WPM
                        </span>
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      {/* Filler count */}
                      <div className="text-center hidden sm:block">
                        <div className="text-lg font-bold text-sky-600">{session.fillerCount}</div>
                        <div className="text-xs text-gray-500">fillers</div>
                      </div>

                      {/* XP */}
                      <div className="text-center hidden sm:block">
                        <div className="text-lg font-bold text-amber-600">+{session.xpEarned}</div>
                        <div className="text-xs text-gray-500">XP</div>
                      </div>

                      {/* Score */}
                      <div className={`flex items-center justify-center w-14 h-14 rounded-xl font-bold text-xl ${color}`}>
                        {grade}
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-5 bg-gray-50">
                      <div className="grid sm:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                          <div className="text-xl font-bold text-gray-900">{session.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                          <div className="text-xl font-bold text-sky-600">{session.fillerCount}</div>
                          <div className="text-xs text-gray-500">Filler Words</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                          <div className="text-xl font-bold text-amber-600">{session.eyeContactPercent}%</div>
                          <div className="text-xs text-gray-500">Eye Contact</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                          <div className="text-xl font-bold text-emerald-600">{session.wordsPerMinute}</div>
                          <div className="text-xs text-gray-500">WPM</div>
                        </div>
                      </div>

                      {session.fillerWords.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Filler words:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.fillerWords.map((f, i) => (
                              <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                                &quot;{f.word}&quot; × {f.count}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {session.transcript && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Transcript:</p>
                          <p className="text-sm text-gray-600 bg-white rounded-xl p-3 shadow-sm leading-relaxed">
                            {session.transcript || "No transcript recorded"}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 font-medium">
                        <Trophy className="w-4 h-4" />
                        +{session.xpEarned} XP earned in this session
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
