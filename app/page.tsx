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

export const revalidate = 3600;

export default async function Home() {
  const [home, segments] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch<NavSegment[]>(productNavQuery),
  ]);

  return (
    <>
      <Hero
        heading={home?.heroHeading}
        subheading={home?.heroSubheading}
        primaryCta={home?.heroPrimaryCta}
        secondaryCta={home?.heroSecondaryCta}
      />

      <section className="bg-field py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr] lg:gap-24">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
                {home?.whoEyebrow ?? "Who we are"}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-[22ch] text-3xl">{home?.whoHeading}</h2>
              {(home?.whoBody ?? []).map((para: string, i: number) => (
                <p key={i} className={i === 0 ? "mt-8" : "mt-5"}>
                  {para}
                </p>
              ))}
              {home?.whoCta?.label ? (
                <Button
                  href={home.whoCta.href || "/about"}
                  variant="ghost"
                  className="mt-9 px-0"
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
