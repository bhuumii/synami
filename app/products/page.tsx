import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { productNavQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { NavSegment } from "@/lib/nav-types";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Crop protection, fertilizers, biostimulants and customized solutions from Synami Agriscience.",
};

export const revalidate = 3600;

type Segment = NavSegment & { heroImage?: { alt?: string } };

/**
 * /products — the index.
 *
 * This page was missing: the header nav and the mobile drawer both link
 * here, so every visitor who clicked "Products" in the top bar hit a 404.
 *
 * It lists main categories with their categories underneath, which makes
 * it a genuine landing page for the whole range rather than a redirect.
 */
export default async function ProductsPage() {
  const segments: Segment[] = await client.fetch(`
    *[_type == "productSegment"] | order(order asc){
      _id, title, "slug": slug.current, shortDescription,
      heroImage{ ..., alt },
      "categories": *[_type == "productCategory" && segment._ref == ^._id]
        | order(order asc){ _id, title, "slug": slug.current }
    }
  `);

  return (
    <>
      <section className="bg-field pb-12 pt-28 md:pb-16 md:pt-36 lg:pt-44">
        <Container>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
            Our products
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold text-ink">
            Everything a crop needs
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg">
            Crop protection, fertilizers, biostimulants and customized
            formulations — developed with technical rigour and supplied with
            consistency.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-14 md:py-20 lg:py-28">
        <Container>
          {segments.length > 0 ? (
            <div className="space-y-5">
              {segments.map((seg, i) => (
                <article
                  key={seg._id}
                  className="lift group overflow-hidden rounded-card border border-line bg-paper"
                >
                  <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-field md:aspect-auto md:min-h-[260px]">
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

                      <h2 className="mt-3 font-display text-2xl font-semibold text-navy transition-colors group-hover:text-leaf">
                        {seg.title}
                      </h2>

                      {seg.shortDescription ? (
                        <p className="mt-3 text-stone">{seg.shortDescription}</p>
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
    </>
  );
}
