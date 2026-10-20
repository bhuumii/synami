import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { legalPageBySlugQuery } from "@/sanity/lib/queries";
import { LegalHero } from "@/components/site/LegalHero";
import { LegalBody } from "@/components/site/LegalBody";

type Page = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  body?: unknown;
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: Page | null = await client.fetch(legalPageBySlugQuery, { slug: "privacy" });
  return {
    title: d?.seo?.title || d?.title || "Privacy Policy",
    description: d?.seo?.description || d?.intro,
    /* Legal pages shouldn't compete with real content in search. */
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage() {
  const d: Page | null = await client.fetch(legalPageBySlugQuery, { slug: "privacy" });
  if (!d) notFound();

  return (
    <>
      <LegalHero title={d.title} intro={d.intro} lastUpdated={d.lastUpdated} />
      <LegalBody value={d.body} />
    </>
  );
}
