import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { coreValuesQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { CoreValues, type CoreValue } from "@/components/site/CoreValues";

type Data = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  gridHeading?: string;
  values?: CoreValue[];
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: Data | null = await client.fetch(coreValuesQuery);
  if (!d) return { title: "Core Values" };
  return {
    title: d.seo?.title || d.title,
    description: d.seo?.description || d.intro,
  };
}

export default async function CoreValuesPage() {
  const d: Data | null = await client.fetch(coreValuesQuery);

  return (
    <>
      <PageHero
        title={d?.title ?? "Core Values"}
        eyebrow={d?.eyebrow}
        intro={d?.intro}
        image={d?.heroImage}
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      <CoreValues title={d?.gridHeading ?? "Core Values"} values={d?.values ?? []} />
    </>
  );
}
