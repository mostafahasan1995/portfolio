import type { Metadata } from "next";
import { GamesHub } from "@/components/games/GamesHub";

export const metadata: Metadata = {
  title: "Arcade | Mostafa Ali Hasan",
  description:
    "Take a break and play — Snake, Memory Match, and Tic-Tac-Toe, all built from scratch.",
};

export default function GamesPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <GamesHub />
    </section>
  );
}
