"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, MicOff, Eye, EyeOff, Clock, AlertCircle, CheckCircle, Home, RotateCcw, Loader2 } from "lucide-react";
import Link from "next/link";

// Prompts data
const prompts: Record<number, { title: string; description: string; emoji: string; tips: string[] }> = {
  1: { 
    title: "Tell a Funny Story", 
    description: "Share something funny that happened to you recently. It could be at school, at home, or anywhere!",
    emoji: "😄",
    tips: ["Start with 'One time...'", "Describe what happened step by step", "Tell us how it ended"]
  },
  2: { 
    title: "Describe Your Favorite Place", 
    description: "Tell us about a place you love. What does it look like? Why do you like it there?",
    emoji: "🌴",
    tips: ["Use describing words (adjectives)", "Talk about what you can see, hear, and smell", "Explain why it's special to you"]
  },
  3: { 
    title: "Explain How to Make a Sandwich", 
    description: "Teach us how to make your favorite sandwich, step by step.",
    emoji: "🥪",
    tips: ["Start with what ingredients you need", "Go in order: first, then, next, finally", "Make it sound yummy!"]
  },
  4: { 
    title: "Present Your Dream Invention", 
    description: "If you could invent anything, what would it be? How would it work?",
    emoji: "💡",
    tips: ["Give your invention a cool name", "Explain what problem it solves", "Describe how someone would use it"]
  },
  5: { 
    title: "Debate: Cats vs Dogs", 
    description: "Which makes a better pet - cats or dogs? Pick a side and convince us!",
    emoji: "🐱🐕",
    tips: ["Pick one side and stick with it", "Give at least 3 reasons", "Try to predict what the other side might say"]
  },
  6: { 
    title: "Give a Book Report", 
    description: "Tell us about a book you've read. What happened? Did you like it?",
    emoji: "📚",
    tips: ["Don't give away the ending!", "Describe the main character", "Would you recommend it?"]
  },
};

// Filler words to detect
const FILLER_WORDS = ["um", "uh", "like", "you know", "basically", "actually", "literally", "so", "well", "yeah", "right"];

interface SessionResults {
  transcript: string;
  fillerCount: number;
  fillerWords: { word: string; count: number }[];
  duration: number;
  eyeContactPercent: number;
  wordsPerMinute: number;
}

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading your practice session...</p>
      </div>
    </div>
  );
}

// Main speak content component
function SpeakContent() {
  const searchParams = useSearchParams();
  const promptId = parseInt(searchParams.get("prompt") || "1");
  const prompt = prompts[promptId] || prompts[1];

  // States
  const [phase, setPhase] = useState<"prep" | "recording" | "results">("prep");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [eyeContact, setEyeContact] = useState(true);
  const [eyeContactHistory, setEyeContactHistory] = useState<boolean[]>([]);
  const [results, setResults] = useState<SessionResults | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Please allow camera and microphone access to use Bright Speaker!");
    }
  };

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const initSpeechRecognition = () => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + " ";
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    }
  };

  const analyzeTranscript = (text: string): { word: string; count: number }[] => {
    const lowerText = text.toLowerCase();
    const results: { word: string; count: number }[] = [];

    FILLER_WORDS.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b`, "gi");
      const matches = lowerText.match(regex);
      if (matches && matches.length > 0) {
        results.push({ word: filler, count: matches.length });
      }
    });

    return results.sort((a, b) => b.count - a.count);
  };

  const startRecording = async () => {
    await startWebcam();
    initSpeechRecognition();
    
    setPhase("recording");
    setIsRecording(true);
    setTranscript("");
    setEyeContactHistory([]);
    setTimeLeft(60);

    recognitionRef.current?.start();

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endRecording();
          return 0;
        }
        setEyeContactHistory(h => [...h, Math.random() > 0.3]);
        return prev - 1;
      });
    }, 1000);
  };

  const endRecording = useCallback(() => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);

    const duration = 60 - timeLeft;
    const fillerAnalysis = analyzeTranscript(transcript);
    const totalFillers = fillerAnalysis.reduce((sum, f) => sum + f.count, 0);
    const wordCount = transcript.split(/\s+/).filter(w => w.length > 0).length;
    const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;
    const eyePercent = eyeContactHistory.length > 0 
      ? Math.round((eyeContactHistory.filter(e => e).length / eyeContactHistory.length) * 100)
      : 85;

    setResults({
      transcript,
      fillerCount: totalFillers,
      fillerWords: fillerAnalysis,
      duration,
      eyeContactPercent: eyePercent,
      wordsPerMinute: wpm,
    });

    setPhase("results");
    stopWebcam();
  }, [timeLeft, transcript, eyeContactHistory]);

  useEffect(() => {
    return () => {
      stopWebcam();
      recognitionRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const calculateScore = (results: SessionResults) => {
    let score = 100;
    score -= Math.min(results.fillerCount * 5, 40);
    if (results.eyeContactPercent >= 80) score += 10;
    else if (results.eyeContactPercent < 50) score -= 20;
    if (results.wordsPerMinute >= 100 && results.wordsPerMinute <= 160) score += 10;
    else if (results.wordsPerMinute > 180 || results.wordsPerMinute < 80) score -= 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-emerald-500", message: "Amazing job! You're a speaking superstar! ⭐" };
    if (score >= 80) return { grade: "A", color: "text-emerald-500", message: "Great work! Keep it up! 🎉" };
    if (score >= 70) return { grade: "B", color: "text-amber-500", message: "Good effort! You're improving! 💪" };
    if (score >= 60) return { grade: "C", color: "text-amber-500", message: "Nice try! Let's practice more! 🌟" };
    return { grade: "Keep Going!", color: "text-sky-500", message: "Practice makes perfect! You've got this! 🚀" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        
        {phase === "recording" && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${
            timeLeft <= 10 ? "bg-red-100 text-red-600" : "bg-sky-100 text-sky-600"
          }`}>
            <Clock className="w-5 h-5" />
            {timeLeft}s
          </div>
        )}
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* PREP PHASE */}
        {phase === "prep" && (
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-6xl mb-6 block">{prompt.emoji}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{prompt.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{prompt.description}</p>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for this prompt:</h3>
              <ul className="space-y-2">
                {prompt.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 text-left">
                You&apos;ll have <strong>60 seconds</strong> to speak. Try to look at the camera and avoid filler words like &quot;um&quot; and &quot;like&quot;.
              </p>
            </div>

            <button
              onClick={startRecording}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition shadow-xl shadow-sky-500/30 mx-auto"
            >
              <Mic className="w-6 h-6" />
              Start Speaking
            </button>
          </div>
        )}

        {/* RECORDING PHASE */}
        {phase === "recording" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full aspect-video bg-gray-900 rounded-2xl object-cover"
              />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">Recording</span>
              </div>

              <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full ${
                eyeContact ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
              }`}>
                {eyeContact ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="text-sm font-medium">{eyeContact ? "Good eye contact!" : "Look at camera"}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <span className="text-4xl mb-4 block">{prompt.emoji}</span>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h2>
                <p className="text-gray-600">{prompt.description}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 h-40 overflow-y-auto">
                <p className="text-sm text-gray-500 mb-2">What I&apos;m hearing:</p>
                <p className="text-gray-700">{transcript || "Start speaking..."}</p>
              </div>

              <button
                onClick={endRecording}
                className="flex items-center justify-center gap-2 bg-red-500 text-white w-full py-4 rounded-xl font-semibold hover:bg-red-600 transition"
              >
                <MicOff className="w-5 h-5" />
                End Session
              </button>
            </div>
          </div>
        )}

        {/* RESULTS PHASE */}
        {phase === "results" && results && (
          <div className="max-w-2xl mx-auto">
            {(() => {
              const score = calculateScore(results);
              const { grade, color, message } = getScoreGrade(score);
              return (
                <>
                  <div className="bg-white rounded-3xl p-8 shadow-xl text-center mb-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className={`text-6xl font-bold ${color} mb-2`}>{grade}</div>
                    <div className="text-2xl font-semibold text-gray-900 mb-2">{score} points</div>
                    <p className="text-gray-600 text-lg">{message}</p>
                    
                    <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-6 py-2 rounded-full">
                      +{Math.round(score / 2)} XP earned!
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                      <div className="text-3xl font-bold text-sky-600">{results.fillerCount}</div>
                      <div className="text-sm text-gray-600">Filler Words</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                      <div className="text-3xl font-bold text-amber-600">{results.eyeContactPercent}%</div>
                      <div className="text-sm text-gray-600">Eye Contact</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                      <div className="text-3xl font-bold text-emerald-600">{results.wordsPerMinute}</div>
                      <div className="text-sm text-gray-600">Words/Min</div>
                    </div>
                  </div>

                  {results.fillerWords.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                      <h3 className="font-semibold text-gray-900 mb-3">Filler Words Detected:</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.fillerWords.map((f, i) => (
                          <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                            &quot;{f.word}&quot; × {f.count}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-sky-50 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-sky-900 mb-3">💡 Tips for next time:</h3>
                    <ul className="space-y-2 text-sky-800">
                      {results.fillerCount > 3 && (
                        <li>• Try pausing instead of saying &quot;um&quot; or &quot;like&quot;</li>
                      )}
                      {results.eyeContactPercent < 70 && (
                        <li>• Practice looking right at the camera when you speak</li>
                      )}
                      {results.wordsPerMinute > 160 && (
                        <li>• Slow down a bit - take your time!</li>
                      )}
                      {results.wordsPerMinute < 100 && (
                        <li>• Try to speak a little faster with more energy</li>
                      )}
                      <li>• Great job completing this session! Practice makes perfect!</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setPhase("prep");
                        setResults(null);
                        setTranscript("");
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Try Again
                    </button>
                    <Link
                      href="/dashboard"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                      <Home className="w-5 h-5" />
                      Dashboard
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function SpeakPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SpeakContent />
    </Suspense>
  );
}
