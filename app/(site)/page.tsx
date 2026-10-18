import { client } from "@/sanity/lib/client";
import { homePageQuery, productNavQuery } from "@/sanity/lib/queries";
import type { NavSegment } from "@/lib/nav-types";

import { Hero } from "@/components/site/Hero";
import { BusinessSegments } from "@/components/site/BusinessSegments";
import { WhySynami } from "@/components/site/WhySynami";
import { Approach } from "@/components/site/Approach";
import { GlobalVision } from "@/components/site/GlobalVision";
import { PartnerCTA } from "@/components/site/PartnerCTA";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const revalidate = 3600;

export default async function Home() {
  const [home, segments] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch<NavSegment[]>(productNavQuery),
  ]);

  const body: string[] = home?.whoBody ?? [];

  return (
    <>
      <Hero
        heading={home?.heroHeading}
        subheading={home?.heroSubheading}
        primaryCta={home?.heroPrimaryCta}
        secondaryCta={home?.heroSecondaryCta}
      />

      {/* ---------------- Who we are ---------------- */}
      <section className="bg-field py-20 md:py-28 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{home?.whoEyebrow ?? "Who we are"}</Eyebrow>
              <h2 className="mt-5 text-3xl lg:text-[length:var(--text-4xl)] lg:leading-[1.05]">
                {home?.whoHeading}
              </h2>
              <span
                aria-hidden
                className="mt-6 block h-1 w-28 rounded-pill bg-straw md:w-36"
              />
            </Reveal>

            <Reveal delay={0.1}>
              {/* First paragraph set larger — it carries the idea, the rest
                  support it. A uniform block of body text is what made this
                  section read as filler. */}
              {body.map((para: string, i: number) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "max-w-none text-xl leading-relaxed text-navy"
                      : "mt-5 max-w-none text-[17px] leading-relaxed"
                  }
                >
                  {para}
                </p>
              ))}

              {home?.whoCta?.label ? (
                <Button
                  href={home.whoCta.href || "/about"}
                  variant="outline"
                  className="mt-9"
                >
                  {home.whoCta.label}
                </Button>
              ) : null}
            </Reveal>
          </div>
        </Container>
      </section>

      <BusinessSegments
        eyebrow={home?.segmentsEyebrow}
        heading={home?.segmentsHeading}
        segments={segments ?? []}
      />

      <WhySynami
        eyebrow={home?.whyEyebrow}
        heading={home?.whyHeading}
        intro={home?.whyIntro}
        items={home?.whyItems ?? []}
      />

      <Approach
        eyebrow={home?.approachEyebrow}
        heading={home?.approachHeading}
        steps={home?.approachSteps ?? []}
      />

      <GlobalVision
        eyebrow={home?.globalEyebrow}
        heading={home?.globalHeading}
        body={home?.globalBody}
        note={home?.globalNote}
        regions={home?.globalRegions ?? []}
        cta={home?.globalCta}
      />

      <PartnerCTA
        heading={home?.ctaHeading}
        body={home?.ctaBody}
        audiences={home?.ctaAudiences ?? []}
        primaryCta={home?.ctaPrimary}
        secondaryCta={home?.ctaSecondary}
      />
    </>
  );
}
