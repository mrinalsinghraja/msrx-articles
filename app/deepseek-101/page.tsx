import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, MathBlock, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { GrpoSimulator } from "@/components/figures/GrpoSimulator";
import {
  DeepSeekAppMock,
  DeepSeekMoE,
  DeepSeekMoment,
  DeepSeekPath,
  DeepSeekTimeline,
  FourDoors,
  LocalSizes,
  MlaCache,
  OllamaMock,
  OpenSpectrum,
  PrivacyChooser,
  R1Pipeline,
  SameCode,
} from "@/components/figures/deepseek-guide";

const article = getArticle("deepseek-101") as Article;
const previous = getArticle("microsoft-copilot-101") as Article;
const next = getArticle("typesafe-jev-101") as Article;
const first = getArticle("welcome-to-the-world-of-ai") as Article;
const chatgpt = getArticle("chatgpt-101") as Article;
const gemini = getArticle("google-gemini-101") as Article;
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
  { name: "DeepSeek 101", path },
];

const TOC = [
  { id: "what-is-deepseek", label: "What is DeepSeek?" },
  { id: "history", label: "From hedge fund to headline" },
  { id: "moment", label: "The January 2025 shock" },
  { id: "four-doors", label: "Four ways to use it" },
  { id: "get-started", label: "Getting started with the app" },
  { id: "prompting", label: "Prompting a reasoning model" },
  { id: "architecture", label: "How it’s built so cheaply" },
  { id: "r1", label: "How R1 learned to reason" },
  { id: "grpo", label: "GRPO, the maths" },
  { id: "open-weights", label: "Open weights, explained" },
  { id: "local", label: "Run it on your computer" },
  { id: "api", label: "The DeepSeek API" },
  { id: "privacy", label: "Privacy and trust" },
  { id: "plan", label: "Your 30-day path" },
];

const PY_API = `import os
from openai import OpenAI   # DeepSeek's API speaks the OpenAI format

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "You are a patient physics tutor for Class 11 students."},
        {"role": "user", "content": "Why does a ball thrown straight up take as long to come down as to go up?"},
    ],
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)

message = response.choices[0].message
print("THINKING:\\n", message.reasoning_content)   # the model's working
print("ANSWER:\\n", message.content)               # the final reply`;

const PY_LOCAL = `from openai import OpenAI

# Same SDK, pointed at Ollama running on your own machine
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="deepseek-r1:8b",
    messages=[{"role": "user", "content": "Summarise this contract clause in plain Hindi: ..."}],
)
print(response.choices[0].message.content)   # nothing left your computer`;

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

export default function DeepSeek101() {
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
          about: { "@type": "SoftwareApplication", name: "DeepSeek", applicationCategory: "AI assistant", publisher: { "@type": "Organization", name: "DeepSeek" } },
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
            {article.series} · Article 6
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">DeepSeek 101</span>: from the app to running it on your own computer
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
              New to DeepSeek? Read the green sections to understand the story and start using it safely. Curious why it made headlines? The amber sections explain the engineering. Want the deep end? The red sections cover GRPO, running models locally and the API.
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
              In the last week of January 2025, a free chatbot from a little-known Chinese company became the most downloaded app in America, and the world’s most valuable chip-maker lost close to $600 billion of stock-market value in a single day. The company was DeepSeek, and it had just released a reasoning model as good as OpenAI’s best — and given it away.
            </p>
            <p>
              DeepSeek is worth understanding for two reasons. As a tool, it is capable, very cheap and, uniquely among the top labs, it publishes its models so anyone can run them. And as a story, it changed how the whole industry thinks about what building frontier AI costs. This guide covers both: the history, how to use it step by step, the clever engineering behind it, how to run it on your own computer, and the privacy questions you should weigh.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>Model names, prices and API details here come from DeepSeek’s API documentation and changelog, checked on the day of publishing; architecture details come from DeepSeek’s published research papers. Screens are illustrations. If you haven’t read them, our guides to <Link href={`/${chatgpt.slug}`}>ChatGPT</Link> and <Link href={`/${gemini.slug}`}>Gemini</Link> cover the basics of chat assistants that apply here too.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-deepseek" level="Beginner" number={1}>What is DeepSeek?</SectionHeading>
            <p>
              <strong>DeepSeek is a Chinese AI company, based in Hangzhou, and the name of its family of AI models and chat app.</strong> You can use it like ChatGPT — ask questions, write, code, analyse — and it is best known for <em>reasoning</em>: it can think a problem through step by step, and it shows you that thinking.
            </p>
            <p>
              Two things make it different from ChatGPT, Claude or Gemini. First, <strong>open weights</strong>: DeepSeek publishes its models for anyone to download, run and modify, so you can use DeepSeek without using DeepSeek’s servers at all. Second, <strong>price</strong>: its engineering is so efficient that its API costs a small fraction of most Western rivals.
            </p>
            <Callout kind="eli5">
              <p>Most AI companies sell you a meal in their restaurant: you can eat it, but not see the kitchen. DeepSeek also publishes the recipe. You can eat at their restaurant, or cook the same dish at home — where nobody else sees what you’re eating.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>From hedge fund to headline</SectionHeading>
            <p>
              DeepSeek grew out of <strong>High-Flyer</strong>, a quantitative hedge fund co-founded by engineer Liang Wenfeng that used AI for trading and had bought thousands of Nvidia GPUs before US export controls tightened. In 2023 Liang spun out DeepSeek as a research lab with a stated goal of general AI, funded by the fund rather than outside investors — and with a culture of publishing its methods openly.
            </p>
            <Figure number={1} caption="DeepSeek’s major releases, from its first open models to today’s V4 family. Dates from 2024 onward follow DeepSeek’s API changelog.">
              <DeepSeekTimeline />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="moment" level="Beginner" number={3}>The January 2025 shock</SectionHeading>
            <p>
              Why did one model move markets? Until then, the assumption was that frontier AI required tens of billions of dollars and the most advanced chips — a game only a few American giants could play. DeepSeek, working under export restrictions that limited it to less powerful Nvidia chips, reported that the final training run of V3 used about 2.8 million GPU-hours, roughly $5.6 million at rental prices, and then released R1, which matched OpenAI’s o1 on many maths and coding tests.
            </p>
            <Figure number={2} caption="The DeepSeek moment in numbers. The $5.6 million covers GPU time for the final V3 run only — not the research, experiments, staff or hardware before it.">
              <DeepSeekMoment />
            </Figure>
            <p>
              The reaction was partly overdone — the headline cost left out a great deal, and the big labs soon released stronger models. But the lesson stuck: clever engineering can substitute for a lot of raw computing power, and open models can stay close behind closed ones.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="four-doors" level="Beginner" number={4}>Four ways to use DeepSeek</SectionHeading>
            <p>
              Because the models are open, “using DeepSeek” can mean four quite different things — and the difference matters most for where your data goes.
            </p>
            <Figure number={3} caption="Four ways to use DeepSeek models, and where your words are processed in each." wide>
              <FourDoors />
            </Figure>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="get-started" level="Beginner" number={5}>Getting started with the app</SectionHeading>
            <Figure number={4} caption="Your first few minutes with the DeepSeek app.">
              <FlowSteps
                steps={[
                  { icon: "🌐", title: "Open it", body: "chat.deepseek.com, or the official app", tone: "c" },
                  { icon: "👤", title: "Sign up", body: "email, or phone in some regions", tone: "c" },
                  { icon: "🧠", title: "Pick a mode", body: "DeepThink for hard problems", tone: "v" },
                  { icon: "💬", title: "Ask", body: "a real task, in plain words", tone: "a" },
                  { icon: "🔍", title: "Read the thinking", body: "and check the answer", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Open DeepSeek</strong> at <code>chat.deepseek.com</code>, or install the app published by DeepSeek on iPhone or Android. Watch out for copycat apps with similar names and logos.</li>
              <li><strong>Create an account</strong> and read the privacy notice — we come back to this in section 13.</li>
              <li><strong>Choose how it answers.</strong> <em>DeepThink</em> turns on reasoning for maths, logic, code and planning; leave it off for quick everyday questions. <em>Search</em> lets it look things up on the web.</li>
              <li><strong>Read the thinking.</strong> DeepSeek shows its reasoning in a collapsible box above the answer. It’s a great way to learn — and to spot where it went wrong.</li>
            </ol>
            <Figure number={5} caption="Illustration of the DeepSeek app: the reasoning shown above the answer, and the DeepThink and Search switches.">
              <DeepSeekAppMock />
            </Figure>
            <Callout kind="tip">
              <p>Visible reasoning is a teaching tool. Ask a maths or science question, then read how it worked it out. If a step looks wrong, say so — “in your third step you added instead of subtracting” — and it will usually fix it.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="prompting" level="Intermediate" number={6}>Prompting a reasoning model</SectionHeading>
            <p>
              Reasoning models like DeepSeek’s like slightly different handling from ordinary chatbots. DeepSeek’s own R1 research paper found some habits that help:
            </p>
            <ul>
              <li><strong>Describe the problem, not the method.</strong> With DeepThink on, you don’t need “think step by step” — it already does. Spend your words on the goal, the facts and the constraints.</li>
              <li><strong>Ask directly, without long example lists.</strong> The R1 paper reported that few-shot examples tended to make it perform <em>worse</em>; a clear zero-shot request worked best.</li>
              <li><strong>Say the output format</strong> you want: “final answer in a box”, “a table”, “JSON only”.</li>
              <li><strong>Turn thinking off for simple jobs</strong> — rewriting, translating, short summaries. It is faster and the result is often just as good.</li>
            </ul>
            <p>
              Everything else from <Link href={`/${chatgpt.slug}#prompting`}>the six prompt ingredients</Link> still applies: give context, say who it’s for, and iterate with follow-ups.
            </p>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="architecture" level="Intermediate" number={7}>How it’s built so cheaply</SectionHeading>
            <p>
              DeepSeek’s models are Transformers, like every modern chatbot (our <Link href={`/${first.slug}`}>first article</Link> explains the basics). What makes them efficient is a stack of engineering ideas, published in DeepSeek’s technical reports. Two matter most.
            </p>
            <h3>1. DeepSeekMoE: many small experts</h3>
            <p>
              In a <strong>mixture-of-experts</strong> model, each layer holds many expert sub-networks and a router picks a few for each token, so most of the model sits idle on any given step. DeepSeek’s version splits experts into many small, <em>fine-grained</em> ones for sharper specialisation, and adds <em>shared</em> experts that every token uses, so common knowledge isn’t duplicated across experts.
            </p>
            <Figure number={6} caption="DeepSeekMoE, simplified: a shared expert every token uses, plus a few of many small routed experts.">
              <DeepSeekMoE />
            </Figure>
            <h3>2. Multi-head latent attention (MLA)</h3>
            <p>
              As a model reads a long conversation, it keeps a memory of every earlier token — the <strong>KV cache</strong> — and on long contexts that cache, not the model, fills up GPU memory. MLA squeezes each token’s keys and values into one small compressed vector and expands them only when needed.
            </p>
            <Figure number={7} caption="Why MLA matters: a far smaller KV cache means longer contexts and more users per GPU. Bar lengths are illustrative.">
              <MlaCache />
            </Figure>
            <Callout kind="deep">
              <p>Other tricks from the V3 report: <strong>multi-token prediction</strong> (training the model to predict two tokens ahead, which improves learning and speeds up generation); <strong>FP8 mixed-precision training</strong> (using 8-bit numbers for most maths, halving memory traffic); an <strong>auxiliary-loss-free load-balancing</strong> method that keeps experts evenly busy without hurting quality; and <strong>DualPipe</strong>, a schedule that overlaps communication between GPUs with computation. Later, V3.2 added <strong>DeepSeek Sparse Attention</strong>, where a lightweight “indexer” picks which earlier tokens each token should attend to, making very long contexts much cheaper.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="r1" level="Advanced" number={8}>How R1 learned to reason</SectionHeading>
            <p>
              R1’s most influential idea was an experiment. DeepSeek took its base model and trained it with <strong>reinforcement learning only</strong>: no human-written examples of good reasoning at all. The model answered maths and coding problems and was rewarded simply when the final answer was correct and in the right format. The result, <strong>R1-Zero</strong>, taught itself to reason at length — spending more tokens on harder problems, checking its work, even pausing to say, in effect, “wait, let me re-examine that”, which the paper called an “aha moment”.
            </p>
            <p>
              R1-Zero’s reasoning was powerful but messy: it mixed languages and was hard to read. The released R1 used a four-stage recipe to keep the reasoning and fix the readability:
            </p>
            <Figure number={8} caption="From R1-Zero’s experiment to the R1 recipe, following the R1 paper. The final step — distillation — produced the small R1 models people run on laptops." wide>
              <R1Pipeline />
            </Figure>
            <p>
              <strong>Distillation</strong> then transferred R1’s skill to much smaller models: DeepSeek generated hundreds of thousands of R1 reasoning examples and fine-tuned small open models from the Qwen and Llama families on them. That is why you can run a “DeepSeek-R1” with 8 billion parameters on a laptop — it’s a smaller model that learned from the big one.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="grpo" level="Advanced" number={9}>GRPO, the maths</SectionHeading>
            <p>
              The reinforcement-learning algorithm behind R1 is <strong>GRPO — Group Relative Policy Optimization</strong>, introduced in DeepSeek’s earlier DeepSeekMath paper. Classic methods such as PPO train a second “critic” network, as big as the model itself, to estimate how good each answer is. GRPO drops the critic. For each question it samples a <em>group</em> of answers, scores them all, and judges each answer against the group:
            </p>
            <MathBlock reading="each answer’s advantage = how much better than the group average, in units of the group’s spread">
              Aᵢ = ( rᵢ − mean(r₁…r<sub>G</sub>) ) / std(r₁…r<sub>G</sub>)
            </MathBlock>
            <p>
              Answers with a positive advantage are made more likely, those with a negative advantage less likely, with a clipping term and a penalty for drifting too far from a reference model to keep training stable. Try it:
            </p>
            <div className="!my-8">
              <GrpoSimulator />
            </div>
            <Callout kind="deep">
              <p>Two design choices made this work at scale. <strong>Rule-based rewards</strong> — a maths checker, code tests, a format check — can’t be gamed the way a learned reward model can. And <strong>no critic</strong> roughly halves the memory needed for RL on a huge model. The catch is the “no signal” case you can trigger above: if every answer in a group gets the same reward, nothing is learned, so problems must be neither too easy nor too hard.</p>
            </Callout>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="open-weights" level="Intermediate" number={10}>Open weights, explained</SectionHeading>
            <p>
              A model’s <strong>weights</strong> are the billions of numbers learned in training — the model itself. DeepSeek publishes its weights on Hugging Face, including the V4 family. R1 was released under the permissive <strong>MIT licence</strong>, meaning anyone could use, modify and sell products built on it.
            </p>
            <Figure number={9} caption="Closed versus open-weight models. “Open weights” is not quite “open source”: the weights and a paper are published, but the training data and full training code usually are not.">
              <OpenSpectrum />
            </Figure>
            <p>
              Open weights mean other companies can host DeepSeek models on their own servers in other countries — and you can run the smaller ones yourself. The trade-off: the full-size models are enormous, so running them needs data-centre hardware.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="local" level="Advanced" number={11}>Run it on your own computer</SectionHeading>
            <p>
              The easiest way to run DeepSeek locally is <strong>Ollama</strong>, a free app for Mac, Windows and Linux. Install it from <code>ollama.com</code>, open a terminal and run one command. The first run downloads the model; after that, it works <strong>completely offline</strong>.
            </p>
            <Code title="Terminal" code={`ollama run deepseek-r1          # the default size
ollama run deepseek-r1:8b       # pick a size: 1.5b, 7b, 8b, 14b, 32b, 70b…`} />
            <Figure number={10} caption="Illustration: a distilled R1 running offline in Ollama, showing its reasoning between <think> tags before the answer.">
              <OllamaMock />
            </Figure>
            <p>Which size can your machine handle? Rough guidance for the usual compressed (4-bit) versions:</p>
            <Figure number={11} caption="Approximate hardware for local DeepSeek-R1 models. Bigger models are smarter but slower; start small and step up.">
              <LocalSizes />
            </Figure>
            <Callout kind="tip">
              <p>Prefer clicking to typing? <strong>LM Studio</strong> is a free desktop app with a chat window, a model browser and one-click downloads of DeepSeek models. Remember the small models are distillations — noticeably less capable than the full DeepSeek in the app.</p>
            </Callout>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="api" level="Advanced" number={12}>The DeepSeek API</SectionHeading>
            <p>
              DeepSeek’s API uses the same request format as OpenAI’s (and it also accepts Anthropic’s format), so existing code and tools work by changing two settings. Create an account at <code>platform.deepseek.com</code>, add a small balance, create a key and set it as <code>DEEPSEEK_API_KEY</code>. The current models are <code>deepseek-flash</code> (DeepSeek-V4.1-Flash, recommended, and it understands images) and <code>deepseek-v4-pro</code>, both with a <strong>1-million-token</strong> context window.
            </p>
            <Figure number={12} caption="A first call with thinking on, following DeepSeek’s documentation. The reasoning comes back in its own field, separate from the answer.">
              <Code title="first_call.py — Python" code={PY_API} />
            </Figure>
            <p>
              Because it is the OpenAI format, the <em>same code</em> can talk to DeepSeek’s servers, to a DeepSeek model on your own laptop, or to another host — only two lines change:
            </p>
            <Figure number={13} caption="One client library, three places to run DeepSeek.">
              <SameCode />
            </Figure>
            <Code title="local.py — Python" code={PY_LOCAL} />
            <h3 className="!mt-10">Cost and features</h3>
            <p>
              API prices are per million tokens and very low: at the time of writing, <code>deepseek-flash</code> costs about $0.15–$0.30 per million input tokens and $0.60–$1.20 per million output tokens, with off-peak hours half price. Repeated prompt prefixes are cached automatically and billed at a small fraction of the normal rate. The API also supports JSON output, tool calling and a thinking <code>reasoning_effort</code> setting.
            </p>
            <Callout kind="warn">
              <p><strong>When using tools with thinking on</strong>, DeepSeek’s docs require you to send back the earlier turns’ <code>reasoning_content</code>; without tools you can drop it. And as always, keep your API key on a server, never in a web page or app.</p>
            </Callout>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="privacy" level="Beginner" number={13}>Privacy and trust</SectionHeading>
            <p>
              This is the section to read carefully. DeepSeek’s privacy policy says the data it collects from its app and API is stored on servers in the People’s Republic of China, where companies can be required to cooperate with authorities. In early 2025, Italy’s data-protection regulator blocked the app, and several governments — including Australia, Taiwan and South Korea — restricted it on official devices; India’s finance ministry advised staff not to use AI tools such as DeepSeek on office computers.
            </p>
            <p>
              The hosted app also follows Chinese content rules: on topics that are politically sensitive in China, it may decline to answer or give a one-sided account. The open weights carry some of that tuning too, though independent hosts can and do adjust it.
            </p>
            <Figure number={14} caption="A simple way to decide how to use DeepSeek. The same thinking applies to any AI service: match where your data goes to how sensitive it is.">
              <PrivacyChooser />
            </Figure>
            <ul>
              <li><strong>Never share</strong> passwords, bank or card numbers, Aadhaar or passport numbers, or anyone else’s personal details.</li>
              <li><strong>For confidential work</strong>, use a local model or a host whose data terms your organisation has approved.</li>
              <li><strong>Check facts</strong> as with any AI — reasoning models can still reason their way to a wrong answer confidently.</li>
            </ul>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={14}>Your 30-day path</SectionHeading>
            <p>From your first chat to running models and reading the research.</p>
            <Figure number={15} caption="Four weeks with DeepSeek. The local week is the one most people skip — and the one that teaches the most." wide>
              <DeepSeekPath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What does the famous $5.6 million figure actually cover?", a: "DeepSeek’s estimate of GPU rental cost for the final training run of V3 — not earlier research and experiments, staff, data or the hardware itself." },
                { q: "What was special about R1-Zero?", a: "It learned to reason through reinforcement learning alone, rewarded only for correct, well-formatted answers, with no human-written reasoning examples." },
                { q: "In GRPO, why does a group where every answer scores the same teach nothing?", a: "Each answer’s advantage is its reward minus the group mean. If all rewards are equal, every advantage is zero, so no answer is pushed up or down." },
                { q: "You want to summarise a confidential contract with DeepSeek. What’s the safest option?", a: "Run a DeepSeek model locally (for example with Ollama) so the text never leaves your computer, or use a host your organisation has approved." },
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
              That is DeepSeek: a capable, cheap and open family of models, a genuinely important piece of AI history, and a tool that asks you to think about where your data goes. Use it with your eyes open — and try running it yourself at least once. 🐋
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              DeepSeek is a product of Hangzhou DeepSeek Artificial Intelligence; Ollama and LM Studio are independent projects. This article is independent and not affiliated with or endorsed by any of them. Model names, prices, API code and release dates follow DeepSeek’s API documentation and changelog; Ollama sizes follow the Ollama library; architecture and training details follow DeepSeek’s V2, V3, DeepSeekMath and R1 papers — all as of 24 September 2026. Figure values are simplified where noted; screens are illustrations. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
