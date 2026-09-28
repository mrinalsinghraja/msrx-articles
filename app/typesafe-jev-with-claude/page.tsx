import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, MathBlock, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { References } from "@/components/articles/References";
import { citationJsonLd } from "@/lib/references";
import { FlowSteps } from "@/components/articles/AiFigures";
import {
  Bars,
  Cascade,
  Checklist,
  FiveWays,
  HookFlow,
  McpSequence,
  RouterFlow,
  SkillFlow,
  Terminal,
  TwoBrains,
  WeekPath,
  WhichWay,
} from "@/components/figures/jev-claude-guide";
import {
  DESKTOP,
  HOOK,
  HOOK_SETTINGS,
  MCP_ADD,
  MCP_SERVER,
  ROUTER,
  SAVE_KEY,
  SKILL,
  T_HOOK,
  T_JEVCHECK,
  T_MCP_GET,
  T_PLUGIN,
  T_RUN1,
  T_STDIO,
  TOOL_RUNNER,
  VERIFY,
} from "@/components/figures/jev-claude-code";

const article = getArticle("typesafe-jev-with-claude") as Article;
const previous = getArticle("agentic-ai-101") as Article;
const basics = getArticle("typesafe-jev-101") as Article;
const claude = getArticle("how-to-use-claude") as Article;
const path = `/${article.slug}`;
const DOCS = "https://docs.typesafe.ai";

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
  { name: "Jev with Claude", path },
];

const TOC = [
  { id: "two-models", label: "Two models, one team" },
  { id: "five-ways", label: "Five ways to connect them" },
  { id: "setup", label: "Step 0: a key, kept safe" },
  { id: "skill", label: "Way 1: the Claude Code skill" },
  { id: "mcp", label: "Way 2: an MCP tool" },
  { id: "hooks", label: "Way 3: hooks and commands" },
  { id: "router", label: "Way 4: a router before Claude" },
  { id: "verifier", label: "Way 5: a verifier after Claude" },
  { id: "agent-tool", label: "Bonus: a tool in your agent" },
  { id: "production", label: "The production checklist" },
  { id: "troubleshooting", label: "When something goes wrong" },
  { id: "first-week", label: "Your first week" },
  { id: "references", label: "References" },
];

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

const TROUBLE: { s: string; c: string; f: string }[] = [
  { s: "Claude Code ignores the skill", c: "It wasn’t loaded, or it was installed for another agent", f: "Invoke /typesafe:typesafe-ai directly, run /reload-plugins, and check claude plugin list shows it enabled." },
  { s: "Generated code uses fields that don’t exist", c: "A stale skill", f: "Update the marketplace and the plugin (commands in Way 1), then ask again." },
  { s: "The jev tool doesn’t appear", c: "The MCP server failed to start", f: "claude mcp get jev should say Connected. Run the server by hand: a syntax error shows up at once." },
  { s: "Tool says “No TypeSafe key”", c: "Desktop apps don’t read your shell profile", f: "Use the Keychain lookup in the server, or pass the key with claude mcp add -e." },
  { s: "HTTP 401", c: "Missing or wrong key", f: "Check the variable is set in the shell that started Claude Code; create a new key if needed." },
  { s: "HTTP 422", c: "A malformed question", f: "The body names the field. Usual suspects: a Score with one level, a Choice with no criteria." },
  { s: "HTTP 429 / 529 / 5xx", c: "Rate limits, overload, or the network", f: "The SDKs retry with backoff. In hooks and routers, fail open instead of waiting." },
  { s: "Answers near 0.5", c: "Jev can’t tell — often the question is ambiguous", f: "Sharpen the wording or add criteria. If it is genuinely unclear, that case belongs to a person." },
];

export default function TypesafeJevWithClaude() {
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
            { "@type": "SoftwareApplication", name: "TypeSafe Jev", applicationCategory: "AI model API", publisher: { "@type": "Organization", name: "TypeSafe AI" } },
            { "@type": "SoftwareApplication", name: "Claude", applicationCategory: "AI assistant", publisher: { "@type": "Organization", name: "Anthropic" } },
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
            {article.series} · Article 9
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            How to use <span className="msrx-gradient-text">TypeSafe Jev with Claude</span>: a step-by-step guide
          </h1>
          <p className="display-sm text-[clamp(18px,2.4vw,23px)] max-w-3xl mb-7" style={{ color: "var(--stage-text-secondary)" }}>
            {article.subtitle}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]" style={{ color: "var(--stage-text-secondary)" }}>
            <span>By <strong style={{ color: "var(--stage-text-primary)" }}>{AUTHOR.name}</strong></span>
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
              New to all this? Read the green sections: they explain the idea with everyday examples and get you set up. Using Claude Code every day? The amber sections add Jev to it in minutes. Shipping an app on the Claude API? The red sections are the architecture, the code and the numbers.
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
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Claude is brilliant at the slow, careful work: writing, reasoning, coding, planning. But a surprising amount of what happens around Claude is tiny decisions. Is this request something a database can answer? Is this shell command about to delete a folder? Did this draft just promise a refund we don’t offer? Asking Claude each of those is like asking a senior engineer to sort the post.
            </p>
            <p>
              <strong>Jev</strong>, from a company called TypeSafe, is built for exactly those tiny decisions. You give it a situation and a few typed questions; it gives back a choice, a probability or a position on a scale — in a fraction of a second, for a fraction of a cent, with an honest measure of how sure it is. Our <Link href={`/${basics.slug}`}>last TypeSafe article</Link> explained what Jev is and why it works. This one is the practical sequel: <strong>five concrete ways to make Jev and Claude work as one team</strong>, each with steps you can follow today.
            </p>
            <Callout kind="fact" title="Everything here was run for real">
              <p>Every terminal frame marked “real run” shows output captured on 28 September 2026 against <code>jev-1.13.0</code> and Claude Code 2.1.281. Every code sample was either run against the live API or type-checked against the current SDKs (<code>@typesafe-ai/sdk</code> 0.6.0, <code>typesafe-sdk</code> 0.7.2, <code>@anthropic-ai/sdk</code> 0.128.0). Diagrams are drawings. MSRX is not affiliated with TypeSafe or Anthropic.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="two-models" level="Beginner" number={1}>Two models, one team</SectionHeading>
            <p>
              Think of a busy clinic. At the front desk sits a receptionist who glances at each visitor and makes a quick call: appointment, prescription pickup, emergency. Behind the doors sit the doctors, who take their time, examine, explain and write. The clinic works because each does what they are best at. Nobody wants the surgeon on the front desk, and nobody wants the receptionist to operate.
            </p>
            <Figure number={1} caption="Jev is the receptionist; Claude is the specialist. Speeds are from our own runs, network included.">
              <TwoBrains />
            </Figure>
            <p>
              That is the whole idea of this guide. <strong>Jev makes the quick calls. Claude does the thinking and the writing. Plain code sits between them and owns the rules</strong> — which thresholds to trust, what happens when a model is unsure, what happens when one is unavailable.
            </p>
            <Callout kind="warn" title="One thing Jev is not">
              <p>Jev is not a replacement for the model inside Claude Code. It doesn’t write text or code, and there is no setting that turns Claude Code into “Claude Code powered by Jev”. TypeSafe’s own docs say so plainly. Everything in this guide uses the two <em>side by side</em>.</p>
            </Callout>
            <Callout kind="eli5">
              <p>Claude is the essay writer. Jev is the multiple-choice marker. You wouldn’t ask the essay writer to tick a thousand boxes, and you wouldn’t ask the marker to write the essay. Use both, each for its own job.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="five-ways" level="Beginner" number={2}>Five ways to connect them</SectionHeading>
            <p>
              There are five places Jev can sit relative to Claude. The first three live inside <strong>Claude Code</strong>, Anthropic’s coding agent in the terminal. The last two live inside <strong>your own app</strong> built on the Claude API.
            </p>
            <Figure number={2} caption="The five ways, from easiest to most powerful. They combine: many real set-ups use two or three." wide>
              <FiveWays />
            </Figure>
            <p>Not sure where to start? Answer five questions:</p>
            <Figure number={3} caption="A quick decision guide. Each “yes” points to one section of this article.">
              <WhichWay />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="setup" level="Beginner" number={3}>Step 0: a key, kept safe</SectionHeading>
            <p>Every way below needs one thing: a TypeSafe API key. Getting one takes about five minutes.</p>
            <Figure number={4} caption="Setup, once. Try the Playground before any code — it is the cheapest place to learn how questions behave.">
              <FlowSteps
                steps={[
                  { icon: "👤", title: "Sign up", body: "console.typesafe.ai", tone: "c" },
                  { icon: "🧪", title: "Playground", body: "paste text, ask questions", tone: "c" },
                  { icon: "🔑", title: "Create a key", body: "console.typesafe.ai/keys", tone: "v" },
                  { icon: "🔐", title: "Store it safely", body: "Keychain or a secret store", tone: "a" },
                  { icon: "✅", title: "Check it", body: "without printing it", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Sign up</strong> at <code>console.typesafe.ai</code>.</li>
              <li><strong>Play first.</strong> Open the Playground, paste a real message from your work as the <em>state</em>, and add one question, such as a Noul: “Does this message express urgency?” Add a Choice and a Score. Watch how the numbers move when you change the wording.</li>
              <li><strong>Create a key</strong> on the Keys page and store it where it can’t leak. On a Mac, the Keychain is ideal:</li>
            </ol>
            <Code title="Terminal — store the key (macOS)" code={SAVE_KEY} />
            <Callout kind="warn" title="Treat the key like a password">
              <p>Never paste it into a chat, a prompt, a config file you commit, or front-end code. On Linux or Windows, use your platform’s secret store or an environment variable set outside the project. Claude Code itself needs <em>no</em> Anthropic API key — it uses your Claude login. You only need an Anthropic key for Ways 4 and 5, where your own app calls the Claude API.</p>
            </Callout>
            <p>
              A quick word on cost, because it shapes every design choice below. Jev charges only for <strong>input</strong> tokens — $0.042 per million at the time of writing — and output is free. Our router call in Way 4 used 522 input tokens: about <strong>$0.000022</strong>, or roughly $22 for a million customer messages.
            </p>
            <MathBlock reading="522 tokens × $0.042 per million tokens ≈ $0.0000219 per call">
              cost = input tokens × $0.042 / 10<sup>6</sup>
            </MathBlock>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="skill" level="Intermediate" number={4}>Way 1: the TypeSafe skill in Claude Code</SectionHeading>
            <p>
              The fastest win. A <strong>skill</strong> is a briefing that Claude Code loads when it’s relevant: instructions, rules and pointers to documentation. TypeSafe publishes one as a Claude Code plugin. With it installed, Claude Code knows the three question types, the design patterns and the pitfalls — and, importantly, it reads TypeSafe’s <em>live</em> documentation before writing code, rather than relying on memory.
            </p>
            <Figure number={5} caption="Real screenshot of TypeSafe’s “Agent skill” documentation page, captured on 28 September 2026. The two commands are all it takes.">
              {/* The site CSP allows only same-origin images, so screenshots ship from public/. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/typesafe-jev-with-claude/typesafe-agent-skill-docs.jpg"
                width={1600}
                height={1075}
                loading="lazy"
                decoding="async"
                alt="TypeSafe documentation page titled Agent skill, showing the Claude Code tab with two commands: claude plugin marketplace add typesafe-ai/skills, and claude plugin install typesafe@typesafe-ai."
                className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)]"
              />
            </Figure>
            <p><strong>Step 1 — install.</strong> In any terminal:</p>
            <Code title="Terminal — install and update the plugin" code={SKILL} />
            <p className="!mt-6"><strong>Step 2 — check it’s there.</strong></p>
            <Terminal title="Terminal — real run" badge="real run · 28 Sep 2026">{T_PLUGIN}</Terminal>
            <p className="!mt-6">
              <strong>Step 3 — use it.</strong> Start Claude Code in your project and either type <code>/typesafe:typesafe-ai</code> followed by your request, or simply say “use the TypeSafe skill”. Good first prompts:
            </p>
            <ul>
              <li><em>“Using the TypeSafe skill, explore this project and find fragile parsing or if/else logic that an intelligent judgment could replace.”</em></li>
              <li><em>“Using the TypeSafe skill, run a few cheap experiments with the key in TYPESAFE_API_KEY and propose changes based on the most promising results.”</em></li>
              <li><em>“Using the TypeSafe skill, check whether any TypeSafe cookbook matches a problem in my code.”</em></li>
            </ul>
            <Figure number={6} caption="What happens inside Claude Code when the skill is active. The loop at the bottom is where most of the quality comes from.">
              <SkillFlow />
            </Figure>
            <Callout kind="tip" title="Four habits that make the skill work">
              <p><strong>Plan first:</strong> ask for a plan and review it before any code. <strong>One file:</strong> ask Claude to keep every question and threshold in a single file. <strong>Edit the questions yourself:</strong> TypeSafe’s docs are candid that agents aren’t great at writing questions — this is the part you own. <strong>Make it prove things:</strong> ask Claude to run a handful of real cases before believing its own assumptions.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="mcp" level="Intermediate" number={5}>Way 2: give Claude a Jev tool with MCP</SectionHeading>
            <p>
              The skill helps Claude <em>write code</em> that calls Jev. Sometimes you want Claude to <em>call Jev itself</em>, right in the middle of a task: “which of these 60 log lines are relevant?”, “which of these five commit messages is clearest?”. For that, give Claude a tool.
            </p>
            <p>
              <strong>MCP</strong> — the Model Context Protocol — is the standard way to plug tools into Claude Code and Claude Desktop. (Our <Link href={`/${previous.slug}#protocols`}>agentic AI article</Link> explains it.) An MCP server is just a small program that announces its tools and runs them when asked. TypeSafe doesn’t ship an official one today, so we’ll build one — about 80 lines, no dependencies.
            </p>
            <Figure number={7} caption="What happens when Claude uses the tool. The API key is read by the server and never enters Claude’s context.">
              <McpSequence />
            </Figure>
            <p><strong>Step 1 — save the server.</strong> This is a condensed version of the server this article was researched with. It speaks MCP over standard input and output, one JSON message per line:</p>
            <Code title="~/jev-mcp/server.mjs" code={MCP_SERVER} />
            <p className="!mt-6"><strong>Step 2 — register it with Claude Code</strong>, once, for every project:</p>
            <Code title="Terminal — register and check" code={MCP_ADD} />
            <Terminal title="Terminal — real run (home path shortened)" badge="real run · 28 Sep 2026">{T_MCP_GET}</Terminal>
            <p className="!mt-6">
              <strong>Using Claude Desktop instead?</strong> Add the server to <code>claude_desktop_config.json</code> (in Settings → Developer → Edit Config), then restart the app. Use absolute paths: desktop apps don’t read your shell profile, which is also why the server looks in the Keychain rather than relying on an environment variable.
            </p>
            <Code title="claude_desktop_config.json" code={DESKTOP} />
            <p className="!mt-6">
              <strong>Step 3 — watch it work.</strong> Here is the raw conversation between a client and the server — the same messages Claude Code sends — including a real answer from Jev:
            </p>
            <Terminal title="stdio — real run (long lines wrapped)" badge="real run · 28 Sep 2026">{T_STDIO}</Terminal>
            <p className="!mt-6">
              In practice you just talk to Claude: <em>“Use jev_evaluate to check which of these 40 reviews mention a crash — one Noul per review, in one call — then summarise only those.”</em> Claude writes the questions, Jev answers in well under a second, and Claude reads the probabilities instead of re-reading 40 reviews.
            </p>
            <Callout kind="deep">
              <p>Two design details matter. First, the tool description tells Claude to <strong>batch every independent question into one call</strong> — Jev reads the state once and answers all questions in parallel, so ten questions cost barely more than one. Second, the server returns errors as <code>isError</code> results rather than crashing, so Claude sees “no key” or “HTTP 429” and can carry on without Jev instead of stalling.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="hooks" level="Intermediate" number={6}>Way 3: hooks and commands that guard Claude Code</SectionHeading>
            <p>
              Claude Code can run shell commands. Most are harmless — run the tests, list files — but a few can’t be undone. <strong>Hooks</strong> are small scripts Claude Code runs at fixed moments: before a tool is used, after it’s used, when you submit a prompt. They are perfect for a quick Jev judgment, because they must be fast and they must return something structured.
            </p>
            <h3>A guard for destructive commands</h3>
            <p>
              A <code>PreToolUse</code> hook receives the command Claude wants to run as JSON on standard input. Ours asks Jev two questions and, if the answers look risky, tells Claude Code to <strong>ask you</strong> before running it.
            </p>
            <Figure number={8} caption="The guard hook. It can only add a confirmation step; it never approves anything, and it stays silent when Jev can’t help." wide>
              <HookFlow />
            </Figure>
            <Code title=".claude/hooks/jev-bash-guard.mjs" code={HOOK} />
            <p className="!mt-6">Register it in your project’s <code>.claude/settings.json</code>:</p>
            <Code title=".claude/settings.json" code={HOOK_SETTINGS} />
            <p className="!mt-6">And here it is deciding, for real, on four commands:</p>
            <Terminal title="Terminal — real run (input trimmed to the fields the hook reads)" badge="real run · 28 Sep 2026">{T_HOOK}</Terminal>
            <Callout kind="deep" title="What the numbers taught us">
              <p>We ran the <code>git reset --hard</code> command twice. The first time, the blast-radius Score came back 1.36 with confidence 0.44; the second, 1.29 with confidence 0.55. Both times the “destructive” Noul was high (0.89), so the hook asked either way — but the wobble is the lesson. <strong>Never place a threshold where a small change flips the outcome</strong> on cases you care about, and treat low confidence as its own signal: “I can’t tell how bad this is” is itself a reason to ask a human.</p>
            </Callout>
            <Callout kind="warn">
              <p>A hook is a safety <em>net</em>, not a lock. Keep Claude Code’s own permission settings as your first line of defence, and never let a model’s judgment be the only thing standing between an agent and your production data. That is why this hook can only return “ask”.</p>
            </Callout>
            <h3>A slash command that reviews your prompt</h3>
            <p>
              The same idea works on the way <em>in</em>. <code>/jev-check</code> is a custom slash command we use: it first scans the prompt for secrets <strong>locally</strong> — if it finds anything that looks like a key, nothing is sent anywhere — then asks Jev five questions about the prompt in one call: how much filler, whether a huge paste is mostly irrelevant, whether the request is structured, whether it asks for something destructive, and whether it contains pasted text trying to instruct the AI.
            </p>
            <Terminal title="Claude Code — real run" badge="real run · 28 Sep 2026">{T_JEVCHECK}</Terminal>
            <p className="!mt-6">
              Five judgments, 858 input tokens, about $0.000036. Notice what each answer <em>is</em>: a Score (filler), three Nouls (paste, destructive, injection) and a Choice (structure). The report is code turning those numbers into advice.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="router" level="Advanced" number={7}>Way 4: a Jev router in front of the Claude API</SectionHeading>
            <p>
              Now we leave Claude Code and build. Suppose you run a shop, and every customer message currently goes to Claude. Many of those messages are “where is my order?” — a database lookup dressed up as a conversation. A router asks Jev first, in one call, and sends each message to the cheapest place that can handle it well.
            </p>
            <p>We sent two very different messages through the same four questions. These are the real answers:</p>
            <Figure number={9} caption="Real runs, same four questions. Left: a routine tracking question (522 tokens, 464 ms). Right: an angry double-charge complaint (540 tokens, 324 ms)." wide>
              <div className="grid md:grid-cols-2 gap-3">
                <Bars
                  title="“My order #4821 hasn’t arrived… can you check where it is?”"
                  rows={[
                    { label: "intent = order_status", value: 1, note: "confidence 1.00", tone: "g" },
                    { label: "needs_written_reply", value: 0.28, note: "probably not — a lookup will do", tone: "g" },
                    { label: "complexity", value: 0.18, max: 2, note: "a standard lookup (confidence 0.73)", tone: "g" },
                    { label: "angry", value: 0.06, note: "calm", tone: "g" },
                  ]}
                  footer={<><strong>Route:</strong> plain code. No Claude call.</>}
                />
                <Bars
                  title="“Third time writing… charged twice… explain what went wrong.”"
                  rows={[
                    { label: "intent = refund_or_return", value: 1, note: "confidence 1.00", tone: "r" },
                    { label: "needs_written_reply", value: 0.75, note: "yes — this needs real words", tone: "r" },
                    { label: "complexity", value: 1.99, max: 2, note: "dispute / escalation (confidence 0.99)", tone: "r" },
                    { label: "angry", value: 0.8, note: "clearly upset", tone: "r" },
                  ]}
                  footer={<><strong>Route:</strong> Claude drafts, a person approves.</>}
                />
              </div>
            </Figure>
            <Terminal title="Jev response for the first message — real run" badge="real run · 28 Sep 2026">{T_RUN1}</Terminal>
            <Figure number={10} caption="The routing rules, drawn. Jev supplies judgments; the branches and thresholds are ordinary code you can read and test." wide>
              <RouterFlow />
            </Figure>
            <p>Here is the whole router in TypeScript, using both official SDKs:</p>
            <Code title="support/router.ts" code={ROUTER} />
            <p className="!mt-6">Four decisions in that file are worth copying anywhere:</p>
            <ul>
              <li><strong>Fail open.</strong> No key, a timeout or an error returns <code>null</code>, and the message goes to Claude exactly as it did before Jev existed. Routing is an optimisation, never a dependency.</li>
              <li><strong>A short leash.</strong> Four seconds and one retry. If the router is slow, the customer waits for nothing.</li>
              <li><strong>Only confident, easy cases skip Claude.</strong> The shortcut needs a sure intent <em>and</em> a low “needs a written reply”. Anything uncertain gets the full treatment.</li>
              <li><strong>Jev’s notes ride in the user turn.</strong> The system prompt never changes, so Claude’s prompt caching keeps hitting.</li>
            </ul>
            <Callout kind="fact" title="The same pattern in a real product">
              <p>We wired this pattern into a Claude-powered app that turns chat messages into React components. One Jev call asks for the <em>intent</em> (new component, change existing, question, unrelated) and a 3-level <em>complexity</em>. A confident “unrelated” (0.8 or more) gets a friendly canned reply and never reaches Claude; intent confidence below 0.5 steers nothing; and complexity sets Claude’s tool-step budget at 12, 24 or 40, falling back to the full 40 whenever Jev is unsure. Its guidance travels as a separate system message so the cached one stays byte-identical.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="verifier" level="Advanced" number={8}>Way 5: verify what Claude writes</SectionHeading>
            <p>
              Claude writes wonderful, warm replies. Occasionally, a wonderful, warm reply promises something your policy doesn’t allow. A human reviewer catches that by checking the draft against the rules. Jev can do the same check in a third of a second, before anyone sees the draft.
            </p>
            <p>We gave Jev a refund policy, the facts of the case, and a draft reply that sounds lovely:</p>
            <Figure number={11} caption="A real run. The draft scored 1.92 out of 2 for tone — and failed both factual checks. Sounding right and being right are different questions.">
              <Bars
                title="Draft: “I’ve processed your refund… back within 24 hours… added a free month.”"
                rows={[
                  { label: "promises_beyond_policy", value: 0.99, note: "policy says 5–7 business days and no credits", tone: "r" },
                  { label: "contradicts_facts", value: 0.98, note: "facts say the refund has not been issued", tone: "r" },
                  { label: "tone", value: 1.92, max: 2, note: "warm, specific, takes responsibility (confidence 0.89)", tone: "g" },
                ]}
                footer={<>493 input tokens · 296 ms. <strong>Verdict in code:</strong> do not send.</>}
              />
            </Figure>
            <h3>Tuning a question, for real</h3>
            <p>
              Then something instructive happened. We tested a much better draft — “a billing specialist is issuing your refund now; it will reach your account within 5–7 business days” — and the “contradicts facts” check still fired, at 0.86. Was Jev wrong? Not exactly: “is issuing your refund now” <em>is</em> close to claiming it’s done. The question was too loose. So we sharpened it, spelling out that describing an action as in progress is not claiming it is complete, and we tested it on all three drafts in one call:
            </p>
            <Figure number={12} caption="Real runs while tuning one question. The sharper wording keeps catching the bad draft and clears the clear one; the ambiguous draft lands near 0.5 — “can’t tell” — which is exactly where a person should look.">
              <Bars
                title="“Does the draft claim a not-yet-done action is complete?”"
                rows={[
                  { label: "bad draft (“I’ve processed your refund”)", value: 0.98, note: "caught", tone: "r" },
                  { label: "ambiguous draft (“is issuing your refund now”)", value: 0.56, note: "was 0.86 with the loose wording — now “can’t tell”", tone: "a" },
                  { label: "clear draft (“will be issued by our billing team”)", value: 0.04, note: "cleared", tone: "g" },
                ]}
              />
            </Figure>
            <p>
              That is the real craft of working with Jev: <strong>the wording of the question is the product</strong>. Test it on good, bad and borderline examples; when a borderline case lands near 0.5, decide on purpose whether it goes to a person or back for a rewrite.
            </p>
            <h3>The cascade: cheap draft, check, strong redraft</h3>
            <p>
              Put the check inside a loop and you get a <strong>cascade</strong>. A fast model drafts; Jev checks; only failures go to a stronger model, with Jev’s flags as instructions; anything that still fails goes to a person. TypeSafe’s own extraction cookbook uses the same shape — a small model, a Jev verifier, and a big reasoning model only when a check fires — to get most of the big model’s quality at a fraction of the cost.
            </p>
            <Figure number={13} caption="A draft-and-verify cascade. Most drafts stop at the first green box; the strong model and the person only see the hard cases.">
              <Cascade />
            </Figure>
            <Code title="support/verify.py" code={VERIFY} />
            <p className="!mt-6">
              We ran the <code>check()</code> function in that file against the live API: the bad draft failed <code>promises_beyond_policy</code> and <code>claims_completed</code>; the clear draft passed everything.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="agent-tool" level="Advanced" number={9}>Bonus: Jev as a tool inside your own agent</SectionHeading>
            <p>
              Way 2 gave Claude Code a Jev tool. You can do the same inside your own agent on the Claude API: define a tool, and let Claude decide when a fast judgment would help. The Anthropic SDK’s tool runner handles the loop — Claude calls the tool, your function runs, the result goes back, until Claude is done.
            </p>
            <Code title="agent/ask-jev-tool.ts" code={TOOL_RUNNER} />
            <Callout kind="tip" title="Tool or code — which should call Jev?">
              <p>If the judgment is <strong>always</strong> needed — every message must be routed, every draft must be checked — call Jev from your code, as in Ways 4 and 5. That is predictable, testable and cheap. Give Claude a Jev <strong>tool</strong> only when whether to ask is itself a judgment, such as triaging a pile of unknown size in the middle of an open-ended task. Code owns the workflow; models supply the judgments.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="production" level="Advanced" number={10}>The production checklist</SectionHeading>
            <p>Everything above, boiled down to nine rules we would not ship without:</p>
            <Figure number={14} caption="Nine rules for running Jev next to Claude in production." wide>
              <Checklist />
            </Figure>
            <p>
              Two of these deserve a closer look. <strong>Pinning:</strong> <code>jev-latest</code> is an alias that moves when TypeSafe ships a new model; every response names the exact model that answered, so log it, tune your thresholds against a pinned ID such as <code>jev-1.13.0</code>, and upgrade on your own schedule. <strong>Failing open:</strong> during our research one request came back as an HTTP 520 from TypeSafe’s edge network — on the next try it worked. Every integration in this article would have carried on without Jev for that one call. Yours should too.
            </p>
            <Callout kind="deep" title="Limits to design around">
              <p>Per TypeSafe’s models page, a request can hold 64k tokens (32k for the state plus the longest question); input is text only; English is where accuracy is best; and rate limits (currently 250,000 tokens per second and 1,200 requests per minute) are adjusting as demand grows. Jev is not trained on customer data. Do maths, dates and exact lookups in code — they are free there, and they never drift.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="troubleshooting" level="Beginner" number={11}>When something goes wrong</SectionHeading>
            <div className="!my-8 overflow-x-auto rounded-[var(--radius)] border border-[var(--border)]">
              <table className="w-full text-[13.5px] border-collapse">
                <thead>
                  <tr className="bg-[var(--paper-tint)] text-left">
                    <th className="px-3.5 py-2.5 font-semibold text-[var(--text-primary)]">Symptom</th>
                    <th className="px-3.5 py-2.5 font-semibold text-[var(--text-primary)]">Likely cause</th>
                    <th className="px-3.5 py-2.5 font-semibold text-[var(--text-primary)]">Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {TROUBLE.map((r) => (
                    <tr key={r.s} className="border-t border-[var(--border)] align-top">
                      <td className="px-3.5 py-2.5 font-medium text-[var(--text-primary)]">{r.s}</td>
                      <td className="px-3.5 py-2.5 text-[var(--text-secondary)]">{r.c}</td>
                      <td className="px-3.5 py-2.5 text-[var(--text-secondary)]">{r.f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              And the most common <em>thinking</em> mistake: reading a Noul of 0.5 as “half true”. It means Jev can’t tell. For “how much”, use a Score. For “which one”, use a Choice. For “is it true”, use a Noul — and read it as a probability.
            </p>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="first-week" level="Beginner" number={12}>Your first week</SectionHeading>
            <p>You don’t need all five ways on day one. Here is a path that builds up one habit at a time:</p>
            <Figure number={15} caption="Seven days from a first Playground run to a tuned integration.">
              <WeekPath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "Can you set Claude Code’s model to Jev?", a: "No. Jev doesn’t generate text or code. You use it alongside Claude: Claude Code can write code that calls Jev (Way 1), call it as a tool (Way 2), or be guarded by it (Way 3)." },
                { q: "Why does the Bash guard hook only ever return “ask”, never “allow”?", a: "Because a model’s judgment should add friction, not remove it. If Jev is wrong, the worst case is an extra confirmation; Claude Code’s normal permission rules still apply to everything else." },
                { q: "Your router’s Jev call times out. What should happen?", a: "The message goes to Claude exactly as it did before you added Jev. Fail open: routing is an optimisation, never a dependency." },
                { q: "A draft scores 1.92 out of 2 for tone. Is it safe to send?", a: "Not on that basis. Tone and truth are separate questions. In our real run, a 1.92-tone draft failed both the policy and the facts checks." },
                { q: "A check returns 0.56 on a borderline draft. What now?", a: "It means “can’t tell”. Sharpen the question and test again on good, bad and borderline examples — and decide deliberately whether such cases go to a person." },
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

            <p className="!mt-10">
              Claude thinks. Jev judges. Code decides. Put the receptionist at the front desk, keep the specialist for the work only a specialist can do, and write the rules between them where you can read them. That’s the whole trick — and now you have five ways to do it. ⚡🧠
            </p>
            <p>
              New to Claude itself? Start with our <Link href={`/${claude.slug}`}>guide to using Claude</Link>. New to Jev? Read <Link href={`/${basics.slug}`}>TypeSafe and Jev</Link> first — this article builds on it.
            </p>

            <References slug={article.slug} />

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              TypeSafe and Jev are products of TypeSafe AI; Claude, Claude Code and Claude Desktop are products of Anthropic. This article is independent and not affiliated with or endorsed by either. API shapes, SDK versions, prices, limits and the agent-skill commands follow <a href={DOCS} rel="noopener">docs.typesafe.ai</a>; hook behaviour follows Claude Code’s hooks documentation; both were read on 28 September 2026. Probabilities, token counts and latencies are from real runs on that date and will differ on yours. The MCP server, the hook and <code>/jev-check</code> are our own examples, not official TypeSafe or Anthropic tools. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
          <Link href={`/${basics.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:text-right">
            <p className="flex sm:justify-end items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              The basics first <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{basics.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
