"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

export type Region = { title?: string; text?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/* The drawing area. HTML overlays are positioned as percentages of these
   numbers, and the container holds the same aspect ratio, so the dots sit
   exactly on the ends of the SVG paths at any width. */
const W = 600;
const H = 420;

/** Origin — India. Every route starts here. */
const HUB = { x: 96, y: 348 };

/**
 * Fixed destinations rather than randomised ones.
 *
 * Genuinely random positions look accidental and change on every render,
 * which makes the section feel unstable. These are hand-placed to spread
 * across the canvas without any two labels colliding.
 */
const NODES = [
  { x: 300, y: 78 },
  { x: 487, y: 128 },
  { x: 232, y: 196 },
  { x: 523, y: 268 },
  { x: 372, y: 330 },
  { x: 160, y: 108 },
  { x: 444, y: 384 },
  { x: 86, y: 212 },
];

/** Quadratic curve that bows away from the straight line, like a flight path. */
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  /* Perpendicular offset, scaled to the distance so short hops bow less */
  const bow = Math.min(len * 0.22, 70);
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

/**
 * Global reach — a schematic route map.
 *
 * Deliberately NOT a world map. Synami is building presence, not claiming
 * offices in eight countries, and a real map invites the reader to check
 * whether the pins are where they say they are. An abstract set of routes
 * leaving one origin says "we're reaching outward" without overclaiming.
 *
 * Routes draw themselves in sequence, then each destination lands. Hover
 * either the map or the list and both highlight together, so the two
 * halves read as one object.
 *
 * Below lg the map is hidden entirely — eight labels on a phone is
 * unreadable — and the list carries the content on its own.
 */
export function RegionMap({
  title = "Our international focus",
  intro,
  regions,
}: {
  title?: string;
  intro?: string;
  regions: Region[];
}) {
  const [active, setActive] = useState<number | null>(null);

  if (!regions?.length) return null;

  const items = regions.slice(0, NODES.length);

  return (
    <section className="relative overflow-hidden bg-forest py-16 text-white md:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-52 top-0 h-[560px] w-[560px] rounded-pill bg-leaf-bright/10 blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="max-w-[22ch] text-3xl text-white lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
            {title}
          </h2>
          <span aria-hidden className="mt-7 block h-[3px] w-14 bg-straw" />
          {intro ? <p className="mt-7 max-w-[52ch] text-white/75">{intro}</p> : null}
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* ---------------- Map ---------------- */}
          <div
            className="relative hidden lg:block"
            style={{ aspectRatio: `${W} / ${H}` }}
            onMouseLeave={() => setActive(null)}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              {items.map((_, i) => {
                const isOn = active === i;
                return (
                  <motion.path
                    key={i}
                    d={arc(HUB, NODES[i])}
                    fill="none"
                    stroke={isOn ? "#2FB14C" : "rgba(255,255,255,0.3)"}
                    strokeWidth={isOn ? 2 : 1.25}
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 + i * 0.13,
                      ease: EASE,
                    }}
                    style={{ transition: "stroke 300ms, stroke-width 300ms" }}
                  />
                );
              })}
            </svg>

            {/* Origin */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(HUB.x / W) * 100}%`, top: `${(HUB.y / H) * 100}%` }}
            >
              <span className="relative flex items-center gap-2">
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute h-full w-full animate-ping rounded-pill bg-straw/50" />
                  <span className="relative h-3 w-3 rounded-pill bg-straw" />
                </span>
                <span className="whitespace-nowrap font-display text-sm font-semibold text-white">
                  India
                </span>
              </span>
            </motion.div>

            {/* Destinations */}
            {items.map((r, i) => {
              const n = NODES[i];
              const isOn = active === i;
              const rightSide = n.x > W * 0.55;

              return (
                <motion.button
                  key={r.title ?? i}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.9 + i * 0.13,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-left"
                  style={{
                    left: `${(n.x / W) * 100}%`,
                    top: `${(n.y / H) * 100}%`,
                    flexDirection: rightSide ? "row-reverse" : "row",
                  }}
                >
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border transition-all duration-300",
                      isOn
                        ? "border-leaf-bright bg-leaf-bright text-forest"
                        : "border-white/30 bg-white/10 text-white/80",
                    ].join(" ")}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={[
                      "whitespace-nowrap font-display text-sm transition-colors duration-300",
                      isOn ? "text-white" : "text-white/65",
                    ].join(" ")}
                  >
                    {r.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ---------------- List ---------------- */}
          <ul className="border-t border-white/15">
            {items.map((r, i) => {
              const isOn = active === i;
              return (
                <motion.li
                  key={r.title ?? i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="relative border-b border-white/15"
                >
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-y-0 left-0 w-[2px] origin-top bg-leaf-bright transition-transform duration-400",
                      isOn ? "scale-y-100" : "scale-y-0",
                    ].join(" ")}
                  />
                  <div
                    className={[
                      "py-4 transition-all duration-400",
                      isOn ? "pl-4" : "pl-0",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "font-display font-semibold transition-colors duration-300",
                        isOn ? "text-leaf-bright" : "text-white",
                      ].join(" ")}
                    >
                      {r.title}
                    </p>
                    {r.text ? (
                      <p className="mt-1.5 text-sm text-white/65">{r.text}</p>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
