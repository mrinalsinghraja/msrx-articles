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
  Advisories,
  AutoLoop,
  BeforeAfter,
  Cadence,
  ChecksGrid,
  CspTest,
  FixTable,
  MergedNotLive,
  Pic,
  Pipeline,
  Prompts,
  SafeUse,
  Scoreboard,
  WentRight,
} from "@/components/figures/ai-scan-guide";

const article = getArticle("ai-security-scan-70-repositories") as Article;
const previous = getArticle("black-october-php2shell") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  itw: "https://itwire.com/business-it-news/security/php2shell-the-14-year-old-bugs-that-pulled-cyber-gov-au-and-government-sites-worldwide-offline",
  pz: "https://projectzero.google/2024/10/from-naptime-to-big-sleep.html",
  owasp: "https://owasp.org/Top10/2025/",
  g1: "https://github.com/advisories/GHSA-673q-mjm6-r5xr",
  g2: "https://github.com/advisories/GHSA-2464-fhr4-w9xw",
  g3: "https://github.com/advisories/GHSA-vcvr-r3jv-pc5j",
  mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP",
  dep: "https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference",
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
  { name: "AI security scan", path },
];

const TOC = [
  { id: "why", label: "Why I did it" },
  { id: "what", label: "What I scanned" },
  { id: "how", label: "How AI scanned it" },
  { id: "found", label: "What it found" },
  { id: "fix", label: "How AI helped fix it" },
  { id: "live", label: "Merged is not live" },
  { id: "harden", label: "Beyond the fixes" },
  { id: "auto", label: "Keeping it fixed" },
  { id: "you", label: "Your turn" },
  { id: "safe", label: "Using AI safely" },
  { id: "references", label: "References" },
];

export default function AiSecurityScan() {
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
            { "@type": "Thing", name: "AI-assisted security review" },
            { "@type": "SoftwareApplication", name: "Next.js" },
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
            {article.series} · Article 20
          </p>
          <h1 className="display text-[clamp(32px,5.6vw,56px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            I let AI scan all <span className="msrx-gradient-text">70 of my repositories</span>. Here is what it found and fixed
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
              This is a positive story with a practical purpose: to show how one person with a lot of apps used AI tools to find security problems, fix them and keep them fixed, and to encourage you to do the same.
              The numbers come from my own security report dated 25 October 2026, which is not public; they are my figures and not an independent audit. I describe findings generally, and only ones that are fixed and checked, so
              nothing here is a map for an attacker. Green sections need no background. Amber ones are about process and habits. Red ones go into the technical detail.
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
            <SectionHeading id="why" level="Beginner" number={1}>Why I did it</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              I look after a lot of small apps and sites, and I cannot read every line of every one of them every week. AI can, so I use AI tools to scan my work for security problems regularly, fix what turns up, and check that the fix is live.
            </p>
            <p>
              The last full sweep ran on 24 and 25 October 2026, days after the PHP2Shell incident covered in our <Link href="/black-october-php2shell">previous article</Link>. That story had a lesson I took personally. AISA board director Scarlett McDermott, quoted by iTWire, put it this way: “If you don’t know what software you’re running, you can’t know whether you’re vulnerable.”<Cite slug={S} src={U.itw} /> Knowing what I run, and checking it, is exactly what an AI-assisted sweep gives me.
            </p>
            <Callout kind="eli5">
              <p>Think of a regular health check-up. You feel fine, but a blood test can spot something early, when it is cheap and easy to treat. A security scan is the blood test for your software.</p>
            </Callout>
            <p>
              AI is also good at this kind of work in principle. Google’s Project Zero reported in November 2024 that its Big Sleep agent found an exploitable bug in the SQLite database before it reached an official release, and said finding bugs before release means “there’s no scope for attackers to compete”.<Cite slug={S} src={U.pz} /> Defenders using the same kind of tools is the hopeful half of the AI-and-security story.
            </p>
            <Figure number={1} caption="The result in four numbers.">
              <Scoreboard />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what" level="Beginner" number={2}>What I scanned</SectionHeading>
            <p>
              The scope was my whole GitHub account: 70 repositories. That means 25 Next.js web apps, one Python backend, two Cloudflare Workers, 19 Apple apps, 6 Flutter and Android apps and 17 static sites, plus the public portal and 28 live app sites, which got read-only checks. Nothing outside my own code was attacked.
            </p>
            <Figure number={2} caption="The 70 repositories by kind. Graphic from my security report, 25 October 2026.">
              <Pic file="estate.png" alt="Bar chart of 70 repositories scanned: 25 Next.js web apps, 19 Apple apps, 17 static sites and docs, 6 Flutter and Android, 2 Cloudflare Workers and 1 Python backend." width={1600} height={858} />
            </Figure>
            <p>
              The depth varied by kind. The web apps got the full treatment: dependency audit, secret scan, static analysis, every API route read, a local production build and tests. The native apps got secret scans and a search for risky patterns. The static sites got a hunt for unsafe HTML and a look at any serverless folders.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how" level="Intermediate" number={3}>How AI scanned it</SectionHeading>
            <p>
              I combined three kinds of evidence, because each one catches things the others miss: reading the code, running the code, and attacking the running code. The categories line up with how security people think. OWASP’s 2025 Top 10 lists Broken Access Control first and Software Supply Chain Failures third, and those two themes turned out to matter most in my sweep.<Cite slug={S} src={U.owasp} />
            </p>
            <Figure number={3} caption="The checks the sweep combined.">
              <ChecksGrid />
            </Figure>
            <p>
              The unit and integration runs are worth a mention. Running each repository’s own 5,984 unit tests found one failure, a timezone assumption. The browser crawl of 484 pages and the load test of 727,639 requests at 500 concurrent users turned up no crashes. For me the best moment was seeing 112 of 113 conclusive attack tests pass, and understanding why the one that did not mattered only off my hosting platform.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="found" level="Beginner" number={4}>What it found</SectionHeading>
            <p>
              The sweep recorded 14 findings: one critical, four high, three medium, three low and three informational. By the end of the clean-up, 11 were closed and verified, one was partly closed and two low-priority items remained.
            </p>
            <Figure number={4} caption="The 14 findings by severity (left) and where they stand (right). Graphic from my security report.">
              <Pic file="findings.png" alt="Bar chart of 14 findings by severity: 1 critical, 4 high, 3 medium, 3 low, 3 info, and a donut showing 11 of 14 closed, 1 partly closed and 2 open." width={1600} height={663} />
            </Figure>
            <p>
              The single critical item was the sort of problem that is hard to spot by hand at scale. All 25 of my Next.js apps were on versions affected by at least one of three published advisories for remote code execution. The advisories are rated critical, 9.5 out of 10, and each lists a patched version.<Cite slug={S} src={U.g1} /><Cite slug={S} src={U.g2} /><Cite slug={S} src={U.g3} />
            </p>
            <Figure number={5} caption="The GitHub advisory for the first of the three, as it looked on 25 October 2026. Real screenshot, captured 25 October 2026. Image: GitHub Advisory Database.">
              <Pic file="advisory-nextjs.jpg" alt="GitHub advisory GHSA-673q-mjm6-r5xr, Next.js: Unauthenticated Remote Code Execution in use cache functions returning typed arrays, rated Critical 9.5, affected versions 16.0.0 to 16.4.0, patched 16.4.1." width={800} height={506} />
            </Figure>
            <Figure number={6} caption="The three advisories, in a table.">
              <Advisories />
            </Figure>
            <p>
              A fair note on the detail: each advisory applies only under certain conditions, such as an App Router app with a particular caching function, SVG image optimisation on Linux, or attacker-controlled input reaching an image generator.<Cite slug={S} src={U.g1} /><Cite slug={S} src={U.g2} /><Cite slug={S} src={U.g3} /> I did not work out which of my 25 apps met those conditions. I did not need to: the first advisory itself says to upgrade immediately even if your application does not have similar functions.<Cite slug={S} src={U.g1} /> Upgrading all 25 to 16.4.2, which is above every patched version, was faster than arguing about exposure.
            </p>
            <Figure number={7} caption="The eight biggest findings, and what changed.">
              <FixTable />
            </Figure>
            <Callout kind="deep">
              <p>The pattern across the high and medium items is simple: trust. Code trusted a visitor’s input, a signed-in user’s role, a browser’s origin, or a cookie that never expired. Each fix replaced trust with a check. The same few checks, applied across the board, closed most of the list.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="fix" level="Intermediate" number={5}>How AI helped fix it</SectionHeading>
            <p>
              Finding is half the job. The AI also made the changes, one app at a time: each app got its own branch and pull request, so one failure never blocked the others, and merges waited for checks to pass. Every change followed the same seven steps.
            </p>
            <Figure number={8} caption="Every fix followed the same path from finding to live.">
              <Pipeline />
            </Figure>
            <p>
              Some steps needed a human, and that is how it should be. Three of the high-severity fixes needed something only I could do, such as applying a database change or setting a secret in a dashboard. I did each, and each was then checked on the live system. A scheduled-job endpoint that now answers 401 without its secret, a database migration that reports “up to date”, a policy that produced zero violations across 257 live pages: those are proofs, not promises.
            </p>
            <Figure number={9} caption="Where the layers of protection now sit. Graphic from my security report.">
              <Pic file="layers.png" alt="Layered diagram of defences between a request and the data: browser rules, request checks, abuse limits, data rules and supply chain." width={1600} height={575} />
            </Figure>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="live" level="Intermediate" number={6}>Merged is not the same as live</SectionHeading>
            <p>
              The most useful discovery of the whole exercise was not a bug. Three of my apps are not connected to my host through git; I deploy them from the command line. Their last deploys were weeks old, so security fixes sitting on my main branch were never reaching visitors. A second, related slip: one community site had two diverging copies of its repository, and a fix had gone to the copy that was not live.
            </p>
            <Figure number={10} caption="Why a merged fix is not always a live fix.">
              <MergedNotLive />
            </Figure>
            <p>
              The AI found this because it did what I rarely do: it synced every local copy to GitHub first, then checked what the host was actually serving. If you take one habit from this article, make it that: after a fix, ask the live site, not the code.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="harden" level="Advanced" number={7}>Beyond the fixes: raising the floor</SectionHeading>
            <p>
              With the findings closed, I used the optional items to strengthen things further, starting with my tools site. A Content-Security-Policy tells the browser which sources a page may load, and MDN notes it is mainly a defence against cross-site scripting.<Cite slug={S} src={U.mdn} /> A policy only helps if it does not break the site, so we tested it instead of guessing: all 257 pages in the sitemap were opened in Chromium on the local build and again live, with zero violations, and the file tools still produced downloads.
            </p>
            <Figure number={11} caption="The Content-Security-Policy test on the tools site.">
              <CspTest />
            </Figure>
            <p>
              The review had flagged the tools site as slow. Lighthouse in its simulated mode gave a mobile load time of about 9.0 seconds, but under real throttling the page painted its heading in 2.3 seconds on the live site, with a score of 93. One real waste did turn up: the favicon was a 796 KB copy of a social image. It is now 19 KB, and the home page weighs about half as much.
            </p>
            <Figure number={12} caption="Simulated versus real mobile load time, and page weight before and after the favicon fix. Graphic from my security report.">
              <Pic file="speed.png" alt="Bar charts: mobile load time of 9.0 seconds in Lighthouse simulated mode versus 2.3 seconds real throttled live and 1.8 seconds on a local build, and page weight falling from 1,614 KB to 855 KB." width={1600} height={756} />
            </Figure>
            <Figure number={13} caption="Before and after, in one table.">
              <BeforeAfter />
            </Figure>
            <p>
              One change I left alone on purpose. The review suggested caching the public pages of a community library app, but those pages read the signed-in user and hold children’s data, and a cached copy of a privacy setting could delay a privacy switch. A targeted cache with instant invalidation is possible, but it deserves its own tested change. A scan finds options; judgement picks them.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="auto" level="Intermediate" number={8}>Keeping it fixed</SectionHeading>
            <p>
              A one-off sweep goes stale, so I added automation. A CI workflow now runs the tests and a production build on pull requests, and Dependabot opens one grouped weekly pull request for patch updates in 25 repositories. I added a three-day cooldown so a freshly published, possibly hijacked release is not proposed straight away; GitHub’s documentation says the cooldown applies to version updates, not to security updates, which are not delayed.<Cite slug={S} src={U.dep} />
            </p>
            <Figure number={14} caption="How a future advisory should flow.">
              <AutoLoop />
            </Figure>
            <p>
              Auto-merge is on only where CI exists, for grouped patch updates; minor and major bumps stay manual. The merge job never checks out or runs a pull request’s code; it only reads the finished CI result and calls the merge API. The next Next.js advisory should arrive as a pull request within days, and on two of my apps it can merge itself.
            </p>
            <Figure number={15} caption="What went right.">
              <WentRight />
            </Figure>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="you" level="Beginner" number={9}>Your turn: scan your own apps with AI</SectionHeading>
            <p>
              Here is my honest pitch. If you run any website, app or API, a small or large one, you almost certainly have an old dependency, a missing limit or a loose database rule that you have never looked at. AI makes looking cheap. You do not need a security team. You need a habit.
            </p>
            <p>
              <strong>Please scan your own apps with AI tools, and do it regularly.</strong> Not once, not after a scare: on a rhythm, the way you would renew insurance or service a vehicle. The incident in our previous article showed what happens when old flaws meet new tools: the window between a flaw becoming known and being used is shrinking, so the best defence is to find and fix yours first.
            </p>
            <Figure number={16} caption="A rhythm you can copy.">
              <Cadence />
            </Figure>
            <p>
              Starting is easier than it sounds. You can begin with plain-language requests to an AI coding assistant working in your repository.
            </p>
            <Figure number={17} caption="Five prompts to start with.">
              <Prompts />
            </Figure>
            <Callout kind="eli5">
              <p>Start small. Pick your most important app, run the first three prompts, fix what you find, then turn on Dependabot. You will have done more for your security in an afternoon than most sites do in a year.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="safe" level="Intermediate" number={10}>Using AI safely, and what it cannot do</SectionHeading>
            <p>
              AI is a strong helper, not a guarantee. It can be wrong, it can miss things, and a clean scan is not a promise of safety. My rules are simple. I scan only what I own. I keep a human on the approve, merge and deploy buttons. I never paste secrets into a chat; I ask the tool to search without printing values, and I rotate any key that may have leaked. And I verify each fix on the live site.
            </p>
            <Figure number={18} caption="Do and don’t.">
              <SafeUse />
            </Figure>
            <p>
              The report was candid about what is left, and so am I. Two low-priority items are still open on my list, and a couple of settings need me to act in a console. Honest scoreboards beat perfect-looking ones. The point is not zero findings; it is a short list, a fast fix and a habit that does not depend on memory.
            </p>

            <h3>The message</h3>
            <p>
              One sweep, 70 repositories, 14 findings, 11 closed and verified, no critical advisories left, and a system that now proposes its own patches. None of it needed a security team, only AI tools, a few evenings and the willingness to check the live site. If it works for a one-person portfolio of small apps, it can work for yours.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>Use AI to scan your own apps on a regular rhythm, fix what it finds, keep a human on the approve button, and always verify the fix on the live site.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What was the single critical finding?", a: "One class of Next.js remote-code-execution advisories that affected all 25 Next.js apps. All were upgraded to 16.4.2, above every patched version." },
                { q: "Why does ‘merged’ not always mean ‘live’?", a: "Some apps are deployed from the command line rather than through git, so a fix on the main branch only reaches visitors after someone deploys it. Check what the host is actually serving." },
                { q: "What does the Dependabot cooldown do, and what does it not do?", a: "It delays version updates for a few days after a release is published. GitHub’s documentation says it does not apply to security updates." },
                { q: "Name two rules for using AI scanning safely.", a: "Scan only what you own or are authorised to test, and keep a human on the approve, merge and deploy steps. Also never paste secrets into a chat, and verify every fix on the live site." },
                { q: "How often should you scan?", a: "On a rhythm: grouped dependency updates weekly, an AI review of routes and rules monthly, a same-day check after any big advisory, and a full sweep each quarter. Adjust to your risk." },
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
              Next.js and Vercel, GitHub and Dependabot, Cloudflare, Google, OWASP and the other products and organisations named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. The scan figures come from my own security report of 25 October 2026, which was produced with AI tools and is not a public or independently audited document; it does not record which AI models were used. I describe only findings that are fixed and checked, and I leave out anything that could help an attacker. Advisory and documentation facts were checked on 25 October 2026 and may change. The advisory screenshot belongs to GitHub. Do not scan or test systems you do not own or have permission to test.
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
