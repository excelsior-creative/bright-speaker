"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, MicOff, Eye, EyeOff, Clock, AlertCircle, CheckCircle, Home, RotateCcw, Loader2, Star } from "lucide-react";
import Link from "next/link";
import { saveSession } from "@/lib/sessions";

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

const FILLER_WORDS = ["um", "uh", "er", "ah", "like", "you know", "i mean", "sort of", "kind of"];

interface SessionResults {
  transcript: string;
  fillerCount: number;
  fillerWords: { word: string; count: number }[];
  duration: number;
  eyeContactPercent: number;
  wordsPerMinute: number;
  score: number;
  xpEarned: number;
  newBadges: string[];
  levelUp: { previousLevel: number; newLevel: number } | null;
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-warm-gradient flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-warm-coral animate-spin mx-auto mb-4" />
        <p className="text-foreground/60 font-semibold">Loading your practice session...</p>
      </div>
    </div>
  );
}

function SpeakContent() {
  const searchParams = useSearchParams();
  const promptId = parseInt(searchParams.get("prompt") || "1");
  const prompt = prompts[promptId] || prompts[1];

  const [phase, setPhase] = useState<"prep" | "recording" | "results">("prep");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [liveFillerCount, setLiveFillerCount] = useState(0);
  const [eyeContact, setEyeContact] = useState(true);
  const [eyeContactHistory, setEyeContactHistory] = useState<boolean[]>([]);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [faceApiReady, setFaceApiReady] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const faceDetectionRef = useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faceApiRef = useRef<any>(null);

  const initFaceDetection = async () => {
    try {
      const faceapi = await import("face-api.js");
      faceApiRef.current = faceapi;
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setFaceApiReady(true);
    } catch (e) {
      console.error("Face detection failed to load:", e);
    }
  };

  const detectEyeContact = useCallback(async () => {
    if (!videoRef.current || !faceApiRef.current) return;
    const faceapi = faceApiRef.current;
    try {
      const detection = await faceapi.detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.3 })
      );
      if (detection) {
        const { x, width } = detection.box;
        const videoWidth = videoRef.current.videoWidth || videoRef.current.clientWidth;
        const faceCenterX = x + width / 2;
        const centerZone = videoWidth * 0.6;
        const leftBound = videoWidth * 0.2;
        const isLooking = faceCenterX >= leftBound && faceCenterX <= leftBound + centerZone;
        setEyeContact(isLooking);
        setEyeContactHistory(h => [...h, isLooking]);
      } else {
        setEyeContact(false);
        setEyeContactHistory(h => [...h, false]);
      }
    } catch {
      setEyeContact(true);
      setEyeContactHistory(h => [...h, true]);
    }
  }, []);

  const startWebcam = async (): Promise<boolean> => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMediaError("This browser doesn't support camera access. Try Chrome, Edge, or Safari on a laptop, Chromebook, or iPad.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      setMediaError(null);
      return true;
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (name === "NotAllowedError" || name === "SecurityError") {
        setMediaError("Camera and microphone access was blocked. Click the camera icon in your browser's address bar to allow it, then try again.");
      } else if (name === "NotFoundError" || name === "OverconstrainedError") {
        setMediaError("No camera was found on this device. Plug in a webcam or switch to a device with a built-in camera.");
      } else {
        setMediaError("We couldn't start your camera. Close other apps using the camera and try again.");
      }
      return false;
    }
  };

  // Attach stream to video element once recording phase is active and video is in DOM
  useEffect(() => {
    if (phase === "recording" && mediaStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [phase]);

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
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + " ";
          } else {
            interim += result[0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => {
            const updated = prev + finalTranscript;
            const fillerMatches = FILLER_WORDS.reduce((count, filler) => {
              const regex = new RegExp(`\\b${filler}\\b`, "gi");
              return count + (updated.match(regex)?.length || 0);
            }, 0);
            setLiveFillerCount(fillerMatches);
            return updated;
          });
        }
        setInterimText(interim);
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

  const calculateScore = (fillerCount: number, eyePercent: number, wpm: number) => {
    let score = 100;
    score -= Math.min(fillerCount * 5, 40);
    if (eyePercent >= 0) {
      if (eyePercent >= 80) score += 10;
      else if (eyePercent < 50) score -= 20;
    }
    if (wpm >= 100 && wpm <= 160) score += 10;
    else if (wpm > 180 || wpm < 80) score -= 10;
    return Math.max(0, Math.min(100, score));
  };

  const startRecording = async () => {
    const ok = await startWebcam();
    if (!ok) return;
    initSpeechRecognition();
    setPhase("recording");
    setIsRecording(true);
    setTranscript("");
    setInterimText("");
    setLiveFillerCount(0);
    setEyeContactHistory([]);
    setTimeLeft(60);
    recognitionRef.current?.start();
    if (faceApiReady) {
      faceDetectionRef.current = setInterval(() => { detectEyeContact(); }, 500);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { endRecording(); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const endRecording = useCallback(() => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    if (faceDetectionRef.current) clearInterval(faceDetectionRef.current);
    setTimeLeft(prev => {
      const duration = 60 - prev;
      setTranscript(currentTranscript => {
        setEyeContactHistory(currentHistory => {
          const fillerAnalysis = analyzeTranscript(currentTranscript);
          const totalFillers = fillerAnalysis.reduce((sum, f) => sum + f.count, 0);
          const wordCount = currentTranscript.split(/\s+/).filter(w => w.length > 0).length;
          const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;
          const eyeMeasured = currentHistory.length > 0;
          const eyePercent = eyeMeasured
            ? Math.round((currentHistory.filter(e => e).length / currentHistory.length) * 100)
            : -1;
          const score = calculateScore(totalFillers, eyePercent, wpm);
          const xpEarned = Math.round(score / 2);
          let rewardSummary = { newBadges: [] as string[], levelUp: null as { previousLevel: number; newLevel: number } | null };
          try {
            const savedSession = saveSession({ promptId, promptTitle: prompt.title, score, fillerCount: totalFillers, fillerWords: fillerAnalysis, duration, eyeContactPercent: eyePercent, wordsPerMinute: wpm, xpEarned, transcript: currentTranscript });
            rewardSummary = { newBadges: savedSession.newBadges, levelUp: savedSession.levelUp };
          } catch (e) { console.error("Failed to save session:", e); }
          setResults({ transcript: currentTranscript, fillerCount: totalFillers, fillerWords: fillerAnalysis, duration, eyeContactPercent: eyePercent, wordsPerMinute: wpm, score, xpEarned, ...rewardSummary });
          return currentHistory;
        });
        return currentTranscript;
      });
      return prev;
    });
    setPhase("results");
    stopWebcam();
  }, [promptId, prompt.title]);

  useEffect(() => {
    initFaceDetection();
    return () => {
      stopWebcam();
      recognitionRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      if (faceDetectionRef.current) clearInterval(faceDetectionRef.current);
    };
  }, []);

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-warm-teal", message: "Amazing job! You're a speaking superstar! ⭐" };
    if (score >= 80) return { grade: "A", color: "text-warm-teal", message: "Great work! Keep it up! 🎉" };
    if (score >= 70) return { grade: "B", color: "text-warm-gold", message: "Good effort! You're improving! 💪" };
    if (score >= 60) return { grade: "C", color: "text-warm-gold", message: "Nice try! Let's practice more! 🌟" };
    return { grade: "Keep Going!", color: "text-warm-coral", message: "Practice makes perfect! You've got this! 🚀" };
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-foreground/50 hover:text-warm-coral transition font-semibold">
          <Home className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        {phase === "recording" && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-extrabold text-lg ${timeLeft <= 10 ? "bg-warm-coral-light text-warm-coral" : "bg-warm-teal-light text-warm-teal-dark"}`}>
            <Clock className="w-5 h-5" />
            {timeLeft}s
          </div>
        )}
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* PREP PHASE */}
        {phase === "prep" && (
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-6xl mb-6 block animate-bounce-in">{prompt.emoji}</span>
            <h1 className="text-3xl font-extrabold text-foreground mb-4">{prompt.title}</h1>
            <p className="text-xl text-foreground/60 mb-8">{prompt.description}</p>

            <div className="card-warm p-6 mb-8 text-left">
              <h3 className="font-bold text-foreground mb-3">💡 Tips for this prompt:</h3>
              <ul className="space-y-2">
                {prompt.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/60">
                    <CheckCircle className="w-5 h-5 text-warm-teal flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-warm-gold-light rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warm-gold-dark flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warm-gold-dark text-left">
                You&apos;ll have <strong>60 seconds</strong> to speak. Try to look at the camera and avoid filler words like &quot;um&quot; and &quot;like&quot;.
              </p>
            </div>

            {mediaError && (
              <div role="alert" className="bg-warm-coral-light border-2 border-warm-coral rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-warm-coral-dark flex-shrink-0 mt-0.5" />
                <p className="text-sm text-warm-coral-dark">{mediaError}</p>
              </div>
            )}

            <button
              onClick={startRecording}
              className="flex items-center justify-center gap-3 bg-warm-coral text-white px-10 py-5 rounded-2xl font-extrabold text-xl btn-playful shadow-xl shadow-warm-coral/30 mx-auto"
            >
              <Mic className="w-6 h-6" />
              Start Speaking
            </button>
          </div>
        )}

        {/* RECORDING PHASE */}
        {phase === "recording" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-xl">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-warm-coral text-white px-3 py-1.5 rounded-full text-sm font-bold shadow">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  REC
                </div>
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-extrabold shadow ${timeLeft <= 10 ? "bg-warm-coral text-white" : "bg-black/60 text-white"}`}>
                  <Clock className="w-4 h-4" />
                  {timeLeft}s
                </div>
                {faceApiReady ? (
                  <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-colors ${eyeContact ? "bg-warm-teal text-white" : "bg-warm-gold text-white"}`}>
                    {eyeContact ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {eyeContact ? "Great eye contact! 👀" : "Look at the camera!"}
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg bg-foreground/60 text-white">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading camera coach…
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="card-warm p-3 text-center">
                  <div className={`text-2xl font-extrabold ${liveFillerCount > 5 ? "text-warm-coral" : liveFillerCount > 2 ? "text-warm-gold" : "text-warm-teal"}`}>
                    {liveFillerCount}
                  </div>
                  <div className="text-xs text-foreground/40 font-semibold mt-0.5">Filler words</div>
                </div>
                <div className="card-warm p-3 text-center">
                  <div className="text-2xl font-extrabold text-warm-coral">
                    {transcript.split(/\s+/).filter(w => w.length > 0).length}
                  </div>
                  <div className="text-xs text-foreground/40 font-semibold mt-0.5">Words spoken</div>
                </div>
                <div className="card-warm p-3 text-center">
                  <div className={`text-2xl font-extrabold ${faceApiReady ? (eyeContact ? "text-warm-teal" : "text-warm-gold") : "text-foreground/40"}`}>
                    {faceApiReady && eyeContactHistory.length > 0
                      ? `${Math.round((eyeContactHistory.filter(Boolean).length / eyeContactHistory.length) * 100)}%`
                      : "—"}
                  </div>
                  <div className="text-xs text-foreground/40 font-semibold mt-0.5">Eye contact</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card-warm p-5">
                <span className="text-3xl mb-2 block">{prompt.emoji}</span>
                <h2 className="text-lg font-extrabold text-foreground mb-1">{prompt.title}</h2>
                <p className="text-foreground/60 text-sm">{prompt.description}</p>
              </div>

              <div className="bg-muted rounded-2xl p-4 flex-1 min-h-[140px] max-h-[200px] overflow-y-auto">
                <p className="text-xs text-foreground/30 uppercase tracking-wide mb-2 font-bold">Live transcript</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {transcript}
                  {interimText && <span className="text-foreground/30 italic">{interimText}</span>}
                  {!transcript && !interimText && <span className="text-foreground/30 italic">Start speaking...</span>}
                </p>
              </div>

              <button
                onClick={endRecording}
                disabled={!isRecording}
                className="flex items-center justify-center gap-2 bg-warm-coral text-white w-full py-4 rounded-xl font-bold hover:bg-warm-coral-dark transition disabled:opacity-50"
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
              const { grade, color, message } = getScoreGrade(results.score);
              return (
                <>
                  <div className="card-warm p-8 text-center mb-8 animate-bounce-in">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className={`text-6xl font-extrabold ${color} mb-2`}>{grade}</div>
                    <div className="text-2xl font-bold text-foreground mb-2">{results.score} points</div>
                    <p className="text-foreground/60 text-lg">{message}</p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-2 rounded-full font-bold">
                      +{results.xpEarned} XP earned!
                    </div>
                  </div>

                  {results.levelUp && (
                    <div className="bg-warm-gold-light rounded-2xl p-5 mb-6 text-center shadow-lg animate-bounce-in">
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="text-sm font-bold uppercase tracking-wide text-warm-gold-dark/80">Level Up</p>
                      <p className="text-2xl font-extrabold text-warm-gold-dark">
                        Level {results.levelUp.previousLevel} → Level {results.levelUp.newLevel}
                      </p>
                      <p className="text-sm text-warm-gold-dark mt-1">You unlocked the next practice tier. Keep that streak alive!</p>
                    </div>
                  )}

                  {results.newBadges.length > 0 && (
                    <div className="card-warm p-6 mb-6">
                      <h3 className="font-bold text-foreground mb-3">New badges unlocked!</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.newBadges.map((badge) => (
                          <span key={badge} className="inline-flex items-center gap-2 bg-warm-gold-light text-warm-gold-dark px-4 py-2 rounded-full text-sm font-bold">
                            <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="card-warm p-4 text-center">
                      <div className="text-3xl font-extrabold text-warm-coral">{results.fillerCount}</div>
                      <div className="text-sm text-foreground/50 font-semibold">Filler Words</div>
                    </div>
                    <div className="card-warm p-4 text-center">
                      <div className="text-3xl font-extrabold text-warm-gold">
                        {results.eyeContactPercent >= 0 ? `${results.eyeContactPercent}%` : "—"}
                      </div>
                      <div className="text-sm text-foreground/50 font-semibold">
                        {results.eyeContactPercent >= 0 ? "Eye Contact" : "Eye Contact (not measured)"}
                      </div>
                    </div>
                    <div className="card-warm p-4 text-center">
                      <div className="text-3xl font-extrabold text-warm-teal">{results.wordsPerMinute}</div>
                      <div className="text-sm text-foreground/50 font-semibold">Words/Min</div>
                    </div>
                  </div>

                  {results.fillerWords.length > 0 && (
                    <div className="card-warm p-6 mb-8">
                      <h3 className="font-bold text-foreground mb-3">Filler Words Detected:</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.fillerWords.map((f, i) => (
                          <span key={i} className="bg-warm-coral-light text-warm-coral-dark px-3 py-1 rounded-full text-sm font-semibold">
                            &quot;{f.word}&quot; × {f.count}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-warm-teal-light rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-warm-teal-dark mb-3">💡 Tips for next time:</h3>
                    <ul className="space-y-2 text-warm-teal-dark">
                      {results.fillerCount > 3 && (
                        <li>• Try pausing instead of saying &quot;um&quot; or &quot;like&quot;</li>
                      )}
                      {results.eyeContactPercent >= 0 && results.eyeContactPercent < 70 && (
                        <li>• Practice looking right at the camera when you speak</li>
                      )}
                      {results.wordsPerMinute > 160 && (
                        <li>• Slow down a bit — take your time!</li>
                      )}
                      {results.wordsPerMinute < 100 && (
                        <li>• Try to speak a little faster with more energy</li>
                      )}
                      <li>• Great job completing this session! Practice makes perfect!</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => { setPhase("prep"); setResults(null); setTranscript(""); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-warm-coral text-white py-4 rounded-xl font-bold btn-playful shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Try Again
                    </button>
                    <Link
                      href="/dashboard"
                      className="flex-1 flex items-center justify-center gap-2 bg-muted text-foreground py-4 rounded-xl font-bold hover:bg-warm-gold-light transition"
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

export default function SpeakPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SpeakContent />
    </Suspense>
  );
}
