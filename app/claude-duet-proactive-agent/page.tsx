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
  Approvals,
  Availability,
  Buying,
  Connectors,
  Credentials,
  DayWithDuet,
  FourVerbs,
  GetReady,
  Limits,
  Pic,
  SafetyLayers,
  Sensitive,
  Stack,
  Testers,
  Unknowns,
  Usage,
  VsClaude,
} from "@/components/figures/duet-guide";

const article = getArticle("claude-duet-proactive-agent") as Article;
const previous = getArticle("tesla-roadster-flying-launch") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Exact URLs, so every citation matches one reference. */
const U = {
  ann: "https://claude.com/resources/articles/claude-duet",
  xpost: "https://x.com/claudeai/status/2112984664256241837",
  prod: "https://claude.com/product/claude-duet",
  trust: "https://www.anthropic.com/research/trustworthy-agents",
  managed: "https://www.anthropic.com/research/managed-agents",
  auto: "https://www.anthropic.com/research/claude-code-auto-mode",
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
  { name: "Claude Duet", path },
];

const TOC = [
  { id: "what", label: "What Claude Duet is" },
  { id: "day", label: "A day with it" },
  { id: "how", label: "How it works" },
  { id: "approve", label: "What it asks you first" },
  { id: "safe", label: "How it is kept safe" },
  { id: "apps", label: "What it can connect to" },
  { id: "who", label: "Who can use it, and the cost" },
  { id: "use", label: "How to get ready and use it" },
  { id: "limits", label: "Limits and unknowns" },
  { id: "references", label: "References" },
];

export default function ClaudeDuetProactiveAgent() {
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
            { "@type": "SoftwareApplication", name: "Claude Duet" },
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
            {article.series} · Article 18
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Claude <span className="msrx-gradient-text">Duet</span>: the assistant that comes to you
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
              This explains Claude Duet, which Anthropic announced on 21 October 2026, using Anthropic’s own announcement, product page and X thread, plus three Anthropic pages on
              how its agents are made safe. Green sections need no background. Amber ones cover the controls and the cost. Red ones go into the safety design. We have
              not used Duet, because it is on a waitlist, so everything here is what Anthropic says, attributed, and none of it is independently tested.
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
            <SectionHeading id="what" level="Beginner" number={1}>What Claude Duet is</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Claude Duet is a new app from Anthropic in which Claude works as a proactive agent: it comes to you with what needs your attention, completes tasks you ask of it, keeps working when you step away, and checks with you before it acts on your behalf.<Cite slug={S} src={U.ann} />
            </p>
            <p>
              Anthropic announced it on 21 October 2026 as a research preview, available by waitlist, starting with Pro and Max subscribers in the US.<Cite slug={S} src={U.ann} /> The company’s account on X posted the same description with a 39-second video, and followed with posts on the model behind it, safety and availability.<Cite slug={S} src={U.xpost} />
            </p>
            <Figure number={1} caption="The video that opens Anthropic’s announcement post on X. Image: the poster frame of that video, from the post at x.com/claudeai, retrieved 22 October 2026. It shows the app’s name and icon, not the app working.">
              <Pic file="x-post-poster.jpg" alt="Claude Duet app icon, an orange blob with a black loop through it, beside the words Claude Duet on a lilac background." width={1920} height={1080} />
            </Figure>
            <p>
              Anthropic says it built Duet “for professionals and small business owners with more on their plates than they can track.”<Cite slug={S} src={U.ann} /> It is available as a standalone app on iOS and Android, and on claude.ai.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={2} caption="The four parts of Anthropic’s one-sentence description.">
              <FourVerbs />
            </Figure>
            <Callout kind="eli5">
              <p>Most chat assistants are like a clever colleague at the next desk who answers when you turn around. Duet is meant to be more like an assistant who walks over with a short list each morning, quietly gets on with jobs you gave them, and says “this one needs your signature” before anything important goes out.</p>
            </Callout>
            <Figure number={3} caption="The top of Anthropic’s Claude Duet product page, with its waitlist form. Real screenshot, captured 22 October 2026. Image: Anthropic, from claude.com/product/claude-duet.">
              <Pic file="product-hero.jpg" alt="Anthropic’s Claude Duet product page showing the app icon, a Research preview label, the heading Get back to what needs you, and a Join the waitlist form." width={800} height={500} />
            </Figure>
            <p>
              The difference from the Claude app, in Anthropic’s words, is who goes first. The Claude app waits for you to open a chat. Duet “comes to you”: it tells you each morning what needs attention, takes tasks by message, and reaches out when one is done or needs approval.<Cite slug={S} src={U.prod} />
            </p>
            <Figure number={4} caption="The Claude app compared with Claude Duet, from Anthropic’s FAQ.">
              <VsClaude />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="day" level="Beginner" number={2}>A day with it</SectionHeading>
            <p>
              Each morning Duet sends a short brief on the most important items across your connected apps. Through the day it keeps tabs on those apps and messages you only when something needs your attention. You can also hand it tasks of all shapes, from scheduling meetings to building dashboards with dozens of tools, creating financial or sales forecasts, prototyping and building web apps.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={5} caption="A day with Duet, in the order Anthropic describes the behaviours.">
              <DayWithDuet />
            </Figure>
            <p>
              Anthropic’s product page runs a sample conversation in a phone mock-up. The sample shows Duet reporting on a Chicago location opening and listing items that need the user’s attention. It is Anthropic’s demonstration, not a real user’s account.<Cite slug={S} src={U.prod} />
            </p>
            <Figure number={6} caption="Sample conversation from Anthropic’s product page: Duet reporting on a location opening. Real screenshot of Anthropic’s demo, captured 22 October 2026. The people and figures in it are Anthropic’s sample content.">
              <Pic file="demo-proactive.jpg" alt="A phone mock-up on Anthropic’s page showing Claude Duet saying the Chicago location opens in 26 days and that 33 of 41 checklist items are done or on track." width={800} height={500} />
            </Figure>
            <Figure number={7} caption="The same demo further down: a morning rundown with items such as a contract renewal and a deck needing review. Real screenshot of Anthropic’s demo, captured 22 October 2026. Sample content, not real data.">
              <Pic file="demo-brief.jpg" alt="Phone mock-up showing a Claude Duet morning rundown with bullet points about a renewal, a location opening, a funding meeting and customer orders, above a message box and Chat, Tasks and Make tabs." width={800} height={500} />
            </Figure>
            <p>
              Anthropic also published short stories from testers. A broker named Jess Provencher said Duet flagged, unprompted, a showing on her calendar on the wrong day, calling it “exactly the kind of thing I want caught without having to ask.” Amin Ebrahimi, owner of Shahs of Kabob, said of using it for accounting, customer support and marketing, “I don’t need to open up 100 tabs.”<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={8} caption="The people Anthropic quotes. All five are stories Anthropic chose to publish.">
              <Testers />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how" level="Intermediate" number={3}>How it works</SectionHeading>
            <p>
              Your context from Claude is the foundation. Duet carries over memory, skills and connected apps from your Claude account, so there is little to set up, and you message it by typing or voice in one ongoing thread.<Cite slug={S} src={U.ann} /> It runs on a virtual machine with its own browser, which is why it does not need your laptop or phone to be on.<Cite slug={S} src={U.ann} /> Anthropic’s X thread adds that it was designed around Claude Opus 5.5, which gives it the judgment to decide what needs you, what can wait, and when to check with you first.<Cite slug={S} src={U.xpost} />
            </p>
            <Figure number={9} caption="How the pieces fit, as Anthropic describes them.">
              <Stack />
            </Figure>
            <Callout kind="deep">
              <p>Anthropic’s post on trustworthy agents describes an agent as a model that directs its own process and tool use, in a loop of planning, acting, observing and adjusting. It lists four components: the model, a harness (instructions and guardrails), tools, and an environment where it runs.<Cite slug={S} src={U.trust} /> Duet fits that picture: Opus 5.5 is the model, the approval rules and classifiers are part of the harness, connectors are the tools, and the cloud computer is the environment. That mapping is ours; Anthropic does not describe Duet in those terms.</p>
            </Callout>
            <p>
              One detail shapes how you will use it. Duet “checks your connected accounts every few hours”, Anthropic says, because checking nonstop would use up your plan’s limits much faster.<Cite slug={S} src={U.ann} /> The product page says plainly that it can miss something that arrives between check-ins.<Cite slug={S} src={U.prod} /> It is proactive on a schedule, not a live alarm.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="approve" level="Beginner" number={4}>What it asks you first</SectionHeading>
            <p>
              Duet reads, drafts and prepares work on its own. Before it sends a message, makes a payment, signs a document or deletes anything, it shows you exactly what it is about to do and waits for your approval.<Cite slug={S} src={U.ann} /> Some things are off-limits even with your approval, such as trading securities or moving money between accounts.<Cite slug={S} src={U.ann} /> You can also disconnect any app it has access to.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={10} caption="Three tiers of action, from Anthropic’s announcement.">
              <Approvals />
            </Figure>
            <Callout kind="warn">
              <p>An approval is only as good as your attention to it. Read what Duet says it is about to send, pay or sign before you tap approve, especially in the first weeks when you are learning how it behaves.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="safe" level="Advanced" number={5}>How it is kept safe</SectionHeading>
            <p>
              An agent that reads your email and acts on it is a target. Anthropic names five layers for Duet: its framework for trustworthy agents, a credential design that means Duet never directly sees your passwords or sign-in tokens, an auto mode classifier that approves actions, defences against hidden instructions in web pages and messages, and adversarial testing by red teams and an external firm, with Duet covered by its public bug bounty program.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={11} caption="The five layers, in Anthropic’s words. Claims in a launch post, not verified by us.">
              <SafetyLayers />
            </Figure>
            <p>
              The framework behind the first layer has five principles: keeping humans in control, aligning with human values, securing agents’ interactions, maintaining transparency, and protecting privacy.<Cite slug={S} src={U.trust} /> Its authors say that as agents become more capable, the risks of misreading intent and of prompt injection both intensify.<Cite slug={S} src={U.trust} />
            </p>
            <p>
              On credentials, Anthropic’s Managed Agents post explains the design Duet says it follows. In an older, coupled design, code Claude generated ran in the same container as credentials, so a prompt injection only had to convince Claude to read its own environment. The fix was to keep tokens out of the sandbox: OAuth tokens sit in a vault, and Claude calls tools through a proxy that fetches them, so the harness is never made aware of any credentials.<Cite slug={S} src={U.managed} />
            </p>
            <Figure number={12} caption="Why credentials are kept apart from the code, as Anthropic explains it.">
              <Credentials />
            </Figure>
            <p>
              On approvals, Anthropic’s auto mode post describes a classifier that decides whether an action matches what the user asked for. It was built for Claude Code, where it says users accept 93% of manual permission prompts anyway, which leads to approval fatigue.<Cite slug={S} src={U.auto} /> Our reading, not Anthropic’s, is that a proactive agent makes this worse, because many small decisions arrive while you are not watching, so automated checks matter more than a prompt for every step.
            </p>
            <p>
              Duet adds one new safeguard. Anthropic says it is releasing it with a dedicated classifier and a safety system prompt that check each message and guard against leaks of sensitive information. They are designed to reject requests to share the strictest tier, including credit card numbers and government identification. Other sensitive information, such as health or personal finances, goes through only when you have explicitly told Duet to send it.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={13} caption="The two tiers of sensitive information.">
              <Sensitive />
            </Figure>
            <p>
              The X thread says the same, that the important decisions stay with you, and promises more on safety soon.<Cite slug={S} src={U.xpost} /> Until that write-up appears, treat the design as stated intent. Anthropic has not published error rates for any of these checks in the pages we read.
            </p>
            <Figure number={14} caption="The product page’s “Built for judgment” and “Safe, secure, private” panels. Real screenshot, captured 22 October 2026. Image: Anthropic, from claude.com/product/claude-duet.">
              <Pic file="judgment-safety.jpg" alt="Part of Anthropic’s Claude Duet page with two columns, Built for judgment and Safe, secure, private, each with short headed points such as Knows what needs you and You approve." width={800} height={500} />
            </Figure>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="apps" level="Intermediate" number={6}>What it can connect to</SectionHeading>
            <p>
              Duet can use the more than 6,000 connectors and plugins in the Claude Marketplace.<Cite slug={S} src={U.ann} /> Anthropic’s examples run from finding missed Gmail and Slack messages, to checking QuickBooks or Stripe for unpaid invoices, to preparing payroll in Gusto, sending agreements through Docusign, and managing a Shopify store.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={15} caption="Anthropic’s eight worked examples.">
              <Connectors />
            </Figure>
            <p>
              It can also buy things for your business. Duet confirms the item with you, and Link, Stripe’s digital wallet, asks you to approve the spend, then pays with a virtual card so your real card number is not shared. It can also use Shop Pay from Shopify at online stores. Signing in to sites with logins saved in 1Password is listed as coming soon.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={16} caption="How a purchase works, per Anthropic.">
              <Buying />
            </Figure>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="who" level="Beginner" number={7}>Who can use it, and the cost</SectionHeading>
            <p>
              For the research preview, Duet is included in Pro and Max plans and uses the same usage limits as the rest of Claude.<Cite slug={S} src={U.ann} /> The product page says Team and Enterprise plans are not included yet, and that on a computer you open it on the web at claude.ai.<Cite slug={S} src={U.prod} /> The X thread repeats that it is a waitlist for Pro and Max in the US.<Cite slug={S} src={U.xpost} />
            </p>
            <Figure number={17} caption="Availability as of 22 October 2026.">
              <Availability />
            </Figure>
            <p>
              Usage deserves a plain warning. Duet’s background checks count toward your limits, and larger tasks like a financial model or deck need more model turns and background work.<Cite slug={S} src={U.ann} />
            </p>
            <Figure number={18} caption="What draws on your plan, per Anthropic.">
              <Usage />
            </Figure>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="use" level="Intermediate" number={8}>How to get ready and use it</SectionHeading>
            <p>
              You cannot use Duet yet unless Anthropic has let you off the waitlist, so this is a plan built from what Anthropic documents. We have not tried it. The waitlist form on the product page asks for your name, email, company, phone type and what you would hand off first, and Anthropic says it will email when Duet is ready for you.<Cite slug={S} src={U.prod} />
            </p>
            <Figure number={19} caption="A suggested order for getting ready. Illustration, ours.">
              <GetReady />
            </Figure>
            <p>
              Anthropic says you can tell Duet what you want to hear about and how often, and that you describe a task in a short message and it works out the apps and steps.<Cite slug={S} src={U.ann} /> So a good first message is short and concrete. Three examples of the sort of request Anthropic’s own examples suggest, written by us and not tested:
            </p>
            <ul>
              <li>“Each morning, tell me only about client emails and anything on my calendar that clashes.”</li>
              <li>“Check Stripe for unpaid invoices over 30 days and draft reminders for me to approve.”</li>
              <li>“Prepare a one-page brief before each external call this week.”</li>
            </ul>
            <Callout kind="eli5">
              <p>Start with jobs where a mistake costs little and you can see the result, like drafts and briefs. Move to jobs that send or pay only after you have seen how it behaves.</p>
            </Callout>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="limits" level="Intermediate" number={9}>Limits and unknowns</SectionHeading>
            <p>
              Anthropic is candid that this is early. Duet may misread a thread or miscalibrate what is urgent, personal errands such as booking tickets are weaker than work tasks, and it cannot yet show you its browser. For now it lives in its own app, separate from the main Claude app.<Cite slug={S} src={U.ann} /> The X thread repeats that it can still misjudge what is urgent.<Cite slug={S} src={U.xpost} />
            </p>
            <Figure number={20} caption="Limits Anthropic states itself.">
              <Limits />
            </Figure>
            <p>
              Beyond those, there is much we cannot say. No independent test, error rate or measured usage figure appears in the sources we read, and the testimonials are chosen by Anthropic.
            </p>
            <Figure number={21} caption="What we could not find.">
              <Unknowns />
            </Figure>

            <h3>The message</h3>
            <p>
              Claude Duet is a bet that the next step after a chat assistant is one that comes to you: a morning brief, background work on its own cloud computer, and a firm habit of asking before it sends, pays, signs or deletes. Anthropic’s safety claims are detailed and consistent with its earlier agent work. What nobody outside Anthropic can yet tell you is how often it gets the judgment right.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>Join the waitlist if you are on Pro or Max in the US, start with low-risk drafts and briefs, and read every approval screen.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is Claude Duet, in one sentence?", a: "A new Anthropic app where Claude works as a proactive agent: it brings what needs your attention, completes tasks, keeps working when you step away, and checks with you before it acts for you." },
                { q: "Who can use it today, and what does it cost?", a: "Pro and Max subscribers in the US, by waitlist, as a research preview. It is included in those plans and shares their usage limits. Team and Enterprise are not included yet." },
                { q: "What must you approve first?", a: "Sending a message, making a payment, signing a document or deleting anything. Trading securities and moving money between accounts are off-limits even with approval." },
                { q: "Why does Duet not need your phone or laptop on?", a: "It has a virtual machine with its own browser, so it works in the background and notifies you when a task is done or needs review." },
                { q: "Name two limits Anthropic states.", a: "It may misread what is urgent, and checks run only every few hours so it can miss something in between. Personal errands are weaker than work tasks, and it cannot yet show its browser." },
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
              Claude and Claude Duet are made by Anthropic; X, Stripe, Shopify, Gmail and the other apps named are made by their own companies. MSRX is independent and is not affiliated with or endorsed by any of them. Anthropic’s pages and X thread were opened in a browser on 22 October 2026; nothing was submitted or entered, and the waitlist was not joined. Quotes are word for word from the linked sources. Facts were checked on 22 October 2026 and may change, because this is a research preview. Anthropic’s images are used to illustrate the product it announces; the app’s icon and screenshots belong to Anthropic.
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
