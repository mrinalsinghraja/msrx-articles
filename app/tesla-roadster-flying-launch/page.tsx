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
  AiAngle,
  AiClaims,
  AirSystem,
  Conflicts,
  OnStage,
  Reserve,
  SafetyRegs,
  Specs,
  Suction,
  Timeline,
  Trims,
  Unknowns,
  WatchList,
} from "@/components/figures/roadster-guide";

const article = getArticle("tesla-roadster-flying-launch") as Article;
const previous = getArticle("typesafe-jev-real-usage-cost") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  page: "https://www.tesla.com/roadster",
  reserve: "https://www.tesla.com/roadster/reserve",
  tc: "https://techcrunch.com/2026/10/15/tesla-reveals-spacex-powered-roadster-that-flies-and-falls-with-style/",
  cbs: "https://www.cbsnews.com/news/tesla-roadster-debut-elon-musk-flying-cars-are-real/",
  fox: "https://www.foxbusiness.com/technology/teslas-new-roadster-makes-flying-debut-hitting-60-mph-under-second",
  space: "https://www.space.com/technology/spacex-thrusters-just-made-a-tesla-roadster-fly-and-elon-musks-car-is-still-out-there-in-space",
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
  { name: "Tesla’s flying Roadster", path },
];

const TOC = [
  { id: "stage", label: "What happened on stage" },
  { id: "car", label: "The three versions" },
  { id: "how", label: "How it works" },
  { id: "cost", label: "What reserving costs" },
  { id: "safety", label: "Safety and the regulators" },
  { id: "ai", label: "The AI claims we were handed" },
  { id: "disagree", label: "Where the sources disagree" },
  { id: "unknown", label: "What nobody knows yet" },
  { id: "references", label: "References" },
];

export default function TeslaRoadsterFlyingLaunch() {
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
            { "@type": "Organization", name: "Tesla" },
            { "@type": "Organization", name: "SpaceX" },
            { "@type": "Thing", name: "Tesla Roadster" },
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
            {article.series} · Article 17
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Tesla’s <span className="msrx-gradient-text">flying Roadster</span>: what was shown, and what was only said
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
              This covers the Tesla Roadster reveal of 15 October 2026 using Tesla’s own pages and four news reports. Green sections need no background. Amber ones look
              at the specifications and costs. Red ones get into how it works, safety and a list of AI claims we tried to verify and could not. Every number is
              Tesla’s or a reporter’s, attributed, and none has been independently tested.
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
            <SectionHeading id="stage" level="Beginner" number={1}>What happened on stage</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              On Thursday 15 October 2026, Tesla showed its second-generation Roadster driving up a ramp, hanging upside down, and then flying off to roll in the air and land on its wheels.<Cite slug={S} src={U.cbs} />
            </p>
            <p>
              The event was livestreamed on Tesla’s X account from a SpaceX rocket-testing site in McGregor, near Waco, Texas.<Cite slug={S} src={U.cbs} /><Cite slug={S} src={U.fox} /> Elon Musk, who runs both Tesla and SpaceX, said “flying cars are real”, and added that the car’s “success is not guaranteed” but that “it will probably work.”<Cite slug={S} src={U.cbs} />
            </p>
            <Figure number={1} caption="What happened in the demonstration, from the press accounts.">
              <OnStage />
            </Figure>
            <p>
              The car clung to the ramp by suction, dropped away, rolled and landed using cold-gas thrusters, then used the same thrusters to leap over a line of vehicles. TechCrunch lists a Cybercab, Cybertruck, Tesla Semi, Model Y and Model 3.<Cite slug={S} src={U.tc} /> Space.com counts six vehicles including a Semi cab and notes that the driver’s seat held a mannequin in a SpaceX spacesuit, a nod to the dummy that rode the first Roadster into space in 2018.<Cite slug={S} src={U.space} />
            </p>
            <Callout kind="eli5">
              <p>Think of it as a stage show for an engineering idea. The stunts prove the pieces can work together once, under controlled conditions. They do not show that anyone will be able to buy and use such a car.</p>
            </Callout>
            <p>
              The date matters because this car has been promised for a long time. Tesla first showed the second-generation Roadster in 2017 and, as Fox Business recounts, said deliveries would begin in 2020.<Cite slug={S} src={U.fox} />
            </p>
            <Figure number={2} caption="Nine years from the first reveal to this one, as TechCrunch recounts it.">
              <Timeline />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="car" level="Beginner" number={2}>The three versions</SectionHeading>
            <p>
              Tesla now describes three versions, and it matters which one a claim is about. Performance is “road ready”, with two seats, active aerodynamics and a suction system. Thrust is “race ready”, with rear thrusters. Rocket is “air ready”, with one seat and thrusters around the car.<Cite slug={S} src={U.page} />
            </p>
            <Figure number={3} caption="The three versions, in Tesla’s words.">
              <Trims />
            </Figure>
            <p>
              Tesla’s page says the Thrust version goes from 0 to 60 mph in under one second, and a footnote says the specifications on the page are for the Thrust augment only, an optional upgrade.<Cite slug={S} src={U.page} /> TechCrunch reports that all three versions have 300 miles of range and can exceed 230 miles per hour.<Cite slug={S} src={U.tc} />
            </p>
            <Figure number={4} caption="The headline figures, and who said each one. Claims, not test results.">
              <Specs />
            </Figure>
            <p>
              Notice what is missing: a price. Musk named a production year, 2028, and no price.<Cite slug={S} src={U.tc} /> Fox Business adds that a decade ago Tesla quoted a base price of $200,000.<Cite slug={S} src={U.fox} />
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how" level="Intermediate" number={3}>How it works</SectionHeading>
            <p>
              There are two systems at work, and only one of them is a rocket. The first is suction. Tesla says a multi-mode fan and ground-sealing system pulls air from beneath the car as a downforce generator, with enough pull to hold it upside down even when stationary.<Cite slug={S} src={U.page} /> Musk said it should help the car stay glued to the road in fast corners.<Cite slug={S} src={U.space} />
            </p>
            <Figure number={5} caption="The suction system, in three lines.">
              <Suction />
            </Figure>
            <p>
              The second is the thruster system. “Cold-gas” means these are not combustion rockets: they release compressed air. Tesla’s engineering vice-president Lars Moravy said the car has 10 thrusters fed from 600 litres of compressed air, stored in carbon-fibre-wrapped pressure vessels that fill every usable void.<Cite slug={S} src={U.space} /> Musk said the main thrusters are at the rear, with attitude-control thrusters that steer the car’s orientation.<Cite slug={S} src={U.space} /> Tesla said on X that the thrusters produce four to five times the force the tyres can.<Cite slug={S} src={U.fox} />
            </p>
            <Figure number={6} caption="The air system in numbers. Tesla’s claims.">
              <AirSystem />
            </Figure>
            <Callout kind="deep">
              <p>Tesla’s page says the thrusters use “all-electric actuators” to make “micro adjustments within a fraction of a second”, which “helps stabilize the vehicle in flight”.<Cite slug={S} src={U.page} /> That is a description of fast, precise control, which is a well-understood engineering problem. It is not, by itself, a claim about machine learning. We come back to this in section 6.</p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="cost" level="Beginner" number={4}>What reserving costs</SectionHeading>
            <p>
              There is no price, but there is a way to put money down. Tesla’s reservation page shows $5,000 due today for the Performance version, labelled “fully refundable”, and a further $45,000 due within 10 days, so $50,000 in all.<Cite slug={S} src={U.reserve} /> The page warns that reservations are not final until payment is received and that refunds for modifications are not issued.<Cite slug={S} src={U.reserve} />
            </p>
            <Figure number={7} caption="Reservation payments as of 18 October 2026. These are deposits, not the price of the car.">
              <Reserve />
            </Figure>
            <p>
              TechCrunch and Fox Business report a $250,000 reservation payment for Thrust, and describe Rocket as invite-only.<Cite slug={S} src={U.tc} /><Cite slug={S} src={U.fox} /> A reservation is a place in a queue for a car that may not exist until 2028. Check the terms on Tesla’s page before paying anything.
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="safety" level="Intermediate" number={5}>Safety and the regulators</SectionHeading>
            <p>
              Musk was direct about priorities. At the event he said it is “not necessarily a safety-optimized car”.<Cite slug={S} src={U.space} /> Earlier this year, on a podcast, he said that if safety is your first goal you should not buy the Roadster, and that Tesla would “aspire not to kill anyone in this car”.<Cite slug={S} src={U.tc} />
            </p>
            <p>
              Regulators have not caught up. The Federal Aviation Administration told CBS News the vehicle does not meet its definition of an aircraft. The National Highway Traffic Safety Administration normally oversees cars but delegates safety certification to the manufacturer. A senior transport official was sceptical it could take off, but said there was no clear answer on who would oversee it.<Cite slug={S} src={U.cbs} />
            </p>
            <Figure number={8} caption="Statements on safety, and where the regulators stand.">
              <SafetyRegs />
            </Figure>
            <Callout kind="warn">
              <p>Tesla’s page says plainly that the car is “not approved for public road use”.<Cite slug={S} src={U.page} /> Nothing we read suggests a flying Roadster will be legal to use anywhere in the near future.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="ai" level="Advanced" number={6}>The AI claims we were handed</SectionHeading>
            <p>
              This article began with a block of text that described the Roadster as an “intelligent” machine: machine learning balancing the thrusters, predictive tuning of torque, a Grok voice assistant in the cabin, and “Guardian Angel” neural networks that brake and steer to prevent crashes. We do not know where the text came from. We checked each claim against Tesla’s own pages and the four reports.
            </p>
            <Figure number={9} caption="Four claims from the text we were given, against the sources.">
              <AiClaims />
            </Figure>
            <p>
              The result is mixed. The thruster claim has a real basis in Tesla’s description of fast actuator control, but nothing says machine learning is involved. The torque-tuning claim confuses the cause: Tesla attributes the sub-one-second time to the rear thrusters, not to software that learns your driving.<Cite slug={S} src={U.page} /><Cite slug={S} src={U.fox} /> The Grok and “Guardian Angel” claims do not appear in any source we read. The safety claim also sits awkwardly with Musk’s own words about priorities.
            </p>
            <Figure number={10} caption="Where AI does and does not enter the Roadster story.">
              <AiAngle />
            </Figure>
            <p>
              None of this proves the features do not exist. Tesla may announce more, and its page describes a car still two years from production. But a published article should not state as fact what its sources do not say. That is the standard we applied.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="disagree" level="Intermediate" number={7}>Where the sources disagree</SectionHeading>
            <p>
              A product launch produces a flood of quick stories, and they do not always agree. We found four small conflicts, and checked each against Tesla’s pages where we could.
            </p>
            <Figure number={11} caption="Conflicts in the coverage, and how we settled them.">
              <Conflicts />
            </Figure>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="unknown" level="Intermediate" number={8}>What nobody knows yet</SectionHeading>
            <p>
              The honest list of what we cannot say is long. There is no price, no independent test, no clear legal path for the flying version, and no description of how the stunts were controlled. Wall Street is also cautious: analyst Dan Ives wrote that the Roadster will not move volume or revenue, and described it as a way to restore the brand’s halo.<Cite slug={S} src={U.cbs} />
            </p>
            <Figure number={12} caption="What is still unknown.">
              <Unknowns />
            </Figure>
            <Figure number={13} caption="What to watch next.">
              <WatchList />
            </Figure>

            <h3>The message</h3>
            <p>
              Tesla showed a car doing something no road car has publicly done: hanging upside down on suction and rolling through the air on compressed-air thrusters. That is genuine engineering theatre. What it has not shown is a finished product, a price, or an AI brain. The version that the pitch calls “intelligent” is, in the sources we can read, a story about fast control of fans and thrusters, and a promise for 2028.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>The Roadster is a demonstration with a deposit page; read the specifications as targets and the AI features as unproven until Tesla publishes them.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "When and where was the Roadster revealed?", a: "Thursday 15 October 2026, at a SpaceX rocket-testing site in McGregor, Texas, near Waco, livestreamed on Tesla’s X account." },
                { q: "What are the three versions, and which one is said to do 0–60 in under a second?", a: "Performance (road ready), Thrust (race ready) and Rocket (air ready). Tesla’s page attributes the under-one-second figure to Thrust." },
                { q: "What does a Roadster reservation cost?", a: "For Performance, $5,000 due today and $45,000 within 10 days, $50,000 in total, per Tesla’s page. Thrust is reported at $250,000. These are deposits; there is no announced price." },
                { q: "Do the sources say the Roadster uses machine learning, Grok or a “Guardian Angel” safety system?", a: "No. We found none of these in Tesla’s Roadster page or in four news reports. Tesla describes electric actuators for thruster control, and Musk says it is not safety-optimised." },
                { q: "Can the flying version be driven on public roads?", a: "Tesla’s page says it is not approved for public road use, and the FAA says it does not meet its definition of an aircraft." },
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
              Tesla, SpaceX, X, TechCrunch, CBS News, Fox Business and Space.com are independent of MSRX; this article is not affiliated with or endorsed by any of them. Tesla’s Roadster and reservation pages were opened in a browser on 18 October 2026; nothing was entered or submitted. Quotes are word for word from the linked sources. Facts were checked on 18 October 2026 and may change; Tesla’s pages can be edited at any time. All performance figures are claims by Tesla or press reports, and none has been independently tested.
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
