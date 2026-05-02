"use client";

import {
  Trophy,
  Flame,
  Star,
  Play,
  ChevronRight,
  User,
  History,
  Clock,
  Eye,
  Map,
  Target,
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/components/Logo";
import { getProgress, getSessions, type UserProgress, type SessionRecord } from "@/lib/sessions";
import { LEVELS, getLevelProgress, getNextMilestone, getRecommendedQuest } from "@/lib/progression";

const prompts = [
  { id: 1, title: "Tell a Funny Story", difficulty: "Easy", xp: 25, emoji: "😄", world: "Campfire Cove" },
  { id: 2, title: "Describe Your Favorite Place", difficulty: "Easy", xp: 25, emoji: "🌴", world: "Storybook Trail" },
  { id: 3, title: "Explain How to Make a Sandwich", difficulty: "Medium", xp: 50, emoji: "🥪", world: "Echo Mountain" },
  { id: 4, title: "Present Your Dream Invention", difficulty: "Medium", xp: 50, emoji: "💡", world: "Focus Forest" },
  { id: 5, title: "Debate: Cats vs Dogs", difficulty: "Hard", xp: 100, emoji: "🐱🐕", world: "Debate Arena" },
  { id: 6, title: "Give a Book Report", difficulty: "Hard", xp: 100, emoji: "📚", world: "Showcase City" },
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
  const [progress] = useState<UserProgress>(() => getProgress());
  const [recentSessions] = useState<SessionRecord[]>(() => getSessions().slice(0, 3));

  const filteredPrompts = filter === "All" ? prompts : prompts.filter((p) => p.difficulty === filter);
  const levelProgress = getLevelProgress(progress.xp);
  const milestone = getNextMilestone(progress);
  const recommendedQuest = getRecommendedQuest(progress);
  const recommendedPrompt = prompts.find((prompt) => prompt.id === recommendedQuest.promptId) ?? prompts[0];

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <Logo size="md" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/history" className="flex items-center gap-2 text-foreground/50 hover:text-warm-teal transition text-sm font-semibold">
            <History className="w-4 h-4" />
            History
          </Link>

          {progress.streak > 0 && (
            <div className="flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 fill-warm-gold text-warm-gold" />
              <span className="font-bold text-sm">{progress.streak} day streak</span>
            </div>
          )}

          <div className="w-9 h-9 bg-warm-coral rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 mb-8">
          <section className="card-warm p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warm-gold-light" aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide text-warm-coral mb-2">Current world</p>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                    {levelProgress.currentLevel.emoji} {levelProgress.currentLevel.world}
                  </h1>
                  <p className="text-foreground/60 font-semibold max-w-2xl">
                    Level {levelProgress.currentLevel.level}: {levelProgress.currentLevel.name} — {levelProgress.currentLevel.focus}.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-warm-gold text-white px-4 py-2 rounded-full shadow-md flex-shrink-0">
                  <Trophy className="w-5 h-5" />
                  <span className="font-extrabold">Level {progress.level}</span>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-muted/70 p-5 mb-6">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-foreground/50 font-bold">
                    {levelProgress.nextLevel
                      ? `Progress to ${levelProgress.nextLevel.emoji} ${levelProgress.nextLevel.world}`
                      : "Legend League progress"}
                  </span>
                  <span className="font-extrabold text-warm-coral">
                    {levelProgress.nextLevel
                      ? `${levelProgress.xpIntoLevel} / ${levelProgress.xpForThisLevel} XP`
                      : `${progress.xp} XP`}
                  </span>
                </div>
                <div className="h-5 bg-white rounded-full overflow-hidden border border-border-warm">
                  <div
                    className={`h-full bg-gradient-to-r ${levelProgress.currentLevel.colorClass} rounded-full transition-all duration-700`}
                    style={{ width: `${levelProgress.percentToNextLevel}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-foreground/50 font-semibold">
                  {levelProgress.nextLevel
                    ? `${levelProgress.xpToNextLevel} XP until ${levelProgress.nextLevel.name}. Reward: ${levelProgress.nextLevel.reward}.`
                    : levelProgress.currentLevel.reward}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-warm-coral-light rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-warm-coral">{progress.totalSessions}</div>
                  <div className="text-sm text-foreground/50 font-semibold">Quests done</div>
                </div>
                <div className="bg-warm-gold-light rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-warm-gold-dark">{progress.xp}</div>
                  <div className="text-sm text-foreground/50 font-semibold">Total XP</div>
                </div>
                <div className="bg-warm-teal-light rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-warm-teal-dark">{progress.badges.length}</div>
                  <div className="text-sm text-foreground/50 font-semibold">Badges</div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-brand-gradient rounded-[1.25rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <Image src="/brand/mascot-logo.png" alt="" width={110} height={110} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">{recommendedQuest.emoji}</div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-white/60 mb-2">Recommended quest</p>
              <h2 className="text-2xl font-extrabold mb-2">{recommendedQuest.title}</h2>
              <p className="text-white/75 text-sm mb-5">{recommendedQuest.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm font-bold">
                <div className="rounded-xl bg-white/15 p-3">+{recommendedQuest.xp} XP</div>
                <div className="rounded-xl bg-white/15 p-3">{recommendedQuest.world}</div>
              </div>
              <Link href={`/speak?prompt=${recommendedPrompt.id}`} className="flex items-center justify-center gap-2 bg-white text-warm-coral w-full py-3 rounded-xl font-extrabold btn-playful shadow-lg">
                <Play className="w-5 h-5 fill-warm-coral" />
                Start quest
              </Link>
            </div>
          </aside>
        </div>

        <div className="card-warm p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                <Map className="w-5 h-5 text-warm-coral" />
                Speaking Adventure Map
              </h2>
              <p className="text-foreground/50 text-sm">Move world by world as your XP, streaks, and badges grow.</p>
            </div>
            <div className="flex gap-2">
              {["All", "Easy", "Medium", "Hard"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${filter === f
                    ? "bg-warm-coral text-white shadow-md"
                    : "bg-muted text-foreground/50 hover:bg-warm-coral-light hover:text-warm-coral"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredPrompts.map((prompt) => {
              const isRecommended = prompt.id === recommendedPrompt.id;
              return (
                <Link
                  key={prompt.id}
                  href={`/speak?prompt=${prompt.id}`}
                  className={`group p-5 rounded-xl border-2 transition-all hover:border-warm-coral hover:shadow-md btn-playful ${selectedPrompt === prompt.id || isRecommended ? "border-warm-coral bg-warm-coral-light" : "border-border-warm"}`}
                  onClick={() => setSelectedPrompt(prompt.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{prompt.emoji}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${prompt.difficulty === "Easy" ? "bg-warm-teal-light text-warm-teal-dark" : prompt.difficulty === "Medium" ? "bg-warm-gold-light text-warm-gold-dark" : "bg-warm-coral-light text-warm-coral-dark"}`}>
                      {isRecommended ? "Next quest" : prompt.difficulty}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-foreground/35 font-extrabold mb-1">{prompt.world}</p>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-warm-coral transition">{prompt.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/40 font-semibold">+{prompt.xp} XP</span>
                    <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-warm-coral transition" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid md:grid-cols-7 gap-3">
            {LEVELS.map((level) => {
              const unlocked = progress.level >= level.level;
              const current = progress.level === level.level;
              return (
                <div key={level.level} className={`rounded-2xl border-2 p-4 text-center ${current ? "border-warm-coral bg-warm-coral-light" : unlocked ? "border-warm-teal bg-warm-teal-light" : "border-border-warm bg-muted/60"}`}>
                  <div className={`mx-auto mb-2 h-12 w-12 rounded-full flex items-center justify-center text-2xl ${unlocked ? `bg-gradient-to-br ${level.colorClass} text-white` : "bg-white text-foreground/30"}`}>
                    {unlocked ? level.emoji : <Lock className="w-5 h-5" />}
                  </div>
                  <p className="text-xs font-extrabold text-foreground/40">Level {level.level}</p>
                  <p className="text-sm font-extrabold text-foreground leading-tight">{level.world}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mb-8">
          <section className="card-warm p-6 bg-warm-gold-light">
            <h2 className="text-xl font-extrabold text-foreground mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-warm-gold-dark" />
              Next milestone
            </h2>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{milestone.emoji}</div>
              <div>
                <p className="font-extrabold text-warm-gold-dark">{milestone.label}</p>
                <p className="text-sm text-warm-gold-dark/75 font-semibold mt-1">{milestone.description}</p>
                <p className="text-xs uppercase tracking-wide text-warm-gold-dark/60 font-extrabold mt-3">
                  {milestone.remaining} more to unlock
                </p>
              </div>
            </div>
          </section>

          {recentSessions.length > 0 && (
            <section className="card-warm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">Recent quest runs</h2>
                  <p className="text-foreground/50 text-sm">Your latest practice attempts</p>
                </div>
                <Link href="/history" className="text-sm text-warm-coral hover:text-warm-coral-dark font-bold flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentSessions.map((session) => {
                  const sessionPrompt = prompts.find((p) => p.id === session.promptId);
                  return (
                    <div key={session.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-warm-gold-light transition">
                      <div className="text-2xl">{sessionPrompt?.emoji || "🎙️"}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground text-sm truncate">{session.promptTitle}</div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/40 mt-0.5">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(session.date)}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{session.eyeContactPercent >= 0 ? `${session.eyeContactPercent}% eye contact` : "eye contact —"}</span>
                          <span>{session.wordsPerMinute} WPM</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-lg font-extrabold ${getScoreColor(session.score)}`}>{session.score}</div>
                        <div className="text-xs text-foreground/40 font-semibold">+{session.xpEarned} XP</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <section className="card-warm p-8">
          <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-warm-gold" />
            Badge case
          </h2>
          <div className="flex flex-wrap gap-3">
            {progress.badges.length > 0 ? (
              progress.badges.map((badge, i) => (
                <div key={badge} className="flex items-center gap-2 bg-warm-gold-light px-4 py-2 rounded-full animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
                  <span className="font-bold text-warm-gold-dark">{badge}</span>
                </div>
              ))
            ) : (
              <p className="text-foreground/50 font-semibold">Complete your first quest to unlock a badge.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
