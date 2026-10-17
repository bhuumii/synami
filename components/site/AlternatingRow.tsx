"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type RowItem = {
  heading?: string;
  body?: unknown;
  image?: { alt?: string };
};

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One alternating content row.
 *
 * Lives in its own file because three pages use it — About, Insights and
 * Vision & Mission — and because each row needs its own scroll tracker,
 * which React hooks can't do inside a .map().
 *
 * The image sits in a leaf shape that mirrors on alternate rows, with an
 * offset forest panel behind it. Both drift in opposite directions as the
 * row passes the viewport; that counter-motion is what sells the depth.
 *
 * `tone` and `flip` are passed in rather than derived, so a page can run
 * several groups of rows and keep the alternation continuous across them.
 */
export function AlternatingRow({
  item,
  flip,
  tone,
}: {
  item: RowItem;
  flip: boolean;
  tone: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const panelY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  if (!item.image) {
    return (
      <section ref={ref} className={`${tone} py-14 md:py-20 lg:py-24`}>
        <Container width="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {item.heading ? <h2 className="text-3xl">{item.heading}</h2> : null}
            <span aria-hidden className="mt-6 block h-[3px] w-14 bg-straw" />
            <div className="mt-7">
              <RichText value={item.body} />
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
    <section ref={ref} className={`${tone} overflow-hidden py-16 md:py-24 lg:py-28`}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: flip ? 44 : -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className={flip ? "lg:order-2" : undefined}
          >
            {item.heading ? (
              <h2 className="text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
                {item.heading}
              </h2>
            ) : null}
            <span aria-hidden className="mt-7 block h-[3px] w-14 bg-straw" />
            <div className="mt-7">
              <RichText value={item.body} />
            </div>
          </motion.div>

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
                  src={urlFor(item.image as never).width(1200).height(1100).fit("crop").url()}
                  alt={item.image.alt || item.heading || ""}
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
