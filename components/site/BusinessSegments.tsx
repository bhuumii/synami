"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { NavSegment } from "@/lib/nav-types";

gsap.registerPlugin(ScrollTrigger);

/**
 * PINNED HORIZONTAL SCROLL — now fully data-driven.
 *
 * One card per Main Category from Sanity. Add a Main Category and a card
 * appears; the track simply gets longer and the pin distance recalculates,
 * because the travel distance is measured from scrollWidth rather than
 * being a fixed number.
 *
 * Below lg the track becomes a normal vertical stack. Reduced motion
 * disables the pin entirely.
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
      if (distance() <= 0) return; // few enough cards to fit — no pin needed

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
        <Container className="lg:pt-24">
          {eyebrow ? (
            <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf-bright">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="mt-4 max-w-[18ch] text-3xl text-white">{heading}</h2>
          ) : null}
        </Container>

        <div className="mt-12 lg:mt-16">
          <div
            ref={track}
            className="flex flex-col gap-6 px-6 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] lg:pr-24"
          >
            {segments.map((seg, i) => (
              <article
                key={seg._id}
className="group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.05] p-7 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.09] md:max-w-[560px] md:p-8 lg:h-[min(52vh,420px)] lg:w-[420px] lg:max-w-none lg:p-10"              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-leaf-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />

                <span className="font-display text-sm text-leaf-bright transition-transform duration-500 group-hover:translate-x-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-xl text-white lg:text-2xl">{seg.title}</h3>

                {seg.shortDescription ? (
                  <p className="mt-4 text-sm text-white/65">{seg.shortDescription}</p>
                ) : null}

                {seg.categories.length > 0 ? (
                  <ul className="mt-6 space-y-2 overflow-hidden border-t border-white/10 pt-5">
                    {seg.categories.slice(0, 5).map((cat) => (
                      <li key={cat._id} className="text-sm text-white/80">
                        {cat.title}
                      </li>
                    ))}
                    {seg.categories.length > 5 ? (
                      <li className="text-sm text-white/45">
                        +{seg.categories.length - 5} more
                      </li>
                    ) : null}
                  </ul>
                ) : null}

                <Link
                  href={`/products/${seg.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-7 font-display text-sm font-medium text-white transition-colors hover:text-leaf-bright"
                >
                  View range
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <Container className="hidden pb-10 pt-12 lg:block">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Keep scrolling
          </p>
        </Container>
      </div>
    </section>
  );
}
