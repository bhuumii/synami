"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Cta = { label?: string; href?: string };

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
    <section className="bg-paper py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            {eyebrow ? (
              <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-4 text-3xl">{heading}</h2>
            {body ? <p className="mt-6">{body}</p> : null}
            {note ? <p className="mt-4 text-sm text-slate">{note}</p> : null}
            {cta?.label ? (
              <Button href={cta.href || "/capabilities/global-business"} variant="outline" className="mt-9">
                {cta.label}
              </Button>
            ) : null}
          </div>

          {regions.length > 0 ? (
            <ul className="border-t border-line">
              {regions.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline justify-between border-b border-line py-5"
                >
                  <span className="font-display text-xl font-medium text-navy transition-colors group-hover:text-leaf md:text-2xl">
                    {r}
                  </span>
                  <span className="font-display text-xs tabular-nums text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
