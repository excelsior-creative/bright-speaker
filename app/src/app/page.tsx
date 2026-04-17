"use client";

import { Play, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <SiteNav />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark px-4 py-2 rounded-full text-sm font-bold mb-6 animate-bounce-in">
            <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
            Built for K-12 classrooms
          </div>

          {/* Mascot */}
          <div className="mb-8 hover-wiggle inline-block">
            <Image
              src="/brand/mascot-logo.png"
              alt="Bright Speaker mascot — a friendly speech bubble character"
              width={160}
              height={160}
              className="rounded-3xl drop-shadow-xl"
              priority
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Speaking practice{" "}
            <span className="bg-gradient-to-r from-warm-coral via-warm-gold to-warm-teal bg-clip-text text-transparent">
              every student deserves
            </span>
          </h1>

          <p className="text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto">
            Bright Speaker gives K-12 students the reps they need to become
            confident speakers — without adding another video pile for teachers
            to grade. Practice runs in a Chromebook browser. Student video
            never leaves the device.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
            >
              <Play className="w-5 h-5 fill-white" />
              Try a practice session
            </Link>
            <Link
              href="/for-educators"
              className="flex items-center gap-2 text-foreground/70 hover:text-warm-teal-dark font-semibold px-6 py-4 transition"
            >
              For teachers and coaches →
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-filler-detection.png"
                alt=""
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Filler word detection</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              The app catches &ldquo;um,&rdquo; &ldquo;uh,&rdquo; &ldquo;like,&rdquo; and &ldquo;you know&rdquo; as students speak, so they build the habit of pausing instead.
            </p>
          </div>

          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-eye-contact.png"
                alt=""
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Eye contact practice</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              On-device camera analysis helps students learn to look at their audience. No video ever leaves the Chromebook.
            </p>
          </div>

          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-gamified-progress.png"
                alt=""
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Progress that sticks</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              Levels, XP, and badges keep students coming back — the reps are what actually move a speaker.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-32 text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">How it works</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-12">
            Simple enough for a fourth-grader, challenging enough for a
            varsity debater.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Pick a prompt", desc: "Stories, explanations, opinions, book talks", emoji: "🎯" },
              { step: 2, title: "Start speaking", desc: "60 seconds, camera on, no install", emoji: "🎙️" },
              { step: 3, title: "Get feedback", desc: "Filler words, pacing, eye contact", emoji: "📊" },
              { step: 4, title: "Try again", desc: "Reps compound — confidence follows", emoji: "🚀" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="w-12 h-12 bg-warm-coral text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-4 shadow-md shadow-warm-coral/20">
                  {item.step}
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience split */}
        <div className="mt-32 grid md:grid-cols-2 gap-6">
          <Link
            href="/for-educators"
            className="card-warm p-8 block hover:scale-[1.01] transition group"
          >
            <div className="text-3xl mb-3">🍎</div>
            <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
              For teachers and coaches
            </h3>
            <p className="text-foreground/60 leading-relaxed">
              How Bright Speaker fits into an ELA unit, a speech &amp; debate
              practice, or a Socratic seminar. Free while we pilot.
            </p>
            <span className="inline-block mt-4 text-warm-coral font-bold">See it in your classroom →</span>
          </Link>
          <Link
            href="/for-schools"
            className="card-warm p-8 block hover:scale-[1.01] transition group"
          >
            <div className="text-3xl mb-3">🏫</div>
            <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-warm-coral transition">
              For schools and districts
            </h3>
            <p className="text-foreground/60 leading-relaxed">
              How we think about student data, Chromebook rollouts, and the
              formal pilot process.
            </p>
            <span className="inline-block mt-4 text-warm-coral font-bold">Start a school pilot →</span>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-brand-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/brand/mascot-logo.png')] bg-no-repeat bg-right-bottom bg-[length:120px] opacity-20 mr-8 mb-4" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-4">See it in action</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Run a 60-second practice session in your browser. No sign-up
              needed to try it.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-warm-coral px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-lg"
            >
              Try a practice session
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
