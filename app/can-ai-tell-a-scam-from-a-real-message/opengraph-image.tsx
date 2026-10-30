import { getArticle, type Article } from "@/lib/articles";
import { ogSize, renderOg } from "@/lib/og";

const article = getArticle("can-ai-tell-a-scam-from-a-real-message") as Article;

export const alt = article.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: `${article.series} · ${article.readingMinutes} min read`, title: article.title, subtitle: article.subtitle });
}
