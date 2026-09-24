import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { PromptBuilder } from "@/components/figures/PromptBuilder";
import {
  AppVsApi,
  ChatGptTimeline,
  ContextStack,
  CustomGptAnatomy,
  CustomInstructionsMock,
  FeatureGrid,
  InterfaceTour,
  IterationChat,
  ModelDecision,
  PromptAnatomy,
  StrengthsLimits,
  ThirtyDayPlan,
  TokenBudget,
  ToolCallFlow,
  VerifyFlow,
} from "@/components/figures/chatgpt-101";

const article = getArticle("chatgpt-101") as Article;
const previous = getArticle("welcome-to-the-world-of-ai") as Article;
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
  { name: "ChatGPT 101", path },
];

const TOC = [
  { id: "what-is-chatgpt", label: "What is ChatGPT?" },
  { id: "history", label: "Where it came from" },
  { id: "how-it-works", label: "How it works, in 5 minutes" },
  { id: "get-started", label: "Getting started, step by step" },
  { id: "first-prompts", label: "Your first ten prompts" },
  { id: "prompting", label: "Prompting that works" },
  { id: "features", label: "The feature tour" },
  { id: "models", label: "Choosing a model and plan" },
  { id: "safety", label: "Staying safe and accurate" },
  { id: "under-the-hood", label: "Under the hood" },
  { id: "custom-gpts", label: "Custom GPTs and Projects" },
  { id: "api", label: "Building with the API" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "plan", label: "Your 30-day plan" },
];

const FIRST_PROMPTS: [string, string, string][] = [
  ["🧑‍🏫", "Understand anything", "Explain how UPI payments work as if I’m 12, then as if I’m a bank engineer."],
  ["📄", "Summarise", "Summarise this article in 5 bullet points and tell me the one thing I should remember. [paste text]"],
  ["✉️", "Write for you", "Draft a polite message to my landlord about a leaking tap. It’s the second time I’m asking."],
  ["💡", "Brainstorm", "Give me 15 names for a home bakery in Shillong. Mix English and Khasi-inspired ideas."],
  ["🗓️", "Plan", "I have 6 weeks until my exam and 2 hours a day. Make a study plan for these 5 chapters: …"],
  ["❓", "Quiz me", "Ask me 10 questions on the French Revolution, one at a time, and grade my answers."],
  ["🍳", "Everyday life", "I have eggs, onions, rice and spinach. Suggest 3 dinners under 30 minutes."],
  ["💻", "Code", "Write a Python script that renames all photos in a folder by the date they were taken."],
  ["🌍", "Translate & adapt", "Translate this notice into Hindi and Bengali, keeping the tone friendly. [paste]"],
  ["🪞", "Get feedback", "Here is my cover letter. Be a strict hiring manager: what are its three biggest weaknesses?"],
];

const MISTAKES: [string, string][] = [
  ["Treating it like Google (“best phone”)", "Give it your situation: budget, what you use a phone for, what you hated about the last one."],
  ["Accepting the first answer", "Reply. “Shorter.” “More formal.” “Give me three options.” The second answer is usually much better."],
  ["One endless chat for everything", "Start a new chat per topic, or use Projects. Old, unrelated context muddles new answers."],
  ["Trusting numbers and citations blindly", "Ask for sources, turn on search, and check anything that matters."],
  ["Pasting passwords, ID numbers, client secrets", "Remove or mask them. Use temporary chat for sensitive-but-necessary work."],
  ["Asking it to “be creative” with no direction", "Give examples of what you like, and what you don’t."],
  ["Using a fast model for a hard maths or logic problem", "Switch to a thinking model and give it time."],
  ["Letting it write your graded work", "Use it as a tutor: explanations, practice questions, feedback on your own draft."],
];

const PY_BASIC = `from openai import OpenAI

client = OpenAI()  # reads your OPENAI_API_KEY environment variable

response = client.responses.create(
    model="gpt-6-astra",  # a current model; see the docs for the live list
    instructions="You are a friendly personal-finance tutor for beginners in India.",
    input="Explain compound interest with a ₹10,000 example over 5 years at 7%.",
)

print(response.output_text)`;

const PY_JSON = `response = client.responses.create(
    model="gpt-6-astra",
    input="Sort this feedback: 'Delivery was late but the cake was amazing.'",
    text={
        "format": {
            "type": "json_schema",
            "name": "feedback",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "sentiment": {"type": "string", "enum": ["positive", "negative", "mixed"]},
                    "topics": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["sentiment", "topics"],
                "additionalProperties": False,
            },
        }
    },
)

print(response.output_text)
# {"sentiment": "mixed", "topics": ["delivery", "product quality"]}`;

export default function ChatGpt101() {
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
          about: { "@type": "SoftwareApplication", name: "ChatGPT", applicationCategory: "AI assistant" },
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
            {article.series} · Article 2
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">ChatGPT 101</span>: from your first chat to the API
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
              Never used ChatGPT? Read the green sections and try each step as you go. Already a daily user? Skip to prompting, the feature tour and what happens under the hood. Developers: the last red sections are for you.
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
              Imagine a helper who has read a huge slice of the internet, never gets tired of your questions, writes in any style you like, and is awake at 3 a.m. That is roughly what ChatGPT feels like. It is also a tool with sharp edges: it can be confidently wrong, and it only works as well as you ask.
            </p>
            <p>
              This guide takes you from zero to confident. We start with what ChatGPT is and where it came from, walk through your very first conversation step by step, learn the handful of prompting habits that make the biggest difference, tour every major feature, and finish under the hood — tokens, context windows, tool calls — and in code with the OpenAI API.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>ChatGPT changes quickly. Button names, model names, plan limits and prices move every few months, so this guide explains ideas that last and marks screens as illustrations. For the current plans, see <a href="https://chatgpt.com/pricing" rel="noopener">chatgpt.com/pricing</a>. New to AI in general? Our first article, <Link href={`/${previous.slug}`}>Welcome to the world of AI</Link>, explains how models like this are built.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-chatgpt" level="Beginner" number={1}>What is ChatGPT?</SectionHeading>
            <p>
              <strong>ChatGPT is an AI assistant you talk to in plain language.</strong> You type (or say) what you want; it replies in writing, and it can also read files and images, search the web, create pictures, run code and hold a spoken conversation. It is made by the company OpenAI.
            </p>
            <p>
              The name tells you what is inside. <strong>Chat</strong> is the conversation. <strong>GPT</strong> stands for <em>Generative Pre-trained Transformer</em>: <em>generative</em> because it creates new text, <em>pre-trained</em> because it first learned from an enormous amount of text before being tuned to be helpful, and <em>Transformer</em> because that is the type of neural network it runs on.
            </p>
            <Callout kind="eli5">
              <p>Think of the world’s most well-read intern. Brilliant at drafting, explaining and brainstorming; happy to redo work instantly; occasionally makes things up with a straight face. You would never send their work out unchecked — but you would be foolish not to use them.</p>
            </Callout>
            <Figure number={1} caption="Where ChatGPT shines, and where you need to stay in charge.">
              <StrengthsLimits />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>Where it came from</SectionHeading>
            <p>
              ChatGPT was not an overnight invention. It sits on top of years of work on ever-larger language models, and the big surprise of late 2022 was less a new model than a new <em>interface</em>: a simple chat box that anyone could use for free.
            </p>
            <Figure number={2} caption="The road to ChatGPT and what followed. Only milestones are shown; there were many more releases in between.">
              <ChatGptTimeline />
            </Figure>
            <p>
              The key ingredient that turned a raw text-predictor into a helpful assistant was <strong>reinforcement learning from human feedback (RLHF)</strong>: people rated the model’s answers, and it was tuned towards the kind of replies they preferred. That is why ChatGPT follows instructions and stays on topic, where earlier models would simply ramble on.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how-it-works" level="Intermediate" number={3}>How it works, in five minutes</SectionHeading>
            <p>
              At its heart, the model does one thing: given some text, it predicts a likely <strong>next word</strong> (strictly, the next <em>token</em> — a word or word-piece). It picks one, adds it to the text, and repeats, which is why answers appear word by word. Everything clever it does emerges from doing that one thing extraordinarily well.
            </p>
            <p>
              The part most people miss is <strong>what the model reads each time</strong>. It does not “remember” your conversation the way a person does. On every turn, the app sends the model one long document containing everything it needs, and the model reads it all again from the top.
            </p>
            <Figure number={3} caption="What the model sees on each turn. This is why a long, rambling chat can make answers worse, and why a fresh chat is sometimes the best fix.">
              <ContextStack />
            </Figure>
            <p>
              Two consequences follow. First, <strong>context is everything</strong>: the model only knows about you what is in that stack, so the more relevant detail you give, the better it does. Second, <strong>there is a limit</strong>: the stack has a maximum size, called the <em>context window</em>. We will come back to both under the hood.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="get-started" level="Beginner" number={4}>Getting started, step by step</SectionHeading>
            <Figure number={4} caption="From zero to your first useful answer in about five minutes.">
              <FlowSteps
                steps={[
                  { icon: "🌐", title: "Open it", body: "chatgpt.com, or the official app for iPhone, Android, Mac or Windows", tone: "c" },
                  { icon: "👤", title: "Sign in", body: "optional to try; an account saves your chats", tone: "c" },
                  { icon: "⚙️", title: "Personalise", body: "tell it about you, once", tone: "v" },
                  { icon: "💬", title: "Ask", body: "a real task, in plain words", tone: "a" },
                  { icon: "🔁", title: "Follow up", body: "refine until it’s right", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Open ChatGPT.</strong> Go to <code>chatgpt.com</code> in any browser, or install the official ChatGPT app by OpenAI from your app store. Beware of look-alike apps with similar names.</li>
              <li><strong>Sign in (optional at first).</strong> You can try it without an account. Signing up — with email, Google, Microsoft or Apple — keeps your chat history and unlocks features such as file uploads, memory and Projects.</li>
              <li><strong>Find your way around.</strong> The screen is simpler than it looks:</li>
            </ol>
            <Figure number={5} caption="An illustrated map of the ChatGPT window. The real layout shifts between updates and devices, but these seven parts are always somewhere." wide>
              <InterfaceTour />
            </Figure>
            <ol start={4}>
              <li><strong>Tell it about yourself once.</strong> In <em>Settings → Personalization</em>, custom instructions let you say who you are and how you like answers. They are added to every new chat automatically, which saves repeating yourself.</li>
            </ol>
            <Figure number={6} caption="Illustration of custom instructions. Two short paragraphs here improve every future answer.">
              <CustomInstructionsMock />
            </Figure>
            <ol start={5}>
              <li><strong>Ask for something real.</strong> Not “hello” — an actual task you have today. Then <strong>reply to it</strong>. The magic of ChatGPT is in the follow-ups.</li>
            </ol>
            <Figure number={7} caption="Illustration: a vague first ask, a better second ask, and a follow-up that reuses everything already said.">
              <IterationChat />
            </Figure>
            <Callout kind="tip">
              <p>Useful shortcuts: <code>Enter</code> sends, <code>Shift + Enter</code> starts a new line, the pencil icon on your message lets you edit and resend it, and the retry arrow asks for a different answer. The copy icon under a reply copies it cleanly.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="first-prompts" level="Beginner" number={5}>Your first ten prompts</SectionHeading>
            <p>Not sure what to ask? Copy one of these, change the details to your own life, and go.</p>
            <div className="grid sm:grid-cols-2 gap-2.5 !my-7">
              {FIRST_PROMPTS.map(([icon, h, p]) => (
                <div key={h} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-[14px] font-semibold text-[var(--text-primary)]"><span aria-hidden="true">{icon}</span> {h}</p>
                  <p className="mt-1.5 mono text-[12.5px] leading-relaxed text-[var(--text-secondary)]">{p}</p>
                </div>
              ))}
            </div>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="prompting" level="Intermediate" number={6}>Prompting that actually works</SectionHeading>
            <p>
              A <strong>prompt</strong> is simply what you type. There is no secret code to it, and you do not need special phrases. What separates great results from bland ones is how much of the picture you give. Brief it the way you would brief a smart new colleague who knows nothing about your situation.
            </p>
            <p>A good brief has up to six ingredients:</p>
            <Figure number={8} caption="The six ingredients of a strong prompt, with one worked example running through all six.">
              <PromptAnatomy />
            </Figure>
            <div className="!my-8">
              <PromptBuilder />
            </div>

            <h3>Seven habits of power users</h3>
            <ol>
              <li><strong>Iterate, don’t restart.</strong> “Shorter”, “warmer”, “more like the second option”, “now as a table” — each follow-up builds on everything before.</li>
              <li><strong>Let it interview you.</strong> End with: <em>“Before you start, ask me any questions you need.”</em> It will find the gaps in your brief for you.</li>
              <li><strong>Show, don’t describe.</strong> Paste an example of the style you want. One real example beats a paragraph of adjectives.</li>
              <li><strong>Ask for options.</strong> “Give me five subject lines” and pick, instead of arguing with one.</li>
              <li><strong>Separate instructions from material.</strong> Put pasted text inside quotes or between lines like <code>---</code>, and say “the text between the lines is my draft”.</li>
              <li><strong>Ask it to critique itself.</strong> “What’s weak about your answer? Fix it.” often lifts quality noticeably.</li>
              <li><strong>Say what to do, not only what to avoid.</strong> “Write in short, plain sentences” works better than “don’t be wordy”.</li>
            </ol>
            <Callout kind="deep">
              <p>Why do examples work so well? The model is a pattern-continuer. An example sets the pattern — length, tone, structure — far more precisely than a description can. Researchers call this <strong>few-shot prompting</strong>: showing a few input→output pairs before the real input. For thinking models, you rarely need to write “think step by step” any more; they already do. Spend your words on context instead.</p>
            </Callout>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="features" level="Intermediate" number={7}>The feature tour</SectionHeading>
            <p>
              Beyond typing, ChatGPT has grown a toolbox. Exactly which tools you get, and how often, depends on your plan and country — but here is what each one is for.
            </p>
            <Figure number={9} caption="ChatGPT’s main capabilities. Availability and limits vary by plan and change over time." wide>
              <FeatureGrid />
            </Figure>
            <h3>Three features worth learning first</h3>
            <p>
              <strong>Files and data analysis.</strong> Drop in a PDF, a spreadsheet or a photo of a whiteboard and ask questions of it. With spreadsheets, ChatGPT writes and runs small programs behind the scenes to calculate and chart — ask it to <em>“show the code you used”</em> if you want to check its working.
            </p>
            <p>
              <strong>Web search.</strong> The model’s built-in knowledge stops at its training cut-off. With search on, it looks things up and gives you links. Always open the one or two sources that matter; a link is only reassuring if it says what the answer claims.
            </p>
            <p>
              <strong>Voice.</strong> Tap the voice button and simply talk. It is surprisingly good for language practice, rehearsing a tough conversation, or thinking aloud on a walk.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="models" level="Intermediate" number={8}>Choosing a model and a plan</SectionHeading>
            <p>
              ChatGPT offers a few models at once. Broadly there are two kinds: <strong>fast models</strong> that answer in seconds and handle most everyday tasks, and <strong>thinking (reasoning) models</strong> that work through a problem privately before answering — slower, but much stronger on maths, logic, code and planning. Often an “Auto” setting chooses for you.
            </p>
            <Figure number={10} caption="A simple rule of thumb for choosing. When in doubt, start fast and switch up if the answer is shaky.">
              <ModelDecision />
            </Figure>
            <p>
              Plans at the time of writing run from <strong>Free</strong> through low-cost and standard paid tiers (<strong>Go</strong>, <strong>Plus</strong>) to <strong>Pro</strong> for heavy users, plus <strong>Business</strong> and <strong>Enterprise</strong> plans for organisations. Paid plans mainly buy you more powerful models, higher limits and access to the heavier tools. Start free; upgrade only when you keep hitting a limit that matters to you.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="safety" level="Beginner" number={9}>Staying safe and accurate</SectionHeading>
            <p>
              ChatGPT’s biggest weakness is that it can <strong>hallucinate</strong>: produce fluent, confident, wrong answers — invented statistics, quotes, book titles, even court cases. It is not lying; it is producing what <em>sounds</em> right. The fix is a habit, not a setting.
            </p>
            <Figure number={11} caption="The checking habit. The more an answer matters, the more of it you verify.">
              <VerifyFlow />
            </Figure>
            <h3>Privacy basics</h3>
            <ul>
              <li><strong>Don’t paste secrets</strong>: passwords, bank or card details, Aadhaar or passport numbers, confidential client data.</li>
              <li><strong>Check Data Controls</strong> in settings. You can choose whether your chats help improve OpenAI’s models, and delete chats.</li>
              <li><strong>Use temporary chat</strong> for one-off sensitive questions: it doesn’t appear in history or use memory.</li>
              <li><strong>Review memory</strong> now and then (Settings → Personalization) and delete anything you’d rather it forgot.</li>
              <li><strong>At work, follow your organisation’s rules.</strong> Business and Enterprise plans have different data terms from personal accounts.</li>
            </ul>
            <Callout kind="warn">
              <p><strong>Students:</strong> check your school’s or university’s AI policy. Using ChatGPT to explain, quiz and give feedback is usually encouraged; submitting its writing as your own usually is not — and you learn far less.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="under-the-hood" level="Advanced" number={10}>Under the hood</SectionHeading>
            <h3>Tokens and the context window</h3>
            <p>
              Models read and write <strong>tokens</strong>, not words. English averages about three-quarters of a word per token; many other languages, including Hindi and Bengali, use more tokens for the same meaning. The <strong>context window</strong> is the maximum number of tokens the model can take in at once, and everything in Fig. 3 has to share it — including room for the reply.
            </p>
            <Figure number={12} caption="An illustrative context budget. When a conversation outgrows the window, the oldest material has to be summarised or dropped.">
              <TokenBudget />
            </Figure>
            <p>
              This explains a lot of odd behaviour. A very long chat may “forget” what you said at the start; a huge PDF may be searched in pieces rather than read whole. The practical fix: start fresh chats for new topics, and restate key facts when a conversation has run long.
            </p>

            <h3>Why the same question gets different answers</h3>
            <p>
              At every step the model produces a probability for each possible next token, then <strong>samples</strong> one. Some randomness (controlled by a setting called <em>temperature</em>) keeps writing varied and natural, but it means two identical prompts can take different paths. That is a feature for brainstorming and a reason to double-check facts.
            </p>

            <h3>How tools really work</h3>
            <p>
              The model cannot browse or run code by itself. Instead it has been trained to write a special <strong>tool call</strong> — a structured request like <code>search(&quot;Shillong weather&quot;)</code>. The app sees it, runs the tool, pastes the results into the context, and the model continues. Web search, file reading, image creation, data analysis and agent mode all work on this same loop.
            </p>
            <Figure number={13} caption="The tool loop behind search, data analysis and agents. The model decides when to call a tool; the app does the calling.">
              <ToolCallFlow />
            </Figure>

            <h3>Memory is just more context</h3>
            <p>
              “Memory” sounds mysterious but is simple: short notes about you are stored and <strong>quietly added to the context</strong> of future chats. Nothing about the model itself changes. That is why you can view and edit memories as plain sentences, and why turning memory off makes ChatGPT forget you instantly.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="custom-gpts" level="Advanced" number={11}>Custom GPTs and Projects</SectionHeading>
            <p>
              Once you catch yourself pasting the same instructions again and again, it is time to package them. <strong>Projects</strong> group related chats with shared files and instructions — one for your thesis, one for a client. <strong>Custom GPTs</strong> go further: a named assistant with its own instructions, knowledge files and tools that you can reuse and share with a link, all built by describing what you want. No code required.
            </p>
            <Figure number={14} caption="What goes into a custom GPT. The instructions matter most; knowledge files keep it grounded in your material.">
              <CustomGptAnatomy />
            </Figure>
            <Callout kind="tip" title="Writing GPT instructions that hold up">
              <p>Write instructions like a job description: who the GPT serves, what it should always do, what it should never do, and what to do when unsure. Then test it with awkward questions — off-topic ones, vague ones, ones that try to get it to break its rules — and tighten the instructions until it behaves.</p>
            </Callout>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="api" level="Advanced" number={12}>Building with the API</SectionHeading>
            <p>
              The ChatGPT app is one product built on OpenAI’s models. Developers can use the same models directly through the <strong>OpenAI API</strong> to build their own apps, chatbots and automations. It is a different product with different billing.
            </p>
            <Figure number={15} caption="The app and the API side by side. Many people use both.">
              <AppVsApi />
            </Figure>
            <h3>Your first API call</h3>
            <p>
              Create an API key in the OpenAI developer platform, store it as an environment variable called <code>OPENAI_API_KEY</code>, install the SDK with <code>pip install openai</code>, and run:
            </p>
            <Figure number={16} caption="A first call using the Responses API in Python. The model name is the one OpenAI’s quickstart uses at the time of writing; check the docs for the current list.">
              <WindowFrame title="first_call.py — Python">
                <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{PY_BASIC}</code></pre>
                <div className="border-t border-[var(--border)] bg-[var(--paper-tint)] px-4 py-3 mono text-[12px] leading-[1.7] text-[var(--text-secondary)]">
                  <span className="text-[var(--fig-green)]">$</span> python first_call.py<br />
                  Compound interest means you earn interest on your interest. Put ₹10,000 away at 7% a year: after year 1 you have ₹10,700; after 5 years, about ₹14,026…
                  <br /><span className="text-[var(--text-tertiary)]">(sample output — yours will differ)</span>
                </div>
              </WindowFrame>
            </Figure>
            <p>
              <code>instructions</code> plays the role of the system prompt; <code>input</code> is the user’s message. The API does not keep your conversation for you by default in the way the app does, so a chatbot either sends the earlier turns back each time or uses the API’s own conversation-state options.
            </p>
            <h3>Getting data back, not prose</h3>
            <p>
              For software, free text is awkward to use. <strong>Structured Outputs</strong> make the model reply with JSON that is guaranteed to match a schema you define — perfect for sorting feedback, extracting fields from invoices, or routing support tickets.
            </p>
            <Figure number={17} caption="Structured Outputs: the reply must match the JSON Schema, so your code can rely on its shape. Sample output shown in the final comment.">
              <WindowFrame title="classify.py — Python">
                <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{PY_JSON}</code></pre>
              </WindowFrame>
            </Figure>
            <p>
              From here the path leads to <strong>function calling</strong> (the model asks your code to run a function, exactly like the tool loop in Fig. 13), <strong>retrieval</strong> over your own documents, and <strong>agents</strong> that chain many calls together. Three rules keep you out of trouble:
            </p>
            <ul>
              <li><strong>Keep your API key secret.</strong> Only ever call the API from a server, never from code that runs in a visitor’s browser or a mobile app bundle.</li>
              <li><strong>Watch costs.</strong> You pay per token in and out; set a monthly budget limit in your account settings before you experiment.</li>
              <li><strong>Test with real examples.</strong> Collect twenty or so realistic inputs, check the outputs, and re-run them whenever you change the prompt or model.</li>
            </ul>
            <Callout kind="deep">
              <p>Typed output guarantees the <em>shape</em> of an answer, not its truth. A schema-valid <code>{`{"sentiment": "positive"}`}</code> can still be the wrong label. Treat model outputs as judgments to be evaluated on your own data, and send low-confidence or high-stakes cases to a person.</p>
            </Callout>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="mistakes" level="Beginner" number={13}>Common mistakes, and the fix</SectionHeading>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Mistake</th>
                    <th scope="col">Do this instead</th>
                  </tr>
                </thead>
                <tbody>
                  {MISTAKES.map(([m, f]) => (
                    <tr key={m}>
                      <td className="text-[var(--text-primary)]">✗ {m}</td>
                      <td>✓ {f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={14}>Your 30-day plan</SectionHeading>
            <p>
              Skill with ChatGPT comes from use, not reading. Here is a month of small, practical steps. Tick them off as you go.
            </p>
            <Figure number={18} caption="Four weeks from first chat to your own custom GPT — and, for developers, your first API call." wide>
              <ThirtyDayPlan />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "ChatGPT gives you a statistic with a source. What should you do before putting it in a report?", a: "Open the source and confirm it says what ChatGPT claims. Models can invent or misattribute figures and citations." },
                { q: "Your long chat seems to have forgotten a detail from the start. Why, and what helps?", a: "The conversation may have outgrown the context window, so early parts were summarised or dropped. Restate the key facts, or start a fresh chat with a short summary." },
                { q: "Which one ingredient most often fixes a disappointing answer?", a: "Context: who it’s for, your situation, and what you have already tried. The model only knows what is in the conversation." },
                { q: "Why must an API key never be placed in a website’s front-end code?", a: "Anyone can read code that runs in the browser, copy the key, and run up charges on your account. Call the API only from a server." },
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
              That is ChatGPT from the first click to the first line of code. The best next step is the simplest: open it now and ask it for help with something you actually need to do today. 🚀
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              ChatGPT and GPT are products of OpenAI; this article is independent and not affiliated with or endorsed by OpenAI. Interface screens are illustrations, and sample outputs are examples. API code follows OpenAI’s developer documentation as of September 2026. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
