import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { capabilityNavQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";

type Item = { _id: string; title: string; slug: string; menuBlurb?: string };

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Solutions, quality and global business at Synami Agriscience.",
};

export const revalidate = 3600;

/** Index of everything in the Insights menu. Generated from Sanity. */
export default async function CapabilitiesPage() {
  const items: Item[] = await client.fetch(capabilityNavQuery);

  return (
    <>
      <PageHero
        title="Insights"
        eyebrow="More than products"
        intro="How we work, what we hold ourselves to, and where we're going."
      />

      <section className="bg-paper py-14 md:py-20 lg:py-28">
        <Container>
          {items.length > 0 ? (
            <ul className="border-t border-line">
              {items.map((item, i) => (
                <li key={item._id} className="group relative border-b border-line">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <Link
                    href={`/capabilities/${item.slug}`}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-field/60 group-hover:pl-6 md:gap-x-10"
                  >
                    <span className="font-display text-sm tabular-nums text-slate transition-colors group-hover:text-leaf">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-xl font-semibold text-navy transition-colors group-hover:text-leaf md:text-2xl">
                        {item.title}
                      </span>
                      {item.menuBlurb ? (
                        <span className="mt-2 block text-stone">{item.menuBlurb}</span>
                      ) : null}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-leaf transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-stone">Pages are being added.</p>
          )}
        </Container>
      </section>
    </>
  );
}
