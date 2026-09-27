import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read-only client used by pages.
 *
 * `useCdn: true` serves from Sanity's cache — faster and cheaper. Content
 * updates reach the site through Next's revalidation, not through bypassing
 * the CDN.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
