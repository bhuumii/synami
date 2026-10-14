"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type PageSection = {
  heading?: string;
  body?: unknown;
  image?: { alt?: string };
};

export type Highlight = { title?: string; text?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Alternating content sections.
 *
 * The image sits in a leaf-shaped frame — two opposite corners rounded
 * heavily, two left square. That shape mirrors on every other row, so the
 * alternation reads as intentional rhythm rather than a repeated template.
 * It's also thematically right for an agriscience company, which a plain
 * rectangle or a generic circle is not.
 *
 * Behind it, an offset forest panel in the same shape slides out as you
 * scroll. That's the depth effect from the reference, rebuilt in the site's
 * own palette instead of lime green.
 *
 * Motion is composed, not sprayed: panel first, then image, then text,
 * each from the direction it will settle in. One movement per row.
 */
export function PageBody({
  sections = [],
  highlights = [],
}: {
  sections?: PageSection[];
  highlights?: Highlight[];
}) {
  return (
    <>
      {sections.map((s, i) => {
        const tone = i % 2 === 0 ? "bg-paper" : "bg-field";
        const flip = i % 2 === 1;

        /* No image: narrow single column. The right measure for reading,
           and it stops a text-only section pretending to be a feature. */
        if (!s.image) {
          return (
            <section key={i} className={`${tone} py-14 md:py-20 lg:py-28`}>
              <Container width="narrow">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {s.heading ? (
                    <h2 className="text-2xl">
                      <span className="mr-3 font-display text-sm tabular-nums text-leaf">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </h2>
                  ) : null}
                  <div className="mt-7">
                    <RichText value={s.body} />
                  </div>
                </motion.div>
              </Container>
            </section>
          );
        }

        /* Leaf shape, mirrored on alternate rows */
        const shape = flip
          ? "rounded-[18px_140px_18px_140px]"
          : "rounded-[140px_18px_140px_18px]";

        return (
          <section key={i} className={`${tone} overflow-hidden py-16 md:py-24 lg:py-32`}>
            <Container>
              <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
                {/* ---------- Text ---------- */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                  className={flip ? "lg:order-2" : undefined}
                >
                  <span className="font-display text-xs tabular-nums tracking-[0.2em] text-leaf">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {s.heading ? (
                    <h2 className="mt-4 text-2xl">{s.heading}</h2>
                  ) : null}

                  {/* Short accent rule, flipped with the layout */}
                  <span
                    aria-hidden
                    className="mt-6 block h-[3px] w-14 bg-straw"
                  />

                  <div className="mt-6">
                    <RichText value={s.body} />
                  </div>
                </motion.div>

                {/* ---------- Image + offset panel ---------- */}
                <div
                  className={`relative ${flip ? "lg:order-1" : ""}`}
                >
                  {/* The panel behind. Slides out from under the image. */}
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, x: flip ? -40 : 40, y: 40 }}
                    whileInView={{ opacity: 1, x: flip ? -22 : 22, y: 22 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className={`absolute inset-0 hidden bg-forest/90 sm:block ${shape}`}
                  />

                  {/* A second, fainter panel for depth on the far side */}
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.1, ease: EASE }}
                    className={`absolute -inset-3 hidden border border-leaf/25 lg:block ${shape}`}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                    className={`relative aspect-[4/3] overflow-hidden bg-sage shadow-[var(--shadow-lift)] ${shape}`}
                  >
                    <Image
                      src={urlFor(s.image as never)
                        .width(1200)
                        .height(900)
                        .fit("crop")
                        .url()}
                      alt={s.image.alt || s.heading || ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ---------- Highlight cards ---------- */}
      {highlights.length > 0 ? (
        <section
          className={`relative overflow-hidden ${
            sections.length % 2 === 0 ? "bg-paper" : "bg-field"
          } py-16 md:py-24 lg:py-28`}
        >
          {/* Soft off-canvas light so the band isn't a flat rectangle */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-pill bg-leaf/[0.07] blur-3xl"
          />

          <Container className="relative">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title ?? i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  className="lift group relative overflow-hidden rounded-card border border-line bg-paper p-8"
                >
                  {/* Green bar grows down the left edge on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <span className="font-display text-xs tabular-nums text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                    {h.title}
                  </h3>
                  {h.text ? (
                    <p className="mt-2.5 text-sm text-stone">{h.text}</p>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
