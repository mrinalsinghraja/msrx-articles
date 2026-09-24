import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, MathBlock, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { FlowSteps } from "@/components/articles/AiFigures";
import { BatchCalculator, ThresholdTuner } from "@/components/figures/TypesafePlaygrounds";
import {
  Blueprint,
  CalibrationChart,
  EngagementTimeline,
  FirstCallTerminal,
  JevCall,
  Limits,
  PatternCards,
  PlaygroundMock,
  PromptVsTyped,
  ThreePrimitives,
  TrainingTargets,
  TwoSystems,
  TypesafePath,
  WhichTool,
} from "@/components/figures/typesafe-guide";

const article = getArticle("typesafe-jev-101") as Article;
const previous = getArticle("deepseek-101") as Article;
const first = getArticle("welcome-to-the-world-of-ai") as Article;
const chatgpt = getArticle("chatgpt-101") as Article;
const claude = getArticle("how-to-use-claude") as Article;
const path = `/${article.slug}`;
const GUIDE = "https://mrinalsinghraja.github.io/typesafe-easy-guide/";

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
  { name: "TypeSafe and Jev", path },
];

const TOC = [
  { id: "problem", label: "The professor and the checkbox" },
  { id: "history", label: "How software talks to AI" },
  { id: "system-one", label: "System 1 and System 2" },
  { id: "how-jev-works", label: "How Jev works" },
  { id: "primitives", label: "Choice, Noul and Score" },
  { id: "calibration", label: "Calibration and confidence" },
  { id: "rlcd", label: "RLCD: training for trust" },
  { id: "first-app", label: "Your first app, step by step" },
  { id: "cost", label: "Batching and cost" },
  { id: "blueprint", label: "The layered blueprint" },
  { id: "patterns", label: "Patterns that compose" },
  { id: "skill", label: "The Claude Code skill" },
  { id: "limits", label: "Limits and mistakes" },
  { id: "plan", label: "Your 30-day path" },
];

const CURL = `curl https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer $TYPESAFE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "jev-latest",
    "state": "Help! My payouts have been failing for 3 days.",
    "questions": {
      "is_urgent": { "type": "noul", "instructions": "Does this convey urgency?" },
      "department": {
        "type": "choice",
        "instructions": "Which team should handle this?",
        "criteria": {
          "billing":   "Payments, invoicing, refunds",
          "technical": "Bugs, outages, integrations",
          "sales":     "Pricing, upgrades, new accounts"
        }
      }
    }
  }'`;

const PY_APP = `from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

TICKET = "I was charged twice for my Pro plan this month. Refund one today please!!"

with TypeSafeClient() as client:            # reads TYPESAFE_API_KEY
    r = client.system_one(
        state={"ticket": TICKET},
        questions={
            "team": Choice(
                instructions="Which team should handle this ticket?",
                criteria={
                    "billing":   "Payment or subscription issues",
                    "technical": "Bugs or integration problems",
                    "sales":     "Pricing or account questions",
                    "other":     "None of the above",
                },
            ),
            "urgent": Noul(instructions="The ticket conveys urgency or time-sensitivity"),
            "refund": Noul(instructions="The customer asks for a refund"),
            "frustration": Score(
                instructions="How frustrated does the customer appear?",
                criteria=["Calm, just stating facts", "Frustrated but civil", "Very angry, strong language"],
            ),
        },
        model="jev-latest",   # pin a versioned ID once you have tuned thresholds
    )`;

const PY_RULES = `team = r.choices["team"]
urgent = r.nouls["urgent"].noul
frustration = r.scores["frustration"].score

queue = team.choice if team.confidence >= 0.5 else "human-review"
priority = "P1" if urgent > 0.8 or frustration >= 1.5 else "P2"
refund_flag = r.nouls["refund"].noul > 0.7

print(f"queue={queue} priority={priority} refund_flag={refund_flag}")
# queue=billing priority=P1 refund_flag=True   (sample output)`;

function Code({ title, code }: { title: string; code: string }) {
  return (
    <WindowFrame title={title}>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{code}</code></pre>
    </WindowFrame>
  );
}

export default function TypesafeJev101() {
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
          about: { "@type": "SoftwareApplication", name: "TypeSafe Jev", applicationCategory: "AI model API", publisher: { "@type": "Organization", name: "TypeSafe AI" } },
          isBasedOn: GUIDE,
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
            {article.series} · Article 7
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">TypeSafe and Jev</span>: how typed AI judgments are changing the way we use AI
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
              Not a developer? The green sections explain the big idea — why software shouldn’t “chat” with AI — with everyday analogies. Builders: the amber and red sections take you from the three question types to a working app, cost maths and production patterns.
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
              Over the last six articles we have met the great AI chatbots — ChatGPT, Claude, Gemini, Copilot, DeepSeek. All of them are built to <em>talk</em>. But a huge share of what software actually needs from AI isn’t conversation at all. It’s tiny decisions: is this email urgent? Which team should get this ticket? Does this review mention a crash? How angry is this customer?
            </p>
            <p>
              <strong>TypeSafe</strong> is a company built around that observation, and <strong>Jev</strong> is its model. Jev doesn’t write a single word. You give it some text and a list of typed questions, and it returns typed answers — a choice from your list, a probability, a position on a scale — with calibrated confidence, in about a tenth of a second, for a tiny fraction of a cent. This article explains why that is a genuinely different way of engaging AI, and how to build with it, from the first idea to production patterns.
            </p>
            <Callout kind="fact" title="Before we start">
              <p>This article is based on the <a href={GUIDE} rel="noopener">TypeSafe Easy Guide</a>, an unofficial community guide, with every model fact, price, API shape and benchmark checked against TypeSafe’s documentation at <code>docs.typesafe.ai</code> on the day of publishing. MSRX is not affiliated with TypeSafe. Screens are illustrations; the terminal output in Fig. 10 is from a real run described in the guide.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="problem" level="Beginner" number={1}>The professor and the checkbox</SectionHeading>
            <p>
              Using a big chatbot for every small decision is like hiring a professor to tick checkboxes. It works — the professor is brilliant — but it’s slow, expensive, and sometimes, instead of a tick, you get an essay in the margin. Software then has to <em>read</em> that essay and hope to find a tick inside it. Developers call this pattern <strong>prompt-and-parse</strong>, and anyone who has built with it knows the pain.
            </p>
            <Figure number={1} caption="Prompt-and-parse versus a typed judgment. The typed answer can’t leave your list, can’t break, and tells you how sure it is.">
              <PromptVsTyped />
            </Figure>
            <Callout kind="eli5">
              <p>A chatbot is an essay exam; Jev is a multiple-choice test. Multiple-choice answers are faster to give, faster to mark, and you can’t get an answer that isn’t on the sheet. Jev also tells you, for each question, how sure it is.</p>
            </Callout>
            <p>
              The idea TypeSafe summarises in one sentence: <strong>let plain code do the steps, let Jev make the quick common-sense calls, and call a big AI only when you truly need writing or deep thinking.</strong>
            </p>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={2}>How software talks to AI: a short history</SectionHeading>
            <p>
              For fifty years, the way programs use “intelligence” has swung between two poles: typed and reliable but narrow, or flexible and general but messy. System One models are an attempt to get both.
            </p>
            <Figure number={2} caption="From hand-written rules to typed judgments. Each step fixed a problem the previous one left behind.">
              <EngagementTimeline />
            </Figure>
            <p>
              Classical machine learning — the spam filter in your inbox — already returned typed, calibrated answers, but every new task needed its own labelled dataset and model. Large language models removed that cost: describe any task in words and it works. System One models keep that flexibility while returning to typed, calibrated outputs.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="system-one" level="Beginner" number={3}>System 1 and System 2</SectionHeading>
            <p>
              The name comes from psychology. In <em>Thinking, Fast and Slow</em>, Nobel laureate Daniel Kahneman described two modes of the mind: <strong>System 1</strong>, fast and intuitive — you recognise a friend’s face instantly — and <strong>System 2</strong>, slow and deliberate — you work out 17 × 24. TypeSafe’s documentation puts it simply: System One models are “a class of AI models built to make fast, structured decisions that software can use directly.”
            </p>
            <Figure number={3} caption="Two kinds of thinking, two kinds of AI. Most software needs far more System 1 calls than System 2 ones.">
              <TwoSystems />
            </Figure>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how-jev-works" level="Intermediate" number={4}>How Jev works</SectionHeading>
            <p>
              Everything happens through one endpoint, <code>POST https://api.typesafe.ai/v1/systemone</code>. You send two things: the <strong>state</strong> — the text or JSON to judge — and <strong>questions</strong>, a map of named, typed questions. Jev reads the state once and answers every question in parallel; the questions can’t see each other’s answers.
            </p>
            <Figure number={4} caption="The shape of one Jev call, using the example from TypeSafe’s API reference." wide>
              <JevCall />
            </Figure>
            <Code title="Terminal — a raw API call" code={CURL} />
            <p className="!mt-6">
              Three details matter. The <strong>question IDs</strong> (<code>is_urgent</code>, <code>department</code>) are for your code only and are never sent to the model, so the instructions must carry the full meaning. You <strong>pay only for input tokens</strong> — at the time of writing $0.042 per million, with output free. And the model version comes back in every response, so you can log exactly which model made each decision.
            </p>
            <Callout kind="deep">
              <p>The current model is <code>jev-1.13.0</code>, reachable through the moving alias <code>jev-latest</code>. Per TypeSafe’s models page, a request can carry up to 64k tokens (32k for the state plus the longest question), input is text only, English is where accuracy is best, rate limits are 250,000 tokens per second and 1,200 requests per minute, and Jev is not trained on customer data, with zero data retention available for enterprise customers.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="primitives" level="Intermediate" number={5}>Choice, Noul and Score</SectionHeading>
            <p>
              Every question is one of three types — TypeSafe calls them <em>primitives</em> — and you choose by what the answer <em>means</em>:
            </p>
            <Figure number={5} caption="The three primitives with the answers from TypeSafe’s API example: one choice, one probability, one position on a ladder." wide>
              <ThreePrimitives />
            </Figure>
            <ul>
              <li><strong>Choice</strong> — pick one from up to 255 options. Returns the choice, the probability of every option, and a confidence. Always include an “other” or “none” option when nothing may fit.</li>
              <li><strong>Noul</strong> — the probability that a condition is true, from 0 to 1. Crucially, <strong>0.5 means “can’t tell”, not “somewhat”</strong>. When several labels can apply at once, ask one Noul per label.</li>
              <li><strong>Score</strong> — a position on 2 to 10 ordered levels, each describing a concrete situation. The answer is a probability-weighted position, so 1.4 means “between frustrated and furious, leaning frustrated”.</li>
            </ul>
            <Callout kind="tip" title="Writing good questions">
              <p>One narrow judgment per question — “polite?” and “on-topic?”, not “is this good?”. Write the exact condition, because Jev reads literally. Refer to parts of the state by path, like <code>ticket.messages[0].text</code>. And keep the instructions and criteria saying the same thing: a Noul where “true” means “no” confuses everyone, models included.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="calibration" level="Advanced" number={6}>Calibration and confidence</SectionHeading>
            <p>
              The probabilities are the point. Jev is trained to be <strong>calibrated</strong>: across many predictions, things it gives 0.8 to happen about 80% of the time. That turns uncertainty into something code can act on — which a chatbot’s confident tone never can.
            </p>
            <Figure number={6} caption="A reliability diagram, illustrative. Calibration is a property over many predictions; it never guarantees any single answer.">
              <CalibrationChart />
            </Figure>
            <p>
              For Choice and Score answers, Jev also returns a <strong>confidence</strong>: how concentrated the probability distribution is. For a three-option Choice, TypeSafe’s docs give it as:
            </p>
            <MathBlock reading="three options, top probability 0.85 → confidence ≈ 0.78 — concentrated, but not certain">
              confidence = ( 3 × p<sub>max</sub> − 1 ) / 2
            </MathBlock>
            <p>
              A practical way to use it is a traffic light: green, act automatically; amber, act but log; red, send to a person or a bigger model. Where to put the lines depends on what a mistake costs — a refund needs a higher bar than a folder label. Try it:
            </p>
            <div className="!my-8">
              <ThresholdTuner />
            </div>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="rlcd" level="Advanced" number={7}>RLCD: training for trust, not charm</SectionHeading>
            <p>
              How do you train a model to be calibrated? TypeSafe calls its method <strong>RLCD — reinforcement learning for calibrated decisions</strong> — and positions it as a third kind of post-training, alongside the two behind today’s chatbots.
            </p>
            <Figure number={7} caption="Three post-training targets. Each makes a model good at something different.">
              <TrainingTargets />
            </Figure>
            <p>
              TypeSafe’s argument, from its machine-learning primer: RLHF — a technique its co-founder Diogo Almeida helped pioneer, according to TypeSafe — optimises for answers <em>people prefer</em>, and that can reward confident-sounding answers over honest uncertainty. In the primer’s words: “An output can be compelling to a person without being reliable enough for unattended automation. Human preference and machine trustworthiness are different optimization targets.”
            </p>
            <Callout kind="deep">
              <p>The primer describes the failure mode as <strong>mode dropping</strong>: preference tuning narrows a model’s output distribution towards favoured styles, so its stated confidence stops reflecting real uncertainty. Training directly against outcomes, as RLCD does, keeps the distribution honest — which is exactly what thresholds and confidence routing rely on. (For how RLHF works, see our <Link href={`/${first.slug}#making-a-chatbot`}>first article</Link>.)</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="first-app" level="Intermediate" number={8}>Your first app, step by step</SectionHeading>
            <p>
              Let’s build what the guide builds: a <strong>support-ticket sorter</strong> that reads a customer message and decides the team, the urgency, whether a refund is requested, and how frustrated the customer is — in one call.
            </p>
            <Figure number={8} caption="From sign-up to a tuned app. Most of the real work is in the last step.">
              <FlowSteps
                steps={[
                  { icon: "👤", title: "Sign up", body: "console.typesafe.ai", tone: "c" },
                  { icon: "🧪", title: "Playground", body: "try questions, free of code", tone: "c" },
                  { icon: "🔑", title: "API key", body: "save as TYPESAFE_API_KEY", tone: "v" },
                  { icon: "🐍", title: "SDK + code", body: "one call, many questions", tone: "a" },
                  { icon: "🎯", title: "Test & tune", body: "20–50 real messages", tone: "g" },
                ]}
              />
            </Figure>
            <ol>
              <li><strong>Sign up</strong> at <code>console.typesafe.ai</code> with Google or email.</li>
              <li><strong>Play first.</strong> In the Playground, paste a sample message as the state, add questions, and look at the answers. It is the cheapest place to get your wording right.</li>
            </ol>
            <Figure number={9} caption="Illustration of the console Playground: state and questions on the left, typed answers on the right.">
              <PlaygroundMock />
            </Figure>
            <ol start={3}>
              <li><strong>Create an API key</strong> at <code>console.typesafe.ai/keys</code> and save it permanently in your shell profile:</li>
            </ol>
            <Code title="Terminal — save the key and install the SDK" code={`echo 'export TYPESAFE_API_KEY="paste-your-key-here"' >> ~/.zshrc
source ~/.zshrc

python3 -m venv .venv          # a private Python for this project
source .venv/bin/activate
pip install typesafe-sdk`} />
            <p className="!mt-6">Your first raw call returns something like this — a real run from the guide:</p>
            <Figure number={10} caption="A real first call: one Noul, one Choice, 376 input tokens — roughly $0.000016.">
              <FirstCallTerminal />
            </Figure>
            <ol start={4}>
              <li><strong>Ask every question in one call</strong> with the Python SDK:</li>
            </ol>
            <Code title="triage.py — the call" code={PY_APP} />
            <ol start={5} className="!mt-6">
              <li><strong>Let code decide.</strong> Jev supplies judgments; your code owns the rules, in plain sight:</li>
            </ol>
            <Code title="triage.py — the rules" code={PY_RULES} />
            <ol start={6} className="!mt-6">
              <li><strong>Test and tune.</strong> Run 20 to 50 real messages. Where answers are wrong, sharpen the wording or add a missing option. Set thresholds from your own results, then pin a versioned model ID so answers don’t shift under you.</li>
            </ol>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="cost" level="Intermediate" number={9}>Batching and cost</SectionHeading>
            <p>
              The guide explains the economics with a pizza: ordering thirteen toppings in thirteen separate deliveries means thirteen delivery fees. The document is the fee; the questions are the toppings. Since you pay for input, sending the document once with every question is far cheaper:
            </p>
            <MathBlock reading="D = document tokens, N = questions, q = tokens per question — batching saves close to N× when D ≫ q">
              separate: N × (D + q) &nbsp;&nbsp;vs&nbsp;&nbsp; batched: D + N × q
            </MathBlock>
            <p>
              TypeSafe measured it: 13 questions about the ~54,000-character Wikipedia article on the GDPR came out <strong>12.2× cheaper and 10× faster</strong> batched than as separate calls, with the same answers. Play with the numbers:
            </p>
            <div className="!my-8">
              <BatchCalculator />
            </div>
            <p>Six levers keep costs low, per the guide:</p>
            <ul>
              <li><strong>📦 Batch</strong> every independent question into one call, including speculative ones for branches you might take.</li>
              <li><strong>✂️ Trim the state</strong> to named fields — less to pay for, and less to distract the model.</li>
              <li><strong>💻 Code first</strong>: maths, dates, counting, regex and lookups cost nothing and never get it wrong.</li>
              <li><strong>👉 Select</strong>: code finds candidates, a Choice picks one — short, and no invented values.</li>
              <li><strong>💾 Store raw scores</strong>: change weights and thresholds later without paying again.</li>
              <li><strong>🪜 Cascade</strong>: cheap model first, Jev checks, the expensive model only when flagged.</li>
            </ul>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="blueprint" level="Advanced" number={10}>The layered blueprint</SectionHeading>
            <p>
              Put it together and a well-designed AI application looks like layers, each doing what it is best and cheapest at:
            </p>
            <Figure number={11} caption="The layered blueprint from the guide: code, one Jev call, code — and only the leftovers go to an LLM or a person." wide>
              <Blueprint />
            </Figure>
            <p>For any single step, one question tells you which layer it belongs to:</p>
            <Figure number={12} caption="Code first, Jev for judgments, a big model only for writing and deep reasoning.">
              <WhichTool />
            </Figure>
            <p>
              Big LLMs still have a job. The guide pictures Jev as the receptionist who sorts every visitor in a tenth of a second, and the LLM as the specialist called only when someone needs a written reply. A “needs a written reply?” Noul decides; the LLM gets a focused prompt with Jev’s decisions already in it; and Jev can check the draft against policy before a person approves it. Because most traffic never reaches the specialist, even a rate-limited free LLM tier can go a long way.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="patterns" level="Advanced" number={11}>Patterns that compose</SectionHeading>
            <p>
              TypeSafe’s docs describe these as “units of AI intelligence usable like programming primitives”. The interesting part is how they combine:
            </p>
            <Figure number={13} caption="Six patterns from TypeSafe’s documentation and cookbooks. Each keeps code in charge and uses judgments where code needs understanding." wide>
              <PatternCards />
            </Figure>
            <p>
              Real applications the guide lists include a smart inbox (folder, urgent, spam), app-review analysis (a sentiment Score plus one Noul per topic), search re-ranking (a relevance Score per result), invoice extraction (code finds candidate amounts, a Choice picks the total), fact-checking an LLM’s citations, guardrails on chatbot input and output, and résumé screening with a Score per skill weighted in code.
            </p>
            <Callout kind="deep">
              <p>Why storing raw judgments matters: in composite scoring, the model answers “how strong is this candidate’s SQL?” once. If the hiring manager later decides SQL matters more than communication, only the weights in your code change — no new model calls. With labelled outcomes, those stored judgments can even become features for a classical model; one TypeSafe cookbook uses an automated loop that proposes new questions and keeps those that improve a gradient-boosted classifier.</p>
            </Callout>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="skill" level="Intermediate" number={12}>The Claude Code skill</SectionHeading>
            <p>
              You don’t have to design all of this by hand. TypeSafe publishes a <strong>skill</strong> for coding agents: a briefing that teaches the agent TypeSafe’s design rules and points it at the live documentation before it plans or writes any code. In Claude Code (see our <Link href={`/${claude.slug}#claude-code`}>Claude guide</Link>):
            </p>
            <Code title="Terminal — install the skill" code={`claude plugin marketplace add typesafe-ai/skills
claude plugin install typesafe@typesafe-ai

# other coding agents
npx skills add typesafe-ai/skills --skill typesafe-ai`} />
            <p className="!mt-6">Then invoke it with what you want. Prompts from the guide:</p>
            <ul>
              <li><code>/typesafe:typesafe-ai explore this project and find fragile parsing or if/else logic that a judgment could replace</code></li>
              <li><code>/typesafe:typesafe-ai build an App Store review analyzer: sentiment score + one noul per topic</code></li>
              <li><code>/typesafe:typesafe-ai check whether any cookbook matches my code and refactor it</code></li>
            </ul>
            <Callout kind="tip">
              <p>The skill itself is free; test calls it makes are billed at Jev’s normal rate. Ask for a plan before code, and ask it to keep every question and threshold in one file so a person can review the wording — the part agents most often get subtly wrong. You don’t need an Anthropic API key for any of this: Claude Code uses its own login.</p>
            </Callout>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="limits" level="Beginner" number={13}>Limits and mistakes to avoid</SectionHeading>
            <p>
              TypeSafe publishes a candid “jaggedness” page for each model version, listing where it is weak. Knowing these is what separates a demo from a system:
            </p>
            <Figure number={14} caption="Known weak spots of jev-1.13, from TypeSafe’s jaggedness page and the guide, with the standard workaround for each.">
              <Limits />
            </Figure>
            <p>And the most common design mistakes:</p>
            <ul>
              <li><strong>One call per question</strong> instead of batching.</li>
              <li><strong>Reading a Noul of 0.5 as “medium”</strong> — it means “can’t tell”; use a Score for degree.</li>
              <li><strong>Treating confidence as “chance it’s right”</strong> — it measures concentration; validate on your own data.</li>
              <li><strong>Forgetting a “none of these” option</strong>, forcing a wrong pick.</li>
              <li><strong>Copying thresholds from examples</strong> instead of tuning on real data.</li>
              <li><strong>Using <code>jev-latest</code> in production</strong> — pin the version you tuned against.</li>
              <li><strong>Putting the API key in front-end code</strong> — call Jev from a server only.</li>
            </ul>
            <p>
              If these ideas seem familiar, they should: the prompting advice in our <Link href={`/${chatgpt.slug}#prompting`}>ChatGPT guide</Link> — be specific, give context, check the answer — still applies. TypeSafe’s twist is to make the answer itself something software can check.
            </p>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={14}>Your 30-day path</SectionHeading>
            <p>From your first Playground run to a production pattern.</p>
            <Figure number={15} caption="Four weeks with TypeSafe. Week three — tuning on your own data — is where most of the value is." wide>
              <TypesafePath />
            </Figure>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "Why is a typed Choice safer for software than asking a chatbot to “reply with one of these categories”?", a: "A Choice can only return one of the options you supplied, with probabilities and confidence, and nothing to parse — a chatbot can invent a category, break the format or ramble." },
                { q: "A Noul comes back 0.5. What does that mean?", a: "The model can’t tell whether the condition is true — similar probability for yes and no. It does not mean “half true”; for degree, use a Score." },
                { q: "You ask 10 questions about a 5,000-token document, 40 tokens each. Roughly how many input tokens do you pay for batched versus separately?", a: "Batched: 5,000 + 10 × 40 = 5,400. Separately: 10 × (5,000 + 40) = 50,400 — about 9× more." },
                { q: "Which layer should compute “is this invoice overdue by more than 30 days?”", a: "Plain code: it’s date arithmetic, which is free and exact in code and a known weak spot for the model. Jev might help find which date in the text is the due date." },
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
              Chatbots taught the world to talk to AI. Typed judgments teach software to <em>use</em> it — quickly, cheaply and with its uncertainty out in the open. Let code do the steps, let Jev make the calls, and save the big models for the work that truly needs them. ⚡
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              TypeSafe and Jev are products of TypeSafe AI; Claude Code is a product of Anthropic. This article is independent and not affiliated with or endorsed by either. It is based on the unofficial <a href={GUIDE} rel="noopener">TypeSafe Easy Guide</a>; model facts, prices, API and SDK shapes, the confidence formula, RLCD and the batching benchmark follow docs.typesafe.ai as of 24 September 2026. Claims about TypeSafe’s history are attributed to TypeSafe. The threshold data and big-LLM prices in the playgrounds are illustrative; screens are illustrations. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
