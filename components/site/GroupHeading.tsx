"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A labelled divider between groups of rows — "Our Vision", "Our Mission".
 *
 * Centred and set large, with a short rule above it, so it reads as a
 * chapter break rather than another section heading competing with the
 * ones inside each row.
 */
export function GroupHeading({
  eyebrow,
  heading,
  intro,
  tone = "bg-field",
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  tone?: string;
}) {
  if (!heading) return null;

  return (
    <section className={`${tone} pb-4 pt-16 md:pb-6 md:pt-24 lg:pt-28`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-[62ch] text-center"
        >
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto block h-[3px] w-16 origin-center bg-straw"
          />

          {eyebrow ? (
            <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-leaf">
              {eyebrow}
            </p>
          ) : null}

          <h2 className="mt-3 text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
            {heading}
          </h2>

          {intro ? <p className="mx-auto mt-6">{intro}</p> : null}
        </motion.div>
      </Container>
    </section>
  );
}
