import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, Check, Package } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { productBySlugQuery, productPathsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CropTable, type CropRow } from "@/components/site/CropTable";
import { ProductCard, type ProductCardData } from "@/components/site/ProductCard";

type Feature = { title?: string; text?: string };

type Product = {
  title: string;
  brandName?: string;
  heroImage?: { alt?: string };
  shortDescription?: string;
  description?: unknown;
  formulationType?: string;
  modeOfAction?: unknown;
  featuresBenefits?: Feature[];
  cropRecommendations?: CropRow[];
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

/* Bumps RichText paragraphs up from body size. The product page is read
   by someone evaluating a purchase, not skimming — larger type earns its
   space here. */
const PROSE = "[&_p]:text-lg [&_p]:leading-relaxed [&_p]:max-w-none";

/**
 * P3 — an individual product.
 *
 * Every section uses the same two-column rhythm: a label or heading on
 * the left, content filling the rest. That stops text stranding itself in
 * the middle of a 1240px page, which is what happens when a narrow
 * container is centred inside a wide one.
 */
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

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="bg-field pb-14 pt-28 md:pb-20 md:pt-36 lg:pt-44">
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
          </nav>

          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Plain bordered panel. The leaf shape and offset slab belong
                on editorial pages; a pack shot just needs to be seen. */}
            <div className="group relative aspect-square overflow-hidden rounded-card border border-line bg-paper transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]">
              {data.heroImage ? (
                <Image
                  src={urlFor(data.heroImage as never).width(1000).height(1000).fit("crop").url()}
                  alt={data.heroImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              ) : null}
            </div>

            <div>
              {data.brandName ? (
                <span className="font-display text-xs uppercase tracking-[0.18em] text-leaf">
                  {data.brandName}
                </span>
              ) : null}

              <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] text-ink lg:text-[length:var(--text-4xl)]">
                {data.title}
              </h1>

              {data.formulationType ? (
                <span className="mt-5 inline-block rounded-pill border border-leaf/30 px-4 py-1.5 font-display text-sm font-medium text-leaf">
                  {data.formulationType}
                </span>
              ) : null}

              {data.shortDescription ? (
                <p className="mt-6 max-w-none text-lg leading-relaxed">
                  {data.shortDescription}
                </p>
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

      {/* ================= Overview ================= */}
      {data.description ? (
        <section className="bg-paper py-14 md:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
              <Reveal>
                <h2 className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
                  Overview
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className={PROSE}>
                  <RichText value={data.description} />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Mode of action ================= */}
      {data.modeOfAction ? (
        <section className="relative overflow-hidden bg-forest py-16 text-white md:py-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-pill bg-leaf-bright/10 blur-3xl"
          />
          <Container className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <Reveal>
                <h2 className="text-2xl text-white lg:text-3xl">Mode of action</h2>
                <span aria-hidden className="mt-5 block h-[3px] w-14 bg-straw" />
              </Reveal>

              <Reveal delay={0.08}>
                <div
                  className={`${PROSE} [&_a]:text-leaf-bright [&_li]:text-white/80 [&_p]:text-white/85 [&_strong]:text-white`}
                >
                  <RichText value={data.modeOfAction} />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Features & benefits ================= */}
      {data.featuresBenefits?.length ? (
        <section className="bg-paper py-16 md:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              {/* Sticky, like Why Synami on the homepage — the heading
                  holds while the cards scroll past it. */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h2 className="text-2xl lg:text-3xl">Features &amp; benefits</h2>
                <span aria-hidden className="mt-5 block h-[3px] w-14 bg-straw" />
                <p className="mt-6 text-stone">
                  What this product does differently, and why it matters in
                  the field.
                </p>
              </div>

              <ul className="grid gap-5 sm:grid-cols-2">
                {data.featuresBenefits.map((f, i) => (
                  <Reveal key={f.title ?? i} delay={i * 0.06}>
                    <li className="lift group h-full rounded-card border border-line bg-paper p-7">
                      <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-field text-leaf transition-colors duration-300 group-hover:bg-leaf group-hover:text-white">
                        <Check className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-navy">
                        {f.title}
                      </h3>
                      {f.text ? (
                        <p className="mt-2.5 text-[15px] leading-relaxed text-stone">
                          {f.text}
                        </p>
                      ) : null}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Crop recommendations ================= */}
      {data.cropRecommendations?.length ? (
        <section className="bg-field py-16 md:py-20 lg:py-24">
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl">Crop recommendations</h2>
                  <span aria-hidden className="mt-5 block h-[3px] w-14 bg-straw" />
                </div>
                <p className="max-w-[46ch] text-sm text-slate">
                  Always read the product label before use. Rates and approved
                  uses vary by country.
                </p>
              </div>
            </Reveal>

            <div className="mt-10">
              <CropTable rows={data.cropRecommendations} />
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Pack sizes ================= */}
      {data.packSizes?.length ? (
        <section className="bg-paper py-16 md:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <Reveal>
                <h2 className="text-2xl lg:text-3xl">Pack sizes</h2>
                <span aria-hidden className="mt-5 block h-[3px] w-14 bg-straw" />
              </Reveal>

              <div>
                <ul className="flex flex-wrap gap-4">
                  {data.packSizes.map((p, i) => (
                    <Reveal key={p} delay={i * 0.05}>
                      <li className="lift flex items-center gap-3 rounded-card border border-line bg-paper px-7 py-5">
                        <Package className="h-5 w-5 text-leaf" />
                        <span className="font-display text-lg font-semibold text-navy">
                          {p}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] text-slate">
                  Other pack sizes may be available on request.
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Related ================= */}
      {data.related?.length ? (
        <section className="bg-field py-16 md:py-20 lg:py-24">
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
