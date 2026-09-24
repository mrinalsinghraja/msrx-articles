import type { ReactNode } from "react";
import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "How to use Claude".
 *
 * Interface screens are drawings, labelled as illustrations in their captions:
 * Anthropic's apps change often, and this page should not pass off a drawing
 * as a real screenshot. Model facts were checked against Anthropic's models
 * overview on 24 September 2026.
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
    <span className="inline-grid place-items-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0" style={{ background: "#b45309" }} aria-hidden="true">
      {n}
    </span>
  );
}

// ── One brain, many doors ────────────────────────────────────────────────────

export function SurfacesMap() {
  const doors: { x: number; y: number; icon: string; name: string; sub: string; cls: string }[] = [
    { x: 110, y: 60, icon: "🌐", name: "Web", sub: "claude.ai", cls: "c-s" },
    { x: 320, y: 36, icon: "🖥️", name: "Desktop app", sub: "Mac · Windows", cls: "c-s" },
    { x: 530, y: 60, icon: "📱", name: "Mobile", sub: "iPhone · Android", cls: "c-s" },
    { x: 548, y: 190, icon: "🧭", name: "Claude in Chrome", sub: "browser side panel", cls: "a-s" },
    { x: 530, y: 320, icon: "⌨️", name: "Claude Code", sub: "terminal · IDE · web", cls: "v-s" },
    { x: 320, y: 344, icon: "⚙️", name: "Claude API", sub: "your own apps", cls: "r-s" },
    { x: 110, y: 320, icon: "☁️", name: "Cloud platforms", sub: "AWS · Google · Microsoft", cls: "r-s" },
    { x: 92, y: 190, icon: "🔌", name: "Connectors", sub: "Drive · Gmail · M365…", cls: "g-s" },
  ];
  return (
    <svg viewBox="0 0 640 390" role="img" aria-labelledby="sm-t">
      <title id="sm-t">One family of Claude models in the centre, reachable through many doors: the web at claude.ai, desktop apps, mobile apps, Claude in Chrome, Claude Code for developers, the Claude API, cloud platforms, and connectors to your other apps.</title>
      {doors.map((d) => (
        <line key={d.name} x1="320" y1="190" x2={d.x} y2={d.y} className="ln" strokeWidth="1.4" strokeDasharray="4 4" />
      ))}
      <circle cx="320" cy="190" r="70" className="a-s" strokeWidth="2" />
      <text x="320" y="182" textAnchor="middle" fontSize="30">✳️</text>
      <text x="320" y="210" textAnchor="middle" fontSize="16" className="t" fontWeight="700">Claude</text>
      <text x="320" y="228" textAnchor="middle" fontSize="11" className="t2">the same models</text>
      {doors.map((d) => (
        <g key={d.name + "b"}>
          <rect x={d.x - 72} y={d.y - 26} width="144" height="52" rx="12" className={d.cls} strokeWidth="1.5" />
          <text x={d.x - 60} y={d.y + 6} fontSize="18">{d.icon}</text>
          <text x={d.x - 34} y={d.y - 2} fontSize="12.5" className="t" fontWeight="700">{d.name}</text>
          <text x={d.x - 34} y={d.y + 14} fontSize="10.5" className="t2">{d.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "2021", t: "Anthropic is founded", b: "A safety-focused AI company started by former OpenAI researchers, including siblings Dario and Daniela Amodei.", tone: "c" },
  { d: "Dec 2022", t: "Constitutional AI", b: "A paper describing how to train a helpful, harmless assistant using a written set of principles instead of only human ratings.", tone: "c" },
  { d: "Mar 2023", t: "Claude 1", b: "The first Claude opens to businesses; a 100,000-token context window follows that spring, huge for its time.", tone: "c" },
  { d: "Jul 2023", t: "Claude 2 and claude.ai", b: "Anyone can now chat with Claude in the browser.", tone: "v" },
  { d: "Mar 2024", t: "Claude 3: Haiku, Sonnet, Opus", b: "The three-size family arrives — small and fast, balanced, and most capable — and Claude can read images.", tone: "v" },
  { d: "Jun 2024", t: "Claude 3.5 Sonnet and Artifacts", b: "Claude starts building documents, diagrams and small apps in a panel beside the chat.", tone: "v" },
  { d: "Oct–Nov 2024", t: "Computer use and MCP", b: "Claude learns to operate a computer screen, and Anthropic open-sources the Model Context Protocol for connecting AI to tools and data.", tone: "a" },
  { d: "Feb–May 2025", t: "Thinking, Claude Code, Claude 4", b: "Claude 3.7 Sonnet can think before answering; Claude Code brings Claude into the terminal; Claude 4 (Opus and Sonnet) follows in May.", tone: "a" },
  { d: "Late 2025", t: "The 4.5 generation", b: "Sonnet 4.5, Haiku 4.5 and Opus 4.5 push coding and long-running agent work much further.", tone: "g" },
  { d: "2026", t: "The Claude 5 family", b: "Sonnet 5, Opus 5 and Fable 5, and now Claude Opus 5.5 and Claude Fable 5.1 — with 1-million-token context windows as standard.", tone: "g" },
];

export function ClaudeTimeline() {
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

// ── Model lineup ─────────────────────────────────────────────────────────────

function RatingBar({ v, color }: { v: number; color: string }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="w-3.5 h-2 rounded-sm" style={{ background: i < v ? color : "var(--paper-sunk)" }} />
      ))}
    </span>
  );
}

export function ModelLineup() {
  const models: { n: string; id: string; tag: string; speed: number; brains: number; price: string; tone: Tone; best: string }[] = [
    { n: "Haiku 4.5", id: "claude-haiku-4-5", tag: "Fastest", speed: 5, brains: 3, price: "$1 / $5", tone: "g", best: "High-volume, quick jobs: sorting, tagging, short replies" },
    { n: "Sonnet 5", id: "claude-sonnet-5", tag: "Speed + smarts", speed: 4, brains: 4, price: "$2 / $10", tone: "c", best: "Everyday work at scale, chat apps, most coding" },
    { n: "Opus 5.5", id: "claude-opus-5-5", tag: "Recommended start", speed: 3, brains: 5, price: "$4 / $20", tone: "v", best: "Long agentic coding and knowledge work" },
    { n: "Fable 5.1", id: "claude-fable-5-1", tag: "Most capable", speed: 2, brains: 5, price: "$10 / $50", tone: "r", best: "The hardest reasoning and long-horizon agent tasks" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {models.map((m) => (
        <div key={m.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[m.tone].fg }}>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[16px] font-bold text-[var(--text-primary)]">Claude {m.n}</p>
            <span className="mono text-[10px] uppercase tracking-[0.1em] font-semibold px-2 py-0.5 rounded-full" style={{ color: T[m.tone].fg, background: T[m.tone].soft }}>{m.tag}</span>
          </div>
          <p className="mono text-[11.5px] text-[var(--text-tertiary)] mt-0.5">{m.id}</p>
          <div className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1.5 items-center text-[12px] text-[var(--text-secondary)]">
            <span>Speed</span> <RatingBar v={m.speed} color={T[m.tone].fg} />
            <span>Intelligence</span> <RatingBar v={m.brains} color={T[m.tone].fg} />
            <span>API price</span> <span className="mono text-[var(--text-primary)]">{m.price} <span className="text-[var(--text-tertiary)]">per M tokens in / out</span></span>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-snug text-[var(--text-primary)]">{m.best}</p>
        </div>
      ))}
    </div>
  );
}

// ── claude.ai interface ──────────────────────────────────────────────────────

export function ClaudeAiTour() {
  const legend = [
    "New chat — one topic per chat keeps answers sharp.",
    "Projects — folders with their own files and instructions.",
    "Chats and Artifacts — your history, and everything Claude has built for you.",
    "Model selector — pick a model; thinking effort can be adjusted too.",
    "The message box — type, paste, or drop in files and images.",
    "＋ menu — upload files, add connectors (Drive, Gmail, Calendar…), use styles.",
    "Tools — web search and Research for multi-source, cited reports.",
  ];
  return (
    <div>
      <WindowFrame title="claude.ai — illustration">
        <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] min-h-[300px] text-[12.5px]">
          <div className="border-r border-[var(--border)] bg-[var(--paper-tint)] p-2.5 space-y-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 font-medium text-[var(--text-primary)]">
              <Pin n={1} /> <span className="truncate">＋ New chat</span>
            </div>
            <p className="flex items-center gap-1.5 pt-1 text-[var(--text-secondary)]"><Pin n={2} /> Projects</p>
            <p className="flex items-center gap-1.5 text-[var(--text-secondary)]"><Pin n={3} /> Artifacts</p>
            <p className="pt-2 text-[var(--text-tertiary)]">Recents</p>
            {["Budget for Diwali trip", "Summarise board deck", "Python: clean CSV", "Essay feedback"].map((x) => (
              <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex-1 grid place-items-center p-4">
              <div className="text-center">
                <p className="text-[26px]" aria-hidden="true">✳️</p>
                <p className="display-sm text-[18px] sm:text-[22px] text-[var(--text-primary)]">Good evening, Priya</p>
              </div>
            </div>
            <div className="m-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-2.5">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                <Pin n={5} /> <span className="flex-1">How can I help you today?</span>
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]"><Pin n={6} /> ＋</span>
                <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--text-secondary)]"><Pin n={7} /> 🔎 Research</span>
                <span className="ml-auto flex items-center gap-1 rounded-lg bg-[var(--paper-sunk)] px-2 py-0.5 text-[var(--text-primary)]"><Pin n={4} /> Opus 5.5 ▾</span>
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

// ── Artifacts ────────────────────────────────────────────────────────────────

export function ArtifactMock() {
  const rows: [string, number][] = [["Rent", 42], ["Food", 24], ["Travel", 12], ["Savings", 15], ["Fun", 7]];
  return (
    <WindowFrame title="claude.ai — chat with an Artifact — illustration">
      <div className="grid sm:grid-cols-[1fr_1.1fr] text-[13px]">
        <div className="p-4 space-y-3 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
          <div className="flex justify-end">
            <p className="max-w-[90%] rounded-2xl rounded-br-md bg-[var(--paper-sunk)] px-3.5 py-2 text-[var(--text-primary)]">
              Make me an interactive monthly budget planner. My take-home is ₹60,000.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 text-[16px]" aria-hidden="true">✳️</span>
            <div className="text-[var(--text-primary)] space-y-2">
              <p>Here’s a planner with sliders for each category. It keeps the total at 100% and shows what’s left.</p>
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 flex items-center gap-2 bg-[var(--paper-tint)]">
                <span aria-hidden="true">🧩</span>
                <span className="font-medium">Budget planner</span>
                <span className="ml-auto text-[11px] text-[var(--text-tertiary)]">Interactive artifact</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[var(--paper-tint)]">
          <p className="font-semibold text-[var(--text-primary)] mb-3">Monthly budget · ₹60,000</p>
          <ul className="space-y-2">
            {rows.map(([k, v]) => (
              <li key={k} className="grid grid-cols-[4rem_1fr_4.5rem] items-center gap-2">
                <span className="text-[var(--text-secondary)]">{k}</span>
                <span className="h-2.5 rounded-full bg-[var(--paper-sunk)] overflow-hidden">
                  <span className="block h-full rounded-full" style={{ width: `${v * 2}%`, background: "linear-gradient(90deg, var(--grad-a), var(--grad-b))" }} />
                </span>
                <span className="mono text-right text-[12px] text-[var(--text-primary)]">₹{(v * 600).toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <span className="rounded-lg border border-[var(--border-strong)] px-2.5 py-1 text-[12px] text-[var(--text-secondary)]">Publish</span>
            <span className="rounded-lg border border-[var(--border-strong)] px-2.5 py-1 text-[12px] text-[var(--text-secondary)]">Copy</span>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────

export function ProjectAnatomy() {
  return (
    <svg viewBox="0 0 640 250" role="img" aria-labelledby="pa-t">
      <title id="pa-t">A Project bundles three things: knowledge files such as syllabus PDFs and notes, custom instructions, and many chats. Every chat in the project can use the files and follows the instructions.</title>
      <Arrow id="pa-ar" />
      <rect x="170" y="20" width="300" height="210" rx="18" className="sunk" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="320" y="44" textAnchor="middle" fontSize="14" className="t" fontWeight="700">📁 Project: “CA Foundation prep”</text>
      <rect x="190" y="60" width="125" height="80" rx="12" className="c-s" strokeWidth="1.5" />
      <text x="252" y="84" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">Knowledge</text>
      <text x="252" y="103" textAnchor="middle" fontSize="10.5" className="t2">syllabus.pdf</text>
      <text x="252" y="118" textAnchor="middle" fontSize="10.5" className="t2">notes-ch1…ch6</text>
      <text x="252" y="133" textAnchor="middle" fontSize="10.5" className="t2">past papers</text>
      <rect x="325" y="60" width="125" height="80" rx="12" className="a-s" strokeWidth="1.5" />
      <text x="387" y="84" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">Instructions</text>
      <text x="387" y="103" textAnchor="middle" fontSize="10.5" className="t2">“Quiz me first.</text>
      <text x="387" y="118" textAnchor="middle" fontSize="10.5" className="t2">Cite the chapter.</text>
      <text x="387" y="133" textAnchor="middle" fontSize="10.5" className="t2">Simple English.”</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={190 + i * 88} y="158" width="80" height="54" rx="10" className="v-s" strokeWidth="1.3" />
          <text x={230 + i * 88} y="182" textAnchor="middle" fontSize="16">💬</text>
          <text x={230 + i * 88} y="202" textAnchor="middle" fontSize="10.5" className="t2">{["Ch.1 quiz", "Doubt: GST", "Mock test"][i]}</text>
        </g>
      ))}
      <text x="20" y="110" fontSize="12" className="t2">You add</text>
      <text x="20" y="126" fontSize="12" className="t2">files and</text>
      <text x="20" y="142" fontSize="12" className="t2">instructions once</text>
      <line x1="120" y1="120" x2="184" y2="100" className="ln" strokeWidth="1.8" markerEnd="url(#pa-ar)" />
      <text x="490" y="170" fontSize="12" className="t2">every chat inside</text>
      <text x="490" y="186" fontSize="12" className="t2">can use them —</text>
      <text x="490" y="202" fontSize="12" className="t2">no re-uploading</text>
    </svg>
  );
}

// ── Phone ────────────────────────────────────────────────────────────────────

export function PhoneMock() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="w-[210px] rounded-[30px] border-[6px] border-[var(--text-primary)] bg-[var(--card)] overflow-hidden shadow-sm">
        <div className="h-5 grid place-items-center"><span className="w-16 h-1.5 rounded-full bg-[var(--text-primary)]" aria-hidden="true" /></div>
        <div className="px-3 pb-3 text-[11.5px] space-y-2.5">
          <p className="text-center font-semibold text-[var(--text-primary)]">Claude</p>
          <div className="flex justify-end"><p className="rounded-xl rounded-br-sm bg-[var(--paper-sunk)] px-2.5 py-1.5 text-[var(--text-primary)]">📷 What plant is this and why are the leaves yellow?</p></div>
          <div className="rounded-lg h-16 bg-[linear-gradient(135deg,#65a30d,#166534)] grid place-items-center text-[22px]" aria-hidden="true">🪴</div>
          <p className="text-[var(--text-primary)]">Looks like a money plant (pothos). Yellow lower leaves usually mean overwatering — let the top 3 cm of soil dry out…</p>
          <div className="rounded-full border border-[var(--border-strong)] px-2.5 py-1.5 flex items-center gap-1.5 text-[var(--text-tertiary)]">
            <span className="flex-1">Reply…</span><span aria-hidden="true">📎</span><span aria-hidden="true">🎙️</span>
          </div>
        </div>
      </div>
      <div className="w-[210px] rounded-[30px] border-[6px] border-[var(--text-primary)] overflow-hidden shadow-sm" style={{ background: "linear-gradient(180deg, var(--fig-amber-soft), var(--fig-card))" }}>
        <div className="h-5 grid place-items-center"><span className="w-16 h-1.5 rounded-full bg-[var(--text-primary)]" aria-hidden="true" /></div>
        <div className="px-3 pb-4 pt-6 text-center text-[11.5px] space-y-4">
          <p className="font-semibold text-[var(--text-primary)]">Voice mode</p>
          <div className="mx-auto w-24 h-24 rounded-full grid place-items-center" style={{ background: "radial-gradient(circle, var(--fig-amber) 0%, transparent 70%)" }}>
            <span className="text-[34px]" aria-hidden="true">✳️</span>
          </div>
          <p className="text-[var(--text-secondary)]">“…so for your interview, open with the project you’re proudest of. Want to practise the answer now?”</p>
          <div className="flex justify-center gap-4 text-[18px]" aria-hidden="true"><span>🎙️</span><span>⏸️</span><span>✖️</span></div>
        </div>
      </div>
    </div>
  );
}

// ── Claude in Chrome ─────────────────────────────────────────────────────────

export function ChromeMock() {
  return (
    <WindowFrame title="Chrome — train timetable site + Claude side panel — illustration">
      <div className="grid grid-cols-[1fr_11rem] sm:grid-cols-[1fr_14rem] min-h-[230px] text-[12px]">
        <div className="p-4 space-y-2">
          <p className="font-semibold text-[var(--text-primary)]">🚆 Search trains</p>
          {["Guwahati → New Jalpaiguri", "Fri 17 Oct", "2 adults · 3A"].map((x, i) => (
            <div key={x} className="rounded-md border px-2.5 py-1.5 text-[var(--text-secondary)]" style={{ borderColor: i === 1 ? "var(--fig-amber)" : "var(--border)", background: i === 1 ? "var(--fig-amber-soft)" : "var(--fig-card)" }}>{x}</div>
          ))}
          <div className="rounded-md bg-[var(--paper-sunk)] h-16" aria-hidden="true" />
        </div>
        <div className="border-l border-[var(--border)] bg-[var(--paper-tint)] p-3 space-y-2">
          <p className="font-semibold text-[var(--text-primary)]">✳️ Claude</p>
          <p className="rounded-lg bg-[var(--paper-sunk)] px-2 py-1.5 text-[var(--text-primary)]">Find the earliest train Friday with 3A seats for two.</p>
          <p className="text-[var(--text-secondary)]">✓ Filled the search form<br />✓ Sorted by departure<br />→ 05:40 Kamrup Exp, 3A available</p>
          <div className="rounded-lg border-2 border-[var(--fig-amber)] bg-[var(--card)] px-2 py-1.5 text-[var(--text-primary)]">
            <p className="font-semibold">Book it?</p>
            <p className="text-[var(--text-tertiary)]">I’ll stop before payment.</p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

// ── Claude Code terminal session ─────────────────────────────────────────────

export function TerminalMock() {
  const dim = "text-[#8b8ba0]";
  return (
    <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border-strong)] shadow-sm" style={{ background: "#0f0f16" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[#8b8ba0]">~/projects/shop — claude — illustration</span>
      </div>
      <pre className="mono text-[12px] leading-[1.7] p-4 overflow-x-auto text-[#e8e8f0] whitespace-pre">
<span className="text-[#5fd68b]">$</span> claude{"\n"}
<span className="text-[#f5b454]">✳ Welcome to Claude Code</span>{"\n"}
{"\n"}
<span className="text-[#b69cfb]">&gt;</span> The checkout page shows the wrong total when a coupon is applied. Find and fix it, and add a test.{"\n"}
{"\n"}
<span className={dim}>● Read</span> src/cart/total.ts{"\n"}
<span className={dim}>● Search</span> &quot;applyCoupon&quot; — 3 matches{"\n"}
<span className={dim}>● Read</span> src/cart/coupon.ts{"\n"}
{"\n"}
The discount is applied <span className="text-[#f5b454]">before</span> GST in total.ts but <span className="text-[#f5b454]">after</span> it in coupon.ts,{"\n"}
so it is counted twice. I’ll apply it once, before tax.{"\n"}
{"\n"}
<span className={dim}>● Edit</span> src/cart/total.ts{"\n"}
<span className="text-[#fb7196]">-   const net = subtotal - discount(subtotal) - discount(withTax);</span>{"\n"}
<span className="text-[#5fd68b]">+   const net = subtotal - discount(subtotal);</span>{"\n"}
{"\n"}
<span className="text-[#38d9f0]">? Run npm test? </span><span className="text-[#e8e8f0]">› Yes   Yes, and don’t ask again   No</span>{"\n"}
{"\n"}
<span className={dim}>● Bash</span> npm test — <span className="text-[#5fd68b]">42 passed</span> (1 new: “coupon applied once”){"\n"}
{"\n"}
Fixed. The total now matches the invoice in all 3 coupon cases.
      </pre>
    </div>
  );
}

// ── Agent loop ───────────────────────────────────────────────────────────────

export function CodeLoop() {
  const nodes = [
    { x: 320, y: 46, l: "🎯 Your request", s: "“fix the coupon bug”", cls: "c-s" },
    { x: 530, y: 130, l: "🔍 Gather context", s: "read files, search code", cls: "v-s" },
    { x: 460, y: 250, l: "✏️ Take action", s: "edit files, run commands", cls: "a-s" },
    { x: 180, y: 250, l: "✅ Verify", s: "run tests, check output", cls: "g-s" },
    { x: 110, y: 130, l: "💬 Report", s: "or loop again", cls: "c-s" },
  ];
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="cl-t">
      <title id="cl-t">Claude Code works in a loop: from your request it gathers context by reading and searching files, takes action by editing files and running commands, verifies by running tests, then reports back or loops again. Risky actions pause for your permission.</title>
      <Arrow id="cl-ar" />
      <path d="M395 60 Q 500 70 520 100" className="ln" strokeWidth="1.8" markerEnd="url(#cl-ar)" />
      <path d="M530 160 Q 540 210 530 228" className="ln" strokeWidth="1.8" markerEnd="url(#cl-ar)" />
      <path d="M380 256 L 262 256" className="ln" strokeWidth="1.8" markerEnd="url(#cl-ar)" />
      <path d="M110 228 Q 100 190 108 160" className="ln" strokeWidth="1.8" markerEnd="url(#cl-ar)" />
      <path d="M170 110 Q 250 60 244 60" className="ln" strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#cl-ar)" />
      {nodes.map((n) => (
        <g key={n.l}>
          <rect x={n.x - 84} y={n.y - 27} width="168" height="54" rx="14" className={n.cls} strokeWidth="1.5" />
          <text x={n.x} y={n.y - 3} textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">{n.l}</text>
          <text x={n.x} y={n.y + 15} textAnchor="middle" fontSize="11" className="t2">{n.s}</text>
        </g>
      ))}
      <rect x="250" y="136" width="140" height="56" rx="12" className="r-s" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="320" y="160" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">🔒 Permission</text>
      <text x="320" y="177" textAnchor="middle" fontSize="10.5" className="t2">asks before risky steps</text>
    </svg>
  );
}

// ── Claude Code config files ─────────────────────────────────────────────────

export function CodeConfigTree() {
  const rows: { f: string; what: string; tone: Tone }[] = [
    { f: "CLAUDE.md", what: "Project memory: how to build, test and style this codebase. Read at the start of every session. Create one with /init.", tone: "a" },
    { f: ".claude/settings.json", what: "Permissions (what may run without asking), environment variables, model defaults.", tone: "v" },
    { f: ".claude/skills/", what: "Reusable, packaged know-how Claude loads when relevant — a deploy checklist, a review guide.", tone: "c" },
    { f: ".claude/agents/", what: "Subagents: specialist helpers with their own instructions and tools, e.g. a test-writer.", tone: "g" },
    { f: "hooks (in settings)", what: "Commands that run automatically at set moments — format after every edit, block a dangerous command.", tone: "r" },
    { f: ".mcp.json", what: "MCP servers the project uses: a database, GitHub, a browser, your issue tracker.", tone: "c" },
  ];
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border)] mono text-[12px] text-[var(--text-tertiary)]">📁 your-project/</div>
      <ul>
        {rows.map((r) => (
          <li key={r.f} className="grid sm:grid-cols-[12rem_1fr] gap-x-4 gap-y-0.5 px-4 py-2.5 border-b border-[var(--border)] last:border-0">
            <span className="mono text-[12.5px] font-semibold" style={{ color: T[r.tone].fg }}>{r.f}</span>
            <span className="text-[13px] leading-snug text-[var(--text-secondary)]">{r.what}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── MCP ──────────────────────────────────────────────────────────────────────

export function McpDiagram() {
  const servers = ["🐙 GitHub", "📁 Google Drive", "🗄️ Postgres DB", "💬 Slack", "🎫 Jira"];
  return (
    <svg viewBox="0 0 640 260" role="img" aria-labelledby="mcp-t">
      <title id="mcp-t">The Model Context Protocol: Claude, in any app that supports MCP, talks through one standard protocol to many MCP servers, each of which connects to a tool or data source such as GitHub, Google Drive, a database, Slack or Jira.</title>
      <Arrow id="mcp-ar" />
      <rect x="20" y="90" width="150" height="80" rx="14" className="a-s" strokeWidth="1.5" />
      <text x="95" y="122" textAnchor="middle" fontSize="15" className="t" fontWeight="700">✳️ Claude</text>
      <text x="95" y="142" textAnchor="middle" fontSize="11" className="t2">app, desktop, Code,</text>
      <text x="95" y="156" textAnchor="middle" fontSize="11" className="t2">or your own agent</text>
      <rect x="225" y="100" width="130" height="60" rx="30" className="v-s" strokeWidth="1.5" />
      <text x="290" y="126" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">MCP</text>
      <text x="290" y="143" textAnchor="middle" fontSize="10.5" className="t2">one standard plug</text>
      <line x1="172" y1="130" x2="221" y2="130" className="ln" strokeWidth="2" markerEnd="url(#mcp-ar)" />
      {servers.map((s, i) => {
        const y = 22 + i * 46;
        return (
          <g key={s}>
            <path d={`M357 130 C 400 130, 400 ${y + 18}, 436 ${y + 18}`} className="ln" strokeWidth="1.4" markerEnd="url(#mcp-ar)" />
            <rect x="440" y={y} width="180" height="36" rx="10" className="box" />
            <text x="456" y={y + 23} fontSize="12.5" className="t" fontWeight="600">{s}</text>
          </g>
        );
      })}
      <text x="290" y="200" textAnchor="middle" fontSize="11.5" className="t3">write a server once,</text>
      <text x="290" y="216" textAnchor="middle" fontSize="11.5" className="t3">use it from any MCP app</text>
    </svg>
  );
}

// ── Constitutional AI ────────────────────────────────────────────────────────

export function ConstitutionFlow({ children }: { children?: ReactNode }) {
  const steps: { t: string; b: string; tone: Tone }[] = [
    { t: "1 · Draft", b: "The model answers a tricky request.", tone: "c" },
    { t: "2 · Critique", b: "It checks its answer against written principles: is it honest, helpful, harmless?", tone: "v" },
    { t: "3 · Revise", b: "It rewrites the answer to fix what the critique found.", tone: "a" },
    { t: "4 · Learn", b: "Training favours the improved answers, with AI feedback guided by the same principles.", tone: "g" },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-4 gap-2">
        {steps.map((s) => (
          <li key={s.t} className="rounded-[var(--radius)] border p-3.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="text-[14px] font-bold" style={{ color: T[s.tone].fg }}>{s.t}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}

// ── Which door? ──────────────────────────────────────────────────────────────

export function SurfaceChooser() {
  const rows: [string, string, string][] = [
    ["Ask, write, learn, brainstorm", "Web or desktop app", "Free to start"],
    ["On the go, photos, talking out loud", "Mobile app (voice mode)", "Free to start"],
    ["Help on the web page you’re on; fill forms", "Claude in Chrome", "Paid plans"],
    ["Work across your Drive, Gmail, calendar", "Connectors in the apps", "Varies by connector"],
    ["Write, fix and ship software", "Claude Code (terminal, IDE, desktop, web)", "Pro and above"],
    ["Put Claude inside your own product", "Claude API", "Pay per token"],
    ["Company cloud and compliance", "Bedrock, Google Cloud, Microsoft Foundry", "Via your cloud account"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13.5px]">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3 font-semibold text-[var(--text-primary)]">If you want to…</th>
            <th className="py-2 px-3 font-semibold" style={{ color: "var(--fig-amber)" }}>Use</th>
            <th className="py-2 pl-3 font-semibold text-[var(--text-tertiary)]">Access</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 text-[var(--text-secondary)]">{a}</td>
              <td className="py-2 px-3 font-medium text-[var(--text-primary)]">{b}</td>
              <td className="py-2 pl-3 text-[var(--text-tertiary)] whitespace-nowrap">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── XML-tag prompt ───────────────────────────────────────────────────────────

export function XmlPrompt() {
  const lines: { t: string; tone?: Tone }[] = [
    { t: "You are reviewing a rental agreement for a first-time tenant in Bengaluru." },
    { t: "" },
    { t: "<agreement>", tone: "v" },
    { t: "  …paste the full agreement here…" },
    { t: "</agreement>", tone: "v" },
    { t: "" },
    { t: "<my_situation>", tone: "a" },
    { t: "  Moving in 1 Nov. Plan to stay 2 years. Have a cat." },
    { t: "</my_situation>", tone: "a" },
    { t: "" },
    { t: "<task>", tone: "g" },
    { t: "  List clauses that are unusual or unfavourable to me," },
    { t: "  quoting each one. Then give 3 questions to ask the owner." },
    { t: "</task>", tone: "g" },
  ];
  return (
    <WindowFrame title="A structured prompt — illustration">
      <pre className="mono text-[12.5px] leading-[1.7] p-4 overflow-x-auto whitespace-pre text-[var(--text-primary)]">
        {lines.map((l, i) => (
          <span key={i} style={l.tone ? { color: T[l.tone].fg, fontWeight: 600 } : undefined}>
            {l.t}
            {"\n"}
          </span>
        ))}
      </pre>
    </WindowFrame>
  );
}

// ── Prompt caching ───────────────────────────────────────────────────────────

export function CachingDiagram() {
  return (
    <div className="space-y-3">
      {[
        { n: "1st request", cached: false },
        { n: "2nd request", cached: true },
        { n: "3rd request", cached: true },
      ].map((r) => (
        <div key={r.n} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
          <span className="text-[12.5px] text-[var(--text-secondary)]">{r.n}</span>
          <div className="flex h-9 rounded-lg overflow-hidden border border-[var(--fig-line)] text-[11.5px]">
            <div className="grid place-items-center px-2" style={{ width: "72%", background: r.cached ? "var(--fig-green-soft)" : "var(--fig-amber-soft)", color: "var(--text-primary)" }}>
              {r.cached ? "✓ read from cache — fast, a fraction of the price" : "system prompt + 200-page handbook (written to cache)"}
            </div>
            <div className="grid place-items-center px-2 border-l-2 border-[var(--fig-violet)]" style={{ width: "28%", background: "var(--fig-violet-soft)", color: "var(--text-primary)" }}>
              new question
            </div>
          </div>
        </div>
      ))}
      <p className="text-[12px] text-[var(--text-tertiary)]">The cache matches from the start: keep what never changes first, and what changes last.</p>
    </div>
  );
}

// ── 30-day plan ──────────────────────────────────────────────────────────────

export function LearningPath() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Chat", tone: "g", items: ["Use claude.ai daily for real tasks", "Install the mobile app; try voice", "Set your profile preferences"] },
    { w: "Week 2 · Organise", tone: "c", items: ["Create a Project with your files", "Ask for an Artifact: a tracker or chart", "Run one Research report"] },
    { w: "Week 3 · Connect", tone: "a", items: ["Connect Drive, Gmail or Calendar", "Try Claude in Chrome on a chore", "Write prompts with XML tags"] },
    { w: "Week 4 · Build", tone: "r", items: ["Install Claude Code; run /init", "Fix one real bug with it", "Make your first API call"] },
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
