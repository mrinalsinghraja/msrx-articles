import { getArticle, type Article } from "@/lib/articles";
import { ogSize, renderOg } from "@/lib/og";

const article = getArticle("agentic-ai-101") as Article;

export const alt = article.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: `${article.series} · ${article.readingMinutes} min read`, title: article.title, subtitle: article.subtitle });
}
