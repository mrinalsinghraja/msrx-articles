import type { ReactNode } from "react";

/**
 * Diagrams for "Welcome to the awesome world of Artificial Intelligence".
 *
 * Graphical figures (a neuron, a loss valley, a scatter of embeddings) are
 * inline SVG; linear flowcharts are HTML so they can wrap to a column on a
 * phone instead of shrinking their labels to nothing. Every colour is a
 * --fig-* token class from globals.css, so both themes come for free.
 *
 * Numbers inside illustrations (probabilities, attention weights) are made up
 * to show a shape, and the captions say so.
 */

type Tone = "c" | "v" | "a" | "g" | "r";

const TONE_VARS: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className="arrowhead" />
      </marker>
    </defs>
  );
}

// ── Generic responsive flowchart ─────────────────────────────────────────────

export function FlowSteps({
  steps,
  loopLabel,
}: {
  steps: { title: string; body?: ReactNode; tone?: Tone; icon?: string }[];
  loopLabel?: string;
}) {
  return (
    <div>
      <ol className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
        {steps.map((s, i) => {
          const tone = TONE_VARS[s.tone ?? "v"];
          return (
            <li key={s.title} className="flex flex-col md:flex-row items-center md:flex-1 md:min-w-0">
              <div
                className="w-full md:h-full rounded-[var(--radius)] border px-3.5 md:px-2 py-3 text-center"
                style={{ borderColor: tone.fg, background: tone.soft }}
              >
                {s.icon && <div className="text-[22px] leading-none mb-1.5" aria-hidden="true">{s.icon}</div>}
                <p className="text-[14px] md:text-[13px] font-semibold text-[var(--text-primary)] leading-snug">{s.title}</p>
                {s.body && <p className="mt-1 text-[12.5px] md:text-[11.5px] leading-snug text-[var(--text-secondary)]">{s.body}</p>}
              </div>
              {i < steps.length - 1 && (
                <span className="text-[var(--text-tertiary)] text-[18px] leading-none py-1 md:py-0 md:px-0.5 rotate-90 md:rotate-0" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {loopLabel && (
        <p className="mt-3 text-center mono text-[11.5px] tracking-[0.08em] uppercase text-[var(--text-tertiary)]">↻ {loopLabel}</p>
      )}
    </div>
  );
}

// ── Fig: AI hiding in an ordinary day ────────────────────────────────────────

export function EverydayAi() {
  const items = [
    { t: "07:00", icon: "📱", title: "Face unlock", body: "A vision model checks your face against a stored template." },
    { t: "08:15", icon: "🗺️", title: "Maps ETA", body: "Traffic models predict how long each road will take." },
    { t: "10:30", icon: "📧", title: "Spam filter", body: "A classifier decides which mail you never see." },
    { t: "13:00", icon: "🎵", title: "Recommendations", body: "The next song or video is picked from what people like you played." },
    { t: "16:45", icon: "💳", title: "Fraud check", body: "Your card payment is scored for risk in milliseconds." },
    { t: "21:00", icon: "💬", title: "Chat assistant", body: "A large language model writes, explains and codes with you." },
  ];
  return (
    <ol className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((it) => (
        <li key={it.title} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[24px]" aria-hidden="true">{it.icon}</span>
            <span className="mono text-[11px] text-[var(--text-tertiary)]">{it.t}</span>
          </div>
          <p className="mt-2 text-[14px] font-semibold text-[var(--text-primary)]">{it.title}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

// ── Fig: Traditional programming vs machine learning ─────────────────────────

function MlRow({ label, a, b, out, tone }: { label: string; a: string; b: string; out: string; tone: Tone }) {
  const t = TONE_VARS[tone];
  return (
    <div>
      <p className="mono text-[11px] tracking-[0.12em] uppercase mb-2" style={{ color: t.fg }}>{label}</p>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-[13px] sm:text-[14px]">
        <div className="space-y-2">
          <div className="rounded-lg border border-[var(--fig-line)] bg-[var(--fig-card)] px-2 py-2 text-[var(--text-primary)]">{a}</div>
          <div className="rounded-lg border border-[var(--fig-line)] bg-[var(--fig-card)] px-2 py-2 text-[var(--text-primary)]">{b}</div>
        </div>
        <span className="text-[var(--text-tertiary)]" aria-hidden="true">→</span>
        <div className="rounded-xl border-2 px-2 py-4 font-semibold" style={{ borderColor: t.fg, background: t.soft, color: t.fg }}>
          {tone === "a" ? "Computer" : "Learning algorithm"}
        </div>
        <span className="text-[var(--text-tertiary)]" aria-hidden="true">→</span>
        <div className="rounded-lg border-2 px-2 py-3 font-semibold text-[var(--text-primary)]" style={{ borderColor: t.fg, background: t.soft }}>{out}</div>
      </div>
    </div>
  );
}

export function ProgrammingVsMl() {
  return (
    <div className="space-y-6">
      <MlRow label="Traditional programming" a="Rules (your code)" b="Data" out="Answers" tone="a" />
      <MlRow label="Machine learning" a="Data" b="Answers (labels)" out="Rules (a model)" tone="v" />
    </div>
  );
}

// ── Fig: The nesting dolls of AI ─────────────────────────────────────────────

export function AiNesting() {
  return (
    <svg viewBox="0 0 560 360" role="img" aria-labelledby="nest-t">
      <title id="nest-t">Nested circles: Artificial Intelligence contains Machine Learning, which contains Deep Learning, which contains Generative AI and large language models.</title>
      <ellipse cx="280" cy="185" rx="270" ry="168" className="a-s" strokeWidth="1.5" />
      <ellipse cx="300" cy="205" rx="205" ry="130" className="c-s" strokeWidth="1.5" />
      <ellipse cx="318" cy="225" rx="140" ry="92" className="v-s" strokeWidth="1.5" />
      <ellipse cx="332" cy="245" rx="78" ry="52" className="r-s" strokeWidth="1.5" />
      <text x="280" y="42" textAnchor="middle" className="a" fontSize="17" fontWeight="700">Artificial Intelligence</text>
      <text x="280" y="62" textAnchor="middle" className="t2" fontSize="11.5">Any way of making machines act smart, even fixed rules</text>
      <text x="300" y="100" textAnchor="middle" className="c" fontSize="16" fontWeight="700">Machine Learning</text>
      <text x="300" y="119" textAnchor="middle" className="t2" fontSize="12">Learns patterns from data instead of rules</text>
      <text x="318" y="157" textAnchor="middle" className="v" fontSize="15" fontWeight="700">Deep Learning</text>
      <text x="318" y="175" textAnchor="middle" className="t2" fontSize="12">Many-layered neural networks</text>
      <text x="332" y="240" textAnchor="middle" className="r" fontSize="14" fontWeight="700">Generative AI</text>
      <text x="332" y="258" textAnchor="middle" className="t2" fontSize="12">LLMs, image &amp; video</text>
      <text x="332" y="274" textAnchor="middle" className="t2" fontSize="12">generators</text>
      <text x="100" y="108" textAnchor="middle" className="t3" fontSize="10.5">chess engines,</text>
      <text x="100" y="122" textAnchor="middle" className="t3" fontSize="10.5">expert systems</text>
      <text x="146" y="244" textAnchor="middle" className="t3" fontSize="10.5">spam filters,</text>
      <text x="146" y="258" textAnchor="middle" className="t3" fontSize="10.5">decision trees</text>
    </svg>
  );
}

// ── Fig: History timeline ────────────────────────────────────────────────────

const HISTORY: { year: string; title: string; body: string; tone: Tone; winter?: boolean }[] = [
  { year: "1950", title: "Turing asks “Can machines think?”", body: "Alan Turing’s paper proposes the imitation game, later called the Turing test.", tone: "c" },
  { year: "1956", title: "The field gets its name", body: "The Dartmouth workshop, organised by John McCarthy and colleagues, launches “artificial intelligence” as a discipline.", tone: "c" },
  { year: "1958", title: "The Perceptron", body: "Frank Rosenblatt builds a machine that learns to classify simple images: the first trainable neural network.", tone: "c" },
  { year: "1966", title: "ELIZA chats", body: "Joseph Weizenbaum’s pattern-matching chatbot convinces some users it understands them.", tone: "c" },
  { year: "1970s–90s", title: "AI winters", body: "Promises outrun results twice; funding and interest collapse, then slowly return.", tone: "a", winter: true },
  { year: "1986", title: "Backpropagation spreads", body: "Rumelhart, Hinton and Williams show how to train multi-layer networks efficiently.", tone: "v" },
  { year: "1997", title: "Deep Blue beats Kasparov", body: "IBM’s chess machine defeats the world champion in a six-game match.", tone: "v" },
  { year: "2012", title: "AlexNet and the deep learning boom", body: "A GPU-trained neural network wins the ImageNet challenge by a wide margin.", tone: "v" },
  { year: "2016", title: "AlphaGo beats Lee Sedol", body: "DeepMind’s system wins 4–1 at Go, a game long thought decades out of reach.", tone: "v" },
  { year: "2017", title: "“Attention Is All You Need”", body: "Google researchers introduce the Transformer, the architecture behind today’s language models.", tone: "r" },
  { year: "2020", title: "GPT-3 and AlphaFold 2", body: "A 175-billion-parameter language model writes fluent text; AlphaFold predicts protein structures with near-experimental accuracy.", tone: "r" },
  { year: "2022", title: "ChatGPT goes public", body: "A chat interface puts a large language model in front of the general public, and adoption is explosive.", tone: "r" },
  { year: "2024", title: "Nobel Prizes for AI", body: "Physics: Hopfield and Hinton for neural-network foundations. Chemistry: Hassabis and Jumper for AlphaFold, shared with David Baker.", tone: "r" },
  { year: "2024 →", title: "Reasoning models and agents", body: "Models trained to think step by step, use tools and carry out multi-step tasks on their own.", tone: "g" },
];

export function HistoryTimeline() {
  return (
    <ol className="relative ml-2 border-l-2 border-[var(--fig-line)] space-y-5">
      {HISTORY.map((h) => {
        const t = TONE_VARS[h.tone];
        return (
          <li key={h.year + h.title} className="relative pl-6">
            <span
              className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2"
              style={{ borderColor: t.fg, background: h.winter ? "var(--fig-card)" : t.fg }}
              aria-hidden="true"
            />
            <p className="mono text-[12px] font-semibold" style={{ color: t.fg }}>
              {h.year} {h.winter && "❄️"}
            </p>
            <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{h.title}</p>
            <p className="text-[13.5px] leading-snug text-[var(--text-secondary)]">{h.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

// ── Fig: Narrow, general, super ──────────────────────────────────────────────

export function AiLadder() {
  const rungs = [
    { name: "Narrow AI (ANI)", status: "Here today", body: "Superhuman at one job — chess, face ID, translation — and useless outside it. Today’s chat models are far broader than any before, yet still stumble in ways a person would not.", tone: "g" as Tone, h: "sm:min-h-44" },
    { name: "General AI (AGI)", status: "Hotly debated", body: "Matches a capable person across most thinking tasks, learning new ones as fast. Nobody agrees on the exact test, or on the date.", tone: "a" as Tone, h: "sm:min-h-52" },
    { name: "Superintelligence (ASI)", status: "Hypothetical", body: "Beyond the best humans at nearly everything. The main subject of long-term safety research.", tone: "r" as Tone, h: "sm:min-h-60" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3 items-end">
      {rungs.map((r) => {
        const t = TONE_VARS[r.tone];
        return (
          <div key={r.name} className="flex flex-col">
            <div className={`${r.h} rounded-[var(--radius)] border-2 p-4 flex flex-col`} style={{ borderColor: t.fg, background: t.soft }}>
              <span className="mono text-[10.5px] tracking-[0.12em] uppercase font-semibold" style={{ color: t.fg }}>{r.status}</span>
              <p className="mt-1 text-[15px] font-semibold text-[var(--text-primary)]">{r.name}</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{r.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Fig: Three ways to learn ─────────────────────────────────────────────────

export function LearningTypes() {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {/* Supervised */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
        <p className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--fig-cyan)] font-semibold">Supervised</p>
        <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mt-1">Learning with an answer key</p>
        <svg viewBox="0 0 220 120" className="my-3" role="img" aria-label="Labelled examples of cats and dogs separated by a learned boundary line">
          <line x1="20" y1="110" x2="200" y2="10" className="ln" strokeDasharray="5 4" strokeWidth="1.5" />
          {[[40, 30], [60, 55], [35, 70], [80, 30], [95, 50]].map(([x, y]) => (
            <text key={`c${x}`} x={x} y={y} fontSize="18" textAnchor="middle">🐱</text>
          ))}
          {[[140, 95], [170, 80], [160, 108], [190, 100], [125, 110]].map(([x, y]) => (
            <text key={`d${x}`} x={x} y={y} fontSize="18" textAnchor="middle">🐶</text>
          ))}
        </svg>
        <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">Shown thousands of photos <em>labelled</em> “cat” or “dog”, it learns the line between them. <strong className="text-[var(--text-primary)]">Used for:</strong> spam filters, price prediction, medical scans.</p>
      </div>
      {/* Unsupervised */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
        <p className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--fig-violet)] font-semibold">Unsupervised</p>
        <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mt-1">Finding groups on its own</p>
        <svg viewBox="0 0 220 120" className="my-3" role="img" aria-label="Unlabelled dots that the algorithm has grouped into three clusters">
          <circle cx="55" cy="45" r="32" className="c-s" strokeDasharray="4 3" />
          <circle cx="160" cy="40" r="28" className="v-s" strokeDasharray="4 3" />
          <circle cx="110" cy="92" r="24" className="a-s" strokeDasharray="4 3" />
          {[[45, 35], [60, 50], [50, 58], [68, 38], [40, 50]].map(([x, y]) => <circle key={`a${x}${y}`} cx={x} cy={y} r="4.5" className="c" />)}
          {[[150, 35], [168, 45], [160, 28], [172, 32]].map(([x, y]) => <circle key={`b${x}${y}`} cx={x} cy={y} r="4.5" className="v" />)}
          {[[105, 88], [118, 96], [110, 100], [100, 97]].map(([x, y]) => <circle key={`d${x}${y}`} cx={x} cy={y} r="4.5" className="a" />)}
        </svg>
        <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">No labels at all. It notices which things resemble each other. <strong className="text-[var(--text-primary)]">Used for:</strong> customer segments, anomaly detection, topic discovery.</p>
      </div>
      {/* Reinforcement */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
        <p className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--fig-amber)] font-semibold">Reinforcement</p>
        <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mt-1">Learning by trial and reward</p>
        <svg viewBox="0 0 220 120" className="my-3" role="img" aria-label="An agent acts on an environment and receives a reward and new state in a loop">
          <Arrow id="rl-ar" />
          <rect x="10" y="35" width="70" height="50" rx="10" className="a-s" />
          <text x="45" y="65" textAnchor="middle" fontSize="12" className="t" fontWeight="600">🤖 Agent</text>
          <rect x="140" y="35" width="70" height="50" rx="10" className="box" />
          <text x="175" y="58" textAnchor="middle" fontSize="11.5" className="t" fontWeight="600">🌍 World</text>
          <text x="175" y="73" textAnchor="middle" fontSize="10" className="t3">(game, robot)</text>
          <path d="M60 32 Q110 0 160 32" className="ln" strokeWidth="1.5" markerEnd="url(#rl-ar)" />
          <text x="110" y="14" textAnchor="middle" fontSize="11" className="t2">action</text>
          <path d="M160 88 Q110 120 60 88" className="ln" strokeWidth="1.5" markerEnd="url(#rl-ar)" />
          <text x="110" y="114" textAnchor="middle" fontSize="11" className="t2">reward +1 / −1</text>
        </svg>
        <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">Like training a puppy with treats: good moves are rewarded and repeated. <strong className="text-[var(--text-primary)]">Used for:</strong> AlphaGo, robotics, tuning chatbots.</p>
      </div>
    </div>
  );
}

// ── Fig: One artificial neuron ───────────────────────────────────────────────

export function NeuronDiagram() {
  return (
    <svg viewBox="0 0 600 250" role="img" aria-labelledby="neuron-t">
      <title id="neuron-t">An artificial neuron: three inputs are multiplied by weights, summed with a bias, passed through an activation function, and produce one output.</title>
      <Arrow id="nr-ar" />
      {[
        { y: 50, x: "x₁", w: "w₁" },
        { y: 125, x: "x₂", w: "w₂" },
        { y: 200, x: "x₃", w: "w₃" },
      ].map((i) => (
        <g key={i.x}>
          <circle cx="60" cy={i.y} r="24" className="c-s" strokeWidth="1.5" />
          <text x="60" y={i.y + 5} textAnchor="middle" fontSize="16" className="t" fontWeight="600">{i.x}</text>
          <line x1="86" y1={i.y} x2="248" y2="125" className="c-ln" strokeWidth="1.8" markerEnd="url(#nr-ar)" />
          <text x="165" y={(i.y + 125) / 2 - 8} textAnchor="middle" fontSize="14" className="c" fontWeight="700">×{i.w}</text>
        </g>
      ))}
      <text x="60" y="244" textAnchor="middle" fontSize="11.5" className="t3">inputs</text>
      <circle cx="290" cy="125" r="40" className="v-s" strokeWidth="2" />
      <text x="290" y="120" textAnchor="middle" fontSize="26" className="v" fontWeight="700">Σ</text>
      <text x="290" y="142" textAnchor="middle" fontSize="11.5" className="t2">+ bias b</text>
      <text x="290" y="190" textAnchor="middle" fontSize="11.5" className="t3">weighted sum z</text>
      <line x1="332" y1="125" x2="388" y2="125" className="ln" strokeWidth="1.8" markerEnd="url(#nr-ar)" />
      <rect x="392" y="90" width="90" height="70" rx="12" className="a-s" strokeWidth="1.5" />
      <path d="M404 145 C 430 145, 430 105, 470 105" className="a-ln" strokeWidth="2.5" />
      <text x="437" y="176" textAnchor="middle" fontSize="11.5" className="t3">activation σ(z)</text>
      <line x1="484" y1="125" x2="536" y2="125" className="ln" strokeWidth="1.8" markerEnd="url(#nr-ar)" />
      <circle cx="562" cy="125" r="22" className="g-s" strokeWidth="1.5" />
      <text x="562" y="130" textAnchor="middle" fontSize="16" className="t" fontWeight="600">y</text>
      <text x="562" y="170" textAnchor="middle" fontSize="11.5" className="t3">output</text>
    </svg>
  );
}

// ── Fig: A layered neural network ────────────────────────────────────────────

export function NeuralNetwork() {
  const layers = [
    { x: 70, n: 4, cls: "c-s", label: "Input layer", sub: "pixels, words, numbers" },
    { x: 230, n: 5, cls: "v-s", label: "Hidden layer 1", sub: "edges, simple shapes" },
    { x: 390, n: 5, cls: "v-s", label: "Hidden layer 2", sub: "eyes, ears, wheels" },
    { x: 540, n: 2, cls: "g-s", label: "Output", sub: "cat? dog?" },
  ];
  const ys = (n: number) => Array.from({ length: n }, (_, i) => 150 + (i - (n - 1) / 2) * 52);
  return (
    <svg viewBox="0 0 610 330" role="img" aria-labelledby="nn-t">
      <title id="nn-t">A feed-forward neural network with an input layer of four neurons, two hidden layers of five, and an output layer of two. Every neuron connects to every neuron in the next layer.</title>
      {layers.slice(0, -1).map((l, li) =>
        ys(l.n).flatMap((y1) =>
          ys(layers[li + 1].n).map((y2) => (
            <line key={`${li}-${y1}-${y2}`} x1={l.x} y1={y1} x2={layers[li + 1].x} y2={y2} className="ln" strokeWidth="0.8" opacity="0.7" />
          )),
        ),
      )}
      {layers.map((l) => (
        <g key={l.label}>
          {ys(l.n).map((y) => (
            <circle key={y} cx={l.x} cy={y} r="16" className={l.cls} strokeWidth="1.5" />
          ))}
          <text x={l.x} y="298" textAnchor="middle" fontSize="13" className="t" fontWeight="600">{l.label}</text>
          <text x={l.x} y="316" textAnchor="middle" fontSize="11" className="t3">{l.sub}</text>
        </g>
      ))}
      <text x="540" y="104" textAnchor="middle" fontSize="11" className="g" fontWeight="700">0.94 cat</text>
      <text x="540" y="210" textAnchor="middle" fontSize="11" className="t3">0.06 dog</text>
      <text x="305" y="20" textAnchor="middle" fontSize="12" className="t2">signals flow left → right (forward pass)</text>
    </svg>
  );
}

// ── Fig: Gradient descent in a loss valley ───────────────────────────────────

export function GradientDescent() {
  // Loss as a U in SVG coordinates (y grows downward, so the minimum sits low).
  const y = (x: number) => 255 - 0.0022 * (x - 330) ** 2;
  const d = Array.from({ length: 61 }, (_, i) => 40 + i * 9.8)
    .map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y(x).toFixed(1)}`)
    .join(" ");
  const steps = [70, 150, 215, 262, 294, 314, 325];
  return (
    <svg viewBox="0 0 660 320" role="img" aria-labelledby="gd-t">
      <title id="gd-t">A U-shaped loss curve. A ball starts high on the left slope and takes smaller and smaller steps downhill until it settles at the minimum, where the error is lowest.</title>
      <Arrow id="gd-ar" />
      <line x1="40" y1="290" x2="640" y2="290" className="ln" strokeWidth="1.2" />
      <line x1="40" y1="290" x2="40" y2="20" className="ln" strokeWidth="1.2" />
      <text x="640" y="310" textAnchor="end" fontSize="12" className="t3">a model weight w →</text>
      <text x="48" y="30" fontSize="12" className="t3">error (loss) ↑</text>
      <path d={d} className="v-ln" strokeWidth="3" />
      {steps.slice(0, -1).map((x, i) => {
        const x2 = steps[i + 1];
        return (
          <path
            key={x}
            d={`M${x} ${y(x) - 16} Q ${(x + x2) / 2} ${y((x + x2) / 2) - 40} ${x2} ${y(x2) - 16}`}
            className="a-ln"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#gd-ar)"
          />
        );
      })}
      {steps.map((x, i) => (
        <circle key={x} cx={x} cy={y(x) - 9} r={i === 0 ? 9 : 6} className={i === steps.length - 1 ? "g" : "a"} opacity={i === 0 || i === steps.length - 1 ? 1 : 0.55} />
      ))}
      <text x="80" y={y(70) - 30} textAnchor="middle" fontSize="12" className="a" fontWeight="600">start: random weights</text>
      <text x="330" y="280" textAnchor="middle" fontSize="12" className="g" fontWeight="700">minimum ✓</text>
      <text x="420" y="92" textAnchor="middle" fontSize="12.5" className="t2">the slope (gradient) says which way is downhill;</text>
      <text x="420" y="110" textAnchor="middle" fontSize="12.5" className="t2">the learning rate η sets how big each step is</text>
    </svg>
  );
}

// ── Fig: Underfitting, good fit, overfitting ─────────────────────────────────

export function FitComparison() {
  const data: [number, number][] = [[20, 118], [40, 100], [60, 92], [80, 70], [100, 64], [120, 48], [140, 50], [160, 32], [180, 30]];
  const panels = [
    { title: "Underfit", sub: "too simple — misses the trend", tone: "a", path: "M10 80 L190 76" },
    { title: "Good fit", sub: "captures the pattern", tone: "g", path: "M10 125 C 70 90, 120 55, 190 26" },
    { title: "Overfit", sub: "memorises the noise", tone: "r", path: "M10 130 L20 118 L30 96 L40 100 L50 110 L60 92 L70 60 L80 70 L90 80 L100 64 L110 40 L120 48 L130 64 L140 50 L150 20 L160 32 L170 44 L180 30 L190 18" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {panels.map((p) => (
        <div key={p.title} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-2 sm:p-3">
          <svg viewBox="0 0 200 140" role="img" aria-label={`${p.title}: ${p.sub}`}>
            <line x1="5" y1="135" x2="195" y2="135" className="ln" />
            <line x1="5" y1="135" x2="5" y2="5" className="ln" />
            {data.map(([x, y]) => <circle key={x} cx={x} cy={y} r="4.5" className="c" />)}
            <path d={p.path} className={`${p.tone}-ln`} strokeWidth="2.5" />
          </svg>
          <p className="mt-1 text-[13px] sm:text-[14px] font-semibold" style={{ color: TONE_VARS[p.tone as Tone].fg }}>{p.title}</p>
          <p className="text-[11.5px] sm:text-[12.5px] leading-snug text-[var(--text-secondary)]">{p.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ── Fig: Architectures cheat sheet ───────────────────────────────────────────

export function Architectures() {
  const cards = [
    { name: "CNN", full: "Convolutional Neural Network", tone: "c" as Tone, icon: "🖼️", how: "Slides small filters across an image, detecting edges, then textures, then objects.", good: "Photos, X-rays, self-driving cameras" },
    { name: "RNN / LSTM", full: "Recurrent Neural Network", tone: "a" as Tone, icon: "🔁", how: "Reads a sequence one step at a time, carrying a memory forward. Slow to train; forgets long contexts.", good: "Older speech and translation systems" },
    { name: "Transformer", full: "Attention-based network", tone: "v" as Tone, icon: "⚡", how: "Looks at every token at once and learns which ones matter to each other. Parallel, scales beautifully.", good: "ChatGPT, Claude, Gemini, modern vision" },
    { name: "Diffusion", full: "Denoising generative model", tone: "r" as Tone, icon: "🎨", how: "Learns to remove noise step by step, so it can turn pure static into a picture.", good: "Image, video and audio generation" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {cards.map((c) => {
        const t = TONE_VARS[c.tone];
        return (
          <div key={c.name} className="rounded-[var(--radius)] border bg-[var(--fig-card)] p-4" style={{ borderColor: t.fg }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[22px]" aria-hidden="true">{c.icon}</span>
              <div>
                <p className="text-[15px] font-semibold" style={{ color: t.fg }}>{c.name}</p>
                <p className="text-[11.5px] text-[var(--text-tertiary)]">{c.full}</p>
              </div>
            </div>
            <p className="mt-2.5 text-[13px] leading-snug text-[var(--text-secondary)]">{c.how}</p>
            <p className="mt-2 text-[12.5px] text-[var(--text-primary)]"><span className="font-semibold">Best at:</span> {c.good}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Fig: Tokenisation ────────────────────────────────────────────────────────

export function Tokenization() {
  const toks: [string, number][] = [["Un", 2208], ["believ", 20185], ["able", 481], ["!", 0], [" AI", 15592], [" is", 318], [" awesome", 7427], [" 🤖", 12859]];
  const tones: Tone[] = ["c", "v", "a", "g", "r"];
  return (
    <div>
      <p className="text-[13px] text-[var(--text-tertiary)] mb-2">Text in:</p>
      <p className="rounded-lg border border-[var(--border)] bg-[var(--fig-card)] px-3 py-2 text-[16px] text-[var(--text-primary)]">Unbelievable! AI is awesome 🤖</p>
      <p className="text-[13px] text-[var(--text-tertiary)] mt-4 mb-2">Tokens (sub-word pieces) and their IDs:</p>
      <ul className="flex flex-wrap gap-1.5">
        {toks.map(([t, id], i) => {
          const tone = TONE_VARS[tones[i % tones.length]];
          return (
            <li key={t + i} className="rounded-md border px-2 py-1 text-center" style={{ borderColor: tone.fg, background: tone.soft }}>
              <span className="mono block text-[14px] text-[var(--text-primary)] whitespace-pre">{t.replace(" ", "␣")}</span>
              <span className="mono block text-[10.5px] text-[var(--text-tertiary)]">{id}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[12.5px] text-[var(--text-tertiary)]">␣ marks a leading space. Token IDs shown are illustrative; every model has its own vocabulary.</p>
    </div>
  );
}

// ── Fig: The path of a prompt through an LLM ─────────────────────────────────

export function LlmPipeline() {
  return (
    <FlowSteps
      loopLabel="append the new token and repeat until done — that is how the reply streams in word by word"
      steps={[
        { icon: "✍️", title: "Your prompt", body: "“The cat sat on the”", tone: "c" },
        { icon: "✂️", title: "Tokenise", body: "text → token IDs", tone: "c" },
        { icon: "📍", title: "Embed", body: "each ID → a vector of thousands of numbers + position", tone: "v" },
        { icon: "🧠", title: "Transformer ×N", body: "attention + feed-forward, dozens of layers deep", tone: "v" },
        { icon: "📊", title: "Probabilities", body: "a score for every word in the vocabulary", tone: "a" },
        { icon: "🎲", title: "Sample", body: "pick “mat” (temperature decides how boldly)", tone: "g" },
      ]}
    />
  );
}

// ── Fig: Word embeddings as a map of meaning ─────────────────────────────────

export function EmbeddingSpace() {
  const pts: { w: string; x: number; y: number; cls: string }[] = [
    { w: "man", x: 110, y: 220, cls: "c" },
    { w: "woman", x: 210, y: 150, cls: "c" },
    { w: "king", x: 330, y: 205, cls: "v" },
    { w: "queen", x: 430, y: 135, cls: "v" },
    { w: "apple", x: 520, y: 290, cls: "a" },
    { w: "banana", x: 575, y: 262, cls: "a" },
    { w: "mango", x: 540, y: 320, cls: "a" },
    { w: "Paris", x: 120, y: 60, cls: "g" },
    { w: "France", x: 60, y: 110, cls: "g" },
    { w: "Delhi", x: 270, y: 50, cls: "g" },
    { w: "India", x: 210, y: 98, cls: "g" },
  ];
  return (
    <svg viewBox="0 0 640 350" role="img" aria-labelledby="emb-t">
      <title id="emb-t">A two-dimensional map of word embeddings. Similar words cluster together, and the arrow from man to woman runs parallel to the arrow from king to queen, as does the arrow from France to Paris with India to Delhi.</title>
      <Arrow id="emb-ar" />
      <rect x="0" y="0" width="640" height="350" rx="12" className="box" strokeWidth="0" />
      {[80, 160, 240, 320].map((y) => <line key={y} x1="0" x2="640" y1={y} y2={y} className="ln" opacity="0.25" />)}
      {[128, 256, 384, 512].map((x) => <line key={x} y1="0" y2="350" x1={x} x2={x} className="ln" opacity="0.25" />)}
      <line x1="118" y1="214" x2="200" y2="157" className="c-ln" strokeWidth="2" markerEnd="url(#emb-ar)" />
      <line x1="338" y1="199" x2="420" y2="142" className="v-ln" strokeWidth="2" markerEnd="url(#emb-ar)" />
      <line x1="70" y1="104" x2="112" y2="68" className="g-ln" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#emb-ar)" />
      <line x1="220" y1="92" x2="262" y2="58" className="g-ln" strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#emb-ar)" />
      {pts.map((p) => (
        <g key={p.w}>
          <circle cx={p.x} cy={p.y} r="6" className={p.cls} />
          <text x={p.x + 10} y={p.y + 16} fontSize="14" className="t" fontWeight="600">{p.w}</text>
        </g>
      ))}
      <text x="310" y="264" fontSize="12" className="t2">same direction = same relationship</text>
      <text x="310" y="280" fontSize="12" className="t2">(“male → female”)</text>
      <text x="470" y="230" fontSize="12" className="t3">fruits huddle together</text>
      <text x="300" y="80" fontSize="12" className="t3">country → capital</text>
    </svg>
  );
}

// ── Fig: Attention heat map ──────────────────────────────────────────────────

export function AttentionHeatmap() {
  const words = ["The", "animal", "didn’t", "cross", "the", "street", "because", "it", "was", "tired"];
  const weights = [0.02, 0.58, 0.03, 0.05, 0.01, 0.12, 0.04, 0.06, 0.03, 0.06];
  return (
    <div>
      <p className="text-[13px] text-[var(--text-tertiary)] mb-3">
        Where does the token <strong className="text-[var(--text-primary)]">“it”</strong> look when working out its meaning? (one attention head)
      </p>
      <div className="flex flex-wrap gap-1.5">
        {words.map((w, i) => (
          <span
            key={w + i}
            className="relative rounded-md px-2 py-1.5 text-[15px] border"
            style={{
              background: `color-mix(in srgb, var(--fig-violet) ${Math.round(weights[i] * 100 * 1.4)}%, var(--fig-card))`,
              color: weights[i] > 0.3 ? "var(--fig-card)" : "var(--text-primary)",
              borderColor: i === 7 ? "var(--fig-amber)" : "var(--border)",
              borderWidth: i === 7 ? 2 : 1,
            }}
          >
            {w}
            <span className="mono block text-[10px] opacity-80">{weights[i].toFixed(2)}</span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-[var(--text-tertiary)]">
        Weights are illustrative and sum to 1. Change “tired” to “wide” and a well-trained model shifts its attention from “animal” to “street”.
      </p>
    </div>
  );
}

// ── Fig: Transformer block ───────────────────────────────────────────────────

export function TransformerBlock() {
  return (
    <svg viewBox="0 0 520 400" role="img" aria-labelledby="tb-t">
      <title id="tb-t">One transformer block. Token vectors enter at the bottom, pass through layer normalisation and multi-head self-attention with a residual connection, then layer normalisation and a feed-forward network with another residual connection, and exit at the top. Blocks are stacked many times.</title>
      <Arrow id="tb-ar" />
      <rect x="90" y="40" width="340" height="310" rx="18" className="sunk" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="440" y="60" fontSize="13" className="t2" fontWeight="600">× N layers</text>

      <text x="260" y="390" textAnchor="middle" fontSize="12.5" className="t2">token vectors in (embedding + position)</text>
      <line x1="260" y1="372" x2="260" y2="322" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />

      <rect x="160" y="290" width="200" height="30" rx="8" className="box" />
      <text x="260" y="310" textAnchor="middle" fontSize="12.5" className="t">Layer norm</text>
      <line x1="260" y1="290" x2="260" y2="262" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
      <rect x="140" y="210" width="240" height="50" rx="10" className="v-s" strokeWidth="1.5" />
      <text x="260" y="233" textAnchor="middle" fontSize="14" className="t" fontWeight="700">Multi-head self-attention</text>
      <text x="260" y="250" textAnchor="middle" fontSize="11" className="t2">tokens exchange information</text>
      <line x1="260" y1="210" x2="260" y2="186" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
      <circle cx="260" cy="176" r="10" className="box" />
      <text x="260" y="181" textAnchor="middle" fontSize="14" className="t" fontWeight="700">+</text>
      <path d="M260 340 L120 340 L120 176 L248 176" className="c-ln" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#tb-ar)" />
      <text x="112" y="265" textAnchor="end" fontSize="11" className="c">residual</text>

      <line x1="260" y1="166" x2="260" y2="146" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
      <rect x="160" y="116" width="200" height="28" rx="8" className="box" />
      <text x="260" y="135" textAnchor="middle" fontSize="12.5" className="t">Layer norm</text>
      <line x1="260" y1="116" x2="260" y2="100" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
      <rect x="140" y="58" width="240" height="40" rx="10" className="a-s" strokeWidth="1.5" />
      <text x="260" y="76" textAnchor="middle" fontSize="14" className="t" fontWeight="700">Feed-forward network</text>
      <text x="260" y="91" textAnchor="middle" fontSize="11" className="t2">each token “thinks” alone</text>
      <path d="M270 170 L400 170 L400 30 L272 30" className="c-ln" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#tb-ar)" />
      <circle cx="260" cy="30" r="10" className="box" />
      <text x="260" y="35" textAnchor="middle" fontSize="14" className="t" fontWeight="700">+</text>
      <line x1="260" y1="58" x2="260" y2="42" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
      <line x1="260" y1="20" x2="260" y2="4" className="ln" strokeWidth="1.8" markerEnd="url(#tb-ar)" />
    </svg>
  );
}

// ── Fig: How a chat model is made ────────────────────────────────────────────

export function TrainingStages() {
  const stages = [
    { n: "1", name: "Pre-training", tone: "c" as Tone, what: "Predict the next token over trillions of tokens of text and code.", gets: "A “base model”: knows a lot, but just autocompletes.", cost: "Weeks–months on thousands of GPUs" },
    { n: "2", name: "Supervised fine-tuning", tone: "v" as Tone, what: "Train on curated examples of good instructions and answers.", gets: "Follows instructions, speaks like an assistant.", cost: "Tens of thousands of examples" },
    { n: "3", name: "Preference tuning (RLHF)", tone: "a" as Tone, what: "People rank answers; a reward model learns their taste; RL optimises for it.", gets: "More helpful, honest and harmless.", cost: "Human feedback + RL" },
    { n: "4", name: "Reasoning RL", tone: "g" as Tone, what: "Reward correct final answers on maths, code and puzzles with checkable results.", gets: "Learns to think step by step before answering.", cost: "Verifiable tasks at scale" },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stages.map((s) => {
        const t = TONE_VARS[s.tone];
        return (
          <li key={s.n} className="rounded-[var(--radius)] border-t-4 bg-[var(--fig-card)] border-x border-b border-x-[var(--border)] border-b-[var(--border)] p-4" style={{ borderTopColor: t.fg }}>
            <p className="mono text-[11px] font-semibold" style={{ color: t.fg }}>STAGE {s.n}</p>
            <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{s.name}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.what}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-[var(--text-primary)]">→ {s.gets}</p>
            <p className="mt-2 mono text-[10.5px] text-[var(--text-tertiary)]">{s.cost}</p>
          </li>
        );
      })}
    </ol>
  );
}

// ── Fig: Diffusion, noise to picture ─────────────────────────────────────────

function seeded(n: number) {
  let s = n;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function DiffusionSteps() {
  // A 12×12 "image" of a smiling sun; each step blends it with less noise.
  const N = 12;
  const target = (x: number, y: number) => {
    const dx = x - 5.5, dy = y - 5.5, r = Math.hypot(dx, dy);
    if (r < 3.2) {
      if ((x === 4 || x === 7) && y === 4) return 0; // eyes
      if (y === 7 && x >= 4 && x <= 7) return 0; // smile
      return 1;
    }
    return r < 4.6 && (x + y) % 2 === 0 ? 0.7 : 0.08;
  };
  const noiseLevels = [1, 0.75, 0.45, 0.18, 0];
  const labels = ["t = 1000 · pure noise", "t = 750", "t = 450", "t = 180", "t = 0 · image"];
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {noiseLevels.map((k, i) => {
          const rnd = seeded(97 + i * 13);
          return (
            <div key={k}>
              <svg viewBox={`0 0 ${N} ${N}`} className="rounded-md border border-[var(--border)]" role="img" aria-label={labels[i]} shapeRendering="crispEdges">
                {Array.from({ length: N * N }, (_, j) => {
                  const x = j % N, y = Math.floor(j / N);
                  const v = (1 - k) * target(x, y) + k * rnd();
                  return <rect key={j} x={x} y={y} width="1" height="1" style={{ fill: `color-mix(in srgb, var(--fig-amber) ${Math.round(v * 100)}%, var(--fig-sunk))` }} />;
                })}
              </svg>
              <p className="mt-1.5 mono text-[10px] sm:text-[11px] text-center text-[var(--text-tertiary)]">{labels[i]}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[13px] text-[var(--text-secondary)]">
        ← training adds noise step by step &nbsp;·&nbsp; generation learns to remove it, guided by your prompt →
      </p>
    </div>
  );
}

// ── Fig: Retrieval-augmented generation ──────────────────────────────────────

export function RagFlow() {
  return (
    <FlowSteps
      steps={[
        { icon: "❓", title: "Question", body: "“What is our refund policy?”", tone: "c" },
        { icon: "🔢", title: "Embed the question", body: "turn it into a vector", tone: "c" },
        { icon: "🗄️", title: "Search your documents", body: "vector DB finds the closest chunks", tone: "v" },
        { icon: "📎", title: "Stuff into the prompt", body: "question + top 3–10 chunks", tone: "a" },
        { icon: "🤖", title: "LLM answers", body: "grounded in your data, with citations", tone: "g" },
      ]}
    />
  );
}

// ── Fig: The agent loop ──────────────────────────────────────────────────────

export function AgentLoop() {
  const nodes = [
    { x: 280, y: 50, label: "🎯 Goal", sub: "“Book the cheapest flight”", cls: "c-s" },
    { x: 470, y: 160, label: "🧠 Think", sub: "plan the next step", cls: "v-s" },
    { x: 280, y: 270, label: "🛠️ Act", sub: "call a tool: search, code, API", cls: "a-s" },
    { x: 90, y: 160, label: "👀 Observe", sub: "read the result", cls: "g-s" },
  ];
  return (
    <svg viewBox="0 0 560 320" role="img" aria-labelledby="ag-t">
      <title id="ag-t">The agent loop. Starting from a goal, the model thinks about the next step, acts by calling a tool, observes the result, and thinks again, repeating until the goal is met.</title>
      <Arrow id="ag-ar" />
      <path d="M350 62 Q 450 80 468 122" className="ln" strokeWidth="1.8" markerEnd="url(#ag-ar)" />
      <path d="M470 198 Q 450 250 360 268" className="ln" strokeWidth="1.8" markerEnd="url(#ag-ar)" />
      <path d="M200 268 Q 110 250 92 198" className="ln" strokeWidth="1.8" markerEnd="url(#ag-ar)" />
      <path d="M140 150 Q 280 120 400 150" className="v-ln" strokeWidth="1.8" strokeDasharray="5 4" markerEnd="url(#ag-ar)" />
      <text x="280" y="126" textAnchor="middle" fontSize="11.5" className="v">loop until done</text>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 82} y={n.y - 30} width="164" height="60" rx="14" className={n.cls} strokeWidth="1.5" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="15" className="t" fontWeight="700">{n.label}</text>
          <text x={n.x} y={n.y + 15} textAnchor="middle" fontSize="11" className="t2">{n.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Fig: Learning roadmap ────────────────────────────────────────────────────

export function Roadmap() {
  const stages = [
    { tone: "g" as Tone, level: "Week 1 · Curious", items: ["Use a chat assistant every day for real tasks", "Learn to write clear prompts with context and examples", "Read one explainer a week (like this series!)"] },
    { tone: "c" as Tone, level: "Month 1–3 · Builder", items: ["Python basics, NumPy, pandas", "Call an LLM API; build a small chatbot or RAG app", "Try no-code tools and automation"] },
    { tone: "a" as Tone, level: "Month 3–9 · Practitioner", items: ["Linear algebra, probability, calculus essentials", "scikit-learn, then PyTorch", "Train a CNN and fine-tune a small language model"] },
    { tone: "r" as Tone, level: "Year 1+ · Specialist", items: ["Read papers: start with “Attention Is All You Need”", "Evaluation, safety and interpretability", "Ship something real and measure it"] },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stages.map((s, i) => {
        const t = TONE_VARS[s.tone];
        return (
          <li key={s.level} className="rounded-[var(--radius)] p-4 border" style={{ background: t.soft, borderColor: t.fg }}>
            <p className="mono text-[11px] font-semibold" style={{ color: t.fg }}>STEP {i + 1}</p>
            <p className="text-[15px] font-semibold text-[var(--text-primary)]">{s.level}</p>
            <ul className="mt-2 space-y-1.5">
              {s.items.map((it) => (
                <li key={it} className="text-[12.5px] leading-snug text-[var(--text-secondary)] flex gap-1.5">
                  <span style={{ color: t.fg }} aria-hidden="true">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
