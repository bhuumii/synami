/**
 * HOMEPAGE v2 — rename to `page.tsx`.
 *
 * Revised band rhythm. Every background is now a green:
 *
 *   hero    forest-tinted video
 *   who     field   (pale green — the page default)
 *   segments forest (the one dark moment)
 *   why     paper   (white, reads as raised)
 *   approach field  (pale green, white cards floating on it)
 *   global  paper
 *   cta     leaf
 *   footer  sage
 *
 * Navy appears nowhere as a background — only as heading text.
 */

import { Hero } from "@/components/site/Hero";
import { BusinessSegments } from "@/components/site/BusinessSegments";
import { WhySynami } from "@/components/site/WhySynami";
import { Approach } from "@/components/site/Approach";
import { GlobalVision } from "@/components/site/GlobalVision";
import { PartnerCTA } from "@/components/site/PartnerCTA";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-field py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr] lg:gap-24">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
                Who we are
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-[22ch] text-3xl">
                Building better solutions for modern agriculture
              </h2>
              <p className="mt-8">
                At Synami Agriscience, we believe the future of agriculture
                lies in combining science, quality and innovation with a deep
                understanding of how farmers&apos; and businesses&apos; needs
                are changing.
              </p>
              <p className="mt-5">
                We develop and deliver agricultural solutions designed to
                support crop productivity, resource efficiency and sustainable
                agricultural practices &mdash; across crop protection,
                fertilizers, biostimulants and customized solutions, for
                partners in domestic and international markets.
              </p>
              <Button href="/about" variant="ghost" className="mt-9 px-0">
                Know more about us
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <BusinessSegments />
      <WhySynami />
      <Approach />
      <GlobalVision />
      <PartnerCTA />
    </>
  );
}
