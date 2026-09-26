"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

const segments = [
  {
    no: "01",
    title: "Crop Protection",
    blurb:
      "Innovative solutions for effective crop protection and improved crop health.",
    items: ["Insecticides", "Fungicides", "Herbicides", "Plant Growth Regulators"],
    href: "/products/crop-protection",
  },
  {
    no: "02",
    title: "Fertilizers",
    blurb:
      "Specialty nutrition solutions designed to support balanced crop growth and productivity.",
    items: ["Water-Soluble Fertilizers", "Specialty Fertilizers", "Micronutrients"],
    href: "/products/fertilizers",
  },
  {
    no: "03",
    title: "Biostimulants",
    blurb:
      "Solutions supporting plant vigor, nutrient utilization and overall crop performance.",
    items: [
      "Humic & Fulvic Solutions",
      "Amino Acids",
      "Seaweed-Based Solutions",
      "Specialty Biostimulants",
    ],
    href: "/products/biostimulants",
  },
  {
    no: "04",
    title: "Custom & Private Label",
    blurb:
      "Flexible solutions for businesses seeking customized formulations, manufacturing and private-label opportunities.",
    items: ["Custom Formulation", "Private Label", "Bulk Supply", "Product Development"],
    href: "/capabilities/solutions",
  },
];

/**
 * v2: forest green instead of navy.
 *
 * This is the single dark moment on the page. Sitting it in the green family
 * means the transition in and out feels like a change of depth rather than a
 * change of brand.
 *
 * Cards now carry a hover treatment: the left edge lights up in bright green,
 * the number scales, and the arrow slides. Hover is the one place a page can
 * feel alive without any scroll trickery.
 */
export function BusinessSegments() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = track.current;
        if (!el) return;

        const distance = () => el.scrollWidth - window.innerWidth + 120;

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
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-forest py-20 lg:h-screen lg:py-0"
    >
      {/* Single off-canvas light source. Depth, not a gradient mesh. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 top-1/3 h-[560px] w-[560px] rounded-pill bg-leaf-bright/10 blur-3xl"
      />

      <div className="relative flex h-full flex-col justify-center">
        <Container className="lg:pt-24">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf-bright">
            Our business segments
          </p>
          <h2 className="mt-4 max-w-[18ch] text-3xl text-white">
            Four areas, one standard of quality
          </h2>
        </Container>

        <div className="mt-12 lg:mt-16">
          <div
            ref={track}
            className="flex flex-col gap-6 px-6 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] lg:pr-24"
          >
            {segments.map((s) => (
              <article
                key={s.no}
                className="group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.05] p-8 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.09] lg:h-[min(52vh,420px)] lg:w-[420px] lg:p-10"
              >
                {/* Left edge lights up on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-leaf-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />

                <span className="font-display text-sm text-leaf-bright transition-transform duration-500 group-hover:translate-x-1">
                  {s.no}
                </span>

                <h3 className="mt-5 text-xl text-white lg:text-2xl">{s.title}</h3>

                <p className="mt-4 text-sm text-white/65">{s.blurb}</p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                  {s.items.map((i) => (
                    <li key={i} className="text-sm text-white/80">
                      {i}
                    </li>
                  ))}
                </ul>

                <Link
                  href={s.href}
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
