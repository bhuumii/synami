import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
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

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data: Page | null = await client.fetch(aboutPageQuery);
  if (!data) return { title: "About Us" };
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.intro,
  };
}

export default async function AboutPage() {
  const data: Page | null = await client.fetch(aboutPageQuery);
  if (!data) notFound();

  return (
    <>
      <PageHero
        title={data.title}
        eyebrow={data.eyebrow}
        intro={data.intro}
        image={data.heroImage}
      />
      <PageBody sections={data.sections} highlights={data.highlights} />
    </>
  );
}
