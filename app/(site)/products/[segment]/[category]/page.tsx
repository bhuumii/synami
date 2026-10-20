import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { categoryBySlugQuery, categoryPathsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryIcon } from "@/components/site/CategoryIcon";
import { ProductCard, type ProductCardData } from "@/components/site/ProductCard";

type Sibling = { _id: string; title: string; slug: string; icon?: string };

type Category = {
  title: string;
  slug: string;
  icon?: string;
  heroImage?: { alt?: string };
  shortDescription?: string;
  description?: unknown;
  seo?: { title?: string; description?: string };
  segment: { title: string; slug: string };
  products: ProductCardData[];
  siblings: Sibling[];
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

/**
 * P2 — a product category.
 *
 * Three additions over the plain listing it was: the category medallion
 * in the hero, a product count, and a switcher for the other categories
 * in the same range. That last one matters most — someone browsing
 * Insecticides who actually wants Fungicides previously had to go back
 * up two levels.
 */
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

  const count = data.products.length;

  return (
    <>
      {/* ================= Hero ================= */}
      <section
        data-hero="dark"
        className="relative flex min-h-[58vh] items-end overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
      >
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
          </nav>

          <div className="group mt-7 flex items-start gap-5">
            <CategoryIcon name={data.icon} size={64} tone="dark" className="mt-1" />

            <div>
              <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] text-white">
                {data.title}
              </h1>
              {count > 0 ? (
                <p className="mt-3 font-display text-sm text-white/70">
                  {count} {count === 1 ? "product" : "products"}
                </p>
              ) : null}
            </div>
          </div>

          {data.shortDescription ? (
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85">
              {data.shortDescription}
            </p>
          ) : null}
        </Container>
      </section>

      {/* ================= Description ================= */}
      {data.description ? (
        <section className="bg-field py-14 md:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
              <Reveal>
                <span aria-hidden className="block h-1 w-28 rounded-pill bg-straw" />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="[&_p]:max-w-none [&_p]:text-lg [&_p]:leading-relaxed">
                  <RichText value={data.description} />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ================= Products ================= */}
      <section className="bg-paper py-14 md:py-20 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="text-2xl lg:text-3xl">Products</h2>
            <span
              aria-hidden
              className="mt-5 block h-1 w-28 rounded-pill bg-straw md:w-36"
            />
          </Reveal>

          {count > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((p, i) => (
                <Reveal key={p._id} delay={(i % 3) * 0.08}>
                  <ProductCard
                    product={p}
                    segmentSlug={data.segment.slug}
                    categorySlug={data.slug}
                  />
                </Reveal>
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

      {/* ================= Other categories ================= */}
      {data.siblings?.length ? (
        <section className="bg-field py-14 md:py-20">
          <Container>
            <Reveal>
              <h2 className="text-2xl">More in {data.segment.title}</h2>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.siblings.map((s, i) => (
                <Reveal key={s._id} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/products/${data.segment.slug}/${s.slug}`}
                    className="lift group flex items-center gap-4 rounded-card border border-line bg-paper p-5"
                  >
                    <CategoryIcon name={s.icon} size={46} />
                    <span className="flex-1 font-display font-semibold text-navy transition-colors group-hover:text-leaf">
                      {s.title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-leaf transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
