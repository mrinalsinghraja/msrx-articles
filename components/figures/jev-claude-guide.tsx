import type { ReactNode } from "react";
import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and screens for "How to use TypeSafe Jev with Claude".
 *
 * Every terminal frame marked "real run" reproduces output captured on
 * 28 September 2026 against jev-1.13.0 and Claude Code 2.1.281, trimmed only
 * where noted. Diagrams are drawings. API shapes follow docs.typesafe.ai and
 * code.claude.com as read on the same day.
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

// ── A terminal "screenshot" that holds real, copied output ──────────────────

export function Terminal({ title, children, badge }: { title: string; children: ReactNode; badge?: string }) {
  return (
    <WindowFrame title={title}>
      {badge && (
        <p className="mono px-4 pt-3 text-[10.5px] tracking-[0.12em] uppercase text-[var(--fig-green)]">● {badge}</p>
      )}
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.65] mono text-[var(--text-primary)]">{children}</pre>
    </WindowFrame>
  );
}

/** Dim a run of text inside a Terminal (prompts, comments). */
export function Dim({ children }: { children: ReactNode }) {
  return <span className="text-[var(--text-tertiary)]">{children}</span>;
}

/** Highlight a value inside a Terminal. */
export function Hi({ children, tone = "g" }: { children: ReactNode; tone?: Tone }) {
  return <span style={{ color: T[tone].fg, fontWeight: 600 }}>{children}</span>;
}

// ── Wide diagrams scroll sideways on phones instead of shrinking to ~5px text ─

function Wide({ min, children }: { min: number; children: ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1" tabIndex={0} role="group" aria-label="Diagram, scrolls sideways on small screens">
      <div style={{ minWidth: min }}>{children}</div>
    </div>
  );
}

// ── 1. Two brains ────────────────────────────────────────────────────────────

export function TwoBrains() {
  const cols: { n: string; tone: Tone; icon: string; role: string; gives: string; speed: string; items: string[] }[] = [
    {
      n: "Jev",
      tone: "g",
      icon: "⚡",
      role: "The receptionist. Reads the situation and makes one quick, typed call.",
      gives: "a choice, a probability, a level — with calibrated confidence",
      speed: "~0.3–0.5 s in our runs · pays for input only",
      items: ["route", "check", "score", "gate", "verify"],
    },
    {
      n: "Claude",
      tone: "v",
      icon: "🧠",
      role: "The specialist. Thinks at length, writes, codes and uses tools.",
      gives: "prose, code, plans, tool calls",
      speed: "seconds to minutes · pays for input and output",
      items: ["write", "reason", "code", "explain", "act"],
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {cols.map((c) => (
        <div key={c.n} className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
          <p className="text-[18px] font-bold" style={{ color: T[c.tone].fg }}>
            <span aria-hidden="true">{c.icon}</span> {c.n}
          </p>
          <p className="mt-2 text-[13px] text-[var(--text-primary)]">{c.role}</p>
          <p className="mt-2 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Returns:</strong> {c.gives}</p>
          <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Feels like:</strong> {c.speed}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {c.items.map((x) => (
              <span key={x} className="rounded-full bg-[var(--fig-card)] px-2 py-0.5 text-[11.5px] text-[var(--text-primary)]">{x}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 2. Five ways to wire them together ───────────────────────────────────────

const WAYS: { n: number; t: string; where: string; who: string; body: string; tone: Tone; level: string }[] = [
  { n: 1, t: "The skill", where: "Claude Code writes Jev code", who: "Builders", body: "Install TypeSafe’s plugin and Claude Code learns the API, the primitives and the patterns before it writes a line.", tone: "c", level: "Intermediate" },
  { n: 2, t: "An MCP tool", where: "Claude calls Jev while it works", who: "Power users", body: "A tiny server gives Claude a jev_evaluate tool, so it can ask quick typed questions mid-task.", tone: "v", level: "Intermediate" },
  { n: 3, t: "Hooks & commands", where: "Jev watches Claude Code", who: "Everyone using Claude Code", body: "Before a risky shell command runs, or before a prompt is sent, Jev scores it and your rules decide.", tone: "a", level: "Intermediate" },
  { n: 4, t: "A router", where: "Jev in front of Claude, in your app", who: "App builders", body: "Jev sorts every request first. Easy ones never reach Claude; hard ones reach it with notes.", tone: "g", level: "Advanced" },
  { n: 5, t: "A verifier", where: "Jev after Claude, in your app", who: "App builders", body: "Claude drafts, Jev checks the draft against your policy and facts, code decides: send, redo or escalate.", tone: "r", level: "Advanced" },
];

export function FiveWays() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {WAYS.map((w) => (
        <div key={w.n} className="rounded-[var(--radius)] border p-4 bg-[var(--fig-card)]" style={{ borderColor: T[w.tone].fg }}>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full text-[13px] font-bold" style={{ background: T[w.tone].soft, color: T[w.tone].fg }}>{w.n}</span>
            <p className="text-[15px] font-bold text-[var(--text-primary)]">{w.t}</p>
          </div>
          <p className="mt-2 mono text-[11.5px]" style={{ color: T[w.tone].fg }}>{w.where}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{w.body}</p>
          <p className="mt-2 text-[11.5px] text-[var(--text-tertiary)]">For: {w.who} · {w.level}</p>
        </div>
      ))}
    </div>
  );
}

// ── 3. Which way do I need? ──────────────────────────────────────────────────

export function WhichWay() {
  const Q = ({ children }: { children: ReactNode }) => (
    <div className="rounded-[var(--radius)] border-2 border-[var(--fig-line)] bg-[var(--fig-card)] px-3 py-2 text-[13px] font-semibold text-[var(--text-primary)] text-center">{children}</div>
  );
  const A = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
    <div className="rounded-[var(--radius)] px-3 py-2 text-[12.5px] text-center" style={{ background: T[tone].soft, color: "var(--text-primary)", border: `1.5px solid ${T[tone].fg}` }}>{children}</div>
  );
  const rows: { q: string; yes: ReactNode; tone: Tone }[] = [
    { q: "Do you want Claude Code to build something that uses Jev?", yes: <><strong>Way 1</strong> — install the skill</>, tone: "c" },
    { q: "Do you want Claude to ask Jev quick questions during a task?", yes: <><strong>Way 2</strong> — add an MCP tool</>, tone: "v" },
    { q: "Do you want a safety net on what Claude Code runs or receives?", yes: <><strong>Way 3</strong> — a hook or a slash command</>, tone: "a" },
    { q: "Are you shipping an app where every request hits Claude today?", yes: <><strong>Way 4</strong> — put a Jev router in front</>, tone: "g" },
    { q: "Does Claude write things that must follow rules or facts?", yes: <><strong>Way 5</strong> — verify its drafts with Jev</>, tone: "r" },
  ];
  return (
    <ol className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={r.q} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_15rem] items-center gap-2">
          <Q>
            <span className="mono text-[var(--text-tertiary)] mr-1.5">Q{i + 1}</span>
            {r.q}
          </Q>
          <span className="text-center text-[12px] mono text-[var(--text-tertiary)]" aria-hidden="true">yes →</span>
          <A tone={r.tone}>{r.yes}</A>
        </li>
      ))}
      <li className="pt-1 text-[12.5px] text-[var(--text-secondary)] text-center">No to all? Start with the Playground and come back — most people end up using two or three of these together.</li>
    </ol>
  );
}

// ── 4. How the skill works ───────────────────────────────────────────────────

export function SkillFlow() {
  const nodes = [
    { x: 10, l1: "You", l2: "“use the TypeSafe", l3: "skill to…”", cls: "c-s" },
    { x: 140, l1: "Claude Code", l2: "loads the skill’s", l3: "design rules", cls: "v-s" },
    { x: 270, l1: "Live docs", l2: "reads the API, SDK", l3: "and a cookbook", cls: "a-s" },
    { x: 400, l1: "Plan", l2: "questions and", l3: "thresholds to review", cls: "g-s" },
    { x: 530, l1: "Code", l2: "one call, typed", l3: "answers, fails open", cls: "g-s" },
  ];
  return (
    <Wide min={560}>
      <svg viewBox="0 0 650 180" role="img" aria-labelledby="sf-t">
        <title id="sf-t">How the TypeSafe skill works inside Claude Code. You ask Claude Code to use the skill; it loads TypeSafe’s design rules, reads the live documentation, proposes a plan with the questions and thresholds for you to review, and only then writes code.</title>
        <Arrow id="sf-ar" />
        {nodes.map((n, i) => (
          <g key={n.l1}>
            <rect x={n.x} y="30" width="110" height="90" rx="12" className={n.cls} strokeWidth="1.5" />
            <text x={n.x + 55} y="60" textAnchor="middle" fontSize="13" fontWeight="700" className="t">{n.l1}</text>
            <text x={n.x + 55} y="82" textAnchor="middle" fontSize="10.5" className="t2">{n.l2}</text>
            <text x={n.x + 55} y="97" textAnchor="middle" fontSize="10.5" className="t2">{n.l3}</text>
            {i < nodes.length - 1 && <line x1={n.x + 112} y1="75" x2={n.x + 136} y2="75" className="ln" strokeWidth="1.8" markerEnd="url(#sf-ar)" />}
          </g>
        ))}
        <path d="M 455 122 L 455 146 L 195 146 L 195 126" className="a-ln" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#sf-ar)" />
        <text x="325" y="166" textAnchor="middle" fontSize="11" className="t2">you edit the questions, it tests again</text>
        <text x="325" y="16" textAnchor="middle" fontSize="11" className="t3">the skill is free — only the test calls it makes cost Jev tokens</text>
      </svg>
    </Wide>
  );
}

// ── 5. MCP: how Claude reaches Jev ───────────────────────────────────────────

export function McpSequence() {
  const lanes = [
    { x: 80, l: "Claude", s: "(Code or Desktop)", cls: "v-s" },
    { x: 290, l: "jev MCP server", s: "node, on your Mac", cls: "c-s" },
    { x: 500, l: "TypeSafe API", s: "/v1/systemone", cls: "g-s" },
  ];
  const msgs: { y: number; from: number; to: number; t: string; dash?: boolean }[] = [
    { y: 95, from: 80, to: 290, t: "tools/list → sees jev_evaluate" },
    { y: 135, from: 80, to: 290, t: "tools/call {state, questions}" },
    { y: 175, from: 290, to: 500, t: "POST + Bearer key (from Keychain)" },
    { y: 215, from: 500, to: 290, t: "answers + usage · ~300 ms", dash: true },
    { y: 255, from: 290, to: 80, t: "JSON result + latency_ms", dash: true },
  ];
  return (
    <Wide min={520}>
      <svg viewBox="0 0 580 300" role="img" aria-labelledby="mcp-t">
        <title id="mcp-t">Sequence of an MCP tool call. Claude asks the local jev MCP server which tools it has and sees jev_evaluate. When Claude calls the tool with state and questions, the server adds the API key from the Keychain and posts to TypeSafe’s API. Answers come back in about 300 milliseconds and are returned to Claude as JSON. The key never enters Claude’s context.</title>
        <Arrow id="mcp-ar" />
        {lanes.map((l) => (
          <g key={l.l}>
            <rect x={l.x - 70} y="14" width="140" height="48" rx="10" className={l.cls} strokeWidth="1.5" />
            <text x={l.x} y="35" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">{l.l}</text>
            <text x={l.x} y="52" textAnchor="middle" fontSize="10" className="t2">{l.s}</text>
            <line x1={l.x} y1="64" x2={l.x} y2="290" className="ln" strokeWidth="1" strokeDasharray="3 4" />
          </g>
        ))}
        {msgs.map((m) => (
          <g key={m.t}>
            <line x1={m.from} y1={m.y} x2={m.to + (m.to > m.from ? -4 : 4)} y2={m.y} className="ln" strokeWidth="1.6" strokeDasharray={m.dash ? "5 4" : undefined} markerEnd="url(#mcp-ar)" />
            <text x={(m.from + m.to) / 2} y={m.y - 7} textAnchor="middle" fontSize="10.5" className="t2">{m.t}</text>
          </g>
        ))}
      </svg>
    </Wide>
  );
}

// ── 6. The PreToolUse hook ───────────────────────────────────────────────────

export function HookFlow() {
  return (
    <Wide min={560}>
      <svg viewBox="0 0 640 330" role="img" aria-labelledby="hk-t">
        <title id="hk-t">The Jev guard hook. Before Claude Code runs a Bash command, the hook sends the command to Jev with two questions: is it destructive, and how much could be lost. If Jev is unreachable the hook stays silent and Claude Code’s normal permission rules apply. If the destructive probability is at least 0.7, the blast radius is high, or Jev is unsure, the hook asks you to confirm. Otherwise the normal permission flow continues. The hook never approves anything on its own.</title>
        <Arrow id="hk-ar" />
        <rect x="10" y="20" width="150" height="56" rx="12" className="v-s" strokeWidth="1.5" />
        <text x="85" y="44" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">Claude wants to run</text>
        <text x="85" y="62" textAnchor="middle" fontSize="10.5" className="t2 mono">Bash(command)</text>
        <line x1="162" y1="48" x2="208" y2="48" className="ln" strokeWidth="1.8" markerEnd="url(#hk-ar)" />
        <rect x="212" y="14" width="200" height="68" rx="12" className="c-s" strokeWidth="1.5" />
        <text x="312" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">PreToolUse hook → Jev</text>
        <text x="312" y="54" textAnchor="middle" fontSize="10.5" className="t2">destructive? (Noul)</text>
        <text x="312" y="69" textAnchor="middle" fontSize="10.5" className="t2">blast radius? (Score, 3 levels)</text>
        <line x1="414" y1="48" x2="470" y2="48" className="ln" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#hk-ar)" />
        <rect x="474" y="22" width="156" height="52" rx="12" className="box" strokeWidth="1.2" />
        <text x="552" y="44" textAnchor="middle" fontSize="11.5" fontWeight="600" className="t">no key · timeout · error</text>
        <text x="552" y="61" textAnchor="middle" fontSize="10.5" className="t2">stay silent (fail open)</text>
        <line x1="312" y1="84" x2="312" y2="118" className="ln" strokeWidth="1.8" markerEnd="url(#hk-ar)" />
        <polygon points="312,122 452,170 312,218 172,170" className="a-s" strokeWidth="1.5" />
        <text x="312" y="160" textAnchor="middle" fontSize="11.5" fontWeight="700" className="t">destructive ≥ 0.7</text>
        <text x="312" y="176" textAnchor="middle" fontSize="11" className="t2">or blast ≥ 1.5</text>
        <text x="312" y="191" textAnchor="middle" fontSize="11" className="t2">or Jev unsure?</text>
        <line x1="174" y1="170" x2="120" y2="170" className="ln" strokeWidth="1.8" />
        <line x1="120" y1="170" x2="120" y2="240" className="ln" strokeWidth="1.8" markerEnd="url(#hk-ar)" />
        <text x="140" y="162" textAnchor="middle" fontSize="11" fontWeight="700" className="t">yes</text>
        <rect x="20" y="244" width="200" height="66" rx="12" className="r-s" strokeWidth="1.5" />
        <text x="120" y="268" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">permissionDecision: “ask”</text>
        <text x="120" y="286" textAnchor="middle" fontSize="10.5" className="t2">you see Jev’s numbers</text>
        <text x="120" y="300" textAnchor="middle" fontSize="10.5" className="t2">and confirm or refuse</text>
        <line x1="450" y1="170" x2="520" y2="170" className="ln" strokeWidth="1.8" />
        <line x1="520" y1="170" x2="520" y2="240" className="ln" strokeWidth="1.8" markerEnd="url(#hk-ar)" />
        <text x="486" y="162" textAnchor="middle" fontSize="11" fontWeight="700" className="t">no</text>
        <rect x="410" y="244" width="220" height="66" rx="12" className="g-s" strokeWidth="1.5" />
        <text x="520" y="268" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">no decision</text>
        <text x="520" y="286" textAnchor="middle" fontSize="10.5" className="t2">Claude Code’s normal</text>
        <text x="520" y="300" textAnchor="middle" fontSize="10.5" className="t2">permission rules apply</text>
      </svg>
    </Wide>
  );
}

// ── Probability bars for real results ────────────────────────────────────────

export interface BarRow {
  label: string;
  value: number;
  /** Maximum of the scale: 1 for probabilities, 2 for a 3-level Score. */
  max?: number;
  note: string;
  tone: Tone;
}

export function Bars({ title, rows, footer }: { title: string; rows: BarRow[]; footer?: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
      <p className="text-[13.5px] font-semibold text-[var(--text-primary)] mb-3">{title}</p>
      <ul className="space-y-2.5">
        {rows.map((r) => {
          const pct = Math.max(2, Math.round((r.value / (r.max ?? 1)) * 100));
          return (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                <span className="mono text-[var(--text-primary)]">{r.label}</span>
                <span className="mono tabular-nums font-semibold" style={{ color: T[r.tone].fg }}>
                  {r.value.toFixed(2)}
                  {r.max && r.max !== 1 ? ` / ${r.max}` : ""}
                </span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-[var(--fig-sunk)] overflow-hidden" aria-hidden="true">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: T[r.tone].fg }} />
              </div>
              <p className="mt-0.5 text-[11.5px] text-[var(--text-tertiary)]">{r.note}</p>
            </li>
          );
        })}
      </ul>
      {footer && <div className="mt-3 pt-3 border-t border-[var(--border)] text-[12.5px] text-[var(--text-secondary)]">{footer}</div>}
    </div>
  );
}

// ── 7. The router, as a flowchart ────────────────────────────────────────────

export function RouterFlow() {
  return (
    <Wide min={580}>
      <svg viewBox="0 0 660 300" role="img" aria-labelledby="rf-t">
        <title id="rf-t">A Jev router in front of Claude. A customer message goes to Jev with four questions in one call: intent, needs a written reply, complexity and anger. A confident order-status question that needs no written reply is answered by plain code from the database, with no Claude call. A message with complexity above 1.5 or anger above 0.7 goes to Claude to draft a reply that a person approves. Everything else, including every message when Jev is unavailable, goes to Claude, with Jev’s notes when there are any.</title>
        <Arrow id="rf-ar" />
        <rect x="6" y="115" width="112" height="70" rx="12" className="c-s" strokeWidth="1.5" />
        <text x="62" y="145" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">message</text>
        <text x="62" y="163" textAnchor="middle" fontSize="10.5" className="t2">from a customer</text>
        <line x1="120" y1="150" x2="150" y2="150" className="ln" strokeWidth="1.8" markerEnd="url(#rf-ar)" />
        <rect x="154" y="88" width="178" height="124" rx="14" className="v-s" strokeWidth="2" />
        <text x="243" y="115" textAnchor="middle" fontSize="14" fontWeight="700" className="t">⚡ one Jev call</text>
        <text x="243" y="138" textAnchor="middle" fontSize="10.5" className="t2">intent · Choice</text>
        <text x="243" y="155" textAnchor="middle" fontSize="10.5" className="t2">needs_written_reply · Noul</text>
        <text x="243" y="172" textAnchor="middle" fontSize="10.5" className="t2">complexity · Score</text>
        <text x="243" y="189" textAnchor="middle" fontSize="10.5" className="t2">angry · Noul</text>
        {[
          { y: 8, r1: "plain code", r2: "database lookup · no Claude call", c: "when: order_status (conf ≥ 0.8) and reply < 0.5", cls: "g-s" },
          { y: 108, r1: "Claude drafts, a person approves", r2: "the hard and heated cases", c: "when: complexity > 1.5 or angry > 0.7", cls: "r-s" },
          { y: 208, r1: "Claude replies", r2: "with Jev’s notes, if any", c: "when: everything else — or Jev failed", cls: "a-s" },
        ].map((b) => (
          <g key={b.r1}>
            <line x1="334" y1="150" x2="384" y2={b.y + 42} className="ln" strokeWidth="1.6" markerEnd="url(#rf-ar)" />
            <rect x="388" y={b.y} width="266" height="84" rx="12" className={b.cls} strokeWidth="1.5" />
            <text x="521" y={b.y + 27} textAnchor="middle" fontSize="13" fontWeight="700" className="t">{b.r1}</text>
            <text x="521" y={b.y + 46} textAnchor="middle" fontSize="10.5" className="t2">{b.r2}</text>
            <text x="521" y={b.y + 68} textAnchor="middle" fontSize="10.5" className="t3">{b.c}</text>
          </g>
        ))}
      </svg>
    </Wide>
  );
}

// ── 8. The cascade ───────────────────────────────────────────────────────────

export function Cascade() {
  const steps = [
    { x: 10, l: "Claude Haiku", s: "drafts fast", cls: "c-s" },
    { x: 175, l: "Jev checks", s: "policy · facts · tone", cls: "v-s" },
    { x: 340, l: "Claude Sonnet", s: "redrafts with the flags", cls: "a-s" },
    { x: 505, l: "Jev checks again", s: "still failing → a person", cls: "r-s" },
  ];
  return (
    <Wide min={560}>
      <svg viewBox="0 0 650 190" role="img" aria-labelledby="cs-t">
        <title id="cs-t">A draft-and-verify cascade. A fast Claude model drafts. Jev checks the draft for policy breaks, false statements and tone. If every check passes, the draft is sent. If not, a stronger Claude model redrafts with Jev’s flags, Jev checks again, and anything still failing goes to a person.</title>
        <Arrow id="cs-ar" />
        {steps.map((s, i) => (
          <g key={s.l}>
            <rect x={s.x} y="30" width="135" height="70" rx="12" className={s.cls} strokeWidth="1.5" />
            <text x={s.x + 67} y="60" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">{s.l}</text>
            <text x={s.x + 67} y="79" textAnchor="middle" fontSize="10.5" className="t2">{s.s}</text>
            {i < steps.length - 1 && (
              <>
                <line x1={s.x + 137} y1="65" x2={s.x + 171} y2="65" className="ln" strokeWidth="1.8" markerEnd="url(#cs-ar)" />
                {i % 2 === 1 && <text x={s.x + 154} y="55" textAnchor="middle" fontSize="9.5" className="t3">fail</text>}
              </>
            )}
          </g>
        ))}
        {[175, 505].map((x) => (
          <g key={x}>
            <line x1={x + 67} y1="102" x2={x + 67} y2="140" className="g-ln" strokeWidth="1.8" markerEnd="url(#cs-ar)" />
            <rect x={x + 7} y="144" width="120" height="34" rx="10" className="g-s" strokeWidth="1.2" />
            <text x={x + 67} y="166" textAnchor="middle" fontSize="11.5" fontWeight="700" className="t">pass → send</text>
          </g>
        ))}
      </svg>
    </Wide>
  );
}

// ── 9. Production checklist ──────────────────────────────────────────────────

const CHECKS: { t: string; b: string; tone: Tone }[] = [
  { t: "Pin the version", b: "Send jev-1.13.0, not jev-latest, once thresholds are tuned. Log the model field from every response.", tone: "v" },
  { t: "Fail open", b: "No key, a timeout or a 5xx must leave the feature working — the way it worked before Jev.", tone: "g" },
  { t: "Short leash", b: "A 3–4 s timeout and one retry. A slow router is worse than no router.", tone: "g" },
  { t: "One file of questions", b: "Questions and thresholds in one place, so a person can review the wording.", tone: "a" },
  { t: "Key on the server", b: "Never in a browser bundle. The JS SDK refuses to start with a key in a browser-like runtime.", tone: "r" },
  { t: "Batch, then measure", b: "Every independent question in one call. Watch usage.input_tokens and real latency.", tone: "c" },
  { t: "Escalate, never approve", b: "Let Jev add friction (ask, review, redo). Keep allow-decisions in code or with people.", tone: "r" },
  { t: "Tune on your data", b: "20–50 real examples before trusting any threshold. The ones in this article are starting points.", tone: "a" },
  { t: "Keep Claude’s cache warm", b: "Keep Jev’s notes out of the cached system prompt — in the user turn or a message of their own — so it stays byte-identical.", tone: "v" },
];

export function Checklist() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {CHECKS.map((c) => (
        <div key={c.t} className="rounded-[var(--radius)] border-l-4 bg-[var(--fig-card)] px-3.5 py-3" style={{ borderColor: T[c.tone].fg }}>
          <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">✓ {c.t}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
        </div>
      ))}
    </div>
  );
}

// ── 10. A week-long path ─────────────────────────────────────────────────────

const PATH: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "Day 1", t: "Playground", b: "Paste ten real messages from your work. Write three questions. Watch what comes back.", tone: "c" },
  { d: "Day 2", t: "Key + skill", b: "Save the key safely, install the TypeSafe plugin, ask Claude Code where Jev fits in one project.", tone: "c" },
  { d: "Day 3", t: "MCP tool", b: "Add the jev server to Claude Code and let Claude triage a messy list for you.", tone: "v" },
  { d: "Day 4", t: "A safety net", b: "Install the Bash guard hook or /jev-check. Notice when it speaks up — and when it should have.", tone: "a" },
  { d: "Day 5–6", t: "Router or verifier", b: "Put one call in front of, or behind, a real Claude feature. Fail open. Log everything.", tone: "g" },
  { d: "Day 7", t: "Tune", b: "Label 30 cases, move the thresholds, pin the model version, write down why.", tone: "r" },
];

export function WeekPath() {
  return (
    <ol className="relative ml-2 border-l-2 border-[var(--fig-line)] space-y-4">
      {PATH.map((p) => (
        <li key={p.d} className="relative pl-6">
          <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{ background: T[p.tone].fg }} aria-hidden="true" />
          <p className="mono text-[12px] font-semibold" style={{ color: T[p.tone].fg }}>{p.d}</p>
          <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{p.t}</p>
          <p className="text-[13.5px] leading-snug text-[var(--text-secondary)]">{p.b}</p>
        </li>
      ))}
    </ol>
  );
}
