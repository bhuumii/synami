import type { Metadata } from "next";
import "./globals.css";
import { Header, type CapabilityLink } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { client } from "@/sanity/lib/client";
import {
  productNavQuery,
  siteSettingsQuery,
  capabilityNavQuery,
} from "@/sanity/lib/queries";
import type { NavSegment } from "@/lib/nav-types";

export const metadata: Metadata = {
  metadataBase: new URL("https://synamiagriscience.com"),
  title: {
    default: "Synami Agriscience — Crop protection, fertilizers and biostimulants",
    template: "%s | Synami Agriscience",
  },
  description:
    "Synami Agriscience develops and supplies crop protection, fertilizer and biostimulant solutions for agricultural businesses in India and international markets.",
  openGraph: { type: "website", siteName: "Synami Agriscience", locale: "en_IN" },
  robots: { index: true, follow: true },
};

/**
 * The layout fetches navigation ONCE and passes it to Header and Footer.
 * Sanity is the single source; every place that lists products or Insights
 * pages reads from the same result.
 */
export default async function RootLayout({
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&f[]=switzer@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
      </body>
    </html>
  );
}
