import type { Metadata } from "next";
import Link from "next/link";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const path = "/standards";
const DESCRIPTION =
  "How MSRX Articles are researched, sourced, checked, illustrated and corrected: primary sources, 5–10 checked references per article, labelled illustrations, and dated updates.";

export const metadata: Metadata = {
  title: "Editorial standards",
  description: DESCRIPTION,
  alternates: { canonical: path },
  openGraph: { title: `Editorial standards — ${SITE_NAME}`, description: DESCRIPTION, url: abs(path), siteName: SITE_NAME, type: "website" },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
  { name: "Editorial standards", path },
];

export default function Standards() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-8 pb-20">
        <Breadcrumbs trail={trail} />
        <h1 className="display text-[clamp(32px,5vw,52px)] text-[var(--text-primary)] mt-8 mb-4">Editorial standards</h1>
        <p className="text-[18px] leading-relaxed text-[var(--text-secondary)] mb-10">
          What you can expect from every article on {SITE_NAME}, and how to tell us when we get something wrong.
        </p>

        <div className="article-prose">
          <h2 id="sources">Sources and fact-checking</h2>
          <p>
            Every dated fact, name, number and prize in an article is checked against its primary source before publishing: the original paper, the official announcement, or the product’s own documentation, rather than coverage of it.
          </p>
          <p>
            Each article ends with a numbered list of <strong>five to ten references</strong>. For each one we give the authors, the date, where it was published, and what in the article it supports. Every link is opened and checked before it is listed. Documentation changes over time, so undated documentation is cited as it read on the day it was checked.
          </p>

          <h2 id="illustrations">Illustrations and examples</h2>
          <p>
            Diagrams are drawings made for the article. Interface screens are illustrations unless they are captioned as a real screenshot. Terminal output is labelled “real run”, with the date, only when it was captured from a real run. Numbers made up to explain an idea, such as probabilities or sample outputs, are labelled as illustrative.
          </p>

          <h2 id="levels">Written for two readers at once</h2>
          <p>
            Every section is tagged <em>Beginner</em>, <em>Intermediate</em> or <em>Advanced</em>, so newcomers can follow the plain-language sections and technical readers can go straight to the depth they want.
          </p>

          <h2 id="independence">Independence</h2>
          <p>
            Articles are written by {AUTHOR.name}. {SITE_NAME} is independent and is not affiliated with, or endorsed by, the companies whose products it explains. Each article says so, and names the products and their makers.
          </p>

          <h2 id="updates">Updates and corrections</h2>
          <p>
            AI products change quickly. When a fact goes out of date or we find an error, we fix the article and change its <em>Updated</em> date, which is shown under the headline next to the date it was first published.
          </p>
          <p>
            Spotted something wrong or out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>, with a link to a source if you have one.
          </p>
        </div>

        <p className="mt-12">
          <Link href="/" className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
            All articles
          </Link>
        </p>
      </div>
    </>
  );
}
