import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { Cite, References } from "@/components/articles/References";
import { citationJsonLd } from "@/lib/references";
import {
  AiEras,
  AttackerClock,
  EffortGap,
  FutureAi,
  KeysToTheKingdom,
  LeakChain,
  Numbers,
  OfflineNotHacked,
  Pic,
  Playbook,
  TheWeek,
  TwoBugs,
  Unknowns,
  Views,
  WhoFound,
  WhoWentOffline,
} from "@/components/figures/black-october-guide";

const article = getArticle("black-october-php2shell") as Article;
const previous = getArticle("claude-duet-proactive-agent") as Article;
const next = getArticle("ai-security-scan-70-repositories") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  bbc: "https://www.bbc.com/news/articles/cmly0lg3w5x2o",
  php: "https://www.php.net/index.php#2026-10-21-5",
  found: "https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/",
  wiz: "https://www.wiz.io/blog/php2shell-php-rce",
  oai: "https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/",
  pz: "https://projectzero.google/2024/10/from-naptime-to-big-sleep.html",
  aws: "https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/",
  itw: "https://itwire.com/business-it-news/security/php2shell-the-14-year-old-bugs-that-pulled-cyber-gov-au-and-government-sites-worldwide-offline",
  reg1: "https://www.theregister.com/cyber-crime/2026/10/22/hackers-pile-on-php2shell-as-aws-reveals-attacks-began-before-disclosure/5304749",
  reg2: "https://www.theregister.com/security/2026/10/23/theres-a-third-php2shell-bug-but-it-wont-get-an-emergency-fix/5305208",
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
  { name: "Black October", path },
];

const TOC = [
  { id: "week", label: "The week the sites went dark" },
  { id: "what", label: "What PHP2Shell is" },
  { id: "before", label: "Before AI: how bugs like this hide" },
  { id: "found", label: "How AI found it" },
  { id: "defend", label: "How AI helps defenders now" },
  { id: "attack", label: "The attackers’ clock" },
  { id: "impact", label: "Impact: governments, Wikipedia and more" },
  { id: "process", label: "A disclosure under pressure" },
  { id: "future", label: "What AI changes next" },
  { id: "act", label: "What to do" },
  { id: "unknown", label: "What nobody knows yet" },
  { id: "references", label: "References" },
];

export default function BlackOctoberPhp2Shell() {
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
            { "@type": "Thing", name: "PHP2Shell" },
            { "@type": "ComputerLanguage", name: "PHP" },
            { "@type": "Thing", name: "AI-assisted vulnerability discovery" },
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
            {article.series} · Article 19
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Black <span className="msrx-gradient-text">October</span>
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
              “Black October” is our name for the week of 20 to 24 October 2026, not an official one. The incident itself is called PHP2Shell. We explain what it is, how AI found it, how AI is helping on both sides, and who was affected,
              using reports from the BBC, iTWire and The Register, plus pages from the PHP project, OpenAI, Wiz, Amazon and Google’s Project Zero. Green sections need no background. Amber ones
              cover the impact and the response. Red ones go into the technical and AI detail. Every number is a named party’s claim, attributed, and none is independently tested.
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
            <SectionHeading id="week" level="Beginner" number={1}>The week the sites went dark</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              In the week of 19 October 2026, governments and companies in many countries took working websites offline on purpose, because two flaws in a programming language called PHP had been found and the fix had only just been released.<Cite slug={S} src={U.bbc} />
            </p>
            <p>
              The BBC reported that international governments and agencies urged websites to address two critical flaws in PHP, that multiple cyber-security agencies urged organisations unable to apply fixes in time to consider taking their sites down, and that bodies including the Finnish government and Edinburgh council took pages offline.<Cite slug={S} src={U.bbc} /> The part that made it unusual is how the flaws were found. The BBC says they were discovered by AI, and that Wiz, one of the finders, called them the “most severe vulnerabilities ever discovered” by the technology.<Cite slug={S} src={U.bbc} />
            </p>
            <Figure number={1} caption="The incident’s own website, php2shell.com, which credits Wiz Research, OpenAI and Calif and links to each firm’s write-up and to the PHP project’s. Real screenshot, captured 24 October 2026.">
              <Pic file="php2shell-site.jpg" alt="The PHP2Shell website with the heading PHP2Shell, the subtitle AI uncovers critical vulnerabilities in the backbone of the web, a pink elephant with a warning sign, and buttons for upgrade guidance." width={800} height={500} />
            </Figure>
            <Figure number={2} caption="The numbers at a glance.">
              <Numbers />
            </Figure>
            <p>
              This article follows the AI thread through the story: what AI could do before, what it did here, what it is doing for defenders and attackers now, and what its makers and critics say comes next. It also asks how bad the damage really was, because “taken offline” and “hacked” are not the same thing.
            </p>
            <Figure number={3} caption="The week in six steps.">
              <TheWeek />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what" level="Beginner" number={2}>What PHP2Shell is</SectionHeading>
            <p>
              PHP is the language that runs on a web server and builds each page you see. iTWire, citing W3Techs, says it runs roughly 70% of websites whose server-side language can be identified, including WordPress, Drupal, Joomla and MediaWiki.<Cite slug={S} src={U.itw} /> The two flaws are CVE-2026-109618 and CVE-2026-109619. The PHP project calls them critical, and says both can allow unauthenticated remote code execution, meaning a stranger can run commands on your server without logging in.<Cite slug={S} src={U.php} />
            </p>
            <Callout kind="eli5">
              <p>Think of PHP as the cook in a restaurant kitchen who turns every order into a finished plate. A flaw in the cook, not in any one recipe, means every dish from every kitchen using that cook is at risk, however good the recipe is.</p>
            </Callout>
            <p>
              The PHP project says all PHP installations serving web requests are at risk, including PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP and LiteSpeed, with the risk highest for mod_php, where a demonstrated exploit lets an unauthenticated request trigger the attack before any application code runs.<Cite slug={S} src={U.php} />
            </p>
            <Figure number={4} caption="The two bugs, in plain terms.">
              <TwoBugs />
            </Figure>
            <p>
              Wiz says the flaws are in PHP itself, so that even a simple “Hello World” application on an affected version can be vulnerable, and that attackers could also read process memory containing passwords, tokens and API keys without needing code execution.<Cite slug={S} src={U.wiz} /> iTWire adds why the database behind a site is not safe either: PHP holds the keys, since a site’s config file often stores the database login, so an attacker who runs code through PHP can usually reach the data.<Cite slug={S} src={U.itw} />
            </p>
            <Figure number={5} caption="Why a flaw in PHP can reach the data behind a site.">
              <KeysToTheKingdom />
            </Figure>
            <p>
              Fixes shipped in PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35. PHP 8.1 and older no longer receive updates from the project, though its security team provided minimal source backports for 7.4, 8.0 and 8.1, and the project says only an update is a complete solution.<Cite slug={S} src={U.php} />
            </p>
            <Figure number={6} caption="The php.net home page on 24 October, showing the four fixed versions and, below them, a 23 October informational advisory about a third, unlikely flaw. Real screenshot, captured 24 October 2026. Image: the PHP project.">
              <Pic file="phpnet-home.jpg" alt="The php.net home page with the PHP logo, four release links 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and an Informational advisory about session upload progress dated 23 Oct 2026." width={800} height={506} />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="before" level="Intermediate" number={3}>Before AI: how bugs like this hide</SectionHeading>
            <p>
              Memory bugs like these are notoriously complex, Wiz says, and hard to find and harder to use.<Cite slug={S} src={U.wiz} /> For years the main tools were human code audits and fuzzing, which throws huge amounts of random input at a program and watches for crashes. Google’s Project Zero said in 2024 that fuzzing was not catching variants of previously patched bugs, while for attackers manual variant analysis was a cost-effective approach.<Cite slug={S} src={U.pz} />
            </p>
            <p>
              On 1 November 2024, Project Zero and Google DeepMind described a Gemini 1.5 Pro-based agent called Big Sleep finding an exploitable stack buffer underflow in SQLite, which was fixed before any official release. They wrote: “We believe this is the first public example of an AI agent finding a previously unknown exploitable memory-safety issue in widely used real-world software.”<Cite slug={S} src={U.pz} /> The team said it saw a “promising path towards finally turning the tables and achieving an asymmetric advantage for defenders.”<Cite slug={S} src={U.pz} />
            </p>
            <Figure number={7} caption="The Project Zero post of 1 November 2024, “From Naptime to Big Sleep”. Real screenshot, captured 24 October 2026. Image: Google Project Zero.">
              <Pic file="big-sleep-2024.jpg" alt="The Project Zero blog post titled From Naptime to Big Sleep: Using Large Language Models To Catch Vulnerabilities In Real-World Code, dated 2024-NOV-01." width={800} height={506} />
            </Figure>
            <p>
              PHP’s own story shows the human limits. The PHP Foundation says that in 2024 an external audit by Quarkslab, funded through the Sovereign Tech Agency and organised through OSTIF, led a PHP developer to find “the first signs” of the out-of-memory problem behind CVE-2026-109618.<Cite slug={S} src={U.found} /> No concrete way to exploit it was found, other issues with clearer impact overshadowed it, and the several possible fixes each had trade-offs, such as compatibility breaks, new denial-of-service potential or changes to many third-party extensions.<Cite slug={S} src={U.found} /> The Foundation calls the resulting delay “a structural failure”, caused by its security team’s decision process and lack of resources.<Cite slug={S} src={U.found} />
            </p>
            <Callout kind="deep">
              <p>The key point is not that PHP’s team missed a bug. It is that nobody could prove the bug was dangerous. A flaw that cannot be exploited is a low priority. What changed in 2026, according to Wiz, was the cost of proving it could be.<Cite slug={S} src={U.wiz} /></p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="found" level="Advanced" number={4}>How AI found PHP2Shell</SectionHeading>
            <p>
              OpenAI says Calif identified a critical flaw using GPT-5.6 Sol as part of its Patch the Planet initiative, and that Wiz independently discovered and reported both vulnerabilities.<Cite slug={S} src={U.oai} /> The PHP Foundation says Calif began an audit of PHP on 30 July 2026, and that on 11 August a Calif researcher reported an unconditional remote code execution with the same root cause as the 2024 finding, which OpenAI independently reported the same day.<Cite slug={S} src={U.found} /> Wiz says it discovered its first PHP vulnerability on 19 August using Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol, confirmed unauthenticated code execution against Drupal on 20 August and WordPress on 21 August, and reported to the PHP security team on 24 August.<Cite slug={S} src={U.wiz} />
            </p>
            <Figure number={8} caption="Who found PHP2Shell, and with what.">
              <WhoFound />
            </Figure>
            <p>
              Wiz is blunt about what AI changed. It says the vulnerable code had been present for more than a decade, but that turning the flaws into working exploits needed chaining several bugs and accounting for how PHP allocates and reuses memory across requests. Its claim: “With frontier AI models and the right tools, a single researcher completed in a week what previously would have taken a world-class team months of work.”<Cite slug={S} src={U.wiz} />
            </p>
            <Figure number={9} caption="The Wiz Research post, “PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet”, dated 21 October 2026. Real screenshot, captured 24 October 2026. Image: Wiz.">
              <Pic file="wiz-blog.jpg" alt="The Wiz blog post headline PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet, with author names and a table of contents." width={800} height={506} />
            </Figure>
            <p>
              The BBC quotes Wiz: “Frontier models were critical to making this process practical, enabling us to develop and adapt working exploits across multiple applications in hours.”<Cite slug={S} src={U.bbc} /> Wiz says it demonstrated unauthenticated remote code execution on the latest container images of WordPress, Drupal and Joomla.<Cite slug={S} src={U.wiz} />
            </p>
            <Figure number={10} caption="Before and with frontier AI, step by step, as the firms describe it.">
              <EffortGap />
            </Figure>
            <Callout kind="deep">
              <p>Two things are worth separating. Finding a bug and exploiting it are different skills. In the PHP case the human audit of 2024 already found the first signs of the bug, according to the Foundation, so AI did not invent the discovery.<Cite slug={S} src={U.found} /> What Wiz and OpenAI describe is AI closing the gap between “this looks wrong” and “this works against a real site”, which is the expensive part.<Cite slug={S} src={U.wiz} /></p>
            </Callout>
            <p>
              Google DeepMind’s Raluca Ada Popa is quoted on Wiz’s post as saying Gemini 4 Argon helped defenders bridge that gap, and Wiz credits Argon with finding the vulnerability, building exploits, creating attack detection and validating the patch.<Cite slug={S} src={U.wiz} />
            </p>
            <Figure number={11} caption="OpenAI’s post of 21 October 2026, “Patch the Planet: global response coordination as agents uncover critical vulnerabilities”. Real screenshot, captured 24 October 2026. Image: OpenAI.">
              <Pic file="openai-patch-the-planet.jpg" alt="The OpenAI blog post titled Patch the Planet: global response coordination as agents uncover critical vulnerabilities, dated October 21, 2026, with a Listen to article control." width={800} height={500} />
            </Figure>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="defend" level="Intermediate" number={5}>How AI helps defenders now</SectionHeading>
            <p>
              The PHP Foundation says AI helped on its side too. Earlier in 2026 it worked with Alpha-Omega to scan PHP with Anthropic’s Claude Mythos, and has since added other tools including OpenAI’s Daybreak Red for validating reports and exploits.<Cite slug={S} src={U.found} /> The growth of AI-assisted research also means far more reports: the team has published 15 CVEs since 1 July and worked through more than 100 reports that were invalid, duplicates or not reproducible.<Cite slug={S} src={U.found} /> AI helps validate reports and group those with a shared root cause, but, the Foundation says, “a person makes every call and works on every patch”.<Cite slug={S} src={U.found} />
            </p>
            <p>
              OpenAI says that over two months it led a coalition of maintainers, researchers and security providers on the PHP response, and its proposed framework includes adversarial testing with frontier models to look for ways around a patch and related variants.<Cite slug={S} src={U.oai} /> It says it worked with infrastructure providers on protections, and engaged parts of the US government, including the White House’s Super Intelligence Force, the Office of the National Cyber Director and CISA.<Cite slug={S} src={U.oai} /> Wiz thanks Automattic, Akamai, AWS, Cloudflare, Fastly, Google, Imperva, Microsoft, Vercel and others for preparing guidance and mitigations for customers who could not patch at once.<Cite slug={S} src={U.wiz} />
            </p>
            <Callout kind="eli5">
              <p>Imagine a smoke detector that is also a very fast, very patient fire investigator. In this case the “fire” was an old flaw, and the investigators got to it, and told the fire brigade, before anyone is known to have lit it. That is the defenders’ story. The next sections show why it was also a race.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="attack" level="Advanced" number={6}>The attackers’ clock</SectionHeading>
            <p>
              OpenAI says that, to its knowledge, frontier AI found these vulnerabilities before attackers did.<Cite slug={S} src={U.oai} /> Amazon’s evidence is more complicated. Its MadPot honeypots logged a PHP2Shell exploit attempt on 17 October 2026 from an address linked to a commercial anonymisation network, four days before disclosure, and Amazon says it remains unclear how the actor acquired exploit information.<Cite slug={S} src={U.aws} /> On 21 October the earliest proof-of-concept exploits it saw appeared around 02:00 UTC, some 12 hours before the 14:00 UTC release, and more attempts followed from different infrastructure, which Amazon says suggests multiple actors.<Cite slug={S} src={U.aws} />
            </p>
            <Figure number={12} caption="Amazon’s security blog on PHP2Shell exploitation before disclosure, dated 21 October 2026. Real screenshot, captured 24 October 2026. Image: Amazon Web Services.">
              <Pic file="aws-madpot.jpg" alt="The AWS Security Blog post titled Amazon Threat Intelligence identifies PHP2Shell exploitation prior to public disclosure in MadPot, with text describing an attempt dated 17 October 2026." width={800} height={506} />
            </Figure>
            <p>
              The Register, relaying Cloudflare’s chief executive Matthew Prince, reported thousands of exploitation attempts in the 10 hours before public announcement, tens of thousands within 45 minutes of disclosure, hundreds of thousands within two hours, and millions since.<Cite slug={S} src={U.reg1} /> Cloudflare also said attackers were tweaking payloads to get past its web application firewall, apparently using feedback from blocked requests.<Cite slug={S} src={U.reg1} /> The Register does not say whether any of this used AI, and neither do we claim it.
            </p>
            <Figure number={13} caption="Exploit attempts Cloudflare reported, by order of magnitude.">
              <AttackerClock />
            </Figure>
            <p>
              Security firm Hadrian said PHP2Shell was being “exploited in the wild at scale”.<Cite slug={S} src={U.reg1} /> iTWire, citing Palo Alto Networks’ Unit 42, reports more than 22 million exposed PHP instances worldwide and more than 200 proof-of-concept exploits across repositories within hours.<Cite slug={S} src={U.itw} />
            </p>
            <p>
              Wiz states why AI matters here: “With AI this is no longer a barrier. LLMs can help adapt an exploit to different PHP versions, configurations and memory layouts.”<Cite slug={S} src={U.wiz} /> OpenAI says the same capabilities that find vulnerabilities can help attackers rapidly develop offensive tools and exploits.<Cite slug={S} src={U.oai} /> Keeper Security’s Shane Barney, quoted by iTWire, sums it up: “The result is a shrinking window between vulnerability disclosure and potential exploitation.”<Cite slug={S} src={U.itw} />
            </p>
            <Callout kind="warn">
              <p>Attempts are not breaches. A honeypot is a decoy built to attract attacks, so a hit on it shows that someone tried, not that a real site fell. Amazon itself says it is unclear whether any of its observed attempts would have worked on real systems.<Cite slug={S} src={U.aws} /></p>
            </Callout>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="impact" level="Beginner" number={7}>Impact: governments, Wikipedia and more</SectionHeading>
            <p>
              Australia’s Signals Directorate and its cyber centre issued a critical alert on 21 October saying all PHP versions from PHP 5 onwards may be affected, according to iTWire, and that night cyber.gov.au and other federal sites went dark.<Cite slug={S} src={U.itw} /> A spokesperson for Home Affairs Minister Tony Burke told the ABC that the National Office of Cyber Security was aware of “disruptions to several Australian websites” and that “some websites are temporarily unavailable as work is undertaken to mitigate risks arising from this vulnerability.”<Cite slug={S} src={U.itw} /> iTWire notes that GovCMS, a Drupal platform behind a large part of Australia’s federal web presence, runs on PHP.<Cite slug={S} src={U.itw} />
            </p>
            <p>
              In Europe, the BBC reports Finland temporarily shut down the government’s public web services, and the Netherlands’ cyber-security agency took its own website offline, as did the country’s health institute RIVM, while the lower house of parliament became inaccessible.<Cite slug={S} src={U.bbc} /> iTWire lists government sites in France, Finland, Denmark and the Netherlands, along with the Port of Rotterdam, 4chan and Something Awful.<Cite slug={S} src={U.itw} />
            </p>
            <Figure number={14} caption="Who went offline, from two outlets’ reports.">
              <WhoWentOffline />
            </Figure>
            <p>
              Wikipedia runs on MediaWiki, which Wiz lists among the PHP platforms.<Cite slug={S} src={U.wiz} /> The Wikimedia Foundation said it was addressing the vulnerabilities and that “We have taken down a number of other systems as a precautionary measure until they can be safely patched.” The BBC reports that some people could not reach parts of Wikipedia on Wednesday.<Cite slug={S} src={U.bbc} /> The Foundation did not say which systems, and we could not confirm that Wikipedia as a whole went down.
            </p>
            <Figure number={15} caption="Wikipedia’s own article on the incident, which opens with a notice that it documents a current cybersecurity incident and may change rapidly. Real screenshot, captured 24 October 2026. We did not use it as a source for facts.">
              <Pic file="wikipedia-article.jpg" alt="The English Wikipedia article PHP2Shell with a notice about a current cybersecurity incident and an infobox listing CVE-2026-109618 with its CVSS 4.0 score of 9.2." width={800} height={506} />
            </Figure>
            <p>
              The US National Security Agency advised organisations on X to take their systems offline if they could not update, writing that “These vulnerabilities often provide a direct path to the server’s file system or database”, and the White House said federal agencies were working with leading AI labs to speed up a fix, the BBC reports.<Cite slug={S} src={U.bbc} /> Japan’s Prime Minister, Sanae Takaichi, urged people on X to check whether their public websites ran on PHP.<Cite slug={S} src={U.bbc} />
            </p>
            <p>
              How bad was the damage? Mostly this was precaution. The Register reported on 23 October that, despite mass exploitation attempts, no successful compromises attributed to PHP2Shell had been publicly confirmed, and quoted the PHP Foundation’s executive director, Elizabeth Barron: “We have no evidence of successful exploitation of the two vulnerabilities from Wednesday prior to disclosure, and we currently have no evidence of any exploitation of these vulnerabilities on patched PHP versions.”<Cite slug={S} src={U.reg2} />
            </p>
            <Figure number={16} caption="Offline is not the same as hacked.">
              <OfflineNotHacked />
            </Figure>
            <p>
              Experts quoted by iTWire drew a wider lesson. Murdoch University’s David Parry said site owners might not even know they use PHP, and that unlike a commercial product there is no customer list for a seller to contact.<Cite slug={S} src={U.itw} /> Swinburne’s Dimitrios Salampasis asked whether governments and businesses have sufficient visibility of their technology.<Cite slug={S} src={U.itw} />
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="process" level="Intermediate" number={8}>A disclosure under pressure</SectionHeading>
            <p>
              The coordinated release was meant for 22 October at 14:00 UTC. The PHP Foundation says the two CVE IDs began circulating on Tuesday 20 October at about 15:00 UTC, with a wrong release time and a wrong score of 10.0, so PHP published a pre-announcement at 19:30 UTC and moved the release forward a day.<Cite slug={S} src={U.found} /> It adds that Calif then mistakenly published a video of its proof of concept, and that Chainguard published built images containing the fix at 07:41 UTC on 21 October, more than six hours before the release.<Cite slug={S} src={U.found} />
            </p>
            <Figure number={17} caption="The leak chain, as the PHP Foundation tells it.">
              <LeakChain />
            </Figure>
            <p>
              The Foundation said Chainguard “unilaterally broke the embargo”, according to iTWire. Chainguard’s chief executive, Dan Lorenc, apologised for the extra stress on maintainers but defended the decision: “I made the call to get these out early when exploits hit in the wild.”<Cite slug={S} src={U.itw} /> Amazon’s 17 October sighting shows at least one actor was already trying before that.<Cite slug={S} src={U.aws} />
            </p>
            <p>
              The story did not end on 21 October. The PHP Foundation told The Register it has reserved CVE-2026-115560 for a third remote-code-execution flaw, which it says “requires a very unlikely combination of configuration and specific PHP application code”, and will handle in its next regular release with a configuration setting as the interim mitigation.<Cite slug={S} src={U.reg2} />
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="future" level="Advanced" number={9}>What AI changes next</SectionHeading>
            <p>
              The people who found PHP2Shell expect more of it. OpenAI says these bugs are among several significant vulnerabilities it has already found and is working to fix, and expects similar findings to “increase sharply in the coming months”.<Cite slug={S} src={U.oai} /> iTWire quotes OpenAI president Greg Brockman: “We expect to find many more such issues over upcoming months.”<Cite slug={S} src={U.itw} />
            </p>
            <Figure number={18} caption="Where AI helped, where it changed, and where it is heading, in three eras.">
              <AiEras />
            </Figure>
            <p>
              OpenAI proposes a five-stage framework for such cases: validate and fix upstream, give affected organisations time to act, coordinate with government partners, prepare updates across products, then publish guidance and support deployment.<Cite slug={S} src={U.oai} /> It also asks the security community hard questions, including when, if ever, governments or other operators should use a vulnerability to patch systems they own or are authorised to manage after losing administrative access.<Cite slug={S} src={U.oai} />
            </p>
            <p>
              Wiz argues for making this routine. It describes the opportunity as systematically finding flaws in existing software and catching new ones before they reach production.<Cite slug={S} src={U.wiz} /> The PHP Foundation, for its part, says tools find bugs faster than ever for defenders and attackers alike and that the number of reports will keep growing, but that tools cannot decide the right fix for a long-standing design decision, weigh compatibility trade-offs or review the patch.<Cite slug={S} src={U.found} />
            </p>
            <Figure number={19} caption="Two futures, from the same capability.">
              <FutureAi />
            </Figure>
            <p>
              Reaction is split. Tufts University’s Shaanan Cohney, quoted by iTWire, says the “window between announcement and exploit discovery has collapsed”, so the vulnerability disclosure process needs rethinking.<Cite slug={S} src={U.itw} /> Swinburne’s Belinda Barnet is more critical of the makers of AI: “It’s like a massive weapons manufacturer offering us safer helmets.”<Cite slug={S} src={U.itw} /> La Trobe’s Shalinka Jayatilleke offers a practical line: AI investment “must be matched by investment in maintenance, human expertise and incident preparedness.”<Cite slug={S} src={U.itw} />
            </p>
            <Figure number={20} caption="How named people read it.">
              <Views />
            </Figure>
            <Callout kind="deep">
              <p>A fair reading of all this is that AI has moved the bottleneck. Finding and exploiting memory bugs is getting cheaper for everyone who has access to the tools. The slow, human parts are deciding on a fix, testing it, shipping it, and getting millions of unmanaged servers to install it. iTWire reports, citing SC Media, that around 80% of PHP sites run unsupported versions that will not get official patches.<Cite slug={S} src={U.itw} /></p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="act" level="Beginner" number={10}>What to do</SectionHeading>
            <p>
              If you run PHP anywhere, the PHP project’s advice is simple: update, because only an update is a complete solution.<Cite slug={S} src={U.php} /> iTWire relays more from the industry. Qualys’s Saeed Abbasi advises inventorying hidden PHP in containers, cloud images, hosting panels and vendor appliances, then restarting web workers and containers so the fix takes effect, and Securonix’s Chris Jacob advises hunting for suspicious POST or multipart requests, memory exhaustion and repeated worker crashes, and rotating all database credentials and API secrets if code execution is suspected.<Cite slug={S} src={U.itw} />
            </p>
            <Figure number={21} caption="A response checklist.">
              <Playbook />
            </Figure>
            <p>
              If you are only a visitor, iTWire reports Malwarebytes saying you do not need to install anything on your own devices, though you should expect some sites to be down for a while and be wary of unexpected redirects and fake update prompts.<Cite slug={S} src={U.itw} />
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="unknown" level="Intermediate" number={11}>What nobody knows yet</SectionHeading>
            <p>
              Several big questions are open. There is no confirmed count of compromised sites, no explanation of how the actor in Amazon’s data knew about the flaws four days early, and no agreed answer on how far back the vulnerable versions go, since Wiz says PHP 5.4 and CERT-EU, quoted by the BBC, says PHP 5.<Cite slug={S} src={U.wiz} /><Cite slug={S} src={U.bbc} /> The BBC also says it could not verify the 70% figure.<Cite slug={S} src={U.bbc} />
            </p>
            <Figure number={22} caption="What we could not find.">
              <Unknowns />
            </Figure>

            <h3>The message</h3>
            <p>
              PHP2Shell is a case in which, by the finders’ own account, AI helped both to find flaws in the code behind much of the web and to make them practical to exploit, and the world’s response was to switch sites off. The outages look mostly precautionary so far, and the defenders appear to have got there first, but the sources agree on one uncomfortable point: the gap between a bug being known and being used is shrinking. The slowest part of the system is still people deciding, fixing and patching.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>AI-assisted researchers found these flaws before anyone is known to have been harmed; the next ones will be found faster, so the real test is how quickly everyone patches.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What are the two flaws called, and what do they allow?", a: "CVE-2026-109618 and CVE-2026-109619, together called PHP2Shell. The PHP project says both can allow unauthenticated remote code execution." },
                { q: "Which PHP versions fix them?", a: "PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35. PHP 8.1 and older no longer receive updates, though minimal source backports were published for 7.4, 8.0 and 8.1." },
                { q: "Who found them, and which AI models were used?", a: "Calif, with GPT-5.6 Sol, in OpenAI’s Patch the Planet, and Wiz independently, with Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol." },
                { q: "Were the sites that went offline hacked?", a: "The sources describe most shutdowns as precautions. The Register reported on 23 October that no successful compromises had been publicly confirmed." },
                { q: "What did Google’s Project Zero report in November 2024?", a: "That its Big Sleep agent found an exploitable bug in SQLite, which it believed was the first public example of an AI agent finding such a flaw in widely used software." },
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
              PHP is made by the PHP project and supported by the PHP Foundation. GPT-5.6 Sol is made by OpenAI, Gemini 4 Argon by Google, and Wiz Atlas by Wiz; Calif, Cloudflare, Amazon, Chainguard, Wikimedia and the other organisations named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. We read the pages and reports listed on 24 October 2026; nothing was entered or submitted. Quotes are word for word from the linked sources. Facts were checked on 24 October 2026 and may change as the incident develops. Screenshots are of public pages and belong to their owners. We did not test any exploit and publish no exploit detail.
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
          <Link href={`/${next.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:text-right">
            <p className="flex sm:justify-end items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              Next article <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{next.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
