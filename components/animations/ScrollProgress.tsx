"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the top of the viewport that fills as the
 * visitor scrolls the page. Purely decorative reading-progress indicator.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-1 origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
      aria-hidden="true"
    />
  );
}
