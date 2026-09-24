import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { ContextCalculator } from "@/components/figures/ContextCalculator";
import {
  AiStudioMock,
  AndroidMock,
  DeepResearchFlow,
  GeminiAppTour,
  GeminiCliMock,
  GeminiModels,
  GeminiPath,
  GeminiTimeline,
  GeminiUniverse,
  GemBuilderMock,
  GmailMock,
  GroundingFlow,
  MillionTokens,
  MixtureOfExperts,
  MultimodalCompare,
  PlanLadder,
} from "@/components/figures/gemini-guide";

const article = getArticle("google-gemini-101") as Article;
const previous = getArticle("how-to-use-claude") as Article;
const first = getArticle("welcome-to-the-world-of-ai") as Article;
const chatgpt = getArticle("chatgpt-101") as Article;
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
  { name: "Google Gemini 101", path },
];

const TOC = [
  { id: "what-is-gemini", label: "What is Gemini?" },
  { id: "history", label: "Google’s AI story" },
  { id: "how-its-built", label: "How Gemini is built" },
  { id: "models", label: "The model family" },
  { id: "get-started", label: "Getting started, step by step" },
  { id: "features", label: "Gems, Deep Research, Canvas, Live" },
  { id: "android", label: "Gemini on your phone" },
  { id: "workspace", label: "Gmail, Docs and Drive" },
  { id: "prompting", label: "Prompting Gemini well" },
  { id: "plans", label: "Plans and privacy" },
  { id: "long-context", label: "Long context and grounding" },
  { id: "ai-studio", label: "Google AI Studio" },
  { id: "api", label: "The Gemini API" },
  { id: "cli", label: "Gemini CLI" },
  { id: "plan", label: "Your 30-day path" },
];

const PY_BASIC = `from google import genai

client = genai.Client()  # reads your GEMINI_API_KEY

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    system_instruction="You are a patient maths tutor for Class 10 students in India.",
    input="Explain why (a + b)² = a² + 2ab + b² using a picture I can draw.",
)

print(interaction.output_text)`;

const PY_CHAT = `first = client.interactions.create(
    model="gemini-3.8-flash",
    input="I have ₹20,000 to invest every month for 10 years.",
)

follow_up = client.interactions.create(
    model="gemini-3.8-flash",
    input="Show me what that becomes at 8% a year, as a table.",
    previous_interaction_id=first.id,   # continue the same conversation
)
print(follow_up.output_text)`;

const PY_JSON = `from pydantic import BaseModel

class Expense(BaseModel):
    merchant: str
    amount_inr: float
    category: str

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Paid 1,240 at Big Bazaar for groceries and snacks on Friday.",
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": Expense.model_json_schema(),
    },
)

expense = Expense.model_validate_json(interaction.output_text)
print(expense)  # merchant='Big Bazaar' amount_inr=1240.0 category='Groceries'`;

const CURL = `curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Give me three names for a momo stall in Shillong."
  }'`;

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

export default function GoogleGemini101() {
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
          about: { "@type": "SoftwareApplication", name: "Google Gemini", applicationCategory: "AI assistant", publisher: { "@type": "Organization", name: "Google" } },
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
            {article.series} · Article 4
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">Google Gemini 101</span>: from your first chat to the API
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
              Just want to use Gemini? Follow the green sections — you can be up and running on your phone in five minutes. Curious how it works? Read the amber ones. Building something? The red sections cover AI Studio, the API and the CLI.
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
              If you have an Android phone, a Gmail account or have searched Google recently, you have probably already met Gemini. It is Google’s AI — a chat assistant you can talk to, point your camera at, and ask to research the web for you — and it is quietly being built into almost everything Google makes.
            </p>
            <p>
              This guide takes you from your first question to your first program. We begin with where Gemini came from and what makes its design different, pick the right model, then go step by step through the app on the web and on your phone, its most useful features, Gmail and Docs, and finally the developer side: Google AI Studio, the Gemini API and the Gemini CLI.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>Google updates Gemini very often. Model names in this guide come from Google’s developer documentation and plan details from its subscriptions page, both checked on the day of publishing; screens are marked as illustrations. For today’s details, see <a href="https://gemini.google/subscriptions/" rel="noopener">gemini.google/subscriptions</a>. Our guides to <Link href={`/${chatgpt.slug}`}>ChatGPT</Link> and <Link href={`/${previous.slug}`}>Claude</Link> cover prompting skills that carry over directly.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-gemini" level="Beginner" number={1}>What is Gemini?</SectionHeading>
            <p>
              The word <strong>Gemini</strong> means two things. It is Google’s <strong>family of AI models</strong>, built by its research lab Google DeepMind. And it is the <strong>assistant</strong> you use — the Gemini app — along with the AI features inside Android, Chrome, Gmail, Docs and Search that run on those models.
            </p>
            <p>
              Its biggest strengths come from Google itself: it can search the web with Google Search as it answers, it works inside the apps billions of people already use, and it was designed from the start to understand images, audio and video, not only text.
            </p>
            <Callout kind="eli5">
              <p>Think of Gemini as a helper who lives inside all your Google stuff. It can read your long email thread and tell you what was decided, look through your phone’s camera and explain what it sees, or spend ten minutes reading the internet for you and hand back a tidy report.</p>
            </Callout>
            <Figure number={1} caption="Where Gemini shows up. The same model family powers the consumer apps, Google’s work tools and the developer platform." wide>
              <GeminiUniverse />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>Google’s AI story</SectionHeading>
            <p>
              Google has a special place in this history: the <strong>Transformer</strong>, the design at the heart of ChatGPT, Claude and Gemini alike, was invented by Google researchers in 2017. Yet it was OpenAI that put a chatbot in front of the public first. Gemini is the result of Google’s push to catch up — and, in areas like multimodality and long context, to lead.
            </p>
            <Figure number={2} caption="From the Transformer to today’s Gemini 3.x models. Only the major milestones are shown.">
              <GeminiTimeline />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how-its-built" level="Intermediate" number={3}>How Gemini is built</SectionHeading>
            <p>
              Like every modern chatbot, Gemini is a large language model based on the Transformer: it turns its input into tokens and predicts, one token at a time, what should come next. (Our first article, <Link href={`/${first.slug}`}>Welcome to the world of AI</Link>, explains that from scratch.) Two design choices set Gemini apart.
            </p>
            <h3>1. Natively multimodal</h3>
            <p>
              Early AI assistants handled pictures and sound by bolting on extra systems: one converts speech to text, another writes a caption for an image, and only then does the language model see anything. Gemini was trained from the beginning on text, images, audio and video <em>together</em>, so all of them become tokens in the same stream. That is why it can notice the tone of a voice, read a chart inside a photo, or follow what happens across a video.
            </p>
            <Figure number={3} caption="Two ways to handle pictures and sound. Gemini takes the approach on the right.">
              <MultimodalCompare />
            </Figure>
            <h3>2. Mixture of experts</h3>
            <p>
              Google’s technical reports describe Gemini models using a <strong>mixture-of-experts (MoE)</strong> design. Instead of one giant block of neurons that all fire for every word, the model contains many smaller “expert” networks and a <em>router</em> that sends each token to just a few of them. The model can be enormous in total while each step stays fast and affordable.
            </p>
            <Figure number={4} caption="A mixture-of-experts layer, simplified. Real experts don’t have tidy labels like “maths” — they learn their own specialities during training.">
              <MixtureOfExperts />
            </Figure>
            <Callout kind="deep">
              <p>The router is itself a small learned network that scores each expert for each token; the top few are used and their outputs are combined, weighted by those scores. Training adds a balancing term so no expert is overloaded while others sit idle. The payoff is <em>sparse</em> computation: parameter count and per-token cost grow apart, which is one reason very capable models can still be served cheaply.</p>
            </Callout>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="models" level="Intermediate" number={4}>The model family</SectionHeading>
            <p>
              Gemini comes in tiers. <strong>Flash-Lite</strong> is the cheapest and quickest; <strong>Flash</strong> balances speed and intelligence and is Google’s recommended starting point; <strong>Pro</strong> reasons the most deeply. Around them sit specialists for live voice, speech, images (the famous “Nano Banana”), video, music and embeddings.
            </p>
            <Figure number={5} caption="The Gemini API lineup, from Google’s models page on 24 September 2026. In the Gemini app you choose between fast and thinking modes rather than model IDs." wide>
              <GeminiModels />
            </Figure>
            <p>
              Newer Gemini models are <strong>thinking models</strong>: before answering, they can reason through a problem internally. In the app this appears as a choice between a fast mode and a thinking mode; in the API, developers can control how much the model thinks, trading depth against speed and cost.
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="get-started" level="Beginner" number={5}>Getting started, step by step</SectionHeading>
            <Figure number={6} caption="Your first five minutes with Gemini.">
              <FlowSteps
                steps={[
                  { icon: "🌐", title: "Open Gemini", body: "gemini.google.com or the app", tone: "c" },
                  { icon: "👤", title: "Sign in", body: "with your Google account", tone: "c" },
                  { icon: "💬", title: "Ask", body: "a real task, in plain words", tone: "v" },
                  { icon: "📎", title: "Add something", body: "a photo, PDF or screenshot", tone: "a" },
                  { icon: "🔁", title: "Refine", body: "“shorter”, “as a table”…", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Open Gemini.</strong> Go to <code>gemini.google.com</code> on a computer, or install the Gemini app on iPhone. On most recent Android phones, Gemini is already built in.</li>
              <li><strong>Sign in with your Google account.</strong> The same account that runs your Gmail. Work and school accounts may need an administrator to switch Gemini on.</li>
              <li><strong>Learn the screen.</strong> It has only a few parts:</li>
            </ol>
            <Figure number={7} caption="An illustrated map of the Gemini app on the web. Buttons move between updates, but these seven parts stay." wide>
              <GeminiAppTour />
            </Figure>
            <ol start={4}>
              <li><strong>Ask for something real</strong> — a trip plan, an explanation, a draft — and keep going with follow-ups.</li>
              <li><strong>Add files and photos</strong> with the ＋ button: a bill to explain, a PDF to summarise, a screenshot of an error.</li>
              <li><strong>Use “double-check”.</strong> Under an answer, the menu offers a check against Google Search that highlights statements with supporting or conflicting sources.</li>
            </ol>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="features" level="Intermediate" number={6}>Gems, Deep Research, Canvas and Live</SectionHeading>
            <h3>Gems: your own custom Geminis</h3>
            <p>
              A <strong>Gem</strong> is a saved version of Gemini with its own instructions and, optionally, its own files. Write the instructions once — who it is, what it does, how it answers — and open it whenever you need it: an interview coach, a recipe planner, a writing editor in your house style.
            </p>
            <Figure number={8} caption="Illustration of building a Gem: instructions and knowledge on the left, a live preview on the right.">
              <GemBuilderMock />
            </Figure>
            <h3>Deep Research: a report while you make tea</h3>
            <p>
              For questions that need many sources, choose <strong>Deep Research</strong>. Gemini drafts a research plan you can edit, then browses and reads for several minutes, and returns a structured report with its sources, which you can export to Google Docs.
            </p>
            <Figure number={9} caption="How Deep Research works. Read the sources that matter before relying on the report.">
              <DeepResearchFlow />
            </Figure>
            <h3>Canvas and Live</h3>
            <p>
              <strong>Canvas</strong> opens a workspace beside the chat for longer documents and code, which you and Gemini edit together; it can also turn material into web pages, quizzes and audio overviews. <strong>Gemini Live</strong> is a spoken conversation: tap Live, talk naturally, interrupt whenever you like, and on a phone share your camera or screen so Gemini can see what you see.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="android" level="Beginner" number={7}>Gemini on your phone</SectionHeading>
            <p>
              On Android, Gemini is the phone’s built-in assistant. <strong>Press and hold the power button</strong> (or say “Hey Google”, if enabled) to bring it up over whatever you are doing, and ask about what is on screen. On iPhone, install the Gemini app from the App Store. On both, Live with the camera is the stand-out feature: fix a bike, identify a plant, translate a sign, or get help with homework on paper.
            </p>
            <Figure number={10} caption="Illustrations: summoning Gemini over any app on Android, and Gemini Live looking through the camera.">
              <AndroidMock />
            </Figure>
            <Callout kind="tip">
              <p>Gemini can also work with your other Google apps — Maps, YouTube, Calendar, Keep, Gmail. Try “find the email with my train ticket and add the journey to my calendar”, or “what did that YouTube video say about fixing a leaking tap?”</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="workspace" level="Intermediate" number={8}>Gemini in Gmail, Docs and Drive</SectionHeading>
            <p>
              On eligible plans, a Gemini button appears inside Google Workspace apps and opens a side panel that can see the email, document or folder you are working on. It summarises long threads, drafts replies, turns rough notes into a document, builds formulas and tables in Sheets, and finds files in Drive by what is in them.
            </p>
            <Figure number={11} caption="Illustration: the Gemini side panel summarising a long Gmail thread and offering to draft a reply.">
              <GmailMock />
            </Figure>
            <p>
              For deep work across your own sources, Google also offers <strong>NotebookLM</strong>: upload papers, notes or videos, and ask questions answered only from those sources, with citations — even as a podcast-style audio overview.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="prompting" level="Intermediate" number={9}>Prompting Gemini well</SectionHeading>
            <p>
              The prompting habits from <Link href={`/${chatgpt.slug}#prompting`}>ChatGPT 101</Link> — role, task, context, format, examples, limits — work just as well here. A few tips make the most of Gemini’s particular strengths:
            </p>
            <ul>
              <li><strong>Show, don’t describe.</strong> Gemini reads images, audio and video natively. Instead of typing out a table from a photo, just attach the photo.</li>
              <li><strong>Refer to parts precisely.</strong> With long material, point to where you mean: “in the third section”, “at 12:40 in the video”, “the chart on page 7”.</li>
              <li><strong>Ask for sources when facts matter.</strong> “Use Google Search and link your sources” nudges Gemini to ground its answer.</li>
              <li><strong>Use the right tool.</strong> A quick question goes in chat; a big one goes to Deep Research; a long document goes in Canvas; a repeated job becomes a Gem.</li>
              <li><strong>Reach into your apps by name.</strong> Mentioning Gmail, Drive or Calendar tells Gemini where to look.</li>
            </ul>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plans" level="Beginner" number={10}>Plans and privacy</SectionHeading>
            <p>
              The Gemini app is free with a Google account, and the free tier is generous: Deep Research, Canvas, Gems, Live and image creation are all included. Paid Google AI plans raise the limits, unlock more of the top models and video tools, add Gemini inside Gmail and Docs, and bundle extra Google storage.
            </p>
            <Figure number={12} caption="The consumer plans at the time of writing, from Google’s subscriptions page. Prices vary by country and change often, so they are not listed here." wide>
              <PlanLadder />
            </Figure>
            <h3>Privacy checklist</h3>
            <ul>
              <li><strong>Open Gemini Apps Activity</strong> in the app’s settings to see what is saved, set auto-delete, or turn saving off. Some conversations may be reviewed by people to improve Google’s services, so read the notice there.</li>
              <li><strong>Use temporary chats</strong> for anything you would rather not keep.</li>
              <li><strong>Don’t share secrets</strong>: passwords, card and bank numbers, Aadhaar or passport numbers.</li>
              <li><strong>Work and school accounts</strong> follow your organisation’s data terms, which are usually stricter.</li>
            </ul>
            <Callout kind="warn">
              <p>Like every AI model, Gemini can be confidently wrong. Use double-check or open the sources for anything that matters, and treat medical, legal and financial answers as a starting point for a conversation with a professional.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="long-context" level="Advanced" number={11}>Long context and grounding</SectionHeading>
            <p>
              Gemini made <strong>long context</strong> famous: Gemini 1.5 Pro was one of the first models to read about <strong>a million tokens</strong> in one go, and large context windows remain a Gemini strength. That changes what is possible — you can hand over a whole book, an hour-long lecture video or a sizeable codebase and ask questions across all of it.
            </p>
            <Figure number={13} caption="Rough sizes of a million tokens, based on Google’s published guidance.">
              <MillionTokens />
            </Figure>
            <div className="!my-8">
              <ContextCalculator />
            </div>
            <p>
              Long context is not free: bigger inputs cost more and take longer. Two techniques help. <strong>Context caching</strong> stores a large, unchanging input — say, a 500-page manual — so repeated questions reuse it at lower cost. And <strong>retrieval</strong> (RAG) searches your material first and sends only the relevant chunks, which scales to libraries far bigger than any context window.
            </p>
            <h3>Grounding with Google Search</h3>
            <p>
              A model’s built-in knowledge stops at its training date. <strong>Grounding</strong> connects Gemini to Google Search so it can look things up while answering and cite what it found. In the API it is a built-in tool you switch on; Gemini decides when a question actually needs a search.
            </p>
            <Figure number={14} caption="Grounding with Google Search. The citations are the point: they let you check the answer.">
              <GroundingFlow />
            </Figure>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="ai-studio" level="Advanced" number={12}>Google AI Studio: the developer’s playground</SectionHeading>
            <p>
              <strong>Google AI Studio</strong> (<code>aistudio.google.com</code>) is where developers try Gemini before writing code. Sign in with a Google account, pick a model, write system instructions, attach images or files, switch on tools such as grounding or structured output, and see the result immediately. When it works, <strong>Get code</strong> produces matching code in several languages, and <strong>Get API key</strong> creates the key you need.
            </p>
            <Figure number={15} caption="Illustration of Google AI Studio: prompt on the left, model and tool settings on the right.">
              <AiStudioMock />
            </Figure>
            <p>
              For company use, the same models are offered on <strong>Vertex AI</strong> in Google Cloud, with enterprise security, data residency and billing through a Cloud account.
            </p>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="api" level="Advanced" number={13}>The Gemini API</SectionHeading>
            <p>
              Install Google’s SDK with <code>pip install -U google-genai</code>, create a key in AI Studio, and set it as <code>GEMINI_API_KEY</code>. Google’s current documentation centres on the <strong>Interactions API</strong>: each call is an <em>interaction</em> with a model, an input and optional instructions.
            </p>
            <Figure number={16} caption="A first call with system instructions, following Google’s current quickstart.">
              <Code title="first_call.py — Python" code={PY_BASIC} />
            </Figure>
            <p>
              To hold a conversation, pass the previous interaction’s ID and Gemini continues from there — no need to resend the whole history yourself:
            </p>
            <Code title="chat.py — Python" code={PY_CHAT} />
            <h3 className="!mt-10">Structured output</h3>
            <p>
              For software, ask for JSON that matches a schema. With Pydantic you define the shape once and get validated objects back:
            </p>
            <Figure number={17} caption="Structured output: the response must follow the schema. The final comment shows a sample result.">
              <Code title="expense.py — Python" code={PY_JSON} />
            </Figure>
            <p>And the same basic call over plain HTTP:</p>
            <Code title="Terminal — curl" code={CURL} />
            <h3 className="!mt-10">What else the API can do</h3>
            <ul>
              <li><strong>Multimodal input:</strong> send images, audio, video and PDFs alongside text.</li>
              <li><strong>Function calling:</strong> describe your own functions; Gemini asks you to run them and uses the results.</li>
              <li><strong>Built-in tools:</strong> Google Search grounding, code execution and URL reading.</li>
              <li><strong>Live API:</strong> real-time, two-way voice and video for conversational apps.</li>
              <li><strong>Generation:</strong> images with Nano Banana, video with Veo and Omni, speech, and music.</li>
              <li><strong>Embeddings:</strong> turn text and media into vectors for semantic search.</li>
            </ul>
            <Callout kind="warn">
              <p><strong>Keep your API key on a server</strong>, never in a web page or mobile app. Free-tier usage has lower limits and different data terms from paid usage — read them before sending anything sensitive — and set a budget alert in Google Cloud before experimenting at scale.</p>
            </Callout>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="cli" level="Advanced" number={14}>Gemini CLI: an agent in your terminal</SectionHeading>
            <p>
              <strong>Gemini CLI</strong> is Google’s open-source AI agent for the command line. It reads and edits files, runs shell commands with your permission, searches the web with Google Search, and connects to other tools through the <strong>Model Context Protocol (MCP)</strong>. Signing in with a personal Google account includes a free allowance — at the time of writing, 60 requests a minute and 1,000 a day.
            </p>
            <Code title="Terminal — install Gemini CLI" code={`# run without installing
npx @google/gemini-cli

# or install it
npm install -g @google/gemini-cli
brew install gemini-cli        # macOS / Linux

gemini                          # start, then sign in with Google`} />
            <Figure number={18} caption="Illustration of a Gemini CLI session: explore, plan, ask permission, dry-run, confirm." wide>
              <GeminiCliMock />
            </Figure>
            <p>
              Put a <code>GEMINI.md</code> file in your project to give the CLI lasting context — how to build and test, conventions, things to avoid — and it will read it every session. The same ideas power Google’s <strong>Antigravity</strong>, an agent-first development environment where several agents can work on tasks in parallel.
            </p>

            {/* ── 15 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={15}>Your 30-day path</SectionHeading>
            <p>Small steps, one week at a time, from first chat to first program.</p>
            <Figure number={19} caption="Four weeks through every part of the Gemini world. Skip ahead wherever you are already comfortable." wide>
              <GeminiPath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What does “natively multimodal” mean?", a: "The model was trained on text, images, audio and video together, so they all become tokens in one stream — rather than separate systems converting sound or pictures into text first." },
                { q: "You ask the same assistant setup every week. What should you build?", a: "A Gem: a saved version of Gemini with its own instructions and files." },
                { q: "Your 3-hour lecture video doesn’t fit in one prompt. What are your options?", a: "Split it into parts, summarise sections first, or use retrieval to send only the relevant pieces. For repeated questions on a big fixed input, context caching cuts cost." },
                { q: "In the Interactions API, how do you continue a conversation?", a: "Pass previous_interaction_id with the ID of the earlier interaction, and Gemini continues from it." },
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
              That is Gemini, from holding the power button to your first line of code. Start with the door closest to you — probably the phone in your pocket — and build from there. ✦
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              Gemini, Google AI Studio, Gemini CLI, NotebookLM and Android are products of Google; this article is independent and not affiliated with or endorsed by Google. Model IDs and API code follow the Gemini API documentation, CLI details follow the Gemini CLI repository, and plan features follow Google’s subscriptions page, all as of 24 September 2026. Interface screens are illustrations and sample outputs are examples. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
