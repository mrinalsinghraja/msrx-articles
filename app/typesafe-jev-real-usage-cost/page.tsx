import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { Cite, References } from "@/components/articles/References";
import { citationJsonLd } from "@/lib/references";
import {
  BatchCompare,
  BillCheck,
  ClaimCheck,
  DoTheSum,
  Jagged,
  NotInThere,
  PerRequest,
  Pic,
  PriceCompare,
  PriceTable,
  ReadOff,
  SpeedKnown,
  WhoDoesWhat,
} from "@/components/figures/jev-cost-guide";

const article = getArticle("typesafe-jev-real-usage-cost") as Article;
const previous = getArticle("redesigning-source-control") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  console: "https://console.typesafe.ai/usage",
  models: "https://docs.typesafe.ai/models",
  pricing: "https://platform.claude.com/docs/en/about-claude/pricing",
  system: "https://docs.typesafe.ai/concepts/system-one",
  build: "https://docs.typesafe.ai/concepts/how-to-build-with-system-one",
  parallel: "https://docs.typesafe.ai/cookbooks/parallel_questions",
  jagged: "https://docs.typesafe.ai/model-jaggedness/jev-1.13",
};

export const metadata: Metadata = {
  title: article.title,
  description: metaDescription(article.description),
  alternates: { canonical: path },
  authors: [AUTHOR],
  keywords: article.tags,
  openGraph: {
    title: article.title,
    description: metaDescription(article.description),
    url: abs(path),
    siteName: SITE_NAME,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    authors: [AUTHOR.name],
    tags: article.tags,
  },
  twitter: { card: "summary_large_image", title: article.title, description: metaDescription(article.description) },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
  { name: "What $1.26 bought", path },
];

const TOC = [
  { id: "page", label: "The usage page" },
  { id: "bill", label: "How Jev bills" },
  { id: "request", label: "What a request weighs" },
  { id: "elsewhere", label: "The same tokens elsewhere" },
  { id: "why", label: "Why a call is cheap" },
  { id: "speed", label: "What about speed?" },
  { id: "limits", label: "Where it does not fit" },
  { id: "sum", label: "Do the sum yourself" },
  { id: "claims", label: "Claims, checked" },
  { id: "references", label: "References" },
];

export default function JevRealUsageCost() {
  return (
    <>
      <ReadingProgress />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.description,
          url: abs(path),
          mainEntityOfPage: abs(path),
          image: abs(`${path}/opengraph-image`),
          datePublished: article.published,
          dateModified: article.updated,
          inLanguage: "en",
          proficiencyLevel: "Beginner to Expert",
          keywords: article.tags.join(", "),
          timeRequired: `PT${article.readingMinutes}M`,
          about: [
            { "@type": "Organization", name: "TypeSafe AI" },
            { "@type": "SoftwareApplication", name: "Jev" },
            { "@type": "Thing", name: "AI inference cost" },
          ],
          isPartOf: { "@type": "CreativeWorkSeries", name: article.series, url: abs("/") },
          author: { "@type": "Person", ...AUTHOR },
          publisher: { "@id": ORG_ID },
          citation: citationJsonLd(article.slug),
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────────*/}
      <header className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} tone="stage" />
          <p className="eyebrow mb-4" style={{ color: "var(--stage-text-tertiary)" }}>
            {article.series} · Article 16
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            What <span className="msrx-gradient-text">$1.26</span> bought: a real day of TypeSafe Jev
          </h1>
          <p className="display-sm text-[clamp(18px,2.4vw,23px)] max-w-3xl mb-7" style={{ color: "var(--stage-text-secondary)" }}>
            {article.subtitle}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]" style={{ color: "var(--stage-text-secondary)" }}>
            <span>By <Link href="/author" rel="author" className="font-bold underline-offset-4 hover:underline" style={{ color: "var(--stage-text-primary)" }}>{AUTHOR.name}</Link></span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
            </span>
            {article.updated !== article.published && (
              <span>
                Updated <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mb-2">How to read this</p>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-3">
              This is a case study built from one real screenshot of a usage page. It does the arithmetic in the open, prices the same tokens at other models’ published
              rates, and says plainly what the screenshot cannot show. Green sections need no background. Amber ones do the sums. Red ones cover design and limits.
              It does not repeat the basics: for those, see <Link href="/typesafe-jev-101" className="underline underline-offset-2">TypeSafe Jev 101</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              <LevelTag level="Beginner" />
              <LevelTag level="Intermediate" />
              <LevelTag level="Advanced" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────*/}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem] gap-12 xl:gap-20">
          <article className="article-prose min-w-0 max-w-[44rem]">
            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="page" level="Beginner" number={1}>The usage page</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Over 24 hours, one developer machine made 54,890 requests to TypeSafe’s Jev model, used 38,304,199 tokens, and the console estimated the spend at $1.2609.<Cite slug={S} src={U.console} />
            </p>
            <p>
              That is the whole story in one sentence, and the screenshot below is where it comes from. It is the console’s Usage page, captured on 15 October 2026. We use it as raw material rather than as a boast: the aim is to show how to read such a page, what its numbers do and do not support, and what the same volume would have cost elsewhere.
            </p>
            <Figure number={1} caption="Real screenshot of the TypeSafe console Usage page, captured 15 October 2026, last 24 hours, all traffic, daily view. The account name and balance are the author’s own.">
              <Pic file="console-usage.webp" alt="TypeSafe console Usage page. Spend $1.2609, tokens 38,304,199, requests 54,890, one API key named macbook-dev with 30,021,743 input tokens, and a note that spend is estimated at $0.042 per million input tokens with free output." width={2000} height={1424} />
            </Figure>
            <Figure number={2} caption="The four numbers we will use, read off the page.">
              <ReadOff />
            </Figure>
            <Callout kind="eli5">
              <p>A usage page is a meter, like the one on your electricity connection. It tells you how much went through and what it cost. It does not tell you whether the lights were worth switching on.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="bill" level="Beginner" number={2}>How Jev bills</SectionHeading>
            <p>
              Jev is priced per input token: $0.042 per million, or $42 per billion. Output tokens are free.<Cite slug={S} src={U.models} /> The Usage page repeats this in its footnote: “Estimated at $0.042/MTok input · Free output.”
            </p>
            <p>
              That makes the bill easy to check. Multiply the input tokens on the page, 30,021,743, by the price.
            </p>
            <Figure number={3} caption="The bill, recomputed from the page’s own numbers.">
              <BillCheck />
            </Figure>
            <p>
              It comes to $1.2609, exactly the figure shown. So the spend is the input tokens alone, at list price. Two things follow. First, the page’s spend is an estimate, as its asterisk says. Second, because output is free, the cost of a Jev call depends on how much you send, not on how much comes back.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="request" level="Intermediate" number={3}>What a request weighs</SectionHeading>
            <p>
              Divide the totals by the 54,890 requests and a typical request is small: about 547 input tokens, and about 698 tokens of all kinds. At the estimated price each costs about two thousandths of a cent, and a thousand requests cost about two cents.
            </p>
            <Figure number={4} caption="Per-request averages. The page gives totals only, so individual requests will vary.">
              <PerRequest />
            </Figure>
            <p>
              The 8.3 million tokens that are not input, the difference between 38.3 million and 30.0 million, are presumably output, which Jev does not charge for. The screenshot does not label the two colours in the Tokens chart, so we treat that split as an inference.
            </p>
            <Callout kind="deep">
              <p>The page’s window is the last 24 hours, which straddles two calendar days: a small bar for 14 October and a large one for 15 October. Jev 1.14 became available on 14 October 2026.<Cite slug={S} src={U.models} /> The page does not say which model version served these requests, so we make no claim about it.</p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="elsewhere" level="Intermediate" number={4}>The same tokens elsewhere</SectionHeading>
            <p>
              The natural question is what this would have cost on a general-purpose model. To answer it honestly we need real prices, not guesses. Anthropic publishes its list prices per million tokens: Claude Haiku 5.5 at $0.10 for input and $0.50 for output (for prompts up to 100,000 tokens), Sonnet 5.5 at $2 and $10, Opus 5.5 at $4 and $20, and Fable 5.1 at $10 and $50.<Cite slug={S} src={U.pricing} /> Applying these to the same 30.0 million input and 8.3 million output tokens gives the comparison below.
            </p>
            <Figure number={5} caption="The same tokens at list prices. Jev’s figure is the console’s estimate; the others are arithmetic from published rates.">
              <PriceCompare />
            </Figure>
            <p>
              The spread is large and the honest reading is nuanced. Against Anthropic’s smallest model the same tokens would cost about $7.14, roughly 5.7 times as much. Against the larger models it is 100 times or more. Which one is the fair comparator depends on what job you would otherwise give the model.
            </p>
            <Figure number={6} caption="The price table behind Figure 5.">
              <PriceTable />
            </Figure>
            <p>
              A price comparison also leaves a lot out. It assumes the other model would use the same number of tokens, that discounts do not apply, and, most importantly, that the answers are equally good.
            </p>
            <Figure number={7} caption="What the comparison does not include.">
              <NotInThere />
            </Figure>
            <Callout kind="warn">
              <p>Anthropic makes Claude, which also drafted this article, and we used its price page because it was the one we could read in full. OpenAI’s pricing page was behind a bot wall when we tried, so no other vendor is compared. Treat Figure 5 as one set of reference prices, not a market survey.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="why" level="Intermediate" number={5}>Why a call is cheap</SectionHeading>
            <p>
              Jev is described by TypeSafe as the first “System One” model: built for fast, structured decisions that software can use directly, returning typed answers and probabilities rather than generated text.<Cite slug={S} src={U.system} /> It does not write replies, produce code or explain its reasoning.<Cite slug={S} src={U.system} /> It answers closed questions: pick one of these options, rate this against these levels, or give the probability that this is true.
            </p>
            <p>
              That narrow job is the reason a request can be small and the output free. The docs’ advice follows from it: keep your code in control of the workflow and give the model narrow, structured decisions.<Cite slug={S} src={U.build} />
            </p>
            <Figure number={8} caption="A division of labour of the kind the docs recommend. An illustration, not TypeSafe’s diagram.">
              <WhoDoesWhat />
            </Figure>
            <p>
              The second cost lever is batching. Jev reads the state once and evaluates every question against it in parallel. TypeSafe’s cookbook runs 13 questions over a long article both ways and reports that one batched call was 12.2 times cheaper and 10.0 times faster than 13 separate calls, with no change in answers.<Cite slug={S} src={U.parallel} /> The reason is plain: with separate calls the document is paid for again each time.
            </p>
            <Figure number={9} caption="One document, many questions. The numbers are TypeSafe’s, from an earlier model version, on one task.">
              <BatchCompare />
            </Figure>
            <p>
              We cannot tell from the Usage page whether the 54,890 requests were batched. If your own workload asks many questions about one input, batching is the first thing to check.
            </p>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="speed" level="Intermediate" number={6}>What about speed?</SectionHeading>
            <p>
              It is tempting to say Jev made the work faster, and it may well have. But the Usage page does not show latency or time saved, so it cannot support a number. What we have is TypeSafe’s own benchmark for batching, and the method for getting your own.
            </p>
            <Figure number={10} caption="What is known about speed, and what is not.">
              <SpeedKnown />
            </Figure>
            <p>
              The fair test is simple: take a fixed sample of real inputs, run it through both setups, record start and end times for each call, and compare the medians and the slowest cases. Compare answers on the same sample at the same time. A fast wrong answer is not a saving.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="limits" level="Advanced" number={7}>Where it does not fit</SectionHeading>
            <p>
              Cheap and fast are only useful if the model is right for the job. TypeSafe’s own documentation lists the weak spots plainly: Jev reads literally, struggles with numeric precision and counting, handles dates poorly as ordered quantities, loses accuracy with indirection and with large amounts of irrelevant state, and does not generate text.<Cite slug={S} src={U.jagged} />
            </p>
            <Figure number={11} caption="The weak spots, condensed from the docs, with the fix the docs suggest.">
              <Jagged />
            </Figure>
            <p>
              Each has the same remedy: do the exact or generative part elsewhere. Count and compare in code, filter the state before sending it, and hand writing to a generative model. The docs also note that accuracy depends on staying inside the context limits, 64k tokens per request and 32k per question by default.<Cite slug={S} src={U.models} />
            </p>
            <Callout kind="deep">
              <p>The docs also describe confidence as a second axis: the answer says what, and confidence says whether to act. A system that escalates low-confidence cases to a person or a larger model spends the big model’s money only where it matters. We did not look at confidence values in this usage page, and it does not show them.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="sum" level="Beginner" number={8}>Do the sum yourself</SectionHeading>
            <p>
              You do not need our figures. You need your own page and six steps.
            </p>
            <Figure number={12} caption="How to turn any usage page into a fair comparison.">
              <DoTheSum />
            </Figure>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="claims" level="Intermediate" number={9}>Claims, checked</SectionHeading>
            <p>
              Posts about cost savings travel fast and lose their qualifiers on the way. These are the claims you are most likely to see about a page like this, and what the evidence supports.
            </p>
            <Figure number={13} caption="Claims against what the page and the price lists support.">
              <ClaimCheck />
            </Figure>

            <h3>The message</h3>
            <p>
              $1.26 for 54,890 requests is a real number from a real page, and it is cheap on any list price we could read. How much cheaper than the alternative depends on the alternative, from about six times against a small model to hundreds of times against a large one. What the page cannot tell you is whether every answer was good enough, or how much time you saved. Those are yours to measure.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>Use the small, calibrated model for the narrow judgments and keep the big model, and your code, for everything else.</strong> Then check the meter.
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "How is a Jev call billed?", a: "Per input token, at $0.042 per million. Output tokens are free." },
                { q: "How do you check that a usage page’s spend is right?", a: "Multiply the input tokens by the price per million. Here 30.02 million × $0.042 ≈ $1.26, which matches the page." },
                { q: "Why is the comparison with a general model a range and not one number?", a: "Because general models span a wide price range. At Anthropic’s list prices the same tokens cost about 5.7× to about 570× as much, from Haiku 5.5 to Fable 5.1." },
                { q: "What does the usage page not show?", a: "Latency, time saved, answer quality, and which model version served each request." },
                { q: "Why does batching questions cut cost?", a: "The document or state is sent and paid for once instead of once per question. TypeSafe’s benchmark reports 12.2× cheaper and 10.0× faster on one task." },
              ].map((item, i) => (
                <details key={item.q} className="group rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  <summary className="cursor-pointer text-[15px] font-medium text-[var(--text-primary)] list-none flex gap-3">
                    <span className="mono text-[var(--violet-deep)]">Q{i + 1}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="text-[var(--text-tertiary)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-2 pl-9 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
                </details>
              ))}
            </div>

            <References slug={article.slug} />

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              TypeSafe AI, Anthropic and Mintlify are independent of MSRX; this article is not affiliated with or endorsed by any of them. The usage figures are from the author’s own TypeSafe console. Anthropic makes Claude, which is among the AI assistants used to draft this article. Quotes are word for word from the linked sources. Prices and documentation were checked on 15 October 2026 and may change. The spend figure is the console’s estimate at list price; the comparison figures are our arithmetic from published list prices, not quotes or measurements.
            </p>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
              <ArticleToc items={TOC} />
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid sm:grid-cols-2 gap-4">
          <Link href={`/${previous.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="flex items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              <ArrowLeft size={13} aria-hidden="true" /> Previous article
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{previous.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
