import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Sign up",
  description: "Create your BrightSpeaker account to start practicing speaking skills.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
      </main>
    </div>
  );
}
