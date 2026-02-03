"use client";

import { Mic, Trophy, Flame, Star, Play, ChevronRight, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data - will be replaced with Supabase
const mockUserData = {
  name: "Speaker",
  level: 3,
  xp: 275,
  xpToNextLevel: 400,
  streak: 5,
  totalSessions: 12,
  fillerWordsReduced: 34,
  badges: ["First Speech", "Streak 3", "Eye Contact Pro"],
};

const prompts = [
  { id: 1, title: "Tell a Funny Story", difficulty: "Easy", xp: 25, emoji: "😄" },
  { id: 2, title: "Describe Your Favorite Place", difficulty: "Easy", xp: 25, emoji: "🌴" },
  { id: 3, title: "Explain How to Make a Sandwich", difficulty: "Medium", xp: 50, emoji: "🥪" },
  { id: 4, title: "Present Your Dream Invention", difficulty: "Medium", xp: 50, emoji: "💡" },
  { id: 5, title: "Debate: Cats vs Dogs", difficulty: "Hard", xp: 100, emoji: "🐱🐕" },
  { id: 6, title: "Give a Book Report", difficulty: "Hard", xp: 100, emoji: "📚" },
];

export default function Dashboard() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const progressPercent = (mockUserData.xp / mockUserData.xpToNextLevel) * 100;

  const filteredPrompts = filter === "All" 
    ? prompts 
    : prompts.filter(p => p.difficulty === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-amber-600 bg-clip-text text-transparent">
            Bright Speaker
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Streak */}
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4" />
            <span className="font-semibold text-sm">{mockUserData.streak} day streak</span>
          </div>
          
          {/* User avatar placeholder - will be replaced with Supabase auth */}
          <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-amber-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome + Level */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Level Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back! 👋</h1>
                <p className="text-gray-600">Ready to practice your speaking skills?</p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">Level {mockUserData.level}</span>
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress to Level {mockUserData.level + 1}</span>
                <span className="font-semibold text-sky-600">{mockUserData.xp} / {mockUserData.xpToNextLevel} XP</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-sky-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-sky-600">{mockUserData.totalSessions}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{mockUserData.fillerWordsReduced}</div>
                <div className="text-sm text-gray-600">Fillers Reduced</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{mockUserData.badges.length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-br from-sky-600 to-amber-500 rounded-2xl p-8 text-white shadow-lg">
            <Sparkles className="w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold mb-2">Quick Practice</h2>
            <p className="text-sky-100 text-sm mb-6">
              Jump into a random prompt and practice for 60 seconds.
            </p>
            <Link 
              href={`/speak?prompt=${Math.floor(Math.random() * 6) + 1}`}
              className="flex items-center justify-center gap-2 bg-white text-sky-600 w-full py-3 rounded-xl font-semibold hover:bg-sky-50 transition"
            >
              <Play className="w-5 h-5" />
              Start Speaking
            </Link>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Speaking Prompts</h2>
              <p className="text-gray-600 text-sm">Choose a topic to practice</p>
            </div>
            <div className="flex gap-2">
              {["All", "Easy", "Medium", "Hard"].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    filter === f 
                      ? "bg-sky-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-600"
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
                className={`group p-5 rounded-xl border-2 transition-all hover:border-sky-300 hover:shadow-md ${
                  selectedPrompt === prompt.id ? "border-sky-500 bg-sky-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{prompt.emoji}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    prompt.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" :
                    prompt.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {prompt.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition">
                  {prompt.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">+{prompt.xp} XP</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-sky-500 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Badges</h2>
          <div className="flex flex-wrap gap-3">
            {mockUserData.badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-gradient-to-r from-sky-100 to-amber-100 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">{badge}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">More to unlock...</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
