import Link from "next/link";
import { Compass, Home } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Page not found",
  description: "That page isn't here. Head home to keep practicing.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="card-warm p-10 max-w-lg w-full text-center">
          <div className="w-14 h-14 rounded-full bg-warm-teal-light flex items-center justify-center mx-auto mb-4">
            <Compass className="w-7 h-7 text-warm-teal-dark" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Page not found</h1>
          <p className="text-foreground/60 mb-6">
            We couldn&apos;t find the page you&apos;re looking for. It may have moved or never
            existed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-warm-coral text-white px-5 py-2.5 rounded-xl font-bold btn-playful shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
