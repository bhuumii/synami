import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export type ProductCardData = {
  _id: string;
  title: string;
  brandName?: string;
  slug: string;
  shortDescription?: string;
  formulationType?: string;
  heroImage?: { alt?: string };
};

/**
 * A product in a grid.
 *
 * Brand name leads, in the logo navy with a pale green marker stroke
 * behind it that sweeps wider on hover. The chemical name sits under it
 * as a subtitle.
 *
 * That order matters commercially: a distributor remembers the brand,
 * then checks the composition. The card used to do the reverse.
 */
export function ProductCard({
  product,
  segmentSlug,
  categorySlug,
}: {
  product: ProductCardData;
  segmentSlug: string;
  categorySlug: string;
}) {
  const hasBrand = !!product.brandName;

  return (
    <Link
      href={`/products/${segmentSlug}/${categorySlug}/${product.slug}`}
      className="lift group flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-field">
        {product.heroImage ? (
          <Image
            src={urlFor(product.heroImage as never).width(800).height(600).fit("crop").url()}
            alt={product.heroImage.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : null}

        {product.formulationType ? (
          <span className="absolute left-4 top-4 rounded-pill bg-paper/95 px-3 py-1 font-display text-xs font-medium text-leaf backdrop-blur">
            {product.formulationType}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Brand name — the headline of the card */}
        <h3 className="relative inline-block self-start font-display text-xl font-semibold leading-snug text-navy">
          {/* Marker stroke, sitting behind the lower half of the text */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-[0.1em] -z-10 h-[0.42em] origin-left scale-x-[0.35] rounded-sm bg-leaf/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
          {hasBrand ? product.brandName : product.title}
        </h3>

        {/* Composition, as a subtitle */}
        {hasBrand ? (
          <p className="mt-1.5 font-display text-sm font-medium text-leaf">
            {product.title}
          </p>
        ) : null}

        {product.shortDescription ? (
          <p className="mt-3 text-sm leading-relaxed text-stone">
            {product.shortDescription}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-display text-sm font-medium text-leaf">
          View product
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
