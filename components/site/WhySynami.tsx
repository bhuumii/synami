"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    title: "Science driven",
    text: "We focus on technical understanding and application-oriented agricultural solutions.",
  },
  {
    title: "Quality focused",
    text: "Quality is integrated across sourcing, manufacturing and product development.",
  },
  {
    title: "Customer centric",
    text: "We build solutions around the specific needs of our customers and market partners.",
  },
  {
    title: "Agile and responsive",
    text: "Our approach enables faster decision-making and customized business solutions.",
  },
  {
    title: "Global outlook",
    text: "We aim to build long-term partnerships across domestic and international agricultural markets.",
  },
];

/**
 * v2: sits on white so it reads as a raised block against the pale green
 * sections above and below it. Rows now respond to hover — a green bar
 * grows down the left edge and the row shifts slightly right.
 *
 * Still deliberately NOT five cards in a grid. Five always orphans one item
 * in the last row, and the usual fix is padding it to six with filler.
 */
export function WhySynami() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
              Why Synami
            </p>
            <h2 className="mt-4 text-3xl">
              What partners get when they work with us
            </h2>
            <p className="mt-6 text-stone">
              Five things we hold ourselves to on every product, in every
              market.
            </p>
          </div>

          <ul className="border-t border-line">
            {reasons.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-line"
              >
                {/* Green bar grows down the left edge on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />

                <div className="grid grid-cols-[auto_1fr] gap-x-6 py-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-field/60 group-hover:pl-6 md:gap-x-10">
                  <span className="pt-1 font-display text-sm tabular-nums text-slate transition-colors duration-300 group-hover:text-leaf">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-leaf">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-stone">{r.text}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
