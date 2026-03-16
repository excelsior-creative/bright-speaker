"use client";

import { Play, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-warm-coral text-white px-6 py-2.5 rounded-full font-bold hover:bg-warm-coral-dark transition btn-playful shadow-lg shadow-warm-coral/25"
          >
            Start Practicing
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark px-4 py-2 rounded-full text-sm font-bold mb-6 animate-bounce-in">
            <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
            AI-Powered Speech Coach for Kids
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
            Help Your Child{" "}
            <span className="bg-gradient-to-r from-warm-coral via-warm-gold to-warm-teal bg-clip-text text-transparent">
              Speak With Confidence
            </span>
          </h1>

          <p className="text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto">
            Bright Speaker is a fun, gamified platform that helps kids master public speaking.
            Practice with AI coaching, reduce filler words, and build confidence — one level at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-warm-coral text-white px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-xl shadow-warm-coral/30"
            >
              <Play className="w-5 h-5 fill-white" />
              Start Speaking Free
            </Link>
            <button className="flex items-center gap-2 text-foreground/60 hover:text-warm-teal-dark font-semibold px-6 py-4 transition">
              Watch Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-filler-detection.png"
                alt="Filler word detection illustration"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Filler Word Detection</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              Our AI catches every &ldquo;um,&rdquo; &ldquo;uh,&rdquo; &ldquo;like,&rdquo; and &ldquo;you know&rdquo; so kids can learn to speak clearly.
            </p>
          </div>

          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-eye-contact.png"
                alt="Eye contact tracking illustration"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Eye Contact Tracking</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              Webcam analysis helps kids practice looking at their audience while speaking.
            </p>
          </div>

          <div className="card-warm p-8 hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 mb-6 mx-auto">
              <Image
                src="/brand/feature-gamified-progress.png"
                alt="Gamified progress illustration"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 text-center">Gamified Progress</h3>
            <p className="text-foreground/60 leading-relaxed text-center">
              Levels, XP, and achievements keep kids motivated to practice and improve.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">How It Works</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-12">
            Simple enough for a kindergartner, challenging enough for a high schooler.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Pick a Prompt", desc: "Choose from stories, topics, or questions", emoji: "🎯" },
              { step: 2, title: "Start Speaking", desc: "Talk to your webcam while AI listens", emoji: "🎙️" },
              { step: 3, title: "Get Feedback", desc: "See your scores and tips to improve", emoji: "📊" },
              { step: 4, title: "Level Up!", desc: "Earn XP and unlock new challenges", emoji: "🚀" },
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

        {/* CTA Section */}
        <div className="mt-32 bg-brand-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/brand/mascot-logo.png')] bg-no-repeat bg-right-bottom bg-[length:120px] opacity-20 mr-8 mb-4" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Find Your Voice?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join thousands of kids learning to speak with confidence. Free to start, no credit card required.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-warm-coral px-8 py-4 rounded-2xl font-extrabold text-lg btn-playful shadow-lg"
            >
              Start Your Free Practice 🎤
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-warm py-8 px-6 bg-surface/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-foreground/40 text-sm">
          <p>© 2026 Bright Speaker. Made with ❤️ for kids everywhere.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-warm-coral transition">Privacy</a>
            <a href="#" className="hover:text-warm-coral transition">Terms</a>
            <a href="#" className="hover:text-warm-coral transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
