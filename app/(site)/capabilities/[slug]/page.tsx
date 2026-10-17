import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { capabilityBySlugQuery, capabilitySlugsQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { PageBody, type PageSection, type Highlight } from "@/components/site/PageBody";
import { CoreValues, type CoreValue } from "@/components/site/CoreValues";
import { RegionMap } from "@/components/site/RegionMap";

type Page = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  sections?: PageSection[];
  highlightsHeading?: string;
  highlightsIntro?: string;
  highlightsLayout?: "cards" | "grid" | "map";
  highlights?: (Highlight & CoreValue)[];
  seo?: { title?: string; description?: string };
};

export async function generateStaticParams() {
  const items: { slug: string }[] = await client.fetch(capabilitySlugsQuery);
  return items.map((i) => ({ slug: i.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data: Page | null = await client.fetch(capabilityBySlugQuery, { slug });
  if (!data) return {};
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.intro,
  };
}

/**
 * An Insights page — Solutions, Quality, Global Business.
 *
 * The points at the bottom render three different ways, chosen by the
 * client in Sanity rather than hardcoded per slug. Global Business needs
 * something other than a grid because its points are places, not
 * capabilities — but which page wants which treatment is a content
 * decision, so it belongs in the CMS.
 */
export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: Page | null = await client.fetch(capabilityBySlugQuery, { slug });
  if (!data) notFound();

  const layout = data.highlightsLayout ?? "cards";
  const points = data.highlights ?? [];

  return (
    <>
      <PageHero
        title={data.title}
        eyebrow={data.eyebrow}
        intro={data.intro}
        image={data.heroImage}
        breadcrumb={[{ label: "Insights", href: "/capabilities" }]}
      />

      {/* Highlights are passed to PageBody ONLY in cards mode — otherwise
          they'd render twice. */}
      <PageBody
        sections={data.sections}
        highlights={layout === "cards" ? points : []}
      />

      {layout === "grid" && points.length > 0 ? (
        <CoreValues title={data.highlightsHeading ?? "In practice"} values={points} />
      ) : null}

      {layout === "map" && points.length > 0 ? (
        <RegionMap
          title={data.highlightsHeading ?? "Our international focus"}
          intro={data.highlightsIntro}
          regions={points}
        />
      ) : null}
    </>
  );
}
