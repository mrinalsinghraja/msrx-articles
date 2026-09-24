import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "DeepSeek 101".
 *
 * Release history follows DeepSeek's API changelog; architecture figures
 * follow the DeepSeek-V2, V3 and R1 technical reports. Numbers inside
 * illustrations (cache sizes, rewards) are simplified to show the idea, and
 * the captions say so. Screens are drawings, not screenshots.
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

// ── January 2025 in four numbers ─────────────────────────────────────────────

export function DeepSeekMoment() {
  const stats: { big: string; small: string; tone: Tone }[] = [
    { big: "#1", small: "free app on Apple’s US App Store within a week of R1’s release", tone: "c" },
    { big: "≈17%", small: "one-day fall in Nvidia’s share price on 27 January 2025 — close to $600 billion of market value", tone: "r" },
    { big: "$5.6M", small: "DeepSeek’s estimate for the GPU time of V3’s final training run (not total research cost)", tone: "a" },
    { big: "MIT", small: "the open licence R1’s weights were released under — free to download, modify and use commercially", tone: "g" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.big} className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
          <p className="display text-[34px]" style={{ color: T[s.tone].fg }}>{s.big}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.small}</p>
        </div>
      ))}
    </div>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "2015–2023", t: "From a hedge fund to an AI lab", b: "Liang Wenfeng’s quantitative fund High-Flyer builds large GPU clusters for trading research, then spins out DeepSeek in Hangzhou in July 2023 to pursue general AI.", tone: "c" },
  { d: "Nov 2023", t: "DeepSeek Coder and DeepSeek LLM", b: "The first open models, for code and general chat.", tone: "c" },
  { d: "May 2024", t: "DeepSeek-V2 and the price war", b: "A mixture-of-experts model with a new attention design, priced so low that other Chinese labs cut their prices too.", tone: "v" },
  { d: "Dec 2024", t: "DeepSeek-V3", b: "671 billion parameters, 37 billion active per token, near the frontier at a fraction of the usual training cost.", tone: "v" },
  { d: "Jan 2025", t: "DeepSeek-R1", b: "An open reasoning model that rivals OpenAI’s o1, trained largely with reinforcement learning, MIT-licensed. The app tops the charts and shakes the markets.", tone: "r" },
  { d: "Mar–May 2025", t: "V3-0324 and R1-0528", b: "Upgrades to both lines: better coding, reasoning and fewer hallucinations.", tone: "a" },
  { d: "Aug–Dec 2025", t: "V3.1, V3.2 and sparse attention", b: "One hybrid model that can think or answer directly; DeepSeek Sparse Attention makes long context much cheaper.", tone: "a" },
  { d: "Apr–Sep 2026", t: "The V4 family", b: "V4-Pro and V4-Flash with 1-million-token context and stronger agent skills, then V4.1-Flash with built-in image understanding.", tone: "g" },
];

export function DeepSeekTimeline() {
  return (
    <ol className="relative ml-2 border-l-2 border-[var(--fig-line)] space-y-5">
      {HISTORY.map((h) => (
        <li key={h.d + h.t} className="relative pl-6">
          <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{ background: T[h.tone].fg }} aria-hidden="true" />
          <p className="mono text-[12px] font-semibold" style={{ color: T[h.tone].fg }}>{h.d}</p>
          <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{h.t}</p>
          <p className="text-[13.5px] leading-snug text-[var(--text-secondary)]">{h.b}</p>
        </li>
      ))}
    </ol>
  );
}

// ── Four ways to use it ──────────────────────────────────────────────────────

export function FourDoors() {
  const doors: { i: string; n: string; b: string; data: string; tone: Tone }[] = [
    { i: "💬", n: "The DeepSeek app", b: "chat.deepseek.com, iPhone and Android. Free.", data: "Runs on DeepSeek’s servers in China", tone: "c" },
    { i: "⚙️", n: "The DeepSeek API", b: "platform.deepseek.com. Pay per token, very cheaply.", data: "Runs on DeepSeek’s servers in China", tone: "v" },
    { i: "☁️", n: "Another company’s cloud", b: "Open weights hosted by cloud providers and AI platforms.", data: "Runs where that provider says", tone: "a" },
    { i: "💻", n: "Your own computer", b: "Download open weights; run with Ollama or LM Studio.", data: "Never leaves your machine", tone: "g" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {doors.map((d) => (
        <div key={d.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[d.tone].fg }}>
          <p className="text-[15.5px] font-bold text-[var(--text-primary)]"><span aria-hidden="true">{d.i}</span> {d.n}</p>
          <p className="mt-1 text-[13px] leading-snug text-[var(--text-secondary)]">{d.b}</p>
          <p className="mt-2 mono text-[11px] font-semibold rounded-md px-2 py-1 inline-block" style={{ color: T[d.tone].fg, background: T[d.tone].soft }}>📍 {d.data}</p>
        </div>
      ))}
    </div>
  );
}

// ── App interface ────────────────────────────────────────────────────────────

export function DeepSeekAppMock() {
  return (
    <WindowFrame title="chat.deepseek.com — illustration">
      <div className="p-4 sm:p-5 space-y-3 text-[13px]">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--paper-sunk)] px-3.5 py-2 text-[var(--text-primary)]">
            A train leaves Guwahati at 6:40 and takes 7 h 55 min. With a 35-minute delay, when does it reach Siliguri?
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--paper-tint)] px-3 py-2">
          <p className="text-[12px] font-semibold text-[var(--text-tertiary)]">🧠 Thought for 6 seconds ▾</p>
          <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--text-tertiary)]">
            6:40 + 7 h = 13:40. Plus 55 min = 14:35. Delay 35 min → 15:10. Let me double-check: 7 h 55 + 35 = 8 h 30. 6:40 + 8:30 = 15:10. ✓
          </p>
        </div>
        <p className="text-[var(--text-primary)]">The train will reach Siliguri at <strong>3:10 pm</strong> (15:10) — the 7 h 55 min journey plus the 35-minute delay makes 8 h 30 min in total.</p>
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-2.5">
          <p className="text-[var(--text-tertiary)]">Message DeepSeek</p>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="rounded-full border-2 border-[var(--fig-cyan)] bg-[var(--fig-cyan-soft)] px-2.5 py-0.5 font-medium text-[var(--text-primary)]">🧠 DeepThink</span>
            <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[var(--text-secondary)]">🌐 Search</span>
            <span className="ml-auto text-[var(--text-secondary)]">📎 ⬆️</span>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── DeepSeekMoE ──────────────────────────────────────────────────────────────

export function DeepSeekMoE() {
  const routed = 16;
  const active = [2, 7, 11];
  return (
    <svg viewBox="0 0 640 260" role="img" aria-labelledby="dsmoe-t">
      <title id="dsmoe-t">DeepSeekMoE. Every token always passes through a shared expert that holds common knowledge, and a router also sends it to a few of many small, fine-grained routed experts. Only the chosen experts compute, so a 671-billion-parameter model uses about 37 billion parameters per token.</title>
      <Arrow id="dsm-ar" />
      <rect x="10" y="105" width="90" height="46" rx="10" className="c-s" strokeWidth="1.5" />
      <text x="55" y="126" textAnchor="middle" fontSize="12" className="t" fontWeight="700">token</text>
      <text x="55" y="142" textAnchor="middle" fontSize="10.5" className="t2">“integral”</text>
      <line x1="102" y1="128" x2="132" y2="128" className="ln" strokeWidth="1.8" markerEnd="url(#dsm-ar)" />
      <rect x="136" y="20" width="120" height="44" rx="10" className="g-s" strokeWidth="1.8" />
      <text x="196" y="40" textAnchor="middle" fontSize="12" className="t" fontWeight="700">shared expert</text>
      <text x="196" y="55" textAnchor="middle" fontSize="10" className="t2">always used</text>
      <path d="M120 128 Q 120 42 132 42" className="g-ln" strokeWidth="1.6" markerEnd="url(#dsm-ar)" />
      <path d="M136 108 L166 128 L136 148 Z" className="a-s" strokeWidth="1.5" transform="translate(0,0)" />
      <text x="150" y="172" textAnchor="middle" fontSize="10.5" className="t2">router</text>
      {Array.from({ length: routed }, (_, i) => {
        const col = i % 8, row = Math.floor(i / 8);
        const x = 200 + col * 34, y = 100 + row * 40;
        const on = active.includes(i);
        return (
          <g key={i}>
            {on && <line x1="166" y1="128" x2={x} y2={y + 12} className="v-ln" strokeWidth="1.8" markerEnd="url(#dsm-ar)" />}
            <rect x={x} y={y} width="28" height="24" rx="5" className={on ? "v-s" : "box"} strokeWidth={on ? 1.8 : 1} opacity={on ? 1 : 0.5} />
          </g>
        );
      })}
      <text x="332" y="200" textAnchor="middle" fontSize="11" className="t3">many small routed experts — only a few chosen per token</text>
      <line x1="256" y1="42" x2="498" y2="118" className="g-ln" strokeWidth="1.4" markerEnd="url(#dsm-ar)" />
      <line x1="478" y1="128" x2="498" y2="128" className="v-ln" strokeWidth="1.8" markerEnd="url(#dsm-ar)" />
      <rect x="502" y="100" width="128" height="56" rx="12" className="box" strokeWidth="1.5" />
      <text x="566" y="124" textAnchor="middle" fontSize="12" className="t" fontWeight="700">combine</text>
      <text x="566" y="141" textAnchor="middle" fontSize="10.5" className="t2">→ next layer</text>
      <text x="566" y="210" textAnchor="middle" fontSize="12" className="v" fontWeight="700">V3: 671B total</text>
      <text x="566" y="228" textAnchor="middle" fontSize="12" className="v" fontWeight="700">37B active per token</text>
    </svg>
  );
}

// ── Multi-head latent attention ──────────────────────────────────────────────

export function MlaCache() {
  const rows: { n: string; w: number; tone: Tone; note: string }[] = [
    { n: "Standard attention", w: 100, tone: "r", note: "stores full keys and values for every head, every token" },
    { n: "Grouped-query attention", w: 30, tone: "a", note: "heads share keys and values in groups" },
    { n: "DeepSeek MLA", w: 8, tone: "g", note: "stores one small compressed “latent” per token" },
  ];
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-[var(--text-secondary)]">Memory needed to remember a long conversation (the <em>KV cache</em>), relative size — illustrative:</p>
      {rows.map((r) => (
        <div key={r.n} className="grid sm:grid-cols-[11rem_1fr] gap-x-3 gap-y-1 items-center">
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">{r.n}</span>
          <div>
            <div className="h-6 rounded-md bg-[var(--paper-sunk)] overflow-hidden" aria-hidden="true">
              <div className="h-full rounded-md" style={{ width: `${r.w}%`, background: T[r.tone].fg }} />
            </div>
            <p className="mt-0.5 text-[11.5px] text-[var(--text-tertiary)]">{r.note}</p>
          </div>
        </div>
      ))}
      <p className="text-[12px] text-[var(--text-tertiary)]">DeepSeek’s V2 paper reported a 93% smaller KV cache than its earlier dense 67B model. A smaller cache means longer contexts and more users per GPU — and cheaper prices.</p>
    </div>
  );
}

// ── How R1 was trained ───────────────────────────────────────────────────────

function StepRow({ items }: { items: { t: string; b: string; tone: Tone }[] }) {
  return (
    <ol className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
      {items.map((s, i) => (
        <li key={s.t} className="flex flex-col md:flex-row items-center md:flex-1 md:min-w-0">
          <div className="w-full md:h-full rounded-[var(--radius)] border px-3 md:px-2 py-2.5 text-center" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">{s.t}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </div>
          {i < items.length - 1 && <span className="text-[var(--text-tertiary)] text-[18px] py-1 md:py-0 md:px-0.5 rotate-90 md:rotate-0" aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  );
}

export function R1Pipeline() {
  const top: { t: string; b: string; tone: Tone }[] = [
    { t: "DeepSeek-V3-Base", b: "a pre-trained model", tone: "c" },
    { t: "Pure RL (GRPO)", b: "rewarded only for correct, well-formatted answers", tone: "v" },
    { t: "R1-Zero", b: "learns to reason — but mixes languages, hard to read", tone: "r" },
  ];
  const bottom: { t: string; b: string; tone: Tone }[] = [
    { t: "1 · Cold start", b: "fine-tune on a few thousand clean reasoning examples", tone: "c" },
    { t: "2 · Reasoning RL", b: "GRPO on maths, code, logic + a language-consistency reward", tone: "v" },
    { t: "3 · Rejection sampling", b: "keep the best answers as ~800k new training examples", tone: "a" },
    { t: "4 · RL for everything", b: "helpfulness and safety across all kinds of prompts", tone: "v" },
    { t: "DeepSeek-R1", b: "then distilled into small Qwen and Llama models", tone: "g" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <p className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">The experiment</p>
        <StepRow items={top} />
      </div>
      <div>
        <p className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">The recipe that shipped</p>
        <StepRow items={bottom} />
      </div>
    </div>
  );
}

// ── Open weights spectrum ────────────────────────────────────────────────────

export function OpenSpectrum() {
  const cols: { n: string; ex: string; can: string[]; tone: Tone }[] = [
    { n: "Closed model", ex: "most US frontier models", can: ["Use it through an app or API", "No download, no inspection"], tone: "r" },
    { n: "Open weights", ex: "DeepSeek, Llama, Qwen, Mistral", can: ["Download and run it anywhere", "Fine-tune it on your data", "Inspect and study its behaviour", "Training data and code mostly not included"], tone: "g" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {cols.map((c) => (
        <div key={c.n} className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
          <p className="text-[15px] font-bold" style={{ color: T[c.tone].fg }}>{c.n}</p>
          <p className="text-[12px] text-[var(--text-tertiary)]">e.g. {c.ex}</p>
          <ul className="mt-2 space-y-1">
            {c.can.map((x) => <li key={x} className="text-[12.5px] leading-snug text-[var(--text-secondary)]">• {x}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Which size can I run? ────────────────────────────────────────────────────

export function LocalSizes() {
  const rows: [string, string, string, Tone][] = [
    ["1.5B", "Almost any laptop, even without a GPU", "Quick, simple answers; a fun first try", "g"],
    ["7B / 8B", "8 GB graphics card, or a Mac with 16 GB memory", "Good everyday reasoning — the sweet spot", "g"],
    ["14B", "12–16 GB graphics card, or a Mac with 24 GB+", "Noticeably smarter, still quick", "c"],
    ["32B", "24 GB graphics card, or a Mac with 32–64 GB", "Strong reasoning at home", "a"],
    ["70B", "Two big GPUs, or a Mac with 64–128 GB", "Enthusiast territory", "a"],
    ["Full models", "A rack of data-centre GPUs", "What the DeepSeek app runs", "r"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3 font-semibold text-[var(--text-primary)]">Size</th>
            <th className="py-2 px-3 font-semibold text-[var(--text-primary)]">Roughly what you need</th>
            <th className="py-2 pl-3 font-semibold text-[var(--text-primary)]">What to expect</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([s, hw, what, tone]) => (
            <tr key={s} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3"><span className="mono font-bold rounded px-1.5 py-0.5" style={{ color: T[tone].fg, background: T[tone].soft }}>{s}</span></td>
              <td className="py-2 px-3 text-[var(--text-secondary)]">{hw}</td>
              <td className="py-2 pl-3 text-[var(--text-secondary)]">{what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Ollama terminal ──────────────────────────────────────────────────────────

export function OllamaMock() {
  const dim = "text-[#8b8ba0]";
  return (
    <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border-strong)] shadow-sm" style={{ background: "#0f0f16" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[#8b8ba0]">Terminal — ollama — illustration</span>
      </div>
      <pre className="mono text-[12px] leading-[1.7] p-4 overflow-x-auto text-[#e8e8f0] whitespace-pre">
<span className="text-[#5fd68b]">$</span> ollama run deepseek-r1:8b{"\n"}
<span className={dim}>pulling manifest… downloading 5.2 GB ████████████ 100%</span>{"\n"}
<span className="text-[#b69cfb]">&gt;&gt;&gt;</span> Is 2027 a prime number?{"\n"}
<span className={dim}>&lt;think&gt;</span>{"\n"}
<span className={dim}>Check divisors up to √2027 ≈ 45. Not even. Digit sum 11 → not divisible by 3.</span>{"\n"}
<span className={dim}>Not 5. 7×289=2023, 7×290=2030 → no. 11: 2−0+2−7=−3 → no. 13×156=2028 → no…</span>{"\n"}
<span className={dim}>…43×47=2021, 43×48=2064 → no. No divisor found.</span>{"\n"}
<span className={dim}>&lt;/think&gt;</span>{"\n"}
{"\n"}
Yes — <span className="text-[#5fd68b]">2027 is prime</span>. It isn’t divisible by any prime up to 43,{"\n"}
and √2027 is about 45, so no larger factor is possible.{"\n"}
<span className={dim}>(runs offline — nothing leaves this computer)</span>
      </pre>
    </div>
  );
}

// ── Privacy decision ─────────────────────────────────────────────────────────

export function PrivacyChooser() {
  return (
    <svg viewBox="0 0 640 250" role="img" aria-labelledby="pc-t">
      <title id="pc-t">Choosing how to use DeepSeek. If your work involves personal, confidential or regulated data, run open weights on your own computer or use a provider whose data terms you trust. If your organisation restricts DeepSeek, follow the policy. Otherwise, for everyday non-sensitive questions, the app or API are fine.</title>
      <Arrow id="pc-ar" />
      <rect x="220" y="10" width="200" height="44" rx="12" className="box" strokeWidth="1.5" />
      <text x="320" y="37" textAnchor="middle" fontSize="13" className="t" fontWeight="700">What will you share?</text>
      <path d="M270 56 L140 100" className="ln" strokeWidth="1.8" markerEnd="url(#pc-ar)" />
      <path d="M320 56 L320 100" className="ln" strokeWidth="1.8" markerEnd="url(#pc-ar)" />
      <path d="M370 56 L500 100" className="ln" strokeWidth="1.8" markerEnd="url(#pc-ar)" />
      {[
        { x: 20, q: "Personal, client or", q2: "regulated data", a: "💻 Run it locally", a2: "or a trusted host", cls: "r-s", acl: "g" },
        { x: 230, q: "Work, where your", q2: "employer restricts it", a: "📋 Follow the policy", a2: "use approved tools", cls: "a-s", acl: "a" },
        { x: 430, q: "Everyday, nothing", q2: "you’d mind others seeing", a: "💬 App or API", a2: "are fine", cls: "c-s", acl: "c" },
      ].map((b) => (
        <g key={b.q}>
          <rect x={b.x} y="104" width="190" height="52" rx="12" className={b.cls} strokeWidth="1.5" />
          <text x={b.x + 95} y="126" textAnchor="middle" fontSize="12" className="t" fontWeight="600">{b.q}</text>
          <text x={b.x + 95} y="142" textAnchor="middle" fontSize="12" className="t" fontWeight="600">{b.q2}</text>
          <line x1={b.x + 95} y1="158" x2={b.x + 95} y2="182" className="ln" strokeWidth="1.8" markerEnd="url(#pc-ar)" />
          <rect x={b.x + 10} y="186" width="170" height="52" rx="12" className="box" strokeWidth="1.5" />
          <text x={b.x + 95} y="208" textAnchor="middle" fontSize="12.5" className={b.acl} fontWeight="700">{b.a}</text>
          <text x={b.x + 95} y="226" textAnchor="middle" fontSize="11" className="t2">{b.a2}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Same code, three places ──────────────────────────────────────────────────

export function SameCode() {
  const rows: [string, string, string, Tone][] = [
    ["DeepSeek API", "https://api.deepseek.com", "deepseek-flash", "v"],
    ["Ollama on your laptop", "http://localhost:11434/v1", "deepseek-r1:8b", "g"],
    ["Another provider", "the provider’s endpoint", "their DeepSeek model name", "a"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3 font-semibold text-[var(--text-primary)]">Where it runs</th>
            <th className="py-2 px-3 font-semibold text-[var(--text-primary)]"><code>base_url</code></th>
            <th className="py-2 pl-3 font-semibold text-[var(--text-primary)]"><code>model</code></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([w, u, m, tone]) => (
            <tr key={w} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 font-medium" style={{ color: T[tone].fg }}>{w}</td>
              <td className="py-2 px-3 mono text-[12px] text-[var(--text-primary)]">{u}</td>
              <td className="py-2 pl-3 mono text-[12px] text-[var(--text-primary)]">{m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 30-day path ──────────────────────────────────────────────────────────────

export function DeepSeekPath() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Chat", tone: "g", items: ["Try the app with DeepThink on and off", "Read its thinking on a maths puzzle", "Turn on Search for a current question"] },
    { w: "Week 2 · Local", tone: "c", items: ["Install Ollama", "Run deepseek-r1:8b offline", "Compare its answers with the app"] },
    { w: "Week 3 · API", tone: "a", items: ["Top up a small API balance", "Make a call with thinking on", "Ask for JSON output"] },
    { w: "Week 4 · Deeper", tone: "r", items: ["Read the R1 paper’s introduction", "Play with the GRPO simulator above", "Point a coding agent at the API"] },
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
