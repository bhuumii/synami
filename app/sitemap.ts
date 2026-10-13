import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

/**
 * Sitemap.
 *
 * Google finds pages by crawling links, but a sitemap tells it the full
 * set directly — including deep product pages that might be several clicks
 * from the homepage. On a site whose entire purpose is being found, this
 * is not optional.
 *
 * Served at /sitemap.xml automatically.
 *
 * IMPORTANT: change BASE to the real domain before launch. A sitemap full
 * of vercel.app URLs tells Google to index the wrong domain.
 */
const BASE = "https://synamiagriscience.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/capabilities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  try {
    const [segments, categories, products, capabilities] = await Promise.all([
      client.fetch<{ slug: string }[]>(
        `*[_type == "productSegment" && defined(slug.current)]{ "slug": slug.current }`
      ),
      client.fetch<{ slug: string; segment: string }[]>(
        `*[_type == "productCategory" && defined(slug.current) && defined(segment->slug.current)]{
          "slug": slug.current, "segment": segment->slug.current
        }`
      ),
      client.fetch<{ slug: string; category: string; segment: string }[]>(
        `*[_type == "product" && defined(slug.current)
            && defined(category->slug.current)
            && defined(category->segment->slug.current)]{
          "slug": slug.current,
          "category": category->slug.current,
          "segment": category->segment->slug.current
        }`
      ),
      client.fetch<{ slug: string }[]>(
        `*[_type == "infoPage" && section == "capabilities" && defined(slug.current)]{
          "slug": slug.current
        }`
      ),
    ]);

    return [
      ...staticRoutes,
      ...segments.map((s) => ({
        url: `${BASE}/products/${s.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...categories.map((c) => ({
        url: `${BASE}/products/${c.segment}/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...products.map((p) => ({
        url: `${BASE}/products/${p.segment}/${p.category}/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...capabilities.map((c) => ({
        url: `${BASE}/capabilities/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    /* If Sanity is unreachable at build time, still ship the static routes
       rather than failing the build and shipping no sitemap at all. */
    return staticRoutes;
  }
}
