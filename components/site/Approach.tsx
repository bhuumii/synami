"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Step = { title?: string; text?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Our approach — a process, drawn once.
 *
 * The rail draws left to right in one pass, and each dot lands as the
 * line reaches it. Tying the fill to scroll position was worse: it only
 * looked right at one scrolling speed and stalled half-drawn the rest of
 * the time.
 *
 * Markers are dots rather than numbers — the left-to-right draw already
 * says "in this order", so numbering it twice is redundant.
 */
export function Approach({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow?: string;
  heading?: string;
  steps: Step[];
}) {
  if (steps.length === 0) return null;

  const cols =
    steps.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : steps.length === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  /* The rail takes 1.3s; each dot lands at its share of that. */
  const dotDelay = (i: number) => 0.2 + (i / Math.max(steps.length - 1, 1)) * 1.1;

  return (
    <section className="bg-field py-20 md:py-28 lg:py-32">
      <Container>
        <div>
          <Eyebrow>{eyebrow ?? "Our approach"}</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
            {heading}
          </h2>
          <span
            aria-hidden
            className="mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36"
          />
        </div>

        <div className="relative mt-16 lg:mt-20">
          {/* ---------- Horizontal rail (desktop) ---------- */}
          <div className="absolute left-0 right-0 top-[11px] hidden h-[3px] overflow-hidden rounded-pill bg-line lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full rounded-pill bg-gradient-to-r from-leaf to-leaf-bright"
            />
          </div>

          {/* ---------- Vertical rail (mobile) ---------- */}
          <div className="absolute bottom-0 left-[11px] top-2 w-[3px] overflow-hidden rounded-pill bg-line lg:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="h-full w-full rounded-pill bg-gradient-to-b from-leaf to-leaf-bright"
            />
          </div>

          <ol className={`grid gap-10 ${cols} lg:gap-6`}>
            {steps.map((s, i) => (
              <li key={s.title ?? i} className="group relative pl-11 lg:pl-0">
                {/* Dot, landing as the rail reaches it */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.45,
                    delay: dotDelay(i),
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute left-0 top-0 block lg:static"
                >
                  <span className="relative block h-[25px] w-[25px]">
                    {/* Soft halo that grows on hover */}
                    <span className="absolute inset-0 scale-75 rounded-pill bg-leaf/15 transition-transform duration-500 group-hover:scale-125" />
                    {/* Ring */}
                    <span className="absolute inset-[3px] rounded-pill border-[3px] border-field bg-leaf transition-colors duration-300 group-hover:bg-leaf-bright" />
                  </span>
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, delay: dotDelay(i) + 0.1, ease: EASE }}
                  className="lg:mt-8"
                >
                  <div className="lift h-full rounded-card border border-line bg-paper p-7 transition-colors duration-500 group-hover:border-leaf/35">
                    <h3 className="font-display text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-leaf">
                      {s.title}
                    </h3>
                    {s.text ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-stone">
                        {s.text}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
