"use client";

import { useId, useState } from "react";

/**
 * Three hands-on demos for "Agentic AI 101", all computed in the browser.
 * The agent trace is a scripted illustration, not a live model.
 */

// ── Watch an agent work ──────────────────────────────────────────────────────

type Step = { kind: "think" | "act" | "observe" | "ask" | "done"; text: string };

const TRACE: Step[] = [
  { kind: "think", text: "Goal: reschedule Friday’s dentist appointment to next week, any evening after 6 pm. First, find the current booking." },
  { kind: "act", text: "search_email(query=\"dentist appointment confirmation\")" },
  { kind: "observe", text: "Found: “SmileCare Clinic — Fri 25 Sep, 5:30 pm, Dr Rao. Reschedule at smilecare.example/book”." },
  { kind: "think", text: "I need free evenings next week. Check the calendar before looking at slots." },
  { kind: "act", text: "check_calendar(from=\"2026-09-28\", to=\"2026-10-02\", after=\"18:00\")" },
  { kind: "observe", text: "Free after 6 pm: Mon 28, Wed 30, Thu 1 Oct. Busy Tue (badminton), Fri (dinner)." },
  { kind: "act", text: "open_page(\"smilecare.example/book\") → list_slots(doctor=\"Dr Rao\")" },
  { kind: "observe", text: "Evening slots: Mon 6:30 pm, Wed 7:00 pm. Thu fully booked." },
  { kind: "think", text: "Two options fit. Changing a booking affects the user — ask before acting, and suggest the earlier one." },
  { kind: "ask", text: "“Dr Rao has Mon 28 Sep at 6:30 pm or Wed 30 Sep at 7:00 pm. Shall I move it to Monday?”" },
  { kind: "observe", text: "User: “Monday works.”" },
  { kind: "act", text: "reschedule(booking=\"SC-4471\", slot=\"2026-09-28T18:30\") → add_to_calendar(…)" },
  { kind: "done", text: "Moved to Mon 28 Sep, 6:30 pm with Dr Rao, added to your calendar, and saved the clinic’s confirmation email." },
];

const STYLE: Record<Step["kind"], { label: string; color: string; soft: string; icon: string }> = {
  think: { label: "Think", color: "var(--fig-violet)", soft: "var(--fig-violet-soft)", icon: "💭" },
  act: { label: "Act", color: "var(--fig-amber)", soft: "var(--fig-amber-soft)", icon: "🛠️" },
  observe: { label: "Observe", color: "var(--fig-green)", soft: "var(--fig-green-soft)", icon: "👀" },
  ask: { label: "Ask human", color: "var(--fig-rose)", soft: "var(--fig-rose-soft)", icon: "✋" },
  done: { label: "Done", color: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)", icon: "✅" },
};

export function TraceStepper() {
  const [n, setN] = useState(1);
  const shown = TRACE.slice(0, n);
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Watch an agent work, step by step</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-4">Task: <span className="mono text-[var(--text-primary)]">“Move my dentist appointment to an evening next week.”</span> A scripted illustration of a real agent loop.</p>

      <ol className="space-y-1.5 !pl-0 !list-none" aria-live="polite">
        {shown.map((s, i) => {
          const st = STYLE[s.kind];
          return (
            <li key={i} className="!mt-1.5 grid grid-cols-[6.5rem_1fr] gap-2 items-start rounded-lg border px-2.5 py-2" style={{ borderColor: st.color, background: st.soft }}>
              <span className="mono text-[11px] font-semibold pt-0.5" style={{ color: st.color }}>{st.icon} {st.label}</span>
              <span className={`text-[12.5px] leading-snug text-[var(--text-primary)] ${s.kind === "act" ? "mono text-[11.5px]" : ""}`}>{s.text}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setN(Math.max(1, n - 1))} disabled={n <= 1} className="rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-[13px] text-[var(--text-secondary)] disabled:opacity-40">← Back</button>
        <button type="button" onClick={() => setN(Math.min(TRACE.length, n + 1))} disabled={n >= TRACE.length} className="msrx-gradient rounded-lg px-4 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40">Next step →</button>
        <button type="button" onClick={() => setN(TRACE.length)} className="rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-[13px] text-[var(--text-secondary)]">Show all</button>
        <span className="mono text-[12px] text-[var(--text-tertiary)] ml-auto">step {n} / {TRACE.length}</span>
      </div>
    </div>
  );
}

// ── Why reliability compounds ────────────────────────────────────────────────

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <label htmlFor={id} className="text-[13px] font-medium text-[var(--text-primary)]">{label}</label>
        <output htmlFor={id} className="mono text-[12.5px] text-[var(--text-secondary)]">{fmt(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-input" />
    </div>
  );
}

export function ReliabilityCalc() {
  const [p, setP] = useState(0.95);
  const [steps, setSteps] = useState(20);
  const [catchRate, setCatchRate] = useState(0.8);

  const plain = p ** steps;
  // With a checkpoint after every step: an error is caught with probability catchRate and retried once.
  const perStepChecked = p + (1 - p) * catchRate * p;
  const checked = perStepChecked ** steps;

  const Bar = ({ v, c, label }: { v: number; c: string; label: string }) => (
    <div>
      <div className="flex justify-between text-[13px]">
        <span className="text-[var(--text-primary)]">{label}</span>
        <span className="mono font-semibold" style={{ color: c }}>{(v * 100).toFixed(1)}%</span>
      </div>
      <div className="mt-1 h-3 rounded bg-[var(--paper-sunk)] overflow-hidden" aria-hidden="true">
        <div className="h-full rounded transition-[width] duration-150" style={{ width: `${v * 100}%`, background: c }} />
      </div>
    </div>
  );

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Why long tasks fail — and how checks help</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-5">If every step must go right, small error rates multiply.</p>

      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-4">
        <Slider label="Chance each step is right" value={p} min={0.8} max={0.999} step={0.001} onChange={setP} fmt={(v) => `${(v * 100).toFixed(1)}%`} />
        <Slider label="Steps in the task" value={steps} min={1} max={100} step={1} onChange={setSteps} fmt={(v) => String(v)} />
        <Slider label="Errors a checkpoint catches" value={catchRate} min={0} max={1} step={0.05} onChange={setCatchRate} fmt={(v) => `${Math.round(v * 100)}%`} />
      </div>

      <div className="mt-6 space-y-3" aria-live="polite">
        {Bar({ v: plain, c: "var(--fig-rose)", label: "Whole task right, no checks" })}
        {Bar({ v: checked, c: "var(--fig-green)", label: "Whole task right, with a check and one retry per step" })}
      </div>
      <div className="mt-4 rounded-[var(--radius)] bg-[var(--paper-tint)] px-4 py-3">
        <p className="math text-[14px]">P(success) = p<sup>n</sup> = {p.toFixed(3)}<sup>{steps}</sup> = {plain.toFixed(3)}</p>
        <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">
          Try 95% per step and 20 steps: barely one run in three succeeds. That is why good agents verify as they go, ask for help at risky moments, and keep tasks short.
        </p>
      </div>
    </div>
  );
}

// ── Agent or workflow? ───────────────────────────────────────────────────────

const CRITERIA = [
  { id: "complex", q: "Is the task hard to write down as fixed steps in advance?", hint: "e.g. “fix this bug” vs “copy the total into the sheet”" },
  { id: "value", q: "Is getting it done worth extra cost and waiting?", hint: "agents make many model calls" },
  { id: "capable", q: "Can today’s AI actually do this kind of task well?", hint: "try it by hand with a chatbot first" },
  { id: "recoverable", q: "Can mistakes be caught and undone?", hint: "tests, review, drafts, undo" },
] as const;

export function AgentOrNot() {
  const [ans, setAns] = useState<Record<string, boolean>>({ complex: true, value: true, capable: true, recoverable: false });
  const allYes = CRITERIA.every((c) => ans[c.id]);
  const noComplex = !ans.complex;
  const verdict = allYes
    ? { t: "✅ A good fit for an agent", b: "Let the model plan its own steps — but start supervised, with approval gates and a budget.", c: "var(--fig-green)", s: "var(--fig-green-soft)" }
    : noComplex
      ? { t: "🔁 Use a workflow instead", b: "If you can write the steps down, write them in code and use AI only for the judgments and writing inside them. Cheaper, faster, more predictable.", c: "var(--fig-cyan)", s: "var(--fig-cyan-soft)" }
      : { t: "⏸ Not yet — keep a human in charge", b: "An agent could try, but a mistake would be costly, the value is low, or AI isn’t reliable here yet. Use AI to assist a person instead.", c: "var(--fig-amber)", s: "var(--fig-amber-soft)" };

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-4">Should this be an agent?</p>
      <ul className="space-y-2 !pl-0 !list-none">
        {CRITERIA.map((c) => (
          <li key={c.id} className="!mt-2 flex items-start gap-3 rounded-lg border border-[var(--border)] px-3 py-2">
            <div className="flex-1">
              <p className="text-[13.5px] text-[var(--text-primary)]">{c.q}</p>
              <p className="text-[11.5px] text-[var(--text-tertiary)]">{c.hint}</p>
            </div>
            <div className="flex gap-1 shrink-0" role="group" aria-label={c.q}>
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={ans[c.id] === v}
                  onClick={() => setAns({ ...ans, [c.id]: v })}
                  className="rounded-md border px-2.5 py-1 text-[12.5px]"
                  style={{
                    borderColor: ans[c.id] === v ? (v ? "var(--fig-green)" : "var(--fig-rose)") : "var(--border-strong)",
                    background: ans[c.id] === v ? (v ? "var(--fig-green-soft)" : "var(--fig-rose-soft)") : "transparent",
                    color: "var(--text-primary)",
                  }}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-[var(--radius)] border-2 p-4" style={{ borderColor: verdict.c, background: verdict.s }} aria-live="polite">
        <p className="text-[15px] font-semibold text-[var(--text-primary)]">{verdict.t}</p>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{verdict.b}</p>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">Based on common guidance from AI labs: reach for an agent only when the task is complex, valuable, feasible and its errors are recoverable.</p>
    </div>
  );
}
