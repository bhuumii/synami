import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { visionMissionQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { GroupHeading } from "@/components/site/GroupHeading";
import { AlternatingRow, type RowItem } from "@/components/site/AlternatingRow";

type Data = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  visionHeading?: string;
  visionIntro?: string;
  visionPoints?: RowItem[];
  missionHeading?: string;
  missionIntro?: string;
  missionPoints?: RowItem[];
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

export default async function VisionMissionPage() {
  const d: Data | null = await client.fetch(visionMissionQuery);

  const vision = d?.visionPoints ?? [];
  const mission = d?.missionPoints ?? [];

  /* The alternation continues across both groups rather than restarting,
     so the page reads as one rhythm instead of two separate lists. */
  let n = 0;
  const next = () => {
    const i = n++;
    return { flip: i % 2 === 1, tone: i % 2 === 0 ? "bg-paper" : "bg-field" };
  };

  return (
    <>
      <PageHero
        title={d?.title ?? "Our Vision & Mission"}
        eyebrow={d?.eyebrow}
        intro={d?.intro}
        image={d?.heroImage}
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      {vision.length > 0 ? (
        <>
          <GroupHeading
            heading={d?.visionHeading ?? "Our Vision"}
            intro={d?.visionIntro}
            tone="bg-paper"
          />
          {vision.map((p, i) => {
            const { flip, tone } = next();
            return <AlternatingRow key={`v-${i}`} item={p} flip={flip} tone={tone} />;
          })}
        </>
      ) : null}

      {mission.length > 0 ? (
        <>
          <GroupHeading
            heading={d?.missionHeading ?? "Our Mission"}
            intro={d?.missionIntro}
            tone={n % 2 === 0 ? "bg-paper" : "bg-field"}
          />
          {mission.map((p, i) => {
            const { flip, tone } = next();
            return <AlternatingRow key={`m-${i}`} item={p} flip={flip} tone={tone} />;
          })}
        </>
      ) : null}
    </>
  );
}
