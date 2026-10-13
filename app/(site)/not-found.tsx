import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must never be indexed. Without this, Google can list a broken
  // page in search results and send real visitors to a dead end.
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Deliberately kept static — no Sanity fetch. This page renders at
 * /_not-found during the build, and a data fetch there is exactly what
 * broke the Vercel deploy earlier. A 404 has one job and should have as
 * few ways to fail as possible.
 *
 * Header and Footer come from the root layout, so the visitor keeps the
 * full navigation and never hits a dead end.
 */
export default function NotFound() {
  const links = [
    { title: "Products", href: "/products/crop-protection", blurb: "Crop protection, fertilizers and biostimulants" },
    { title: "About us", href: "/about", blurb: "Who we are and how we work" },
    { title: "Insights", href: "/capabilities", blurb: "Solutions, quality and global business" },
    { title: "Careers", href: "/careers", blurb: "Work with us" },
  ];

  return (
    <section className="bg-field pb-24 pt-36 md:pb-32 md:pt-44">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            {/* The numeral is large but set in the page's own type rather
                than as an illustration, and tinted back so it reads as
                texture behind the message, not as the message itself. */}
            <p
              aria-hidden
              className="font-display text-[clamp(5rem,14vw,10rem)] font-semibold leading-none tracking-tighter text-leaf/15"
            >
              404
            </p>

            <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
              We couldn&apos;t find that page
            </h1>

            <p className="mt-6 max-w-[48ch]">
              The address may have changed, or the link that brought you here
              might be out of date. Nothing is broken on your end.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/">Back to home</Button>
              <Button href="/contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Somewhere useful to go next. A 404 that only says "not found"
              wastes a visitor who was already looking for something. */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
              Try one of these
            </p>

            <ul className="mt-6 border-t border-line">
              {links.map((l) => (
                <li key={l.href} className="group relative border-b border-line">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <Link
                    href={l.href}
                    className="flex items-baseline justify-between gap-6 py-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-paper/70 group-hover:pl-5"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                        {l.title}
                      </span>
                      <span className="mt-1 block text-sm text-stone">
                        {l.blurb}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-leaf transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
