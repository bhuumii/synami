import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { legalPageBySlugQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { LegalBody, type LegalSection } from "@/components/site/LegalBody";

type Page = {
  title: string;
  eyebrow?: string;
  intro?: string;
  sections?: LegalSection[];
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: Page | null = await client.fetch(legalPageBySlugQuery, { slug: "privacy" });
  return {
    title: d?.seo?.title || d?.title || "Privacy Policy",
    description: d?.seo?.description || d?.intro,
  };
}

export default async function PrivacyPage() {
  const d: Page | null = await client.fetch(legalPageBySlugQuery, { slug: "privacy" });
  if (!d) notFound();

  return (
    <>
      <PageHero title={d.title} eyebrow={d.eyebrow} intro={d.intro} />
      <LegalBody sections={d.sections} />
    </>
  );
}
