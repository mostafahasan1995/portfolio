"use client";

import { ComponentType } from "react";
import { Terminal } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiGo,
  SiTypescript,
  SiNextdotjs,
  SiDocker,
  SiPostgresql,
  SiKubernetes,
  SiRedis,
  SiGraphql,
  SiNestjs,
  SiMongodb,
  SiGit,
  SiSolidity,
} from "react-icons/si";

type Ico = { Icon: ComponentType<{ className?: string }>; color: string };

const RINGS: { r: number; dur: number; icons: Ico[] }[] = [
  {
    r: 80,
    dur: 22,
    icons: [
      { Icon: SiReact, color: "text-[#087ea4] dark:text-[#61DAFB]" },
      { Icon: SiNodedotjs, color: "text-[#5FA04E]" },
      { Icon: SiTypescript, color: "text-[#3178C6]" },
      { Icon: SiGo, color: "text-[#00ADD8]" },
    ],
  },
  {
    r: 134,
    dur: 32,
    icons: [
      { Icon: SiNextdotjs, color: "text-gray-900 dark:text-white" },
      { Icon: SiDocker, color: "text-[#2496ED]" },
      { Icon: SiPostgresql, color: "text-[#4169E1]" },
      { Icon: SiKubernetes, color: "text-[#326CE5]" },
      { Icon: SiRedis, color: "text-[#FF4438]" },
    ],
  },
  {
    r: 188,
    dur: 46,
    icons: [
      { Icon: SiGraphql, color: "text-[#E10098]" },
      { Icon: SiNestjs, color: "text-[#E0234E]" },
      { Icon: SiMongodb, color: "text-[#47A248]" },
      { Icon: SiGit, color: "text-[#F05032]" },
      { Icon: SiSolidity, color: "text-gray-700 dark:text-gray-200" },
    ],
  },
];

export function HeroVisual() {
  return (
    <div className="relative h-[420px] w-[420px] max-w-full">
      {/* central glow */}
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/40 to-violet-600/40 blur-3xl" />

      {/* decorative rings */}
      {RINGS.map((ring, ri) => (
        <div
          key={`ring-${ri}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/40 dark:border-white/10"
          style={{ width: ring.r * 2, height: ring.r * 2 }}
        />
      ))}

      {/* orbiting tech icons */}
      {RINGS.map((ring, ri) => (
        <div
          key={`orbit-${ri}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
          style={{ width: ring.r * 2, height: ring.r * 2, animationDuration: `${ring.dur}s` }}
        >
          {ring.icons.map((ic, i) => {
            const angle = (2 * Math.PI * i) / ring.icons.length - Math.PI / 2;
            const x = Math.cos(angle) * ring.r;
            const y = Math.sin(angle) * ring.r;
            const Icon = ic.Icon;
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* counter-rotate so the logo stays upright while orbiting */}
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/80 shadow-md backdrop-blur-sm animate-spin dark:border-white/10 dark:bg-slate-800/80"
                  style={{ animationDuration: `${ring.dur}s`, animationDirection: "reverse" }}
                >
                  <Icon className={`h-5 w-5 ${ic.color}`} />
                </span>
              </span>
            );
          })}
        </div>
      ))}

      {/* center node */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-2xl shadow-blue-500/30">
        <Terminal className="h-10 w-10" />
      </div>
    </div>
  );
}
