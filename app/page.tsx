import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles, formatArticleDate } from "@/lib/articles";
import { abs, breadcrumbJsonLd, JsonLd, MAIN_SITE, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LevelTag } from "@/components/articles/ArticleParts";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — The AI World` },
  description:
    "The AI World: plain-English and in-depth articles on artificial intelligence from MSRX — how it works, how to use it, and what it means. Diagrams throughout.",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: "MSRX Articles — The AI World",
    description: "Articles on artificial intelligence, from the basics to the maths, with diagrams throughout.",
    url: "/",
    type: "website",
  },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
];

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "MSRX articles",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: abs(`/${a.slug}`),
            name: a.title,
          })),
        }}
      />

      <div className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 pb-12 sm:pb-14">
          <Breadcrumbs trail={trail} tone="stage" />
          <p className="eyebrow mb-4" style={{ color: "var(--stage-text-tertiary)" }}>The AI World</p>
          <h1 className="display text-[clamp(34px,6vw,58px)] mb-4" style={{ color: "var(--stage-text-primary)" }}>
            Articles
          </h1>
          <p className="display-sm text-[clamp(17px,2.4vw,22px)] max-w-2xl" style={{ color: "var(--stage-text-secondary)" }}>
            Artificial intelligence, explained twice: once in plain words, once with the maths. Pick your depth.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-16">
        <Link
          href={`/${featured.slug}`}
          className="card-hover group grid lg:grid-cols-[1.15fr_1fr] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden"
        >
          <div className="p-7 sm:p-10 flex flex-col gap-4">
            <p className="mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
              Latest · {formatArticleDate(featured.published)}
            </p>
            <h2 className="display-sm text-[clamp(24px,3.4vw,34px)] text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-2">
              {featured.title}
            </h2>
            <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">{featured.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              {featured.levels.map((l) => <LevelTag key={l} level={l} />)}
            </div>
            <p className="mt-auto pt-2 flex items-center gap-4 text-[14px]">
              <span className="inline-flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <Clock size={14} aria-hidden="true" />
                {featured.readingMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--violet-deep)]">
                Start reading
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </p>
          </div>
          <FeaturedArt />
        </Link>

        {rest.length > 0 && (
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 flex flex-col gap-3"
              >
                <p className="mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  {formatArticleDate(a.published)} · {a.readingMinutes} min
                </p>
                <h2 className="display-sm text-[21px] text-[var(--text-primary)]">{a.title}</h2>
                <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{a.subtitle}</p>
              </Link>
            ))}
          </div>
        )}

        <p className="mt-12 text-[14.5px] text-[var(--text-tertiary)] max-w-2xl">
          New articles are listed here as they are published. Follow along with the <a href="/feed.xml" className="underline underline-offset-4 hover:text-[var(--text-primary)]">RSS feed</a>.
        </p>
      </div>
    </>
  );
}

/** Decorative panel for the featured card: a small network glowing in brand colours. */
function FeaturedArt() {
  const cols = [
    { x: 70, n: 3 },
    { x: 170, n: 5 },
    { x: 270, n: 5 },
    { x: 360, n: 2 },
  ];
  const ys = (n: number) => Array.from({ length: n }, (_, i) => 150 + (i - (n - 1) / 2) * 48);
  return (
    <div className="relative min-h-[240px] msrx-gradient" aria-hidden="true">
      <svg viewBox="0 0 430 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        {cols.slice(0, -1).flatMap((c, ci) =>
          ys(c.n).flatMap((y1) =>
            ys(cols[ci + 1].n).map((y2) => (
              <line key={`${ci}-${y1}-${y2}`} x1={c.x} y1={y1} x2={cols[ci + 1].x} y2={y2} stroke="white" strokeOpacity="0.28" strokeWidth="1" />
            )),
          ),
        )}
        {cols.flatMap((c) =>
          ys(c.n).map((y) => <circle key={`${c.x}-${y}`} cx={c.x} cy={y} r="11" fill="white" fillOpacity="0.92" />),
        )}
        <text x="215" y="286" textAnchor="middle" fill="white" fillOpacity="0.85" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="2">
          y = σ(Wx + b)
        </text>
      </svg>
    </div>
  );
}
