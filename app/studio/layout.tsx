import type { Metadata } from "next";

/**
 * Keeps Sanity Studio out of search results.
 *
 * The Studio is on a public URL. It needs a login, so this isn't a
 * security measure — it just stops "/studio" turning up when someone
 * googles the client's brand name, which looks careless.
 */
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
