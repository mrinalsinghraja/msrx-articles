import type { ReactNode } from "react";

/**
 * Figures for "Side by side".
 *
 * Facts come from the ten references listed for this article in
 * lib/references.ts, read on 30 September 2026. Anything marked
 * “illustration” or “imagined” is ours. Photographs are from Wikimedia
 * Commons under the licences credited beside each one; the screenshots are
 * real captures of the sources, taken on 30 September 2026.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/ai-agents-side-by-side";

// ── Pictures ─────────────────────────────────────────────────────────────────

export function Pic({ file, alt, width, height, max }: { file: string; alt: string; width: number; height: number; max?: string }) {
  return (
    <div className={`mx-auto ${max ?? "max-w-full"}`}>
      {/* The site CSP allows only same-origin images, so pictures ship from public/. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/${file}`}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)]"
      />
    </div>
  );
}

/** Two or three pictures side by side, each with its own label. */
export function PicRow({ items }: { items: { file: string; alt: string; width: number; height: number; label: string }[] }) {
  return (
    <div className={`grid gap-3 items-start ${items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {items.map((i) => (
        <div key={i.file} className="mx-auto w-full max-w-[320px] sm:max-w-none">
          <Pic file={i.file} alt={i.alt} width={i.width} height={i.height} />
          <p className="mt-1.5 text-center text-[12px] font-semibold text-[var(--text-primary)]">{i.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── 1. A morning with an agent (illustration) ────────────────────────────────

const MORNING: { t: string; you: string; agent: string }[] = [
  { t: "07:10", you: "Wake up. Read one message.", agent: "Overnight: sorted 63 emails into three piles, drafted 4 replies, found a clash between two meetings." },
  { t: "08:30", you: "Approve two drafts. Edit one line. Skip the third.", agent: "Sends the approved two. Holds the third. Rebooks the clashing meeting once you say yes." },
  { t: "10:00", you: "Deep work: the report only you can write.", agent: "Pulls last quarter’s numbers into a table, marks the two figures that look odd, and waits." },
  { t: "13:00", you: "Lunch. Actually away from the screen.", agent: "Compares three insurance renewals, lists the differences in plain words, changes nothing." },
  { t: "16:45", you: "Read the summary. Ask two questions. Decide.", agent: "Prepares tomorrow’s briefing, with sources for every number." },
];

export function MorningWithAgent() {
  return (
    <div>
      <div className="hidden sm:grid grid-cols-[3.4rem_1fr_1.35fr] gap-3 pb-2 text-[11px] mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
        <span />
        <span>You</span>
        <span>Your agent</span>
      </div>
      <ol className="space-y-2.5">
        {MORNING.map((m, i) => (
          <li key={m.t} className="grid sm:grid-cols-[3.4rem_1fr_1.35fr] gap-x-3 gap-y-1.5 items-stretch">
            <span className="mono text-[13px] font-semibold pt-2" style={{ color: T.v.fg }}>{m.t}</span>
            <p className="rounded-[var(--radius)] border-2 p-3 text-[13px] leading-snug text-[var(--text-primary)]" style={{ borderColor: T.g.fg, background: T.g.soft }}>
              <span className="sm:hidden mono text-[10.5px] uppercase tracking-[0.08em] block" style={{ color: T.g.fg }}>You</span>
              {m.you}
            </p>
            <p className="rounded-[var(--radius)] border-2 p-3 text-[13px] leading-snug text-[var(--text-primary)]" style={{ borderColor: i % 2 ? T.c.fg : T.v.fg, background: i % 2 ? T.c.soft : T.v.soft }}>
              <span className="sm:hidden mono text-[10.5px] uppercase tracking-[0.08em] block" style={{ color: i % 2 ? T.c.fg : T.v.fg }}>Your agent</span>
              {m.agent}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Illustration: an imagined day, not a real user or a specific product. The point is the split: the agent prepares and proposes; you decide.</p>
    </div>
  );
}

// ── 2. Two thousand years of helpers (timeline) ──────────────────────────────

type Mile = { when: string; what: string; tone: Tone; tag: string };

const MILES: Mile[] = [
  { when: "400–350 BCE", what: "Archytas of Tarentum is credited with a wooden pigeon driven by steam or compressed air", tone: "a", tag: "Automaton" },
  { when: "3rd century BCE", what: "In China, a mechanical orchestra is built for the Han emperor", tone: "a", tag: "Automaton" },
  { when: "1st century CE", what: "Heron of Alexandria writes about devices driven by water, falling weights and steam", tone: "a", tag: "Automaton" },
  { when: "13th century", what: "Al-Jazarī builds water-driven peacocks for princes in Mesopotamia", tone: "a", tag: "Automaton" },
  { when: "c. 1772", what: "Jaquet-Droz’s child android writes with a quill pen", tone: "a", tag: "Automaton" },
  { when: "1842", what: "Lady Lovelace: the Analytical Engine “can do whatever we know how to order it to perform”", tone: "v", tag: "Idea" },
  { when: "1950", what: "Turing asks “Can machines think?” and imagines teaching a “child machine”", tone: "v", tag: "Idea" },
  { when: "1966–1972", what: "Shakey, at SRI: the first mobile robot that could perceive and reason about its surroundings", tone: "c", tag: "Robot" },
  { when: "25 Nov 2024", what: "Anthropic introduces the Model Context Protocol, a standard plug for AI and tools", tone: "g", tag: "Plumbing" },
  { when: "9 Apr 2025", what: "Google announces Agent2Agent (A2A), so agents can talk to each other", tone: "g", tag: "Plumbing" },
  { when: "9 Dec 2025", what: "The Linux Foundation forms the Agentic AI Foundation around MCP, goose and AGENTS.md", tone: "g", tag: "Plumbing" },
  { when: "5 May 2026", what: "Microsoft’s Work Trend Index: how 20,000 AI users work with agents", tone: "r", tag: "Today" },
  { when: "9 Sep 2026", what: "Gartner: “workforce amplification was the opportunity”", tone: "r", tag: "Today" },
];

export function HelperTimeline() {
  return (
    <ol className="relative space-y-2 pl-5 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-[2px] before:bg-[var(--fig-line)]">
      {MILES.map((m) => (
        <li key={m.when + m.what} className="relative grid sm:grid-cols-[8rem_1fr_5rem] gap-x-3 gap-y-0.5 items-baseline">
          <span aria-hidden="true" className="absolute -left-5 top-[5px] h-3.5 w-3.5 rounded-full border-2" style={{ borderColor: T[m.tone].fg, background: T[m.tone].soft }} />
          <span className="mono text-[12px] font-semibold" style={{ color: T[m.tone].fg }}>{m.when}</span>
          <span className="text-[13px] leading-snug text-[var(--text-primary)]">{m.what}</span>
          <span className="text-[10.5px] mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] sm:text-right">{m.tag}</span>
        </li>
      ))}
    </ol>
  );
}

// ── 3. From doing a trick to doing a job ─────────────────────────────────────

export function ThreeEras() {
  const eras: { tone: Tone; t: string; b: string; ex: string }[] = [
    { tone: "a", t: "Made to perform", b: "Wind it up and it repeats one act. Wonderful to watch; useless for anything new.", ex: "Peacock fountains, the writing boy" },
    { tone: "v", t: "Made to reason", b: "Machines that plan a route, weigh options and change course when the world changes.", ex: "Shakey, 1966–72" },
    { tone: "g", t: "Made to work with us", b: "Systems that take a goal, use real tools and hand back finished work for a person to approve.", ex: "The agents of 2026" },
  ];
  return (
    <ol className="grid md:grid-cols-3 gap-2.5">
      {eras.map((e, i) => (
        <li key={e.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[e.tone].fg, background: T[e.tone].soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T[e.tone].fg }}>ERA {i + 1}</p>
          <p className="mt-0.5 text-[15px] font-bold text-[var(--text-primary)]">{e.t}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{e.b}</p>
          <p className="mt-2 text-[11.5px] font-semibold" style={{ color: T[e.tone].fg }}>{e.ex}</p>
        </li>
      ))}
    </ol>
  );
}

// ── 4. Assistant or agent? ───────────────────────────────────────────────────

export function AssistantVsAgent() {
  const rows: [string, string, string][] = [
    ["Who starts the work?", "You ask; it answers.", "You set a goal; it plans the steps."],
    ["What does it touch?", "Mostly words on a screen.", "Real tools: calendar, files, databases, other apps."],
    ["When you walk away…", "It waits for your next message.", "It keeps going until the job is done or it needs you."],
    ["What comes back?", "A reply to read.", "Finished work to check, with a trail of what it did."],
    ["Who is in charge?", "You, every turn.", "You, at the gates you choose."],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-y-1.5 text-[13px]">
        <thead>
          <tr className="text-left text-[11px] mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            <th className="pr-3 font-medium" />
            <th className="px-3 font-semibold" style={{ color: T.a.fg }}>AI assistant</th>
            <th className="px-3 font-semibold" style={{ color: T.g.fg }}>AI agent</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([q, a, b]) => (
            <tr key={q} className="align-top">
              <td className="pr-3 py-2 font-semibold text-[var(--text-primary)] w-[26%]">{q}</td>
              <td className="px-3 py-2 rounded-l-[var(--radius)] leading-snug text-[var(--text-primary)]" style={{ background: T.a.soft }}>{a}</td>
              <td className="px-3 py-2 rounded-r-[var(--radius)] leading-snug text-[var(--text-primary)]" style={{ background: T.g.soft }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[11.5px] text-[var(--text-tertiary)]">The split follows Gartner’s definitions (assistants “depend on human input and do not operate independently”); the rows and wording are our own summary.</p>
    </div>
  );
}

// ── 5. The agent loop ────────────────────────────────────────────────────────

export function AgentLoop() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <svg viewBox="0 0 760 250" role="img" aria-label="A loop: a person gives a goal, the agent plans, uses tools, observes the result, and returns to the person at approval gates.">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" className="arrowhead" />
            </marker>
          </defs>
          {/* boxes */}
          {[
            { x: 10, cls: "g-s", t: "1 · You set a goal", s: "“Book the team offsite”" },
            { x: 160, cls: "v-s", t: "2 · Agent plans", s: "Breaks it into steps" },
            { x: 310, cls: "c-s", t: "3 · Agent acts", s: "Calls tools and other agents" },
            { x: 460, cls: "a-s", t: "4 · Agent checks", s: "Did it work? Adjust." },
            { x: 610, cls: "r-s", t: "5 · You approve", s: "Before send, spend, share" },
          ].map((b) => (
            <g key={b.x}>
              <rect x={b.x} y="60" width="140" height="84" rx="12" className={b.cls} strokeWidth="2" />
              <text x={b.x + 70} y="93" textAnchor="middle" fontSize="13.5" fontWeight="700" className="t">{b.t}</text>
              <text x={b.x + 70} y="115" textAnchor="middle" fontSize="11.5" className="t2">{b.s}</text>
            </g>
          ))}
          {[150, 300, 450, 600].map((x) => (
            <line key={x} x1={x} y1="102" x2={x + 10} y2="102" className="ln" strokeWidth="2" markerEnd="url(#ah)" />
          ))}
          {/* loop back from 4 to 2 */}
          <path d="M530 144 C530 205, 230 205, 230 148" className="a-ln" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#ah)" />
          <text x="380" y="222" textAnchor="middle" fontSize="12" className="t2">loops until the goal is met or it needs you</text>
          {/* human gate return */}
          <path d="M680 60 C680 20, 80 20, 80 56" className="g-ln" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#ah)" />
          <text x="380" y="14" textAnchor="middle" fontSize="12" className="t2">you refine the goal, or say yes</text>
        </svg>
      </div>
    </div>
  );
}

// ── 6. Before and after a common plug ────────────────────────────────────────

function Wiring({ hub }: { hub: boolean }) {
  const apps = ["Chat app", "Code editor", "Office suite", "Browser"];
  const tools = ["Files", "Calendar", "Database", "Email", "Tickets"];
  const ay = (i: number) => 40 + i * 44;
  const ty = (i: number) => 30 + i * 36;
  return (
    <svg viewBox="0 0 320 230" role="img" aria-label={hub ? "Four apps and five tools all connected through one shared plug: nine connections." : "Four apps each wired to five tools separately: twenty connections."}>
      {!hub &&
        apps.flatMap((_, i) => tools.map((__, j) => <line key={`${i}-${j}`} x1="92" y1={ay(i)} x2="228" y2={ty(j)} className="ln" strokeWidth="1" />))}
      {hub && (
        <>
          <rect x="140" y="20" width="40" height="190" rx="12" className="g-s" strokeWidth="2" />
          <text x="160" y="118" textAnchor="middle" fontSize="12" fontWeight="700" className="t" transform="rotate(-90 160 118)">ONE STANDARD</text>
          {apps.map((_, i) => <line key={i} x1="92" y1={ay(i)} x2="140" y2={ay(i) + 6} className="g-ln" strokeWidth="1.5" />)}
          {tools.map((_, j) => <line key={j} x1="180" y1={ty(j) + 6} x2="228" y2={ty(j)} className="g-ln" strokeWidth="1.5" />)}
        </>
      )}
      {apps.map((a, i) => (
        <g key={a}>
          <rect x="8" y={ay(i) - 14} width="84" height="28" rx="8" className="v-s" strokeWidth="1.5" />
          <text x="50" y={ay(i) + 4} textAnchor="middle" fontSize="11" className="t">{a}</text>
        </g>
      ))}
      {tools.map((a, j) => (
        <g key={a}>
          <rect x="228" y={ty(j) - 14} width="84" height="28" rx="8" className="c-s" strokeWidth="1.5" />
          <text x="270" y={ty(j) + 4} textAnchor="middle" fontSize="11" className="t">{a}</text>
        </g>
      ))}
    </svg>
  );
}

export function PlugFigure() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <p className="text-[13px] font-bold text-[var(--text-primary)] mb-1">Before: every pair needs its own cable</p>
        <Wiring hub={false} />
        <p className="text-[12.5px] mt-1" style={{ color: T.r.fg }}><strong>4 × 5 = 20</strong> custom connections</p>
      </div>
      <div>
        <p className="text-[13px] font-bold text-[var(--text-primary)] mb-1">After: one standard plug</p>
        <Wiring hub />
        <p className="text-[12.5px] mt-1" style={{ color: T.g.fg }}><strong>4 + 5 = 9</strong> connections</p>
      </div>
      <p className="sm:col-span-2 text-[11.5px] text-[var(--text-tertiary)]">Illustration with made-up apps and tools to show the arithmetic. The problem it draws is the one Anthropic describes: every new data source needing its own custom implementation.</p>
    </div>
  );
}

// ── 7. A manager agent and its specialists (A2A hiring example) ──────────────

export function ManagerAgent() {
  const subs: { t: string; s: string; tone: Tone }[] = [
    { t: "Sourcing agent", s: "finds candidates that match the criteria", tone: "c" },
    { t: "Scheduling agent", s: "lines up interviews", tone: "a" },
    { t: "Background-check agent", s: "handles the checks, with consent", tone: "r" },
  ];
  return (
    <div>
      <div className="mx-auto max-w-sm rounded-[var(--radius)] border-2 p-3 text-center" style={{ borderColor: T.g.fg, background: T.g.soft }}>
        <p className="text-[12.5px] font-bold text-[var(--text-primary)]">Hiring manager</p>
        <p className="text-[12px] text-[var(--text-secondary)]">“Find candidates for this role.”</p>
      </div>
      <div className="mx-auto h-5 w-[2px] bg-[var(--fig-line)]" aria-hidden="true" />
      <div className="mx-auto max-w-sm rounded-[var(--radius)] border-2 p-3 text-center" style={{ borderColor: T.v.fg, background: T.v.soft }}>
        <p className="text-[12.5px] font-bold text-[var(--text-primary)]">The manager’s own agent</p>
        <p className="text-[12px] text-[var(--text-secondary)]">Plans, delegates, brings back suggestions</p>
      </div>
      <div className="mx-auto h-5 w-[2px] bg-[var(--fig-line)]" aria-hidden="true" />
      <div className="grid sm:grid-cols-3 gap-2.5">
        {subs.map((s) => (
          <div key={s.t} className="rounded-[var(--radius)] border-2 p-3 text-center" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="text-[12.5px] font-bold text-[var(--text-primary)]">{s.t}</p>
            <p className="text-[12px] text-[var(--text-secondary)]">{s.s}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">The example is Google’s, from its A2A announcement: the agent collaborates with specialised agents to source candidates, then coordinates further agents to schedule interviews and facilitate background checks. The drawing is ours.</p>
    </div>
  );
}

// ── 8. What is on the job today ──────────────────────────────────────────────

export function OnTheJob() {
  const items: { tone: Tone; t: string; b: string; src: string }[] = [
    { tone: "c", t: "Assistants and agents that plug into tools", b: "Claude, Cursor, Microsoft Copilot, Gemini, VS Code and ChatGPT are all named as having adopted MCP, the shared plug for connecting AI to tools and data.", src: "Linux Foundation" },
    { tone: "v", t: "Documentation agents", b: "Novo Nordisk’s NovoScribe drafts regulatory documents from expert-approved text, for people to review.", src: "Anthropic case study" },
    { tone: "r", t: "Security agents", b: "Gartner’s own example of a task-specific agent: one that scans network traffic, logs and behaviour, then starts a response.", src: "Gartner" },
    { tone: "a", t: "Hiring and scheduling agents", b: "Google’s example: a manager’s agent works with sourcing, scheduling and checking agents.", src: "Google" },
    { tone: "g", t: "Everyday work assistants", b: "Microsoft studies how people use Copilot at work, and how the most advanced users delegate multi-step workflows to agents.", src: "Microsoft" },
    { tone: "v", t: "Local, open agents", b: "goose from Block is an open source, local-first agent framework built on MCP.", src: "Linux Foundation" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {items.map((i) => (
        <div key={i.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[i.tone].fg, background: T[i.tone].soft }}>
          <p className="text-[14px] font-bold text-[var(--text-primary)]">{i.t}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{i.b}</p>
          <p className="mt-2 mono text-[10.5px] uppercase tracking-[0.08em]" style={{ color: T[i.tone].fg }}>Source: {i.src}</p>
        </div>
      ))}
    </div>
  );
}

// ── 9. Gartner's staircase (forecasts) ───────────────────────────────────────

export function GartnerStairs() {
  const steps: { y: string; t: string; b: string; tone: Tone }[] = [
    { y: "End of 2025", t: "Assistants everywhere", b: "Most enterprise apps have an embedded assistant. It helps, but “does not operate independently”.", tone: "a" },
    { y: "By end of 2026", t: "Task-specific agents", b: "Up to 40% of enterprise apps include one, up from less than 5%.", tone: "c" },
    { y: "By 2027", t: "Agents that team up", b: "One-third of agentic implementations combine agents with different skills.", tone: "v" },
    { y: "By 2028", t: "Ecosystems across apps", b: "Networks of agents work across applications; a third of user experiences shift to agentic front ends.", tone: "g" },
    { y: "By 2029", t: "A new normal", b: "At least 50% of knowledge workers will develop new skills to work with, govern or create agents on demand.", tone: "r" },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.y} className="rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft, marginLeft: `${i * 4.5}%` }}>
            <p className="mono text-[11px] font-semibold" style={{ color: T[s.tone].fg }}>{s.y.toUpperCase()}</p>
            <p className="text-[14px] font-bold text-[var(--text-primary)]">{s.t}</p>
            <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">These are Gartner’s predictions, published on 26 August 2025 (updated 5 September 2025), not measurements. Gartner also says the most common misconception is calling assistants “agents”, which it names “agentwashing”.</p>
    </div>
  );
}

// ── 10. What people ask Copilot for ──────────────────────────────────────────

export function CopilotBars() {
  const bars: { l: string; v: number; tone: Tone; note: string }[] = [
    { l: "Thinking work: analysing, solving, evaluating, creating", v: 49, tone: "v", note: "cognitive work" },
    { l: "Working with people", v: 19, tone: "c", note: "coordination" },
    { l: "Producing work", v: 17, tone: "a", note: "drafts, documents" },
    { l: "Finding information", v: 15, tone: "g", note: "look-ups" },
  ];
  return (
    <div>
      <ul className="space-y-3">
        {bars.map((b) => (
          <li key={b.l}>
            <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
              <span className="text-[var(--text-primary)] font-medium">{b.l}</span>
              <span className="mono font-bold" style={{ color: T[b.tone].fg }}>{b.v}%</span>
            </div>
            <div className="mt-1 h-3.5 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden" role="img" aria-label={`${b.v} percent`}>
              <div className="h-full rounded-full" style={{ width: `${b.v}%`, background: T[b.tone].fg }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Source: Microsoft’s 2026 Work Trend Index. Microsoft 365 Copilot Chat, one week in February 2026, more than 100,000 privacy-protected chats. The percentages are each activity’s share of classified user goals, “not time spent, not session count”. This is chat use, not a count of autonomous agents.</p>
    </div>
  );
}

// ── 11. Four modes ───────────────────────────────────────────────────────────

export function FourModes() {
  const modes: { n: string; d: string; tone: Tone }[] = [
    { n: "Delegation", d: "Hand off routine execution, research or synthesis. Check the result.", tone: "g" },
    { n: "Collaboration", d: "Work back and forth, turn by turn, each adding to the other’s draft.", tone: "v" },
    { n: "Asking", d: "Get an answer or an explanation, then carry on yourself.", tone: "a" },
    { n: "Exploration", d: "Wander through an idea, a market or a problem to see what turns up.", tone: "c" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {modes.map((m) => (
          <div key={m.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[m.tone].fg, background: T[m.tone].soft }}>
            <p className="text-[15px] font-bold" style={{ color: T[m.tone].fg }}>{m.n}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-primary)]">{m.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Microsoft names these four modes and sorts them by how the person engages and how much the AI does. Its diagram is conceptual, and it does not say how many people use each. The one-line descriptions here are our own plain-English reading.</p>
    </div>
  );
}

// ── 12. Habits of the most advanced users ────────────────────────────────────

export function FrontierHabits() {
  const rows: { l: string; a: number; b: number }[] = [
    { l: "Deliberately do some work without AI, to keep skills sharp", a: 43, b: 30 },
    { l: "Pause first to decide what AI should do and what a human should", a: 53, b: 33 },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-4 text-[12px] mb-3">
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-3 w-3 rounded-sm" style={{ background: T.g.fg }} aria-hidden="true" /> Frontier Professionals</span>
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-3 w-3 rounded-sm" style={{ background: T.a.fg }} aria-hidden="true" /> Other AI users</span>
      </div>
      <ul className="space-y-4">
        {rows.map((r) => (
          <li key={r.l}>
            <p className="text-[12.5px] font-medium text-[var(--text-primary)] mb-1.5">{r.l}</p>
            {[{ v: r.a, c: T.g.fg }, { v: r.b, c: T.a.fg }].map((x, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-3.5 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${x.v}%`, background: x.c }} />
                </div>
                <span className="mono text-[12px] font-bold w-9 text-right" style={{ color: x.c }}>{x.v}%</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Source: Microsoft’s 2026 Work Trend Index survey of 20,000 AI users in 10 countries; “Frontier Professionals” are 16% of those surveyed. Self-reported answers.</p>
    </div>
  );
}

// ── 13. Ten weeks to ten minutes ─────────────────────────────────────────────

export function NovoBeforeAfter() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2.5">
        <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.a.fg, background: T.a.soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T.a.fg }}>BEFORE</p>
          <p className="text-[clamp(22px,4vw,30px)] font-bold text-[var(--text-primary)] leading-tight">10+ weeks</p>
          <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">to produce clinical study documentation; writers averaged 2.3 clinical study reports a year, each up to 300 pages.</p>
        </div>
        <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.g.fg, background: T.g.soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T.g.fg }}>AFTER (as Anthropic reports it)</p>
          <p className="text-[clamp(22px,4vw,30px)] font-bold text-[var(--text-primary)] leading-tight">10 minutes</p>
          <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">for the same documentation, drafted by NovoScribe, then handed “directly into human hands for review and approval”.</p>
        </div>
      </div>
      <div className="mt-2.5 rounded-[var(--radius)] border-2 p-3 text-[12.5px] leading-snug text-[var(--text-primary)]" style={{ borderColor: T.r.fg, background: T.r.soft }}>
        <strong>The step that did not go away:</strong> a person still reviews and approves. The saving is in the drafting, not in the responsibility.
      </div>
    </div>
  );
}

// ── 14. Three horizons ───────────────────────────────────────────────────────

export function ThreeHorizons() {
  const hs: { tone: Tone; when: string; t: string; pts: string[]; kind: string }[] = [
    { tone: "g", when: "Now (2026)", t: "The agent as a junior colleague", pts: ["Takes a goal, uses tools, returns drafts", "You set limits and approve the important steps", "Best at prep, first drafts, look-ups and admin"], kind: "Reported" },
    { tone: "v", when: "Next (2027–2029)", t: "Teams of agents, with you as their lead", pts: ["Agents with different skills combine on one job", "Agents work across apps, not inside one", "Half of knowledge workers learn to direct or govern agents"], kind: "Gartner’s predictions" },
    { tone: "c", when: "Later (our imagination)", t: "A quiet layer of helpers around every life", pts: ["Your agent negotiates with the clinic’s, the school’s and the bank’s", "Small firms run with the reach of large ones", "People spend the saved hours on what only people can give"], kind: "Imagined, not forecast" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-2.5">
      {hs.map((h) => (
        <div key={h.when} className="rounded-[var(--radius)] border-2 p-3.5 flex flex-col" style={{ borderColor: T[h.tone].fg, background: T[h.tone].soft }}>
          <p className="mono text-[11px] font-semibold uppercase" style={{ color: T[h.tone].fg }}>{h.when}</p>
          <p className="mt-0.5 text-[15px] font-bold text-[var(--text-primary)]">{h.t}</p>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-snug text-[var(--text-primary)] list-disc pl-4 flex-1">
            {h.pts.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="mt-3 text-[11px] mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">{h.kind}</p>
        </div>
      ))}
    </div>
  );
}

// ── 15. A day in the imagined 2030s ──────────────────────────────────────────

export function ImaginedDay() {
  const beats: { icon: string; t: string; b: string }[] = [
    { icon: "🌅", t: "Wake-up", b: "Your agent has already moved your flight after a delay, told the hotel, and left one line for you: “All fixed. Nothing needed from you.”" },
    { icon: "🏥", t: "Clinic", b: "Your agent and the clinic’s agent agree a time that suits your calendar and the doctor’s. You get one message, and a reminder to bring last year’s report." },
    { icon: "🏫", t: "School", b: "A teacher’s agent turns a single lesson into three versions for three reading levels. The teacher spends the saved hour with the child who needs it most." },
    { icon: "🛒", t: "Small shop", b: "The owner’s agent chases invoices, reorders stock and drafts the tax paperwork. The owner reviews, signs and goes home in time for dinner." },
    { icon: "🌙", t: "Evening", b: "Your agent gives you a two-minute summary of your day, flags the one decision it thinks you should sleep on, and then goes quiet." },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {beats.map((b, i) => (
          <li key={b.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[(["v", "c", "g", "a", "r"] as Tone[])[i]].fg, background: T[(["v", "c", "g", "a", "r"] as Tone[])[i]].soft }}>
            <p className="text-[14px] font-bold text-[var(--text-primary)]"><span aria-hidden="true">{b.icon} </span>{b.t}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{b.b}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Imagined. This is fiction built on the trends in this article: nobody has promised any of it, and every step assumes a person can see and undo what their agent does.</p>
    </div>
  );
}

// ── 16. Ten easy recipes ─────────────────────────────────────────────────────

const RECIPES: { t: string; ask: string; keep: string; tone: Tone }[] = [
  { t: "Inbox triage", ask: "Sort my unread mail into “needs me”, “can wait” and “ignore”, and draft replies for the first pile.", keep: "You press send.", tone: "v" },
  { t: "Meeting prep", ask: "Before my 3 pm, read the last five emails with this client and give me one page: history, open issues, three questions to ask.", keep: "You judge the questions.", tone: "c" },
  { t: "Bills and subscriptions", ask: "Go through this month’s statements and list every recurring charge with its date and amount.", keep: "You cancel. Read-only access.", tone: "a" },
  { t: "Trip planning", ask: "Plan three days in Jaipur for two adults on a budget, with travel times between stops and two rainy-day options.", keep: "You book.", tone: "g" },
  { t: "Meal planning", ask: "Plan five dinners around what is in my fridge, then write the shopping list for what is missing.", keep: "You cook (or order).", tone: "r" },
  { t: "Study buddy", ask: "Quiz me on chapter 4, one question at a time. Explain what I get wrong, then repeat those.", keep: "You do the learning.", tone: "v" },
  { t: "Paperwork", ask: "Read this 40-page policy and tell me what changes for me, what I must do, and by when. Quote the clauses.", keep: "You verify the clauses.", tone: "c" },
  { t: "Job hunt", ask: "Keep a table of roles I have applied for, with dates and next steps, and draft a follow-up note after seven days.", keep: "You approve every message.", tone: "a" },
  { t: "Small-business admin", ask: "List customers whose invoices are more than 30 days late and draft a polite reminder for each.", keep: "You send, and you choose whom to chase.", tone: "g" },
  { t: "Family calendar", ask: "Find a Saturday in the next six weeks when all four of us are free, and list two ideas for it.", keep: "You decide and invite.", tone: "r" },
];

export function RecipeCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {RECIPES.map((r, i) => (
        <div key={r.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft }}>
          <p className="text-[14px] font-bold text-[var(--text-primary)]"><span className="mono text-[11px] mr-1.5" style={{ color: T[r.tone].fg }}>{String(i + 1).padStart(2, "0")}</span>{r.t}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-primary)]"><span className="mono text-[10.5px] uppercase tracking-[0.08em] block text-[var(--text-tertiary)]">Ask</span>“{r.ask}”</p>
          <p className="mt-1.5 text-[12px] font-semibold" style={{ color: T[r.tone].fg }}>You keep: {r.keep}</p>
        </div>
      ))}
    </div>
  );
}

// ── 17. The delegation card ──────────────────────────────────────────────────

export function DelegationCard() {
  const rows: { k: string; v: string; tone: Tone }[] = [
    { k: "Goal", v: "What finished looks like, in one sentence.", tone: "g" },
    { k: "Context", v: "What it needs to know: who, why, and what you have already tried.", tone: "c" },
    { k: "Limits", v: "What it may touch, what it must never do, and what needs your yes first.", tone: "r" },
    { k: "Quality bar", v: "How good is good enough: length, tone, sources, format.", tone: "a" },
    { k: "Check-in", v: "When to stop and ask you, and what to hand back with the result.", tone: "v" },
  ];
  return (
    <div className="rounded-[var(--radius)] border-2 p-4 bg-[var(--fig-card)]" style={{ borderColor: T.v.fg }}>
      <p className="mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: T.v.fg }}>The delegation card: five lines you can write in a minute</p>
      <dl className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[6.2rem_1fr] gap-3 items-baseline">
            <dt className="text-[13px] font-bold" style={{ color: T[r.tone].fg }}>{r.k}</dt>
            <dd className="text-[13px] leading-snug text-[var(--text-primary)]">{r.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Our own template, which works with any agent. It follows Microsoft’s finding that the best users set “clear intent”, the desired outcome and the quality bar.</p>
    </div>
  );
}

// ── 18. The permission ladder ────────────────────────────────────────────────

export function PermissionLadder() {
  const rungs: { n: number; t: string; b: string; ex: string; tone: Tone }[] = [
    { n: 1, t: "Look only", b: "It can read, search and summarise. It cannot change anything.", ex: "Reading statements; reviewing a contract", tone: "g" },
    { n: 2, t: "Draft", b: "It prepares the email, the file or the booking, and stops.", ex: "Reply drafts; a trip plan", tone: "c" },
    { n: 3, t: "Act with your yes", b: "It does the thing only after you approve that specific step.", ex: "Send this email; pay this invoice", tone: "a" },
    { n: 4, t: "Act inside a fence", b: "It may act alone within tight limits you set, and logs everything.", ex: "Rebook within the same fare class", tone: "v" },
    { n: 5, t: "Act freely", b: "No approval, no fence. Most tasks should never live here.", ex: "Almost nothing that touches money, people or law", tone: "r" },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {rungs.map((r) => (
          <li key={r.n} className="grid grid-cols-[2.2rem_1fr] gap-3 items-stretch rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft, marginLeft: `${(r.n - 1) * 3}%` }}>
            <span className="grid place-items-center rounded-full h-8 w-8 text-[14px] font-bold text-white" style={{ background: T[r.tone].fg }}>{r.n}</span>
            <div>
              <p className="text-[14px] font-bold text-[var(--text-primary)]">{r.t}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{r.b}</p>
              <p className="mt-0.5 text-[11.5px] font-semibold" style={{ color: T[r.tone].fg }}>e.g. {r.ex}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Our own ladder for deciding how much freedom to give an agent. Start on rung 1 or 2 and climb only when it has earned it.</p>
    </div>
  );
}

// ── 19. Amplify or replace ───────────────────────────────────────────────────

export function AmplifyOrReplace() {
  return (
    <div className="grid md:grid-cols-2 gap-2.5">
      <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.r.fg, background: T.r.soft }}>
        <p className="text-[14px] font-bold" style={{ color: T.r.fg }}>Replace</p>
        <ul className="mt-1.5 space-y-1.5 text-[12.5px] leading-snug text-[var(--text-primary)] list-disc pl-4">
          <li>Use AI mainly to cut costs and headcount</li>
          <li>Reductions “too deep and too soon”</li>
          <li>Talent pipelines and institutional knowledge wear away</li>
          <li>Gartner predicts 30% of people laid off for AI will need rehiring by 2029, often at a much higher cost</li>
        </ul>
      </div>
      <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.g.fg, background: T.g.soft }}>
        <p className="text-[14px] font-bold" style={{ color: T.g.fg }}>Amplify (“talent remix”)</p>
        <ul className="mt-1.5 space-y-1.5 text-[12.5px] leading-snug text-[var(--text-primary)] list-disc pl-4">
          <li>Use AI to reshape roles and redirect people to better work</li>
          <li>Strengthen judgement, creativity, leadership and decisions</li>
          <li>Reinvest the gains in innovation and skills</li>
          <li>Gartner predicts that by 2027, 75% of firms that bank gains as savings will be overtaken by those that reinvest</li>
        </ul>
      </div>
      <p className="md:col-span-2 text-[11.5px] text-[var(--text-tertiary)]">Source: Gartner press release, 9 September 2026. Both numbers are Gartner predictions.</p>
    </div>
  );
}

// ── 20. Thirty days ──────────────────────────────────────────────────────────

export function ThirtyDays() {
  const weeks: { w: string; t: string; b: string; tone: Tone }[] = [
    { w: "Week 1", t: "Notice", b: "List everything you did this week. Circle what is repetitive, prep-work or paperwork. Pick three.", tone: "g" },
    { w: "Week 2", t: "Try, on rung 1–2", b: "Give one of the three to an assistant or agent using a delegation card. Read-only or draft-only. Note what it got right and wrong.", tone: "c" },
    { w: "Week 3", t: "Check and tighten", b: "Compare its work with your own. Fix the card: clearer limits, a better quality bar. Try the second task.", tone: "a" },
    { w: "Week 4", t: "Decide and share", b: "Keep what saved real time. Drop what did not. Tell one colleague or family member how you set it up.", tone: "v" },
  ];
  return (
    <ol className="grid sm:grid-cols-2 gap-2.5">
      {weeks.map((w) => (
        <li key={w.w} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[w.tone].fg, background: T[w.tone].soft }}>
          <p className="mono text-[11px] font-semibold uppercase" style={{ color: T[w.tone].fg }}>{w.w}</p>
          <p className="text-[15px] font-bold text-[var(--text-primary)]">{w.t}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{w.b}</p>
        </li>
      ))}
    </ol>
  );
}

/** A small wrapper so the page can drop a caption-less block in a figure. */
export function Block({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
