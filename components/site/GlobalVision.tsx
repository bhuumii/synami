"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Cta = { label?: string; href?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function GlobalVision({
  eyebrow,
  heading,
  body,
  note,
  regions,
  cta,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  note?: string;
  regions: string[];
  cta?: Cta;
}) {
  return (
    <section className="bg-paper py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow>{eyebrow ?? "Global vision"}</Eyebrow>
            <h2 className="mt-5 text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
              {heading}
            </h2>
            <span
              aria-hidden
              className="mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36"
            />
            {body ? <p className="mt-7 text-lg leading-relaxed">{body}</p> : null}
            {note ? <p className="mt-4 text-sm text-slate">{note}</p> : null}
            {cta?.label ? (
              <Button
                href={cta.href || "/capabilities/global-business"}
                variant="outline"
                className="mt-9"
              >
                {cta.label}
              </Button>
            ) : null}
          </div>

          {regions.length > 0 ? (
            <ul className="border-t border-line lg:mt-3">
              {regions.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                  className="group relative border-b border-line"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <div className="flex items-baseline justify-between gap-6 py-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pl-5">
                    <span className="font-display text-xl font-medium text-navy transition-colors group-hover:text-leaf md:text-2xl">
                      {r}
                    </span>
                    <span className="font-display text-xs tabular-nums text-slate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
