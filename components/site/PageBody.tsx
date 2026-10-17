"use client";

import { motion } from "motion/react";
import {
  Lightbulb, FlaskConical, ShieldCheck, Sprout, Globe, Handshake, Truck,
  Microscope, Leaf, Target, Users, Award, Recycle, LineChart, Scale, Heart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AlternatingRow, type RowItem, EASE } from "@/components/site/AlternatingRow";

export type PageSection = RowItem;
export type Highlight = { title?: string; text?: string; icon?: string };

export const ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb, flask: FlaskConical, microscope: Microscope,
  shield: ShieldCheck, sprout: Sprout, leaf: Leaf, globe: Globe,
  handshake: Handshake, truck: Truck, target: Target, users: Users,
  award: Award, recycle: Recycle, chart: LineChart, scale: Scale, heart: Heart,
};

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
        <AlternatingRow
          key={i}
          item={s}
          flip={i % 2 === 1}
          tone={i % 2 === 0 ? "bg-paper" : "bg-field"}
        />
      ))}

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
                    <motion.span
                      initial={{ scale: 0, rotate: -25 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.08,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-pill border-4 border-paper bg-field text-leaf shadow-[var(--shadow-rest)] transition-colors duration-500 group-hover:bg-leaf group-hover:text-white"
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
