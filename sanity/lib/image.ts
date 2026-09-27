import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a URL for a Sanity image.
 *
 *   urlFor(img).width(1600).height(900).fit("crop").url()
 *
 * Always set an explicit width — Sanity serves the original otherwise, which
 * for a landscape hero can be several megabytes.
 */
export function urlFor(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
