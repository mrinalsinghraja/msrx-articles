import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

// lastModified is each article's real edit date, never the build time: a
// lastmod that always says "today" teaches crawlers to ignore it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: articles[0]?.updated, changeFrequency: "weekly", priority: 1 },
    ...articles.map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: a.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
