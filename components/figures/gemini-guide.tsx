import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "How to start with Google Gemini".
 *
 * Screens are drawings, labelled as illustrations in their captions. Model IDs
 * follow Google's Gemini API models page and plan names follow gemini.google's
 * subscriptions page, both read on 24 September 2026.
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

function Pin({ n }: { n: number }) {
  return (
    <span className="inline-grid place-items-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0" style={{ background: "#1d4ed8" }} aria-hidden="true">
      {n}
    </span>
  );
}

/** A four-point sparkle, the visual shorthand for Gemini. Solid fill so repeated copies need no shared SVG ids. */
function Sparkle({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="inline-block shrink-0" style={{ width: size, height: size }}>
      <path d="M12 1 C12.8 7.5 16.5 11.2 23 12 C16.5 12.8 12.8 16.5 12 23 C11.2 16.5 7.5 12.8 1 12 C7.5 11.2 11.2 7.5 12 1 Z" fill="#6b8ff8" />
    </svg>
  );
}

// ── Where Gemini lives ───────────────────────────────────────────────────────

export function GeminiUniverse() {
  const groups: { title: string; tone: Tone; items: [string, string, string][] }[] = [
    {
      title: "For everyone",
      tone: "c",
      items: [
        ["💬", "Gemini app", "gemini.google.com, Android, iPhone"],
        ["🤖", "On Android", "hold the power button or say “Hey Google”"],
        ["🧭", "Gemini in Chrome", "help with the page you are on"],
        ["🔎", "Google Search", "AI Overviews and AI Mode"],
      ],
    },
    {
      title: "For work and study",
      tone: "g",
      items: [
        ["✉️", "Gmail, Docs, Sheets, Slides", "side panel in Google Workspace"],
        ["📓", "NotebookLM", "research grounded in your own sources"],
        ["🎬", "Flow and Veo", "AI video creation"],
      ],
    },
    {
      title: "For builders",
      tone: "v",
      items: [
        ["🧪", "Google AI Studio", "try models, get an API key"],
        ["⚙️", "Gemini API", "call Gemini from your code"],
        ["☁️", "Vertex AI", "Gemini on Google Cloud for companies"],
        ["⌨️", "Gemini CLI", "an open-source agent in your terminal"],
        ["🛸", "Antigravity", "Google’s agent-first coding environment"],
      ],
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkle size={30} />
        <p className="display-sm text-[20px] text-[var(--text-primary)]">One family of models, everywhere Google is</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[g.tone].fg, background: T[g.tone].soft }}>
            <p className="mono text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: T[g.tone].fg }}>{g.title}</p>
            <ul className="space-y-2">
              {g.items.map(([i, n, b]) => (
                <li key={n} className="flex gap-2.5 rounded-lg bg-[var(--fig-card)] px-2.5 py-2">
                  <span className="text-[17px] leading-5" aria-hidden="true">{i}</span>
                  <span className="text-[13px] leading-snug">
                    <strong className="block text-[var(--text-primary)]">{n}</strong>
                    <span className="text-[var(--text-secondary)]">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "2017", t: "Google invents the Transformer", b: "The paper “Attention Is All You Need”, by Google researchers, introduces the architecture behind every modern chatbot.", tone: "c" },
  { d: "2018–2022", t: "BERT, LaMDA, PaLM", b: "BERT improves Google Search; LaMDA is built for conversation; PaLM scales to 540 billion parameters.", tone: "c" },
  { d: "Feb–Mar 2023", t: "Bard", b: "Google’s first public AI chatbot, answering ChatGPT.", tone: "v" },
  { d: "Apr 2023", t: "Google DeepMind", b: "Google Brain and DeepMind merge into one lab, the team that builds Gemini.", tone: "v" },
  { d: "Dec 2023", t: "Gemini 1.0", b: "Ultra, Pro and Nano: a model family built multimodal from the start — text, images, audio and video together.", tone: "v" },
  { d: "Feb 2024", t: "Bard becomes Gemini; 1.5 Pro", b: "The chatbot takes the model’s name, and Gemini 1.5 Pro can read a million tokens at once.", tone: "a" },
  { d: "Dec 2024", t: "Gemini 2.0 and Deep Research", b: "Google announces the “agentic era”: models that use tools and act; Deep Research writes cited reports.", tone: "a" },
  { d: "2025", t: "Thinking models, CLI, Nano Banana, Gemini 3", b: "Gemini 2.5 thinks before answering (March); Gemini CLI goes open source (June); the “Nano Banana” image model goes viral (August); Gemini 3 arrives in November.", tone: "g" },
  { d: "2026", t: "The Gemini 3.x generation", b: "Faster, cheaper Flash models reach frontier quality — Gemini 3.8 Flash is the API’s default today — alongside new voice, video and music models.", tone: "g" },
];

export function GeminiTimeline() {
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

// ── Native multimodality ─────────────────────────────────────────────────────

export function MultimodalCompare() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-labelledby="mm-t">
      <title id="mm-t">Two designs compared. Bolted-on: separate systems turn speech into text and images into captions before a text-only model sees them, losing tone and detail. Natively multimodal, like Gemini: text, images, audio and video are all turned into tokens and read together by one model.</title>
      <Arrow id="mm-ar" />
      <text x="160" y="22" textAnchor="middle" fontSize="13" className="t2" fontWeight="700">Bolted-on</text>
      <text x="480" y="22" textAnchor="middle" fontSize="13" className="v" fontWeight="700">Natively multimodal (Gemini)</text>
      <line x1="320" y1="10" x2="320" y2="320" className="ln" strokeDasharray="4 4" />

      {[
        { y: 60, i: "🎙️", l: "voice", mid: "speech-to-text" },
        { y: 130, i: "🖼️", l: "photo", mid: "caption writer" },
        { y: 200, i: "📝", l: "text", mid: "" },
      ].map((r) => (
        <g key={r.l}>
          <text x="30" y={r.y + 6} fontSize="20">{r.i}</text>
          <text x="58" y={r.y + 4} fontSize="11.5" className="t2">{r.l}</text>
          {r.mid ? (
            <>
              <line x1="92" y1={r.y} x2="112" y2={r.y} className="ln" strokeWidth="1.5" markerEnd="url(#mm-ar)" />
              <rect x="116" y={r.y - 16} width="96" height="32" rx="8" className="box" />
              <text x="164" y={r.y + 4} textAnchor="middle" fontSize="10.5" className="t2">{r.mid}</text>
              <line x1="214" y1={r.y} x2="236" y2={145} className="ln" strokeWidth="1.5" markerEnd="url(#mm-ar)" />
            </>
          ) : (
            <line x1="92" y1={r.y} x2="236" y2={165} className="ln" strokeWidth="1.5" markerEnd="url(#mm-ar)" />
          )}
        </g>
      ))}
      <rect x="240" y="120" width="68" height="70" rx="12" className="a-s" strokeWidth="1.5" />
      <text x="274" y="150" textAnchor="middle" fontSize="11" className="t" fontWeight="700">text-only</text>
      <text x="274" y="165" textAnchor="middle" fontSize="11" className="t" fontWeight="700">model</text>
      <text x="160" y="262" textAnchor="middle" fontSize="11.5" className="r">tone of voice, layout, detail</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11.5" className="r">get lost in translation</text>

      {[
        { y: 60, i: "🎙️" },
        { y: 115, i: "🖼️" },
        { y: 170, i: "🎞️" },
        { y: 225, i: "📝" },
      ].map((r) => (
        <g key={r.y}>
          <text x="350" y={r.y + 6} fontSize="20">{r.i}</text>
          <line x1="378" y1={r.y} x2="398" y2={r.y} className="ln" strokeWidth="1.5" markerEnd="url(#mm-ar)" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={402 + k * 14} y={r.y - 6} width="11" height="12" rx="2" className="v" opacity={0.35 + k * 0.15} />
          ))}
          <line x1="460" y1={r.y} x2="506" y2={145} className="ln" strokeWidth="1.3" markerEnd="url(#mm-ar)" />
        </g>
      ))}
      <text x="430" y="262" textAnchor="middle" fontSize="11" className="t3">everything becomes tokens</text>
      <rect x="510" y="100" width="110" height="90" rx="14" className="v-s" strokeWidth="2" />
      <text x="565" y="138" textAnchor="middle" fontSize="13" className="t" fontWeight="700">one model</text>
      <text x="565" y="156" textAnchor="middle" fontSize="11" className="t2">sees it all</text>
      <text x="565" y="171" textAnchor="middle" fontSize="11" className="t2">together</text>
      <text x="565" y="262" textAnchor="middle" fontSize="11.5" className="g">hears the sarcasm,</text>
      <text x="565" y="278" textAnchor="middle" fontSize="11.5" className="g">reads the chart</text>
    </svg>
  );
}

// ── Mixture of experts ───────────────────────────────────────────────────────

export function MixtureOfExperts() {
  const experts = ["maths", "code", "grammar", "Hindi", "biology", "music", "law", "…"];
  const active = [1, 3];
  return (
    <svg viewBox="0 0 640 250" role="img" aria-labelledby="moe-t">
      <title id="moe-t">A mixture-of-experts layer. A router looks at each token and sends it to only a couple of the many expert sub-networks, so a huge model spends only a fraction of its compute on each token.</title>
      <Arrow id="moe-ar" />
      <rect x="20" y="100" width="90" height="46" rx="10" className="c-s" strokeWidth="1.5" />
      <text x="65" y="120" textAnchor="middle" fontSize="12" className="t" fontWeight="700">a token</text>
      <text x="65" y="136" textAnchor="middle" fontSize="11" className="t2">“def”</text>
      <line x1="112" y1="123" x2="150" y2="123" className="ln" strokeWidth="1.8" markerEnd="url(#moe-ar)" />
      <path d="M155 123 L195 93 L235 123 L195 153 Z" className="a-s" strokeWidth="1.5" />
      <text x="195" y="127" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">router</text>
      {experts.map((e, i) => {
        const y = 14 + i * 28;
        const on = active.includes(i);
        return (
          <g key={e}>
            <line x1="236" y1="123" x2="316" y2={y + 11} className={on ? "v-ln" : "ln"} strokeWidth={on ? 2.2 : 0.8} opacity={on ? 1 : 0.35} markerEnd={on ? "url(#moe-ar)" : undefined} />
            <rect x="320" y={y} width="120" height="22" rx="6" className={on ? "v-s" : "box"} strokeWidth={on ? 1.8 : 1} opacity={on ? 1 : 0.55} />
            <text x="380" y={y + 15} textAnchor="middle" fontSize="11" className={on ? "t" : "t3"} fontWeight={on ? 700 : 400}>expert: {e}</text>
            {on && <line x1="442" y1={y + 11} x2="494" y2="123" className="v-ln" strokeWidth="2" markerEnd="url(#moe-ar)" />}
          </g>
        );
      })}
      <rect x="498" y="100" width="120" height="46" rx="10" className="g-s" strokeWidth="1.5" />
      <text x="558" y="120" textAnchor="middle" fontSize="12" className="t" fontWeight="700">combined</text>
      <text x="558" y="136" textAnchor="middle" fontSize="11" className="t2">output</text>
      <text x="558" y="190" textAnchor="middle" fontSize="11.5" className="t3">only 2 of 8 experts</text>
      <text x="558" y="206" textAnchor="middle" fontSize="11.5" className="t3">did any work</text>
    </svg>
  );
}

// ── Model lineup ─────────────────────────────────────────────────────────────

export function GeminiModels() {
  const core: { n: string; id: string; tag: string; b: string; tone: Tone }[] = [
    { n: "Flash-Lite", id: "gemini-3.5-flash-lite", tag: "Cheapest, fastest", b: "Huge volumes of simple jobs: tagging, routing, short summaries.", tone: "g" },
    { n: "Flash", id: "gemini-3.8-flash", tag: "The default", b: "Google’s recommended starting point: fast, and strong enough for coding and agents.", tone: "c" },
    { n: "Pro", id: "gemini-3.1-pro-preview", tag: "Deepest reasoning", b: "Hard analysis, maths and complex agentic work (preview in the API).", tone: "v" },
  ];
  const special: [string, string, string][] = [
    ["🎙️", "Live", "gemini-3.8-live — real-time voice conversations"],
    ["🔊", "Text-to-speech", "gemini-3.8-flash-tts — natural voices"],
    ["🍌", "Nano Banana", "gemini-3.1-flash-image — create and edit images"],
    ["🎬", "Video", "gemini-omni-1.1-flash, Veo 3.1 — generate and edit video"],
    ["🧭", "Embeddings", "gemini-embedding-001 — meaning-based search"],
  ];
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        {core.map((m) => (
          <div key={m.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[m.tone].fg }}>
            <p className="mono text-[10px] uppercase tracking-[0.1em] font-semibold" style={{ color: T[m.tone].fg }}>{m.tag}</p>
            <p className="text-[17px] font-bold text-[var(--text-primary)] mt-1">Gemini {m.n}</p>
            <p className="mono text-[11px] text-[var(--text-tertiary)] mt-0.5 break-all">{m.id}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-[var(--text-secondary)]">{m.b}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[12px] text-[var(--text-tertiary)]">
        <span>faster, cheaper</span>
        <span className="flex-1 h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--fig-green), var(--fig-cyan), var(--fig-violet))" }} aria-hidden="true" />
        <span>smarter, slower</span>
      </div>
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3.5">
        <p className="mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-tertiary)] mb-2">Specialist models</p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {special.map(([i, n, b]) => (
            <li key={n} className="text-[12.5px] leading-snug text-[var(--text-secondary)]">
              <span aria-hidden="true">{i}</span> <strong className="text-[var(--text-primary)]">{n}:</strong> <span className="mono text-[11.5px]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Gemini app tour ──────────────────────────────────────────────────────────

export function GeminiAppTour() {
  const legend = [
    "New chat — one topic per chat.",
    "Gems — your saved, custom versions of Gemini.",
    "Recent chats — searchable history.",
    "Model menu — a fast mode for everyday asks, a thinking mode for hard ones.",
    "The prompt box — type, paste, or add files and photos with ＋.",
    "Tools — Deep Research, Canvas, image and video creation.",
    "Live — talk to Gemini out loud, and share your camera or screen.",
  ];
  return (
    <div>
      <WindowFrame title="gemini.google.com — illustration">
        <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] min-h-[300px] text-[12.5px]">
          <div className="border-r border-[var(--border)] bg-[var(--paper-tint)] p-2.5 space-y-2">
            <div className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 font-medium text-[var(--text-primary)]">
              <Pin n={1} /> <span className="truncate">✎ New chat</span>
            </div>
            <p className="flex items-center gap-1.5 pt-1 text-[var(--text-secondary)]"><Pin n={2} /> Gems</p>
            {["💎 Exam coach", "💎 Recipe helper"].map((x) => <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>)}
            <p className="flex items-center gap-1.5 pt-2 text-[var(--text-tertiary)]"><Pin n={3} /> Recent</p>
            {["Monsoon trip to Coorg", "Explain SIP returns", "Fix Sheets formula"].map((x) => (
              <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-3 py-2">
              <Pin n={4} />
              <span className="rounded-full bg-[var(--paper-sunk)] px-2.5 py-1 font-medium text-[var(--text-primary)]">Gemini · Fast ▾</span>
            </div>
            <div className="flex-1 grid place-items-center p-4">
              <p className="display-sm text-[18px] sm:text-[24px] text-center" style={{ background: "linear-gradient(90deg,#4f8df7,#a78bfa)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Hello, Arjun
              </p>
            </div>
            <div className="m-3 rounded-3xl border border-[var(--border-strong)] bg-[var(--card)] p-2.5">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                <Pin n={5} /> <span className="flex-1">Ask Gemini</span>
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]">＋</span>
                <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]"><Pin n={6} /> Tools</span>
                <span className="ml-auto flex items-center gap-1 text-[var(--text-secondary)]"><Pin n={7} /> 🎙️ Live</span>
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>
      <ol className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
        {legend.map((l, i) => (
          <li key={l} className="flex gap-2 text-[13px] leading-snug text-[var(--text-secondary)]">
            <Pin n={i + 1} /> <span>{l}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Gem builder ──────────────────────────────────────────────────────────────

export function GemBuilderMock() {
  return (
    <WindowFrame title="Gem manager → New Gem — illustration">
      <div className="grid sm:grid-cols-2 text-[12.5px]">
        <div className="p-4 space-y-3 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-1">Name</p>
            <p className="rounded-lg border border-[var(--border-strong)] px-2.5 py-1.5 text-[var(--text-primary)]">💎 Interview coach</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-1">Instructions</p>
            <p className="rounded-lg border border-[var(--border-strong)] px-2.5 py-2 leading-relaxed text-[var(--text-secondary)]">
              You are a friendly but honest interview coach for freshers applying to IT companies in India. Ask one question at a time. After each answer, score it out of 10, say what worked, and show a stronger version. Mix HR and technical questions.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-1">Knowledge</p>
            <p className="rounded-lg border border-dashed border-[var(--border-strong)] px-2.5 py-1.5 text-[var(--text-tertiary)]">📄 my-resume.pdf · 📄 job-description.pdf</p>
          </div>
        </div>
        <div className="p-4 bg-[var(--paper-tint)] space-y-2.5">
          <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Preview</p>
          <p className="text-[var(--text-primary)]">Let’s begin. <strong>Tell me about a project on your résumé you’re proud of</strong> — what was your part, and what went wrong?</p>
          <p className="flex justify-end"><span className="rounded-2xl rounded-br-sm bg-[var(--paper-sunk)] px-3 py-1.5 text-[var(--text-primary)]">I built a college attendance app in Flutter…</span></p>
          <p className="text-[var(--text-primary)]"><strong>7/10.</strong> Clear and specific. Add a number — how many students used it? — and one thing you’d do differently…</p>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── Deep Research ────────────────────────────────────────────────────────────

export function DeepResearchFlow() {
  const steps: { i: string; t: string; b: string; tone: Tone }[] = [
    { i: "❓", t: "Your question", b: "“Compare EV two-wheelers under ₹1.5 lakh for a Pune commute”", tone: "c" },
    { i: "🗺️", t: "Research plan", b: "Gemini proposes the sub-questions; you can edit them", tone: "v" },
    { i: "🌐", t: "Browse", b: "reads dozens of pages over several minutes", tone: "a" },
    { i: "🧠", t: "Reason", b: "compares, spots gaps, searches again", tone: "a" },
    { i: "📑", t: "Report", b: "a structured report with sources, exportable to Docs", tone: "g" },
  ];
  return (
    <ol className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
      {steps.map((s, i) => (
        <li key={s.t} className="flex flex-col md:flex-row items-center md:flex-1 md:min-w-0">
          <div className="w-full md:h-full rounded-[var(--radius)] border px-3 md:px-2 py-3 text-center" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <div className="text-[22px] leading-none mb-1.5" aria-hidden="true">{s.i}</div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">{s.t}</p>
            <p className="mt-1 text-[11.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </div>
          {i < steps.length - 1 && <span className="text-[var(--text-tertiary)] text-[18px] py-1 md:py-0 md:px-0.5 rotate-90 md:rotate-0" aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  );
}

// ── Android phone ────────────────────────────────────────────────────────────

export function AndroidMock() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="w-[210px] rounded-[30px] border-[6px] border-[var(--text-primary)] overflow-hidden shadow-sm bg-[linear-gradient(160deg,#1e3a5f,#0f172a)]">
        <div className="h-5 grid place-items-center"><span className="w-3 h-3 rounded-full bg-black/60" aria-hidden="true" /></div>
        <div className="px-3 pb-3 pt-24 text-[11.5px]">
          <div className="rounded-2xl bg-[var(--card)] p-3 space-y-2 shadow-lg">
            <div className="flex items-center gap-1.5"><Sparkle size={16} /><span className="font-semibold text-[var(--text-primary)]">Gemini</span></div>
            <p className="text-[var(--text-secondary)]">Ask about screen · Talk Live</p>
            <div className="rounded-full border border-[var(--border-strong)] px-2.5 py-1.5 flex items-center gap-1.5 text-[var(--text-tertiary)]">
              <span className="flex-1">Ask Gemini</span><span aria-hidden="true">📷</span><span aria-hidden="true">🎙️</span>
            </div>
          </div>
          <p className="mt-2 text-center text-white/70">hold the power button</p>
        </div>
      </div>
      <div className="w-[210px] rounded-[30px] border-[6px] border-[var(--text-primary)] overflow-hidden shadow-sm bg-[#0b0b12]">
        <div className="h-5 grid place-items-center"><span className="w-3 h-3 rounded-full bg-white/20" aria-hidden="true" /></div>
        <div className="relative h-[310px]">
          <div className="absolute inset-3 rounded-2xl bg-[linear-gradient(135deg,#374151,#111827)] grid place-items-center text-[40px]" aria-hidden="true">🚲</div>
          <div className="absolute left-3 right-3 bottom-16 rounded-xl bg-black/60 px-2.5 py-2 text-[11px] text-white">
            “That’s a slipped chain. Shift to the smallest rear gear, then lift the chain back on from the top…”
          </div>
          <div className="absolute left-0 right-0 bottom-3 flex justify-center gap-4 text-[18px]" aria-hidden="true">
            <span>📷</span><span>🎙️</span><span>✖️</span>
          </div>
          <p className="absolute top-4 left-0 right-0 text-center text-[11px] text-white/80 font-semibold">Live · camera on</p>
        </div>
      </div>
    </div>
  );
}

// ── Workspace ────────────────────────────────────────────────────────────────

export function GmailMock() {
  return (
    <WindowFrame title="Gmail with the Gemini side panel — illustration">
      <div className="grid grid-cols-[1fr_11rem] sm:grid-cols-[1fr_15rem] min-h-[230px] text-[12px]">
        <div className="p-4 space-y-2">
          <p className="font-semibold text-[var(--text-primary)]">Re: Venue for the alumni meet (14 messages)</p>
          {["Rohit: The hall at Dispur can seat 120, ₹40k…", "Meena: Can we check the Paltan Bazaar option too?", "Rohit: They quoted ₹32k but no parking…", "Anita: Dates — 22 Nov or 29 Nov?"].map((m) => (
            <p key={m} className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[var(--text-secondary)] truncate">{m}</p>
          ))}
        </div>
        <div className="border-l border-[var(--border)] bg-[var(--paper-tint)] p-3 space-y-2">
          <p className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]"><Sparkle size={14} /> Gemini</p>
          <p className="rounded-lg bg-[var(--paper-sunk)] px-2 py-1.5 text-[var(--text-primary)]">Summarise this thread and what’s still undecided</p>
          <ul className="space-y-1 text-[var(--text-secondary)]">
            <li>• Two venues: Dispur (₹40k, 120 seats) and Paltan Bazaar (₹32k, no parking)</li>
            <li>• <strong className="text-[var(--text-primary)]">Undecided:</strong> venue, and 22 vs 29 Nov</li>
          </ul>
          <p className="rounded-lg border border-[var(--border-strong)] px-2 py-1 text-[var(--text-secondary)]">✎ Draft a reply proposing a vote</p>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── Grounding with Google Search ─────────────────────────────────────────────

export function GroundingFlow() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-labelledby="gr-t">
      <title id="gr-t">Grounding with Google Search. Gemini decides a question needs fresh facts, runs Google searches, reads the results, and answers with citations linking to the sources, so you can check them.</title>
      <Arrow id="gr-ar" />
      {[
        { x: 10, t: "Question", s: "“Is the Kaziranga", s2: "park open this week?”", cls: "c-s" },
        { x: 170, t: "Needs fresh facts?", s: "Gemini decides", s2: "to search", cls: "a-s" },
        { x: 330, t: "Google Search", s: "queries run,", s2: "top pages read", cls: "v-s" },
        { x: 490, t: "Grounded answer", s: "with numbered", s2: "source links [1] [2]", cls: "g-s" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x} y="60" width="140" height="84" rx="14" className={n.cls} strokeWidth="1.5" />
          <text x={n.x + 70} y="90" textAnchor="middle" fontSize="13" className="t" fontWeight="700">{n.t}</text>
          <text x={n.x + 70} y="110" textAnchor="middle" fontSize="11" className="t2">{n.s}</text>
          <text x={n.x + 70} y="125" textAnchor="middle" fontSize="11" className="t2">{n.s2}</text>
          {i < 3 && <line x1={n.x + 142} y1="102" x2={n.x + 166} y2="102" className="ln" strokeWidth="1.8" markerEnd="url(#gr-ar)" />}
        </g>
      ))}
      <path d="M240 146 Q 240 190 60 190 Q 60 190 60 148" className="ln" strokeWidth="1.3" strokeDasharray="5 4" markerEnd="url(#gr-ar)" />
      <text x="150" y="210" textAnchor="middle" fontSize="11" className="t3">no search needed → answers directly</text>
      <text x="320" y="36" textAnchor="middle" fontSize="12" className="t3">in the API, this is one built-in tool you switch on</text>
    </svg>
  );
}

// ── AI Studio ────────────────────────────────────────────────────────────────

export function AiStudioMock() {
  return (
    <WindowFrame title="aistudio.google.com — illustration">
      <div className="grid sm:grid-cols-[1fr_12rem] text-[12.5px]">
        <div className="p-4 space-y-3 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--paper-tint)] px-3 py-2">
            <p className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-1">System instructions</p>
            <p className="text-[var(--text-secondary)]">You write product descriptions for a Jaipur block-print store. Warm, 60 words, no clichés.</p>
          </div>
          <p className="flex justify-end"><span className="rounded-2xl rounded-br-sm bg-[var(--paper-sunk)] px-3 py-1.5 text-[var(--text-primary)]">📷 [photo of an indigo quilt] Describe this.</span></p>
          <p className="text-[var(--text-primary)]">Hand-stamped by artisans in Sanganer, this indigo quilt carries tiny marigold motifs across soft mulmul cotton…</p>
          <div className="flex gap-2">
            <span className="rounded-lg border border-[var(--border-strong)] px-2.5 py-1 font-semibold text-[var(--text-primary)]">{"</>"} Get code</span>
            <span className="rounded-lg border border-[var(--border-strong)] px-2.5 py-1 text-[var(--text-secondary)]">🔑 Get API key</span>
          </div>
        </div>
        <div className="p-4 bg-[var(--paper-tint)] space-y-2.5">
          <p className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Run settings</p>
          <p className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[var(--text-primary)]">gemini-3.8-flash ▾</p>
          <p className="text-[var(--text-secondary)]">Thinking ▸ <span className="text-[var(--text-primary)]">low</span></p>
          <p className="text-[var(--text-secondary)]">Structured output ☐</p>
          <p className="text-[var(--text-secondary)]">Grounding: Google Search ☑</p>
          <p className="text-[var(--text-secondary)]">Tokens: 1,204 / 1,048,576</p>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── Gemini CLI terminal ──────────────────────────────────────────────────────

export function GeminiCliMock() {
  const dim = "text-[#8b8ba0]";
  return (
    <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border-strong)] shadow-sm" style={{ background: "#0f0f16" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[#8b8ba0]">~/photos — gemini — illustration</span>
      </div>
      <pre className="mono text-[12px] leading-[1.7] p-4 overflow-x-auto text-[#e8e8f0] whitespace-pre">
<span className="text-[#5fd68b]">$</span> gemini{"\n"}
<span className="text-[#7aa7ff]">✦ Gemini CLI</span>  <span className={dim}>· signed in with Google · GEMINI.md loaded</span>{"\n"}
{"\n"}
<span className="text-[#b69cfb]">&gt;</span> Rename every photo in this folder by the date it was taken, like 2026-09-14_001.jpg{"\n"}
{"\n"}
<span className={dim}>✓ ReadFolder</span> . — 214 .jpg files{"\n"}
<span className={dim}>✓ Shell</span> exiftool -DateTimeOriginal IMG_0001.jpg{"\n"}
{"\n"}
I’ll write a small script that reads each photo’s EXIF date and renames it.{"\n"}
3 photos have no date — I’ll leave those unchanged and list them.{"\n"}
{"\n"}
<span className="text-[#38d9f0]">? Allow execution of: python rename_by_date.py --dry-run</span>{"\n"}
<span className="text-[#e8e8f0]">  › Yes, allow once   Always allow   No</span>{"\n"}
{"\n"}
<span className={dim}>✓ Shell</span> dry run: 211 renames, 3 skipped — no clashes{"\n"}
{"\n"}
Looks right. Run it for real?
      </pre>
    </div>
  );
}

// ── Long context ─────────────────────────────────────────────────────────────

export function MillionTokens() {
  const items: { i: string; n: string; tone: Tone }[] = [
    { i: "📚", n: "about 1,500 pages of text", tone: "c" },
    { i: "🎞️", n: "roughly an hour of video", tone: "v" },
    { i: "🎧", n: "several hours of audio", tone: "a" },
    { i: "💻", n: "a codebase of tens of thousands of lines", tone: "g" },
  ];
  return (
    <div>
      <p className="text-center text-[14px] text-[var(--text-secondary)] mb-3">
        What fits in a <strong className="text-[var(--text-primary)]">1,000,000-token</strong> context window, very roughly:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {items.map((x) => (
          <div key={x.n} className="rounded-[var(--radius)] border-2 p-3 text-center" style={{ borderColor: T[x.tone].fg, background: T[x.tone].soft }}>
            <p className="text-[28px]" aria-hidden="true">{x.i}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-primary)]">{x.n}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[12px] text-[var(--text-tertiary)]">…but only one of them at a time. Estimates vary with language, resolution and the model.</p>
    </div>
  );
}

// ── Plans ────────────────────────────────────────────────────────────────────

export function PlanLadder() {
  const plans: { n: string; tone: Tone; b: string[] }[] = [
    { n: "Free", tone: "g", b: ["Gemini app with a Flash model, and Pro for some asks", "Deep Research, Canvas, Gems, Live", "Image creation and editing"] },
    { n: "Google AI Plus", tone: "c", b: ["Higher limits", "Gemini in Gmail and Docs", "Some video generation", "More storage"] },
    { n: "Google AI Pro", tone: "v", b: ["Higher limits again", "More access to the Pro model", "More video and creative credits", "Lots of storage"] },
    { n: "Google AI Ultra", tone: "r", b: ["The highest limits", "Earliest access to top models and experiments", "The most credits and storage"] },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
      {plans.map((p, i) => (
        <li key={p.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[p.tone].fg, minHeight: `${9 + i * 1.5}rem` }}>
          <p className="text-[15px] font-bold" style={{ color: T[p.tone].fg }}>{p.n}</p>
          <ul className="mt-2 space-y-1">
            {p.b.map((x) => (
              <li key={x} className="text-[12.5px] leading-snug text-[var(--text-secondary)] flex gap-1.5"><span style={{ color: T[p.tone].fg }} aria-hidden="true">✓</span>{x}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

// ── 30-day path ──────────────────────────────────────────────────────────────

export function GeminiPath() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Everyday", tone: "g", items: ["Use the Gemini app daily for real tasks", "Try Live with your camera", "Ask it about a photo you take"] },
    { w: "Week 2 · Research", tone: "c", items: ["Run one Deep Research report", "Draft something long in Canvas", "Check three of its sources yourself"] },
    { w: "Week 3 · Personalise", tone: "a", items: ["Build a Gem you’ll reuse", "Connect Gmail, Drive or Calendar", "Summarise a long email thread"] },
    { w: "Week 4 · Build", tone: "r", items: ["Prototype in Google AI Studio", "Make your first API call", "Install Gemini CLI and add GEMINI.md"] },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {weeks.map((w) => (
        <li key={w.w} className="rounded-[var(--radius)] border p-4" style={{ borderColor: T[w.tone].fg, background: T[w.tone].soft }}>
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">{w.w}</p>
          <ul className="mt-2 space-y-1.5">
            {w.items.map((it) => (
              <li key={it} className="flex gap-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">
                <span style={{ color: T[w.tone].fg }} aria-hidden="true">☐</span>
                {it}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
