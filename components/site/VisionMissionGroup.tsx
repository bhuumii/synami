"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type VMPoint = {
  heading?: string;
  body?: unknown;
  image?: { alt?: string };
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One point in the list. Reports to the parent when it reaches the
 * middle of the viewport so the sticky image can swap to match.
 *
 * The `-45% 0px -45% 0px` margin shrinks the detection zone to a thin
 * band across the centre of the screen — without it two points are "in
 * view" at once and the image flickers between them.
 */
function Point({
  point,
  index,
  onActive,
  isActive,
}: {
  point: VMPoint;
  index: number;
  onActive: (i: number) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative pb-14 pl-10 last:pb-0 lg:min-h-[46vh] lg:pb-20">
      {/* Rail dot */}
      <span
        aria-hidden
        className={[
          "absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-pill border-2 bg-paper transition-all duration-500",
          isActive ? "border-leaf" : "border-line",
        ].join(" ")}
      >
        <span
          className={[
            "h-2 w-2 rounded-pill transition-all duration-500",
            isActive ? "scale-100 bg-leaf" : "scale-0 bg-transparent",
          ].join(" ")}
        />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span
          className={[
            "font-display text-sm tabular-nums tracking-[0.18em] transition-colors duration-500",
            isActive ? "text-leaf" : "text-slate",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className={[
            "mt-3 font-display text-xl font-semibold leading-snug transition-colors duration-500 lg:text-2xl",
            isActive ? "text-leaf" : "text-navy",
          ].join(" ")}
        >
          {point.heading}
        </h3>

        {/* Mobile image — the sticky panel is desktop only */}
        {point.image ? (
          <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-card bg-sage lg:hidden">
            <Image
              src={urlFor(point.image as never).width(900).height(560).fit("crop").url()}
              alt={point.image.alt || point.heading || ""}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mt-4 [&_p]:text-[17px] [&_p]:leading-relaxed">
          <RichText value={point.body} />
        </div>
      </motion.div>
    </li>
  );
}

/**
 * Vision or Mission — sticky image, scrolling list.
 *
 * The alternating-row layout works for two or three long sections. With
 * five short points it produces five near-identical rows and five large
 * headings, which is what made this page feel repetitive.
 *
 * Here one image panel holds on the left and cross-fades as each point
 * reaches the middle of the screen, while a vertical rail tracks
 * progress. The reading column stays put, so the eye isn't thrown left
 * and right five times.
 *
 * `tone` lets the page alternate the background between the two groups.
 */
export function VisionMissionGroup({
  eyebrow,
  heading,
  intro,
  points,
  tone = "bg-paper",
  flip = false,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  points: VMPoint[];
  tone?: string;
  flip?: boolean;
}) {
  const [active, setActive] = useState(0);
  if (!points?.length) return null;

  return (
    <section className={`${tone} py-16 md:py-20 lg:py-28`}>
      <Container>
        {/* Group header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-[64ch] text-center"
        >
        {eyebrow ? (
            <span className="inline-flex items-center gap-2.5 rounded-pill border border-leaf/25 bg-leaf/[0.07] px-4 py-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-leaf" />
              <span className="font-display text-xs font-medium uppercase tracking-[0.18em] text-leaf">
                {eyebrow}
              </span>
            </span>
          ) : null}
          <h2 className="mt-5 text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
            {heading}
          </h2>
            <span aria-hidden className="mx-auto mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36" />
          {intro ? <p className="mt-6 text-lg leading-relaxed">{intro}</p> : null}
        </motion.div>

        <div
          className={[
            "mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-20",
            flip ? "lg:[&>*:first-child]:order-2" : "",
          ].join(" ")}
        >
          {/* ---------- Sticky image ---------- */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sage shadow-[var(--shadow-lift)]">
                {points.map((p, i) =>
                  p.image ? (
                    <motion.div
                      key={i}
                      aria-hidden={active !== i}
                      initial={false}
                      animate={{
                        opacity: active === i ? 1 : 0,
                        scale: active === i ? 1 : 1.06,
                      }}
                      transition={{ duration: 0.75, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={urlFor(p.image as never).width(1000).height(1250).fit("crop").url()}
                        alt={p.image.alt || p.heading || ""}
                        fill
                        sizes="45vw"
                        className="object-cover"
                      />
                    </motion.div>
                  ) : null
                )}

                {/* Caption strip, so the image is always labelled */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 via-forest/50 to-transparent p-7 pt-16">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="font-display text-lg font-semibold text-white"
                  >
                    {points[active]?.heading}
                  </motion.p>
                </div>
              </div>

              {/* Progress segments */}
              <div className="mt-5 flex gap-2">
                {points.map((_, i) => (
                  <span
                    key={i}
                    className={[
                      "h-[3px] flex-1 rounded-pill transition-colors duration-500",
                      i <= active ? "bg-leaf" : "bg-line",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Points ---------- */}
          <ol className="relative">
            {/* Vertical rail behind the dots */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[9px] top-2 w-px bg-line"
            />
            {points.map((p, i) => (
              <Point
                key={p.heading ?? i}
                point={p}
                index={i}
                isActive={active === i}
                onActive={setActive}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
