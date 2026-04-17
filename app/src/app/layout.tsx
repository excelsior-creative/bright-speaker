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
  metadataBase: new URL("https://brightspeaker.com"),
  title: {
    default: "Bright Speaker — Speaking practice for K-12 classrooms",
    template: "%s · Bright Speaker",
  },
  description:
    "Bright Speaker gives K-12 students the reps they need to become confident speakers — in a Chromebook browser, with student video that never leaves the device.",
  applicationName: "Bright Speaker",
  keywords: [
    "K-12 public speaking",
    "classroom speaking practice",
    "filler word coaching",
    "speech and debate practice",
    "middle school ELA",
    "oral presentation",
    "Chromebook speaking tool",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Bright Speaker",
    title: "Bright Speaker — Speaking practice for K-12 classrooms",
    description:
      "Speaking reps for every student, without adding another video pile for teachers to grade.",
    url: "https://brightspeaker.com",
    images: [{ url: "/brand/mascot-logo.png", width: 512, height: 512, alt: "Bright Speaker" }],
  },
  twitter: {
    card: "summary",
    title: "Bright Speaker — Speaking practice for K-12 classrooms",
    description:
      "Speaking reps for every student, without adding another video pile for teachers to grade.",
    images: ["/brand/mascot-logo.png"],
  },
  alternates: {
    canonical: "/",
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
