"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Layered ambient background for the hero: a masked grid, three slow-drifting
 * aurora blobs, and a field of floating particles. Particles are generated
 * only after mount (client-side) so there is no hydration mismatch.
 */
export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fading grid */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

      {/* Aurora blobs */}
      <div className="absolute -top-24 -left-16 h-[30rem] w-[30rem] rounded-full bg-blue-400/30 blur-3xl animate-blob dark:bg-blue-600/20" />
      <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-violet-400/30 blur-3xl animate-blob [animation-delay:3s] dark:bg-violet-600/20" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan-300/30 blur-3xl animate-blob [animation-delay:6s] dark:bg-cyan-500/20" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40 dark:bg-primary-dark/60"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -34, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
