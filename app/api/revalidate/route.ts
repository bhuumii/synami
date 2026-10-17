import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Sanity → Vercel revalidation webhook.
 *
 * Pages are built with `revalidate = 3600`, so without this a content
 * change takes up to an hour to appear. The client publishes, refreshes,
 * sees nothing, and reports the site as broken. This closes that gap to
 * a few seconds.
 *
 * Authentication is a shared secret in a custom header rather than
 * Sanity's signed payload. Signature verification needs an extra package
 * and buys little here: the endpoint only triggers a rebuild, so the
 * worst a leaked secret allows is someone making the site refresh itself.
 *
 * Revalidating the whole tree rather than specific paths is deliberate.
 * A thirty-page site rebuilds in seconds, and targeted invalidation is
 * where this kind of code quietly goes wrong — a product page updates but
 * the category listing it appears on doesn't, and nobody notices for
 * weeks. Worth revisiting only if the site grows large enough that full
 * revalidation becomes slow.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  if (request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* Sanity can send an empty body on a test ping. Revalidate anyway. */
  }

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    type: body._type ?? "unknown",
    at: new Date().toISOString(),
  });
}

/** A GET makes it easy to confirm the route is deployed. */
export async function GET() {
  return NextResponse.json({ ok: true, route: "revalidate" });
}
