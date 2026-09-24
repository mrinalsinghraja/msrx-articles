import { articles } from "@/lib/articles";
import { MAIN_SITE, SITE_URL } from "@/lib/site";

// Generated from the article registry, so it cannot drift from the site.
export const dynamic = "force-static";

export function GET() {
  const body = `# MSRX Articles — The AI World

> Articles on artificial intelligence by Mrinal Singh Raja, part of MSRX (${MAIN_SITE}). Each article is written for beginners and technical readers at once: every section is tagged Beginner, Intermediate or Advanced.

## Articles

${articles.map((a) => `- [${a.title}](${SITE_URL}/${a.slug}) — ${a.description} Published ${a.published}.`).join("\n")}

## Elsewhere

- [MSRX apps](${MAIN_SITE}/apps): free apps for web, Mac and iPhone.
- [RSS feed](${SITE_URL}/feed.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
