import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful for a crawler, and it only accepts POST.
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
