import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "TypeSafe and Jev".
 *
 * Model facts, prices, API shapes and cookbook numbers follow docs.typesafe.ai,
 * read on 24 September 2026; teaching structure follows the TypeSafe Easy
 * Guide. Screens are drawings, labelled as illustrations.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
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

// ── Prompt-and-parse vs typed judgment ───────────────────────────────────────

export function PromptVsTyped() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-rose)] bg-[var(--fig-rose-soft)] p-4">
        <p className="text-[14.5px] font-bold text-[var(--fig-rose)]">The old way: prompt, then parse</p>
        <div className="mt-2 space-y-1.5 mono text-[11.5px]">
          <p className="rounded bg-[var(--fig-card)] px-2 py-1.5 text-[var(--text-primary)]">“Classify this ticket as billing, technical or sales. Reply in JSON.”</p>
          <p className="rounded bg-[var(--fig-card)] px-2 py-1.5 text-[var(--text-secondary)]">Sure! Here’s the classification: ```json {`{"category": "Billing/Technical"`} …</p>
        </div>
        <ul className="mt-3 space-y-1 text-[12.5px] text-[var(--text-secondary)]">
          <li>✗ Invents a category that isn’t on the list</li>
          <li>✗ Broken JSON → retry loop</li>
          <li>✗ No idea how sure it is</li>
          <li>✗ You pay for every word it writes</li>
        </ul>
      </div>
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-green)] bg-[var(--fig-green-soft)] p-4">
        <p className="text-[14.5px] font-bold text-[var(--fig-green)]">The typed way: ask, get a value</p>
        <div className="mt-2 space-y-1.5 mono text-[11.5px]">
          <p className="rounded bg-[var(--fig-card)] px-2 py-1.5 text-[var(--text-primary)]">Choice: billing | technical | sales | other</p>
          <p className="rounded bg-[var(--fig-card)] px-2 py-1.5 text-[var(--text-primary)]">{`{"choice": "billing", "confidence": 0.81, "probabilities": {…}}`}</p>
        </div>
        <ul className="mt-3 space-y-1 text-[12.5px] text-[var(--text-secondary)]">
          <li>✓ Always one of the options you gave</li>
          <li>✓ Never breaks — nothing to parse</li>
          <li>✓ Calibrated probabilities with every answer</li>
          <li>✓ Output tokens are free</li>
        </ul>
      </div>
    </div>
  );
}

// ── History of software ↔ AI ─────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "1970s–80s", t: "Hand-written rules", b: "Expert systems encode knowledge as if-then rules. Predictable and typed, but brittle: every case needs a new rule.", tone: "c" },
  { d: "1990s–2010s", t: "Classical machine learning", b: "Spam filters and fraud models learn from examples and return a label with a probability. Typed and calibrated — but each task needs its own labelled dataset and model.", tone: "c" },
  { d: "2011", t: "Thinking, Fast and Slow", b: "Daniel Kahneman popularises “System 1” (fast, intuitive) and “System 2” (slow, deliberate) thinking — the idea TypeSafe’s name for its models borrows.", tone: "v" },
  { d: "2020–2022", t: "Large language models and RLHF", b: "One model handles any task described in words. Tuned with human feedback, it writes fluently — and software starts “prompting and parsing” its prose.", tone: "a" },
  { d: "2023–2025", t: "JSON mode, function calling, structured outputs", b: "Providers constrain LLM output to schemas, fixing broken JSON. But the model still generates token by token, and output still costs money.", tone: "a" },
  { d: "2026", t: "System One models", b: "TypeSafe’s Jev answers typed questions directly — a choice, a probability, a level — with calibrated confidence and no text generation at all.", tone: "g" },
];

export function EngagementTimeline() {
  return (
    <ol className="relative ml-2 border-l-2 border-[var(--fig-line)] space-y-5">
      {HISTORY.map((h) => (
        <li key={h.d} className="relative pl-6">
          <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{ background: T[h.tone].fg }} aria-hidden="true" />
          <p className="mono text-[12px] font-semibold" style={{ color: T[h.tone].fg }}>{h.d}</p>
          <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{h.t}</p>
          <p className="text-[13.5px] leading-snug text-[var(--text-secondary)]">{h.b}</p>
        </li>
      ))}
    </ol>
  );
}

// ── System 1 vs System 2 ─────────────────────────────────────────────────────

export function TwoSystems() {
  const cols: { n: string; tone: Tone; icon: string; you: string; ai: string; items: string[] }[] = [
    { n: "System 1", tone: "g", icon: "⚡", you: "Recognising a friend’s face; “is this email angry?”", ai: "Jev: typed judgments in ~100 ms", items: ["fast and automatic", "one focused judgment", "returns a value", "cheap to run thousands of times"] },
    { n: "System 2", tone: "v", icon: "🧠", you: "Working out 17 × 24; writing a careful letter", ai: "Big LLMs: write, explain, reason at length", items: ["slow and effortful", "open-ended", "returns prose or code", "costly per call"] },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {cols.map((c) => (
        <div key={c.n} className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
          <p className="text-[18px] font-bold" style={{ color: T[c.tone].fg }}><span aria-hidden="true">{c.icon}</span> {c.n}</p>
          <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">In you:</strong> {c.you}</p>
          <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">In software:</strong> {c.ai}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {c.items.map((x) => <span key={x} className="rounded-full bg-[var(--fig-card)] px-2 py-0.5 text-[11.5px] text-[var(--text-primary)]">{x}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── How a call works ─────────────────────────────────────────────────────────

export function JevCall() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="jc-t">
      <title id="jc-t">One Jev call. Your code sends state — the text or JSON to judge — and a set of named, typed questions. Jev reads the state once and answers every question in parallel, returning a choice with probabilities, a noul probability, and a score with confidence. Your code applies rules and thresholds to decide what happens next.</title>
      <Arrow id="jc-ar" />
      <rect x="10" y="30" width="170" height="110" rx="14" className="c-s" strokeWidth="1.5" />
      <text x="95" y="56" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">state</text>
      <text x="95" y="76" textAnchor="middle" fontSize="11" className="t2">“Help! My payouts have</text>
      <text x="95" y="91" textAnchor="middle" fontSize="11" className="t2">been failing for 3 days.”</text>
      <text x="95" y="120" textAnchor="middle" fontSize="10.5" className="t3">text or JSON, sent once</text>
      <rect x="10" y="160" width="170" height="120" rx="14" className="a-s" strokeWidth="1.5" />
      <text x="95" y="186" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">questions</text>
      <text x="95" y="208" textAnchor="middle" fontSize="11" className="t2">department: Choice</text>
      <text x="95" y="226" textAnchor="middle" fontSize="11" className="t2">is_urgent: Noul</text>
      <text x="95" y="244" textAnchor="middle" fontSize="11" className="t2">frustration: Score</text>
      <text x="95" y="268" textAnchor="middle" fontSize="10.5" className="t3">many, in one request</text>
      <line x1="182" y1="85" x2="238" y2="140" className="ln" strokeWidth="1.8" markerEnd="url(#jc-ar)" />
      <line x1="182" y1="220" x2="238" y2="165" className="ln" strokeWidth="1.8" markerEnd="url(#jc-ar)" />
      <rect x="242" y="100" width="130" height="100" rx="16" className="v-s" strokeWidth="2" />
      <text x="307" y="140" textAnchor="middle" fontSize="16" className="t" fontWeight="700">⚡ Jev</text>
      <text x="307" y="160" textAnchor="middle" fontSize="11" className="t2">reads once,</text>
      <text x="307" y="175" textAnchor="middle" fontSize="11" className="t2">answers in parallel</text>
      {[
        { y: 40, l: "department", v: "billing · conf 0.81", cls: "g-s" },
        { y: 125, l: "is_urgent", v: "noul 0.95", cls: "g-s" },
        { y: 210, l: "frustration", v: "score 1.05 · conf 0.92", cls: "g-s" },
      ].map((a) => (
        <g key={a.l}>
          <line x1="374" y1="150" x2="408" y2={a.y + 25} className="ln" strokeWidth="1.5" markerEnd="url(#jc-ar)" />
          <rect x="412" y={a.y} width="218" height="50" rx="10" className={a.cls} strokeWidth="1.3" />
          <text x="424" y={a.y + 21} fontSize="12" className="t" fontWeight="700">{a.l}</text>
          <text x="424" y={a.y + 38} fontSize="11.5" className="t2" fontFamily="ui-monospace, monospace">{a.v}</text>
        </g>
      ))}
    </svg>
  );
}

// ── The three primitives ─────────────────────────────────────────────────────

export function ThreePrimitives() {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-cyan)] bg-[var(--fig-card)] p-4">
        <p className="text-[16px] font-bold text-[var(--fig-cyan)]">Choice</p>
        <p className="text-[12px] text-[var(--text-tertiary)]">“Pick one from this list”</p>
        <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]">Which team should handle it?</p>
        <ul className="mt-2 space-y-1 !pl-0 !list-none">
          {[["billing", 0.88], ["technical", 0.12], ["sales", 0]].map(([k, v]) => (
            <li key={k as string} className="!mt-1 grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-1.5 text-[11.5px]">
              <span className="mono text-[var(--text-primary)]">{k}</span>
              <span className="h-2.5 rounded bg-[var(--paper-sunk)] overflow-hidden"><span className="block h-full rounded" style={{ width: `${(v as number) * 100}%`, background: "var(--fig-cyan)" }} /></span>
              <span className="mono text-right text-[var(--text-secondary)]">{(v as number).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 mono text-[11.5px] text-[var(--text-primary)]">→ “billing”, confidence 0.81</p>
      </div>
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-violet)] bg-[var(--fig-card)] p-4">
        <p className="text-[16px] font-bold text-[var(--fig-violet)]">Noul</p>
        <p className="text-[12px] text-[var(--text-tertiary)]">“Is this true?”</p>
        <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]">Does it convey urgency?</p>
        <div className="mt-3 relative h-3 rounded-full" style={{ background: "linear-gradient(90deg, var(--fig-rose-soft), var(--fig-sunk), var(--fig-green-soft))" }} aria-hidden="true">
          <span className="absolute -top-1 w-5 h-5 rounded-full border-2 border-[var(--fig-violet)] bg-[var(--fig-card)]" style={{ left: "calc(95% - 10px)" }} />
        </div>
        <div className="mt-1 flex justify-between text-[10.5px] text-[var(--text-tertiary)]"><span>0 · no</span><span>0.5 · can’t tell</span><span>1 · yes</span></div>
        <p className="mt-2 mono text-[11.5px] text-[var(--text-primary)]">→ 0.95 (a probability of “yes”)</p>
      </div>
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-amber)] bg-[var(--fig-card)] p-4">
        <p className="text-[16px] font-bold text-[var(--fig-amber)]">Score</p>
        <p className="text-[12px] text-[var(--text-tertiary)]">“Where on this ladder?”</p>
        <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]">How frustrated is the customer?</p>
        <ol className="mt-2 space-y-1 !pl-0 !list-none">
          {[["2", "Very angry", 0.05], ["1", "Frustrated", 0.95], ["0", "Calm", 0]].map(([k, n, p]) => (
            <li key={k as string} className="!mt-1 flex items-center gap-2 rounded px-2 py-1 text-[11.5px]" style={{ background: (p as number) > 0.5 ? "var(--fig-amber-soft)" : "var(--paper-tint)" }}>
              <span className="mono font-bold text-[var(--fig-amber)]">{k}</span>
              <span className="flex-1 text-[var(--text-primary)]">{n}</span>
              <span className="mono text-[var(--text-secondary)]">{(p as number).toFixed(2)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 mono text-[11.5px] text-[var(--text-primary)]">→ 1.05, confidence 0.92</p>
      </div>
    </div>
  );
}

// ── Calibration ──────────────────────────────────────────────────────────────

export function CalibrationChart() {
  const x = (p: number) => 60 + p * 250;
  const y = (p: number) => 270 - p * 230;
  const over = [[0.1, 0.02], [0.3, 0.12], [0.5, 0.3], [0.7, 0.45], [0.9, 0.62]];
  const cal = [[0.1, 0.11], [0.3, 0.28], [0.5, 0.52], [0.7, 0.69], [0.9, 0.88]];
  return (
    <svg viewBox="0 0 640 310" role="img" aria-labelledby="cal-t">
      <title id="cal-t">A reliability diagram. Across many predictions, a calibrated model’s points sit on the diagonal: things it gives 70% to happen about 70% of the time. An overconfident model sits below the diagonal: its 90% predictions come true only about 60% of the time.</title>
      <rect x="60" y="40" width="250" height="230" className="box" strokeWidth="1" />
      <line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} className="ln" strokeDasharray="5 4" strokeWidth="1.4" />
      <text x={x(0.62)} y={y(0.8)} fontSize="11" className="t3" transform={`rotate(-42 ${x(0.62)} ${y(0.8)})`}>perfect calibration</text>
      <polyline points={over.map(([a, b]) => `${x(a)},${y(b)}`).join(" ")} className="r-ln" strokeWidth="2.2" />
      {over.map(([a, b]) => <circle key={`o${a}`} cx={x(a)} cy={y(b)} r="5" className="r" />)}
      <polyline points={cal.map(([a, b]) => `${x(a)},${y(b)}`).join(" ")} className="g-ln" strokeWidth="2.2" />
      {cal.map(([a, b]) => <circle key={`c${a}`} cx={x(a)} cy={y(b)} r="5" className="g" />)}
      <text x="185" y="298" textAnchor="middle" fontSize="12" className="t2">what the model said (probability)</text>
      <text x="22" y="155" textAnchor="middle" fontSize="12" className="t2" transform="rotate(-90 22 155)">how often it was true</text>
      <text x="60" y="30" fontSize="10.5" className="t3">illustrative</text>
      <circle cx="350" cy="90" r="6" className="g" />
      <text x="364" y="94" fontSize="13" className="t" fontWeight="700">Calibrated</text>
      <text x="364" y="112" fontSize="11.5" className="t2">says 70% → right about 70% of the time.</text>
      <text x="364" y="128" fontSize="11.5" className="t2">You can set thresholds on it.</text>
      <circle cx="350" cy="170" r="6" className="r" />
      <text x="364" y="174" fontSize="13" className="t" fontWeight="700">Overconfident</text>
      <text x="364" y="192" fontSize="11.5" className="t2">says 90% → right about 60% of the time.</text>
      <text x="364" y="208" fontSize="11.5" className="t2">Sounds sure; can’t be trusted unattended.</text>
    </svg>
  );
}

// ── Three kinds of post-training ─────────────────────────────────────────────

export function TrainingTargets() {
  const rows: { n: string; full: string; target: string; good: string; tone: Tone }[] = [
    { n: "RLHF", full: "Reinforcement learning from human feedback", target: "answers people prefer", good: "fluent, helpful chat", tone: "a" },
    { n: "RLVR", full: "RL from verifiable rewards", target: "answers a checker marks correct", good: "maths, code, long reasoning", tone: "v" },
    { n: "RLCD", full: "RL for calibrated decisions", target: "probabilities that match real outcomes", good: "unattended automation", tone: "g" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {rows.map((r) => (
        <div key={r.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[r.tone].fg }}>
          <p className="text-[18px] font-bold" style={{ color: T[r.tone].fg }}>{r.n}</p>
          <p className="text-[11.5px] text-[var(--text-tertiary)] leading-snug">{r.full}</p>
          <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Optimises for:</strong> {r.target}</p>
          <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Good at:</strong> {r.good}</p>
        </div>
      ))}
    </div>
  );
}

// ── Console / playground ─────────────────────────────────────────────────────

export function PlaygroundMock() {
  return (
    <WindowFrame title="console.typesafe.ai — Playground — illustration">
      <div className="grid md:grid-cols-2 text-[12px]">
        <div className="p-4 space-y-3 border-b md:border-b-0 md:border-r border-[var(--border)]">
          <div>
            <p className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-1">State</p>
            <p className="rounded-lg border border-[var(--border)] bg-[var(--paper-tint)] px-2.5 py-2 text-[var(--text-primary)]">I was charged twice for my Pro plan this month and I want one of them refunded today, this is the second time!!</p>
          </div>
          <div>
            <p className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-1">Questions</p>
            {[["team", "Choice", "billing · technical · sales · other"], ["refund", "Noul", "Customer asks for a refund"], ["urgent", "Noul", "Conveys urgency"], ["frustration", "Score", "Calm · Frustrated · Very angry"]].map(([id, t, d]) => (
              <p key={id} className="flex gap-2 rounded-md border border-[var(--border)] px-2 py-1 mb-1 text-[var(--text-secondary)]">
                <span className="mono font-semibold text-[var(--text-primary)]">{id}</span>
                <span className="rounded bg-[var(--paper-sunk)] px-1.5 text-[10.5px]">{t}</span>
                <span className="truncate">{d}</span>
              </p>
            ))}
            <p className="mt-2 inline-block rounded-lg bg-[var(--text-primary)] text-[var(--paper)] px-3 py-1 font-semibold">▶ Run</p>
          </div>
        </div>
        <div className="p-4 bg-[var(--paper-tint)] space-y-2">
          <p className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Answers · jev-1.13.0 · 96 ms</p>
          {[["team", "billing", "conf 0.97"], ["refund", "0.99", "noul"], ["urgent", "0.93", "noul"], ["frustration", "1.62", "conf 0.71"]].map(([id, v, n]) => (
            <p key={id} className="flex justify-between rounded-md bg-[var(--card)] border border-[var(--border)] px-2.5 py-1.5">
              <span className="mono text-[var(--text-primary)]">{id}</span>
              <span className="mono font-semibold text-[var(--fig-green)]">{v} <span className="font-normal text-[var(--text-tertiary)]">{n}</span></span>
            </p>
          ))}
          <p className="text-[11px] text-[var(--text-tertiary)]">usage: 212 input tokens · output free</p>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── The blueprint ────────────────────────────────────────────────────────────

export function Blueprint() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-labelledby="bp-t">
      <title id="bp-t">The layered blueprint. Incoming data is cleaned by code, which also finds candidates. One Jev call makes all the judgments. Code applies rules and thresholds: most cases are done immediately; cases that need writing go to a big language model, optionally checked again by Jev; unsure cases go to a human.</title>
      <Arrow id="bp-ar" />
      {[
        { y: 10, l: "📥 Incoming: ticket, email, review, form", cls: "box" },
        { y: 62, l: "💻 Code — clean, look up, find candidates", cls: "c-s" },
        { y: 114, l: "⚡ ONE Jev call — route + checks + scores", cls: "v-s" },
        { y: 166, l: "💻 Code — apply rules and thresholds", cls: "c-s" },
      ].map((b, i) => (
        <g key={b.l}>
          <rect x="150" y={b.y} width="340" height="38" rx="10" className={b.cls} strokeWidth="1.5" />
          <text x="320" y={b.y + 24} textAnchor="middle" fontSize="13" className="t" fontWeight="700">{b.l}</text>
          {i < 3 && <line x1="320" y1={b.y + 40} x2="320" y2={b.y + 50} className="ln" strokeWidth="1.8" markerEnd="url(#bp-ar)" />}
        </g>
      ))}
      <line x1="230" y1="206" x2="100" y2="238" className="ln" strokeWidth="1.8" markerEnd="url(#bp-ar)" />
      <line x1="320" y1="206" x2="320" y2="238" className="ln" strokeWidth="1.8" markerEnd="url(#bp-ar)" />
      <line x1="410" y1="206" x2="540" y2="238" className="ln" strokeWidth="1.8" markerEnd="url(#bp-ar)" />
      <rect x="10" y="242" width="180" height="56" rx="12" className="g-s" strokeWidth="1.5" />
      <text x="100" y="266" textAnchor="middle" fontSize="13" className="t" fontWeight="700">✅ Most cases: done</text>
      <text x="100" y="284" textAnchor="middle" fontSize="11" className="t2">fast and nearly free</text>
      <rect x="230" y="242" width="180" height="56" rx="12" className="a-s" strokeWidth="1.5" />
      <text x="320" y="266" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🧑‍🏫 Needs writing</text>
      <text x="320" y="284" textAnchor="middle" fontSize="11" className="t2">big LLM → Jev re-checks</text>
      <rect x="450" y="242" width="180" height="56" rx="12" className="r-s" strokeWidth="1.5" />
      <text x="540" y="266" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🙋 Unsure</text>
      <text x="540" y="284" textAnchor="middle" fontSize="11" className="t2">low confidence → a person</text>
      <text x="320" y="322" textAnchor="middle" fontSize="11" className="t3">cost and time grow left to right — so most traffic should stop on the left</text>
    </svg>
  );
}

// ── Code first decision ──────────────────────────────────────────────────────

export function WhichTool() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-labelledby="wt-t">
      <title id="wt-t">Deciding which tool to use. If a simple rule or lookup can do it, use plain code at no cost. If not, and the answer is a pick, a yes-or-no, or a level, use Jev at tiny cost. Otherwise — writing or deep reasoning — use a big language model.</title>
      <Arrow id="wt-ar" />
      <path d="M200 20 L290 55 L200 90 L110 55 Z" className="a-s" strokeWidth="1.5" />
      <text x="200" y="50" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">Can a rule or</text>
      <text x="200" y="65" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">lookup do it?</text>
      <line x1="292" y1="55" x2="398" y2="55" className="ln" strokeWidth="1.8" markerEnd="url(#wt-ar)" />
      <text x="345" y="48" textAnchor="middle" fontSize="11" className="t3">yes</text>
      <rect x="402" y="30" width="220" height="50" rx="12" className="c-s" strokeWidth="1.5" />
      <text x="512" y="52" textAnchor="middle" fontSize="13" className="t" fontWeight="700">💻 Plain code</text>
      <text x="512" y="69" textAnchor="middle" fontSize="11" className="t2">maths, dates, regex — $0</text>
      <line x1="200" y1="92" x2="200" y2="120" className="ln" strokeWidth="1.8" markerEnd="url(#wt-ar)" />
      <text x="212" y="110" fontSize="11" className="t3">no</text>
      <path d="M200 124 L290 159 L200 194 L110 159 Z" className="a-s" strokeWidth="1.5" />
      <text x="200" y="154" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">A pick, yes/no,</text>
      <text x="200" y="169" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">or a level?</text>
      <line x1="292" y1="159" x2="398" y2="130" className="ln" strokeWidth="1.8" markerEnd="url(#wt-ar)" />
      <text x="345" y="134" textAnchor="middle" fontSize="11" className="t3">yes</text>
      <rect x="402" y="104" width="220" height="50" rx="12" className="v-s" strokeWidth="1.5" />
      <text x="512" y="126" textAnchor="middle" fontSize="13" className="t" fontWeight="700">⚡ Jev</text>
      <text x="512" y="143" textAnchor="middle" fontSize="11" className="t2">typed judgment — tiny cost</text>
      <line x1="292" y1="159" x2="398" y2="192" className="ln" strokeWidth="1.8" markerEnd="url(#wt-ar)" />
      <text x="345" y="192" textAnchor="middle" fontSize="11" className="t3">no</text>
      <rect x="402" y="170" width="220" height="50" rx="12" className="r-s" strokeWidth="1.5" />
      <text x="512" y="192" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🧑‍🏫 Big LLM</text>
      <text x="512" y="209" textAnchor="middle" fontSize="11" className="t2">writing, deep reasoning</text>
    </svg>
  );
}

// ── Patterns ─────────────────────────────────────────────────────────────────

export function PatternCards() {
  const p: { i: string; n: string; b: string; ex: string; tone: Tone }[] = [
    { i: "📦", n: "Fan-out", b: "Ask every independent question — even speculative ones for branches you might take — in one call.", ex: "Route a request and fill each handler’s arguments at once.", tone: "c" },
    { i: "👉", n: "Select, don’t generate", b: "Code finds candidates; a Choice picks the right one. No invented values.", ex: "Regex finds every date in an email; Jev picks the delivery date.", tone: "v" },
    { i: "🧮", n: "Composite scoring", b: "Score each dimension separately; code weights them. Change weights without re-running the model.", ex: "Résumé fit per skill, weighted by the hiring manager.", tone: "a" },
    { i: "🪜", n: "Cascade", b: "A cheap model does the work, Jev checks each field, and only flagged items go to an expensive model.", ex: "Invoice extraction with reasoning-model quality at a fraction of the cost.", tone: "g" },
    { i: "✅", n: "Verify", b: "Ask whether a claim is supported by its source before showing it.", ex: "Citation checks on an LLM’s answer.", tone: "r" },
    { i: "🚦", n: "Confidence routing", b: "Use confidence as a second axis: act, act and log, or escalate.", ex: "Auto-refund only when refund and duplicate charge are both clear.", tone: "c" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {p.map((x) => (
        <div key={x.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[x.tone].fg }}>
          <p className="text-[15px] font-bold" style={{ color: T[x.tone].fg }}><span aria-hidden="true">{x.i}</span> {x.n}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{x.b}</p>
          <p className="mt-2 text-[12px] leading-snug text-[var(--text-primary)]"><em>e.g.</em> {x.ex}</p>
        </div>
      ))}
    </div>
  );
}

// ── Terminal ─────────────────────────────────────────────────────────────────

export function FirstCallTerminal() {
  const dim = "text-[#8b8ba0]";
  return (
    <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border-strong)] shadow-sm" style={{ background: "#0f0f16" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[#8b8ba0]">Terminal — first call</span>
      </div>
      <pre className="mono text-[12px] leading-[1.7] p-4 overflow-x-auto text-[#e8e8f0] whitespace-pre">
<span className="text-[#5fd68b]">$</span> bash examples/first_call.sh | jq .{"\n"}
{"{"}{"\n"}
{"  "}<span className="text-[#7aa7ff]">&quot;model&quot;</span>: <span className="text-[#f5b454]">&quot;jev-1.13.0&quot;</span>,{"\n"}
{"  "}<span className="text-[#7aa7ff]">&quot;answers&quot;</span>: {"{"}{"\n"}
{"    "}<span className="text-[#7aa7ff]">&quot;is_urgent&quot;</span>: {"{"} &quot;type&quot;: &quot;noul&quot;, &quot;noul&quot;: <span className="text-[#5fd68b]">0.99</span> {"}"},{"\n"}
{"    "}<span className="text-[#7aa7ff]">&quot;department&quot;</span>: {"{"}{"\n"}
{"      "}&quot;type&quot;: &quot;choice&quot;, &quot;choice&quot;: <span className="text-[#5fd68b]">&quot;technical&quot;</span>, &quot;confidence&quot;: 0.78,{"\n"}
{"      "}&quot;probabilities&quot;: {"{"} &quot;sales&quot;: 0.0, &quot;technical&quot;: 0.85, &quot;billing&quot;: 0.15 {"}"}{"\n"}
{"    }"}{"\n"}
{"  }"},{"\n"}
{"  "}<span className="text-[#7aa7ff]">&quot;usage&quot;</span>: {"{"} &quot;input_tokens&quot;: 376, &quot;output_tokens&quot;: 57 {"}"}{"\n"}
{"}"}{"\n"}
<span className={dim}># 376 input tokens × $0.042 per million ≈ $0.000016 — output is free</span>
      </pre>
    </div>
  );
}

// ── Limits ───────────────────────────────────────────────────────────────────

export function Limits() {
  const rows: [string, string, string][] = [
    ["Reads literally", "Answers the words, not what you meant", "Write the exact condition; put boundary cases in the criteria"],
    ["Maths and counting", "It isn’t a calculator", "Do arithmetic in code; one Noul per item, sum in code"],
    ["Dates and times", "Reads them as words, not a timeline", "Extract the parts, compare in code"],
    ["Long, noisy state", "Irrelevant text distracts it", "Filter in code first; send named fields"],
    ["Injected instructions", "Text in the state can sway it", "Precise criteria; test adversarial cases"],
    ["Writing", "It doesn’t generate text at all", "Use an LLM for prose — Jev decides when"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3 font-semibold text-[var(--text-primary)]">Weak spot</th>
            <th className="py-2 px-3 font-semibold text-[var(--text-primary)]">In plain words</th>
            <th className="py-2 pl-3 font-semibold text-[var(--fig-green)]">Workaround</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">{a}</td>
              <td className="py-2 px-3 text-[var(--text-secondary)]">{b}</td>
              <td className="py-2 pl-3 text-[var(--text-secondary)]">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 30-day path ──────────────────────────────────────────────────────────────

export function TypesafePath() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Feel it", tone: "g", items: ["Sign up at console.typesafe.ai", "Try all three question types in the Playground", "Make one curl call"] },
    { w: "Week 2 · Build", tone: "c", items: ["Install the Python SDK", "Build the ticket sorter", "Batch every question into one call"] },
    { w: "Week 3 · Tune", tone: "a", items: ["Run 50 real examples", "Set thresholds from your data", "Pin the model version"] },
    { w: "Week 4 · Compose", tone: "r", items: ["Add a cascade or a verify step", "Let an LLM write only when Jev says so", "Try the Claude Code skill on your own code"] },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {weeks.map((w) => (
        <li key={w.w} className="rounded-[var(--radius)] border p-4" style={{ borderColor: T[w.tone].fg, background: T[w.tone].soft }}>
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">{w.w}</p>
          <ul className="mt-2 space-y-1.5">
            {w.items.map((it) => (
              <li key={it} className="flex gap-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]"><span style={{ color: T[w.tone].fg }} aria-hidden="true">☐</span>{it}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
