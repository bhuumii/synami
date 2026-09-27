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
 * A single product in a grid.
 *
 * Product names run long — "Azoxystrobin 11% + Tebuconazole 18.3% SC" is 40
 * characters — so the title wraps normally at a modest size and is never
 * truncated. Cutting a chemical name mid-formula makes it unreadable.
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
  return (
    <Link
      href={`/products/${segmentSlug}/${categorySlug}/${product.slug}`}
      className="lift group flex flex-col overflow-hidden rounded-card border border-line bg-paper"
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
        {product.brandName ? (
          <span className="font-display text-xs uppercase tracking-[0.16em] text-leaf">
            {product.brandName}
          </span>
        ) : null}

        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-leaf">
          {product.title}
        </h3>

        {product.shortDescription ? (
          <p className="mt-3 text-sm text-stone">{product.shortDescription}</p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-display text-sm font-medium text-leaf">
          View product
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
