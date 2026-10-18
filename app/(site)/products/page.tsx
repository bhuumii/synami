import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { productNavQuery, productsPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/site/PageHero";
import { RichText } from "@/components/ui/RichText";
import { Reveal } from "@/components/ui/Reveal";
import type { NavSegment } from "@/lib/nav-types";

type Segment = NavSegment & { heroImage?: { alt?: string } };

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
 * Wrapper content comes from the Products Page singleton; the list of
 * main categories is generated, so adding one in the Studio adds a row
 * here with no edit.
 */
export default async function ProductsPage() {
  const [page, segments] = await Promise.all([
    client.fetch<PageData>(productsPageQuery),
    client.fetch<Segment[]>(`
      *[_type == "productSegment"] | order(order asc){
        _id, title, "slug": slug.current, shortDescription,
        heroImage{ ..., alt },
        "categories": *[_type == "productCategory" && segment._ref == ^._id]
          | order(order asc){ _id, title, "slug": slug.current }
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
              <h2 className="mb-10 text-2xl lg:text-3xl">{page.listingHeading}</h2>
            </Reveal>
          ) : null}

          {list.length > 0 ? (
            <div className="space-y-5">
              {list.map((seg, i) => (
                <article
                  key={seg._id}
                  className="lift group overflow-hidden rounded-card border border-line bg-paper"
                >
                  <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-field md:aspect-auto md:min-h-[270px]">
                      {seg.heroImage ? (
                        <Image
                          src={urlFor(seg.heroImage as never)
                            .width(900)
                            .height(700)
                            .fit("crop")
                            .url()}
                          alt={seg.heroImage.alt || seg.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-sage" />
                      )}
                    </div>

                    <div className="flex flex-col p-7 md:p-10">
                      <span className="font-display text-xs tabular-nums text-slate">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-3 font-display text-2xl font-semibold text-navy transition-colors group-hover:text-leaf">
                        {seg.title}
                      </h3>

                      {seg.shortDescription ? (
                        <p className="mt-3 text-[17px] leading-relaxed text-stone">
                          {seg.shortDescription}
                        </p>
                      ) : null}

                      {seg.categories.length > 0 ? (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {seg.categories.map((cat) => (
                            <li key={cat._id}>
                              <Link
                                href={`/products/${seg.slug}/${cat.slug}`}
                                className="inline-block rounded-pill border border-line px-3.5 py-1.5 text-sm text-stone transition-colors hover:border-leaf hover:text-leaf"
                              >
                                {cat.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <Link
                        href={`/products/${seg.slug}`}
                        className="mt-auto inline-flex items-center gap-1.5 pt-7 font-display text-sm font-medium text-leaf"
                      >
                        View {seg.title.toLowerCase()}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
                <span aria-hidden className="block h-[3px] w-14 bg-straw" />
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
