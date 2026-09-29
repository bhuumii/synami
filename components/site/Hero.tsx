"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Cta = { label?: string; href?: string };

/**
 * Hero.
 *
 * NOTE on the max-width: it sits on the <h1>, NOT on the wrapper.
 * `ch` resolves against the element's own font-size, so putting `20ch` on
 * the wrapper measured it against inherited 17px body text — about 170px —
 * and crushed the 88px headline into a narrow column. On the h1 itself,
 * 13ch measures against the headline's own size and gives a sane line
 * length at every viewport.
 */
export function Hero({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
}: {
  heading?: string;
  subheading?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="overlay-forest absolute inset-0" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="rule-straw max-w-[13ch] font-display text-[length:var(--text-hero)] font-semibold text-white">
            {heading ?? "Advancing agriculture, enabling growth"}
          </h1>
        </motion.div>

        {subheading ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[46ch] text-lg text-white/85"
          >
            {subheading}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {primaryCta?.label ? (
            <Button href={primaryCta.href || "/products"} variant="onDark">
              {primaryCta.label}
            </Button>
          ) : null}
          {secondaryCta?.label ? (
            <Button
              href={secondaryCta.href || "/contact"}
              variant="outline"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
