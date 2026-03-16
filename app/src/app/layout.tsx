import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bright Speaker — AI Communication Coach for Kids",
  description: "Help kids become confident communicators with AI-powered speech coaching. Fun, gamified, and effective.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-end items-center px-6 py-3 gap-3 h-14 border-b border-border-warm bg-surface/80 backdrop-blur-sm">
            <Show when="signed-out">
              <SignInButton>
                <button className="text-sm font-semibold text-foreground/70 hover:text-warm-coral transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="text-sm font-bold text-white bg-warm-coral hover:bg-warm-coral-dark px-4 py-1.5 rounded-full transition btn-playful">
                  Sign Up Free
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
