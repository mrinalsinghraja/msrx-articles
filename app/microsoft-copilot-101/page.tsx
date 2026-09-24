import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { PermissionDemo } from "@/components/figures/PermissionDemo";
import {
  CopilotAppTour,
  CopilotFamily,
  CopilotPath,
  CopilotTimeline,
  GcsePrompt,
  HomePlans,
  OfficeTrio,
  OrchestrationFlow,
  OversharingRisk,
  StudioAgent,
  VsCodeMock,
  WorkLicences,
} from "@/components/figures/copilot-guide";

const article = getArticle("microsoft-copilot-101") as Article;
const previous = getArticle("google-gemini-101") as Article;
const chatgpt = getArticle("chatgpt-101") as Article;
const claude = getArticle("how-to-use-claude") as Article;
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
  { name: "Microsoft Copilot 101", path },
];

const TOC = [
  { id: "what-is-copilot", label: "What is Copilot?" },
  { id: "history", label: "Microsoft’s AI story" },
  { id: "how-it-works", label: "How Copilot works" },
  { id: "get-started", label: "Getting started at home" },
  { id: "windows-edge-mobile", label: "Windows, Edge and mobile" },
  { id: "office", label: "Copilot in Office apps" },
  { id: "work", label: "Copilot at work" },
  { id: "prompting", label: "Prompting with GCSE" },
  { id: "permissions", label: "Permissions and privacy" },
  { id: "agents", label: "Agents and Copilot Studio" },
  { id: "github", label: "GitHub Copilot" },
  { id: "foundry", label: "Building with Foundry" },
  { id: "plans", label: "Which plan?" },
  { id: "plan", label: "Your 30-day path" },
];

const PY_FOUNDRY = `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# From your Foundry project's overview page
FOUNDRY_PROJECT_ENDPOINT = "https://<resource>.services.ai.azure.com/api/projects/<project>"

project = AIProjectClient(
    endpoint=FOUNDRY_PROJECT_ENDPOINT,
    credential=DefaultAzureCredential(),   # uses your 'az login' session
)
openai = project.get_openai_client()

response = openai.responses.create(
    model="gpt-5-mini",   # the name of a model you deployed in Foundry
    input="Write a friendly 2-line reminder about Friday's fire drill.",
)
print(response.output_text)`;

const AGENT_JSON = `{
  "name": "Policy Buddy",
  "description": "Answers questions about our HR and travel policies.",
  "instructions": "You help employees of Contoso India understand HR and travel policies. Answer only from the policy documents. Quote the section you used. If the policies don't cover it, say so and suggest emailing hr@contoso.example.",
  "capabilities": [
    {
      "name": "OneDriveAndSharePoint",
      "items_by_url": [
        { "url": "https://contoso.sharepoint.com/sites/HR/Policies" }
      ]
    }
  ],
  "conversation_starters": [
    { "title": "Leave", "text": "How many casual leaves do I get this year?" },
    { "title": "Travel", "text": "What is the hotel limit for a trip to Mumbai?" }
  ]
}`;

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

export default function MicrosoftCopilot101() {
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
          about: { "@type": "SoftwareApplication", name: "Microsoft Copilot", applicationCategory: "AI assistant", publisher: { "@type": "Organization", name: "Microsoft" } },
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
            {article.series} · Article 5
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">Microsoft Copilot 101</span>: from your first chat to building agents
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
              Using Copilot at home? The green sections get you going on Windows, your phone and in Word and Excel. Using it at work? Read the amber sections on grounding, GCSE prompts and permissions. Developers and IT: agents, GitHub Copilot and Foundry are in red at the end.
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
              There is a good chance Copilot is already on your computer. It sits in the Windows taskbar, in the Edge browser, inside Word and Outlook, in Teams meetings — and, for programmers, inside their code editor. Microsoft has put its AI assistant almost everywhere people work.
            </p>
            <p>
              That reach is Copilot’s superpower and its biggest source of confusion, because “Copilot” is not one product but a family. This guide untangles it. We start with the story and the idea behind the name, then learn how Copilot actually finds its answers, get started at home step by step, go through Office and work use, and finish with the builder’s side: agents, GitHub Copilot and Microsoft Foundry.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>Microsoft renames and repackages Copilot often. Licence tiers and features here come from Microsoft Learn, Microsoft’s plan pages and GitHub Docs, checked on the day of publishing; all screens are illustrations. The prompting ideas from our <Link href={`/${chatgpt.slug}`}>ChatGPT</Link> and <Link href={`/${claude.slug}`}>Claude</Link> guides apply here too.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-copilot" level="Beginner" number={1}>What is Copilot?</SectionHeading>
            <p>
              <strong>Copilot is Microsoft’s name for its AI assistants.</strong> The name is the idea: an aircraft’s co-pilot helps the pilot fly, but the pilot stays in command. Copilot drafts, summarises, analyses and suggests; you decide what to keep.
            </p>
            <p>
              There are four main members of the family, and which one you use depends on who you are and what account you sign in with:
            </p>
            <Figure number={1} caption="The Copilot family. Same name, same idea, different jobs — and different sign-ins: a personal Microsoft account at home, a work account on the job, a GitHub account for code." wide>
              <CopilotFamily />
            </Figure>
            <Callout kind="eli5">
              <p>Think of Copilot as one helpful assistant with four different ID badges. The home badge helps you plan trips and fix your Excel budget. The work badge can look through your office email and files — but only the ones you’re allowed to see. The developer badge writes code. The builder badge lets you create new assistants of your own.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>Microsoft’s AI story</SectionHeading>
            <p>
              Microsoft did not build the first Copilot models itself. Its big bet was a partnership with OpenAI, the maker of ChatGPT, starting in 2019: Microsoft’s Azure cloud provided the computing power, and Microsoft got to build OpenAI’s models into its products. Today Copilot uses models from several makers, including OpenAI, Anthropic and Microsoft’s own MAI team.
            </p>
            <Figure number={2} caption="From Cortana to agents. Only the major milestones are shown.">
              <CopilotTimeline />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how-it-works" level="Intermediate" number={3}>How Copilot works</SectionHeading>
            <p>
              At the core of every Copilot is a large language model — the same kind of technology behind ChatGPT, Claude and Gemini. What makes Microsoft 365 Copilot different is what happens <em>around</em> the model. Before the model writes a word, an <strong>orchestrator</strong> gathers relevant material from your work world, a step called <strong>grounding</strong>.
            </p>
            <Figure number={3} caption="How Microsoft 365 Copilot answers a work question, simplified from Microsoft’s documentation. The permission step is the one that matters most to your company." wide>
              <OrchestrationFlow />
            </Figure>
            <p>
              <strong>Microsoft Graph</strong> is the map of your work: your emails, files, meetings, chats, calendar and colleagues. <strong>Work IQ</strong> is Microsoft’s intelligence layer that lets Copilot and agents reason over that organisational knowledge, and the <strong>semantic index</strong> finds content by meaning, so “the Pune expansion deck” can match a file called “West-region growth v3”. Crucially, all of it is <strong>security-trimmed</strong>: Copilot only sees what you, personally, already have permission to open.
            </p>
            <Callout kind="deep">
              <p>This is a textbook example of <strong>retrieval-augmented generation (RAG)</strong> at enterprise scale. The model itself doesn’t “know” your company; the orchestrator retrieves permitted content at question time and places it in the prompt, then the answer cites it. Copilot also chooses among models: a real-time router picks a fast model for routine asks and a deeper reasoning model (“Think deeper”) for complex ones, unless you choose yourself.</p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="get-started" level="Beginner" number={4}>Getting started at home, step by step</SectionHeading>
            <Figure number={4} caption="From zero to your first useful answer.">
              <FlowSteps
                steps={[
                  { icon: "🌐", title: "Open Copilot", body: "copilot.microsoft.com or the Copilot app", tone: "c" },
                  { icon: "👤", title: "Sign in", body: "with a personal Microsoft account", tone: "c" },
                  { icon: "💬", title: "Ask", body: "a real task in plain words", tone: "v" },
                  { icon: "🎙️", title: "Try voice", body: "talk it through out loud", tone: "a" },
                  { icon: "🔁", title: "Refine", body: "“shorter”, “as a table”", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Open Copilot</strong> at <code>copilot.microsoft.com</code>, or open the Copilot app on Windows, Mac, iPhone or Android.</li>
              <li><strong>Sign in with a personal Microsoft account</strong> (the one for Outlook.com, Xbox or OneDrive). This saves your conversations and unlocks more features. At work, sign in with your work account instead — it gives you the protected work version.</li>
              <li><strong>Learn the screen</strong> — it is deliberately simple:</li>
            </ol>
            <Figure number={5} caption="An illustrated map of the consumer Copilot app. Microsoft redesigns it often, but these parts stay." wide>
              <CopilotAppTour />
            </Figure>
            <ol start={4}>
              <li><strong>Ask for something real</strong> — a meal plan, an explanation of a confusing letter, a message you’re struggling to write — and keep refining with follow-ups.</li>
              <li><strong>Use Think deeper</strong> for hard problems such as comparing loan offers or planning a complex itinerary. It is slower but checks its own work.</li>
              <li><strong>Turn to Pages</strong> when a chat produces something worth keeping: a Page is an editable document you and Copilot can keep improving and share with others.</li>
            </ol>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="windows-edge-mobile" level="Beginner" number={5}>Copilot on Windows, in Edge and on your phone</SectionHeading>
            <ul>
              <li><strong>Windows.</strong> Press the <strong>Copilot key</strong> on newer keyboards, or click Copilot on the taskbar. With <strong>Copilot Vision</strong> you can share a window or your screen and ask about what’s on it: “why is this Excel formula giving #REF?”, “which of these settings turns off notifications?”</li>
              <li><strong>Edge.</strong> The Copilot button summarises the page you’re reading, compares products across tabs and answers questions about a PDF open in the browser. Copilot Mode in Edge goes further, helping with multi-step tasks across tabs — with your permission.</li>
              <li><strong>Phone.</strong> Install the Copilot app for iPhone or Android. The camera is the highlight: point it at a plant, a restaurant menu in Marathi, or a maths problem and ask away. Voice conversations are natural enough for language practice.</li>
            </ul>
            <Callout kind="tip">
              <p>On a <strong>Copilot+ PC</strong> — laptops with a special AI chip, called an NPU — some AI features run on the device itself, such as live captions with translation and Windows search that understands descriptions like “photo of a blue sari at a wedding”.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="office" level="Beginner" number={6}>Copilot in Word, Excel, PowerPoint and Outlook</SectionHeading>
            <p>
              With a Microsoft 365 Personal, Family or Premium subscription at home — or a work licence — a Copilot button appears inside the Office apps themselves. This is where Copilot saves the most time, because it works on the document you already have open.
            </p>
            <Figure number={6} caption="Illustrations of Copilot inside four apps: summarising in Word, spotting a trend in Excel, building a deck in PowerPoint, and recapping a Teams meeting." wide>
              <OfficeTrio />
            </Figure>
            <ul>
              <li><strong>Word:</strong> draft from a few notes, rewrite a paragraph in a different tone, summarise a 40-page report, ask questions about the document.</li>
              <li><strong>Excel:</strong> ask questions of your data in plain words, get formulas explained or written, and generate charts and PivotTables. Keep data in a proper table for best results.</li>
              <li><strong>PowerPoint:</strong> create a deck from a prompt or from a Word document, then restyle, add slides, or summarise someone else’s presentation.</li>
              <li><strong>Outlook:</strong> summarise long threads, draft replies, and use coaching to check the tone and clarity of an important email before sending.</li>
            </ul>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="work" level="Intermediate" number={7}>Copilot at work: Chat and Microsoft 365 Copilot</SectionHeading>
            <p>
              At work, what you get depends on the licences your organisation has assigned. Microsoft Learn describes three levels:
            </p>
            <Figure number={7} caption="Work licence levels, from Microsoft Learn’s Microsoft 365 Copilot overview. Your IT team decides which you have." wide>
              <WorkLicences />
            </Figure>
            <p>
              Signed in with a work account, every level is covered by <strong>Enterprise Data Protection</strong>: prompts and responses get the same contractual protections as your company’s email in Exchange and files in SharePoint. With the full licence, Copilot can pull from your mail, files and meetings automatically — “what did the client say about pricing in last week’s calls?” — and use agents such as <strong>Researcher</strong>, for deep multi-source reports, and <strong>Analyst</strong>, for working through data.
            </p>
            <p>
              <strong>Teams</strong> is where many people first feel the difference: Copilot can summarise a meeting you missed, list the action items, and answer questions like “did anyone disagree with the launch date?”.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="prompting" level="Intermediate" number={8}>Prompting with GCSE</SectionHeading>
            <p>
              Microsoft teaches a four-part prompt recipe: <strong>Goal, Context, Source, Expectations</strong>. It is the same idea as the six ingredients in our <Link href={`/${chatgpt.slug}#prompting`}>ChatGPT guide</Link>, with one Copilot-specific twist — <em>Source</em> — because at work Copilot can reach your actual files.
            </p>
            <Figure number={8} caption="The GCSE prompt recipe with a worked example. Source is what turns a generic answer into one about your actual project.">
              <GcsePrompt />
            </Figure>
            <p>A few more habits that pay off:</p>
            <ul>
              <li><strong>Name the files.</strong> Type <code>/</code> to pick a document, email or meeting, rather than hoping Copilot finds the right one.</li>
              <li><strong>Check the citations.</strong> Hover over the little numbers to see which file each claim came from.</li>
              <li><strong>Iterate in the same chat</strong>: “make it shorter”, “add a table of risks”, “now write the email to the team”.</li>
              <li><strong>Save your best prompts.</strong> Microsoft’s Prompt Gallery has examples to adapt, and you can save your own.</li>
            </ul>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="permissions" level="Intermediate" number={9}>Permissions and privacy</SectionHeading>
            <p>
              The most important technical fact about Microsoft 365 Copilot is this: <strong>it can only see what you can see</strong>. Two people asking the same question can get different answers, because Copilot grounds each answer only in content that person already has access to. Try it:
            </p>
            <div className="!my-8">
              <PermissionDemo />
            </div>
            <p>
              That rule has a flip side. If a file is shared too widely — say, a salary sheet on a site “Everyone” can open — nobody may have noticed it for years. Copilot makes it easy to find. The fix is to tidy permissions, not to blame the AI.
            </p>
            <Figure number={9} caption="Oversharing: the real risk to fix before rolling out Copilot. Microsoft provides tools such as Purview labels and SharePoint Advanced Management for this.">
              <OversharingRisk />
            </Figure>
            <h3>Privacy checklist</h3>
            <ul>
              <li><strong>Use the right account.</strong> Work content belongs in Copilot signed in with your work account, where Enterprise Data Protection applies — not in your personal account.</li>
              <li><strong>At home,</strong> review Copilot’s privacy settings, including personalisation and memory, and delete conversations you don’t want kept.</li>
              <li><strong>Don’t share secrets</strong> such as passwords, card numbers or Aadhaar and passport numbers.</li>
              <li><strong>Check before you send.</strong> Copilot can be confidently wrong; verify numbers, names and dates in anything that leaves your hands.</li>
            </ul>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="agents" level="Advanced" number={10}>Agents and Copilot Studio</SectionHeading>
            <p>
              An <strong>agent</strong> is a focused version of Copilot with its own instructions, knowledge and actions — an HR policy helper, an IT help desk, a sales-proposal assistant. There are three ways to make one, from no code to full code:
            </p>
            <ol>
              <li><strong>Agent Builder</strong> inside Microsoft 365 Copilot: describe what you want in plain words, point it at SharePoint sites or files, and share it with your team.</li>
              <li><strong>Copilot Studio</strong>: Microsoft’s low-code tool for richer agents with triggers, workflows, connectors to hundreds of business systems, and hand-off to people.</li>
              <li><strong>Microsoft 365 Agents Toolkit</strong> in Visual Studio Code: professional developers define agents as code and ship them through the normal release process.</li>
            </ol>
            <Figure number={10} caption="Anatomy of a Copilot Studio agent. Agents can be triggered by events, not just by chat — a new email or a schedule can start one.">
              <StudioAgent />
            </Figure>
            <p>
              The simplest kind is a <strong>declarative agent</strong>: it runs on Microsoft 365 Copilot’s own orchestrator and models, and is defined almost entirely by configuration. Here is a simplified example of what that configuration describes:
            </p>
            <Figure number={11} caption="A simplified declarative-agent definition. The real manifest has a versioned schema and extra fields; the Agents Toolkit generates and validates it for you.">
              <Code title="declarativeAgent.json — simplified" code={AGENT_JSON} />
            </Figure>
            <Callout kind="warn">
              <p>Agents act with real access. Give each one the least data and the fewest actions it needs, test it with awkward and adversarial questions, and use your admin controls to decide who can create and publish agents.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="github" level="Advanced" number={11}>GitHub Copilot: Copilot for code</SectionHeading>
            <p>
              <strong>GitHub Copilot</strong> — owned by Microsoft through GitHub — was the original Copilot and remains one of the most widely used AI coding tools. It lives in VS Code, Visual Studio, JetBrains IDEs and other editors, on GitHub.com, in a desktop app and in the terminal.
            </p>
            <Figure number={12} caption="Illustration: a “ghost text” completion accepted with Tab, and agent mode fixing a bug and writing tests." wide>
              <VsCodeMock />
            </Figure>
            <ul>
              <li><strong>Code completion:</strong> suggestions appear in grey as you type; press <code>Tab</code> to accept.</li>
              <li><strong>Chat and agent mode:</strong> ask questions about your code, or let Copilot plan and make multi-file changes, run commands and fix its own errors.</li>
              <li><strong>Coding agent:</strong> assign a GitHub issue to Copilot and it works in the background, then opens a pull request for you to review.</li>
              <li><strong>Code review, CLI and MCP:</strong> AI review comments on pull requests, a terminal agent, and connections to other tools through the Model Context Protocol.</li>
            </ul>
            <p>
              There is a free plan with a monthly allowance, free access for verified students, individual paid tiers (Pro, Pro+ and Max) and Business and Enterprise plans for organisations.
            </p>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="foundry" level="Advanced" number={12}>Building your own app: Microsoft Foundry</SectionHeading>
            <p>
              To build AI into your own product, Microsoft’s platform is <strong>Microsoft Foundry</strong> (formerly Azure AI Foundry). It offers a catalogue of models from OpenAI, Microsoft, Anthropic, Meta, Mistral and others, plus tools for agents, evaluation, safety filters and monitoring, all inside your Azure subscription.
            </p>
            <p>
              Create a Foundry project in the Azure portal, deploy a model, then install the SDK with <code>pip install &quot;azure-ai-projects&gt;=2.3.0&quot; azure-identity</code> and sign in with <code>az login</code>:
            </p>
            <Figure number={13} caption="A first call following Microsoft’s Foundry quickstart. It authenticates with your Azure sign-in rather than a pasted key.">
              <Code title="first_call.py — Python" code={PY_FOUNDRY} />
            </Figure>
            <p>
              The same project can host <strong>agents</strong> with saved instructions and multi-turn conversations, connect them to tools and data, and run <strong>evaluations</strong> to check quality and safety before you ship. Enterprises like Foundry for the governance: identity through Microsoft Entra, network isolation, content filters and usage monitoring.
            </p>
            <Callout kind="deep">
              <p>Notice the authentication: <code>DefaultAzureCredential</code> uses your signed-in identity locally and a <em>managed identity</em> when deployed in Azure, so there is no API key to leak. It is the recommended pattern for production — combined with role-based access control on the Foundry project.</p>
            </Callout>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plans" level="Beginner" number={13}>Which plan do I need?</SectionHeading>
            <p>
              For home users, the free Copilot app covers chat, voice, vision and image creation. Copilot inside Word, Excel, PowerPoint and Outlook comes with a Microsoft 365 subscription:
            </p>
            <Figure number={14} caption="Home plans that include Copilot, from Microsoft’s consumer plan page at the time of writing. Prices vary by country, so they aren’t listed." wide>
              <HomePlans />
            </Figure>
            <p>
              At work, your organisation chooses: Copilot Chat is included with eligible work accounts, and the Microsoft 365 Copilot licence is an add-on. For code, see GitHub’s plans; for building, Foundry is pay-as-you-go through Azure.
            </p>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={14}>Your 30-day path</SectionHeading>
            <p>One small step a day, from first chat to your first agent.</p>
            <Figure number={15} caption="Four weeks through the Copilot family. Skip the weeks that don’t apply to you." wide>
              <CopilotPath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What does “grounding” mean in Microsoft 365 Copilot?", a: "Before the model answers, Copilot retrieves relevant content — from Microsoft Graph and Work IQ, the semantic index and optionally the web — and adds it to the prompt, so the answer is based on real, citable sources." },
                { q: "Two colleagues ask Copilot the same question and get different answers. Why?", a: "Copilot only uses content each person already has permission to open. Different access means different grounding, and so different answers." },
                { q: "What are the four parts of Microsoft’s GCSE prompt recipe?", a: "Goal, Context, Source and Expectations." },
                { q: "You want a no-code HR assistant that answers from your policy SharePoint site. Where do you start?", a: "Agent Builder in Microsoft 365 Copilot (or Copilot Studio for more complex needs): give it instructions, point it at the SharePoint site, and share it." },
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
              That is the whole Copilot family, from the key on your keyboard to agents of your own. Start with the one closest to your day — and remember the name: it is your co-pilot, and you are still flying the plane. ✈️
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              Microsoft Copilot, Microsoft 365, Copilot Studio, Microsoft Foundry, Windows and Edge are products of Microsoft, and GitHub Copilot is a product of GitHub; this article is independent and not affiliated with or endorsed by either. Licence tiers and the grounding process follow Microsoft Learn, consumer plans follow Microsoft’s plan pages, GitHub plans follow GitHub Docs, and Foundry code follows Microsoft’s quickstart, all as of 24 September 2026. The agent definition is simplified; screens are illustrations; the company in the permission demo is fictional. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
          <Link href="/" className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:text-right">
            <p className="flex sm:justify-end items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              All articles <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{article.series}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
