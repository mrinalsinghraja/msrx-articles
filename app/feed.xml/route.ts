import { articles } from "@/lib/articles";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

// RSS 2.0, generated from the same registry that renders the site.
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

export function GET() {
  const items = articles
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${a.slug}</guid>
      <pubDate>${rfc822(a.published)}</pubDate>
      <description>${esc(a.description)}</description>
${a.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} — The AI World</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Artificial intelligence explained twice: once in plain words, once with the maths.</description>
    <language>en</language>
    <managingEditor>mrinalsinghraja@gmail.com (${esc(AUTHOR.name)})</managingEditor>
${articles[0] ? `    <lastBuildDate>${rfc822(articles[0].updated)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
