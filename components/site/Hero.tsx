"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * v2: the overlay is deep forest green, not navy.
 *
 * Because the video is tinted green rather than blue, the hero now belongs
 * to the same family as every section beneath it. This was the biggest
 * single cause of the page feeling like it changed palette as you scrolled.
 */
export function Hero() {
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
          className="max-w-[20ch]"
        >
          <h1 className="rule-straw font-display text-[length:var(--text-hero)] font-semibold text-white">
            Advancing agriculture, enabling growth
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[46ch] text-lg text-white/85"
        >
          Innovative agriscience solutions for a sustainable future. Crop
          protection, fertilizers and biostimulants, built on science.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/products" variant="onDark">
            Explore products
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
          >
            Partner with us
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
