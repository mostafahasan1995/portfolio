import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

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
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

