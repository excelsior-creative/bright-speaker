import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brightspeaker.com"),
  title: {
    default: "BrightSpeaker — the AI speech coach built for every kid",
    template: "%s · BrightSpeaker",
  },
  description:
    "BrightSpeaker is the AI speech coach built for K-5 classrooms. Real-time coaching on eye contact, pacing, posture, and volume — on the kid's device. No video ever leaves the classroom.",
  applicationName: "BrightSpeaker",
  keywords: [
    "K-5 public speaking",
    "elementary speaking practice",
    "AI speech coach",
    "Common Core SL standards",
    "on-device speech AI",
    "MediaPipe classroom",
    "COPPA FERPA speaking tool",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "BrightSpeaker",
    title: "BrightSpeaker — the AI speech coach built for every kid",
    description:
      "Real-time, on-device speech coaching for K-5 classrooms. COPPA/FERPA friendly by design.",
    url: "https://brightspeaker.com",
    images: [{ url: "/brand/mascot-logo.png", width: 512, height: 512, alt: "BrightSpeaker" }],
  },
  twitter: {
    card: "summary",
    title: "BrightSpeaker — the AI speech coach built for every kid",
    description:
      "Real-time, on-device speech coaching for K-5 classrooms.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
