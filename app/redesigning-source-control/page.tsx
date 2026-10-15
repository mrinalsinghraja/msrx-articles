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
  ChangesetCompare,
  CheckoutTiers,
  ClaimCheck,
  DerivedData,
  DoYouNeedThis,
  EngineerNo,
  FetchCompare,
  GitCanLearn,
  GitVsAgents,
  MergeGrowth,
  MergeQueue,
  Principles,
  Results,
  ScaleCards,
  Workarounds,
} from "@/components/figures/scion-guide";

const article = getArticle("redesigning-source-control") as Article;
const previous = getArticle("ai-electricity-and-india") as Article;
const next = getArticle("typesafe-jev-real-usage-cost") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  post: "https://www.anthropic.com/engineering/redesigning-source-control",
  x: "https://x.com/AnthropicAI/status/2110047081414987957",
  partial: "https://git-scm.com/docs/partial-clone",
  sparse: "https://git-scm.com/docs/git-sparse-checkout",
  google: "https://research.google/pubs/why-google-stores-billions-of-lines-of-code-in-a-single-repository/",
  sapling: "https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/",
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
  { name: "Redesigning source control", path },
];

const TOC = [
  { id: "news", label: "What Anthropic said" },
  { id: "git", label: "What source control does" },
  { id: "limits", label: "Where git strained" },
  { id: "principles", label: "Five principles" },
  { id: "inside", label: "How Scion works" },
  { id: "checkout", label: "Checkout as a cache" },
  { id: "results", label: "What it reports" },
  { id: "claude", label: "Built with Claude" },
  { id: "queue", label: "Is the merge queue dead?" },
  { id: "git-future", label: "What it means for git" },
  { id: "you", label: "What it means for you" },
  { id: "references", label: "References" },
];

export default function RedesigningSourceControl() {
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
            { "@type": "Organization", name: "Anthropic" },
            { "@type": "SoftwareApplication", name: "Git" },
            { "@type": "Thing", name: "Version control" },
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
            {article.series} · Article 15
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            When AI writes the code, <span className="msrx-gradient-text">source control</span> becomes the bottleneck
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
              This is about one engineering post from Anthropic, published on 13 October 2026. Green sections need no background. Amber ones explain how version
              control works. Red ones get into the design of Anthropic’s new system. Every number is Anthropic’s own, attributed, and not independently checked.
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
            <SectionHeading id="news" level="Beginner" number={1}>What Anthropic said</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              In May 2026, Anthropic merged about 2,500 code changes a day. By September it was merging more than 30,000.<Cite slug={S} src={U.post} />
            </p>
            <p>
              That is at least twelve times as many, and Anthropic says it does not expect the growth to slow. Its explanation is short: “coding is no longer the bottleneck to building systems or doing research.” What is slow now is “all of the developer infrastructure built for human scale: source control, builds, and CI.”<Cite slug={S} src={U.post} /> Its post on social media put the same point in one line: it had “become bottlenecked by developer infrastructure built for human (rather than agent) scale.”<Cite slug={S} src={U.x} />
            </p>
            <Figure number={1} caption="Code changes merged per day to Anthropic’s monorepo. The post also charts January to September; only these two values are stated in its text.">
              <MergeGrowth />
            </Figure>
            <p>
              So Anthropic built its own version-control system, called Scion, and moved its main codebase off git in five months. This article walks through what it built, why, and what the post does and does not claim. Anthropic is the company that makes Claude, and this article was itself drafted with help from AI assistants, so read it as a summary of Anthropic’s account, not an independent test.
            </p>
            <Callout kind="eli5">
              <p>Imagine a shared document that a few hundred people edit by hand. A simple “save and sync” works fine. Now imagine thousands of very fast editors saving every few seconds. The saving machinery, not the typing, becomes the thing everyone waits for. That is the story here.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="git" level="Beginner" number={2}>What source control does</SectionHeading>
            <p>
              Source control keeps every version of a project’s files, who changed what, and when. It lets many people work on the same code without overwriting each other, and lets you go back if something breaks.
            </p>
            <p>
              Git, the standard tool, is <em>decentralised</em>. In the post’s words, “every clone is a complete, self-contained repository that can compute diffs, read history and blame, and check out any revision while fully offline.”<Cite slug={S} src={U.post} /> That is a strength for most projects: you can work on a plane, and no single server is a point of failure.
            </p>
            <p>
              A monorepo is one repository holding most or all of a company’s code. Google and Meta famously work this way, and both built their own systems for it. The post names two as prior art: Google’s Piper and Meta’s Sapling.<Cite slug={S} src={U.post} /> Google’s engineers have described a “custom-built monolithic source repository” serving tens of thousands of developers,<Cite slug={S} src={U.google} /> and Meta describes Sapling as a system it spent ten years building, used for a repository with tens of millions of files.<Cite slug={S} src={U.sapling} /> So big companies leaving stock git for giant code bases is not new. What is new is the reason: agents.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="limits" level="Intermediate" number={3}>Where git strained</SectionHeading>
            <p>
              Anthropic gives its numbers plainly. The history of the main branch alone is almost 100 GB, and a compressed working copy is over 25 GB. It does about 25 million code checkouts a day for continuous integration (CI) alone, before counting developer environments, agent sandboxes and research jobs. Fetched naively, the post says, that would be over 600 petabytes of git traffic a day.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={2} caption="The size of the problem, as Anthropic reports it. The 625 PB check is our own multiplication of the post’s two figures.">
              <ScaleCards />
            </Figure>
            <p>
              Git has answers for big repositories, and Anthropic used them. A <em>partial clone</em> limits how many blobs and trees are downloaded.<Cite slug={S} src={U.partial} /> A <em>sparse checkout</em> narrows the working tree to a subset of files, chosen by directory or pattern.<Cite slug={S} src={U.sparse} /> Internal mirrors and snapshots go further. At its peak Anthropic ran several hundred mirrors. This “bought us time”, but the setup became harder to run as the merge rate rose.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={3} caption="What Anthropic says it tried before building something new.">
              <Workarounds />
            </Figure>
            <p>
              The post’s diagnosis is the interesting part. Anthropic was using git as a centralised system with one authoritative copy, but almost all of its clients were agents and jobs that are online by definition. Git’s offline-first design was working against it.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={4} caption="The mismatch, paraphrased from the post.">
              <GitVsAgents />
            </Figure>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="principles" level="Intermediate" number={4}>Five principles</SectionHeading>
            <p>
              The post asks a simple question: if source control were designed from the start for clients that are always online, what would it look like? It answers with five principles.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={5} caption="The five design principles of Scion, in short form.">
              <Principles />
            </Figure>
            <p>
              Two have large consequences. First, <strong>the server does the thinking</strong>. History, blame, merges and rebases are server calls. A CI job that wants the diff against a merge base can ask for it without having a copy of the repository. The post says tools such as its automated bisect and revert pipelines would not be practical at scale without that cheap, programmatic access.<Cite slug={S} src={U.post} />
            </p>
            <p>
              Second, <strong>refs are discouraged</strong>. A ref is a pointer to a commit, such as a branch or tag. The post argues that global state every server must agree on is a looming scaling problem, so outside the main ref and release branches, the workflow avoids them.<Cite slug={S} src={U.post} />
            </p>
            <Callout kind="eli5">
              <p>Git hands every person a full copy of the library so they can read anywhere. Scion keeps one library and a good librarian. You ask for the page you need; you do not carry the whole building home.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="inside" level="Advanced" number={5}>How Scion works</SectionHeading>
            <p>
              In git, a commit points to a tree, a snapshot of the whole directory structure. In Scion, the unit of work is a <em>changeset</em>, an entry in a write-ahead log. It lists the files that changed relative to its first parent, with content-addressed pointers to compressed file contents in blob storage. Changesets are created on the server and are available everywhere immediately.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={6} caption="Commit against changeset, per the post’s “Data structures” section.">
              <ChangesetCompare />
            </Figure>
            <p>
              This structure takes writes at high throughput, the post says, because there are no packfiles to accept, no locking or cross-server coordination, and no refs to move. Scion does support refs, but moving one is a compare-and-swap on a single row in Google’s Spanner database, separate from creating changesets.<Cite slug={S} src={U.post} />
            </p>
            <p>
              A changeset on its own cannot answer “who last edited this line?” quickly. So Scion builds <em>derived data</em>: dedicated structures for file blame and path history, and skip lists for the commit graph. Each is defined recursively, computed from the same value for the changeset’s parents. That lets Anthropic add new kinds when an operation needs one, choose eager or lazy computation per kind, and change the internals without touching the client.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={7} caption="Changesets and derived data. A schematic of the post’s description, not Anthropic’s diagram.">
              <DerivedData />
            </Figure>
            <Callout kind="deep">
              <p>Because everything is content-addressed, a stored object never changes. That is why any server can cache any object without asking the others, and why the servers are “essentially large caches” that also compute derived data on demand and write results back.<Cite slug={S} src={U.post} /> The hard parts of scaling a mutable system, such as invalidation and coordination, mostly disappear.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="checkout" level="Advanced" number={6}>Checkout as a cache</SectionHeading>
            <p>
              The part that serves those 25 million daily checkouts is a tiered cache. Each node runs a daemon that stores objects for all the jobs on it. The daemon talks only to cache servers in its region, which stream objects straight from memory in the format the daemon will store. When a cache misses, it asks the authoritative servers, which read from Spanner or cloud storage.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={8} caption="The checkout tiers, per the post’s “Scaling Scion” section.">
              <CheckoutTiers />
            </Figure>
            <p>
              The protocol is the other half. Git’s negotiation tells the server what the client already has, so the server works out the difference and sends a pack. Scion’s negotiation “doesn’t tell the server what the client already has”. The client starts from a root tree, requests the trees it is missing, then the blobs. Each request is for one immutable object, so any cache can answer, and there is no single multi-gigabyte response to restart if it fails.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={9} caption="Two ways to fetch, simplified from the post.">
              <FetchCompare />
            </Figure>
            <p>
              Sparse and virtualised checkouts, which only materialise files when read, fall out of this design. The client simply does not ask for trees it does not want.<Cite slug={S} src={U.post} />
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="results" level="Intermediate" number={7}>What it reports</SectionHeading>
            <p>
              Anthropic reports that each tier keeps a cache hit rate above 99%, that its Scion infrastructure is “200x smaller” than the git mirror fleet it replaced in CPU and memory, and that CI and research jobs now check out code about two orders of magnitude faster, in seconds rather than minutes. CI alone gained 25% CPU capacity.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={10} caption="The headline results, all reported by Anthropic and not independently checked.">
              <Results />
            </Figure>
            <p>
              Two cautions. These are Anthropic’s measurements of its own system against its own earlier setup, so they say little about git in general. And the post gives no raw data, so we can report the claims but not reproduce them.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="claude" level="Intermediate" number={8}>Built with Claude</SectionHeading>
            <p>
              The post is as much about how the system was built. A team of seven people built Scion and Antique, its code-review tool, plus about half a dozen related systems, and fully migrated in five months, while daily merges rose tenfold.<Cite slug={S} src={U.post} /> The post says Claude’s coding ability was “both what put us in this situation in the first place and how we were able to quickly build” a way out.
            </p>
            <p>
              One example: a hand-written first version of the git-to-Scion ingestion pipeline was rewritten by an early internal snapshot of Claude Mythos Preview, and the result used 20 times less memory and ran four times faster while preserving the implicit invariants about ordering and data structures.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={11} caption="Who did what, as the post describes the division of labour.">
              <EngineerNo />
            </Figure>
            <p>
              The post is candid about the limits. Its engineers “would now rate Claude as better at writing code than them”, yet “very often, we found that the role of the engineers was to tell Claude ‘no’”. Agents sometimes broke core system constraints to satisfy a pattern that should never have been allowed. Adversarial review was effective but could be myopic and lead to over-engineering. The team reviews every change request for the system, now examining the intent of a change rather than reading every line.<Cite slug={S} src={U.post} />
            </p>
            <Callout kind="warn">
              <p>Anthropic’s own incentives matter here. It sells the model it credits, and the post says it can spend tokens internally far beyond what other businesses would want to spend. Treat the productivity story as a case study of one unusual organisation, not a forecast for yours.<Cite slug={S} src={U.post} /></p>
            </Callout>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="queue" level="Advanced" number={9}>Is the merge queue dead?</SectionHeading>
            <p>
              The post questions a standard practice. “A proper merge queue, for example, doesn’t make much sense at agent scale,” it says. If hundreds or thousands of changes can merge while tests run, what does CI mean? Anthropic says it could not replicate the industry-standard global lock on the merge queue, so it invested in post-merge and pre-deploy automated testing. Concurrent changes can conflict, but the post says Claude can typically fix conflicts faster than humans can identify them.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={12} caption="The trade, in short.">
              <MergeQueue />
            </Figure>
            <p>
              This is the most debatable claim in the post, because it trades a guarantee (main always passes) for speed and relies on repair afterwards. It may suit a company with strong automated testing and pre-deploy checks. It is not a recommendation for a team shipping to customers on every merge.
            </p>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="git-future" level="Intermediate" number={10}>What it means for git</SectionHeading>
            <p>
              The post is explicit that Scion is not for everyone. “Scion is by no means a suitable replacement for git for general use,” it says; the ideas make sense for enormous monorepos with tens of thousands of engineers or swarms of agents. It would also be hard to offer: it diverges from git, so adopters would need their own code review, search and CI.<Cite slug={S} src={U.post} />
            </p>
            <p>
              Anthropic instead shares ideas it thinks git platforms could adopt, and says it expects the class of problem to become common “over the next six to 12 months”.<Cite slug={S} src={U.post} />
            </p>
            <Figure number={13} caption="Ideas the post suggests for git, without leaving its model.">
              <GitCanLearn />
            </Figure>
            <p>
              It also credits the git community with “nearly two decades” of scaling work, and says it wants to partner with GitHub, GitLab and open source.<Cite slug={S} src={U.post} /> We saw no statement from those projects at the time of writing, so what, if anything, changes in git itself is open.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="you" level="Beginner" number={11}>What it means for you</SectionHeading>
            <p>
              Most teams do not have 100 GB of history or 25 million checkouts a day. For them, the practical lesson is smaller and easier to apply.
            </p>
            <Figure number={14} caption="Our reading of where you fall. An illustration, not advice from Anthropic.">
              <DoYouNeedThis />
            </Figure>
            <ul>
              <li><strong>Measure before you worry.</strong> If CI spends minutes fetching code, find out where. Partial clone and sparse checkout are documented git features and cheap to try.</li>
              <li><strong>Ask a server instead of cloning.</strong> If a tool only needs “who changed this line?”, a hosting platform’s API can often answer without a local copy.</li>
              <li><strong>Review intent, not just lines.</strong> As agents write more, reviewers are asked to confirm what a change is for. Better tests and clearer boundaries matter more than reading faster.</li>
              <li><strong>Check merge assumptions.</strong> A queue that is fine at 10 merges a day may not be at 1,000. Know what you rely on it for.</li>
            </ul>
            <Figure number={15} caption="Claims as they circulated on social media and in summaries, against the post.">
              <ClaimCheck />
            </Figure>

            <h3>The message</h3>
            <p>
              Anthropic’s post is a case study from an organisation at the far end of a trend: when AI makes code cheap, the surrounding systems, not the code, set the pace. Its answer, a server-centred system built for always-online agents, suits a very large monorepo and is not on offer. What carries over is the diagnosis. If the tools that surround your code were designed for human speed, expect them to be the next thing that strains.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>When code gets cheap, the pipes around it become the product to fix.</strong> Anthropic fixed one of them in five months; it says the rest are next.
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What growth in merges did Anthropic report, and over what period?", a: "From about 2,500 code changes a day in May 2026 to over 30,000 a day in September 2026, which is about twelve times, described in the post as more than tenfold." },
                { q: "What assumption of git did Anthropic say worked against it?", a: "That clients work offline and need a complete copy of the repository. Nearly all its clients are agents and jobs that are always online." },
                { q: "What is a changeset in Scion, and how does it differ from a git commit?", a: "An entry in a write-ahead log listing files changed relative to the first parent, with content-addressed pointers to contents. A git commit points to a tree. Changesets are made server-side." },
                { q: "Why can any Scion cache answer a request?", a: "Everything is content-addressed and immutable, and each request is for a specific object, so a cached copy is always correct." },
                { q: "Does Anthropic say other companies should adopt Scion?", a: "No. It says Scion is not a suitable replacement for git for general use and is hard to offer, and shares ideas for git platforms instead." },
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
              Anthropic, Google, Meta, the Git project and X are independent of MSRX; this article is not affiliated with or endorsed by any of them. Anthropic makes Claude, which is among the AI assistants used to draft this article. Quotes are word for word from the linked sources. Facts were checked on 14 October 2026 and may change. All performance figures are Anthropic’s own and were not independently verified.
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
