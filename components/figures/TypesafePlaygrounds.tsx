"use client";

import { useId, useState } from "react";

/**
 * Two hands-on demos for the TypeSafe article, computed in the browser.
 * Jev's price ($0.042 per million input tokens, output free) is from
 * docs.typesafe.ai/models on 24 September 2026. The "big LLM" prices are an
 * editable assumption, and the threshold data is fictional.
 */

const JEV_PER_M = 0.042;

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt?: (v: number) => string }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <label htmlFor={id} className="text-[13px] font-medium text-[var(--text-primary)]">{label}</label>
        <output htmlFor={id} className="mono text-[12.5px] text-[var(--text-secondary)]">{fmt ? fmt(value) : value.toLocaleString("en-IN")}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-input" />
    </div>
  );
}

const money = (v: number) => (v >= 100 ? `$${Math.round(v).toLocaleString("en-US")}` : v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(4)}`);

// ── Batching and cost ────────────────────────────────────────────────────────

export function BatchCalculator() {
  const [doc, setDoc] = useState(11000);
  const [n, setN] = useState(13);
  const [q, setQ] = useState(55);
  const [perDay, setPerDay] = useState(1000);
  const [llmIn, setLlmIn] = useState(5);
  const [llmOut, setLlmOut] = useState(30);

  const separate = n * (doc + q);
  const batched = doc + n * q;
  const month = perDay * 30;
  const jevSep = (separate * month * JEV_PER_M) / 1e6;
  const jevBatch = (batched * month * JEV_PER_M) / 1e6;
  const llm = ((batched * llmIn + n * 30 * llmOut) * month) / 1e6;

  const rows = [
    { n: "Big LLM, all questions in one prompt", v: llm, c: "var(--fig-rose)" },
    { n: "Jev, one call per question", v: jevSep, c: "var(--fig-amber)" },
    { n: "Jev, all questions batched", v: jevBatch, c: "var(--fig-green)" },
  ];
  const max = Math.max(...rows.map((r) => r.v));

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">What does it cost per month?</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-5">The defaults match TypeSafe’s GDPR batching cookbook: an ~11,000-token document and 13 questions.</p>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        <Slider label="Document size (tokens)" value={doc} min={100} max={50000} step={100} onChange={setDoc} />
        <Slider label="Questions per document" value={n} min={1} max={30} step={1} onChange={setN} />
        <Slider label="Tokens per question" value={q} min={10} max={300} step={5} onChange={setQ} />
        <Slider label="Documents per day" value={perDay} min={10} max={100000} step={10} onChange={setPerDay} />
        <Slider label="Big-LLM input price ($ per M tokens)" value={llmIn} min={0.1} max={20} step={0.1} onChange={setLlmIn} fmt={(v) => `$${v.toFixed(1)}`} />
        <Slider label="Big-LLM output price ($ per M tokens)" value={llmOut} min={0.4} max={80} step={0.2} onChange={setLlmOut} fmt={(v) => `$${v.toFixed(1)}`} />
      </div>

      <ul className="mt-6 space-y-2.5 !pl-0 !list-none" aria-live="polite">
        {rows.map((r) => (
          <li key={r.n} className="!mt-2.5">
            <div className="flex justify-between gap-3 text-[13px]">
              <span className="text-[var(--text-primary)]">{r.n}</span>
              <span className="mono font-semibold text-[var(--text-primary)]">{money(r.v)}</span>
            </div>
            <div className="mt-1 h-3 rounded bg-[var(--paper-sunk)] overflow-hidden" aria-hidden="true">
              <div className="h-full rounded transition-[width] duration-150" style={{ width: `${Math.max(0.6, (r.v / max) * 100)}%`, background: r.c }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13.5px] text-[var(--text-primary)]">
        Batching sends <strong>{batched.toLocaleString("en-IN")}</strong> tokens per document instead of <strong>{separate.toLocaleString("en-IN")}</strong> —{" "}
        <strong className="text-[var(--fig-green)]">{(separate / batched).toFixed(1)}× fewer</strong>.
      </p>
      <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">
        Jev: $0.042 per million input tokens, output free (TypeSafe’s models page, Sept 2026). The big-LLM line assumes ~30 output tokens per answer at the prices you set — an assumption, not a quote.
      </p>
    </div>
  );
}

// ── Threshold tuner ──────────────────────────────────────────────────────────

// 24 fictional support messages: Jev's noul for "asks for a refund", and whether it really did.
const CASES: { p: number; truth: boolean }[] = [
  { p: 0.99, truth: true }, { p: 0.98, truth: true }, { p: 0.97, truth: true }, { p: 0.96, truth: true },
  { p: 0.94, truth: true }, { p: 0.92, truth: true }, { p: 0.9, truth: false }, { p: 0.88, truth: true },
  { p: 0.85, truth: true }, { p: 0.81, truth: false }, { p: 0.78, truth: true }, { p: 0.74, truth: false },
  { p: 0.7, truth: true }, { p: 0.62, truth: false }, { p: 0.55, truth: true }, { p: 0.51, truth: false },
  { p: 0.45, truth: false }, { p: 0.38, truth: false }, { p: 0.3, truth: true }, { p: 0.22, truth: false },
  { p: 0.12, truth: false }, { p: 0.06, truth: false }, { p: 0.03, truth: false }, { p: 0.01, truth: false },
];

export function ThresholdTuner() {
  const [t, setT] = useState(0.8);
  const auto = CASES.filter((c) => c.p >= t);
  const wrong = auto.filter((c) => !c.truth).length;
  const human = CASES.length - auto.length;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Set a threshold on your own data</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-4">
        24 test messages, each with Jev’s Noul for <span className="mono text-[var(--text-primary)]">“customer asks for a refund”</span>. At or above the threshold, the app acts automatically; below it, a person reviews.
      </p>

      <Slider label="Auto-act threshold" value={t} min={0.5} max={0.99} step={0.01} onChange={setT} fmt={(v) => v.toFixed(2)} />

      <div className="mt-4 flex flex-wrap gap-1.5" aria-hidden="true">
        {CASES.map((c, i) => {
          const isAuto = c.p >= t;
          return (
            <span
              key={i}
              title={`noul ${c.p} · ${c.truth ? "really a refund request" : "not a refund request"}`}
              className="mono text-[11px] rounded-md px-1.5 py-1 border"
              style={{
                borderColor: isAuto ? (c.truth ? "var(--fig-green)" : "var(--fig-rose)") : "var(--border)",
                background: isAuto ? (c.truth ? "var(--fig-green-soft)" : "var(--fig-rose-soft)") : "var(--paper-tint)",
                color: "var(--text-primary)",
              }}
            >
              {c.p.toFixed(2)} {c.truth ? "✓" : "✗"}
            </span>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center" aria-live="polite">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--paper-tint)] p-2">
          <p className="mono text-[20px] font-bold text-[var(--fig-green)]">{auto.length}</p>
          <p className="text-[11.5px] text-[var(--text-secondary)]">handled automatically</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--paper-tint)] p-2">
          <p className="mono text-[20px] font-bold" style={{ color: wrong ? "var(--fig-rose)" : "var(--fig-green)" }}>{wrong}</p>
          <p className="text-[11.5px] text-[var(--text-secondary)]">automatic mistakes</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--paper-tint)] p-2">
          <p className="mono text-[20px] font-bold text-[var(--text-primary)]">{human}</p>
          <p className="text-[11.5px] text-[var(--text-secondary)]">sent to a person</p>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">
        Fictional data. Raise the threshold and mistakes fall but people do more work; lower it and the reverse. The right setting depends on what a mistake costs you — which is why you tune it on your own examples.
      </p>
    </div>
  );
}
