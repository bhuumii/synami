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
 * outside this group, so it gets none of this.
 *
 * No <html> or <body> here — those belong to the root layout. A nested
 * layout that repeats them produces invalid HTML.
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
