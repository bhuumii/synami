import { Header, type CapabilityLink } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { client } from "@/sanity/lib/client";
import {
  productNavQuery,
  siteSettingsQuery,
  capabilityNavQuery,
} from "@/sanity/lib/queries";
import type { NavSegment } from "@/lib/nav-types";

/**
 * SITE LAYOUT — everything the public sees.
 *
 * Fetches navigation once and passes it to Header and Footer. /studio sits
 * outside this route group, so it gets none of this chrome.
 *
 * No About query here: the About menu is a fixed four-page structure
 * defined in the Header, because each of those pages is its own route with
 * its own layout.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [segments, settings, capabilities] = await Promise.all([
    client.fetch<NavSegment[]>(productNavQuery),
    client.fetch(siteSettingsQuery),
    client.fetch<CapabilityLink[]>(capabilityNavQuery),
  ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header segments={segments ?? []} capabilities={capabilities ?? []} />
      <main id="main">{children}</main>
      <Footer
        segments={segments ?? []}
        capabilities={capabilities ?? []}
        settings={settings}
      />
    </>
  );
}
