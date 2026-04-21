"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Logo from "@/components/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </nav>
      <main id="main" className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="card-warm p-10 max-w-lg w-full text-center">
          <div className="w-14 h-14 rounded-full bg-warm-coral-light flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-warm-coral" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Something went wrong</h1>
          <p className="text-foreground/60 mb-6">
            We hit an unexpected error loading this page. Try again, or head home and start a fresh
            session.
          </p>
          {error.digest && (
            <p className="text-xs text-foreground/60 font-mono mb-6">Error ID: {error.digest}</p>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-warm-coral text-white px-5 py-2.5 rounded-xl font-bold btn-playful shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-muted text-foreground/70 px-5 py-2.5 rounded-xl font-bold hover:bg-warm-coral-light hover:text-warm-coral-dark transition"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
