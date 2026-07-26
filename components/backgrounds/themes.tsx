"use client";

import { useEffect, useRef, useState } from "react";

/* Each theme fills a fixed, pointer-events-none layer sitting behind all content.
   All are tuned to read well in both light and dark mode. */

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/* 1) COSMOS — twinkling starfield + drifting nebulae */
export function CosmosTheme() {
  const mounted = useMounted();
  const [stars, setStars] = useState<{ l: number; t: number; s: number; d: number }[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, () => ({
        l: Math.random() * 100,
        t: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 4,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-blue-50 dark:from-[#070b1f] dark:via-[#0a0f2a] dark:to-black">
      <div className="absolute -left-20 top-10 h-[26rem] w-[26rem] rounded-full bg-violet-400/20 blur-3xl animate-blob dark:bg-violet-600/25" />
      <div className="absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-blue-400/20 blur-3xl animate-blob [animation-delay:4s] dark:bg-indigo-600/25" />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-cyan-300/15 blur-3xl animate-blob [animation-delay:8s] dark:bg-cyan-500/20" />
      {mounted &&
        stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-slate-400/70 animate-pulse dark:bg-white"
            style={{
              left: `${s.l}%`,
              top: `${s.t}%`,
              width: s.s,
              height: s.s,
              animationDelay: `${s.d}s`,
              animationDuration: "3s",
            }}
          />
        ))}
    </div>
  );
}

/* 2) ORBITS — a glowing sun with planets on spinning rings */
export function OrbitsTheme() {
  const rings = [
    { size: 300, dur: 24 },
    { size: 480, dur: 38 },
    { size: 680, dur: 58 },
    { size: 900, dur: 84 },
  ];
  const planet = [
    "from-cyan-400 to-blue-600",
    "from-rose-400 to-pink-600",
    "from-emerald-400 to-teal-600",
    "from-amber-300 to-orange-500",
  ];
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-orange-50 via-white to-rose-50 dark:from-[#0a0812] dark:via-[#0d0a1e] dark:to-black">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 opacity-40 blur-2xl animate-pulse dark:opacity-60" />
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/50 animate-spin dark:border-white/10"
          style={{ width: r.size, height: r.size, animationDuration: `${r.dur}s` }}
        >
          <span
            className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${planet[i]} shadow-lg`}
          />
        </div>
      ))}
    </div>
  );
}

/* 3) MATRIX — digital rain on canvas */
export function MatrixTheme() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const chars = "アイウエオカキクケコ0123456789ABCDEFｱｲｳｴｵ".split("");
    const fontSize = 16;
    let cols = 0;
    let drops: number[] = [];
    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    setup();
    window.addEventListener("resize", setup);

    const isDark = () => document.documentElement.classList.contains("dark");
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      if (t - last < 55) return;
      last = t;
      ctx.fillStyle = isDark() ? "rgba(2,6,20,0.10)" : "rgba(248,250,252,0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = isDark() ? "rgba(34,197,94,0.85)" : "rgba(16,185,129,0.55)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full bg-slate-50 dark:bg-[#020614]" />;
}

/* 4) EQUALIZER — pulsing musical bars across the bottom */
export function EqualizerTheme() {
  const mounted = useMounted();
  const [bars, setBars] = useState<{ h: number; d: number; dur: number }[]>([]);
  useEffect(() => {
    setBars(
      Array.from({ length: 64 }, () => ({
        h: Math.random() * 45 + 15,
        d: Math.random() * 1.2,
        dur: Math.random() * 0.8 + 0.7,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-fuchsia-50 via-white to-indigo-50 dark:from-[#0a0616] dark:via-[#0c0a20] dark:to-black">
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full items-end justify-center gap-[3px] px-2 opacity-70 dark:opacity-90">
        {mounted &&
          bars.map((b, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-violet-500 via-fuchsia-500 to-cyan-400 animate-eq"
              style={{ height: `${b.h}%`, animationDelay: `${b.d}s`, animationDuration: `${b.dur}s` }}
            />
          ))}
      </div>
    </div>
  );
}

/* 5) UNDERWATER — rising bubbles over an ocean gradient */
export function UnderwaterTheme() {
  const mounted = useMounted();
  const [bubbles, setBubbles] = useState<{ l: number; s: number; d: number; dur: number }[]>([]);
  useEffect(() => {
    setBubbles(
      Array.from({ length: 28 }, () => ({
        l: Math.random() * 100,
        s: Math.random() * 22 + 6,
        d: Math.random() * 8,
        dur: Math.random() * 8 + 8,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-cyan-50 via-sky-50 to-blue-100 dark:from-[#03202e] dark:via-[#032a3d] dark:to-[#01111c]">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent dark:from-cyan-400/10" />
      {mounted &&
        bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute bottom-[-10%] rounded-full border border-white/40 bg-white/10 animate-rise dark:border-cyan-200/30 dark:bg-cyan-200/10"
            style={{
              left: `${b.l}%`,
              width: b.s,
              height: b.s,
              animationDelay: `${b.d}s`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
    </div>
  );
}

export const THEMES = [
  { key: "cosmos", name: "Cosmos", Component: CosmosTheme },
  { key: "orbits", name: "Orbits", Component: OrbitsTheme },
  { key: "matrix", name: "Matrix", Component: MatrixTheme },
  { key: "equalizer", name: "Equalizer", Component: EqualizerTheme },
  { key: "underwater", name: "Underwater", Component: UnderwaterTheme },
] as const;
