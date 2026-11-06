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
import { Dominoes, HitHardest, ImpliedSizes, KnownUnknown, Pic, Plan, Readings, Reversal, Scoreboard, ThreeCounts, WeekFlow, WhatElse, YearTimeline } from "@/components/figures/selloff-guide";

const article = getArticle("ai-selloff-2-5-trillion-day") as Article;
const previous = getArticle("beyond-the-hype-ai-bubble-correction") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  cnn: "https://finance.yahoo.com/markets/stocks/articles/stocks-plunge-midterm-results-send-161247062.html",
  nbc: "https://www.nbcnews.com/business/markets/tech-stocks-plunge-ai-midterms-rcna607650",
  ani: "https://www.freepressjournal.in/tech/wall-street-loses-25-trillion-as-ai-investment-fears-trigger-biggest-us-stock-market-sell-off-since-april-2025",
  fredN: "https://fred.stlouisfed.org/series/NASDAQCOM",
  fredS: "https://fred.stlouisfed.org/series/SP500",
  fredV: "https://fred.stlouisfed.org/series/VIXCLS",
  fox: "https://www.fox4news.com/news/hinojosa-urges-gov-abbott-pause-new-data-centers-until-lawmakers-act",
  joong: "https://www.koreajoongangdaily.com/business/kospi-falls-for-2nd-day-on-ai-rout-after-us-midterms/12960072",
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
  { name: "The $2.5 trillion day", path },
];

const TOC = [
  { id: "day", label: "The day on one page" },
  { id: "count", label: "Whose $2.5 trillion?" },
  { id: "why", label: "Why it happened" },
  { id: "hit", label: "Who fell hardest" },
  { id: "world", label: "It crossed the Pacific" },
  { id: "views", label: "Four ways to read it" },
  { id: "plan", label: "What to do with this" },
  { id: "references", label: "References" },
];

export default function SelloffDay() {
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
            { "@type": "Thing", name: "Stock market sell-off" },
            { "@type": "Thing", name: "Artificial intelligence stocks" },
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
            {article.series} · Article 24
          </p>
          <h1 className="display text-[clamp(30px,5.2vw,52px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            The <span className="msrx-gradient-text">$2.5 Trillion Day</span>: What Really Happened When Wall Street Priced In an AI Slowdown
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
              This is a snapshot of one trading day, Thursday 5 November 2026, and the Asian session that followed on Friday 6 November. Markets move every hour, so treat the numbers as a record of that day, not a forecast. The headline in the title is a claim made by CNN; the article checks it rather than repeating it.
              I did not read exchange data directly. The closing figures come from CNN, NBC News and ANI, and I compared them with the St. Louis Fed’s FRED database where that was possible. I did not open the original Yonhap wire, the Truth Social post or any company filing. Nothing here is investment advice.
              Green sections need no background. Amber ones add some finance. Red ones compare readings that disagree.
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
            <SectionHeading id="day" level="Beginner" number={1}>The day on one page</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              On Thursday 5 November 2026, US technology shares fell so fast that CNN reported roughly $2.5 trillion of market value had been wiped from the Nasdaq Composite in one session, on fears that Democrats’ midterm gains could put the brakes on the AI buildout.<Cite slug={S} src={U.cnn} /> The Nasdaq closed 5.52% lower and, in the market’s own language, entered a “correction”, which means it was more than 10% below its record high, set on 6 October.<Cite slug={S} src={U.cnn} />
            </p>
            <Figure number={1} caption="Real screenshot, captured 6 November 2026, of CNN’s report as republished by Yahoo Finance. Cropped to the headline, photo and first paragraphs, so the page’s advertising and side panels are left out.">
              <Pic file="cnn-headline.jpg" alt="Screenshot of CNN's report on Yahoo Finance titled Massive tech sell-off wipes $2.5 trillion from the stock market, with a photo of pedestrians outside the Nasdaq MarketSite in New York" width={660} height={905} max="34rem" />
            </Figure>
            <p>
              Three words do most of the work in this story, so here they are in plain language. An <strong>index</strong> is a single number that tracks a basket of shares, such as the Nasdaq Composite, which includes thousands of companies and leans toward technology. A <strong>correction</strong> is a fall of at least 10% from a recent high; NBC News defines it the same way.<Cite slug={S} src={U.nbc} /> And <strong>market value</strong> (or “market cap”) is a company’s share price multiplied by the number of shares, so when prices fall, value disappears on paper even though no cash has left anyone’s bank account.
            </p>
            <Callout kind="eli5">
              <p>Imagine a street where every house is advertised at a price. If a rumour spreads that a new rule will make it harder to build more houses nearby, buyers rush to re-price what they will pay. The houses are all still standing. What changed is what people are willing to pay for them. A “wipe-out” of value is the sum of all those lower price tags.</p>
            </Callout>
            <p>
              The same session also hit the other big US indexes. According to ANI, relaying CNN, the S&amp;P 500 fell 4.36% to 7,353.73 and the Dow Jones Industrial Average dropped 1,833.06 points, or 3.44%, to 51,523.06.<Cite slug={S} src={U.ani} /> CNN says the S&amp;P 500 and the Dow both had their worst day since April 2025, when President Donald Trump unveiled sweeping global tariffs.<Cite slug={S} src={U.cnn} />
            </p>
            <Figure number={2} caption="The scoreboard: Thursday 5 November 2026, as reported.">
              <Scoreboard />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="count" level="Intermediate" number={2}>Whose $2.5 trillion? Checking the number</SectionHeading>
            <p>
              A headline number deserves a check. NBC News gave a different figure for the same day: the Nasdaq 100, a smaller index that includes major tech companies, fell 6.3% and erased $2.3 trillion, while the S&amp;P 500 fell 4.4% and erased $2.8 trillion.<Cite slug={S} src={U.nbc} /> CNN’s $2.5 trillion refers to the Nasdaq Composite.<Cite slug={S} src={U.cnn} /> So three outlets gave three totals, and each was measuring a different group of companies.
            </p>
            <Figure number={3} caption="Real screenshot, captured 6 November 2026, of NBC News’s report. Cropped to the headline and standfirst, so the page’s election banner and promotional panels are left out.">
              <Pic file="nbc-headline.jpg" alt="Screenshot of NBC News headline Stocks plunge as election outcome and AI worries crush tech shares, with the standfirst The Nasdaq 100 index dropped 6.3%, erasing $2.3 trillion in market value" width={980} height={185} />
            </Figure>
            <Figure number={4} caption="Three ways to count the same day.">
              <ThreeCounts />
            </Figure>
            <p>
              A quick calculation shows why. If you divide each reported loss by its percentage fall, you get the rough total value of the companies in that index. The Nasdaq 100’s works out near $37 trillion, the Nasdaq Composite’s near $45 trillion, and the S&amp;P 500’s near $64 trillion (our arithmetic, from the reported figures).<Cite slug={S} src={U.nbc} /> The S&amp;P 500 is the biggest pool, so even a smaller percentage fall removes more dollars.
            </p>
            <Figure number={5} caption="What the reported losses imply about each index’s size.">
              <ImpliedSizes />
            </Figure>
            <p>
              Can the closing levels be trusted? ANI reported the Nasdaq Composite closing at 24,315.00.<Cite slug={S} src={U.ani} /> The St. Louis Fed’s FRED database, an independent record, lists the Nasdaq Composite at 24,315.000 for 5 November 2026.<Cite slug={S} src={U.fredN} /> They match.
            </p>
            <Figure number={6} caption="Real screenshot, captured 6 November 2026, of the St. Louis Fed’s FRED page for the Nasdaq Composite, cropped to the header that shows the 5 November 2026 close.">
              <Pic file="fred-nasdaq.jpg" alt="Screenshot of the FRED page for the NASDAQ Composite showing the observation for 2026-11-05 as 24,315.000, updated 5 November 2026 at 10:39 PM CST" width={1140} height={185} />
            </Figure>
            <p>
              The S&amp;P 500 check works through the percentage. FRED’s latest S&amp;P 500 value when I captured the page was 7,688.62, for 4 November.<Cite slug={S} src={U.fredS} /> A fall to ANI’s 7,353.73 is (7,353.73 − 7,688.62) ÷ 7,688.62, which is −4.36% by our arithmetic. That is the same number the news reports gave.
            </p>
            <Figure number={7} caption="Real screenshot, captured 6 November 2026, of FRED’s S&P 500 page, cropped to the header. At capture time it still showed the 4 November close, so it is the starting point for the check, not the end.">
              <Pic file="fred-sp500.jpg" alt="Screenshot of the FRED page for the S&P 500 showing the observation for 2026-11-04 as 7,688.62" width={1140} height={185} />
            </Figure>
            <p>
              The fear gauge can be checked the same way. CNN said the VIX, which measures expectations for volatility, surged roughly 70%.<Cite slug={S} src={U.cnn} /> FRED’s VIX close for 4 November was 16.61.<Cite slug={S} src={U.fredV} /> A 70% rise from 16.61 is about 28.2 (our arithmetic), consistent with a reading near 28. The page also shows the data had not yet caught up to Thursday.
            </p>
            <Figure number={8} caption="Real screenshot, captured 6 November 2026, of FRED’s VIX page, cropped to the header. It shows the 4 November close; Thursday’s value had not yet been posted.">
              <Pic file="fred-vix.jpg" alt="Screenshot of the FRED page for the CBOE Volatility Index VIX showing the observation for 2026-11-04 as 16.61" width={1140} height={175} />
            </Figure>
            <Callout kind="deep">
              <p>Two more calculations show why falls feel bigger than they look. First, a fall needs a larger rise to undo it: after a 10% fall, a recovery needs a gain of about 11.1% (1 ÷ 0.90), and after Thursday’s 5.52% fall the Nasdaq Composite would need about 5.8% (1 ÷ 0.9448) to return to Wednesday’s close. Second, if 24,315 is more than 10% below the record, the record must be above about 27,000 (24,315 ÷ 0.90). These are our arithmetic, not figures from the sources.</p>
            </Callout>
            <Callout kind="deep">
              <p>Market-value losses are a snapshot, not a ledger. They add up each company’s share price change times its share count, then sum across an index, so they depend on which companies the index includes and on the exact moment you measure. A loss of $2.5 trillion on paper does not mean $2.5 trillion was spent, lost by a bank or taken from savers. If prices rise again, the paper value returns.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="why" level="Intermediate" number={3}>Why it happened: elections, data centres and chip earnings</SectionHeading>
            <p>
              According to CNN, the sell-off extended a reversal. On Wednesday, after the midterm elections, the Dow gained 1,569 points and the Nasdaq rose 1.44% in what CNN called a historic rally. By Thursday’s close the Dow was 1,833 points lower, wiping out those gains.<Cite slug={S} src={U.cnn} /> Underneath Wednesday’s rise, CNN says, chipmakers and companies in the data-centre buildout were already falling.<Cite slug={S} src={U.cnn} />
            </p>
            <Figure number={9} caption="The week as the sources describe it.">
              <WeekFlow />
            </Figure>
            <Figure number={10} caption="Wednesday against Thursday, in Dow points.">
              <Reversal />
            </Figure>
            <p>
              Both outlets point first to the elections. NBC News says markets had largely expected Democrats to win majorities but did not anticipate the scale of the victories, including the upset win of Gov.-elect Gina Hinojosa in Texas, the largest data-centre market in the country.<Cite slug={S} src={U.nbc} /> It reports that hundreds of candidates who pledged to rein in AI data centres have been elected, and names Texas, Ohio, Michigan and Georgia as markets of particular concern.<Cite slug={S} src={U.nbc} /> CNN says Hinojosa campaigned on a temporary data-centre moratorium and on eliminating certain tax incentives for such businesses.<Cite slug={S} src={U.cnn} />
            </p>
            <p>
              What did she actually propose? In a 24 July 2026 FOX 4 report, Hinojosa urged Governor Greg Abbott to pause new data centres until lawmakers adopt statewide regulations. Her plan would make developers cover infrastructure costs, protect water supplies and give communities more control.<Cite slug={S} src={U.fox} /> She also said data centres are “guzzling up all our water” and electricity, in her words.<Cite slug={S} src={U.fox} /> That is a campaign position reported in July. The sources do not describe any law passed since.
            </p>
            <Figure number={11} caption="Real screenshot, captured 6 November 2026, of FOX 4’s report of 24 July 2026. Cropped to the headline, photo and summary, so the site’s promotional panel and trending list are left out.">
              <Pic file="fox4-hinojosa.jpg" alt="Screenshot of FOX 4 Dallas-Fort Worth headline Hinojosa urges Gov. Abbott to pause new data centers until lawmakers act, with a photo of Gina Hinojosa speaking and a three-point summary" width={910} height={945} max="36rem" />
            </Figure>
            <p>
              The election is not the only explanation in the sources. NBC News says the sell-off was triggered by two lacklustre earnings reports from the chipmakers Qualcomm and Arm Holdings on Wednesday night, which investors generally viewed as mixed.<Cite slug={S} src={U.nbc} /> CNN, by contrast, says Qualcomm missed estimates and that higher memory-chip costs are hurting its sales.<Cite slug={S} src={U.cnn} /> The two outlets use different words for the same results, and neither is a company filing. Whether the election or the earnings mattered more is not something the sources settle.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="hit" level="Intermediate" number={4}>Who fell hardest</SectionHeading>
            <p>
              The damage was concentrated in the “picks and shovels” of the AI boom: the chips, memory and cloud capacity that data centres are built from. NBC News reports the Philadelphia semiconductor index fell 12.3%, its worst day since March 2020, and that an ETF tracking memory makers fell almost 18%.<Cite slug={S} src={U.nbc} /> CNN adds that Nvidia sank 9.3%, erasing its gains for the year, and that the neoclouds CoreWeave and Nebius, which rent out computing power, fell roughly 10% and 15%.<Cite slug={S} src={U.cnn} />
            </p>
            <Figure number={12} caption="One-day falls on 5 November 2026, by company or group, as reported.">
              <HitHardest />
            </Figure>
            <Callout kind="tip">
              <p>Notice what moved least. The big spenders on data centres, such as Amazon, Meta and Google, were the ones whose shares rose on Wednesday on hopes that restrictions would free up cash they would otherwise spend building.<Cite slug={S} src={U.cnn} /> By Thursday, CNN says, investors soured on that trade. For the companies that sell the equipment, less building means fewer orders, which is why they fell first and hardest.</p>
            </Callout>

            <p>
              Two more details put the size in context. NBC News reports Nvidia fell 9.2%, its largest one-day decline since April 2025, and is down 15% over three months, while CNN gives 9.3%; the established cloud providers Alphabet, Meta, Amazon and Microsoft also fell, but less than the overall market, and Cisco and Caterpillar, both suppliers to AI data centres, dropped around 6%.<Cite slug={S} src={U.nbc} /> CNN adds that the sell-off was widespread: all 11 sectors in the S&amp;P 500 closed lower.<Cite slug={S} src={U.cnn} />
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="world" level="Intermediate" number={5}>It crossed the Pacific</SectionHeading>
            <p>
              The next session was in Asia. CNN reports that South Korea’s Kospi plunged almost 9% at Friday’s open, triggering a 20-minute trading halt.<Cite slug={S} src={U.cnn} /> Korea JoongAng Daily, using a Yonhap report, puts it a little lower: the index fell more than 8% right after the opening bell, and closed down 324.11 points, or 6.02%, at 5,059.69, having fallen as low as 4,911.28.<Cite slug={S} src={U.joong} /> It adds that Samsung Electronics fell 6.35% and SK hynix 10.44% at the close.<Cite slug={S} src={U.joong} />
            </p>
            <Figure number={13} caption="Real screenshot, captured 6 November 2026, of Korea JoongAng Daily’s report with a Yonhap photo of the Kospi at its close. Cropped to the headline, photo and caption, so the site’s “Make us preferred on Google” button is left out.">
              <Pic file="kospi-joongang.jpg" alt="Screenshot of Korea JoongAng Daily headline Kospi falls for 2nd day on AI rout after U.S. midterms, over a photo of a Seoul trading-room screen showing the Kospi at 5,059.69, down 6.02 percent" width={1200} height={847} />
            </Figure>
            <p>
              NBC News adds that Japan’s Nikkei 225 fell as much as 6% and Taiwan’s TAIEX dropped 9%, Taiwan being home to chip supplier TSMC.<Cite slug={S} src={U.nbc} /> The sources I read did not report their final closes, so treat those two as early-session moves.
            </p>
            <Figure number={14} caption="Asia on Friday 6 November 2026: open against close.">
              <Dominoes />
            </Figure>
            <Callout kind="deep">
              <p>Why does Seoul react so strongly? JoongAng Daily quotes analyst Lee Kyoung-min of Daishin Securities saying concerns about tighter US data-centre rules had spread across the AI value chain, including semiconductors.<Cite slug={S} src={U.joong} /> Samsung and SK hynix make memory chips, which sit inside AI servers, so a forecast of fewer data centres reaches their share prices directly. That is a mechanism the sources imply; they do not measure it.</p>
            </Callout>

            <p>
              Other markets moved too. CNN says money flowed toward government bonds, with the 10-year Treasury yield falling to 4.84%, its lowest level in two months.<Cite slug={S} src={U.cnn} /> NBC News reports Brent crude rose 3.8% and US crude 2.7% after Wednesday’s drop, and that traders dialled back bets that the Federal Reserve would raise rates at its 8–9 December meeting, with odds now around 60%.<Cite slug={S} src={U.nbc} />
            </p>
            <Figure number={15} caption="What else moved on Thursday 5 November 2026.">
              <WhatElse />
            </Figure>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="views" level="Advanced" number={6}>Four ways to read it</SectionHeading>
            <p>
              The sources do not agree on what the day means, and that is useful to know. Ed Yardeni of Yardeni Research told NBC News: “I don’t think this is an AI bubble bursting.” He called it “an AI bubble losing some air very, very rapidly” and said that lowers the chance of a bursting bubble with damaging effects on the wider economy.<Cite slug={S} src={U.nbc} /> He told CNN that a slowdown is wanted because the buildout “was too frenzied and speculative.”<Cite slug={S} src={U.cnn} />
            </p>
            <p>
              Keith Lerner of Truist Advisory Services saw the week’s moves as more of a knee-jerk reaction than a real indication of how tech could fare under Democratic control of Congress, and said the risk-reward is improving for longer-term investors.<Cite slug={S} src={U.cnn} /> Daishin’s Lee called the reaction “excessive” and said the possibility that US legislators could completely suspend data-centre building is low.<Cite slug={S} src={U.joong} /> President Trump wrote on Truth Social that the market suffered one of the worst days in history because of the election and blamed Democrats.<Cite slug={S} src={U.nbc} />
            </p>
            <Figure number={16} caption="Four readings, in the speakers’ own framing.">
              <Readings />
            </Figure>
            <p>
              Two numbers keep the day in proportion. NBC News says the Nasdaq Composite is still up more than 30% since Election Day 2024, despite the recent falls in chip, memory and cloud-linked stocks.<Cite slug={S} src={U.nbc} /> And CNN says that since their peaks on 6 October, the Nasdaq and S&amp;P 500 are down roughly 12% and 6%, while the Nasdaq had closed in correction earlier in the year, in March, and recovered.<Cite slug={S} src={U.cnn} /> A single bad day, in other words, sits inside a rough year.
            </p>
            <Figure number={17} caption="The Nasdaq’s year in corrections, as CNN described it.">
              <YearTimeline />
            </Figure>
            <p>
              For the wider background, including why investors had become nervous about AI spending before the election, see the previous article in this series, <Link href={`/${previous.slug}`}>{previous.title}</Link>. That piece was written on 1 November, before the vote. This one covers what happened after it.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={7}>What is known, what is not, and what to do</SectionHeading>
            <Figure number={18} caption="What the sources support, and what they leave open.">
              <KnownUnknown />
            </Figure>
            <p>
              The honest summary is that one day’s numbers are well documented and the explanation is not. The Nasdaq’s close checks out against an independent source. The reason for the fall is plausible and contested. And what happens next, in Washington and on the stock market, is unknown.
            </p>
            <Figure number={19} caption="A practical path, by who you are. General information, not advice.">
              <Plan />
            </Figure>

            <h3>The message</h3>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>“$2.5 trillion wiped out” is true of one index on one day: check which index, which time and who said it before you trust a big number.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "Why do outlets give $2.3, $2.5 and $2.8 trillion for the same day?", a: "They measure different indexes. NBC News gave $2.3 trillion for the Nasdaq 100 and $2.8 trillion for the S&P 500; CNN’s $2.5 trillion is for the Nasdaq Composite." },
                { q: "What is a correction?", a: "A fall of at least 10% from a recent high. The Nasdaq closed more than 10% below its 6 October record." },
                { q: "How can you check a reported closing level?", a: "Compare it with an independent record. The Nasdaq Composite’s 24,315 in the news reports matches 24,315.000 on the St. Louis Fed’s FRED database." },
                { q: "Did the Kospi fall 9% or 6%?", a: "Both are true at different times. CNN reports it plunged almost 9% at the open, triggering a 20-minute halt; JoongAng Daily reports it closed down 6.02%." },
                { q: "Name two explanations the sources give for the sell-off.", a: "Fears that Democratic election gains, especially in Texas, would slow AI data-centre building; and mixed or missed earnings from chipmakers Qualcomm and Arm on Wednesday night." },
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
              Nasdaq, S&amp;P Dow Jones Indices, CBOE, Nvidia, Broadcom, Qualcomm, Arm, Samsung, SK hynix, the St. Louis Fed and the publications named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. Facts were checked on 6 November 2026 against the sources listed above. Screenshots are real captures from that date, cropped to leave out advertising and promotions.
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
