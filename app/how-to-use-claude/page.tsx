import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { ClaudeChooser } from "@/components/figures/ClaudeChooser";
import {
  ArtifactMock,
  CachingDiagram,
  ChromeMock,
  ClaudeAiTour,
  ClaudeTimeline,
  CodeConfigTree,
  CodeLoop,
  ConstitutionFlow,
  LearningPath,
  McpDiagram,
  ModelLineup,
  PhoneMock,
  ProjectAnatomy,
  SurfaceChooser,
  SurfacesMap,
  TerminalMock,
  XmlPrompt,
} from "@/components/figures/claude-guide";

const article = getArticle("how-to-use-claude") as Article;
const previous = getArticle("chatgpt-101") as Article;
const next = getArticle("google-gemini-101") as Article;
const first = getArticle("welcome-to-the-world-of-ai") as Article;
const path = `/${article.slug}`;

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
  { name: "How to use Claude", path },
];

const TOC = [
  { id: "what-is-claude", label: "What is Claude?" },
  { id: "history", label: "Anthropic’s story" },
  { id: "constitution", label: "How Claude is shaped" },
  { id: "models", label: "The model family" },
  { id: "doors", label: "Every way to use Claude" },
  { id: "web", label: "Step by step: the web" },
  { id: "projects-artifacts", label: "Projects and Artifacts" },
  { id: "desktop-mobile", label: "Desktop and mobile" },
  { id: "chrome", label: "Claude in Chrome" },
  { id: "prompting", label: "Prompting Claude well" },
  { id: "claude-code", label: "Claude Code in the terminal" },
  { id: "mcp", label: "MCP and connectors" },
  { id: "api", label: "The Claude API" },
  { id: "safety", label: "Privacy and good habits" },
  { id: "plan", label: "Your 30-day path" },
];

const CODE_COMMANDS: [string, string][] = [
  ["claude", "Start a session in the current folder"],
  ["/init", "Scan the project and write a CLAUDE.md memory file"],
  ["Shift + Tab", "Cycle modes, including plan mode (think and propose, no edits)"],
  ["@path/to/file", "Point Claude at a specific file in your message"],
  ["Esc", "Interrupt Claude mid-task and redirect it"],
  ["/model", "Switch model"],
  ["/clear", "Start fresh when you change task"],
  ["/mcp", "See and manage connected MCP servers"],
  ["claude -c", "Continue your most recent conversation"],
  ['claude -p "…"', "Run once without the interactive screen — for scripts and CI"],
];

const PY_BASIC = `import anthropic

client = anthropic.Anthropic()  # reads your ANTHROPIC_API_KEY

message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    system="You are a friendly science tutor for Class 8 students in India.",
    messages=[
        {"role": "user", "content": "Why is the sky blue? Suggest a simple home experiment."}
    ],
)

# A reply can hold several blocks (thinking, then text) — print the text.
for block in message.content:
    if block.type == "text":
        print(block.text)`;

const CURL = `curl https://api.anthropic.com/v1/messages \\
  -H "content-type: application/json" \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-opus-5-5",
    "max_tokens": 16000,
    "messages": [{"role": "user", "content": "Give me 3 names for a tea shop in Assam."}]
  }' | jq -r '.content[] | select(.type == "text") | .text'`;

const PY_JSON = `import json

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    messages=[{
        "role": "user",
        "content": "Review: 'Room was spotless but the Wi-Fi kept dropping.'",
    }],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "sentiment": {"type": "string", "enum": ["positive", "negative", "mixed"]},
                    "issues": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["sentiment", "issues"],
                "additionalProperties": False,
            },
        }
    },
)

text = next(b.text for b in response.content if b.type == "text")
print(json.loads(text))  # {'sentiment': 'mixed', 'issues': ['Wi-Fi drops']}`;

const PY_CACHE = `response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    system=[{
        "type": "text",
        "text": HR_HANDBOOK,                     # the same long text every time
        "cache_control": {"type": "ephemeral"},  # cache everything up to here
    }],
    messages=[{"role": "user", "content": "How many days of paternity leave do I get?"}],
)
print(response.usage.cache_read_input_tokens)   # > 0 on later calls = cache hit`;

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

export default function HowToUseClaude() {
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
          datePublished: article.published,
          dateModified: article.updated,
          inLanguage: "en",
          proficiencyLevel: "Beginner to Expert",
          keywords: article.tags.join(", "),
          timeRequired: `PT${article.readingMinutes}M`,
          about: { "@type": "SoftwareApplication", name: "Claude", applicationCategory: "AI assistant", publisher: { "@type": "Organization", name: "Anthropic" } },
          isPartOf: { "@type": "CreativeWorkSeries", name: article.series, url: abs("/") },
          author: { "@type": "Person", ...AUTHOR },
          publisher: { "@id": ORG_ID },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────────*/}
      <header className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} tone="stage" />
          <p className="eyebrow mb-4" style={{ color: "var(--stage-text-tertiary)" }}>
            {article.series} · Article 3
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            How to use <span className="msrx-gradient-text">Claude</span>: web, desktop, mobile, terminal and API
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
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mb-2">How to read this</p>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-3">
              New to Claude? The green sections take you from sign-up to confident daily use on any device. Power users: jump to Projects, Chrome and prompting. Developers: Claude Code, MCP and the API are the red sections at the end.
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
              Claude is the AI you can chat with in a browser, talk to on your phone, hand a chore to in Chrome — and, if you write software, let loose on your codebase from the terminal. It is one of the most capable AI systems in the world, and one of the most interesting to learn, because it shows up in so many places.
            </p>
            <p>
              This guide covers all of them. We start with who makes Claude and how it is trained, choose between its models, and then walk through each way of using it step by step: the web, desktop and mobile apps, Projects and Artifacts, Claude in Chrome, Claude Code in the terminal, the Model Context Protocol, and finally the Claude API in code.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>Claude changes quickly. This guide checked model names and prices against Anthropic’s documentation on the day it was published, and marks every interface screen as an illustration. For today’s plans, see <a href="https://claude.com/pricing" rel="noopener">claude.com/pricing</a>. Coming from ChatGPT? Our previous article, <Link href={`/${previous.slug}`}>ChatGPT 101</Link>, covers ideas that apply to both.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-claude" level="Beginner" number={1}>What is Claude?</SectionHeading>
            <p>
              <strong>Claude is a family of AI models made by Anthropic, and the assistant you talk to that runs on them.</strong> You write or speak in ordinary language; Claude writes back. It reads documents and images, searches the web, builds charts and small apps, works through spreadsheets, and writes and runs code.
            </p>
            <p>
              Under the hood Claude is a <em>large language model</em>: a neural network trained on a huge amount of text to predict what comes next, then trained further to be a helpful, honest assistant. (Our first article, <Link href={`/${first.slug}`}>Welcome to the world of AI</Link>, explains that process from scratch.)
            </p>
            <Callout kind="eli5">
              <p>Imagine a very well-read colleague who never gets tired, explains things as many times as you need, and is careful to say when they’re unsure. You still check their important work — but you’ll wonder how you managed without them.</p>
            </Callout>
            <Figure number={1} caption="One family of models, many doors. Your account works across the web, desktop and mobile apps; developers reach the same models through Claude Code and the API." wide>
              <SurfacesMap />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>Anthropic’s story</SectionHeading>
            <p>
              Anthropic was founded in 2021 by a group of former OpenAI researchers who wanted to build frontier AI with safety research at the centre. Claude is its product and, in a sense, its argument: that an AI can be both very capable and trustworthy.
            </p>
            <Figure number={2} caption="Milestones from Anthropic’s founding to today’s Claude 5 family. Only the major releases are shown.">
              <ClaudeTimeline />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="constitution" level="Intermediate" number={3}>How Claude is shaped: Constitutional AI</SectionHeading>
            <p>
              Most assistants are tuned with human feedback: people rate answers, and the model learns to give the kind they prefer. Anthropic added a twist it calls <strong>Constitutional AI</strong>. Claude is also guided by a written set of principles — a “constitution” — about being helpful, honest and avoiding harm. During training the model critiques and revises its own answers against those principles, and AI feedback based on them is used alongside human feedback.
            </p>
            <Figure number={3} caption="The core loop of Constitutional AI, simplified. Anthropic publishes Claude’s constitution so anyone can read the principles.">
              <ConstitutionFlow />
            </Figure>
            <p>
              You will notice the results in everyday use. Claude tends to tell you when it is unsure, points out problems with a plan instead of flattering it, explains why it will not help with something harmful, and pushes back politely when you are wrong.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="models" level="Intermediate" number={4}>The model family</SectionHeading>
            <p>
              Claude comes in sizes. Anthropic’s long-standing naming runs from small to large, like poetry: <strong>Haiku</strong> (short and fast), <strong>Sonnet</strong> (balanced) and <strong>Opus</strong> (a major work). The Claude 5 family adds <strong>Fable</strong> for the most demanding work. In the apps you pick a model from a menu; in the API you name it in code.
            </p>
            <Figure number={4} caption="The current lineup as listed in Anthropic’s models overview on 24 September 2026, with API prices per million tokens. In the apps, your plan decides which models you can use." wide>
              <ModelLineup />
            </Figure>
            <p>
              All current Claude models read images as well as text. The larger ones can hold about <strong>a million tokens</strong> in their context window — hundreds of thousands of words, enough for several books or a sizeable codebase in one conversation. Newer models also <strong>think adaptively</strong>: they decide for themselves how long to reason before answering, and developers can steer that with an <em>effort</em> setting.
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="doors" level="Beginner" number={5}>Every way to use Claude</SectionHeading>
            <p>Which door you use depends on what you want to do. Here is the whole map at a glance, then an interactive helper.</p>
            <Figure number={5} caption="Where to start for each kind of task. Access notes reflect Anthropic’s plan pages at the time of writing.">
              <SurfaceChooser />
            </Figure>
            <div className="!my-8">
              <ClaudeChooser />
            </div>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="web" level="Beginner" number={6}>Step by step: Claude on the web</SectionHeading>
            <Figure number={6} caption="From zero to a useful answer in a few minutes.">
              <FlowSteps
                steps={[
                  { icon: "🌐", title: "Go to claude.ai", body: "in any modern browser", tone: "c" },
                  { icon: "👤", title: "Sign up", body: "with email or a Google account", tone: "c" },
                  { icon: "⚙️", title: "Set preferences", body: "tell it about you, once", tone: "v" },
                  { icon: "💬", title: "Ask", body: "a real task, in plain words", tone: "a" },
                  { icon: "🔁", title: "Refine", body: "reply until it’s right", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Open claude.ai</strong> and create a free account with your email or a Google account.</li>
              <li><strong>Tell Claude about yourself.</strong> In <em>Settings</em>, add a line or two about who you are and how you like answers — for example, “I’m a teacher; keep things practical and use Indian examples.” Claude takes this into account in every chat.</li>
              <li><strong>Learn the screen.</strong> It has only a handful of parts:</li>
            </ol>
            <Figure number={7} caption="An illustrated map of claude.ai. Layouts change between updates, but these parts stay." wide>
              <ClaudeAiTour />
            </Figure>
            <ol start={4}>
              <li><strong>Ask for something real</strong>, then keep the conversation going: “shorter”, “more formal”, “give me three options”, “now as a table”. Each reply builds on everything before.</li>
              <li><strong>Drop in files.</strong> Drag a PDF, spreadsheet, photo or screenshot into the message box and ask about it.</li>
              <li><strong>Use Research</strong> (on paid plans) when you need a proper answer from many sources: Claude searches for several minutes and returns a report with citations.</li>
            </ol>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="projects-artifacts" level="Intermediate" number={7}>Projects and Artifacts</SectionHeading>
            <h3>Artifacts: Claude builds things beside the chat</h3>
            <p>
              Ask for a document, a diagram, a chart or a small interactive tool and Claude creates an <strong>Artifact</strong> — a finished piece of work shown in a panel next to the conversation. You can keep chatting to change it, copy it, download it or publish it to share.
            </p>
            <Figure number={8} caption="Illustration: asking for a budget planner produces an interactive Artifact you can adjust, copy or share." wide>
              <ArtifactMock />
            </Figure>
            <h3>Projects: a workspace for one subject</h3>
            <p>
              A <strong>Project</strong> bundles files and instructions so you do not have to repeat them. Upload your syllabus, company handbook or research papers once, add a few lines of instructions, and every chat in that Project can draw on them.
            </p>
            <Figure number={9} caption="What a Project holds. One Project per course, client, book or trip works well.">
              <ProjectAnatomy />
            </Figure>
            <Callout kind="tip">
              <p>Two more features worth switching on: <strong>memory</strong>, so Claude can recall useful context from past chats (you can view and edit what it remembers), and <strong>styles</strong>, which change how Claude writes — concise, explanatory, formal, or a custom style learned from a sample of your writing.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="desktop-mobile" level="Beginner" number={8}>Claude on desktop and mobile</SectionHeading>
            <p>
              <strong>Desktop.</strong> Download the Claude app for Mac or Windows from <code>claude.com/download</code>. It has everything the website has, plus a keyboard shortcut to summon Claude from anywhere, access to local connectors on your computer, and a built-in way to use Claude Code without a terminal.
            </p>
            <p>
              <strong>Mobile.</strong> Install the official Claude app by Anthropic from the App Store or Google Play and sign in with the same account; your chats sync everywhere. The phone is where two features shine: the <strong>camera</strong> (photograph a notice, a plant, a maths problem, a menu in another language) and <strong>voice mode</strong>, a spoken conversation that is great for language practice, interview rehearsal, or thinking aloud on a walk.
            </p>
            <Figure number={10} caption="Illustrations of the mobile app: asking about a photo, and voice mode.">
              <PhoneMock />
            </Figure>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="chrome" level="Intermediate" number={9}>Claude in Chrome</SectionHeading>
            <p>
              <strong>Claude in Chrome</strong> is a browser extension that puts Claude in a side panel. It can see the page you are on, and — with your permission — click, type and navigate to get things done: compare products across tabs, fill in a long form, pull figures out of a dashboard, or tidy a to-do list in a web app.
            </p>
            <Figure number={11} caption="Illustration: Claude working through a train search in a side panel and stopping to ask before anything important.">
              <ChromeMock />
            </Figure>
            <Callout kind="warn">
              <p><strong>Stay in charge of anything irreversible.</strong> Let Claude prepare, but make payments, send messages and enter passwords yourself. Be careful on sites you do not trust: a web page can contain hidden instructions aimed at AI assistants, and a good agent — and a careful user — treats page content as information, not orders.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="prompting" level="Intermediate" number={10}>Prompting Claude well</SectionHeading>
            <p>
              Everything from <Link href={`/${previous.slug}#prompting`}>the six ingredients in ChatGPT 101</Link> applies: role, task, context, format, examples and limits. Three habits work especially well with Claude:
            </p>
            <ol>
              <li><strong>Be explicit and give the reason.</strong> Current Claude models follow instructions closely. “Keep it under 100 words — it’s for a phone notification” beats “be brief”, because Claude can use the reason to make better choices.</li>
              <li><strong>Structure long prompts with XML-style tags.</strong> Wrapping pasted material in labelled tags such as <code>&lt;document&gt;</code> and <code>&lt;task&gt;</code> makes clear what is material and what is instruction.</li>
              <li><strong>Put long documents first and your question last.</strong> With big inputs, leading with the material and ending with the ask tends to give better answers.</li>
            </ol>
            <Figure number={12} caption="A structured prompt. The tags have no special meaning to the software; they simply make the prompt unambiguous.">
              <XmlPrompt />
            </Figure>
            <Callout kind="deep">
              <p>Why tags help: a language model sees your prompt as one long stream of tokens. Clear delimiters stop pasted text — which may itself contain instructions — being confused with your actual request, and they let you refer to parts precisely: “quote only from <code>&lt;agreement&gt;</code>”. Developers use the same trick in system prompts.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="claude-code" level="Advanced" number={11}>Claude Code: Claude in your terminal</SectionHeading>
            <p>
              <strong>Claude Code</strong> is Anthropic’s agentic coding tool. Instead of pasting code into a chat, you run Claude inside your project. It reads your files, searches the codebase, edits code, runs commands and tests, and works through multi-step tasks — asking your permission before anything risky. It runs in the terminal, in VS Code and JetBrains IDEs, in the desktop app and on the web.
            </p>
            <h3>Install and start</h3>
            <p>Claude Code needs a Pro, Max, Team or Enterprise plan, or an API (Console) account. On macOS, Linux or WSL:</p>
            <Code title="Terminal — install Claude Code" code={`curl -fsSL https://claude.ai/install.sh | bash

# or with Homebrew
brew install --cask claude-code

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

cd ~/projects/my-app
claude          # first run opens your browser to log in`} />
            <p className="!mt-4">Then just describe what you want. A typical session looks like this:</p>
            <Figure number={13} caption="Illustration of a Claude Code session: investigate, explain, edit, ask permission, test, report." wide>
              <TerminalMock />
            </Figure>
            <h3>How it works</h3>
            <p>
              Claude Code is an <strong>agent</strong>: the model runs in a loop with tools for reading, searching, editing and running commands. Each turn it looks at the results of its last action and decides the next one, until the job is done or it needs you.
            </p>
            <Figure number={14} caption="The agent loop. Permission modes decide which actions need your approval; plan mode lets Claude investigate and propose before touching anything.">
              <CodeLoop />
            </Figure>
            <h3>Commands worth knowing</h3>
            <div className="overflow-x-auto">
              <table>
                <tbody>
                  {CODE_COMMANDS.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row"><code>{k}</code></th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Teach it your project</h3>
            <p>
              The single most useful thing you can do is keep a good <code>CLAUDE.md</code>: a short file of how to build, test and style this codebase, and the traps to avoid. Claude reads it at the start of every session. Beyond that, a few files let you shape Claude Code for your team:
            </p>
            <Figure number={15} caption="Where Claude Code’s configuration lives. Commit the project files so the whole team gets the same setup.">
              <CodeConfigTree />
            </Figure>
            <Callout kind="tip" title="Habits of effective Claude Code users">
              <p>Start big tasks in plan mode and read the plan before approving. Give it a way to check its own work — tests, a type-checker, a screenshot. Keep tasks focused and <code>/clear</code> between them. Review diffs before you commit, just as you would a colleague’s.</p>
            </Callout>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="mcp" level="Advanced" number={12}>MCP and connectors</SectionHeading>
            <p>
              Claude becomes far more useful when it can reach your tools and data. The <strong>Model Context Protocol (MCP)</strong>, an open standard Anthropic introduced in November 2024 and now supported widely across the industry, is a common plug for exactly that. Someone writes an MCP <em>server</em> for a tool once — GitHub, Google Drive, a database, Slack — and any MCP-capable app can use it.
            </p>
            <Figure number={16} caption="MCP in one picture: one protocol between Claude and many tools.">
              <McpDiagram />
            </Figure>
            <p>
              In the Claude apps these appear as <strong>connectors</strong> you switch on in settings — Google Drive, Gmail, Google Calendar, Microsoft 365 and many more. In Claude Code you add servers with <code>claude mcp add</code> or a <code>.mcp.json</code> file. Only connect servers you trust: an MCP server can act with whatever access you give it.
            </p>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="api" level="Advanced" number={13}>The Claude API</SectionHeading>
            <p>
              To build Claude into your own product, use the <strong>Claude API</strong>. Everything goes through one endpoint, <code>POST /v1/messages</code>: you send a list of messages and optional system instructions, and get Claude’s reply. Create an API key at <code>platform.claude.com</code>, set it as <code>ANTHROPIC_API_KEY</code>, and install the SDK with <code>pip install anthropic</code> (official SDKs also exist for TypeScript, Java, Go, Ruby, C# and PHP).
            </p>
            <Figure number={17} caption="A first call with the official Python SDK. Current models may return a thinking block before the text, so the loop prints only text blocks.">
              <Code title="first_call.py — Python" code={PY_BASIC} />
            </Figure>
            <p>The same request with <code>curl</code>, using <code>jq</code> to pull out the text:</p>
            <Code title="Terminal — curl" code={CURL} />
            <h3 className="!mt-10">Guaranteed JSON with structured outputs</h3>
            <p>
              When your code needs data rather than prose, set <code>output_config.format</code> to a JSON Schema. Claude’s reply is then guaranteed to parse and match it.
            </p>
            <Figure number={18} caption="Structured outputs: the reply must match the schema. The final comment shows a sample result.">
              <Code title="classify.py — Python" code={PY_JSON} />
            </Figure>
            <h3>Save money and time with prompt caching</h3>
            <p>
              Many apps send the same long instructions or documents on every request. <strong>Prompt caching</strong> stores that unchanging beginning so later requests reuse it: cache reads cost a small fraction of normal input and come back faster.
            </p>
            <Figure number={19} caption="Caching matches from the start of the request, so put stable content first and the changing question last.">
              <CachingDiagram />
            </Figure>
            <Code title="cached.py — Python" code={PY_CACHE} />
            <h3 className="!mt-10">Where to go next</h3>
            <ul>
              <li><strong>Tool use:</strong> describe your functions with JSON Schema; Claude decides when to call them and you run them and return the results — the same loop Claude Code uses.</li>
              <li><strong>Built-in server tools:</strong> web search, web fetch and code execution run on Anthropic’s side, with no loop to write.</li>
              <li><strong>Effort:</strong> <code>output_config.effort</code> trades depth of thinking for speed and cost, from <code>low</code> to <code>max</code>.</li>
              <li><strong>Batches:</strong> send large offline jobs at half the price.</li>
              <li><strong>Your cloud:</strong> the same models are available through Amazon Bedrock, Google Cloud and Microsoft Foundry.</li>
            </ul>
            <Callout kind="warn">
              <p><strong>Keep API keys on a server.</strong> Never put one in a website’s front-end code or a mobile app, where anyone can extract it. Set a spending limit in the Console before you experiment, and test with a set of realistic examples whenever you change a prompt or model.</p>
            </Callout>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="safety" level="Beginner" number={14}>Privacy and good habits</SectionHeading>
            <ul>
              <li><strong>Check important facts.</strong> Claude is careful, but it can still be wrong. Use search or Research for anything current, and open the sources that matter.</li>
              <li><strong>Mind what you share.</strong> Don’t paste passwords, card numbers or ID numbers. Review the privacy settings, including whether your chats may be used to improve models, and use incognito chats for one-off sensitive questions.</li>
              <li><strong>Review memory and connectors</strong> from time to time, and disconnect what you no longer use.</li>
              <li><strong>At work, follow your organisation’s policy.</strong> Team and Enterprise plans have their own data terms and admin controls.</li>
              <li><strong>Let it teach, not replace.</strong> For study, ask Claude to quiz you and explain your mistakes; you will learn far more than from a finished answer.</li>
            </ul>

            {/* ── 15 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={15}>Your 30-day path</SectionHeading>
            <p>Four weeks of small steps, from first chat to first line of code.</p>
            <Figure number={20} caption="A month-long path through every way of using Claude. Skip ahead wherever you are already comfortable." wide>
              <LearningPath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is the difference between Claude in Chrome and Claude Code?", a: "Claude in Chrome works on web pages in your browser — reading, clicking and filling forms. Claude Code works on your software projects — reading and editing files and running commands in a terminal, IDE, desktop app or on the web." },
                { q: "You keep uploading the same syllabus to new chats. What should you use instead?", a: "A Project: upload the files and instructions once, and every chat in the Project can use them." },
                { q: "Why put a long document before your question when prompting?", a: "With large inputs, placing the material first and the question last tends to produce better answers, and tags such as <document> make clear which part is material and which is instruction." },
                { q: "In prompt caching, why must the unchanging content come first?", a: "The cache matches from the start of the request. Anything that changes early — a timestamp, a user’s name — breaks the match for everything after it." },
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
              That is Claude from the first chat to the first API call. Pick the door that matches what you need today, try one real task, and build from there. ✳️
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              Claude and Claude Code are products of Anthropic; this article is independent and not affiliated with or endorsed by Anthropic. Model names, IDs and API prices follow Anthropic’s models overview, and install commands follow the Claude Code documentation, both as of 24 September 2026. Interface screens are illustrations and sample outputs are examples. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
