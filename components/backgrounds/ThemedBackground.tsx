"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { THEMES } from "./themes";

/**
 * Fixed, behind-everything animated background. The theme auto-rotates by the
 * hour of day (so it changes through the day), and a small button lets the
 * visitor cycle themes manually. Rendered only after mount to avoid any
 * server/client hydration mismatch from reading the clock.
 */
export function ThemedBackground() {
  const [index, setIndex] = useState<number | null>(null);
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    setIndex(new Date().getHours() % THEMES.length);
  }, []);

  const cycle = () => {
    setIndex((i) => ((i ?? 0) + 1) % THEMES.length);
    setLabelVisible(true);
    const id = setTimeout(() => setLabelVisible(false), 1800);
    return () => clearTimeout(id);
  };

  if (index === null) return null;
  const theme = THEMES[index];
  const Bg = theme.Component;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Bg />
      </div>

      <button
        onClick={cycle}
        aria-label={`Change background theme (current: ${theme.name})`}
        title={`Background: ${theme.name} — click to change`}
        className="glass fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-700 shadow-lg transition-transform hover:scale-105 dark:text-gray-200"
      >
        <Palette className="h-4 w-4" />
        <span className={labelVisible ? "inline" : "hidden sm:inline"}>{theme.name}</span>
      </button>
    </>
  );
}
