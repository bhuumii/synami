import type { MetadataRoute } from "next";

/**
 * Served at /robots.txt automatically.
 *
 * /studio is disallowed — it's the Sanity CMS. It requires a login so it
 * isn't a security hole, but it has no business appearing in search
 * results for the client's brand name.
 *
 * /api is disallowed because those are form endpoints, not pages.
 */
const BASE = "https://synamiagriscience.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
