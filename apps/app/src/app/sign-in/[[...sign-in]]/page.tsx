import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Sign in",
  description: "Sign in to BrightSpeaker to track your speaking practice and progress.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </nav>
      <main id="main" className="flex-1 flex items-center justify-center px-6 py-8">
        <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
      </main>
    </div>
  );
}
