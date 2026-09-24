import type { ReactNode } from "react";
import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "ChatGPT 101".
 *
 * Screens are drawn in markup and labelled as illustrations: ChatGPT's real
 * interface changes often, and a drawing that shows the idea stays useful
 * longer than a screenshot that shows last month's buttons.
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

// ── Great at / careful with ──────────────────────────────────────────────────

function ListColumn({ title, tone, rows }: { title: string; tone: Tone; rows: string[][] }) {
  return (
    <div className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[tone].fg, background: T[tone].soft }}>
      <p className="mono text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: T[tone].fg }}>{title}</p>
      <ul className="space-y-2.5">
        {rows.map(([icon, h, b]) => (
          <li key={h} className="flex gap-2.5">
            <span className="text-[18px] leading-6" aria-hidden="true">{icon}</span>
            <span className="text-[13.5px] leading-snug">
              <strong className="text-[var(--text-primary)]">{h}</strong>
              <span className="text-[var(--text-secondary)]"> — {b}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrengthsLimits() {
  const good = [
    ["✍️", "Drafting", "emails, posts, cover letters, speeches"],
    ["🧑‍🏫", "Explaining", "any topic, at any level, as many times as you like"],
    ["💡", "Brainstorming", "names, ideas, plans, angles you missed"],
    ["📄", "Summarising", "long PDFs, meeting notes, articles"],
    ["💻", "Coding", "writing, explaining and fixing code"],
    ["🌍", "Translating", "and adjusting tone between languages"],
  ];
  const careful = [
    ["🧮", "Exact facts & figures", "it can state wrong numbers confidently"],
    ["📚", "Citations", "check every source it names really exists"],
    ["🩺", "Medical, legal, money", "a starting point, never the final word"],
    ["🔒", "Private data", "don’t paste passwords, IDs or secrets"],
    ["📰", "Breaking news", "unless it searches the web, its knowledge has a cut-off"],
    ["🎯", "Your own judgment", "it proposes; you decide"],
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <ListColumn title="✓ Great at" tone="g" rows={good} />
      <ListColumn title="⚠ Be careful with" tone="a" rows={careful} />
    </div>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "Dec 2015", t: "OpenAI is founded", b: "A research lab set up to build advanced AI that benefits everyone.", tone: "c" },
  { d: "2018–2020", t: "GPT-1 → GPT-2 → GPT-3", b: "Each “Generative Pre-trained Transformer” is far larger than the last. GPT-3 (2020) has 175 billion parameters and surprises everyone with fluent text.", tone: "c" },
  { d: "30 Nov 2022", t: "ChatGPT launches", b: "A free chat window on top of a GPT-3.5 model, tuned with human feedback to follow instructions. It becomes one of the fastest-growing consumer apps ever.", tone: "v" },
  { d: "Feb–Mar 2023", t: "ChatGPT Plus and GPT-4", b: "A paid tier arrives, then GPT-4: much stronger reasoning, and able to read images.", tone: "v" },
  { d: "Nov 2023", t: "Custom GPTs", b: "Anyone can build a tailored version of ChatGPT with its own instructions and files — no code needed.", tone: "v" },
  { d: "May 2024", t: "GPT-4o", b: "“Omni”: one model for text, images and natural real-time voice conversation.", tone: "a" },
  { d: "Sep 2024", t: "Reasoning models (o1)", b: "Models trained to think step by step before answering, far better at maths, science and code.", tone: "a" },
  { d: "2025", t: "Deep research, agents, GPT-5", b: "ChatGPT learns to research the web for many minutes, to act in a browser on your behalf, and in August gets GPT-5, which decides by itself when to think longer.", tone: "g" },
  { d: "2026", t: "Newer model generations", b: "Models keep improving and plans keep changing. The skills in this article — clear asks, good context, checking answers — do not.", tone: "g" },
];

export function ChatGptTimeline() {
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

// ── What the model actually sees ─────────────────────────────────────────────

export function ContextStack() {
  const layers: { name: string; who: string; tone: Tone; h: number }[] = [
    { name: "System instructions", who: "written by OpenAI: tone, safety rules, today’s date", tone: "r", h: 42 },
    { name: "Your custom instructions", who: "“I’m a teacher in Pune; keep answers short”", tone: "a", h: 42 },
    { name: "Saved memories", who: "facts it chose (or you asked it) to remember", tone: "a", h: 42 },
    { name: "Files, search results, tool output", who: "PDFs you attached, web pages it fetched", tone: "c", h: 52 },
    { name: "The whole conversation so far", who: "every earlier message, yours and its", tone: "v", h: 72 },
    { name: "Your new message", who: "the thing you just typed", tone: "g", h: 42 },
  ];
  let y = 20;
  return (
    <svg viewBox="0 0 640 400" role="img" aria-labelledby="cs-t">
      <title id="cs-t">Everything ChatGPT reads on each turn is one long document: system instructions, your custom instructions, saved memories, attached files and tool output, the conversation so far, and your new message, stacked into the context window and fed to the model, which writes the reply.</title>
      <Arrow id="cs-ar" />
      <text x="180" y="14" textAnchor="middle" fontSize="12" className="t3">the context window — re-read in full on every turn</text>
      {layers.map((l) => {
        const top = y;
        y += l.h + 6;
        return (
          <g key={l.name}>
            <rect x="20" y={top} width="320" height={l.h} rx="10" className={`${l.tone}-s`} strokeWidth="1.5" />
            <text x="34" y={top + l.h / 2 - 3} fontSize="14" className="t" fontWeight="700">{l.name}</text>
            <text x="34" y={top + l.h / 2 + 14} fontSize="11.5" className="t2">{l.who}</text>
          </g>
        );
      })}
      <line x1="346" y1="200" x2="396" y2="200" className="ln" strokeWidth="2" markerEnd="url(#cs-ar)" />
      <rect x="400" y="150" width="120" height="100" rx="16" className="box" strokeWidth="1.5" />
      <text x="460" y="195" textAnchor="middle" fontSize="26">🧠</text>
      <text x="460" y="222" textAnchor="middle" fontSize="13" className="t" fontWeight="700">the model</text>
      <line x1="524" y1="200" x2="564" y2="200" className="ln" strokeWidth="2" markerEnd="url(#cs-ar)" />
      <text x="598" y="194" textAnchor="middle" fontSize="22">💬</text>
      <text x="598" y="220" textAnchor="middle" fontSize="12.5" className="t" fontWeight="600">reply</text>
      <text x="460" y="290" textAnchor="middle" fontSize="11.5" className="t3">no hidden memory of you</text>
      <text x="460" y="306" textAnchor="middle" fontSize="11.5" className="t3">beyond what is in this stack</text>
    </svg>
  );
}

// ── Annotated interface ──────────────────────────────────────────────────────

function Pin({ n }: { n: number }) {
  return (
    <span className="inline-grid place-items-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0" style={{ background: "#6d28d9" }} aria-hidden="true">
      {n}
    </span>
  );
}

export function InterfaceTour() {
  const legend = [
    "New chat — start fresh when you change topic, so old context doesn’t confuse it.",
    "Chat history and Projects — past conversations, and folders that share files and instructions.",
    "Model picker — faster models for everyday asks, “thinking” models for hard problems.",
    "The message box — type here. Enter sends; Shift + Enter adds a new line.",
    "Attach — upload files, photos and screenshots for it to read.",
    "Tools — web search, image creation, deep research and more, depending on your plan.",
    "Voice — talk out loud and hear it answer.",
  ];
  return (
    <div>
      <WindowFrame title="chatgpt.com — illustration">
        <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] min-h-[300px] text-[12.5px]">
          <div className="border-r border-[var(--border)] bg-[var(--paper-tint)] p-2.5 space-y-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 font-medium text-[var(--text-primary)]">
              <Pin n={1} /> <span className="truncate">✎ New chat</span>
            </div>
            <div className="flex items-center gap-1.5 pt-2 text-[var(--text-tertiary)]"><Pin n={2} /> <span>Projects</span></div>
            {["📁 Thesis", "📁 Trip to Goa"].map((x) => <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>)}
            <p className="pt-1 text-[var(--text-tertiary)]">Recent</p>
            {["Explain inflation", "Cover letter draft", "Fix my SQL query", "Weekly meal plan"].map((x) => (
              <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]">
              <Pin n={3} />
              <span className="rounded-lg bg-[var(--paper-sunk)] px-2 py-1 font-medium text-[var(--text-primary)]">ChatGPT · Auto ▾</span>
            </div>
            <div className="flex-1 grid place-items-center p-4">
              <p className="display-sm text-[18px] sm:text-[22px] text-[var(--text-primary)] text-center">What can I help with?</p>
            </div>
            <div className="m-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-2.5">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                <Pin n={4} /> <span className="flex-1">Ask anything…</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]"><Pin n={5} /> ＋</span>
                <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]"><Pin n={6} /> Tools</span>
                <span className="ml-auto flex items-center gap-1 text-[var(--text-secondary)]"><Pin n={7} /> 🎙️</span>
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

// ── A conversation that improves ─────────────────────────────────────────────

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return me ? (
    <div className="flex justify-end">
      <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--paper-sunk)] px-3.5 py-2 text-[var(--text-primary)]">{children}</div>
    </div>
  ) : (
    <div className="flex gap-2.5">
      <span className="msrx-gradient shrink-0 w-6 h-6 rounded-full grid place-items-center text-white text-[11px]" aria-hidden="true">✦</span>
      <div className="text-[var(--text-primary)] space-y-1.5">{children}</div>
    </div>
  );
}

export function IterationChat() {
  return (
    <WindowFrame title="A conversation — illustration">
      <div className="p-4 space-y-3.5 text-[13.5px] leading-relaxed">
        <Bubble me>write a leave application</Bubble>
        <Bubble>
          <p className="text-[var(--text-secondary)]">Dear Sir/Madam, I am writing to request leave from [start date] to [end date] due to [reason]… <em>(generic, full of blanks)</em></p>
        </Bubble>
        <Bubble me>
          Make it for my manager Priya. I need 3 days, 12–14 March, for my sister’s wedding in Jaipur. I’ve finished the Q1 report and Arjun will cover client calls. Warm but professional, under 100 words.
        </Bubble>
        <Bubble>
          <p>Hi Priya,</p>
          <p>I’d like to request leave from 12 to 14 March to attend my sister’s wedding in Jaipur. The Q1 report is complete, and Arjun has kindly agreed to cover client calls while I’m away…</p>
        </Bubble>
        <Bubble me>Perfect. Now a two-line WhatsApp version for Arjun.</Bubble>
        <p className="text-center mono text-[11px] tracking-[0.1em] uppercase text-[var(--text-tertiary)]">↑ each follow-up builds on everything above it</p>
      </div>
    </WindowFrame>
  );
}

// ── The six ingredients ──────────────────────────────────────────────────────

export function PromptAnatomy() {
  const parts: { k: string; tone: Tone; q: string; ex: string }[] = [
    { k: "Role", tone: "c", q: "Who should it be?", ex: "You are an experienced primary-school maths teacher." },
    { k: "Task", tone: "v", q: "What exactly do you want?", ex: "Create a 10-question quiz on fractions." },
    { k: "Context", tone: "a", q: "What does it need to know?", ex: "My class is 9-year-olds; half find fractions scary." },
    { k: "Format", tone: "g", q: "What shape should the answer take?", ex: "A table: question, answer, hint. Then an answer key." },
    { k: "Examples", tone: "r", q: "What does good look like?", ex: "Like this: “Pizza cut into 8, you eat 3 — what fraction is left?”" },
    { k: "Limits", tone: "c", q: "What should it avoid?", ex: "No decimals. Keep each question under 25 words." },
  ];
  return (
    <div className="space-y-2">
      {parts.map((p) => (
        <div key={p.k} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_12rem_1fr] items-stretch rounded-[var(--radius)] border overflow-hidden" style={{ borderColor: T[p.tone].fg }}>
          <div className="grid place-items-center px-2 py-2 text-[14px] font-bold" style={{ background: T[p.tone].soft, color: T[p.tone].fg }}>{p.k}</div>
          <div className="hidden sm:flex items-center px-3 text-[13px] text-[var(--text-secondary)] border-r border-[var(--border)] bg-[var(--fig-card)]">{p.q}</div>
          <div className="flex items-center px-3 py-2 text-[13.5px] text-[var(--text-primary)] bg-[var(--fig-card)]">{p.ex}</div>
        </div>
      ))}
    </div>
  );
}

// ── Feature map ──────────────────────────────────────────────────────────────

export function FeatureGrid() {
  const f: { i: string; n: string; b: string; tone: Tone }[] = [
    { i: "📎", n: "Files & data", b: "Upload PDFs, spreadsheets, slides. It summarises, answers questions, and can run code to analyse data and draw charts.", tone: "c" },
    { i: "🖼️", n: "Images in", b: "Send a photo or screenshot: a maths problem, a menu, an error message, a plant.", tone: "c" },
    { i: "🎨", n: "Images out", b: "Describe a picture, diagram or poster and it creates one; ask for changes in words.", tone: "v" },
    { i: "🎙️", n: "Voice", b: "A natural spoken conversation — practise a language, rehearse an interview, think out loud.", tone: "v" },
    { i: "🔎", n: "Web search", b: "Fresh answers with links to sources, for news, prices, and anything recent.", tone: "a" },
    { i: "🧭", n: "Deep research", b: "Reads many sources over several minutes and writes a cited report.", tone: "a" },
    { i: "📝", n: "Canvas", b: "A side-by-side editor for long documents and code, where you both edit.", tone: "g" },
    { i: "🗂️", n: "Projects", b: "Folders of chats that share files and instructions — one per course, client or trip.", tone: "g" },
    { i: "🧠", n: "Memory", b: "Remembers useful facts across chats. You can view, edit or turn it off.", tone: "r" },
    { i: "🤖", n: "Custom GPTs", b: "Your own tailored assistant with fixed instructions and files, shareable by link.", tone: "r" },
    { i: "🕹️", n: "Agent", b: "Uses its own browser to carry out multi-step tasks, and asks before anything important.", tone: "r" },
    { i: "⏰", n: "Tasks", b: "Scheduled prompts: “every Monday at 8, give me three news items on solar energy”.", tone: "c" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
      {f.map((x) => (
        <div key={x.n} className="rounded-[var(--radius)] border bg-[var(--fig-card)] p-3.5" style={{ borderColor: T[x.tone].fg }}>
          <p className="text-[14.5px] font-semibold text-[var(--text-primary)]"><span aria-hidden="true">{x.i}</span> {x.n}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{x.b}</p>
        </div>
      ))}
    </div>
  );
}

// ── Which kind of model? ─────────────────────────────────────────────────────

export function ModelDecision() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="md-t">
      <title id="md-t">Decision chart: if the task needs several steps of logic, maths, code or planning, use a thinking model and expect a slower, better answer. If it needs fresh facts, turn on web search. Otherwise a fast model is fine.</title>
      <Arrow id="md-ar" />
      <rect x="220" y="10" width="200" height="46" rx="12" className="box" strokeWidth="1.5" />
      <text x="320" y="38" textAnchor="middle" fontSize="14" className="t" fontWeight="700">What are you asking?</text>

      <path d="M260 56 L130 110" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />
      <path d="M320 56 L320 110" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />
      <path d="M380 56 L510 110" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />

      <rect x="20" y="114" width="200" height="70" rx="12" className="g-s" strokeWidth="1.5" />
      <text x="120" y="140" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">Everyday ask</text>
      <text x="120" y="158" textAnchor="middle" fontSize="11.5" className="t2">draft, rewrite, explain,</text>
      <text x="120" y="173" textAnchor="middle" fontSize="11.5" className="t2">brainstorm, translate</text>

      <rect x="230" y="114" width="180" height="70" rx="12" className="v-s" strokeWidth="1.5" />
      <text x="320" y="140" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">Hard problem</text>
      <text x="320" y="158" textAnchor="middle" fontSize="11.5" className="t2">maths, code, strategy,</text>
      <text x="320" y="173" textAnchor="middle" fontSize="11.5" className="t2">many steps of logic</text>

      <rect x="420" y="114" width="200" height="70" rx="12" className="a-s" strokeWidth="1.5" />
      <text x="520" y="140" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">Needs fresh facts</text>
      <text x="520" y="158" textAnchor="middle" fontSize="11.5" className="t2">news, prices, schedules,</text>
      <text x="520" y="173" textAnchor="middle" fontSize="11.5" className="t2">anything recent</text>

      <path d="M120 184 L120 214" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />
      <path d="M320 184 L320 214" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />
      <path d="M520 184 L520 214" className="ln" strokeWidth="1.8" markerEnd="url(#md-ar)" />

      <rect x="20" y="218" width="200" height="64" rx="12" className="box" />
      <text x="120" y="244" textAnchor="middle" fontSize="13" className="g" fontWeight="700">⚡ Fast model</text>
      <text x="120" y="263" textAnchor="middle" fontSize="11.5" className="t2">answers in seconds</text>
      <rect x="230" y="218" width="180" height="64" rx="12" className="box" />
      <text x="320" y="244" textAnchor="middle" fontSize="13" className="v" fontWeight="700">🧠 Thinking model</text>
      <text x="320" y="263" textAnchor="middle" fontSize="11.5" className="t2">slower, far more careful</text>
      <rect x="420" y="218" width="200" height="64" rx="12" className="box" />
      <text x="520" y="244" textAnchor="middle" fontSize="13" className="a" fontWeight="700">🔎 Turn on search</text>
      <text x="520" y="263" textAnchor="middle" fontSize="11.5" className="t2">and open the sources</text>
    </svg>
  );
}

// ── Verify before you trust ──────────────────────────────────────────────────

export function VerifyFlow() {
  return (
    <svg viewBox="0 0 640 250" role="img" aria-labelledby="vf-t">
      <title id="vf-t">A checking routine. If an answer matters, ask whether it contains facts, numbers or sources. If yes, verify them against the original source; if they check out, use the answer, otherwise correct it or ask again with better context. If the answer is low-stakes, use it.</title>
      <Arrow id="vf-ar" />
      <rect x="10" y="95" width="120" height="56" rx="12" className="c-s" strokeWidth="1.5" />
      <text x="70" y="120" textAnchor="middle" fontSize="13" className="t" fontWeight="700">ChatGPT</text>
      <text x="70" y="137" textAnchor="middle" fontSize="13" className="t" fontWeight="700">answers</text>
      <line x1="130" y1="123" x2="168" y2="123" className="ln" strokeWidth="1.8" markerEnd="url(#vf-ar)" />
      <path d="M240 78 L310 123 L240 168 L170 123 Z" className="a-s" strokeWidth="1.5" />
      <text x="240" y="119" textAnchor="middle" fontSize="12" className="t" fontWeight="700">Does it</text>
      <text x="240" y="134" textAnchor="middle" fontSize="12" className="t" fontWeight="700">matter?</text>
      <text x="240" y="195" textAnchor="middle" fontSize="11.5" className="t3">no</text>
      <line x1="240" y1="168" x2="240" y2="206" className="ln" strokeWidth="1.8" markerEnd="url(#vf-ar)" />
      <rect x="185" y="208" width="110" height="34" rx="10" className="g-s" />
      <text x="240" y="230" textAnchor="middle" fontSize="12.5" className="t" fontWeight="600">Use it ✓</text>
      <text x="336" y="115" textAnchor="middle" fontSize="11.5" className="t3">yes</text>
      <line x1="310" y1="123" x2="356" y2="123" className="ln" strokeWidth="1.8" markerEnd="url(#vf-ar)" />
      <rect x="360" y="90" width="130" height="66" rx="12" className="box" strokeWidth="1.5" />
      <text x="425" y="114" textAnchor="middle" fontSize="12" className="t" fontWeight="700">Check facts,</text>
      <text x="425" y="130" textAnchor="middle" fontSize="12" className="t" fontWeight="700">numbers, links</text>
      <text x="425" y="146" textAnchor="middle" fontSize="11" className="t3">against the source</text>
      <line x1="490" y1="110" x2="530" y2="72" className="ln" strokeWidth="1.8" markerEnd="url(#vf-ar)" />
      <rect x="520" y="40" width="110" height="34" rx="10" className="g-s" />
      <text x="575" y="62" textAnchor="middle" fontSize="12.5" className="t" fontWeight="600">Holds up ✓</text>
      <line x1="490" y1="138" x2="530" y2="176" className="ln" strokeWidth="1.8" markerEnd="url(#vf-ar)" />
      <rect x="520" y="172" width="110" height="46" rx="10" className="r-s" />
      <text x="575" y="191" textAnchor="middle" fontSize="12" className="t" fontWeight="600">Wrong? Correct</text>
      <text x="575" y="207" textAnchor="middle" fontSize="12" className="t" fontWeight="600">it, add context</text>
      <path d="M575 218 Q 575 245 300 245 Q 70 245 70 156" className="r-ln" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#vf-ar)" />
    </svg>
  );
}

// ── Tokens and the context window ────────────────────────────────────────────

export function TokenBudget() {
  const segs: { n: string; w: number; tone: Tone }[] = [
    { n: "system + instructions", w: 8, tone: "r" },
    { n: "memories", w: 4, tone: "a" },
    { n: "attached files", w: 30, tone: "c" },
    { n: "conversation history", w: 34, tone: "v" },
    { n: "new message", w: 4, tone: "g" },
    { n: "room for the reply", w: 20, tone: "g" },
  ];
  return (
    <div>
      <div className="flex h-12 rounded-lg overflow-hidden border border-[var(--fig-line)]" role="img" aria-label="A context window split between system instructions, memories, attached files, conversation history, the new message and room for the reply">
        {segs.map((s, i) => (
          <div
            key={s.n}
            style={{ width: `${s.w}%`, background: i === segs.length - 1 ? "transparent" : T[s.tone].soft, borderRight: i < segs.length - 1 ? `2px solid ${T[s.tone].fg}` : undefined }}
            className={i === segs.length - 1 ? "bg-[repeating-linear-gradient(45deg,transparent_0_6px,var(--fig-sunk)_6px_12px)]" : ""}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segs.map((s, i) => (
          <li key={s.n} className="flex items-center gap-1.5 text-[12.5px] text-[var(--text-secondary)]">
            <span className="w-3 h-3 rounded-sm border" style={{ background: i === segs.length - 1 ? "var(--fig-sunk)" : T[s.tone].soft, borderColor: T[s.tone].fg }} aria-hidden="true" />
            {s.n}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid sm:grid-cols-3 gap-2 text-center">
        {[
          ["1 token", "≈ ¾ of an English word"],
          ["100 tokens", "≈ 75 words"],
          ["1,000 words", "≈ 1,300 tokens"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-lg border border-[var(--border)] bg-[var(--fig-card)] px-3 py-2">
            <p className="mono text-[14px] font-semibold text-[var(--text-primary)]">{a}</p>
            <p className="text-[12px] text-[var(--text-tertiary)]">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tool use loop ────────────────────────────────────────────────────────────

export function ToolCallFlow() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-labelledby="tc-t">
      <title id="tc-t">How tools work. The model reads your question and, instead of answering, writes a tool call such as a web search with a query. The app runs the tool and pastes the results back into the context. The model reads them and writes the final answer with sources.</title>
      <Arrow id="tc-ar" />
      {[
        { x: 10, l1: "You ask", l2: "“Is it raining", l3: "in Shillong now?”", cls: "c-s" },
        { x: 170, l1: "Model writes", l2: "a tool call:", l3: "search: Shillong rain", cls: "v-s" },
        { x: 330, l1: "App runs it", l2: "fetches pages,", l3: "adds them to context", cls: "a-s" },
        { x: 490, l1: "Model answers", l2: "from the results,", l3: "with links", cls: "g-s" },
      ].map((n, i) => (
        <g key={n.l1}>
          <rect x={n.x} y="60" width="140" height="84" rx="14" className={n.cls} strokeWidth="1.5" />
          <text x={n.x + 70} y="90" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">{n.l1}</text>
          <text x={n.x + 70} y="110" textAnchor="middle" fontSize="11.5" className="t2">{n.l2}</text>
          <text x={n.x + 70} y="126" textAnchor="middle" fontSize="11" className="t2">{n.l3}</text>
          {i < 3 && <line x1={n.x + 142} y1="102" x2={n.x + 166} y2="102" className="ln" strokeWidth="1.8" markerEnd="url(#tc-ar)" />}
        </g>
      ))}
      <path d="M400 146 Q 400 200 240 200 Q 240 200 240 148" className="v-ln" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#tc-ar)" />
      <text x="320" y="220" textAnchor="middle" fontSize="11.5" className="v">may loop: search again, run code, open a file…</text>
      <text x="320" y="36" textAnchor="middle" fontSize="12" className="t3">the model never touches the internet itself — it asks the app to, in text</text>
    </svg>
  );
}

// ── Custom GPT anatomy ───────────────────────────────────────────────────────

export function CustomGptAnatomy() {
  const parts: { n: string; b: string; tone: Tone }[] = [
    { n: "Instructions", b: "Who it is, what it does, how it answers, what it refuses.", tone: "v" },
    { n: "Knowledge", b: "Files it can search: syllabus, price list, style guide, FAQ.", tone: "c" },
    { n: "Capabilities", b: "Switch on web search, image creation, code and data analysis.", tone: "a" },
    { n: "Actions", b: "Optional: call your own API, e.g. check order status.", tone: "r" },
    { n: "Conversation starters", b: "Buttons that show people what to ask first.", tone: "g" },
  ];
  return (
    <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <ul className="space-y-2">
        {parts.map((p) => (
          <li key={p.n} className="rounded-[var(--radius)] border px-3.5 py-2.5 bg-[var(--fig-card)]" style={{ borderColor: T[p.tone].fg }}>
            <p className="text-[14px] font-semibold" style={{ color: T[p.tone].fg }}>{p.n}</p>
            <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{p.b}</p>
          </li>
        ))}
      </ul>
      <span className="hidden sm:block text-[28px] text-[var(--text-tertiary)]" aria-hidden="true">→</span>
      <div className="rounded-[var(--radius-lg)] border-2 border-[var(--fig-violet)] bg-[var(--fig-violet-soft)] p-5 text-center">
        <p className="text-[34px]" aria-hidden="true">🤖</p>
        <p className="display-sm text-[18px] text-[var(--text-primary)] mt-1">“Exam Buddy”</p>
        <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">A Class 10 science tutor that quizzes you from your own textbook chapters and never just gives the answer away.</p>
        <p className="mt-3 mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">shareable by link</p>
      </div>
    </div>
  );
}

// ── ChatGPT app vs API ───────────────────────────────────────────────────────

export function AppVsApi() {
  const rows: [string, string, string][] = [
    ["Who it’s for", "Anyone, in a browser or app", "Developers building their own products"],
    ["How you pay", "Free or a monthly plan", "Per token used, billed to your API account"],
    ["Interface", "Ready-made chat window", "HTTP requests from your code"],
    ["Memory & history", "Kept for you", "You store and resend it yourself"],
    ["Instructions", "Custom instructions, Projects, GPTs", "Your own system prompt, every call"],
    ["Output", "Chat text, files, images", "Text, or strict JSON matching your schema"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13.5px]">
        <thead>
          <tr>
            <th className="text-left py-2 pr-3 text-[var(--text-tertiary)] font-medium"> </th>
            <th className="text-left py-2 px-3 font-semibold" style={{ color: "var(--fig-green)" }}>💬 ChatGPT app</th>
            <th className="text-left py-2 px-3 font-semibold" style={{ color: "var(--fig-violet)" }}>⚙️ OpenAI API</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, a, b]) => (
            <tr key={k} className="border-t border-[var(--border)]">
              <th scope="row" className="text-left py-2 pr-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">{k}</th>
              <td className="py-2 px-3 text-[var(--text-secondary)]">{a}</td>
              <td className="py-2 px-3 text-[var(--text-secondary)]">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Settings screen: custom instructions ─────────────────────────────────────

export function CustomInstructionsMock() {
  return (
    <WindowFrame title="Settings → Personalization — illustration">
      <div className="p-4 sm:p-5 space-y-4 text-[13px]">
        <div>
          <p className="font-semibold text-[var(--text-primary)] mb-1.5">What should ChatGPT know about you?</p>
          <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--paper-tint)] px-3 py-2 text-[var(--text-secondary)] leading-relaxed">
            I’m a second-year B.Com student in Guwahati. I’m preparing for CA Foundation. English is my second language — I think in Assamese and Hindi.
          </div>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] mb-1.5">How should ChatGPT respond?</p>
          <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--paper-tint)] px-3 py-2 text-[var(--text-secondary)] leading-relaxed">
            Simple English, short paragraphs. Use Indian examples and ₹. When I’m studying, quiz me before telling me the answer. Say “I’m not sure” rather than guessing.
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="inline-flex w-8 h-[18px] rounded-full bg-[var(--fig-green)] p-0.5 justify-end" aria-hidden="true"><span className="w-[14px] h-[14px] rounded-full bg-white" /></span>
            Reference saved memories
          </div>
          <span className="rounded-lg bg-[var(--text-primary)] text-[var(--paper)] px-3 py-1.5 font-semibold">Save</span>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── 30-day plan ──────────────────────────────────────────────────────────────

export function ThirtyDayPlan() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Habit", tone: "g", items: ["One real task a day: an email, a recipe, an explanation", "Always ask one follow-up", "Set your custom instructions"] },
    { w: "Week 2 · Craft", tone: "c", items: ["Use all six prompt ingredients", "Upload a PDF and interrogate it", "Try voice for 10 minutes"] },
    { w: "Week 3 · Tools", tone: "a", items: ["Make a Project for one area of life", "Use search and open three sources", "Analyse a spreadsheet and make a chart"] },
    { w: "Week 4 · Build", tone: "r", items: ["Build one custom GPT you’ll actually reuse", "Try a thinking model on a hard problem", "Developers: make your first API call"] },
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
