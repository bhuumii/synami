import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { productBySlugQuery, productPathsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { ProductCard, type ProductCardData } from "@/components/site/ProductCard";

type Product = {
  title: string;
  brandName?: string;
  heroImage?: { alt?: string };
  shortDescription?: string;
  description?: unknown;
  formulationType?: string;
  keyFeatures?: string[];
  targetCrops?: string[];
  targetPests?: string[];
  dosage?: string;
  packSizes?: string[];
  brochureUrl?: string;
  seo?: { title?: string; description?: string };
  category: {
    title: string;
    slug: string;
    segment: { title: string; slug: string };
  };
  related: ProductCardData[];
};

export async function generateStaticParams() {
  const items: { slug: string; category: string; segment: string }[] =
    await client.fetch(productPathsQuery);
  return items.map((i) => ({
    segment: i.segment,
    category: i.category,
    product: i.slug,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product } = await params;
  const data: Product | null = await client.fetch(productBySlugQuery, {
    category,
    product,
  });
  if (!data) return {};
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.shortDescription,
  };
}

function Spec({ label, value }: { label: string; value?: string | string[] }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="border-t border-line pt-5">
      <dt className="font-display text-xs uppercase tracking-[0.16em] text-slate">
        {label}
      </dt>
      <dd className="mt-2 text-sm text-navy">
        {Array.isArray(value) ? value.join(", ") : value}
      </dd>
    </div>
  );
}

/** P3 — an individual product. */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ segment: string; category: string; product: string }>;
}) {
  const { segment, category, product } = await params;
  const data: Product | null = await client.fetch(productBySlugQuery, {
    category,
    product,
  });
  if (!data) notFound();

  const hasSpecs =
    data.formulationType ||
    data.dosage ||
    data.targetCrops?.length ||
    data.targetPests?.length ||
    data.packSizes?.length;

  return (
    <>
      <section className="bg-field pb-20 pt-36 md:pb-28 md:pt-44">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate"
          >
            <Link href="/" className="transition-colors hover:text-leaf">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/products/${data.category.segment.slug}`}
              className="transition-colors hover:text-leaf"
            >
              {data.category.segment.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/products/${data.category.segment.slug}/${data.category.slug}`}
              className="transition-colors hover:text-leaf"
            >
              {data.category.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-navy">{data.title}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sage">
              {data.heroImage ? (
                <Image
                  src={urlFor(data.heroImage as never).width(1400).height(1050).fit("crop").url()}
                  alt={data.heroImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-center">
              {data.brandName ? (
                <span className="font-display text-xs uppercase tracking-[0.18em] text-leaf">
                  {data.brandName}
                </span>
              ) : null}

              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
                {data.title}
              </h1>

              {data.shortDescription ? (
                <p className="mt-6 text-lg">{data.shortDescription}</p>
              ) : null}

              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/contact">Enquire about this product</Button>
                {data.brochureUrl ? (
                  <a
                    href={data.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill border border-leaf/30 px-7 py-3.5 font-display text-sm font-medium text-leaf transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    Datasheet
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              {data.description ? <RichText value={data.description} /> : null}

              {data.keyFeatures?.length ? (
                <div className="mt-12">
                  <h2 className="font-display text-xl font-semibold text-navy">
                    Key features
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {data.keyFeatures.map((f) => (
                      <li key={f} className="flex gap-3 text-stone">
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-leaf"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {hasSpecs ? (
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <div className="rounded-card border border-line bg-field p-8">
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-navy">
                    At a glance
                  </h2>
                  <dl className="mt-6 space-y-5">
                    <Spec label="Formulation" value={data.formulationType} />
                    <Spec label="Target crops" value={data.targetCrops} />
                    <Spec label="Target pests" value={data.targetPests} />
                    <Spec label="Dosage" value={data.dosage} />
                    <Spec label="Pack sizes" value={data.packSizes} />
                  </dl>
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </section>

      {data.related?.length ? (
        <section className="bg-field py-20 md:py-28">
          <Container>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="text-2xl">More in {data.category.title}</h2>
              <Link
                href={`/products/${segment}/${category}`}
                className="link-wipe font-display text-sm font-medium text-leaf"
              >
                View all
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.related.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  segmentSlug={segment}
                  categorySlug={category}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
