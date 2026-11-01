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
  Agents,
  CapexBars,
  CashTable,
  Circle,
  Cycle,
  DebtBlocks,
  DotNumbers,
  Junk,
  Ladder,
  MemoryLoop,
  Pic,
  Plan,
  Signals,
  Week,
} from "@/components/figures/bubble-guide";

const article = getArticle("beyond-the-hype-ai-bubble-correction") as Article;
const previous = getArticle("can-ai-tell-a-scam-from-a-real-message") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  cracks: "https://techcrunch.com/2026/10/30/cracks-are-emerging-in-the-ai-spending-boom/",
  meta: "https://www.channelnewsasia.com/business/sp-global-revises-metas-outlook-negative-ai-spending-cash-flow-worries-6508631",
  intel: "https://techcrunch.com/2026/10/30/intels-stock-crashes-knocking-12b-from-governments-stake/",
  openai: "https://techcrunch.com/2026/10/31/openai-reportedly-lowers-funding-target-for-new-round/",
  decoder: "https://the-decoder.com/openai-raises-just-11-billion-of-its-30-billion-target-as-big-investors-lose-their-ai-appetite/",
  junk: "https://techcrunch.com/2026/10/30/anthropic-expected-to-receive-high-junk-rating-from-credit-agencies-following-ipo-report-says/",
  nscale: "https://techcrunch.com/2026/10/30/nvidia-weighs-playing-the-cosigner-for-nscales-ai-data-center-in-west-virginia/",
  dot: "https://en.wikipedia.org/wiki/Dot-com_bubble",
  door: "https://techcrunch.com/2026/10/30/doordash-said-its-only-received-several-hundred-orders-from-ai-agents/",
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
  { name: "Beyond the hype", path },
];

const TOC = [
  { id: "what", label: "What is going on" },
  { id: "week", label: "The week the mood turned" },
  { id: "spend", label: "Spending, cash and debt" },
  { id: "funding", label: "Funding gets harder" },
  { id: "plumbing", label: "The plumbing" },
  { id: "history", label: "We have seen this before" },
  { id: "real", label: "What a correction cannot erase" },
  { id: "differ", label: "Same story, or different?" },
  { id: "plan", label: "What to do with this" },
  { id: "references", label: "References" },
];

export default function BeyondTheHype() {
  return (
    <>
      <ReadingProgress />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          url: abs(path),
          mainEntityOfPage: abs(path),
          image: abs(`${path}/opengraph-image`),
          datePublished: article.published,
          dateModified: article.updated,
          inLanguage: "en",
          keywords: article.tags.join(", "),
          timeRequired: `PT${article.readingMinutes}M`,
          about: [
            { "@type": "Thing", name: "AI bubble" },
            { "@type": "Thing", name: "Stock market correction" },
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
            {article.series} · Article 23
          </p>
          <h1 className="display text-[clamp(30px,5.2vw,52px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Beyond the Hype: <span className="msrx-gradient-text">The AI Bubble Burst</span> and Why a Massive Stock Correction Won’t Extinguish the Future of Technology
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
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mb-2">How to read this</p>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-3">
              This article is about a very recent and fast-moving market event, so read it as a snapshot from 1 November 2026, not as a forecast. The title uses the word “burst” because that is how a lot of commentary frames the week; the reports I read describe a sharp sell-off and growing worry, and whether it is a burst is not settled.
              I did not open the companies’ own earnings filings, S&amp;P’s report, the Financial Times or the Wall Street Journal. Their figures reach this article second-hand through TechCrunch, CNA (Reuters) and The Decoder, and each one is attributed. The screenshots are real captures from 1 November 2026.
              Nothing here is investment advice. Green sections need no background. Amber ones add some finance. Red ones go into the plumbing.
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
            <SectionHeading id="what" level="Beginner" number={1}>What is going on</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              In recent years, money has poured into artificial intelligence on the belief that it will change almost everything. This week, a lot of that confidence wobbled. Share prices of big technology companies fell hard, a famous AI start-up struggled to raise as much as it wanted, and a credit-rating agency warned about one giant’s spending.
            </p>
            <p>
              Three words keep coming up, so here they are in plain language. A <strong>bubble</strong> is when prices rise far beyond what the underlying business can justify, because people expect them to keep rising. A <strong>correction</strong> is a fall in prices after such a run. A <strong>burst</strong> is when a correction is so deep and so lasting that it changes the industry. Nobody can say, while it is happening, which of the three it is.
            </p>
            <Callout kind="eli5">
              <p>Think of a plant grown under a heat lamp with far too much fertiliser. When the lamp is switched off, the plant shrinks fast. That does not mean plants are a bad idea. It means this one was fed more than it could use. The question is how much shrinks and what is left standing after.</p>
            </Callout>
            <p>
              This article does two things at once. It lays out, from named sources, why investors became nervous. And it explains why a market fall, even a big one, has never been the same thing as a technology disappearing. Both are true, and the interesting part is the gap between them.
            </p>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="week" level="Beginner" number={2}>The week the mood turned</SectionHeading>
            <p>
              TechCrunch reported that over two weeks Alphabet, Amazon, Meta and Microsoft outlined plans to spend more than $740 billion on capital expenditure this year, which Wall Street reads as AI infrastructure such as data centres and chips.<Cite slug={S} src={U.cracks} /> Earlier in the boom, investors mostly rewarded big spending. TechCrunch wrote that as the fourth quarter began, that enthusiasm seemed to be giving way to worry about spending more cash than a company brings in, mounting debt, and whether the investments will ever earn enough.<Cite slug={S} src={U.cracks} />
            </p>
            <Figure number={1} caption="Real screenshot, captured 1 November 2026, of TechCrunch’s report “Cracks are emerging in the AI spending boom”, 30 October 2026.">
              <Pic file="cracks.jpg" alt="Screenshot of TechCrunch's article headline Cracks are emerging in the AI spending boom, over a photo of a cracked stone wall" width={1280} height={488} />
            </Figure>
            <p>
              Then the market reacted. TechCrunch said the anxiety spilled across the market on Friday 30 October: the Nasdaq fell 2.9%, Nvidia dropped 4%, Broadcom more than 5% and Qualcomm 11%, and Alphabet, which fell 12% on Thursday in its worst day on record and lost $500 billion in market value, fell again.<Cite slug={S} src={U.cracks} /> Separately, TechCrunch reported that Intel crashed about 28% on Friday after warning that its fourth-quarter revenue would be $15 billion to $16 billion against analysts’ expectation of around $17 billion.<Cite slug={S} src={U.intel} />
            </p>
            <Figure number={2} caption="The sell-off in numbers: one-day moves, as reported.">
              <Week />
            </Figure>
            <Callout kind="deep">
              <p>A one-day fall is a data point, not a verdict. Markets move on expectations about the future, so a bad quarter at one company can drag a whole group down, and the group can recover just as fast. What matters for “bubble or not” is the pattern over months: what the companies earn, how they pay for their plans, and whether the people lending to them keep lending.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="spend" level="Intermediate" number={3}>Why investors got nervous: spending, cash and debt</SectionHeading>
            <p>
              The core worry is simple. The companies are spending enormous sums, and for several of them the money going out now exceeds the money coming in. TechCrunch reported that Alphabet guided to spending up to $205 billion this year and that its quarterly capex grew to $51.4 billion; Amazon expects $220 billion; and Meta guided to as much as $145 billion.<Cite slug={S} src={U.cracks} /> CNA, carrying a Reuters report, put Meta’s range at $135 billion to $145 billion.<Cite slug={S} src={U.meta} />
            </p>
            <Figure number={3} caption="Capital spending plans for this year, as each company guided.">
              <CapexBars />
            </Figure>
            <p>
              <strong>Free cash flow</strong> is the cash a company has left after paying for its operations and its investments. TechCrunch reported that Alphabet’s was negative $9.1 billion in the third quarter, its second quarter in a row below zero; Amazon’s was negative $42.4 billion over twelve months, compared with positive $14.8 billion a year earlier; Meta’s was negative $2.1 billion in the third quarter; and Microsoft’s was positive $18.6 billion, the one exception.<Cite slug={S} src={U.cracks} />
            </p>
            <Figure number={4} caption="Free cash flow at the four biggest spenders.">
              <CashTable />
            </Figure>
            <p>
              There is a second, quieter pressure. TechCrunch noted that part of the concern is that firms with overflowing cash from their core businesses are being hit as AI threatens those businesses’ economics. Its example was Google: the success of AI Mode inside Search is eating into the money-maker, and growth in Search advertising, about half of Google’s revenue, slowed to 12%, its weakest in five quarters.<Cite slug={S} src={U.cracks} />
            </p>
            <p>
              Credit agencies noticed too. S&amp;P Global Ratings revised its outlook on Meta to “negative” from “stable” on 30 October, citing uncertainty about capital spending and free operating cash flow, and said it now expects Meta to run cash deficits of $39 billion in 2026 and $71 billion in 2027.<Cite slug={S} src={U.meta} /> Meta did not accept the reasoning: a spokesperson told Reuters the company “respectfully” disagreed with S&amp;P’s assertion about its ability to earn from AI, and pointed to opportunities supporting a “very strong credit profile”.<Cite slug={S} src={U.meta} />
            </p>
            <Figure number={5} caption="Real screenshot, captured 1 November 2026, of CNA’s report carrying Reuters on S&P Global’s Meta outlook, 31 October 2026.">
              <Pic file="meta.jpg" alt="Screenshot of a Channel NewsAsia article headline S&P Global revises Meta's outlook to negative on AI spending, cash flow worries" width={1280} height={710} />
            </Figure>
            <p>
              Where does the money come from? Not only from profits. TechCrunch, citing S&amp;P Global Market Intelligence, said Microsoft, Alphabet, Amazon, Meta and Oracle raised a combined $326 billion in debt in 2026, triple last year’s amount.<Cite slug={S} src={U.cracks} /> CNA reported that Meta also plans to sell $97.5 billion in stock to fund the buildout.<Cite slug={S} src={U.meta} />
            </p>
            <Figure number={6} caption="Borrowing by five giants, 2026 against 2025.">
              <DebtBlocks />
            </Figure>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="funding" level="Intermediate" number={4}>Funding for the builders is getting harder</SectionHeading>
            <p>
              The giants can borrow against their other businesses. The pure AI labs cannot. TechCrunch reported on 31 October that OpenAI had been reported to be raising $30 billion at a $1.4 trillion valuation, then at $1.25 trillion, ahead of a planned IPO, but that the Financial Times said the target had been lowered to $20 billion, with a first close expected to be lower still.<Cite slug={S} src={U.openai} /> A Wall Street Journal follow-up, according to TechCrunch, said OpenAI had secured $11 billion so far and that its fundraising had met with a “tepid” response from some large investors.<Cite slug={S} src={U.openai} />
            </p>
            <Figure number={7} caption="Real screenshot, captured 1 November 2026, of TechCrunch’s “OpenAI reportedly lowers funding target for new round”, 31 October 2026.">
              <Pic file="openai.jpg" alt="Screenshot of a TechCrunch In Brief article about OpenAI lowering its funding target, with an OpenAI logo on a phone over a stock chart" width={1280} height={488} />
            </Figure>
            <Figure number={8} caption="How OpenAI’s round changed, as reported.">
              <Ladder />
            </Figure>
            <p>
              The Decoder, also citing the Wall Street Journal, wrote that the gap reportedly came down to fading interest from major investors during a tech sell-off driven by weak quarterly results, and that OpenAI plans to raise up to $20 billion from family offices and wealthy individuals.<Cite slug={S} src={U.decoder} /> The same piece said OpenAI is reportedly planning an IPO early next year and that rival Anthropic, which has been growing revenue faster lately, could go public as early as November.<Cite slug={S} src={U.decoder} /> TechCrunch said it had asked OpenAI for comment; the reports are unconfirmed by the company in the sources I read.<Cite slug={S} src={U.openai} />
            </p>
            <p>
              Anthropic’s own path looks less smooth than that sounds. TechCrunch, citing the Financial Times, reported that Blackstone, the anchor investor in a recent $63 billion deal to finance Anthropic’s chips, told investors it expects Anthropic to receive a “high” junk rating after its IPO, the top tier of speculative grade, having previously said it would be investment grade before 2027.<Cite slug={S} src={U.junk} /> TechCrunch noted that this is a prediction, that Anthropic and Blackstone declined to comment, and that a junk rating would make raising money more difficult and costly.<Cite slug={S} src={U.junk} />
            </p>
            <Figure number={9} caption="Real screenshot, captured 1 November 2026, of TechCrunch’s report on Blackstone’s expectation for Anthropic’s credit rating, 30 October 2026.">
              <Pic file="junk.jpg" alt="Screenshot of a TechCrunch In Brief article about Anthropic expected to receive a high junk rating following its IPO" width={1280} height={488} />
            </Figure>
            <Figure number={10} caption="The two ratings in question.">
              <Junk />
            </Figure>
            <Callout kind="eli5">
              <p>A credit rating is a report card for borrowers. “Investment grade” means lenders see low risk and charge less. “Junk” means higher risk and a higher price for the same loan. A top-tier junk rating is the best of the bad grades, but it still makes borrowing dearer for a company that plans to spend a lot.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="plumbing" level="Advanced" number={5}>The plumbing: who is lending to whom</SectionHeading>
            <p>
              Behind the headlines is a web of financing that explains why some people say “bubble”. TechCrunch reported, citing The Information and corroborated by Bloomberg, that Nvidia was in talks to guarantee billions in debt for AI cloud provider Nscale’s planned Anthropic data centre in West Virginia, a customer’s loans co-signed by the company that sells the chips.<Cite slug={S} src={U.nscale} /> Anthropic’s contract for the first building alone is $44.6 billion, according to Nscale’s IPO filing, and Nvidia has extended roughly $170 billion in investments and credit support to neoclouds and large customers, according to The Information.<Cite slug={S} src={U.nscale} />
            </p>
            <Figure number={11} caption="Real screenshot, captured 1 November 2026, of TechCrunch’s report on Nvidia and Nscale, 30 October 2026.">
              <Pic file="nscale.jpg" alt="Screenshot of a TechCrunch article headline Nvidia weighs playing the cosigner for Nscale's AI data center in West Virginia, over an Nscale logo on a phone" width={1280} height={488} />
            </Figure>
            <Figure number={12} caption="The financing loop described in the report. The talks were reported, not announced.">
              <Circle />
            </Figure>
            <p>
              The same report is a reminder that building physical things is hard. Nscale had about 25,000 advanced chips running in August, a fraction of the nearly 500,000 it plans to deploy; Microsoft pulled out of a planned Nscale site in England after grid power for it was pushed into the 2030s; and shares of CoreWeave, Nebius and IREN had each fallen more than 30% in October, according to CNBC as cited by TechCrunch.<Cite slug={S} src={U.nscale} />
            </p>
            <Callout kind="deep">
              <p>Loops like this are not automatically unhealthy. Suppliers have always financed customers to win business. The risk is concentration: if one big customer or one big lender stumbles, several links can stumble together. Whether that is happening here is exactly what the reports leave open.</p>
            </Callout>
            <p>
              The boom can also hurt businesses that are not AI at all. Intel’s chief executive Lip-Bu Tan said on the call that customers began signalling a PC slowdown because of memory prices and availability, and that system prices had risen significantly; TechCrunch reported that AI is “gobbling” memory and other components, raising PC prices.<Cite slug={S} src={U.intel} /> In the same report, Intel’s data centre revenue grew 78% over the year-ago quarter.<Cite slug={S} src={U.intel} />
            </p>
            <Figure number={13} caption="Real screenshot, captured 1 November 2026, of TechCrunch’s report on Intel’s fall, 30 October 2026.">
              <Pic file="intel.jpg" alt="Screenshot of a TechCrunch article headline Intel's stock crashes, knocking $12B from government's stake, beside a photo of Intel's chief executive" width={1280} height={488} />
            </Figure>
            <Figure number={14} caption="One company, two stories: the same boom helps and hurts.">
              <MemoryLoop />
            </Figure>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Intermediate" number={6}>We have seen something like this: the dot-com crash</SectionHeading>
            <p>
              History offers a useful, imperfect comparison. According to Wikipedia’s summary, the dot-com bubble peaked on 10 March 2000, when the Nasdaq Composite reached 5,048.62. Between 1995 and then the index rose 600%, only to fall 78% from its peak by October 2002, giving up all its gains.<Cite slug={S} src={U.dot} /> Wikipedia says stocks lost $5 trillion in market value from the peak to the 2002 downturn, and that Cisco lost 80% of its stock value while Amazon also lost a large part of its market value.<Cite slug={S} src={U.dot} />
            </p>
            <Figure number={15} caption="Real screenshot, captured 1 November 2026, of Wikipedia’s “Dot-com bubble” article, showing the Nasdaq Composite chart.">
              <Pic file="dotcom.jpg" alt="Screenshot of the Wikipedia article Dot-com bubble with a chart of the NASDAQ Composite index rising to 2000 and then falling" width={1280} height={860} />
            </Figure>
            <p>
              The telecom side looks eerily familiar. Wikipedia says that in the five years after the 1996 Telecommunications Act, equipment companies invested more than $500 billion, mostly financed with debt, laying fibre-optic cable and building networks.<Cite slug={S} src={U.dot} /> Many online retailers and communication companies such as Pets.com, Webvan, WorldCom and Global Crossing failed, but Wikipedia also says many firms endured: 48% of dot-com companies survived through 2004, at lower valuations.<Cite slug={S} src={U.dot} />
            </p>
            <Figure number={16} caption="The dot-com record in numbers, from Wikipedia’s summary.">
              <DotNumbers />
            </Figure>
            <p>
              The lesson I take from that account, and it is my reading and not a forecast, is that a bust removes weak companies and over-priced bets but leaves the cables, the habits and the skills behind. The fibre laid in the boom was still there when later services needed it. A crash is a repricing of who owns the future, not a vote on whether the future arrives.
            </p>
            <Figure number={17} caption="Illustration: the boom, bust and build pattern. No data is plotted.">
              <Cycle />
            </Figure>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="real" level="Intermediate" number={7}>What a correction cannot erase</SectionHeading>
            <p>
              A share price is a bet on future profit. It is not a measure of whether people use the product. In the same reports that describe the fall, there are signs that real demand is still there. TechCrunch wrote that demand for AI compute remains strong and that Google, Amazon and Microsoft all saw gains in their cloud businesses, with AWS revenue growing 39%.<Cite slug={S} src={U.cracks} /> Meta’s ad revenue grew 26%, and Intel’s data centre revenue was up 78%.<Cite slug={S} src={U.cracks} /><Cite slug={S} src={U.intel} />
            </p>
            <Figure number={18} caption="Worrying and reassuring signals, side by side.">
              <Signals />
            </Figure>
            <p>
              Balance matters in the other direction too. DoorDash told investors on its third-quarter call that it had seen only “several hundred” orders in total from third-party AI agents, against an average of about 3 million deliveries a day in its 2025 report, according to TechCrunch.<Cite slug={S} src={U.door} /> Its chief executive Tony Xu said “you never want to fight gravity” but also “you don’t want to be delusional”.<Cite slug={S} src={U.door} /> A technology can be real and still early, and early is exactly where bubbles form.
            </p>
            <Figure number={19} caption="Real use against the hype: one company’s order numbers.">
              <Agents />
            </Figure>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="differ" level="Advanced" number={8}>Same story, or a different one?</SectionHeading>
            <p>
              It would be too neat to say history will repeat. There are real differences and real similarities, and I will mark which is which.
            </p>
            <p>
              <strong>Similar:</strong> heavy borrowing, with five giants raising triple last year’s debt;<Cite slug={S} src={U.cracks} /> (in my reading) a build-out that runs ahead of earnings; and a web of suppliers financing customers.<Cite slug={S} src={U.nscale} /> In the dot-com era, telecom firms also built with debt.<Cite slug={S} src={U.dot} />
            </p>
            <p>
              <strong>Different, according to the reports:</strong> several of the biggest spenders sell products that already earn large revenues; AWS grew 39% and Meta’s ad revenue grew 26%.<Cite slug={S} src={U.cracks} /> And Microsoft reported positive free cash flow of $18.6 billion even while spending.<Cite slug={S} src={U.cracks} /> That does not make the spending wise. It means the losses so far are being funded by large businesses, not only by hope.
            </p>
            <p>
              <strong>Unknown:</strong> whether the new businesses will earn enough to repay what is being borrowed. S&amp;P said it is unclear when Meta’s new revenue streams will contribute enough to exceed rising costs.<Cite slug={S} src={U.meta} /> Nobody in the sources I read claims to know. Anyone who tells you with certainty that this is a burst, or that it is nothing, is guessing.
            </p>
            <Callout kind="tip">
              <p>A useful habit when reading market news is to ask three questions of every claim: who said it, what did they measure, and could they be wrong? In this article every number has a name next to it for that reason.</p>
            </Callout>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={9}>What to do with this</SectionHeading>
            <p>
              The honest takeaway is practical, not predictive. Prices will move, and the reports above will look different in a month. What you can control is how dependent your own plans are on a price staying high. This is general information, not advice for your situation.
            </p>
            <Figure number={20} caption="A practical path, by who you are.">
              <Plan />
            </Figure>

            <h3>The message</h3>
            <p>
              A bubble is about prices. A technology is about what people can do that they could not do before. The first can fall sharply while the second keeps growing, as the dot-com years showed. This week’s sell-off is real, the worries about cash and debt are real, and so is the demand the same reports describe. Look past the hype in both directions.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>Markets can burst and still leave the technology standing: judge AI by what it earns and what people use, not by one week’s share price.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is free cash flow, and which of the four big spenders had a positive figure?", a: "It is the cash left after running the business and paying for investments. TechCrunch reported that Microsoft was the only one of Alphabet, Amazon, Meta and Microsoft with a positive figure, $18.6 billion." },
                { q: "What is the difference between a correction and a burst?", a: "A correction is a fall in prices after a run-up. A burst is a correction deep and lasting enough to change the industry. Nobody can tell which it is while it is happening." },
                { q: "What did the Nasdaq do between 1995 and March 2000, and then to October 2002, per Wikipedia?", a: "It rose 600% by its 10 March 2000 peak of 5,048.62, then fell 78% from that peak by October 2002." },
                { q: "Name one signal that worries and one that reassures, from this week’s reports.", a: "Worrying: negative free cash flow at Alphabet, Amazon and Meta, or OpenAI securing $11 billion against a $30 billion first target. Reassuring: AWS revenue up 39%, or Intel’s data centre revenue up 78%." },
                { q: "Why is DoorDash’s “several hundred” orders from AI agents worth noting?", a: "Against about 3 million deliveries a day, it shows the technology is still early in real use, even while investment is huge." },
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
              Alphabet, Amazon, Meta, Microsoft, Intel, Nvidia, OpenAI, Anthropic, Nscale, Blackstone, S&amp;P Global, DoorDash and the publications named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. Facts were checked against the cited pages on 1 November 2026, and markets have likely moved since. The screenshots are real captures of those pages, shown for identification and commentary. This is general information and not financial advice.
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
