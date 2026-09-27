import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { segmentBySlugQuery, segmentSlugsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";

type Category = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  heroImage?: { alt?: string };
  productCount: number;
};

type Segment = {
  title: string;
  slug: string;
  heroImage?: { alt?: string };
  shortDescription?: string;
  description?: unknown;
  seo?: { title?: string; description?: string };
  categories: Category[];
};

export async function generateStaticParams() {
  const items: { slug: string }[] = await client.fetch(segmentSlugsQuery);
  return items.map((i) => ({ segment: i.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const data: Segment | null = await client.fetch(segmentBySlugQuery, { segment });
  if (!data) return {};
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.shortDescription,
  };
}

/** P1 — a main category page. Lists the categories inside it. */
export default async function SegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const data: Segment | null = await client.fetch(segmentBySlugQuery, { segment });
  if (!data) notFound();

  return (
    <>
      <section className="relative flex min-h-[58vh] items-end overflow-hidden pb-16 pt-40">
        {data.heroImage ? (
          <Image
            src={urlFor(data.heroImage as never).width(2400).height(1100).fit("crop").url()}
            alt={data.heroImage.alt || data.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-forest" />
        )}
        <div className="overlay-forest absolute inset-0" />

        <Container className="relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{data.title}</span>
          </nav>

          <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold text-white">
            {data.title}
          </h1>

          {data.shortDescription ? (
            <p className="mt-6 max-w-[52ch] text-lg text-white/85">
              {data.shortDescription}
            </p>
          ) : null}
        </Container>
      </section>

      {data.description ? (
        <section className="bg-field py-20 md:py-28">
          <Container width="narrow">
            <RichText value={data.description} />
          </Container>
        </section>
      ) : null}

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <h2 className="text-2xl">Categories</h2>

          {data.categories.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/products/${data.slug}/${cat.slug}`}
                  className="lift group flex flex-col overflow-hidden rounded-card border border-line bg-paper"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-field">
                    {cat.heroImage ? (
                      <Image
                        src={urlFor(cat.heroImage as never).width(900).height(560).fit("crop").url()}
                        alt={cat.heroImage.alt || cat.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                      {cat.title}
                    </h3>
                    {cat.shortDescription ? (
                      <p className="mt-2.5 text-sm text-stone">{cat.shortDescription}</p>
                    ) : null}

                    <div className="mt-auto flex items-baseline justify-between pt-6">
                      <span className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-leaf">
                        View products
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      {cat.productCount > 0 ? (
                        <span className="font-display text-xs tabular-nums text-slate">
                          {cat.productCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-card border border-dashed border-line bg-field p-12 text-center">
              <p className="mx-auto text-stone">
                Categories in this range are being added. Get in touch and
                we&apos;ll share what&apos;s available.
              </p>
              <Button href="/contact" className="mt-7">
                Send an enquiry
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
