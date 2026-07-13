"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw } from "lucide-react";

const COLS = 17;
const ROWS = 17;
const CELL = 20; // logical px per cell -> 340x340 canvas
type P = { x: number; y: number };

const DIRS: Record<string, P> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");

  const snake = useRef<P[]>([]);
  const dir = useRef<P>(DIRS.right);
  const nextDir = useRef<P>(DIRS.right);
  const food = useRef<P>({ x: 12, y: 8 });
  const scoreRef = useRef(0);
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    setBest(Number(localStorage.getItem("snake-best") || 0));
  }, []);

  const placeFood = useCallback(() => {
    let p: P;
    do {
      p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.current.some((s) => s.x === p.x && s.y === p.y));
    food.current = p;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(food.current.x * CELL + CELL / 2, food.current.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    snake.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#22d3ee" : "#3b82f6";
      roundRect(ctx, s.x * CELL + 1.5, s.y * CELL + 1.5, CELL - 3, CELL - 3, 5);
      ctx.fill();
    });
  }, []);

  const endGame = useCallback(() => {
    setStatus("over");
    if (scoreRef.current > Number(localStorage.getItem("snake-best") || 0)) {
      localStorage.setItem("snake-best", String(scoreRef.current));
      setBest(scoreRef.current);
    }
  }, []);

  const tick = useCallback(() => {
    if (statusRef.current !== "running") return;
    dir.current = nextDir.current;
    const head = {
      x: snake.current[0].x + dir.current.x,
      y: snake.current[0].y + dir.current.y,
    };
    if (
      head.x < 0 ||
      head.x >= COLS ||
      head.y < 0 ||
      head.y >= ROWS ||
      snake.current.some((s) => s.x === head.x && s.y === head.y)
    ) {
      endGame();
      return;
    }
    snake.current.unshift(head);
    if (head.x === food.current.x && head.y === food.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      placeFood();
    } else {
      snake.current.pop();
    }
    draw();
  }, [draw, endGame, placeFood]);

  // Game loop: re-created when running-state or score (speed) changes.
  useEffect(() => {
    if (status !== "running") return;
    const delay = Math.max(65, 115 - score * 3);
    const id = window.setInterval(() => tick(), delay);
    return () => clearInterval(id);
  }, [status, score, tick]);

  const start = useCallback(() => {
    snake.current = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    dir.current = DIRS.right;
    nextDir.current = DIRS.right;
    scoreRef.current = 0;
    setScore(0);
    placeFood();
    draw();
    setStatus("running");
  }, [draw, placeFood]);

  const setDirection = useCallback((nd: P) => {
    const cur = dir.current;
    if (nd.x === -cur.x && nd.y === -cur.y) return; // can't reverse
    nextDir.current = nd;
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, P> = {
        ArrowUp: DIRS.up, ArrowDown: DIRS.down, ArrowLeft: DIRS.left, ArrowRight: DIRS.right,
        w: DIRS.up, s: DIRS.down, a: DIRS.left, d: DIRS.right,
      };
      const nd = map[e.key];
      if (nd) {
        e.preventDefault();
        setDirection(nd);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setDirection]);

  const touchStart = useRef<P | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    if (Math.abs(dx) > Math.abs(dy)) setDirection(dx > 0 ? DIRS.right : DIRS.left);
    else setDirection(dy > 0 ? DIRS.down : DIRS.up);
    touchStart.current = null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full max-w-[340px] items-center justify-between">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Score <span className="ml-1 text-lg font-bold text-primary dark:text-primary-dark">{score}</span>
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Best <span className="ml-1 text-lg font-bold text-amber-500">{best}</span>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="w-full max-w-[340px] touch-none rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50 shadow-inner dark:border-slate-700 dark:from-slate-900 dark:to-slate-800"
        />
        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
            {status === "over" && <p className="mb-3 text-2xl font-bold text-white">Game Over</p>}
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-600"
            >
              {status === "over" ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {status === "over" ? "Play again" : "Start"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 grid w-40 grid-cols-3 gap-2 sm:hidden">
        <span />
        <ControlBtn onClick={() => setDirection(DIRS.up)}><ArrowUp className="h-5 w-5" /></ControlBtn>
        <span />
        <ControlBtn onClick={() => setDirection(DIRS.left)}><ArrowLeft className="h-5 w-5" /></ControlBtn>
        <ControlBtn onClick={() => setDirection(DIRS.down)}><ArrowDown className="h-5 w-5" /></ControlBtn>
        <ControlBtn onClick={() => setDirection(DIRS.right)}><ArrowRight className="h-5 w-5" /></ControlBtn>
      </div>

      <p className="mt-4 hidden text-center text-xs text-gray-500 dark:text-gray-400 sm:block">
        Use arrow keys or WASD. On mobile, swipe or tap the arrows.
      </p>
    </div>
  );
}

function ControlBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-700 active:scale-95 dark:bg-slate-800 dark:text-gray-200"
    >
      {children}
    </button>
  );
}
