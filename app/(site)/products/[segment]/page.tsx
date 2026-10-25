import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { segmentBySlugQuery, segmentSlugsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryIcon } from "@/components/site/CategoryIcon";


type Category = {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  heroImage?: { alt?: string };
  productCount: number;
};

type Segment = {
  title: string;
  slug: string;
  icon?: string;
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

/**
 * P1 — a main category page.
 *
 * Categories are now icon cards rather than photo cards. A medallion
 * carries the idea faster than a stock field photograph does, and it
 * means the page works before the client has sourced imagery for every
 * category — which they haven't.
 *
 * The photo still appears, but as a quiet wash behind the card that
 * surfaces on hover, so it supports the card instead of being the card.
 */
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
            className="flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="transition-colors hover:text-white">
              Products
            </Link>
          </nav>

         <div className="group mt-7 flex items-start gap-5">
            <CategoryIcon name={data.icon} size={64} tone="dark" className="mt-1" />
            <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] text-white">
              {data.title}
            </h1>
          </div>

          {data.shortDescription ? (
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85">
              {data.shortDescription}
            </p>
          ) : null}
        </Container>
      </section>

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

      <section className="bg-paper py-14 md:py-20 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="text-2xl lg:text-3xl">Categories</h2>
            <span
              aria-hidden
              className="mt-5 block h-1 w-28 rounded-pill bg-straw md:w-36"
            />
          </Reveal>

          {data.categories.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.categories.map((cat, i) => (
                <Reveal key={cat._id} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/products/${data.slug}/${cat.slug}`}
                    className="lift group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper p-7 transition-colors duration-500 hover:border-leaf/35 hover:bg-field/60"
                  >
                    {/* The photo sits behind as a faint wash and lifts
                        slightly on hover. Present, but not the subject. */}
                    {cat.heroImage ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-[0.09]"
                      >
                        <Image
                          src={urlFor(cat.heroImage as never)
                            .width(700)
                            .height(500)
                            .fit("crop")
                            .url()}
                          alt=""
                          fill
                          sizes="33vw"
                          className="object-cover"
                        />
                      </span>
                    ) : null}

                    <span className="relative">
                      <CategoryIcon name={cat.icon} size={62} />
                    </span>

                    <h3 className="relative mt-6 font-display text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-leaf">
                      {cat.title}
                      {/* Underline wipes in from the left on hover */}
                      <span
                        aria-hidden
                        className="mt-2 block h-[2px] w-full origin-left scale-x-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                      />
                    </h3>

                    {cat.shortDescription ? (
                      <p className="relative mt-3 text-[15px] leading-relaxed text-stone">
                        {cat.shortDescription}
                      </p>
                    ) : null}

                    <span className="relative mt-auto flex items-center justify-between pt-7">
                      <span className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-leaf">
                        View products
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                      {cat.productCount > 0 ? (
                        <span className="rounded-pill border border-line px-2.5 py-0.5 font-display text-xs tabular-nums text-slate transition-colors duration-300 group-hover:border-leaf/30 group-hover:text-leaf">
                          {cat.productCount}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </Reveal>
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
