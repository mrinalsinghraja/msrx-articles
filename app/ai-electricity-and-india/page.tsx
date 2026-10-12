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
  ChartVsData,
  ClaimCheck,
  DCBars,
  DCIndiaCards,
  DemandSources,
  GridStrain,
  GrowthTimeline,
  IEAPaths,
  LeadScoreboard,
  MoneyCards,
  PerPerson,
  Perspective,
  Pic,
  PostCard,
  PowerChain,
  TaskVsTotal,
  TwoMeasures,
  UnitsLadder,
  WatchList,
  WhoAdds,
} from "@/components/figures/power-guide";

const article = getArticle("ai-electricity-and-india") as Article;
const previous = getArticle("ai-agents-side-by-side") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  musk: "https://x.com/elonmusk/status/2108952286030356925",
  owid: "https://ourworldindata.org/grapher/primary-energy-cons",
  kq: "https://www.iea.org/reports/key-questions-on-energy-and-ai",
  eai: "https://www.iea.org/reports/energy-and-ai",
  weo: "https://www.iea.org/reports/world-energy-outlook-2025",
  el: "https://www.iea.org/reports/electricity-2026",
  myu: "https://www.iea.org/reports/electricity-mid-year-update-2026",
  cbre: "https://www.ibef.org/news/india-likely-to-add-more-than-200-mw-of-new-data-centre-capacity-in-h2-2026-pushing-total-capacity-to-2-gw-cbre",
  google: "https://blog.google/intl/en-in/company-news/our-first-ai-hub-in-india-powered-by-a-15-billion-investment/",
  amazon: "https://www.aboutamazon.com/news/company-news/amazon-india-investment",
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
  { name: "AI runs on electricity", path },
];

const TOC = [
  { id: "post", label: "A sentence and a chart" },
  { id: "measures", label: "Energy is not electricity" },
  { id: "hunger", label: "Why AI is hungry" },
  { id: "numbers", label: "The numbers: 485 to 950" },
  { id: "chart", label: "The chart we were handed, checked" },
  { id: "agencies", label: "What the agencies say about India" },
  { id: "gap", label: "Why the gap is the story" },
  { id: "centres", label: "India’s data-centre moment" },
  { id: "grid", label: "The grid has to say yes" },
  { id: "lead", label: "So does India “lead”?" },
  { id: "you", label: "What it means for you" },
  { id: "references", label: "References" },
];

export default function AiElectricityAndIndia() {
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
            { "@type": "Organization", name: "International Energy Agency" },
            { "@type": "Country", name: "India" },
            { "@type": "Thing", name: "Data centre electricity demand" },
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
            {article.series} · Article 14
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            AI runs on <span className="msrx-gradient-text">electricity</span>, and India is where demand is growing fastest
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
              It starts from a post and a chart that were circulating this week, then goes to the energy agencies’ own tables. Green sections need no background. Amber ones
              bring in the numbers. Red ones get into scenarios, grids and what the figures can and cannot tell us. Every number is attributed, and where sources
              differ, we say so.
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
            <SectionHeading id="post" level="Beginner" number={1}>A sentence and a chart</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              On 10 October 2026, Elon Musk put one sentence on X: “Electricity production is the best metric for the true strength of any large-scale economy imo.”<Cite slug={S} src={U.musk} />
            </p>
            <p>
              He was quoting the venture-capital firm a16z, which had posted a chart under the words “Energy capacity = economic capacity, in one chart. There are no low electricity, rich countries.”<Cite slug={S} src={U.musk} /> When we read the post on 12 October it had been viewed 4.5 million times.
            </p>
            <Figure number={1} caption="The post and the post it quoted, as we read them on 12 October 2026. X shows times in the reader’s own time zone, so the hour on your screen may differ.">
              <PostCard />
            </Figure>
            <p>
              The “imo” matters: it marks the sentence as an opinion, and it is one. But it points at something you can test. If a country’s wealth and its electricity use rise together, then a technology that needs a great deal of electricity will push on the grid wherever it spreads. Artificial intelligence is such a technology. So the question for this article is a practical one: <strong>how much electricity will AI ask for, and what does that mean for India?</strong>
            </p>
            <p>
              Alongside the post came a second item: a colourful chart, supplied with a link to a ChatGPT conversation, titled “Total Primary Energy Consumption (TWh), 2001–2051”. It shows India’s line shooting upward, passing the United States in 2026 and China around 2041, to roughly 60,000 TWh by 2051. It is a striking picture and a flattering one for India. We checked it in section 5, against the energy agencies’ own tables. Short version: it gets the direction right and the scale wrong, and the real story is both smaller and more interesting.
            </p>
            <Callout kind="eli5">
              <p>Think of electricity as the water supply of a city, but for machines. A bigger, richer city has more taps, bigger pipes and more pumps. AI adds a new kind of very thirsty tap. The sensible questions are how thirsty it is, how many of them will be opened, and whether the pipes can carry the extra.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="measures" level="Beginner" number={2}>Energy is not electricity</SectionHeading>
            <p>
              The post and the chart measure different things, so it is worth separating them first.
            </p>
            <p>
              <strong>Total energy</strong> counts everything a country burns or harvests: petrol and diesel for vehicles, gas for cooking, coal in steel and cement, wood and dung for household fires, and the fuel that power stations burn. <strong>Electricity</strong> is one form that energy takes after it has been converted and sent down a wire. In 2025, electricity generation was about a fifth of total energy supply in India (19%), in China (23%) and in the United States (17%), and across the world (19%).<Cite slug={S} src={U.owid} />
            </p>
            <Figure number={2} caption="Total energy and electricity, 2025, for the three biggest energy users. Electricity is the part that runs lights, factories, trains, phones and data centres.">
              <TwoMeasures />
            </Figure>
            <p>
              That is why Musk’s measure and the chart’s are not interchangeable. AI does not run on petrol. It runs on electricity, so the figure that matters for AI is electricity demand, not total energy. We will use both, and say which one we mean.
            </p>
            <h3>The units, once</h3>
            <p>
              Electricity is counted in kilowatt-hours (kWh), the unit on a household bill. Whole countries use terawatt-hours (TWh), a billion times larger. A separate unit, the gigawatt (GW), measures how fast power is drawn at a moment, not how much is used over time.
            </p>
            <Figure number={3} caption="The unit ladder. Each step is a thousand times the one before.">
              <UnitsLadder />
            </Figure>
            <Callout kind="deep" title="Going deeper: why “primary energy” numbers differ between sources">
              <p>Agencies do not count every fuel the same way. The International Energy Agency (IEA) and the Energy Institute both publish India’s total energy use, but their figures for the same year differ, because they treat some fuels, such as traditional biomass and the electricity from wind, solar and hydro, differently. A comparison is only fair inside one source. This article keeps each source’s numbers on its own terms, and never mixes them in one comparison.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="hunger" level="Beginner" number={3}>Why AI is hungry</SectionHeading>
            <p>
              When you ask an AI service a question, nothing happens inside your phone beyond sending and receiving. The work is done in a data centre: a warehouse of specialised chips that perform enormous amounts of arithmetic, with cooling and power equipment around them. Every answer you receive started as electricity.
            </p>
            <Figure number={4} caption="What happens, in one line, every time you use an AI service.">
              <PowerChain />
            </Figure>
            <p>
              The IEA, the intergovernmental body that tracks the world’s energy, published an update on this in April 2026. It says electricity use by data centres grew by 17% in 2025, “in line with IEA projections”, and that AI-focused data centres grew faster still, by 50%.<Cite slug={S} src={U.kq} /> It adds that the major model providers reported “a threefold increase in active users and a fivefold increase in revenue over the past year”.<Cite slug={S} src={U.kq} />
            </p>
            <h3>Cheaper per answer, bigger in total</h3>
            <p>
              There is an apparent paradox here, and the IEA states it plainly. Per task, AI is becoming far more efficient: energy use per AI task has been dropping by “at least an order of magnitude annually in recent years”, and a simple text query now typically consumes less electricity than running a television for the same time.<Cite slug={S} src={U.kq} />
            </p>
            <p>
              But the tasks are changing. “New energy-intensive AI applications are increasingly being launched and used, such as those for video generation, reasoning and agentic tasks”, and these “can consume hundreds or thousands of times more energy per query than simple text generation”.<Cite slug={S} src={U.kq} /> The IEA frames total demand as the product of three moving things: efficiency, uptake and changing capabilities.<Cite slug={S} src={U.kq} />
            </p>
            <Figure number={5} caption="Three truths at once: each task is cheaper, the total is bigger, and the new kinds of task cost far more.">
              <TaskVsTotal />
            </Figure>
            <Callout kind="tip" title="Why this connects to AI agents">
              <p>Our <Link href={`/${previous.slug}`}>earlier article on AI coworkers</Link> described agents that plan, use tools and work for hours. An agent that plans, browses and retries is the kind of “agentic task” the IEA has in mind. If you use agents, the practical point from that article stands: give them clear, bounded jobs rather than open-ended ones.</p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="numbers" level="Intermediate" number={4}>The numbers: 485 to 950 terawatt-hours</SectionHeading>
            <p>
              The IEA’s central projection is that electricity consumption by data centres will “roughly” double, from 485 TWh in 2025 to 950 TWh in 2030, reaching around 3% of global electricity demand, with AI-focused data centres tripling.<Cite slug={S} src={U.kq} /> That is close to the trajectory in its first report on the subject a year earlier, which put 2030 at around 945 TWh, “slightly more than Japan’s total electricity consumption today”.<Cite slug={S} src={U.eai} />
            </p>
            <Figure number={6} caption="World data-centre electricity use, 2023 to 2030, split into the two biggest users and everyone else. 2030 is a projection.">
              <DCBars />
            </Figure>
            <p>
              Look at who adds the most. In the IEA’s tables, the United States grows from 224 TWh in 2025 to 426 TWh in 2030, and China from 117 TWh to 277 TWh.<Cite slug={S} src={U.kq} /> In 2024 the United States accounted for 45% of the world’s data-centre electricity use and China for 25%.<Cite slug={S} src={U.eai} /> The IEA expects data centres to account for around half of US electricity-demand growth through 2030.<Cite slug={S} src={U.el} /> India is not tabulated separately in the 2026 tables; in 2025 the IEA put India’s data centres at around 9 TWh, about 0.5% of its electricity use.<Cite slug={S} src={U.eai} />
            </p>
            <h3>A sense of scale</h3>
            <p>
              950 TWh sounds enormous, and it is, but it needs a yardstick. All the electricity India generates in a year is about 2,080 TWh.<Cite slug={S} src={U.owid} /> The world’s data centres in 2030 would therefore use a little under half of what India generates today, and about 3% of the world’s electricity.
            </p>
            <Figure number={7} caption="The 2030 projection against what whole countries generate today.">
              <Perspective />
            </Figure>
            <p>
              Two cautions keep the number honest. First, it is a projection with a wide cloud around it: “uncertainties widen further after 2030”, the IEA says, and it identifies a possible upside if bottlenecks ease and energy-hungry uses spread.<Cite slug={S} src={U.kq} /><Cite slug={S} src={U.eai} /> Second, the IEA lists real brakes on the near term: grid connections, chip supply, a shortage of high-bandwidth memory that it expects to last “through at least the end of 2027”, and a dependence on financing and market sentiment.<Cite slug={S} src={U.kq} />
            </p>
            <Callout kind="warn" title="AI is a fast-growing customer, not the whole market">
              <p>Data centres are about 3% of world electricity in 2030, even on the IEA’s projection. The IEA says China alone is expected to supply close to half of the world’s growth in electricity demand through 2030, mostly from factories, vehicles, cooling and homes.<Cite slug={S} src={U.el} /> AI matters because it is concentrated, growing fast and arriving in particular places, not because it is the largest use of electricity.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="chart" level="Beginner" number={5}>The chart we were handed, checked</SectionHeading>
            <p>
              Here is the chart that was supplied with the post. It came with a link to a ChatGPT conversation titled “Global Energy Consumption Trends and Forecasts”; the page needed a log-in, so we could not see how the chart was made or what data it used. We reproduce it so that you can see exactly what we checked, not because it is a source.
            </p>
            <Figure number={8} caption="The supplied chart, unaltered. It came with a ChatGPT link, and its sources are listed on the image as “IEA World Energy Outlook 2024, IEA Stated Policies & Announced Pledges Scenarios, EIA International Energy Outlook 2023, and other major international energy forecasts”. We could not trace its numbers to those documents, and several do not match the agencies’ current tables (see Figures 9 and 10).">
              <Pic file="supplied-chart.webp" alt="A line chart titled Total Primary Energy Consumption in terawatt-hours, 2001 to 2051, for China, India, the United States and Western Europe and Japan. India’s orange line rises from about 2,700 in 2001 to about 60,000 in 2051, crossing the United States around 2026 and China around 2041. China’s red line peaks near 46,000 and falls to about 42,000. The United States rises slowly to about 28,000 and Western Europe and Japan sit near 9,000. Four text boxes below summarise each region." width={1536} height={1024} />
            </Figure>
            <p>
              We compared it with two things: the IEA’s World Energy Outlook 2025, published in November 2025, which tabulates every country’s total energy supply in exajoules (we convert at 277.8 TWh per exajoule), and the Energy Institute’s Statistical Review figures for 2025, as published by Our World in Data and updated on 30 June 2026.<Cite slug={S} src={U.weo} /><Cite slug={S} src={U.owid} />
            </p>
            <Figure number={9} caption="Five claims on the chart, and what the data say.">
              <ClaimCheck />
            </Figure>
            <p>
              The pattern is clear. The chart has the <em>shape</em> of the story broadly right: China’s demand levels off, the United States is steady, Europe and Japan edge down and India climbs. But for India, the number is wrong on any reading. In 2025 India used 10,861 TWh of energy, not about 22,000; and the United States used 26,064 TWh.<Cite slug={S} src={U.owid} />
            </p>
            <Figure number={10} caption="The chart against the data for 2001 and for 2025. The dashed bars are values we read by eye from the chart.">
              <ChartVsData />
            </Figure>
            <p>
              The forecast is further out still. To reach 60,000 TWh by 2051 from today’s level, India’s energy use would need to grow at about 6.8% a year for 26 years. The IEA’s own scenarios have it growing at between 1.8% and 2.4% a year to 2050, ending at roughly 21,500 to 24,900 TWh.<Cite slug={S} src={U.weo} />
            </p>
            <Figure number={11} caption="India’s total energy supply: the IEA’s 2024 value and its 2035 and 2050 scenarios, against the supplied chart’s 2051 figure (dashed).">
              <IEAPaths />
            </Figure>
            <Callout kind="tip" title="Try this: how to check a chart you are sent">
              <p>Three questions catch most problems. <strong>What is the unit, and is it the one the argument is about?</strong> This chart counts all energy while the post it came with was about electricity. <strong>Which table is the number from?</strong> “IEA and EIA outlooks” is a citation to a library, not to a page. <strong>Does it agree with a primary table for one year you can look up?</strong> One mismatch for today’s value is enough to distrust the forecast.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="agencies" level="Intermediate" number={6}>What the agencies say about India</SectionHeading>
            <p>
              Set the supplied chart aside, and the agencies’ own account of India is strong enough without exaggeration. The IEA’s World Energy Outlook 2025 uses two scenarios. The <strong>Stated Policies Scenario</strong> assumes governments do what they have announced. The <strong>Current Policies Scenario</strong> assumes only rules already in force. Neither is a prediction, and the IEA says the two present “two views on how the energy system may evolve”.<Cite slug={S} src={U.weo} />
            </p>
            <p>
              Both are clear that India is a main driver of the world’s growing energy demand, together with Southeast Asia.<Cite slug={S} src={U.weo} /> In the Current Policies Scenario, India’s energy demand “grows the fastest” of the emerging economies, at 3% a year on average to 2035, against 1.1% for China, whose growth had been 3.6% a year from 2015 to 2024.<Cite slug={S} src={U.weo} />
            </p>
            <p>
              The ranking depends on the scenario, which is why we show both. From 2024 to 2035, India’s total energy supply rises by 15.6 EJ in the Stated Policies Scenario, more than any other country or region the IEA lists apart from the Asia Pacific total that contains it, against 7.4 EJ for China. In the Current Policies Scenario, China adds more (21.9 EJ against India’s 18.6).<Cite slug={S} src={U.weo} /> Among individual countries, India and China are the two biggest additions in either scenario.
            </p>
            <Figure number={12} caption="How much more energy each region uses in 2035 than in 2024, in the IEA’s two scenarios. India leads in one and China in the other.">
              <WhoAdds />
            </Figure>
            <p>
              For electricity, the IEA’s summary is that demand “rises in all countries and regions, with the strongest growth in India and Indonesia”.<Cite slug={S} src={U.weo} /> India’s generation goes from 2,090 TWh in 2024 to 3,687 TWh in 2035 and 5,805 TWh in 2050 in the Stated Policies Scenario. That is nearly three times today’s level, and close to the United States’ 6,237 TWh in the same year, though still far below China’s 19,696 TWh.<Cite slug={S} src={U.weo} />
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="gap" level="Intermediate" number={7}>Why the gap is the story</SectionHeading>
            <p>
              Here is the fact a16z’s chart is really about. In 2025 the average person in the United States had 13,015 kWh of electricity generated for them, the average person in China 7,474 kWh and the average person in India 1,422 kWh.<Cite slug={S} src={U.owid} />
            </p>
            <Figure number={13} caption="Electricity generated per person, 2025.">
              <PerPerson />
            </Figure>
            <p>
              If “no low-electricity country is rich” holds, then a country that wants to get richer will need more electricity per person, and India has a long way to go. That is a large part of why the agencies’ tables put India at the top of their growth rankings: not because it is the biggest today, but because it starts from little per head and has well over a billion people.
            </p>
            <h3>What India’s extra demand is actually made of</h3>
            <p>
              The IEA’s February 2026 report gives the detail. Between 2021 and 2025, India’s net electricity demand grew by close to 430 TWh. Homes and services drove half of it, industry 36%, and space cooling alone contributed 15% of the total.<Cite slug={S} src={U.el} /> The IEA expects demand to grow by an average 6.4% a year through 2030, “in line with IMF’s GDP forecasts”, adding over 570 TWh to annual consumption. Industry is expected to supply about a third of that growth, cooling to account for “over 20%”, and agriculture and transport together around a fifth.<Cite slug={S} src={U.el} />
            </p>
            <Figure number={14} caption="What the growth in India’s electricity demand is made of, as the IEA reports it for 2021–2025 and forecasts it for 2026–2030.">
              <DemandSources />
            </Figure>
            <p>
              The path is not smooth. After four years of growth above 6%, India’s demand grew only 1.4% in 2025 (the IEA’s July update revises that to 1.6%) because an early monsoon reduced cooling and farm pumping. In the first half of 2026 it rose about 6%, with a record peak of 270.8 GW on 21 May, and the IEA forecasts about 7% for the year.<Cite slug={S} src={U.el} /><Cite slug={S} src={U.myu} />
            </p>
            <Figure number={15} caption="India’s electricity demand, from the IEA’s two reports of 2026.">
              <GrowthTimeline />
            </Figure>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="centres" level="Intermediate" number={8}>India’s data-centre moment</SectionHeading>
            <p>
              Against that backdrop, here is where India’s data centres stand. The IEA’s April 2025 report said India had 2 GW of installed data-centre capacity in operation as of June 2024, which had doubled in four years and consumed electricity equivalent to 6.5 million Indian households. With more than 2 GW in the pipeline for the following two years, it said, installed capacity was “on track to reach nearly 5 GW by 2030”.<Cite slug={S} src={U.eai} />
            </p>
            <p>
              The IEA’s 2026 reports describe a market gaining speed: data-centre demand in India “expanded by close to 50%” in 2025, with Maharashtra home to more than half of operating capacity;<Cite slug={S} src={U.el} /> new tax incentives for data centres in India’s 2026 budget; and the government’s stress on expanding capacity at the AI Impact Summit it hosted in February 2026.<Cite slug={S} src={U.kq} />
            </p>
            <p>
              CBRE South Asia’s report, as reported by the India Brand Equity Foundation on 7 October 2026, says India added about 130 MW of data-centre capacity in the first half of 2026 and expects more than 200 MW more in the second half, taking operational capacity to 2 GW by the end of the year. Mumbai accounted for 94% of the new supply. Investment commitments were about US$38 billion in the first half of 2026 and about US$173 billion since 2021, with more than 15% tied to AI.<Cite slug={S} src={U.cbre} />
            </p>
            <Figure number={16} caption="India’s data centres, in five snapshots from three sources. The IEA and CBRE do not define “capacity” in the same way.">
              <DCIndiaCards />
            </Figure>
            <Callout kind="warn" title="Why the capacity numbers do not line up">
              <p>The IEA’s 2 GW is for June 2024. CBRE’s 2 GW is for the end of 2026. They are not contradicting each other: the two sources measure different things, such as designed capacity against operational capacity, and the sources do not give a common definition. Do not subtract one from the other, and be cautious with any headline that adds them to a third number.</p>
            </Callout>
            <h3>The companies’ announcements</h3>
            <p>
              Google said on 14 October 2025 that it would invest approximately US$15 billion over 2026 to 2030 in its first AI hub in India, at Visakhapatnam, which “will include a purpose-built data center campus capable of gigawatt-scale compute capacity”. It said it would work with partners “to deliver new transmission lines, clean energy generation, and energy storage systems in Andhra Pradesh”.<Cite slug={S} src={U.google} /> Amazon says its total investment in India between 2026 and 2030 will be US$48 billion, after adding US$13 billion for AI and cloud infrastructure that “will expand AWS data center capacity in Mumbai and Hyderabad”.<Cite slug={S} src={U.amazon} />
            </p>
            <Figure number={17} caption="Money announced, not money spent. Each figure is a company’s or a research firm’s own statement.">
              <MoneyCards />
            </Figure>
            <h3>How big is that, in electricity?</h3>
            <p>
              A little arithmetic of our own puts the capacity numbers in proportion. If India reached 5 GW of data centres and they ran flat out for every hour of the year, they would use 5 × 8,760 hours, about 44 TWh, which is 2.1% of the electricity India generated in 2025.<Cite slug={S} src={U.owid} /> Real facilities do not run flat out, so that is a ceiling, not a forecast. Against the 570 TWh the IEA expects India to add by 2030, the extra use from data centres would be about 6% at most.
            </p>
            <p>
              That does not make AI unimportant for India. It means that for the electricity system as a whole, cooling, industry and everyday growth are the bigger story to 2030, and that AI’s importance is in <em>where</em> and <em>how reliably</em> the power must arrive, as the next section shows.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="grid" level="Advanced" number={9}>The grid has to say yes</SectionHeading>
            <p>
              A data centre does not just need a lot of electricity; it needs it every hour, without interruptions. India’s grid is being asked for more of exactly that, on a hot afternoon, just as it is being asked for more cooling.
            </p>
            <p>
              The IEA’s July 2026 update describes the pressure. Peak demand was met on 21 May, with solar PV covering 22% of the daytime peak. But “growing summer peak net load” in the evening, after the sun sets, requires coal and gas to ramp up quickly, in some cases leading to shortages, which “more than doubled” between January and May 2026 compared with the year before.<Cite slug={S} src={U.myu} /> Spot prices reached the regulatory ceiling several times.<Cite slug={S} src={U.myu} />
            </p>
            <Figure number={18} caption="A hot spell on India’s grid, and the supply response, according to the IEA.">
              <GridStrain />
            </Figure>
            <p>
              Data centres add their own questions. The IEA’s 2025 report says India will need to address “long-standing issues of grid reliability”, that backup and captive power generation for data centres remain “a critical consideration owing to the risk of power supply interruptions”, and that coal fuelled 74% of India’s electricity then and is likely to dominate beyond 2030, even as renewables’ share is projected to reach 35%.<Cite slug={S} src={U.eai} /> Because India’s “open access” rules let buyers purchase power directly from generators, several technology companies are signing contracts straight with renewable producers; the report names Bharti Airtel’s data-centre arm, which planned to buy 140 GWh of renewable energy a year.<Cite slug={S} src={U.eai} />
            </p>
            <Callout kind="deep" title="Going deeper: why evenings are the hard part">
              <p>Solar power peaks at midday, when it is cheap and plentiful. A data centre, an air conditioner and a factory all want power at 7 pm, when solar has gone. The system must then supply the “net load”, which is demand minus what wind and solar are producing. The IEA’s update describes coal and gas ramping up to cover those hours, and a rising nuclear share, with nuclear generation forecast to rise 30% in 2026.<Cite slug={S} src={U.myu} /> In principle, storage is what moves a daytime surplus into the evening; the update’s point is that the evening ramp is where the stress shows.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="lead" level="Intermediate" number={10}>So does India “lead”?</SectionHeading>
            <p>
              It depends entirely on what is being measured, and the agencies’ own tables let us be precise. On some measures India already leads or is about to; on others it is far behind and is not going to catch the leaders within the period the agencies cover.
            </p>
            <Figure number={19} caption="Six ways to measure “leading”. Green: India is ahead. Amber and rose: it is not, yet.">
              <LeadScoreboard />
            </Figure>
            <p>
              The honest summary has two halves. <strong>India is not the world’s biggest electricity user and will not be by 2050</strong> on the IEA’s numbers: China is about 3.4 times India’s size in generation in 2050 in the Stated Policies Scenario (19,696 TWh against 5,805 TWh), and the United States stays slightly ahead.<Cite slug={S} src={U.weo} /> And in data-centre electricity, the United States and China take most of the growth to 2030.<Cite slug={S} src={U.kq} />
            </p>
            <p>
              But <strong>India is where the largest additions are coming from in total energy to 2035</strong> under the IEA’s Stated Policies Scenario, where the growth rate in electricity demand is highest of the large markets (6.4% a year to 2030, against 5.3% for Southeast Asia and 4.9% for China),<Cite slug={S} src={U.el} /> and where the gap between today’s per-person use and richer countries’ is large. That is a different claim from “India leads”, and a more defensible one. If we had to put it in one line: <strong>India is not the world’s biggest user of power, but it is the biggest place where the extra demand is landing.</strong>
            </p>
            <p>
              Whether AI plays a leading part in that depends on what happens to the things the IEA lists: how fast the grid can connect and supply new loads, how quickly clean power and storage are added, and whether the investment commitments announced become switched-on capacity.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="you" level="Beginner" number={11}>What it means for you</SectionHeading>
            <p>
              You do not need to become an energy analyst. But a few things follow from the numbers.
            </p>
            <ul>
              <li><strong>If you use AI, match the tool to the job.</strong> A simple text question costs very little; long video, deep reasoning and agent runs that browse and retry cost much more, by the IEA’s account. Use the heavy tools when the job needs them.</li>
              <li><strong>If you work in technology or business, the constraint is changing.</strong> The IEA describes “a scramble for electricity, grid connections, manufacturing capacity, chips and capital” across the AI value chain.<Cite slug={S} src={U.kq} /> Power and grid connections are becoming part of every serious AI plan.</li>
              <li><strong>If you are choosing a career or a business, look at the plumbing.</strong> Power equipment, storage, transmission and cooling, and the people who keep them running, are where the scramble the IEA describes shows up.</li>
              <li><strong>If you read a headline about energy, check the unit.</strong> Energy, electricity, capacity (GW) and consumption (TWh) are four different things, and most bad charts mix them.</li>
            </ul>
            <Figure number={20} caption="Five things to watch over the next year. None needs special data; most are published by the agencies named in the references.">
              <WatchList />
            </Figure>

            <h3>The message</h3>
            <p>
              Elon Musk’s sentence is an opinion, but its logic is sound enough to take seriously: the countries that become rich use a great deal of electricity, and AI is a new, fast-growing customer for it. India is at the start of that climb. By the IEA’s numbers it adds more energy demand to 2035 than any other country, in one of its two scenarios, and sees the fastest electricity growth of the big markets to 2030. It is also starting from 1,422 kWh a person, and its grid is already being tested on hot evenings.
            </p>
            <p>
              The chart we were handed told a simpler and prettier story, with India overtaking the United States and then China. The real story is less dramatic and worth more: no country in the data is “leading” on every measure, the growth is real, and what happens in the next ten years will be decided less by headlines about gigawatts than by whether wires, storage and clean generation are built as fast as the data centres.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>AI turns electricity into answers, and India is where the most new demand for electricity is arriving.</strong> The winners will be the places that can supply it reliably.
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is the difference between total energy and electricity, and which one does AI use?", a: "Total energy counts every fuel and form; electricity is the part delivered over a wire. In 2025 electricity was about a fifth of total energy supply in India, China, the US and the world. AI runs on electricity." },
                { q: "According to the IEA, how much electricity will the world’s data centres use in 2030, and what share of world demand is that?", a: "Around 950 TWh, roughly double 2025’s 485 TWh, and about 3% of global electricity demand." },
                { q: "Why does the IEA say AI can be more efficient per task but still use more electricity overall?", a: "Energy per task has been falling by at least an order of magnitude a year, but uptake is surging and new uses such as video, reasoning and agentic tasks can use hundreds or thousands of times more energy per query than simple text." },
                { q: "What was wrong with the supplied chart’s India line?", a: "It showed India at about 22,000 TWh in 2026, level with the US, when the data show about 10,861 TWh in 2025 against the US’s 26,064; and it projected about 60,000 TWh by 2051, while the IEA’s scenarios give roughly 21,500 to 24,900 TWh in 2050." },
                { q: "In what sense is it fair to say India leads, and in what sense is it not?", a: "Fair: it has the biggest addition to total energy demand to 2035 in the IEA’s Stated Policies Scenario and the fastest electricity growth of the large markets to 2030. Not fair: it generates about a fifth of China’s electricity today, and stays far behind it in 2050." },
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
              The International Energy Agency, the Energy Institute, Ember, Our World in Data, CBRE, the India Brand Equity Foundation, Google, Amazon, a16z, X and OpenAI are independent of MSRX; this article is not affiliated with or endorsed by any of them. Quotes are word for word from the linked sources. Facts were checked on 12 October 2026 and may change. Conversions between exajoules and terawatt-hours use 1 EJ = 277.8 TWh. The supplied chart is shown only so it can be checked; its figures should not be used.
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
