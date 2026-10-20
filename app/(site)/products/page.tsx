import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { productsPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/site/PageHero";
import { RichText } from "@/components/ui/RichText";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryIcon } from "@/components/site/CategoryIcon";

type Category = { _id: string; title: string; slug: string; icon?: string };

type Segment = {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  heroImage?: { alt?: string };
  categories: Category[];
};

type PageData = {
  title?: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: { alt?: string };
  listingHeading?: string;
  body?: unknown;
  seo?: { title?: string; description?: string };
};

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d: PageData | null = await client.fetch(productsPageQuery);
  return {
    title: d?.seo?.title || d?.title || "Products",
    description:
      d?.seo?.description ||
      d?.intro ||
      "Crop protection, fertilizers, biostimulants and customized solutions from Synami Agriscience.",
  };
}

/**
 * /products — the index.
 *
 * Rows alternate image side down the page, so three entries read as a
 * sequence rather than three identical blocks. Each carries its
 * medallion, and the categories inside it appear as chips with their own
 * medallions — so the icon system is visible two levels deep from one
 * screen.
 */
export default async function ProductsPage() {
  const [page, segments] = await Promise.all([
    client.fetch<PageData>(productsPageQuery),
    client.fetch<Segment[]>(`
      *[_type == "productSegment"] | order(order asc){
        _id, title, "slug": slug.current, shortDescription, icon,
        heroImage{ ..., alt },
        "categories": *[_type == "productCategory" && segment._ref == ^._id]
          | order(order asc){ _id, title, "slug": slug.current, icon }
      }
    `),
  ]);

  const list = segments ?? [];

  return (
    <>
      <PageHero
        title={page?.title ?? "Everything a crop needs"}
        eyebrow={page?.eyebrow ?? "Our products"}
        intro={page?.intro}
        image={page?.heroImage}
      />

      <section className="bg-paper py-14 md:py-20 lg:py-24">
        <Container>
          {page?.listingHeading ? (
            <Reveal>
              <h2 className="text-2xl lg:text-3xl">{page.listingHeading}</h2>
              <span
                aria-hidden
                className="mb-12 mt-5 block h-1 w-28 rounded-pill bg-straw md:w-36"
              />
            </Reveal>
          ) : null}

          {list.length > 0 ? (
            <div className="space-y-6">
              {list.map((seg, i) => {
                const flip = i % 2 === 1;

                return (
                  <Reveal key={seg._id}>
                    <article className="group overflow-hidden rounded-card border border-line bg-paper transition-all duration-500 hover:border-leaf/30 hover:shadow-[var(--shadow-lift)]">
                      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                        {/* Image */}
                        <div
                          className={`relative aspect-[16/10] overflow-hidden bg-field lg:aspect-auto lg:min-h-[300px] ${
                            flip ? "lg:order-2" : ""
                          }`}
                        >
                          {seg.heroImage ? (
                            <Image
                              src={urlFor(seg.heroImage as never)
                                .width(1000)
                                .height(800)
                                .fit("crop")
                                .url()}
                              alt={seg.heroImage.alt || seg.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-sage" />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`p-7 md:p-10 ${flip ? "lg:order-1" : ""}`}>
                          <CategoryIcon name={seg.icon} size={62} />

                          <h3 className="mt-6 font-display text-2xl font-semibold text-navy transition-colors duration-300 group-hover:text-leaf lg:text-3xl">
                            {seg.title}
                          </h3>

                          <span
                            aria-hidden
                            className="mt-4 block h-[2px] w-20 origin-left bg-straw transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[2.2]"
                          />

                          {seg.shortDescription ? (
                            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-stone">
                              {seg.shortDescription}
                            </p>
                          ) : null}

                          {/* Categories, each with its own medallion */}
                          {seg.categories.length > 0 ? (
                            <ul className="mt-7 flex flex-wrap gap-2.5">
                              {seg.categories.map((cat) => (
                                <li key={cat._id}>
                                  <Link
                                    href={`/products/${seg.slug}/${cat.slug}`}
                                    className="group/chip inline-flex items-center gap-2 rounded-pill border border-line py-1.5 pl-1.5 pr-4 text-sm text-stone transition-colors duration-300 hover:border-leaf/40 hover:text-leaf"
                                  >
                                    <CategoryIcon name={cat.icon} size={28} />
                                    {cat.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          <Link
                            href={`/products/${seg.slug}`}
                            className="mt-8 inline-flex items-center gap-2 font-display text-sm font-medium text-leaf"
                          >
                            View {seg.title.toLowerCase()}
                            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-line bg-field p-12 text-center">
              <p className="mx-auto text-stone">
                Our product range is being added. Get in touch and we&apos;ll
                share what&apos;s available.
              </p>
              <Button href="/contact" className="mt-7">
                Send an enquiry
              </Button>
            </div>
          )}
        </Container>
      </section>

      {page?.body ? (
        <section className="bg-field py-14 md:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
              <Reveal>
                <span aria-hidden className="block h-1 w-28 rounded-pill bg-straw" />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="[&_p]:max-w-none [&_p]:text-lg [&_p]:leading-relaxed">
                  <RichText value={page.body} />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
