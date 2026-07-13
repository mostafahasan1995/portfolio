"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Timer, MousePointerClick } from "lucide-react";

const ICONS = ["⚛️", "🐹", "🐳", "🔷", "🚀", "🍃", "🐘", "🧩"];

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle(): Card[] {
  const deck = [...ICONS, ...ICONS]
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((c, i) => ({ ...c, id: i }));
  return deck;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(shuffle);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  const won = useMemo(() => cards.length > 0 && cards.every((c) => c.matched), [cards]);

  useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  const handleFlip = (index: number) => {
    if (!started) setStarted(true);
    if (flipped.length === 2) return;
    const card = cards[index];
    if (card.flipped || card.matched) return;

    const newCards = cards.map((c, i) => (i === index ? { ...c, flipped: true } : c));
    const newFlipped = [...flipped, index];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (newCards[a].icon === newCards[b].icon) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c))
          );
          setFlipped([]);
        }, 350);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c))
          );
          setFlipped([]);
        }, 800);
      }
    }
  };

  const reset = () => {
    setCards(shuffle());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setStarted(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full max-w-[360px] items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">
          <MousePointerClick className="h-4 w-4" />
          Moves <span className="ml-1 text-lg font-bold text-primary dark:text-primary-dark">{moves}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Timer className="h-4 w-4" />
          <span className="text-lg font-bold text-amber-500">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2.5" style={{ perspective: 800 }}>
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className="relative h-16 w-16 sm:h-20 sm:w-20"
              aria-label={card.flipped || card.matched ? card.icon : "Hidden card"}
            >
              <div
                className="relative h-full w-full transition-transform duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* back */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-xl font-bold opacity-70">?</span>
                </div>
                {/* front */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl text-3xl shadow-md transition-colors ${
                    card.matched
                      ? "bg-emerald-100 ring-2 ring-emerald-400 dark:bg-emerald-900/40"
                      : "bg-white dark:bg-slate-700"
                  }`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {card.icon}
                </div>
              </div>
            </button>
          ))}
        </div>

        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white">You win! 🎉</p>
            <p className="mt-1 text-sm text-gray-200">
              {moves} moves · {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </p>
            <button
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-600"
            >
              <RotateCcw className="h-4 w-4" />
              Play again
            </button>
          </div>
        )}
      </div>

      <button
        onClick={reset}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
      >
        <RotateCcw className="h-4 w-4" />
        Restart
      </button>
    </div>
  );
}
