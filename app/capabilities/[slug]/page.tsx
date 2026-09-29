import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { capabilityBySlugQuery, capabilitySlugsQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { PageBody, type PageSection, type Highlight } from "@/components/site/PageBody";

type Page = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  sections?: PageSection[];
  highlights?: Highlight[];
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

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: Page | null = await client.fetch(capabilityBySlugQuery, { slug });
  if (!data) notFound();

  return (
    <>
      <PageHero
        title={data.title}
        eyebrow={data.eyebrow}
        intro={data.intro}
        image={data.heroImage}
        breadcrumb={[{ label: "Insights", href: "/capabilities" }]}
      />
      <PageBody sections={data.sections} highlights={data.highlights} />
    </>
  );
}
