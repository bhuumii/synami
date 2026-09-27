/**
 * Mounts Sanity Studio at /studio inside the Next.js app.
 *
 * `dynamic = "force-static"` and the metadata export come from Sanity's
 * recommended Next.js setup — the Studio is a client-side app, so the route
 * itself is static and everything happens in the browser.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
