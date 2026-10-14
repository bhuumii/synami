"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Lightbulb, FlaskConical, ShieldCheck, Sprout, Globe, Handshake,
  Truck, Microscope, Leaf, Target, Users, Award, Recycle, LineChart,
  type LucideIcon,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type PageSection = {
  heading?: string;
  body?: unknown;
  image?: { alt?: string };
};

export type Highlight = { title?: string; text?: string; icon?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Icon names the client can choose in Sanity, mapped to components. */
const ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  flask: FlaskConical,
  shield: ShieldCheck,
  sprout: Sprout,
  globe: Globe,
  handshake: Handshake,
  truck: Truck,
  microscope: Microscope,
  leaf: Leaf,
  target: Target,
  users: Users,
  award: Award,
  recycle: Recycle,
  chart: LineChart,
};

/**
 * One alternating row.
 *
 * Split into its own component so each row can own a scroll tracker —
 * React hooks can't be called inside a .map().
 *
 * The image drifts about 60px as the row passes through the viewport.
 * Small on purpose: enough to feel alive, not enough to notice as an
 * effect. Parallax that announces itself is the kind that ages badly.
 */
function AlternatingRow({ s, i }: { s: PageSection; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const panelY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const flip = i % 2 === 1;
  const tone = i % 2 === 0 ? "bg-paper" : "bg-field";

  if (!s.image) {
    return (
      <section className={`${tone} py-14 md:py-20 lg:py-28`}>
        <Container width="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {s.heading ? <h2 className="text-3xl">{s.heading}</h2> : null}
            <span aria-hidden className="mt-6 block h-[3px] w-14 bg-straw" />
            <div className="mt-7">
              <RichText value={s.body} />
            </div>
          </motion.div>
        </Container>
      </section>
    );
  }

  const shape = flip
    ? "rounded-[18px_150px_18px_150px]"
    : "rounded-[150px_18px_150px_18px]";

  return (
    <section ref={ref} className={`${tone} overflow-hidden py-16 md:py-24 lg:py-32`}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* ---------- Text ---------- */}
          <motion.div
            initial={{ opacity: 0, x: flip ? 44 : -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className={flip ? "lg:order-2" : undefined}
          >
            {s.heading ? (
              <h2 className="text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
                {s.heading}
              </h2>
            ) : null}

            <span aria-hidden className="mt-7 block h-[3px] w-14 bg-straw" />

            <div className="mt-7">
              <RichText value={s.body} />
            </div>
          </motion.div>

          {/* ---------- Image + offset panels ---------- */}
          <div className={`relative ${flip ? "lg:order-1" : ""}`}>
            <motion.span
              aria-hidden
              style={{ y: panelY }}
              initial={{ opacity: 0, x: flip ? -44 : 44 }}
              whileInView={{ opacity: 1, x: flip ? -24 : 24 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.95, ease: EASE }}
              className={`absolute inset-0 hidden bg-forest/90 sm:block ${shape}`}
            />

            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className={`absolute -inset-4 hidden border border-leaf/25 lg:block ${shape}`}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className={`relative aspect-[4/3] overflow-hidden bg-sage shadow-[var(--shadow-lift)] ${shape}`}
            >
              <motion.div style={{ y: imageY }} className="absolute -inset-y-10 inset-x-0">
                <Image
                  src={urlFor(s.image as never).width(1200).height(1100).fit("crop").url()}
                  alt={s.image.alt || s.heading || ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PageBody({
  sections = [],
  highlights = [],
}: {
  sections?: PageSection[];
  highlights?: Highlight[];
}) {
  return (
    <>
      {sections.map((s, i) => (
        <AlternatingRow key={i} s={s} i={i} />
      ))}

      {/* ---------- Highlight cards ---------- */}
      {highlights.length > 0 ? (
        <section
          className={`relative overflow-hidden ${
            sections.length % 2 === 0 ? "bg-paper" : "bg-field"
          } py-16 md:py-24 lg:py-28`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-pill bg-leaf/[0.07] blur-3xl"
          />

          <Container className="relative">
            {/* pt-8 leaves room for the icon circle, which sits half
                outside the top edge of each card. */}
            <div className="grid gap-x-6 gap-y-16 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => {
                const Icon = ICONS[h.icon ?? ""] ?? Leaf;
                return (
                  <motion.div
                    key={h.title ?? i}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                    className="lift group relative rounded-card border border-line bg-paper px-7 pb-8 pt-14 text-center"
                  >
                    {/* Icon medallion, straddling the top edge. Pops in
                        after the card with a slight overshoot so it reads
                        as landing rather than fading. */}
                    <motion.span
                      initial={{ scale: 0, rotate: -25 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.08,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-pill border-4 border-paper bg-field text-leaf shadow-[var(--shadow-rest)] transition-colors duration-400 group-hover:bg-leaf group-hover:text-white"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>

                    <h3 className="font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                      {h.title}
                    </h3>
                    {h.text ? (
                      <p className="mx-auto mt-3 text-sm text-stone">{h.text}</p>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
