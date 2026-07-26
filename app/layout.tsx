import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { VisitTracker } from "@/components/analytics/VisitTracker";
import { ThemedBackground } from "@/components/backgrounds/ThemedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mostafa Ali Hasan - Senior Software Engineer & Team Lead",
  description: "Senior Software Engineer with 7 years of experience building enterprise-grade applications. Specialized in full-stack development with Node.js, Go, React, and Next.js. Proven track record architecting scalable microservices and leading development teams.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Senior Software Engineer",
    "Team Lead",
    "Node.js",
    "Go",
    "Golang",
    "React",
    "Next.js",
    "Microservices",
    "Blockchain",
    "Backend Developer",
    "Dubai",
    "Lebanon",
    "Remote Developer",
  ],
  authors: [{ name: "Mostafa Ali Hasan" }],
  creator: "Mostafa Ali Hasan",
  openGraph: {
    title: "Mostafa Ali Hasan - Senior Software Engineer & Team Lead",
    description: "Senior Software Engineer with 7 years of experience building enterprise-grade applications. Specialized in full-stack development with Node.js, Go, React, and Next.js.",
    type: "website",
    locale: "en_US",
    siteName: "Mostafa Ali Hasan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mostafa Ali Hasan - Senior Software Engineer & Team Lead",
    description: "Senior Software Engineer with 7 years of experience building enterprise-grade applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://mostafahasan.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollProgress />
          <ThemedBackground />
          <VisitTracker />
          <Navigation />
          {/* Centered content column — leaves big side gaps on large (22"+) screens
              so the animated background shows through. */}
          <div className="relative mx-auto w-full max-w-[1600px] shadow-2xl shadow-black/5 dark:shadow-black/40">
            <main className="pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

