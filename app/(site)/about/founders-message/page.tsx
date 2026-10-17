import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { founderQuery } from "@/sanity/lib/queries";
import { PageHero } from "@/components/site/PageHero";
import { FounderMessage } from "@/components/site/FounderMessage";

type Data = {
  title: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  founderName?: string;
  founderRole?: string;
  founderPhoto?: { alt?: string };
  pullQuote?: string;
  message?: unknown;
  signature?: { alt?: string };
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: Data | null = await client.fetch(founderQuery);
  if (!d) return { title: "Founder's Message" };
  return {
    title: d.seo?.title || d.title,
    description: d.seo?.description || d.intro,
  };
}

export default async function FoundersMessagePage() {
  const d: Data | null = await client.fetch(founderQuery);

  return (
    <>
      <PageHero
        title={d?.title ?? "Founder's Message"}
        eyebrow={d?.eyebrow}
        intro={d?.intro}
        image={d?.heroImage}
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      <FounderMessage
        name={d?.founderName}
        role={d?.founderRole}
        photo={d?.founderPhoto}
        pullQuote={d?.pullQuote}
        message={d?.message}
        signature={d?.signature}
      />
    </>
  );
}
