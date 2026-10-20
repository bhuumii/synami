"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { NavSegment } from "@/lib/nav-types";

gsap.registerPlugin(ScrollTrigger);

/**
 * PINNED HORIZONTAL SCROLL — one card per Main Category.
 *
 * Travel distance is measured from scrollWidth rather than being fixed,
 * so adding a category in Sanity simply makes the track longer and the
 * pin recalculates. Below lg the track becomes a vertical stack; a
 * hijacked scroll on a touch device is unpleasant.
 */
export function BusinessSegments({
  eyebrow,
  heading,
  segments,
}: {
  eyebrow?: string;
  heading?: string;
  segments: NavSegment[];
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (segments.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      if (!el) return;

      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 120);
      if (distance() <= 0) return;

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [segments.length]);

  if (segments.length === 0) return null;

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-forest py-20 lg:h-screen lg:py-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 top-1/3 h-[560px] w-[560px] rounded-pill bg-leaf-bright/10 blur-3xl"
      />

      <div className="relative flex h-full flex-col justify-center">
        {/* Heading and the all-products link share a row, so the band
            doesn't open with a tall stack of text above the cards. */}
        <Container className="lg:pt-20">
          <div>
            <div>
              <Eyebrow tone="dark">{eyebrow ?? "Our products"}</Eyebrow>
              <h2 className="mt-4 max-w-[24ch] text-3xl text-white lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
                {heading}
              </h2>
            </div>

            
          </div>
        </Container>

        <div className="mt-10">
          <div
            ref={track}
            className="flex flex-col gap-6 px-6 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] lg:pr-24"
          >
            {segments.map((seg, i) => (
              <article
                key={seg._id}
                className="group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.05] p-7 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.09] md:max-w-[560px] md:p-8 lg:h-[min(52vh,420px)] lg:w-[420px] lg:max-w-none lg:p-10"
              >
                {/* Left edge lights up */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-leaf-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />

             

              

                                <h3 className="relative text-xl text-white lg:text-2xl">
                  {seg.title}
                </h3>

                {seg.shortDescription ? (
                  <p className="relative mt-4 text-sm leading-relaxed text-white/65">
                    {seg.shortDescription}
                  </p>
                ) : null}

                {seg.categories.length > 0 ? (
                  <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {seg.categories.slice(0, 5).map((cat) => (
                      <li
                        key={cat._id}
                        className="rounded-pill border border-white/15 px-3 py-1 text-xs text-white/75 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/90"
                      >
                        {cat.title}
                      </li>
                    ))}
                    {seg.categories.length > 5 ? (
                      <li className="px-1 py-1 text-xs text-white/45">
                        +{seg.categories.length - 5}
                      </li>
                    ) : null}
                  </ul>
                ) : null}

                <Link
                  href={`/products/${seg.slug}`}
                  className="relative mt-auto inline-flex items-center gap-2 pt-7 font-display text-sm font-medium text-white transition-colors hover:text-leaf-bright"
                >
                  View range
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
              </article>
            ))}

            {/* Closing card — the track ends on an action rather than
                stopping dead after the last category. */}
            <Link
              href="/products"
              className="group flex flex-col justify-center rounded-card border border-dashed border-white/25 p-7 transition-colors duration-500 hover:border-leaf-bright/60 hover:bg-white/[0.04] md:max-w-[560px] md:p-8 lg:h-[min(52vh,420px)] lg:w-[300px] lg:max-w-none lg:p-10"
            >
              <span className="font-display text-xl text-white lg:text-2xl">
                See the full range
              </span>
              <span className="mt-4 text-sm text-white/60">
                Every category in one place.
              </span>
              <span className="mt-7 inline-flex h-12 w-12 items-center justify-center rounded-pill border border-white/30 text-white transition-all duration-500 group-hover:border-leaf-bright group-hover:bg-leaf-bright group-hover:text-forest">
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

     
      </div>
    </section>
  );
}
