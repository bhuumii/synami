"use client";

import { motion } from "motion/react";

/**
 * Scroll reveal.
 *
 * Used deliberately, NOT on every section. When everything fades up the page
 * feels templated and the effect stops meaning anything. Roughly one reveal
 * per screenful is the ceiling.
 *
 * `once` is true so content never re-animates when scrolling back up — that
 * re-trigger is one of the most irritating patterns on the web.
 *
 * Motion respects prefers-reduced-motion automatically via the CSS override
 * in globals.css, and the element's resting state is fully visible, so a
 * reader with motion disabled loses nothing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
