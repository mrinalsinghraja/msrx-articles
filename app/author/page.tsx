import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles, formatArticleDate } from "@/lib/articles";
import { abs, AUTHOR, AUTHOR_PROFILES, breadcrumbJsonLd, JsonLd, MAIN_SITE, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Every statement here comes from the author's own public about page
// (mrinalsinghraja.github.io/about). Keep it that way: no employer, no years of
// experience, no credentials that a reader could not check.

const path = "/author";
const DESCRIPTION =
  "Mrinal Singh Raja, a software engineer in Bengaluru, builds free apps under MSRX and writes The AI World: AI explained for beginners and technical readers at once.";

export const metadata: Metadata = {
  title: `${AUTHOR.name}, author`,
  description: DESCRIPTION,
  alternates: { canonical: path },
  openGraph: { title: `${AUTHOR.name} — ${SITE_NAME}`, description: DESCRIPTION, url: abs(path), siteName: SITE_NAME, type: "profile" },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
  { name: AUTHOR.name, path },
];

export default function Author() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: abs(path),
          mainEntity: {
            "@type": "Person",
            "@id": `${abs(path)}#person`,
            name: AUTHOR.name,
            url: abs(path),
            jobTitle: "Software engineer",
            homeLocation: { "@type": "Place", name: "Bengaluru, India" },
            sameAs: AUTHOR.sameAs,
          },
        }}
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-8 pb-20">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow text-[var(--text-tertiary)] mt-8 mb-3">Author</p>
        <h1 className="display text-[clamp(32px,5vw,52px)] text-[var(--text-primary)] mb-4">{AUTHOR.name}</h1>
        <p className="text-[18px] leading-relaxed text-[var(--text-secondary)] mb-10">
          Software engineer in Bengaluru, and the writer behind <em>The AI World</em>.
        </p>

        <div className="article-prose">
          <p>
            I build and ship apps across the web, macOS and iOS under the <a href={MAIN_SITE}>MSRX</a> brand. They are small on purpose — each one does a single job — and every one is free: there is no paid tier, no subscription and nothing to upsell. Most don’t ask for an account either.
          </p>
          <p>
            None of it is a business. I build these because I enjoy building them, and the good part is when someone else gets some use out of one. I am glad to collaborate, I make time for community work, and I welcome ideas for tools that should exist but don’t.
          </p>
          <p>
            <em>The AI World</em> is where I explain the technology those apps are built on. Every article is written for beginners and technical readers at once, checked against primary sources, and open about how it was made — see the <Link href="/standards">editorial standards</Link>.
          </p>
        </div>

        <h2 className="display-sm text-[21px] text-[var(--text-primary)] mt-12 mb-3">Elsewhere</h2>
        <ul className="flex flex-wrap gap-2.5">
          {AUTHOR_PROFILES.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                rel="noopener me"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-[14px] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              >
                {p.label}
                <ArrowUpRight size={13} aria-hidden="true" className="text-[var(--text-tertiary)]" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={`${MAIN_SITE}/contact`}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-[14px] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
            >
              Contact
            </a>
          </li>
        </ul>

        <h2 className="display-sm text-[21px] text-[var(--text-primary)] mt-12 mb-3">Articles</h2>
        <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {articles.map((a) => (
            <li key={a.slug} className="py-3.5">
              <Link href={`/${a.slug}`} className="text-[15.5px] font-semibold text-[var(--text-primary)] hover:underline underline-offset-4">
                {a.title}
              </Link>
              <p className="mt-0.5 text-[13px] text-[var(--text-tertiary)]">
                <time dateTime={a.published}>{formatArticleDate(a.published)}</time> · {a.readingMinutes} min read
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
