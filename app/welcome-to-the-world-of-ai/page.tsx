import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, MathBlock, SectionHeading, WindowFrame } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { NeuronPlayground, TemperatureDemo } from "@/components/articles/AiPlaygrounds";
import {
  AgentLoop,
  AiLadder,
  AiNesting,
  Architectures,
  AttentionHeatmap,
  DiffusionSteps,
  EmbeddingSpace,
  EverydayAi,
  FitComparison,
  FlowSteps,
  GradientDescent,
  HistoryTimeline,
  LearningTypes,
  LlmPipeline,
  NeuralNetwork,
  NeuronDiagram,
  ProgrammingVsMl,
  RagFlow,
  Roadmap,
  Tokenization,
  TrainingStages,
  TransformerBlock,
} from "@/components/articles/AiFigures";

const article = getArticle("welcome-to-the-world-of-ai") as Article;
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
    authors: ["Mrinal Singh Raja"],
    tags: article.tags,
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: metaDescription(article.description),
  },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
  { name: "Welcome to AI", path },
];

const TOC = [
  { id: "what-is-ai", label: "What is AI, really?" },
  { id: "family-tree", label: "The family tree" },
  { id: "history", label: "A 75-year story" },
  { id: "narrow-general-super", label: "Narrow, general, super" },
  { id: "how-machines-learn", label: "How machines learn" },
  { id: "neural-networks", label: "Neural networks" },
  { id: "training", label: "Loss, gradients, backprop" },
  { id: "architectures", label: "Architectures" },
  { id: "llms", label: "Inside a language model" },
  { id: "attention", label: "Attention, the maths" },
  { id: "making-a-chatbot", label: "How a chat assistant is made" },
  { id: "generative", label: "Images, voice and video" },
  { id: "using-ai", label: "Prompts, RAG and agents" },
  { id: "limits", label: "Limits and risks" },
  { id: "glossary", label: "Glossary" },
  { id: "next-steps", label: "Where to go next" },
];

const GLOSSARY: [string, string][] = [
  ["Algorithm", "A precise recipe of steps a computer follows."],
  ["Model", "The thing training produces: a function with learned numbers (parameters) inside."],
  ["Parameter / weight", "One learned number. Large language models have billions of them."],
  ["Training", "Adjusting parameters so the model’s outputs get less wrong on example data."],
  ["Inference", "Using a trained model to answer something new."],
  ["Loss", "A single number measuring how wrong the model currently is."],
  ["Gradient", "The direction (for every parameter) that increases the loss fastest. We step the other way."],
  ["Overfitting", "Memorising the training data instead of learning the pattern; fails on new data."],
  ["Token", "A chunk of text a language model reads and writes, roughly ¾ of an English word."],
  ["Embedding", "A list of numbers that places a token, sentence or image on a map of meaning."],
  ["Attention", "The mechanism that lets each token weigh how relevant every other token is."],
  ["Context window", "How many tokens a model can consider at once: its working memory."],
  ["Fine-tuning", "Further training a pre-trained model on a smaller, specific dataset."],
  ["RLHF", "Reinforcement learning from human feedback: tuning a model towards answers people prefer."],
  ["Hallucination", "A confident, fluent answer that is false."],
  ["RAG", "Retrieval-augmented generation: fetching relevant documents and giving them to the model."],
  ["Agent", "A model that plans, calls tools and loops until a goal is reached."],
  ["Multimodal", "Handles more than one kind of input or output: text, images, audio, video."],
];

const QUIZ: { q: string; a: string }[] = [
  {
    q: "A spam filter trained on thousands of emails marked “spam” or “not spam” is which kind of learning?",
    a: "Supervised learning: every training example came with the right answer (a label).",
  },
  {
    q: "Your model scores 99 % on training data and 61 % on new data. What went wrong?",
    a: "Overfitting. It memorised the training set. Try more data, a simpler model, regularisation such as dropout, or stopping training earlier.",
  },
  {
    q: "Why does a chatbot sometimes give a different answer to the same question?",
    a: "It samples each next token from a probability distribution. With temperature above zero, less likely words sometimes get picked, so the path through the answer changes.",
  },
  {
    q: "In attention, why divide QKᵀ by √dₖ?",
    a: "Dot products of long vectors grow large, which pushes softmax into regions with tiny gradients. Scaling keeps the scores in a range where training stays stable.",
  },
];

export default function WelcomeToAi() {
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
            {article.series} · Article 1
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Welcome to the awesome world of <span className="msrx-gradient-text">Artificial Intelligence</span>
          </h1>
          <p className="display-sm text-[clamp(18px,2.4vw,23px)] max-w-3xl mb-7" style={{ color: "var(--stage-text-secondary)" }}>
            {article.subtitle}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]" style={{ color: "var(--stage-text-secondary)" }}>
            <span>By <strong style={{ color: "var(--stage-text-primary)" }}>Mrinal Singh Raja</strong></span>
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
              Every section is tagged with how deep it goes. New to AI? Read the green ones and skim the rest; the diagrams carry the story. Already technical? Jump straight to the red ones.
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
              You have already used artificial intelligence a dozen times today. It unlocked your phone, sorted your inbox, guessed your commute, picked the next song and quietly checked that your last card payment was really you. You probably did not notice any of it — and that is the best sign of how deeply AI is now woven into ordinary life.
            </p>
            <p>
              Then, in late 2022, AI stopped being invisible. Suddenly anyone could type a question in plain English and get back an essay, a poem, a working program or a patient explanation of quantum physics. The world noticed. Since then the pace has only picked up.
            </p>
            <p>
              This is the first article in <strong>The AI World</strong>, a series on MSRX about how this technology works and what it means. We will start with no assumptions at all, and by the end we will be inside a transformer, reading its equations. Take it one section at a time.
            </p>

            <Figure number={1} caption="A normal day, full of AI you never see. Each of these is a trained model making a prediction.">
              <EverydayAi />
            </Figure>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-ai" level="Beginner" number={1}>What is AI, really?</SectionHeading>
            <p>
              <strong>Artificial intelligence is the craft of getting computers to do things that, if a person did them, we would say needed intelligence</strong>: recognising a face, understanding a sentence, planning a route, spotting a tumour on a scan, writing a reply.
            </p>
            <p>
              For most of computing history, we made computers useful by writing out every rule by hand. To calculate tax, a programmer writes the tax rules. That works brilliantly when the rules are clear. But try writing the rules for “is this a photo of a cat?” Pointy ears? Some dogs have them. Whiskers? So do seals. Four legs? Not if the cat is curled up. You would never finish.
            </p>
            <p>
              Modern AI flips the approach. Instead of giving the computer the rules, we give it <em>examples</em> — thousands of cat photos and thousands of not-cat photos — and let it work out the rules itself. That idea is called <strong>machine learning</strong>, and it is the engine behind almost everything called AI today.
            </p>

            <Figure number={2} caption="The big flip. Classic software turns rules into answers; machine learning turns answers into rules.">
              <ProgrammingVsMl />
            </Figure>

            <Callout kind="eli5">
              <p>Think of teaching a child what a dog is. You never hand them a rulebook. You point: “dog… dog… not a dog, that’s a cat… dog.” After enough examples, they just <em>know</em>, even for breeds they have never seen. Machine learning is that, done with maths, at enormous scale.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="family-tree" level="Beginner" number={2}>AI, ML, deep learning, GenAI: the family tree</SectionHeading>
            <p>
              These words get used interchangeably in the news, but they are actually nested inside each other, like Russian dolls.
            </p>
            <ul>
              <li><strong>Artificial Intelligence</strong> is the whole field — including old-school programs built from hand-written rules, like early chess engines and “expert systems”.</li>
              <li><strong>Machine Learning (ML)</strong> is the part of AI that learns from data rather than following rules someone typed in.</li>
              <li><strong>Deep Learning</strong> is the part of ML that uses <em>neural networks</em> with many layers. It took over around 2012, and it is what made speech recognition, face ID and modern translation work well.</li>
              <li><strong>Generative AI</strong> is deep learning that <em>creates</em> new content — text, images, music, code, video — instead of only labelling things. Large language models (LLMs) such as ChatGPT, Claude and Gemini live here.</li>
            </ul>

            <Figure number={3} caption="Each circle is a subset of the one around it. All generative AI is deep learning, but plenty of AI is not.">
              <AiNesting />
            </Figure>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="history" level="Beginner" number={3}>A 75-year story in two minutes</SectionHeading>
            <p>
              AI feels brand new, but the dream is older than the personal computer. The history is a rollercoaster of big promises, crushing disappointments (the “AI winters”) and, recently, breakthroughs that arrived faster than even researchers expected.
            </p>

            <Figure number={4} caption="Key moments in AI. Hollow markers show the two “AI winters”, when funding and interest collapsed.">
              <HistoryTimeline />
            </Figure>

            <p>
              Notice the pattern after 2012. Three ingredients arrived at once: <strong>huge datasets</strong> (the internet), <strong>cheap parallel computing</strong> (graphics cards, GPUs, originally built for video games) and <strong>better algorithms</strong>. Neural network ideas from the 1980s suddenly worked, because we finally had enough data and compute to feed them.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="narrow-general-super" level="Beginner" number={4}>Narrow, general and super AI</SectionHeading>
            <p>
              You will hear people argue about “AGI”. It helps to picture three rungs on a ladder.
            </p>
            <Figure number={5} caption="The capability ladder. Where exactly today’s systems sit — and when the next rung arrives — is one of the most debated questions in technology.">
              <AiLadder />
            </Figure>
            <p>
              A chess engine that beats every human alive cannot tell you what a chair is. That is <strong>narrow AI</strong>. Today’s large language models are strange in that they are wide — they can write, code, tutor and translate — yet they still make mistakes no careful person would, and they do not learn from experience the way you do. Whether scaling up the current approach reaches <strong>artificial general intelligence</strong>, or whether new ideas are needed, is genuinely open.
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="how-machines-learn" level="Intermediate" number={5}>How machines learn</SectionHeading>
            <p>
              Machine learning comes in three main flavours, depending on what kind of feedback the machine gets while it learns.
            </p>
            <Figure number={6} caption="Supervised learning uses labelled answers; unsupervised finds structure on its own; reinforcement learns from rewards.">
              <LearningTypes />
            </Figure>
            <p>
              There is also an important fourth idea: <strong>self-supervised learning</strong>. Here the data labels itself. Hide the next word in a sentence and ask the model to guess it; the real next word is the answer key. Since every sentence on the internet can be turned into practice questions this way, self-supervision unlocked training on truly vast amounts of text. It is exactly how large language models are pre-trained.
            </p>

            <h3>The machine-learning workflow</h3>
            <p>
              Whatever the flavour, real projects follow roughly the same loop. Beginners are usually surprised by how much of the work is data rather than clever algorithms.
            </p>
            <Figure number={7} caption="A typical ML project. Most of the time goes into the first two boxes — and into the loop back from monitoring.">
              <FlowSteps
                loopLabel="models drift as the world changes — monitor, collect new data, retrain"
                steps={[
                  { icon: "📥", title: "Collect data", body: "photos, logs, text", tone: "c" },
                  { icon: "🧹", title: "Clean & label", body: "fix errors, add answers", tone: "c" },
                  { icon: "✂️", title: "Split", body: "train / validation / test", tone: "v" },
                  { icon: "🏋️", title: "Train", body: "fit the parameters", tone: "v" },
                  { icon: "📏", title: "Evaluate", body: "on data it never saw", tone: "a" },
                  { icon: "🚀", title: "Deploy & monitor", body: "serve predictions", tone: "g" },
                ]}
              />
            </Figure>
            <Callout kind="warn">
              <p><strong>Never grade a model on its own homework.</strong> Always keep a <em>test set</em> the model never sees during training. A model that aces data it has already seen might have simply memorised it.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="neural-networks" level="Intermediate" number={6}>Neural networks: brains made of maths</SectionHeading>
            <p>
              Neural networks are loosely inspired by the brain, but do not take the metaphor too far. An artificial <strong>neuron</strong> is a tiny calculator. It takes some numbers in, multiplies each by a <strong>weight</strong> (how much it trusts that input), adds them up with a <strong>bias</strong>, and squashes the result through an <strong>activation function</strong>.
            </p>
            <Figure number={8} caption="One artificial neuron. Every weight w and the bias b are learned during training.">
              <NeuronDiagram />
            </Figure>
            <MathBlock reading="output = activation( weighted sum of inputs + bias )">
              y = σ( w₁x₁ + w₂x₂ + … + wₙxₙ + b ) = σ( <strong>w</strong>·<strong>x</strong> + b )
            </MathBlock>
            <p>
              On its own, one neuron is not very smart. Try it yourself: here is a single neuron deciding whether to take an umbrella.
            </p>
            <div className="!my-8">
              <NeuronPlayground />
            </div>
            <p>
              The magic happens when you connect thousands or billions of them in <strong>layers</strong>. The first layer of an image network might learn to detect edges; the next combines edges into corners and curves; the next into eyes, wheels and letters; the last decides “cat” or “dog”. Nobody programs those features — they emerge from training.
            </p>
            <Figure number={9} caption="A small feed-forward network. “Deep” learning simply means many hidden layers — modern models have dozens to over a hundred.">
              <NeuralNetwork />
            </Figure>
            <Callout kind="deep">
              <p>
                Why the activation function? Without it, stacking layers is pointless: a linear function of a linear function is still linear, so a 100-layer network would collapse into a single layer. Non-linear activations such as <code>ReLU(z) = max(0, z)</code> let networks bend and fold space to fit complicated patterns. The <em>universal approximation theorem</em> says a wide enough network with a non-linearity can approximate essentially any continuous function.
              </p>
            </Callout>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="training" level="Advanced" number={7}>How a network learns: loss, gradients and backprop</SectionHeading>
            <p>
              A freshly created network has random weights, so its answers are garbage. Training fixes that in a loop that repeats millions of times:
            </p>
            <ol>
              <li><strong>Forward pass.</strong> Feed in an example and get a prediction.</li>
              <li><strong>Measure the loss.</strong> A <em>loss function</em> turns “how wrong was that?” into one number. For classification the usual choice is cross-entropy: <span className="math">L = −log p(correct class)</span>. Confidently wrong answers are punished hard.</li>
              <li><strong>Backward pass (backpropagation).</strong> Using the chain rule from calculus, work out for <em>every single weight</em> how much the loss would change if that weight were nudged. That list of sensitivities is the <strong>gradient</strong>.</li>
              <li><strong>Update.</strong> Move every weight a tiny step in the direction that reduces the loss.</li>
            </ol>
            <MathBlock reading="new weights = old weights − learning rate × gradient of the loss">
              θ ← θ − η · ∇<sub>θ</sub> L(θ)
            </MathBlock>
            <Figure number={10} caption="Gradient descent. Imagine standing on a foggy hillside: you cannot see the valley, but you can feel which way the ground slopes, so you keep stepping downhill.">
              <GradientDescent />
            </Figure>
            <Callout kind="eli5">
              <p>Training is a game of “hotter / colder” played with billions of knobs at once. After each guess, the maths tells every knob whether turning it slightly left or right would have made the guess a bit better — and then turns them all, just a little.</p>
            </Callout>
            <p>
              In practice nobody computes the gradient over the whole dataset at once. We use <strong>mini-batches</strong> of, say, 32 to a few thousand examples (<em>stochastic</em> gradient descent), and smarter update rules such as <strong>Adam</strong>, which gives each parameter its own adaptive step size. One full pass through the data is an <strong>epoch</strong>.
            </p>
            <Figure number={11} caption="Illustration: a complete training loop for a handwritten-digit classifier in PyTorch, with sample output.">
              <WindowFrame title="train.py — Python">
                <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]"><code>{`import torch
import torch.nn as nn

model = nn.Sequential(                 # a tiny neural network
    nn.Linear(784, 128), nn.ReLU(),    # 28×28 pixels in → 128 hidden neurons
    nn.Linear(128, 10),                # → 10 scores, one per digit 0–9
)
loss_fn = nn.CrossEntropyLoss()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(5):
    for images, labels in train_loader:
        logits = model(images.view(-1, 784))   # 1. forward pass
        loss = loss_fn(logits, labels)         # 2. how wrong?
        opt.zero_grad()
        loss.backward()                        # 3. backprop → gradients
        opt.step()                             # 4. gradient-descent step
    print(f"epoch {epoch}: loss {loss.item():.3f}")`}</code></pre>
                <div className="border-t border-[var(--border)] bg-[var(--paper-tint)] px-4 py-3 mono text-[12px] leading-[1.7] text-[var(--text-secondary)]">
                  <span className="text-[var(--fig-green)]">$</span> python train.py<br />
                  epoch 0: loss 0.312<br />epoch 1: loss 0.184<br />epoch 2: loss 0.097<br />epoch 3: loss 0.121<br />epoch 4: loss 0.064
                </div>
              </WindowFrame>
            </Figure>

            <h3>Overfitting: the student who memorised the answers</h3>
            <p>
              A model with enough parameters can simply memorise its training data, noise and all. It then looks brilliant in training and fails on anything new. The opposite problem, <strong>underfitting</strong>, happens when the model is too simple to capture the pattern at all.
            </p>
            <Figure number={12} caption="The same data, three models. The goal is the middle one: a model that generalises.">
              <FitComparison />
            </Figure>
            <p>
              The defences are more (and more varied) data, <strong>regularisation</strong> (penalising extreme weights, or <em>dropout</em>, which randomly switches neurons off during training so none can be relied on too heavily), and <strong>early stopping</strong> when validation loss starts rising. Curiously, very large modern networks often generalise well even with enough capacity to memorise everything — a phenomenon researchers are still working to fully explain.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="architectures" level="Intermediate" number={8}>Architectures: the shapes of networks</SectionHeading>
            <p>
              How the neurons are wired matters as much as how many there are. Each architecture builds in an assumption about the data it will see.
            </p>
            <Figure number={13} caption="The four architectures you will hear about most.">
              <Architectures />
            </Figure>
            <p>
              <strong>Convolutional networks</strong> assume that a pattern is the same wherever it appears in an image, so they reuse one small filter everywhere. <strong>Recurrent networks</strong> assume data arrives in order, reading it one step at a time — which makes them slow and forgetful over long passages. The <strong>Transformer</strong>, introduced in 2017, dropped recurrence altogether: it looks at a whole sequence at once and lets every element decide which others to pay attention to. Because that work runs in parallel on GPUs, Transformers could be scaled to sizes nobody had tried, and they now dominate language, and increasingly vision, audio and biology.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="llms" level="Advanced" number={9}>Inside a large language model</SectionHeading>
            <p>
              Here is the most surprising fact in modern AI: a chatbot like ChatGPT or Claude is, at its core, <strong>a machine that predicts the next word</strong>. Just that. It reads your text and outputs a probability for every possible next token. One is chosen, stuck on the end, and the whole thing repeats. The fluency, the reasoning, the code — all of it emerges from getting extraordinarily good at that one game.
            </p>
            <Figure number={14} caption="The journey of a prompt. The model produces one token at a time; the loop is why replies stream in word by word.">
              <LlmPipeline />
            </Figure>

            <h3>Step 1 — Tokens</h3>
            <p>
              Models do not read letters or whole words. Text is cut into <strong>tokens</strong>: common words are one token, rarer words are split into pieces. As a rule of thumb, one token is about three-quarters of an English word. A model’s <strong>context window</strong> — how much it can read at once — is measured in tokens, and today’s leading models handle hundreds of thousands of them, some a million or more.
            </p>
            <Figure number={15} caption="Tokenisation splits text into sub-word pieces and maps each to an integer ID.">
              <Tokenization />
            </Figure>

            <h3>Step 2 — Embeddings: a map of meaning</h3>
            <p>
              Each token ID is converted into an <strong>embedding</strong>, a long list of numbers (thousands, in large models). Think of it as a coordinate on a map with thousands of dimensions. Training arranges the map so that words used in similar ways end up close together — and, remarkably, so that <em>directions</em> on the map carry meaning.
            </p>
            <Figure number={16} caption="A simplified 2-D view of embedding space. Real embeddings have thousands of dimensions; this sketch only shows the idea.">
              <EmbeddingSpace />
            </Figure>
            <MathBlock reading="the famous word2vec result (2013): vector arithmetic on meanings">
              vec(“king”) − vec(“man”) + vec(“woman”) ≈ vec(“queen”)
            </MathBlock>
            <p>
              Because the Transformer sees all tokens at once, it also needs to know their order, so a <strong>positional encoding</strong> is mixed into each embedding. Modern models typically use rotary position embeddings (RoPE), which rotate the vectors by an angle that depends on position.
            </p>

            <h3>Step 3 — Transformer blocks</h3>
            <p>
              The embeddings then flow through a stack of identical <strong>Transformer blocks</strong>. Each block has two parts: <strong>self-attention</strong>, where tokens share information with each other, and a <strong>feed-forward network</strong>, where each token is processed on its own. Residual connections carry the original signal around each part, which is what lets networks be stacked so deep without training falling apart.
            </p>
            <Figure number={17} caption="One Transformer block (pre-norm variant). Large models stack dozens of them.">
              <TransformerBlock />
            </Figure>

            <h3>Step 4 — Probabilities and sampling</h3>
            <p>
              After the last block, the final vector for the last position is turned into a score (a <strong>logit</strong>) for every token in the vocabulary, and a <strong>softmax</strong> turns those scores into probabilities. The <strong>temperature</strong> setting controls how adventurous the choice is. Play with it:
            </p>
            <div className="!my-8">
              <TemperatureDemo />
            </div>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="attention" level="Advanced" number={10}>Attention, the maths</SectionHeading>
            <p>
              Read this sentence: <em>“The animal didn’t cross the street because it was tired.”</em> What does “it” mean? You instantly know it is the animal. Change “tired” to “wide” and “it” becomes the street. Working out which words matter to which other words is exactly what <strong>attention</strong> does.
            </p>
            <Figure number={18} caption="Illustrative attention weights from the token “it” to every other token in the sentence.">
              <AttentionHeatmap />
            </Figure>
            <p>
              Mechanically, every token’s vector is multiplied by three learned matrices to produce three new vectors:
            </p>
            <ul>
              <li><strong>Query (Q)</strong> — “what am I looking for?”</li>
              <li><strong>Key (K)</strong> — “what do I contain?”</li>
              <li><strong>Value (V)</strong> — “what will I pass on if you pick me?”</li>
            </ul>
            <p>
              Each token compares its query with every token’s key (a dot product: large when they point the same way). Those scores are scaled, turned into weights with softmax, and used to take a weighted average of the values.
            </p>
            <MathBlock reading="scaled dot-product attention — Vaswani et al., 2017">
              Attention(Q, K, V) = softmax( QKᵀ / √d<sub>k</sub> ) · V
            </MathBlock>
            <Callout kind="deep">
              <p><strong>Multi-head attention</strong> runs this several times in parallel with different learned matrices, so one head can track grammar, another which noun a pronoun refers to, another long-range topic. Their outputs are concatenated and mixed.</p>
              <p><strong>Causal masking</strong> stops each token attending to tokens after it, so the model cannot cheat by peeking at the word it is meant to predict.</p>
              <p><strong>The cost:</strong> every token attends to every other, so compute grows with the <em>square</em> of the sequence length. Much of the engineering behind long context windows — FlashAttention, KV caching, sparse and linear attention variants — is about taming that n² term.</p>
            </Callout>

            <h3>Scale: why bigger kept winning</h3>
            <p>
              Around 2020 researchers found that a language model’s loss falls smoothly and predictably as you increase three things together: the number of <strong>parameters</strong>, the amount of <strong>training data</strong> and the <strong>compute</strong> spent. These <em>scaling laws</em> turned model building into something closer to engineering. DeepMind’s 2022 “Chinchilla” study refined the recipe: for a fixed compute budget, many models had been too big and undertrained, and roughly 20 training tokens per parameter was a better balance. Today’s frontier models are trained on many trillions of tokens.
            </p>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="making-a-chatbot" level="Advanced" number={11}>How a chat assistant is made</SectionHeading>
            <p>
              A model that has only been pre-trained is a brilliant but unruly autocomplete. Ask it “What is the capital of France?” and it may well continue with “What is the capital of Germany?”, because in its training data, lists of quiz questions are common. Turning it into a helpful assistant takes further stages.
            </p>
            <Figure number={19} caption="From raw next-token predictor to helpful assistant. Stage 4 is how “reasoning” models learn to think before answering." wide>
              <TrainingStages />
            </Figure>
            <p>
              <strong>Reinforcement learning from human feedback (RLHF)</strong> deserves a closer look. People compare pairs of model answers and pick the better one. Those preferences train a separate <em>reward model</em> that predicts which answer a person would prefer. The chat model is then optimised to score highly with that reward model, with a penalty for drifting too far from its earlier self so it does not learn to game the scorer. Variants such as DPO skip the separate reward model and learn from the preference pairs directly, and some labs add AI-generated feedback guided by a written set of principles.
            </p>
            <p>
              The newest step is <strong>reinforcement learning on verifiable tasks</strong>. Give the model maths problems and coding challenges whose answers can be checked automatically, and reward it only for getting them right. Models trained this way learn to write out a long chain of intermediate thinking before the final answer — trying approaches, catching their own mistakes, backtracking. That is what the “thinking” you see in reasoning models is.
            </p>

            <Figure number={20} caption="Illustration of a chat interface. Behind the scenes, every word of the reply is one trip around the loop in Fig. 14.">
              <WindowFrame title="AI assistant — new chat">
                <div className="p-4 sm:p-5 space-y-4 text-[14px] leading-relaxed">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--paper-sunk)] px-4 py-2.5 text-[var(--text-primary)]">
                      Explain photosynthesis like I’m 8, in 3 sentences 🌱
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="msrx-gradient shrink-0 w-7 h-7 rounded-full grid place-items-center text-white text-[13px]" aria-hidden="true">✦</span>
                    <div className="text-[var(--text-primary)] space-y-2">
                      <p>Plants are like tiny chefs that make their own food! 🍃 They take in sunlight through their leaves, drink water with their roots, and breathe in a gas from the air called carbon dioxide.</p>
                      <p>They mix those together to make sugar for energy, and — bonus — they breathe out the oxygen that <em>we</em> need to breathe!<span className="inline-block w-2 h-4 ml-0.5 align-middle bg-[var(--fig-violet)] animate-pulse" aria-hidden="true" /></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-[var(--text-tertiary)]">
                    <span className="flex-1">Ask a follow-up…</span>
                    <span className="mono text-[11px]">⏎</span>
                  </div>
                </div>
              </WindowFrame>
            </Figure>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="generative" level="Intermediate" number={12}>Beyond text: images, voice and video</SectionHeading>
            <p>
              Most image and video generators use a different trick called <strong>diffusion</strong>. During training, you take real pictures and add a little random noise, then more, then more, until only static is left. The network’s job is to learn to reverse a single step: given a noisy image (and a caption), predict the noise that was added. Once it has learned that, you can start from pure static and denoise step by step, with your text prompt steering each step — and a brand new image appears.
            </p>
            <Figure number={21} caption="A toy illustration of diffusion on a 12×12 image. Real models work on millions of pixels (or a compressed “latent” version of them).">
              <DiffusionSteps />
            </Figure>
            <p>
              The frontier is increasingly <strong>multimodal</strong>: single models that take in text, images, audio and video, and respond in several of them. The same core recipe applies — turn everything into tokens or embeddings, then learn the patterns — which is why progress in one area now spreads quickly to the others.
            </p>
            <Callout kind="fact">
              <p>AI is also transforming science. DeepMind’s AlphaFold predicts the 3-D shape of proteins from their amino-acid sequences, a 50-year-old challenge in biology. Its creators Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry with protein designer David Baker — the same year Geoffrey Hinton and John Hopfield won the Physics prize for foundational work on neural networks.</p>
            </Callout>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="using-ai" level="Intermediate" number={13}>Putting AI to work: prompts, RAG and agents</SectionHeading>
            <h3>Prompting well</h3>
            <p>
              A language model only knows what is in its training data plus what you put in the prompt. The single biggest improvement most people can make is to give it more context. Say <strong>who</strong> the answer is for, <strong>what</strong> good looks like, <strong>the format</strong> you want, and, when you can, <strong>an example</strong>.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 !my-7">
              <div className="rounded-[var(--radius)] border-2 border-[var(--fig-rose)] bg-[var(--fig-rose-soft)] p-4">
                <p className="mono text-[11px] font-semibold text-[var(--fig-rose)] mb-1.5">✗ VAGUE</p>
                <p className="text-[14px] text-[var(--text-primary)]">Write about our new app.</p>
              </div>
              <div className="rounded-[var(--radius)] border-2 border-[var(--fig-green)] bg-[var(--fig-green-soft)] p-4">
                <p className="mono text-[11px] font-semibold text-[var(--fig-green)] mb-1.5">✓ SPECIFIC</p>
                <p className="text-[14px] text-[var(--text-primary)]">Write a 120-word announcement of our free Gantt chart app for busy project managers. Friendly, no jargon, end with one call to action. Here is a past announcement we liked: …</p>
              </div>
            </div>

            <h3>RAG: giving the model your documents</h3>
            <p>
              A model does not know your company handbook, yesterday’s news or your private notes. <strong>Retrieval-augmented generation</strong> fixes that without retraining: split your documents into chunks, store their embeddings in a vector database, and at question time fetch the chunks closest in meaning to the question and paste them into the prompt.
            </p>
            <Figure number={22} caption="Retrieval-augmented generation. The model answers from your documents, and can cite them.">
              <RagFlow />
            </Figure>

            <h3>Agents: models that act</h3>
            <p>
              An <strong>agent</strong> is a language model placed in a loop and given tools: web search, a code runner, a calendar, a company’s internal APIs. It decides on a step, calls a tool, reads the result, and decides the next step, until the goal is done. Coding assistants that read a codebase, run the tests and fix what fails are agents; so are assistants that research a topic across dozens of web pages.
            </p>
            <Figure number={23} caption="The agent loop. The hard parts in practice are knowing when to stop, recovering from errors, and asking a human before doing anything irreversible.">
              <AgentLoop />
            </Figure>
            <Callout kind="tip">
              <p>Not every AI feature needs a chatty, text-generating model. Many product decisions are small judgments — “is this message urgent?”, “which of these five categories fits?”, “how relevant is this document from 1 to 5?”. Asking for a <strong>structured answer</strong> (a label, a yes/no with a probability, a score) instead of free text makes the output easier for code to use, cheaper to run and simpler to test.</p>
            </Callout>

            {/* ── 14 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="limits" level="Beginner" number={14}>Limits, risks and responsibility</SectionHeading>
            <p>
              AI is powerful, and it is also imperfect in ways that matter. A good user knows both.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 !my-7">
              {[
                { icon: "🌀", t: "Hallucinations", b: "Models can state false things fluently and confidently, including made-up citations. Check anything important." },
                { icon: "⚖️", t: "Bias", b: "Models learn from human data, including its prejudices, and can repeat or amplify them in hiring, lending or policing." },
                { icon: "🔒", t: "Privacy", b: "Be careful what you paste into online tools. Read how your data is stored and whether it trains future models." },
                { icon: "🎭", t: "Deepfakes & misuse", b: "Realistic fake voices, images and video make scams and misinformation cheaper. Verify surprising media." },
                { icon: "⚡", t: "Energy & cost", b: "Training and running large models uses a lot of electricity and water for cooling, and concentrates power in a few companies." },
                { icon: "💼", t: "Work", b: "AI changes what many jobs involve. The people who learn to use it well tend to benefit most." },
              ].map((r) => (
                <div key={r.t} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-[15px] font-semibold text-[var(--text-primary)]"><span aria-hidden="true">{r.icon}</span> {r.t}</p>
                  <p className="mt-1 text-[13.5px] leading-snug text-[var(--text-secondary)]">{r.b}</p>
                </div>
              ))}
            </div>
            <p>
              Behind these everyday concerns sits a longer-term research field called <strong>AI safety and alignment</strong>: how do we make sure increasingly capable systems reliably do what we intend, are honest about what they do not know, and cannot be turned to serious harm? <strong>Interpretability</strong> researchers try to look inside networks and understand what individual neurons and circuits represent, so that we are not relying on a black box. Governments are writing rules too, such as the European Union’s AI Act. None of this is solved, and it is one of the most important open problems of our time.
            </p>

            {/* ── 15 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="glossary" level="Beginner" number={15}>Glossary</SectionHeading>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Term</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {GLOSSARY.map(([term, meaning]) => (
                    <tr key={term}>
                      <th scope="row">{term}</th>
                      <td>{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {QUIZ.map((item, i) => (
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

            {/* ── 16 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="next-steps" level="Beginner" number={16}>Where to go from here</SectionHeading>
            <p>
              You now know more about how AI works than most people who use it every day. The best way to go further is to <em>use</em> it and <em>build</em> with it, a little at a time.
            </p>
            <Figure number={24} caption="A practical learning path, from curious user to specialist. Move at your own pace; each step is useful on its own." wide>
              <Roadmap />
            </Figure>
            <p>
              Coming up in <strong>The AI World</strong>: deeper dives into how large language models are trained, a hands-on guide to building your first RAG app, prompting techniques that actually work, what AI agents can and cannot do yet, and how to judge AI claims in the news.
            </p>
            <p>
              Welcome aboard. It is an awesome world — and we have only just opened the door. 🚀
            </p>

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              Numbers inside illustrations (probabilities, attention weights, token IDs, training output) are made up to show the idea. Spotted a mistake? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="eyebrow text-[var(--text-tertiary)] mb-2">{article.series}</p>
            <p className="display-sm text-[22px] text-[var(--text-primary)]">More articles on the way</p>
          </div>
          <Link
            href="/"
            className="msrx-gradient inline-flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            All articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
