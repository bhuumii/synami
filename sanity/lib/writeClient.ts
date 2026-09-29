import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Write client — SERVER ONLY.
 *
 * This carries a token with write permission. It must never be imported
 * into a client component, and its env var must never be prefixed with
 * NEXT_PUBLIC_, or the token ships to every visitor's browser and anyone
 * could rewrite the client's content.
 *
 * `useCdn: false` because writes must go to the live API, never a cache.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
