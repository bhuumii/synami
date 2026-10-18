"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Step = { title?: string; text?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

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

  return (
    <section className="bg-field py-20 md:py-28 lg:py-32">
      <Container>
         <div>
          <Eyebrow>{eyebrow ?? "Our approach"}</Eyebrow>
                   <h2 className="mt-5 max-w-[20ch] text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
            {heading}
          </h2>
          <span
            aria-hidden
            className="mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36"
          />
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-line lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-leaf"
            />
          </div>

          <ol className={`grid gap-10 ${cols} md:gap-6`}>
            {steps.map((s, i) => (
              <li key={s.title ?? i} className="relative">
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
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.22, ease: EASE }}
                  className="mt-7"
                >
                  <div className="lift group h-full rounded-card border border-line bg-paper p-7">
                    <span className="font-display text-xs tabular-nums tracking-[0.18em] text-slate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold text-navy transition-colors group-hover:text-leaf">
                      {s.title}
                    </h3>
                    {s.text ? (
                      <p className="mt-2.5 text-[15px] leading-relaxed text-stone">
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
