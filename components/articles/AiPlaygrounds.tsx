"use client";

import { useId, useState } from "react";

/**
 * Two small hands-on demos for the AI article. Everything is computed in the
 * browser from the numbers on screen: no model, no network, nothing stored.
 */

// ── A single artificial neuron ───────────────────────────────────────────────
// Should I take an umbrella? Two inputs, two weights, a bias, a sigmoid.

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <label htmlFor={id} className="text-[13.5px] font-medium text-[var(--text-primary)]">
          {label}
        </label>
        <output htmlFor={id} className="mono text-[13px] text-[var(--text-secondary)]">
          {value.toFixed(step < 1 ? 1 : 0)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-input"
      />
      {hint && <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">{hint}</p>}
    </div>
  );
}

export function NeuronPlayground() {
  const [clouds, setClouds] = useState(0.7); // x1: how cloudy, 0..1
  const [forecast, setForecast] = useState(0.4); // x2: forecast chance of rain, 0..1
  const [w1, setW1] = useState(3);
  const [w2, setW2] = useState(4);
  const [b, setB] = useState(-3);

  const z = w1 * clouds + w2 * forecast + b;
  const y = sigmoid(z);
  const take = y >= 0.5;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 not-prose">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-5">One neuron: “Should I take an umbrella?”</p>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        <div className="space-y-4">
          <p className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--fig-cyan)]">Inputs (the world)</p>
          <Slider label="x₁ · How cloudy is it?" value={clouds} min={0} max={1} step={0.1} onChange={setClouds} hint="0 = clear sky, 1 = dark clouds" />
          <Slider label="x₂ · Forecast says rain" value={forecast} min={0} max={1} step={0.1} onChange={setForecast} hint="0 = 0 %, 1 = 100 %" />
        </div>
        <div className="space-y-4">
          <p className="mono text-[11px] tracking-[0.12em] uppercase text-[var(--fig-violet)]">Parameters (what training learns)</p>
          <Slider label="w₁ · Trust in clouds" value={w1} min={-6} max={6} step={0.5} onChange={setW1} />
          <Slider label="w₂ · Trust in forecast" value={w2} min={-6} max={6} step={0.5} onChange={setW2} />
          <Slider label="b · Bias (how lazy you are)" value={b} min={-6} max={6} step={0.5} onChange={setB} />
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius)] bg-[var(--paper-tint)] px-4 py-4">
        <p className="math text-[15px] overflow-x-auto whitespace-nowrap">
          z = {w1.toFixed(1)}·{clouds.toFixed(1)} + {w2.toFixed(1)}·{forecast.toFixed(1)} + ({b.toFixed(1)}) ={" "}
          <strong>{z.toFixed(2)}</strong>
          &nbsp;&nbsp;→&nbsp;&nbsp;σ(z) = <strong>{y.toFixed(3)}</strong>
        </p>
        <div className="mt-3 h-2.5 rounded-full bg-[var(--paper-sunk)] overflow-hidden" aria-hidden="true">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{ width: `${(y * 100).toFixed(1)}%`, background: take ? "var(--fig-cyan)" : "var(--fig-amber)" }}
          />
        </div>
        <p className="mt-3 text-[15px] text-[var(--text-primary)]" aria-live="polite">
          {take ? "☂️ Take the umbrella" : "😎 Leave it at home"}{" "}
          <span className="text-[var(--text-tertiary)]">— the neuron is {(y * 100).toFixed(0)} % sure it will rain.</span>
        </p>
      </div>
      <p className="mt-3 text-[12.5px] text-[var(--text-tertiary)]">
        Drag w₂ below zero and the neuron starts <em>distrusting</em> the forecast. Training is nothing more than nudging these three knobs, millions of times, until the answers stop being wrong.
      </p>
    </div>
  );
}

// ── Temperature and next-token sampling ──────────────────────────────────────
// Fixed, made-up logits for the prompt below. The point is the shape of the
// softmax as temperature changes, not the particular numbers.

const PROMPT = "The cat sat on the";
const CANDIDATES: { token: string; logit: number }[] = [
  { token: "mat", logit: 4.1 },
  { token: "sofa", logit: 3.2 },
  { token: "floor", logit: 3.0 },
  { token: "keyboard", logit: 2.2 },
  { token: "roof", logit: 1.6 },
  { token: "moon", logit: 0.2 },
];

function softmax(logits: number[], t: number): number[] {
  const scaled = logits.map((l) => l / t);
  const m = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - m));
  const sum = exps.reduce((a, e) => a + e, 0);
  return exps.map((e) => e / sum);
}

export function TemperatureDemo() {
  const [t, setT] = useState(1);
  const [samples, setSamples] = useState<string[]>([]);
  const probs = softmax(
    CANDIDATES.map((c) => c.logit),
    t,
  );

  const sample = () => {
    const picks: string[] = [];
    for (let n = 0; n < 8; n++) {
      let r = Math.random();
      let chosen = CANDIDATES[CANDIDATES.length - 1].token;
      for (let i = 0; i < probs.length; i++) {
        r -= probs[i];
        if (r <= 0) {
          chosen = CANDIDATES[i].token;
          break;
        }
      }
      picks.push(chosen);
    }
    setSamples(picks);
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Turn the temperature knob</p>
      <p className="text-[14px] text-[var(--text-secondary)] mb-5">
        Prompt: <span className="mono text-[var(--text-primary)]">“{PROMPT} ___”</span>. The bars are the model’s probability for each next word.
      </p>

      <Slider label="Temperature (T)" value={t} min={0.1} max={2.5} step={0.1} onChange={setT} hint="Low = safe and repetitive · High = creative and chaotic" />

      <ul className="mt-5 space-y-2">
        {CANDIDATES.map((c, i) => (
          <li key={c.token} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3">
            <span className="mono text-[13px] text-[var(--text-primary)] truncate">{c.token}</span>
            <span className="h-5 rounded-md bg-[var(--paper-sunk)] overflow-hidden" aria-hidden="true">
              <span
                className="block h-full rounded-md transition-[width] duration-150"
                style={{ width: `${(probs[i] * 100).toFixed(1)}%`, background: "linear-gradient(90deg, var(--grad-a), var(--grad-b))" }}
              />
            </span>
            <span className="mono text-[12.5px] text-right text-[var(--text-secondary)]">{(probs[i] * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={sample}
          className="msrx-gradient rounded-xl px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Sample 8 completions
        </button>
        <p className="text-[14px] text-[var(--text-secondary)]" aria-live="polite">
          {samples.length > 0 ? samples.join(" · ") : "Press to let the model “write”."}
        </p>
      </div>
      <p className="mt-4 text-[12.5px] text-[var(--text-tertiary)]">
        Math: p<sub>i</sub> = e<sup>z<sub>i</sub>/T</sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub>/T</sup>. Dividing the scores by a small T exaggerates the gaps (the top word wins almost always); a large T flattens them (even “moon” gets a turn).
      </p>
    </div>
  );
}
