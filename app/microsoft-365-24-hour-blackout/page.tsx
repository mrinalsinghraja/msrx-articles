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
import { Cascade, Compare2026, Impact, KnownUnknown, Pic, Plan, RecoveryLevers, ScaleCheck, ServicesMap, StoryChanged, Suspects, Timeline } from "@/components/figures/m365-blackout";

const article = getArticle("microsoft-365-24-hour-blackout") as Article;
const previous = getArticle("ai-selloff-2-5-trillion-day") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  sw: "https://www.securityweek.com/microsoft-365-outage-disrupts-outlook-exchange-online-and-teams/",
  cah: "https://www.cloudadminhub.com/microsoft-365-service-health/ex1550543/",
  msp: "https://x.com/MSFT365Status/status/2120957934607700161",
  ms: "https://x.com/MSFT365Status/status/2121303408313303423",
  cnbc: "https://www.cnbc.com/2026/11/12/microsoft-outage-outlook-aws-google.html",
  wiki: "https://en.wikipedia.org/wiki/2026_Microsoft_outage",
  seats: "https://office365itpros.com/2026/01/30/microsoft-fy26-q2-results/",
  oi: "https://www.outlookindia.com/international/microsoft-fixes-24-hour-global-outage-that-silenced-outlook-and-teams-worldwide",
  reg: "https://www.theregister.com/saas/2026/11/12/microsoft-struggling-to-fix-massive-cloud-outage-thats-taken-down-email-and-intune/5309531",
  regjan: "https://www.theregister.com/2026/01/23/microsoft_365_outage/",
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
  { name: "The 24-hour blackout", path },
];

const TOC = [
  { id: "day", label: "The blackout on one page" },
  { id: "count", label: "Half a billion? Checking the headline" },
  { id: "down", label: "What went down" },
  { id: "broke", label: "What Microsoft says broke" },
  { id: "story", label: "How the explanation changed" },
  { id: "suspects", label: "What is ruled out" },
  { id: "recovery", label: "Why it took a day to fix" },
  { id: "impact", label: "Who felt it" },
  { id: "unknown", label: "Known and unknown" },
  { id: "plan", label: "What to do with this" },
  { id: "references", label: "References" },
];

export default function Blackout() {
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
            { "@type": "Thing", name: "Microsoft 365 outage" },
            { "@type": "Thing", name: "Exchange Online" },
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
            {article.series} · Article 25
          </p>
          <h1 className="display text-[clamp(30px,5.2vw,52px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            The <span className="msrx-gradient-text">24-Hour Blackout</span>: What Really Happened When Microsoft 365 Went Dark Worldwide
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
              This was written on Sunday 15 November 2026, while the story is still developing. Microsoft has promised a preliminary post-incident report within two business days and a final one within five, and I found neither published yet, so the cause below is preliminary.
              I had no access to Microsoft’s admin center. The incident text comes from Microsoft’s own public posts and from Cloud Admin Hub, an outside site that mirrors it; where I could, I checked the mirror against Microsoft’s own words. Pages from the BBC, the Guardian, CBC and Forbes were blocked to me, so I did not use them. Wikipedia is used sparingly and flagged.
              Some headlines say nearly half a billion users were cut off. Section 2 shows why I did not repeat that. Nothing here is advice.
              Green sections need no background. Amber ones add some technical detail. Red ones weigh claims that disagree.
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
            <SectionHeading id="day" level="Beginner" number={1}>The blackout on one page</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Between Thursday 12 and Friday 13 November 2026, email and a long list of other Microsoft 365 services stopped working for organisations around the world. Microsoft’s own incident record puts the start at 16:20 UTC on Thursday and the end of customer impact at 16:10 UTC on Friday, which is 23 hours and 50 minutes (our arithmetic).<Cite slug={S} src={U.cah} /> That is the “24 hours” in the title. Outlook India also describes it as more than 24 hours.<Cite slug={S} src={U.oi} />
            </p>
            <p>
              Users in the Americas were first to find they could not reach their Exchange Online mailboxes.<Cite slug={S} src={U.sw} /> Microsoft’s status account soon warned that the problem could affect users in any region.<Cite slug={S} src={U.msp} /> The disruption ran through the US morning on Friday and across the Asian and European working days, and CNBC says Microsoft reported on Saturday that service was restored to the remaining customers and regions.<Cite slug={S} src={U.cnbc} />
            </p>
            <Figure number={1} caption="Real screenshot, captured 15 November 2026, of the first four posts in Microsoft’s official @MSFT365Status thread about the outage. Cropped to the posts, so X’s sign-in panel and side columns are left out.">
              <Pic file="ms-x-early.jpg" alt="Screenshot of four posts from the Microsoft 365 Status account on X. They say Microsoft is investigating Exchange Online mailbox access issues in the Americas under EX1550543, that the issue may affect users in any region, that a portion of infrastructure is under elevated load, and that traffic is being redistributed" width={864} height={904} max="34rem" />
            </Figure>
            <p>
              On Friday Microsoft apologised, saying it was “deeply sorry” for the disruption to customers and partners, and said the cause was a technical issue unrelated to cyber attack or AI agents.<Cite slug={S} src={U.ms} /> It also said it restored service gradually, checking stability at each stage, and would publish a full post-incident report once its review is complete.<Cite slug={S} src={U.ms} />
            </p>
            <Figure number={2} caption="The blackout in order, in UTC.">
              <Timeline />
            </Figure>
            <Callout kind="eli5">
              <p>Think of Exchange Online as the sorting hall of a huge post office that a whole company also uses for calendar invites, alerts and internal notes. When the sorting hall jams, the letters stop. So does everything that quietly relies on it. Nobody’s letters were burned; the hall simply could not take new ones in for a while.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="count" level="Intermediate" number={2}>Nearly half a billion? Checking the headline</SectionHeading>
            <p>
              A headline number deserves a check, and this one fails it. Wikipedia’s outage article says around 430 million people globally use Microsoft 365.<Cite slug={S} src={U.wiki} /> Microsoft’s own January 2026 results put paid commercial seats above 450 million, up 6% on the year.<Cite slug={S} src={U.seats} /> Both numbers describe the size of the customer base. Neither says how many people lost access.
            </p>
            <Figure number={3} caption="Three numbers that are easy to confuse.">
              <ScaleCheck />
            </Figure>
            <p>
              None of the reports I opened gives a count of affected users or organisations.<Cite slug={S} src={U.cnbc} /> What the sources do give is geography: Wikipedia says issues were reported in more than 70 countries, and Outlook India says at least 74.<Cite slug={S} src={U.wiki} /><Cite slug={S} src={U.oi} /> And the status page said components that do not depend on Exchange Online stayed functional, so “everything stopped” overstates it.<Cite slug={S} src={U.sw} />
            </p>
            <Callout kind="deep">
              <p>A paid “seat” is a licence, not a person, and one person can hold more than one. Personal services such as Outlook.com, OneDrive and OneNote were also reported hit, and those sit outside the paid commercial seat count.<Cite slug={S} src={U.oi} /> So the honest statement is that the outage reached a large share of a customer base of over 450 million seats, but nobody outside Microsoft can say what share, and Microsoft has not said.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="down" level="Beginner" number={3}>What went down</SectionHeading>
            <p>
              Microsoft tracked the problem under two incident numbers. EX1550543 covers Exchange Online mailbox connections; MO1550821 covers the wider Microsoft 365 impact.<Cite slug={S} src={U.sw} /> Outlook on the web, the Messaging API, Exchange ActiveSync and the REST API were among the ways of connecting that failed, and mail flowing to or from on-premises systems may also have been affected.<Cite slug={S} src={U.cah} />
            </p>
            <Figure number={4} caption="Real screenshot, captured 15 November 2026, of SecurityWeek’s report of 12 November, updated 13 November. Cropped to the headline, summary and byline, so the site’s header, trending list and promotions are left out.">
              <Pic file="secweek-headline.jpg" alt="Screenshot of SecurityWeek headline Microsoft 365 Outage Disrupts Outlook, Exchange Online and Teams, with the summary that Microsoft says failed server health checks disrupted Outlook and the company has disclosed no evidence of a cyberattack" width={1240} height={350} />
            </Figure>
            <p>
              Teams, SharePoint Online, Microsoft 365 Copilot and Defender XDR were among the services hit because they interact with Exchange Online.<Cite slug={S} src={U.sw} /> The Register adds Intune and the Microsoft 365 Apps Admin Center, which meant administrators lost some of the tools they would use to diagnose the problem.<Cite slug={S} src={U.reg} /> SecurityWeek also notes that some Google Workspace users reported trouble reaching Google-hosted mail through Outlook clients.<Cite slug={S} src={U.sw} />
            </p>
            <Figure number={5} caption="Exchange Online at the centre, and what leaned on it.">
              <ServicesMap />
            </Figure>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="broke" level="Intermediate" number={4}>What Microsoft says broke</SectionHeading>
            <p>
              Microsoft’s explanation, as of Friday, is that the incident was introduced by an issue during an earlier network capacity upgrade, which surfaced after a more recent network change.<Cite slug={S} src={U.ms} /> A fuller, still preliminary, account appears in the incident text as mirrored by Cloud Admin Hub: a failure in the systems that establish secure connections to the service. Traffic shifts during routine network maintenance exposed a latent bug, so new connection requests could not complete and queued up; the affected servers then ran out of processing capacity and could no longer accept new connections.<Cite slug={S} src={U.cah} />
            </p>
            <Figure number={6} caption="Real screenshot, captured 15 November 2026, of the incident text for EX1550543 as mirrored by Cloud Admin Hub, a third-party site, not Microsoft. Cropped to the incident title, status and timeline entry, so the site’s navigation and search are left out. Its header start time (10:05 GMT) disagrees with its own details (4:20 PM UTC).">
              <Pic file="incident-ex1550543.jpg" alt="Screenshot of a Cloud Admin Hub page for incident EX1550543 showing it resolved, with Microsoft's final status that this was a technical issue not related to cyber or AI agents, the earlier network capacity upgrade explanation, a start time of 4:20 PM UTC on 12 November, an end time of 4:10 PM UTC on 13 November and a preliminary root cause" width={880} height={1460} max="38rem" />
            </Figure>
            <p>
              SecurityWeek’s description matches in outline: a process that establishes secure connections became overwhelmed, causing affected servers to stop handling requests, and Microsoft began rolling back a recent network configuration change that coincided with the start of the disruption.<Cite slug={S} src={U.sw} /> Two outside write-ups of Microsoft’s text agreeing in outline is useful, but both rely on Microsoft to describe its own failure.
            </p>
            <Figure number={7} caption="How one hidden fault can spread. Our illustration.">
              <Cascade />
            </Figure>
            <Callout kind="eli5">
              <p>Picture a restaurant with ten waiters. If one is overwhelmed and has to sit out, the other nine cover his tables. Now they are overwhelmed, and a second drops out, then a third. Nobody was lazy. Each failure made the next more likely. That is why Microsoft said the load came from servers going missing, not from more customers arriving.</p>
            </Callout>
            <Callout kind="deep">
              <p>A health check is a small, automatic probe that asks a server “are you able to take work?” Traffic is only sent to servers that answer yes. Microsoft said failing health checks were taking servers out of service, and that a specific component responsible for processing server health might be the source.<Cite slug={S} src={U.reg} /> That fits the later account of servers running out of capacity, but it also means that once enough servers drop out, the system can no longer carry the load of the ones that remain. Microsoft has not said whether any servers were removed wrongly.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="story" level="Advanced" number={5}>How the explanation changed, and one tension</SectionHeading>
            <p>
              Microsoft’s story moved through several steps in about a day. It began as mailbox connectivity errors in the Americas, became “elevated load” across regions, then a finding that the load came from servers being unavailable, then failing health checks, and finally the capacity-upgrade explanation.<Cite slug={S} src={U.msp} /><Cite slug={S} src={U.ms} />
            </p>
            <Figure number={8} caption="Real screenshot, captured 15 November 2026, of three more posts in Microsoft’s official @MSFT365Status thread. Cropped to the posts, so X’s sign-in panel and side columns are left out.">
              <Pic file="ms-x-health.jpg" alt="Screenshot of three posts from the Microsoft 365 Status account on X: one about testing a configuration change for servers failing automated health checks, one saying no recent change correlated with the start of impact has been identified, and one about validating an alternative service health check method" width={864} height={820} max="34rem" />
            </Figure>
            <Figure number={9} caption="How Microsoft’s explanation developed, in order.">
              <StoryChanged />
            </Figure>
            <p>
              There is one visible tension. The Register reports that Microsoft said it had not identified any system change that might have triggered the incident, while its status page also spoke of assessing a revert of a small number of recent configuration updates.<Cite slug={S} src={U.reg} /> Microsoft later pointed to a network change. One way to reconcile them, and it is only our reading, is that the root fault sat in the earlier capacity upgrade rather than in anything recent. Microsoft has not said so, and the post-incident report is where this should be settled.
            </p>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="suspects" level="Advanced" number={6}>What is ruled out, and what is only unlinked</SectionHeading>
            <p>
              The first questions people ask after a global failure are whether it was an attack, whether AI was involved, and whether the latest update caused it. The honest answers differ in strength. On the first two Microsoft has spoken directly: it said at this stage there was no evidence of malicious activity, and that the incident was not related to cyber or AI agents.<Cite slug={S} src={U.sw} /><Cite slug={S} src={U.ms} /> That is Microsoft’s statement, not an outside finding.
            </p>
            <p>
              The update question is murkier. The outage came two days after November’s Patch Tuesday, which fixed 1,094 vulnerabilities including an Outlook spoofing flaw Microsoft said had been exploited. Microsoft’s advisories have not linked that release to the outage.<Cite slug={S} src={U.sw} /> Wikipedia’s infobox labels the cause “faulty server updates”, which is looser than Microsoft’s own wording about a network capacity upgrade and a network change.<Cite slug={S} src={U.wiki} /> Timing alone does not show cause.
            </p>
            <Figure number={10} caption="The suspects, and where the evidence stands.">
              <Suspects />
            </Figure>
            <Figure number={11} caption="Real screenshot, captured 15 November 2026, of Wikipedia’s ‘2026 Microsoft outage’ article. Cropped to the article’s opening, timeline and cause, so the site’s header, donation link and settings panel are left out. Wikipedia is crowd-edited; treat it as a pointer, not proof.">
              <Pic file="wiki-outage.jpg" alt="Screenshot of the Wikipedia article 2026 Microsoft outage with an infobox giving the date as November 12 to 14, 2026, the type as IT outage and the cause as faulty server updates, followed by a timeline and cause section" width={765} height={910} max="34rem" />
            </Figure>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="recovery" level="Intermediate" number={7}>Why it took a day to fix</SectionHeading>
            <p>
              Microsoft’s first fixes did not work. On Thursday it said its actions so far had not provided the anticipated relief.<Cite slug={S} src={U.reg} /> A workaround that bypassed the component processing health checks brought some servers back,<Cite slug={S} src={U.sw} /> but The Register reported that returned servers might stop responding again once traffic reached them.<Cite slug={S} src={U.reg} /> Recovery therefore had to be slow: isolate part of the infrastructure, restart it, reintroduce traffic and confirm it is stable, then widen.<Cite slug={S} src={U.reg} />
            </p>
            <Figure number={12} caption="Real screenshot, captured 15 November 2026, of one more post in Microsoft’s official @MSFT365Status thread. Cropped to the post, so X’s sign-in panel and side columns are left out.">
              <Pic file="ms-x-pause.jpg" alt="Screenshot of a post from the Microsoft 365 Status account on X saying it is pursuing all pathways to reduce impact, has paused all deployments, is moving traffic off the affected infrastructure and is restarting affected servers" width={864} height={290} max="34rem" />
            </Figure>
            <Figure number={13} caption="The levers Microsoft pulled.">
              <RecoveryLevers />
            </Figure>
            <p>
              The incident record shows recovery arriving region by region: Asia Pacific first, then Europe, then North America, with capacity added and a patch applied first to a subset and then more widely.<Cite slug={S} src={U.cah} /> The retry window for delayed mail was extended to 48 hours to preserve messages.<Cite slug={S} src={U.cnbc} /> Microsoft’s own explanation for the pace was that, given the scale of demand, it restored services gradually, which took longer but helped ensure stability.<Cite slug={S} src={U.ms} />
            </p>
            <Callout kind="eli5">
              <p>After a stadium loses power you do not open every gate at once. If forty thousand people surge in together, the system trips again. Engineers let people in section by section. Microsoft’s “validating stability at each stage” is the same idea, and it is why the last users waited the longest.</p>
            </Callout>
            <Callout kind="deep">
              <p>Engineers have a name for what a restart can trigger: a thundering herd, where every waiting client retries at the same moment and floods the servers that just returned. Whether that happened here is not something the sources state. Microsoft’s “reintroducing traffic” in stages is the standard defence against it, and the 48-hour retry window kept mail queued rather than rejected.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="impact" level="Intermediate" number={8}>Who felt it</SectionHeading>
            <p>
              CNBC reports that organisations affected included the UK’s NHS, the Swiss luxury group Richemont, which delayed its earnings, and Workhorse Group, which moved its results to 16 November; it also says Air India temporarily rerouted email.<Cite slug={S} src={U.cnbc} /> Outlook India adds a Manchester court sending jurors home, a Colorado sheriff’s office asking people to post bond in person, some Japanese companies returning to fax, and email disruption at the airlines IndiGo and Akasa Air.<Cite slug={S} src={U.oi} /> Wikipedia lists government departments in five countries and hospitals in Toronto.<Cite slug={S} src={U.wiki} />
            </p>
            <Figure number={14} caption="Who reported trouble, by sector, with the outlet for each claim.">
              <Impact />
            </Figure>
            <p>
              One more detail keeps this in proportion: Microsoft’s shares traded largely flat on Friday, CNBC reports.<Cite slug={S} src={U.cnbc} /> Amazon also said its services were operating normally after some users blamed it for the same problems, which is a reminder that during a big outage unrelated services get blamed too.<Cite slug={S} src={U.cnbc} />
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="unknown" level="Advanced" number={9}>Known and unknown, and the January outage</SectionHeading>
            <p>
              This was not Microsoft 365’s only big failure this year. On the evening of 22 January 2026 an outage hit North America for nearly 10 hours, with Microsoft blaming a portion of service infrastructure that was not processing traffic as expected.<Cite slug={S} src={U.regjan} /> The two incidents differ in size and in the causes Microsoft gave, and nothing in the sources links them.
            </p>
            <Figure number={15} caption="Two large Microsoft 365 incidents in 2026, side by side.">
              <Compare2026 />
            </Figure>
            <Figure number={16} caption="What the sources support, and what they leave open.">
              <KnownUnknown />
            </Figure>
            <p>
              The summary is that the timeline and the headline cause are well documented, the exact mechanism is preliminary, and the scale, the cost and the fixes are not yet known. When Microsoft’s post-incident report arrives, check it first against three open points: whether the cause is the capacity upgrade alone, what the “recent network change” was, and what Microsoft will change so a single latent fault cannot take mail down worldwide.
            </p>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={10}>What to do with this</SectionHeading>
            <Figure number={17} caption="A practical path, by who you are. General information, not advice.">
              <Plan />
            </Figure>
            <p>
              For a deeper look at how to read a big, fast-moving number without being fooled by it, see the previous article in this series, <Link href={`/${previous.slug}`}>{previous.title}</Link>. The same habit applies here: ask who said it, what it counts and when it was measured.
            </p>

            <h3>The message</h3>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>The outage was real, global and about a day long, but “nearly half a billion cut off” is Microsoft’s whole customer base, not a count of victims: check what a big number actually counts.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "How long did the core impact last, by Microsoft’s own incident record?", a: "From 16:20 UTC on 12 November to 16:10 UTC on 13 November, which is 23 hours 50 minutes (our arithmetic). Monitoring and the email backlog continued afterwards." },
                { q: "Why is “nearly half a billion users cut off” misleading?", a: "The 430 million and 450 million figures describe Microsoft 365’s customer base (people who use it, and paid commercial seats). Microsoft has not published how many were affected." },
                { q: "What does Microsoft say caused the outage?", a: "A technical issue introduced during an earlier network capacity upgrade that surfaced after a recent network change. Preliminary text adds a latent bug in the systems that set up secure connections." },
                { q: "Name two things Microsoft says it was not.", a: "It said the incident was not related to cyber attack and not related to AI or AI agents, and that it had found no evidence of malicious activity." },
                { q: "Why did mail not bounce back to senders during the outage?", a: "Microsoft extended the delayed-mail timeout to 48 hours, so queued messages kept being retried." },
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
              Microsoft, Exchange Online, Teams, Outlook, Copilot, Amazon, Google, X and the publications named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. Facts were checked on 15 November 2026 against the sources listed above. Screenshots are real captures from that date, cropped to leave out advertising, sign-in prompts and promotions.
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
