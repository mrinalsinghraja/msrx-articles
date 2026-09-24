// ── MSRX articles ─────────────────────────────────────────────────────────────
// Single source of truth for the articles published on articles.msrx.co.in.
// Powers the index, each article's metadata and JSON-LD, the sitemap, the RSS
// feed and llms.txt. See README.md for how to add one.
//
// The article bodies themselves are hand-written pages under app/<slug>,
// because each one carries its own diagrams. This file holds only what is shown
// *about* an article elsewhere on the site, so a listing never has to import a
// whole article to render a card.
//
// Every field is published, so every field has to be true. Before publishing,
// check each dated fact in an article against its primary source (the paper,
// the prize announcement) — README.md has the checklist.

export type ArticleLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Article {
  /** URL path: articles.msrx.co.in/<slug>. Stable once published. */
  slug: string;
  title: string;
  /** One line under the title. Sentence case, no period. */
  subtitle: string;
  /** Two or three sentences. Used on cards, meta description and JSON-LD. */
  description: string;
  /** ISO date first published. */
  published: string;
  /** ISO date of the last substantive edit. */
  updated: string;
  /** Rounded to the minute at ~230 words per minute. */
  readingMinutes: number;
  /** Levels the article covers, from where it starts to where it ends. */
  levels: ArticleLevel[];
  /** Series the article belongs to. One today; kept as data. */
  series: "The AI World";
  tags: string[];
  /** AA against white, like the app accents. */
  accent: string;
}

/** Newest first. */
export const articles: Article[] = [
  {
    slug: "chatgpt-101",
    title: "ChatGPT 101: from your first chat to the API",
    subtitle: "Its history, how it works, step-by-step setup, prompting that works, every major feature, and building with it in code",
    description:
      "A complete beginner-to-advanced guide to ChatGPT: where it came from, what happens when you press Enter, setting it up, the six ingredients of a great prompt, features from files to agents, staying safe, context windows, tool calls and your first API call.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readingMinutes: 22,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["ChatGPT", "Prompting", "Custom GPTs", "OpenAI API", "Structured outputs", "AI for beginners"],
    accent: "#15803D",
  },
  {
    slug: "welcome-to-the-world-of-ai",
    title: "Welcome to the awesome world of Artificial Intelligence",
    subtitle: "From “what even is AI?” to attention heads, gradients and agents, in one sitting",
    description:
      "A guided tour of artificial intelligence that starts with everyday examples and ends inside a transformer. Machine learning, neural networks, how ChatGPT-style models are built, diffusion, RAG, agents, risks and a learning roadmap, with diagrams throughout.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readingMinutes: 22,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI basics", "Machine learning", "Neural networks", "LLMs", "Transformers", "Agents"],
    accent: "#6D28D9",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** "24 September 2026" — the site writes dates day-first, in words. */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
