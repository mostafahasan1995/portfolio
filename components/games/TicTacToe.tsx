"use client";

import { useState } from "react";
import { RotateCcw, X as XIcon, Circle } from "lucide-react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(b: Cell[]): Cell | "draw" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.every(Boolean) ? "draw" : null;
}

// Minimax: AI is "O", player is "X"
function minimax(b: Cell[], isAI: boolean): number {
  const w = winner(b);
  if (w === "O") return 10;
  if (w === "X") return -10;
  if (w === "draw") return 0;

  const scores: number[] = [];
  b.forEach((cell, i) => {
    if (!cell) {
      const next = [...b];
      next[i] = isAI ? "O" : "X";
      scores.push(minimax(next, !isAI));
    }
  });
  return isAI ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(b: Cell[]): number {
  let best = -Infinity;
  let move = -1;
  b.forEach((cell, i) => {
    if (!cell) {
      const next = [...b];
      next[i] = "O";
      const score = minimax(next, false);
      if (score > best) {
        best = score;
        move = i;
      }
    }
  });
  return move;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [busy, setBusy] = useState(false);
  const [record, setRecord] = useState({ w: 0, l: 0, d: 0 });

  const result = winner(board);

  const finish = (b: Cell[]) => {
    const r = winner(b);
    if (r === "X") setRecord((p) => ({ ...p, w: p.w + 1 }));
    else if (r === "O") setRecord((p) => ({ ...p, l: p.l + 1 }));
    else if (r === "draw") setRecord((p) => ({ ...p, d: p.d + 1 }));
  };

  const play = (i: number) => {
    if (board[i] || result || busy) return;
    const afterPlayer = [...board];
    afterPlayer[i] = "X";
    setBoard(afterPlayer);
    if (winner(afterPlayer)) {
      finish(afterPlayer);
      return;
    }
    setBusy(true);
    setTimeout(() => {
      const move = bestMove(afterPlayer);
      const afterAI = [...afterPlayer];
      if (move >= 0) afterAI[move] = "O";
      setBoard(afterAI);
      if (winner(afterAI)) finish(afterAI);
      setBusy(false);
    }, 350);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setBusy(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4 text-sm font-medium">
        <span className="text-emerald-500">You {record.w}</span>
        <span className="text-gray-400">Draw {record.d}</span>
        <span className="text-rose-500">AI {record.l}</span>
      </div>

      <div className="relative">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => play(i)}
              disabled={!!cell || !!result || busy}
              className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-50 shadow-sm transition-colors hover:bg-gray-100 disabled:cursor-default dark:bg-slate-800 dark:hover:bg-slate-700 sm:h-24 sm:w-24"
              aria-label={cell ? `Cell ${cell}` : `Empty cell ${i + 1}`}
            >
              {cell === "X" && <XIcon className="h-10 w-10 text-primary dark:text-primary-dark" strokeWidth={3} />}
              {cell === "O" && <Circle className="h-9 w-9 text-rose-500" strokeWidth={3} />}
            </button>
          ))}
        </div>

        {result && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white">
              {result === "X" ? "You win! 🎉" : result === "O" ? "AI wins 🤖" : "Draw 🤝"}
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

      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        You are <strong>X</strong>. The AI plays a perfect game — can you force a draw?
      </p>
    </div>
  );
}
