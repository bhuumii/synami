"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Cta = { label?: string; href?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero.
 *
 * HEIGHT: `min-h-[100svh]` — small viewport height. On mobile, `100vh`
 * measures the viewport as if the browser's address bar were hidden, so
 * the section runs taller than the screen and the next band peeks in at
 * the bottom. `svh` measures with the bar SHOWN, which is the state the
 * page actually loads in. `min-h` rather than `h` so the section can
 * still grow if the headline wraps on a very narrow screen.
 *
 * TEXT: the headline is split into words, each sitting in its own
 * overflow-hidden box and rising into place with a stagger. That reads
 * as typesetting rather than a generic fade, and it degrades to nothing
 * visible under prefers-reduced-motion.
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
  const text = heading ?? "Advancing agriculture, enabling growth";
  const words = text.split(" ");

  return (
    <section
      data-hero="dark"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pt-36"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="overlay-forest absolute inset-0" />

      <Container className="relative z-10">
        {/* Headline — word by word */}
        <h1 className="max-w-[13ch] font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] text-white">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.075, ease: EASE }}
                className="inline-block"
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Accent rule draws out from the left */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 + words.length * 0.075, ease: EASE }}
          className="mt-8 block h-1 w-28 origin-left rounded-pill bg-straw md:w-36"
        />

        {subheading ? (
          <motion.p
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25 + words.length * 0.075,
              ease: EASE,
            }}
            className="mt-7 max-w-[48ch] text-lg leading-relaxed text-white/85"
          >
            {subheading}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.42 + words.length * 0.075,
            ease: EASE,
          }}
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
