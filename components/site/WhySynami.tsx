"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

type Item = { title?: string; text?: string };

export function WhySynami({
  eyebrow,
  heading,
  intro,
  items,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items: Item[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-paper py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            {eyebrow ? (
              <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-4 text-3xl">{heading}</h2>
            {intro ? <p className="mt-6 text-stone">{intro}</p> : null}
          </div>

          <ul className="border-t border-line">
            {items.map((r, i) => (
              <motion.li
                key={r.title ?? i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-b border-line"
              >
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
                    {r.text ? <p className="mt-2 text-stone">{r.text}</p> : null}
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
