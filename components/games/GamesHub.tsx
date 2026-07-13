"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Worm, Grid3x3, Hash } from "lucide-react";
import { SnakeGame } from "./SnakeGame";
import { MemoryGame } from "./MemoryGame";
import { TicTacToe } from "./TicTacToe";

const GAMES = [
  { key: "snake", name: "Snake", desc: "Classic worm — eat, grow, survive.", icon: Worm, accent: "from-cyan-500 to-blue-600" },
  { key: "memory", name: "Memory Match", desc: "Flip and pair the tech icons.", icon: Grid3x3, accent: "from-violet-500 to-purple-600" },
  { key: "tictactoe", name: "Tic-Tac-Toe", desc: "Beat the unbeatable AI (or draw).", icon: Hash, accent: "from-emerald-500 to-teal-600" },
] as const;

type GameKey = (typeof GAMES)[number]["key"];

export function GamesHub() {
  const [active, setActive] = useState<GameKey>("snake");
  const current = GAMES.find((g) => g.key === active)!;

  return (
    <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline dark:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
        <h1 className="gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">Arcade</h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          A little corner to take a break and play. Built from scratch — no libraries, just code.
        </p>
      </div>

      {/* Game selector */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GAMES.map((g) => {
          const Icon = g.icon;
          const isActive = g.key === active;
          return (
            <button
              key={g.key}
              onClick={() => setActive(g.key)}
              className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                isActive
                  ? "border-primary/40 bg-primary/5 shadow-md dark:border-primary-dark/40 dark:bg-primary-dark/10"
                  : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${g.accent} text-white shadow`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-gray-900 dark:text-white">{g.name}</span>
                <span className="block truncate text-xs text-gray-500 dark:text-gray-400">{g.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active game */}
      <div className="glow-border rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="mb-6 flex items-center gap-2 text-center text-xl font-bold text-gray-900 dark:text-white">
              <current.icon className="h-5 w-5 text-primary dark:text-primary-dark" />
              {current.name}
            </h2>
            {active === "snake" && <SnakeGame />}
            {active === "memory" && <MemoryGame />}
            {active === "tictactoe" && <TicTacToe />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
