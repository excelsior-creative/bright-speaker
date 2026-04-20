"use client";

import { Trophy, Flame, Star, Play, ChevronRight, History, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import {
  fetchProgress,
  fetchSessions,
  getXpForNextLevel,
  type UserProgress,
  type SessionRecord,
} from "@/lib/sessions";

const prompts = [
  { id: 1, title: "Tell a Funny Story", difficulty: "Easy", xp: 25, emoji: "😄" },
  { id: 2, title: "Describe Your Favorite Place", difficulty: "Easy", xp: 25, emoji: "🌴" },
  { id: 3, title: "Explain How to Make a Sandwich", difficulty: "Medium", xp: 50, emoji: "🥪" },
  { id: 4, title: "Present Your Dream Invention", difficulty: "Medium", xp: 50, emoji: "💡" },
  { id: 5, title: "Debate: Cats vs Dogs", difficulty: "Hard", xp: 100, emoji: "🐱🐕" },
  { id: 6, title: "Give a Book Report", difficulty: "Hard", xp: 100, emoji: "📚" },
];

function formatDate(isoString: string) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-warm-teal-dark";
  if (score >= 60) return "text-warm-gold-dark";
  return "text-warm-coral";
}

export default function Dashboard() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [recentSessions, setRecentSessions] = useState<SessionRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [randomPromptId] = useState(() => Math.floor(Math.random() * 6) + 1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [p, s] = await Promise.all([fetchProgress(), fetchSessions()]);
        if (cancelled) return;
        setProgress(p);
        setRecentSessions(s.slice(0, 3));
      } catch (err) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filteredPrompts = filter === "All"
    ? prompts
    : prompts.filter(p => p.difficulty === filter);

  const xpToNextLevel = progress ? getXpForNextLevel(progress.level) : 100;
  const progressPercent = progress ? Math.min((progress.xp / xpToNextLevel) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <Logo size="md" />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/history"
            className="flex items-center gap-2 text-foreground/50 hover:text-warm-teal transition text-sm font-semibold"
          >
            <History className="w-4 h-4" />
            History
          </Link>

          {loaded && progress && progress.streak > 0 && (
            <div className="flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 fill-warm-gold text-warm-gold" />
              <span className="font-bold text-sm">{progress.streak} day streak</span>
            </div>
          )}

          <UserButton
            appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 shadow-md" } }}
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8" aria-busy={!loaded}>
        <span role="status" aria-live="polite" className="sr-only">
          {loaded ? "Dashboard loaded" : "Loading your progress"}
        </span>
        {loadError && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-warm-coral-light text-warm-coral-dark text-sm font-semibold"
          >
            Couldn&apos;t load your data: {loadError}
          </div>
        )}
        {/* Welcome + Level */}
        <div className={`grid lg:grid-cols-3 gap-6 mb-8 ${!loaded ? "animate-pulse" : ""}`}>
          <div className="lg:col-span-2 card-warm p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-foreground mb-1">Welcome back! 👋</h1>
                <p className="text-foreground/50">Ready to practice your speaking skills?</p>
              </div>
              <div className="flex items-center gap-2 bg-warm-gold text-white px-4 py-2 rounded-full shadow-md">
                <Trophy className="w-5 h-5" />
                <span className="font-extrabold">Level {loaded && progress ? progress.level : 1}</span>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-foreground/50">
                  Progress to Level {loaded && progress ? progress.level + 1 : 2}
                </span>
                <span className="font-bold text-warm-coral">
                  {loaded && progress ? progress.xp : 0} / {xpToNextLevel} XP
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-warm-coral to-warm-gold rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-warm-coral-light rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-warm-coral">
                  {loaded && progress ? progress.totalSessions : 0}
                </div>
                <div className="text-sm text-foreground/50 font-semibold">Sessions</div>
              </div>
              <div className="bg-warm-gold-light rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-warm-gold-dark">
                  {loaded && progress ? progress.xp : 0}
                </div>
                <div className="text-sm text-foreground/50 font-semibold">Total XP</div>
              </div>
              <div className="bg-warm-teal-light rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-warm-teal-dark">
                  {loaded && progress ? progress.badges.length : 0}
                </div>
                <div className="text-sm text-foreground/50 font-semibold">Badges</div>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-brand-gradient rounded-[1.25rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <Image src="/brand/mascot-logo.png" alt="" width={100} height={100} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎙️</div>
              <h2 className="text-xl font-extrabold mb-2">Quick Practice</h2>
              <p className="text-white/70 text-sm mb-6">
                Jump into a random prompt and practice for 60 seconds.
              </p>
              <Link
                href={`/speak?prompt=${randomPromptId}`}
                className="flex items-center justify-center gap-2 bg-white text-warm-coral w-full py-3 rounded-xl font-extrabold btn-playful shadow-lg"
              >
                <Play className="w-5 h-5 fill-warm-coral" />
                Start Speaking
              </Link>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="card-warm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Speaking Prompts</h2>
              <p className="text-foreground/50 text-sm">Choose a topic to practice</p>
            </div>
            <div className="flex gap-2">
              {["All", "Easy", "Medium", "Hard"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${filter === f
                    ? "bg-warm-coral text-white shadow-md"
                    : "bg-muted text-foreground/50 hover:bg-warm-coral-light hover:text-warm-coral"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrompts.map((prompt) => (
              <Link
                key={prompt.id}
                href={`/speak?prompt=${prompt.id}`}
                className={`group p-5 rounded-xl border-2 transition-all hover:border-warm-coral hover:shadow-md btn-playful ${selectedPrompt === prompt.id ? "border-warm-coral bg-warm-coral-light" : "border-border-warm"
                  }`}
                onClick={() => setSelectedPrompt(prompt.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{prompt.emoji}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${prompt.difficulty === "Easy" ? "bg-warm-teal-light text-warm-teal-dark" :
                    prompt.difficulty === "Medium" ? "bg-warm-gold-light text-warm-gold-dark" :
                      "bg-warm-coral-light text-warm-coral-dark"
                    }`}>
                    {prompt.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-warm-coral transition">
                  {prompt.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/40 font-semibold">+{prompt.xp} XP</span>
                  <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-warm-coral transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        {loaded && recentSessions.length > 0 && (
          <div className="card-warm p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-foreground">Recent Sessions</h2>
                <p className="text-foreground/50 text-sm">Your latest practice runs</p>
              </div>
              <Link
                href="/history"
                className="text-sm text-warm-coral hover:text-warm-coral-dark font-bold flex items-center gap-1"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-warm-gold-light transition">
                  <div className="text-2xl">
                    {prompts.find(p => p.id === session.promptId)?.emoji || "🎙️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground text-sm truncate">{session.promptTitle}</div>
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(session.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {session.eyeContactPercent >= 0 ? `${session.eyeContactPercent}% eye contact` : "eye contact —"}
                      </span>
                      <span>{session.wordsPerMinute} WPM</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-lg font-extrabold ${getScoreColor(session.score)}`}>
                      {session.score}
                    </div>
                    <div className="text-xs text-foreground/40 font-semibold">+{session.xpEarned} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges Section */}
        <div className="card-warm p-8">
          <h2 className="text-xl font-extrabold text-foreground mb-4">Your Badges</h2>
          <div className="flex flex-wrap gap-3">
            {loaded && progress && progress.badges.length > 0 ? (
              progress.badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-warm-gold-light px-4 py-2 rounded-full animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
                  <span className="text-sm font-bold text-warm-gold-dark">{badge}</span>
                </div>
              ))
            ) : (
              <p className="text-foreground/40 text-sm">Complete your first session to earn badges! 🏅</p>
            )}
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-foreground/30">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">More to unlock...</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
