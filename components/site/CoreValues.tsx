"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Lightbulb, FlaskConical, ShieldCheck, Sprout, Globe, Handshake, Truck,
  Microscope, Leaf, Target, Users, Award, Recycle, LineChart, Scale, Heart,
  type LucideIcon,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";

export type CoreValue = {
  icon?: string;
  title?: string;
  text?: string;
  image?: { alt?: string };
};

const ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb, flask: FlaskConical, microscope: Microscope,
  shield: ShieldCheck, sprout: Sprout, leaf: Leaf, globe: Globe,
  handshake: Handshake, truck: Truck, target: Target, users: Users,
  award: Award, recycle: Recycle, chart: LineChart, scale: Scale, heart: Heart,
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Core values — checkerboard grid.
 *
 * Each value is a TEXT panel paired with an IMAGE panel. Pairs alternate
 * direction row by row, so text and image swap sides as you read down.
 * A small notch points from the image toward its text, tying the two
 * halves together — without it a checkerboard reads as eight unrelated
 * tiles rather than four pairs.
 *
 * Desktop is 4 columns (two pairs per row). Below that it collapses to
 * one pair per row, then to a stack, because a checkerboard on a phone
 * is just noise.
 */
export function CoreValues({
  title = "Core Values",
  values,
}: {
  title?: string;
  values: CoreValue[];
}) {
  if (!values?.length) return null;

  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-1/4 h-[560px] w-[560px] rounded-pill bg-leaf/[0.06] blur-3xl"
      />

      <Container className="relative">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center text-3xl lg:text-[length:var(--text-4xl)]"
        >
          {title}
        </motion.h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = ICONS[v.icon ?? ""] ?? Leaf;

            /* Two pairs per row on desktop; flip direction on odd rows */
            const rowIndex = Math.floor(i / 2);
            const textFirst = rowIndex % 2 === 0;

            const textPanel = (
              <motion.div
                key={`t-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
                className="group relative flex flex-col justify-center bg-paper p-8 lg:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-field text-leaf transition-colors duration-500 group-hover:bg-leaf group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-navy">
                  {v.title}
                </h3>

                {v.text ? (
                  <p className="mt-3 text-sm text-stone">{v.text}</p>
                ) : null}
              </motion.div>
            );

            const imagePanel = (
              <motion.div
                key={`i-${i}`}
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: (i % 2) * 0.1, ease: EASE }}
                className="group relative min-h-[240px] overflow-hidden bg-sage lg:min-h-[280px]"
              >
                {v.image ? (
               <Image
  src={urlFor(v.image as never).width(800).height(800).fit("crop").url()}
  alt={v.image.alt || v.title || ""}
  fill
  priority={i < 2}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
/>
                ) : null}

                {/* Notch pointing back at the paired text panel */}
                <span
                  aria-hidden
                  className={[
                    "absolute top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[14px] border-y-transparent sm:block",
                    textFirst
                      ? "left-0 border-l-[14px] border-l-paper"
                      : "right-0 border-r-[14px] border-r-paper",
                  ].join(" ")}
                />
              </motion.div>
            );

            return textFirst
              ? [textPanel, imagePanel]
              : [imagePanel, textPanel];
          })}
        </div>
      </Container>
    </section>
  );
}
