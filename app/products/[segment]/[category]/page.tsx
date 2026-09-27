import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { categoryBySlugQuery, categoryPathsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { ProductCard, type ProductCardData } from "@/components/site/ProductCard";

type Category = {
  title: string;
  slug: string;
  heroImage?: { alt?: string };
  shortDescription?: string;
  description?: unknown;
  seo?: { title?: string; description?: string };
  segment: { title: string; slug: string };
  products: ProductCardData[];
};

export async function generateStaticParams() {
  const items: { slug: string; segment: string }[] =
    await client.fetch(categoryPathsQuery);
  return items.map((i) => ({ segment: i.segment, category: i.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; category: string }>;
}): Promise<Metadata> {
  const { segment, category } = await params;
  const data: Category | null = await client.fetch(categoryBySlugQuery, {
    segment,
    category,
  });
  if (!data) return {};
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.shortDescription,
  };
}

/** P2 — a category page. Lists its products. */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ segment: string; category: string }>;
}) {
  const { segment, category } = await params;
  const data: Category | null = await client.fetch(categoryBySlugQuery, {
    segment,
    category,
  });
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
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/products/${data.segment.slug}`}
              className="transition-colors hover:text-white"
            >
              {data.segment.title}
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
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-2xl">Products</h2>
            {data.products.length > 0 ? (
              <span className="font-display text-sm tabular-nums text-slate">
                {data.products.length}{" "}
                {data.products.length === 1 ? "product" : "products"}
              </span>
            ) : null}
          </div>

          {data.products.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  segmentSlug={data.segment.slug}
                  categorySlug={data.slug}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-card border border-dashed border-line bg-field p-12 text-center">
              <p className="mx-auto text-stone">
                Products in this category are being added. Get in touch and
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
