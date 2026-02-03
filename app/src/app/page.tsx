"use client";

import { Mic, Eye, Award, Play, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-amber-600 bg-clip-text text-transparent">
            Bright Speaker
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="bg-gradient-to-r from-sky-500 to-amber-500 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition shadow-lg shadow-sky-500/25"
          >
            Start Practicing
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            AI-Powered Speech Coach for Kids
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Help Your Child{" "}
            <span className="bg-gradient-to-r from-sky-600 to-amber-500 bg-clip-text text-transparent">
              Speak With Confidence
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Bright Speaker is a fun, gamified platform that helps kids master public speaking. 
            Practice with AI coaching, reduce filler words, and build confidence — one level at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition shadow-xl shadow-sky-500/30"
            >
              <Play className="w-5 h-5" />
              Start Speaking Free
            </Link>
            <button className="text-gray-600 hover:text-gray-900 font-medium px-6 py-4 transition">
              Watch Demo →
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
              <Mic className="w-7 h-7 text-sky-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Filler Word Detection</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI catches every "um," "uh," "like," and "you know" so kids can learn to speak clearly.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Eye Contact Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Webcam analysis helps kids practice looking at their audience while speaking.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gamified Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Levels, XP, and achievements keep kids motivated to practice and improve.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Simple enough for a kindergartner, challenging enough for a high schooler.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Pick a Prompt", desc: "Choose from stories, topics, or questions" },
              { step: 2, title: "Start Speaking", desc: "Talk to your webcam while AI listens" },
              { step: 3, title: "Get Feedback", desc: "See your scores and tips to improve" },
              { step: 4, title: "Level Up!", desc: "Earn XP and unlock new challenges" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-gradient-to-r from-sky-600 to-amber-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Voice?</h2>
          <p className="text-sky-100 max-w-xl mx-auto mb-8">
            Join thousands of kids learning to speak with confidence. Free to start, no credit card required.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block bg-white text-sky-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition shadow-lg"
          >
            Start Your Free Practice
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-gray-600 text-sm">
          <p>© 2026 Bright Speaker. Made with ❤️ for kids everywhere.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
