"use client";

import { useState } from "react";

/**
 * GRPO in miniature. A "group" of six sampled answers to one maths question
 * gets rule-based rewards; each answer's advantage is its reward relative to
 * the group: (r − mean) / std. Positive advantage → that answer's style is
 * made more likely; negative → less likely. Everything is computed here in
 * the browser from the toggles; the answers are made up for illustration.
 */

type Sample = { text: string; correct: boolean; formatted: boolean };

const INITIAL: Sample[] = [
  { text: "17×24 = 17×20 + 17×4 = 340 + 68 = 408. <answer>408</answer>", correct: true, formatted: true },
  { text: "17×24 is about 400. <answer>400</answer>", correct: false, formatted: true },
  { text: "408", correct: true, formatted: false },
  { text: "17×25 = 425, minus one 17 = 408. <answer>408</answer>", correct: true, formatted: true },
  { text: "24×10 + 24×7 = 240 + 158 = 398. <answer>398</answer>", correct: false, formatted: true },
  { text: "The answer is 418.", correct: false, formatted: false },
];

export function GrpoSimulator() {
  const [samples, setSamples] = useState<Sample[]>(INITIAL);
  const [formatReward, setFormatReward] = useState(true);

  const rewards = samples.map((s) => (s.correct ? 1 : 0) + (formatReward && s.formatted ? 0.2 : 0));
  const mean = rewards.reduce((a, r) => a + r, 0) / rewards.length;
  const std = Math.sqrt(rewards.reduce((a, r) => a + (r - mean) ** 2, 0) / rewards.length);
  const adv = rewards.map((r) => (std > 1e-9 ? (r - mean) / std : 0));
  const noSignal = std <= 1e-9;

  const toggle = (i: number) =>
    setSamples(samples.map((s, j) => (j === i ? { ...s, correct: !s.correct } : s)));

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Train a reasoner with GRPO</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-4">
        The model answers <span className="mono text-[var(--text-primary)]">“What is 17 × 24?”</span> six times. Each answer is scored, then compared with the group. Click an answer to flip whether it’s correct.
      </p>

      <label className="flex items-center gap-2 text-[13px] text-[var(--text-primary)] mb-4 cursor-pointer">
        <input type="checkbox" checked={formatReward} onChange={(e) => setFormatReward(e.target.checked)} className="accent-[var(--violet-deep)] w-4 h-4" />
        Also reward the right format (<code>&lt;answer&gt;…&lt;/answer&gt;</code>) — +0.2
      </label>

      <ul className="space-y-2 !pl-0 !list-none">
        {samples.map((s, i) => {
          const a = adv[i];
          const width = Math.min(50, Math.abs(a) * 25);
          return (
            <li key={i} className="!mt-2">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full text-left grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_4.5rem_9rem] gap-x-3 gap-y-1 items-center rounded-lg border px-3 py-2 hover:bg-[var(--paper-tint)]"
                style={{ borderColor: s.correct ? "var(--fig-green)" : "var(--fig-rose)" }}
                aria-label={`Answer ${i + 1}, ${s.correct ? "correct" : "wrong"}. Click to flip.`}
              >
                <span className="mono text-[12px] text-[var(--text-primary)] break-words">
                  <span style={{ color: s.correct ? "var(--fig-green)" : "var(--fig-rose)" }}>{s.correct ? "✓" : "✗"}</span> {s.text}
                </span>
                <span className="mono text-[12px] text-right text-[var(--text-secondary)]">r = {rewards[i].toFixed(1)}</span>
                <span className="col-span-2 sm:col-span-1 relative h-4 rounded bg-[var(--paper-sunk)]" aria-hidden="true">
                  <span className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--fig-line)]" />
                  <span
                    className="absolute top-0 bottom-0 rounded transition-all duration-150"
                    style={{
                      left: a >= 0 ? "50%" : `${50 - width}%`,
                      width: `${width}%`,
                      background: a >= 0 ? "var(--fig-green)" : "var(--fig-rose)",
                    }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-[var(--radius)] bg-[var(--paper-tint)] px-4 py-3 text-[13.5px] text-[var(--text-primary)]" aria-live="polite">
        <p className="math text-[14px]">
          group mean = {mean.toFixed(2)} · std = {std.toFixed(2)} · advantage Aᵢ = (rᵢ − mean) / std
        </p>
        <p className="mt-1.5">
          {noSignal
            ? "Every answer scored the same, so every advantage is zero: the model learns nothing from this group. GRPO needs variety — some better, some worse."
            : "Green bars: these answers get reinforced, so similar reasoning becomes more likely. Red bars: pushed down. No separate “critic” model is needed — the group is the baseline."}
        </p>
      </div>
    </div>
  );
}
