"use client";

interface MarqueeProps {
  items: string[];
}

/**
 * Seamless, infinitely scrolling row of pills. The list is duplicated so the
 * -50% translate loops without a visible seam. Pauses on hover.
 */
export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mr-3 whitespace-nowrap rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm dark:border-primary-dark/20 dark:bg-slate-800/60 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
