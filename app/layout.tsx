import type { Metadata } from "next";
import "./globals.css";

/**
 * ROOT LAYOUT — chrome-free.
 *
 * Header and Footer have moved to app/(site)/layout.tsx. They were here
 * before, which meant they also wrapped /studio — the site header rendered
 * on top of Sanity Studio and covered its sidebar.
 *
 * A root layout wraps every route including /studio, and a child layout
 * cannot remove an ancestor. The only clean fix is to move the chrome down
 * one level into a route group that Studio isn't part of.
 *
 * Parentheses make (site) a ROUTE GROUP: it organises files without
 * appearing in any URL. /about stays /about.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://synamiagriscience.com"),
  title: {
    default: "Synami Agriscience Private Limited",
    template: "%s | Synami Agriscience",
  },
  description:
    "Synami Agriscience develops and supplies crop protection, biologicals and fertilizers for agricultural businesses in India and international markets.",
  openGraph: { type: "website", siteName: "Synami Agriscience", locale: "en_IN" },
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
      <body>{children}</body>
    </html>
  );
}
