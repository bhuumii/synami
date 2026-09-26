"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const regions = [
  "Latin America",
  "Africa",
  "Southeast Asia",
  "Middle East",
  "Other Emerging Markets",
];

/**
 * Regions are set as oversized type rather than pins on a world map.
 *
 * A decorative map is the default move here and it says nothing — Synami is
 * building presence, not claiming 40 offices. Large restrained type states
 * the ambition honestly and looks considerably more expensive.
 */
export function GlobalVision() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
              Global vision
            </p>
            <h2 className="mt-4 text-3xl">From India to global agriculture</h2>
            <p className="mt-6">
              Synami Agriscience is building capabilities to serve agricultural
              businesses across multiple international markets, working with
              importers, distributors, manufacturers and agricultural
              businesses.
            </p>
            <p className="mt-4 text-sm text-slate">
              International market presence and country-specific availability
              may vary.
            </p>
            <Button
              href="/capabilities/global-business"
              variant="outline"
              className="mt-9"
            >
              Explore our global business
            </Button>
          </div>

          <ul className="border-t border-line">
            {regions.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
        </div>
      </Container>
    </section>
  );
}
