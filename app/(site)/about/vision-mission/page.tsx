import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { visionMissionQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import {
  VisionMissionGroup,
  type VMPoint,
} from "@/components/site/VisionMissionGroup";

type Data = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  visionHeading?: string;
  visionIntro?: string;
  visionPoints?: VMPoint[];
  missionHeading?: string;
  missionIntro?: string;
  missionPoints?: VMPoint[];
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: Data | null = await client.fetch(visionMissionQuery);
  if (!d) return { title: "Vision & Mission" };
  return {
    title: d.seo?.title || d.title,
    description: d.seo?.description || d.intro,
  };
}

/**
 * Vision & Mission.
 *
 * Two groups, each a sticky image beside a scrolling list of points.
 * The second group mirrors the first — image on the right rather than
 * the left — so the page has a change of direction without needing the
 * five separate alternating rows it had before.
 *
 * No Sanity changes: it reads the same visionPoints and missionPoints.
 */
export default async function VisionMissionPage() {
  const d: Data | null = await client.fetch(visionMissionQuery);

  return (
    <>
      <PageHero
        title={d?.title ?? "Our Vision & Mission"}
        eyebrow={d?.eyebrow}
        intro={d?.intro}
        image={d?.heroImage}
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      <VisionMissionGroup
        eyebrow="Where we're going"
        heading={d?.visionHeading ?? "Our Vision"}
        intro={d?.visionIntro}
        points={d?.visionPoints ?? []}
        tone="bg-paper"
      />

      <VisionMissionGroup
        eyebrow="How we get there"
        heading={d?.missionHeading ?? "Our Mission"}
        intro={d?.missionIntro}
        points={d?.missionPoints ?? []}
        tone="bg-field"
        flip
      />
    </>
  );
}
