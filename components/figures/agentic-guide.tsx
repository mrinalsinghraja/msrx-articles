/**
 * Diagrams for "Agentic AI 101".
 *
 * History dates are the public release or publication dates of the named
 * systems and papers. Product details for 2025–2026 reuse facts checked for
 * the earlier articles in this series. The autonomy ladder is this article's
 * own framing, and says so.
 */

import type { ReactNode } from "react";

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

// ── Chatbot vs agent ─────────────────────────────────────────────────────────

export function ChatVsAgent() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-cyan)] bg-[var(--fig-cyan-soft)] p-4">
        <p className="text-[15px] font-bold text-[var(--fig-cyan)]">💬 A chatbot tells you how</p>
        <p className="mt-2 rounded-lg bg-[var(--fig-card)] px-3 py-2 text-[12.5px] text-[var(--text-primary)]">“Book me a table for 4 near Indiranagar on Saturday at 8.”</p>
        <p className="mt-2 rounded-lg bg-[var(--fig-card)] px-3 py-2 text-[12.5px] text-[var(--text-secondary)]">“Here are five restaurants you could try, and here’s how to book on each app…”</p>
        <p className="mt-3 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">You</strong> still open the apps, compare, fill in forms, confirm.</p>
      </div>
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-violet)] bg-[var(--fig-violet-soft)] p-4">
        <p className="text-[15px] font-bold text-[var(--fig-violet)]">🤖 An agent does it</p>
        <p className="mt-2 rounded-lg bg-[var(--fig-card)] px-3 py-2 text-[12.5px] text-[var(--text-primary)]">“Book me a table for 4 near Indiranagar on Saturday at 8.”</p>
        <ul className="mt-2 space-y-1 rounded-lg bg-[var(--fig-card)] px-3 py-2 text-[12px] text-[var(--text-secondary)]">
          <li>✓ Searched 3 booking sites · ✓ Filtered 4.3★+, veg options</li>
          <li>✓ Checked your calendar — free after 7:30</li>
          <li>⏸ “Toit, 8:00 pm, 4 people. Confirm booking?”</li>
        </ul>
        <p className="mt-3 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">The agent</strong> does the steps; you approve the one that matters.</p>
      </div>
    </div>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "1966–1972", t: "Shakey the robot", b: "At SRI in California, the first mobile robot to reason about its own actions — planning a route, then moving boxes — using the STRIPS planner.", tone: "c" },
  { d: "1995", t: "“Intelligent agents”", b: "Russell and Norvig’s textbook defines AI itself around agents: anything that perceives its environment through sensors and acts on it through actuators.", tone: "c" },
  { d: "2013–2016", t: "Learning agents in games", b: "DeepMind’s agents learn Atari games from pixels, then AlphaGo beats Lee Sedol — agents that learn by trial and reward.", tone: "v" },
  { d: "Oct 2022", t: "ReAct", b: "A paper shows language models can alternate reasoning and actions — think, use a tool, look at the result, think again. The pattern behind most agents today.", tone: "v" },
  { d: "2023", t: "Tool use and the AutoGPT craze", b: "Models learn to call tools and APIs; AutoGPT and BabyAGI go viral promising autonomous agents — and mostly show how easily they get lost.", tone: "a" },
  { d: "2024", t: "Computer use, coding agents, MCP", b: "Claude learns to operate a screen; coding agents take on whole tasks; the Model Context Protocol gives agents a standard way to plug into tools.", tone: "a" },
  { d: "2025", t: "Agents go mainstream", b: "Operator and ChatGPT agent, Deep Research, Claude Code, Gemini CLI, Copilot’s Researcher and Analyst; Google’s A2A protocol lets agents talk to each other.", tone: "g" },
  { d: "2026", t: "Agents at work", b: "Agents run for hours on real projects, take GitHub issues end to end, work across Microsoft 365, and run as managed services in the cloud.", tone: "g" },
];

export function AgentTimeline() {
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

// ── Autonomy ladder ──────────────────────────────────────────────────────────

export function AutonomyLadder() {
  const rungs: { n: string; t: string; b: string; ex: string; tone: Tone }[] = [
    { n: "0", t: "Chat", b: "Answers questions; you do everything.", ex: "Asking for a recipe", tone: "c" },
    { n: "1", t: "Assist", b: "Drafts things for you to use.", ex: "“Write a reply to this email”", tone: "c" },
    { n: "2", t: "Workflow", b: "Follows fixed steps that code defines.", ex: "Every invoice: extract → check → file", tone: "g" },
    { n: "3", t: "Supervised agent", b: "Plans its own steps; asks before important actions.", ex: "Coding agent that asks before running commands", tone: "a" },
    { n: "4", t: "Delegated agent", b: "Runs for hours on a goal; reports back.", ex: "“Research competitors and draft a report”", tone: "v" },
    { n: "5", t: "Autonomous", b: "Acts continuously on its own judgment.", ex: "Still rare, and rarely wise", tone: "r" },
  ];
  return (
    <div>
      <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end">
        {rungs.map((r, i) => (
          <li key={r.n} className="rounded-[var(--radius)] border-2 p-3 flex flex-col" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft, minHeight: `${7 + i * 0.9}rem` }}>
            <span className="mono text-[20px] font-bold" style={{ color: T[r.tone].fg }}>{r.n}</span>
            <span className="text-[13.5px] font-semibold text-[var(--text-primary)]">{r.t}</span>
            <span className="mt-1 text-[11.5px] leading-snug text-[var(--text-secondary)]">{r.b}</span>
            <span className="mt-auto pt-2 text-[11px] leading-snug italic text-[var(--text-tertiary)]">{r.ex}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11.5px] text-[var(--text-tertiary)]">An illustrative scale for this article, loosely modelled on self-driving levels. Most real value today sits at levels 2–4.</p>
    </div>
  );
}

// ── Anatomy of an agent ──────────────────────────────────────────────────────

export function AgentAnatomy() {
  const parts: { x: number; y: number; t: string; s: string; cls: string }[] = [
    { x: 30, y: 30, t: "🎯 Goal", s: "what “done” looks like", cls: "c-s" },
    { x: 430, y: 30, t: "🛠️ Tools", s: "search, email, code, APIs", cls: "a-s" },
    { x: 30, y: 210, t: "🗂️ Memory", s: "context + notes + files", cls: "g-s" },
    { x: 430, y: 210, t: "🛡️ Guardrails", s: "permissions, approvals, budget", cls: "r-s" },
  ];
  return (
    <svg viewBox="0 0 640 290" role="img" aria-labelledby="an-t">
      <title id="an-t">The anatomy of an agent. At the centre, a language model acts as the brain that plans and decides. Around it: a goal defining what done looks like, tools such as search, email, code and APIs, memory made of context, notes and files, and guardrails such as permissions, approvals and budgets. The agent acts on its environment and observes the results.</title>
      <Arrow id="an-ar" />
      <rect x="220" y="95" width="200" height="100" rx="18" className="v-s" strokeWidth="2" />
      <text x="320" y="135" textAnchor="middle" fontSize="16" className="t" fontWeight="700">🧠 Model</text>
      <text x="320" y="155" textAnchor="middle" fontSize="11.5" className="t2">plans, decides the next step,</text>
      <text x="320" y="171" textAnchor="middle" fontSize="11.5" className="t2">reads the results</text>
      {parts.map((p) => (
        <g key={p.t}>
          <rect x={p.x} y={p.y} width="180" height="54" rx="12" className={p.cls} strokeWidth="1.5" />
          <text x={p.x + 90} y={p.y + 24} textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">{p.t}</text>
          <text x={p.x + 90} y={p.y + 42} textAnchor="middle" fontSize="11" className="t2">{p.s}</text>
          <line x1={p.x < 300 ? p.x + 182 : p.x - 2} y1={p.y + 27} x2={p.x < 300 ? 220 : 420} y2={p.y < 100 ? 115 : 175} className="ln" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="230" y="232" width="180" height="46" rx="12" className="box" strokeWidth="1.5" />
      <text x="320" y="252" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">🌍 Environment</text>
      <text x="320" y="268" textAnchor="middle" fontSize="10.5" className="t2">websites, apps, files, people</text>
      <line x1="300" y1="197" x2="300" y2="228" className="ln" strokeWidth="1.6" markerEnd="url(#an-ar)" />
      <line x1="340" y1="228" x2="340" y2="199" className="ln" strokeWidth="1.6" markerEnd="url(#an-ar)" />
      <text x="292" y="218" textAnchor="end" fontSize="10.5" className="t3">acts</text>
      <text x="348" y="218" fontSize="10.5" className="t3">observes</text>
    </svg>
  );
}

// ── ReAct loop ───────────────────────────────────────────────────────────────

export function ReactLoop() {
  const nodes = [
    { x: 320, y: 50, l: "💭 Think", s: "what should I do next?", cls: "v-s" },
    { x: 540, y: 170, l: "🛠️ Act", s: "call one tool", cls: "a-s" },
    { x: 320, y: 290, l: "👀 Observe", s: "read the tool’s result", cls: "g-s" },
    { x: 100, y: 170, l: "📝 Update", s: "add it to context", cls: "c-s" },
  ];
  return (
    <svg viewBox="0 0 640 340" role="img" aria-labelledby="re-t">
      <title id="re-t">The ReAct loop: think about the next step, act by calling one tool, observe the result, update the context, and think again — until the goal is met or the agent needs a human.</title>
      <Arrow id="re-ar" />
      <path d="M395 60 Q 510 80 535 135" className="ln" strokeWidth="1.8" markerEnd="url(#re-ar)" />
      <path d="M540 205 Q 520 270 400 288" className="ln" strokeWidth="1.8" markerEnd="url(#re-ar)" />
      <path d="M245 288 Q 120 270 100 205" className="ln" strokeWidth="1.8" markerEnd="url(#re-ar)" />
      <path d="M100 135 Q 120 80 245 60" className="ln" strokeWidth="1.8" markerEnd="url(#re-ar)" />
      {nodes.map((n) => (
        <g key={n.l}>
          <rect x={n.x - 85} y={n.y - 30} width="170" height="60" rx="14" className={n.cls} strokeWidth="1.5" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="15" className="t" fontWeight="700">{n.l}</text>
          <text x={n.x} y={n.y + 15} textAnchor="middle" fontSize="11" className="t2">{n.s}</text>
        </g>
      ))}
      <text x="320" y="164" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">repeat until</text>
      <text x="320" y="182" textAnchor="middle" fontSize="11.5" className="t2">✅ goal met · 🙋 needs a human</text>
      <text x="320" y="198" textAnchor="middle" fontSize="11.5" className="t2">⏱ step or budget limit hit</text>
    </svg>
  );
}

// ── Workflow patterns ────────────────────────────────────────────────────────

function Mini({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex items-center flex-wrap gap-1 text-[11px] mono text-[var(--text-primary)]">{children}</div>;
}
const Box = ({ c, t }: { c: Tone; t: string }) => (
  <span className="rounded px-1.5 py-0.5 border" style={{ borderColor: T[c].fg, background: T[c].soft }}>{t}</span>
);

export function WorkflowPatterns() {
  const cards: { n: string; b: string; ex: string; diagram: ReactNode; tone: Tone }[] = [
    { n: "Prompt chaining", b: "Fixed steps, each using the last one’s output, with checks in between.", ex: "Outline → check → draft → translate", tone: "c", diagram: <Mini><Box c="c" t="step 1" />→<Box c="g" t="check" />→<Box c="c" t="step 2" />→<Box c="c" t="step 3" /></Mini> },
    { n: "Routing", b: "Classify the input first, then send it to the right specialist.", ex: "Refund vs bug vs sales question", tone: "v", diagram: <Mini><Box c="v" t="router" />→<Box c="c" t="A" /><Box c="c" t="B" /><Box c="c" t="C" /></Mini> },
    { n: "Parallelisation", b: "Split independent pieces and run them at once, then combine.", ex: "Review a contract for 5 kinds of risk", tone: "a", diagram: <Mini><Box c="a" t="split" />→<Box c="c" t="1" /><Box c="c" t="2" /><Box c="c" t="3" />→<Box c="a" t="merge" /></Mini> },
    { n: "Orchestrator–workers", b: "A lead model breaks the task up on the fly and delegates to workers.", ex: "Research across many sources", tone: "g", diagram: <Mini><Box c="g" t="lead" />⇄<Box c="c" t="worker" /><Box c="c" t="worker" /></Mini> },
    { n: "Evaluator–optimiser", b: "One model produces, another critiques, repeat until good enough.", ex: "Draft → grade → revise", tone: "r", diagram: <Mini><Box c="c" t="make" />⇄<Box c="r" t="judge" /></Mini> },
    { n: "Autonomous agent", b: "The model chooses its own steps in a loop with tools until done.", ex: "Fix a bug across a codebase", tone: "v", diagram: <Mini><Box c="v" t="model" />⇄<Box c="a" t="tools" />⇄<Box c="g" t="env" /></Mini> },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {cards.map((c) => (
        <div key={c.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[c.tone].fg }}>
          <p className="text-[14.5px] font-bold" style={{ color: T[c.tone].fg }}>{c.n}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
          {c.diagram}
          <p className="mt-2 text-[11.5px] italic text-[var(--text-tertiary)]">e.g. {c.ex}</p>
        </div>
      ))}
    </div>
  );
}

// ── Protocols ────────────────────────────────────────────────────────────────

export function Protocols() {
  return (
    <svg viewBox="0 0 640 250" role="img" aria-labelledby="pr-t">
      <title id="pr-t">Two protocols. MCP, the Model Context Protocol, connects an agent to tools and data such as a calendar, a database or GitHub. A2A, the Agent2Agent protocol, lets one agent hand work to another agent, such as a travel agent asking a payments agent.</title>
      <Arrow id="pr-ar" />
      <rect x="240" y="95" width="160" height="60" rx="14" className="v-s" strokeWidth="2" />
      <text x="320" y="122" textAnchor="middle" fontSize="14" className="t" fontWeight="700">🤖 Your agent</text>
      <text x="320" y="140" textAnchor="middle" fontSize="11" className="t2">“plan my Goa trip”</text>
      <text x="120" y="24" textAnchor="middle" fontSize="13" className="a" fontWeight="700">MCP · agent ↔ tools</text>
      {["📅 Calendar", "🗄️ Database", "🐙 GitHub"].map((t, i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 64} width="170" height="44" rx="10" className="a-s" strokeWidth="1.3" />
          <text x="115" y={67 + i * 64} textAnchor="middle" fontSize="12.5" className="t" fontWeight="600">{t}</text>
          <line x1="238" y1="125" x2="202" y2={62 + i * 64} className="a-ln" strokeWidth="1.5" markerEnd="url(#pr-ar)" />
        </g>
      ))}
      <text x="520" y="24" textAnchor="middle" fontSize="13" className="g" fontWeight="700">A2A · agent ↔ agent</text>
      {["🏨 Hotel agent", "💳 Payments agent", "✈️ Airline agent"].map((t, i) => (
        <g key={t}>
          <rect x="440" y={40 + i * 64} width="170" height="44" rx="10" className="g-s" strokeWidth="1.3" />
          <text x="525" y={67 + i * 64} textAnchor="middle" fontSize="12.5" className="t" fontWeight="600">{t}</text>
          <line x1="402" y1="125" x2="438" y2={62 + i * 64} className="g-ln" strokeWidth="1.5" markerEnd="url(#pr-ar)" />
        </g>
      ))}
    </svg>
  );
}

// ── Memory ───────────────────────────────────────────────────────────────────

export function MemoryLayers() {
  const rows: { n: string; like: string; b: string; tone: Tone }[] = [
    { n: "Working memory", like: "what’s on your desk", b: "The context window: the task, recent steps, tool results. Fast, but limited and wiped each session.", tone: "c" },
    { n: "Compaction", like: "tidying the desk", b: "When context fills up, older steps are summarised so the agent can keep going for hours.", tone: "v" },
    { n: "Notes and files", like: "a notebook", b: "The agent writes progress, plans and decisions to files — like CLAUDE.md or a to-do list — and rereads them.", tone: "a" },
    { n: "Long-term memory", like: "a filing cabinet", b: "Facts and past work stored in a database or vector index, retrieved when relevant.", tone: "g" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.n} className="grid sm:grid-cols-[11rem_1fr] rounded-[var(--radius)] border overflow-hidden" style={{ borderColor: T[r.tone].fg }}>
          <div className="px-3 py-2.5" style={{ background: T[r.tone].soft }}>
            <p className="text-[13.5px] font-bold" style={{ color: T[r.tone].fg }}>{r.n}</p>
            <p className="text-[11.5px] italic text-[var(--text-secondary)]">like {r.like}</p>
          </div>
          <p className="px-3 py-2.5 text-[12.5px] leading-snug text-[var(--text-secondary)] bg-[var(--fig-card)]">{r.b}</p>
        </div>
      ))}
    </div>
  );
}

// ── Day in the life ──────────────────────────────────────────────────────────

export function DayWithAgents() {
  const items: { t: string; w: "home" | "work"; i: string; n: string; b: string }[] = [
    { t: "07:00", w: "home", i: "☀️", n: "Morning brief", b: "Summarises overnight email, today’s calendar, weather and a delayed train." },
    { t: "08:30", w: "home", i: "🧾", n: "Bills and paperwork", b: "Finds the electricity bill, checks it against last month, reminds you before the due date." },
    { t: "10:00", w: "work", i: "📥", n: "Inbox triage", b: "Sorts 60 emails, drafts 12 replies for review, files the rest." },
    { t: "11:30", w: "work", i: "📅", n: "Meeting prep", b: "Pulls the client’s last emails, open issues and a one-page brief." },
    { t: "14:00", w: "work", i: "📊", n: "Analysis", b: "Cleans the sales sheet, finds the dip in the South region, builds charts." },
    { t: "16:00", w: "work", i: "💻", n: "Coding task", b: "Fixes a bug, writes tests, opens a pull request for review." },
    { t: "19:00", w: "home", i: "🛒", n: "Shopping and planning", b: "Compares three washing machines, plans a weekend trip within budget." },
    { t: "21:00", w: "home", i: "🎓", n: "Learning", b: "Quizzes your child on tomorrow’s science test, adjusting to their mistakes." },
  ];
  return (
    <ol className="grid sm:grid-cols-2 gap-2.5">
      {items.map((it) => {
        const tone: Tone = it.w === "home" ? "g" : "v";
        return (
          <li key={it.t} className="flex gap-3 rounded-[var(--radius)] border bg-[var(--fig-card)] p-3" style={{ borderColor: T[tone].fg }}>
            <span className="text-[22px]" aria-hidden="true">{it.i}</span>
            <span className="text-[12.5px] leading-snug">
              <span className="mono text-[11px] font-semibold" style={{ color: T[tone].fg }}>{it.t} · {it.w === "home" ? "life" : "work"}</span>
              <strong className="block text-[13.5px] text-[var(--text-primary)]">{it.n}</strong>
              <span className="text-[var(--text-secondary)]">{it.b}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// ── Office departments ───────────────────────────────────────────────────────

export function OfficeAgents() {
  const rows: [string, string, string, string][] = [
    ["🎧", "Customer support", "Reads the ticket, checks the order, issues refunds within policy, drafts replies", "Refunds above a limit; angry customers"],
    ["💰", "Finance", "Matches invoices to purchase orders, flags mismatches, prepares payment runs", "Releasing payments"],
    ["🧑‍💼", "HR", "Answers policy questions, schedules interviews, runs onboarding checklists", "Hiring decisions"],
    ["📈", "Sales", "Researches leads, updates the CRM after calls, drafts follow-ups", "Pricing and contracts"],
    ["💻", "Engineering", "Fixes bugs, writes tests, reviews code, updates dependencies", "Merging to production"],
    ["⚖️", "Legal and compliance", "Reviews contracts against a playbook, highlights risky clauses", "Signing anything"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3 font-semibold text-[var(--text-primary)]">Team</th>
            <th className="py-2 px-3 font-semibold text-[var(--fig-violet)]">What the agent does</th>
            <th className="py-2 pl-3 font-semibold text-[var(--fig-rose)]">Where a human decides</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([i, t, a, h]) => (
            <tr key={t} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 font-semibold text-[var(--text-primary)] whitespace-nowrap"><span aria-hidden="true">{i}</span> {t}</td>
              <td className="py-2 px-3 text-[var(--text-secondary)]">{a}</td>
              <td className="py-2 pl-3 text-[var(--text-secondary)]">{h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Guardrails ───────────────────────────────────────────────────────────────

export function LethalTrifecta() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="lt-t">
      <title id="lt-t">The risky combination for prompt injection. An agent that has access to private data, reads untrusted content such as web pages or incoming email, and can communicate externally, for example by sending email, can be tricked by hidden instructions into leaking data. Removing any one of the three breaks the attack.</title>
      <circle cx="210" cy="105" r="88" className="a-s" strokeWidth="1.5" fillOpacity="0.7" />
      <circle cx="370" cy="105" r="88" className="c-s" strokeWidth="1.5" fillOpacity="0.7" />
      <circle cx="290" cy="200" r="88" className="v-s" strokeWidth="1.5" fillOpacity="0.7" />
      <text x="170" y="80" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🔐 Private data</text>
      <text x="170" y="98" textAnchor="middle" fontSize="11" className="t2">your email, files</text>
      <text x="410" y="80" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🌐 Untrusted input</text>
      <text x="410" y="98" textAnchor="middle" fontSize="11" className="t2">web pages, inbound mail</text>
      <text x="290" y="252" textAnchor="middle" fontSize="13" className="t" fontWeight="700">📤 Can send out</text>
      <text x="290" y="269" textAnchor="middle" fontSize="11" className="t2">email, web requests</text>
      <circle cx="290" cy="138" r="24" className="r" />
      <text x="290" y="144" textAnchor="middle" fontSize="16" fill="white" fontWeight="700">⚠</text>
      <text x="480" y="190" fontSize="12" className="r" fontWeight="700">All three together:</text>
      <text x="480" y="208" fontSize="11.5" className="t2">a hidden instruction</text>
      <text x="480" y="224" fontSize="11.5" className="t2">can make it leak data.</text>
      <text x="480" y="248" fontSize="11.5" className="g" fontWeight="600">Remove any one →</text>
      <text x="480" y="264" fontSize="11.5" className="g" fontWeight="600">the attack breaks.</text>
    </svg>
  );
}

export function GuardrailStack() {
  const g: { i: string; n: string; b: string; tone: Tone }[] = [
    { i: "🔑", n: "Least privilege", b: "Give each agent only the tools and data its job needs.", tone: "c" },
    { i: "✋", n: "Approval gates", b: "Pause before sending, paying, deleting or publishing.", tone: "a" },
    { i: "📦", n: "Sandbox", b: "Run code and browsing in an isolated environment.", tone: "v" },
    { i: "💸", n: "Budgets and limits", b: "Cap steps, time, tokens and money per task.", tone: "g" },
    { i: "🔍", n: "Checks", b: "Verify outputs and risky actions with a separate check before they happen.", tone: "r" },
    { i: "📜", n: "Audit log", b: "Record every step, tool call and approval.", tone: "c" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
      {g.map((x) => (
        <div key={x.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[x.tone].fg, background: T[x.tone].soft }}>
          <p className="text-[14px] font-bold text-[var(--text-primary)]"><span aria-hidden="true">{x.i}</span> {x.n}</p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{x.b}</p>
        </div>
      ))}
    </div>
  );
}

// ── Typed checkpoints ────────────────────────────────────────────────────────

export function TypedCheckpoint() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-labelledby="tc2-t">
      <title id="tc2-t">A typed checkpoint inside an agent. The agent proposes an action, such as sending an email. Before it runs, a fast typed judgment model answers questions such as whether it contains personal data, whether it commits to a payment, and whether it matches the user’s request. Code applies thresholds: clear cases proceed, doubtful ones pause for human approval.</title>
      <Arrow id="tc2-ar" />
      <rect x="10" y="80" width="150" height="70" rx="12" className="v-s" strokeWidth="1.5" />
      <text x="85" y="108" textAnchor="middle" fontSize="13" className="t" fontWeight="700">🤖 Agent proposes</text>
      <text x="85" y="128" textAnchor="middle" fontSize="11" className="t2">send_email(…)</text>
      <line x1="162" y1="115" x2="206" y2="115" className="ln" strokeWidth="1.8" markerEnd="url(#tc2-ar)" />
      <rect x="210" y="40" width="210" height="150" rx="14" className="a-s" strokeWidth="1.8" />
      <text x="315" y="66" textAnchor="middle" fontSize="13" className="t" fontWeight="700">⚡ Typed check (one call)</text>
      <text x="228" y="94" fontSize="11.5" className="t2">contains personal data?  0.04</text>
      <text x="228" y="116" fontSize="11.5" className="t2">commits to a payment?   0.91</text>
      <text x="228" y="138" fontSize="11.5" className="t2">matches the request?    0.97</text>
      <text x="315" y="172" textAnchor="middle" fontSize="10.5" className="t3">probabilities, not prose</text>
      <line x1="422" y1="100" x2="468" y2="70" className="ln" strokeWidth="1.8" markerEnd="url(#tc2-ar)" />
      <line x1="422" y1="130" x2="468" y2="160" className="ln" strokeWidth="1.8" markerEnd="url(#tc2-ar)" />
      <rect x="472" y="40" width="160" height="56" rx="12" className="g-s" strokeWidth="1.5" />
      <text x="552" y="64" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">✅ All clear</text>
      <text x="552" y="82" textAnchor="middle" fontSize="11" className="t2">run it, log it</text>
      <rect x="472" y="134" width="160" height="56" rx="12" className="r-s" strokeWidth="1.5" />
      <text x="552" y="158" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">✋ Pause</text>
      <text x="552" y="176" textAnchor="middle" fontSize="11" className="t2">ask a human first</text>
    </svg>
  );
}

// ── Journey ──────────────────────────────────────────────────────────────────

export function Journey() {
  const steps: { n: string; t: string; b: string; tools: string; tone: Tone }[] = [
    { n: "1", t: "Use agents", b: "Give built-in agents real, low-risk tasks and watch how they work.", tools: "ChatGPT agent · Claude in Chrome · Gemini Deep Research · Copilot Researcher", tone: "g" },
    { n: "2", t: "Automate without code", b: "Connect apps and add AI steps to one repetitive chore.", tools: "Copilot Studio · Zapier · n8n · Power Automate", tone: "c" },
    { n: "3", t: "Work with a coding agent", b: "Let an agent change code under your review, even for scripts.", tools: "Claude Code · Gemini CLI · GitHub Copilot agent", tone: "a" },
    { n: "4", t: "Build your own", b: "Write a tool loop, then try an agent framework.", tools: "Claude Agent SDK · OpenAI Agents SDK · Google ADK · LangGraph", tone: "v" },
    { n: "5", t: "Run it for real", b: "Add evaluations, guardrails, logging and cost limits.", tools: "tests on real cases · traces · approval gates · budgets", tone: "r" },
  ];
  return (
    <ol className="space-y-2">
      {steps.map((s) => (
        <li key={s.n} className="grid grid-cols-[3rem_1fr] rounded-[var(--radius)] border-2 overflow-hidden" style={{ borderColor: T[s.tone].fg }}>
          <div className="grid place-items-center text-[22px] font-bold mono" style={{ background: T[s.tone].soft, color: T[s.tone].fg }}>{s.n}</div>
          <div className="px-3.5 py-2.5 bg-[var(--fig-card)]">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)]">{s.t}</p>
            <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
            <p className="mt-1 mono text-[11px] text-[var(--text-tertiary)]">{s.tools}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
