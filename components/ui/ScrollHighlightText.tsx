"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * One word. Brightens as the reader's scroll position passes it.
 *
 * Each word owns a slice of the parent's scroll progress, so the
 * highlight travels through the sentence at reading pace rather than the
 * whole block fading in at once.
 */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);

  return (
    <span className="relative mr-[0.28em] inline-block">
      {/* Ghost underneath keeps the layout and gives the dimmed state a
          floor, so unread words are faint rather than invisible. */}
      <span className="absolute inset-0 opacity-20" aria-hidden>
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/**
 * Scroll-linked text highlight.
 *
 * The paragraph starts dim and lights up word by word as it moves
 * through the viewport — so the reader's eye and the animation travel
 * together instead of the animation finishing before they start reading.
 *
 * Works in both directions, because it tracks position rather than
 * playing an entrance. Scroll back up and the highlight retreats.
 *
 * Used once, on the lead paragraph. Doing this to every paragraph would
 * make the page tiring to read.
 */
export function ScrollHighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}
