"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Item = { title?: string; text?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <section className="bg-paper py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{eyebrow ?? "Why Synami"}</Eyebrow>
            <h2 className="mt-5 text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
              {heading}
            </h2>
            <span
              aria-hidden
              className="mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36"
            />
            {intro ? (
              <p className="mt-7 text-lg leading-relaxed text-stone">{intro}</p>
            ) : null}
          </div>

          <ul className="border-t border-line">
            {items.map((r, i) => (
              <motion.li
                key={r.title ?? i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className="group relative border-b border-line"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />
                <div className="grid grid-cols-[auto_1fr] gap-x-6 py-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-field/60 group-hover:pl-6 md:gap-x-10">
                  <span className="pt-1 font-display text-sm tabular-nums text-slate transition-colors duration-300 group-hover:text-leaf">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-leaf">
                      {r.title}
                    </h3>
                    {r.text ? (
                      <p className="mt-2.5 text-[17px] leading-relaxed text-stone">
                        {r.text}
                      </p>
                    ) : null}
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
