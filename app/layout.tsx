/**
 * PHASE 2 LAYOUT
 *
 * Rename this file to `layout.tsx`, replacing the Phase 1 version.
 * The only change is that Header and Footer now wrap every page.
 *
 * Note there is no top padding on <main>. The header is fixed and sits over
 * the hero on purpose. Any page WITHOUT a full-bleed hero needs its first
 * section to carry `pt-32` so the content clears the header.
 */

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://synamiagriscience.com"),
  title: {
    default: "Synami Agriscience — Crop protection, fertilizers and biostimulants",
    template: "%s | Synami Agriscience",
  },
  description:
    "Synami Agriscience develops and supplies crop protection, fertilizer and biostimulant solutions for agricultural businesses in India and international markets.",
  openGraph: {
    type: "website",
    siteName: "Synami Agriscience",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
