"use client";

import { useId, useState } from "react";

/**
 * "Will it fit?" — a rough token estimate for mixed media against a
 * 1-million-token context window. Rates are approximations drawn from Google's
 * published guidance (about 1,500 pages or an hour of video per million
 * tokens; 32 tokens per second of audio) and are labelled as estimates.
 */

const WINDOW = 1_000_000;

const INPUTS = [
  { key: "pages", label: "📄 Pages of text (PDFs, books)", max: 3000, step: 50, per: 667, unit: "pages", color: "var(--fig-cyan)" },
  { key: "video", label: "🎞️ Minutes of video", max: 120, step: 5, per: 300 * 60, unit: "min", color: "var(--fig-violet)" },
  { key: "audio", label: "🎧 Minutes of audio", max: 600, step: 10, per: 32 * 60, unit: "min", color: "var(--fig-amber)" },
  { key: "code", label: "💻 Lines of code", max: 60000, step: 1000, per: 30, unit: "lines", color: "var(--fig-green)" },
] as const;

type Key = (typeof INPUTS)[number]["key"];

export function ContextCalculator() {
  const [vals, setVals] = useState<Record<Key, number>>({ pages: 300, video: 10, audio: 60, code: 5000 });
  const baseId = useId();

  const parts = INPUTS.map((i) => ({ ...i, tokens: vals[i.key] * i.per }));
  const total = parts.reduce((a, p) => a + p.tokens, 0);
  const pct = (total / WINDOW) * 100;
  const fits = total <= WINDOW;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Will it fit in one prompt?</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-5">Drag the sliders to mix your material and see roughly how much of a 1-million-token context window it uses.</p>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {INPUTS.map((i) => {
          const id = `${baseId}-${i.key}`;
          return (
            <div key={i.key}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <label htmlFor={id} className="text-[13.5px] font-medium text-[var(--text-primary)]">{i.label}</label>
                <output htmlFor={id} className="mono text-[12.5px] text-[var(--text-secondary)]">{vals[i.key].toLocaleString("en-IN")}</output>
              </div>
              <input
                id={id}
                type="range"
                min={0}
                max={i.max}
                step={i.step}
                value={vals[i.key]}
                onChange={(e) => setVals({ ...vals, [i.key]: Number(e.target.value) })}
                className="range-input"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="relative flex h-6 rounded-lg overflow-hidden bg-[var(--paper-sunk)]" aria-hidden="true">
          {parts.map((p) => (
            <span key={p.key} style={{ width: `${Math.min(100, (p.tokens / Math.max(WINDOW, total)) * 100)}%`, background: p.color }} className="h-full transition-[width] duration-150" />
          ))}
          {!fits && <span className="absolute top-0 bottom-0 border-l-2 border-dashed border-[var(--text-primary)]" style={{ left: `${(WINDOW / total) * 100}%` }} />}
        </div>
        <p className="mt-3 text-[15px] text-[var(--text-primary)]" aria-live="polite">
          ≈ <strong>{Math.round(total).toLocaleString("en-IN")}</strong> tokens — {pct.toFixed(0)}% of the window.{" "}
          {fits ? (
            <span className="text-[var(--fig-green)] font-semibold">✓ Fits in one go.</span>
          ) : (
            <span className="text-[var(--fig-rose)] font-semibold">✗ Too big — split it, summarise first, or search it with retrieval.</span>
          )}
        </p>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">
        Rough estimates: ~667 tokens per page, ~300 per second of video, 32 per second of audio, ~30 per line of code. Real counts depend on language, resolution and the model; the API can count tokens exactly.
      </p>
    </div>
  );
}
