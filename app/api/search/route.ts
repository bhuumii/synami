import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { searchIndexQuery } from "@/sanity/lib/queries";

/**
 * Search index.
 *
 * Returns every main category, category and product as one flat list.
 * The browser fetches it once when the search panel is first opened and
 * filters locally from then on — so typing is instant and there's no
 * request per keystroke.
 *
 * Viable because the catalogue is small. If Synami ever reaches a few
 * thousand products this should become a server-side query instead, but
 * at this size shipping the index is both simpler and faster.
 */
export const revalidate = 3600;

export async function GET() {
  try {
    const data = await client.fetch(searchIndexQuery);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ segments: [], categories: [], products: [] });
  }
}
