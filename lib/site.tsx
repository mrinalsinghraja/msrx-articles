// Site-wide constants and SEO helpers for articles.msrx.co.in.
//
// The MSRX Organization entity is defined once, on the main site, and referenced
// here by @id — two sites describing the same brand should point at one node,
// not publish two slightly different copies of it.

export const SITE_URL = "https://articles.msrx.co.in";
export const MAIN_SITE = "https://www.msrx.co.in";
export const ORG_ID = `${MAIN_SITE}/#organization`;
export const SITE_NAME = "MSRX Articles";
export const AUTHOR = {
  name: "Mrinal Singh Raja",
  url: "https://www.linkedin.com/in/mrinalsinghraja/",
};

/** Absolute URL for a site-relative path. Absolute URLs pass through unchanged. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Trim to what a search result shows (~155 chars), on a word boundary. */
export function metaDescription(text: string, limit = 155): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[.,;:—-]$/, "")}…`;
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/**
 * JSON for an inline <script type="application/ld+json">. JSON.stringify does
 * not escape `<`, so a value containing `</script>` would end the tag; this
 * escapes it, along with the two line terminators older parsers choke on.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Renders a JSON-LD block. Keeps dangerouslySetInnerHTML in one place. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
