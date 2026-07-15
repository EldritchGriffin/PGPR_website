import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Fetch directly from the API (not Sanity's CDN cache) so that
  // Next's tag-based revalidation (see app/api/revalidate/route.ts)
  // is the single source of truth for freshness.
  useCdn: false,
});
