"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    title: "Understand",
    text: "We start with the market, the crop and the commercial requirement.",
  },
  {
    title: "Develop",
    text: "Formulation work grounded in technical understanding, not guesswork.",
  },
  {
    title: "Validate",
    text: "Testing and evaluation against the specification the product must meet.",
  },
  {
    title: "Deliver",
    text: "Consistent supply, documented and traceable, at commercial scale.",
  },
];

/**
 * v2: the steps became white cards that sit ON the pale green.
 *
 * This is where the elevation system earns its place — white cards with a
 * green-tinted shadow read as raised off the surface, which is a far more
 * durable way to create hierarchy than switching the background colour
 * again. Hover lifts each card 3px.
 *
 * The rail still draws itself left to right, then the markers pop in behind
 * it. One composed movement, not four separate fades.
 */
export function Approach() {
  return (
    <section className="bg-field py-24 md:py-32">
      <Container>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
          Our approach
        </p>
        <h2 className="mt-4 max-w-[20ch] text-3xl">
          Market understanding, technical expertise, commercial agility
        </h2>

        <div className="relative mt-20">
          {/* The rail, behind the markers */}
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-line md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-leaf"
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.25 + i * 0.22,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="block h-[19px] w-[19px] rounded-pill border-[3px] border-field bg-leaf"
                />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.22 }}
                  className="mt-7"
                >
                  <div className="lift group h-full rounded-card border border-line bg-paper p-7">
                    <span className="font-display text-xs tabular-nums text-slate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone">{s.text}</p>
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
