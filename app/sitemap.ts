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
    { url: `${SITE_URL}/standards`, lastModified: "2026-09-28", changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/author`, lastModified: "2026-09-28", changeFrequency: "monthly", priority: 0.4 },
  ];
}
