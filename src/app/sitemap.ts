import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/**
 * One page, so this is short — but it gives Search Console something to submit
 * and a place to add entries if the site ever grows past a single page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
