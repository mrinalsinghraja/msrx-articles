"use client";

import { useId, useState } from "react";

/**
 * Hands-on prompt builder for "ChatGPT 101". Assembles the six ingredients
 * into one prompt the reader can copy. Runs entirely in the browser: nothing
 * typed here is sent anywhere or stored.
 */

type Key = "role" | "task" | "context" | "format" | "examples" | "limits";

const FIELDS: { key: Key; label: string; hint: string; color: string }[] = [
  { key: "role", label: "Role", hint: "Who should it be?", color: "var(--fig-cyan)" },
  { key: "task", label: "Task", hint: "What exactly do you want?", color: "var(--fig-violet)" },
  { key: "context", label: "Context", hint: "What does it need to know?", color: "var(--fig-amber)" },
  { key: "format", label: "Format", hint: "What shape should the answer take?", color: "var(--fig-green)" },
  { key: "examples", label: "Examples", hint: "What does good look like?", color: "var(--fig-rose)" },
  { key: "limits", label: "Limits", hint: "What should it avoid?", color: "var(--fig-cyan)" },
];

const PRESETS: Record<string, Record<Key, string>> = {
  "Study help": {
    role: "You are a patient chemistry tutor for Class 11 students.",
    task: "Explain how ionic and covalent bonds differ, then quiz me with 5 questions one at a time.",
    context: "I have an exam next week and I mix these two up. I learn best from everyday examples.",
    format: "A short explanation (under 150 words), a comparison table, then the questions.",
    examples: "Everyday example style I like: “table salt is ionic, like two magnets snapping together.”",
    limits: "Don’t give the answer until I reply. Tell me if I’m wrong and why.",
  },
  "Work email": {
    role: "You are a clear, polite business writer.",
    task: "Write an email asking a supplier to confirm a revised delivery date.",
    context: "The order is #4512 for 200 office chairs. They missed 15 May; we need them by 28 May for a site opening.",
    format: "Subject line plus a 4–6 sentence email.",
    examples: "",
    limits: "Firm but friendly. No threats, no exclamation marks.",
  },
  "Trip plan": {
    role: "You are a local travel planner who knows Northeast India well.",
    task: "Plan a 4-day trip to Meghalaya.",
    context: "Two adults in their 60s, travelling in November, flying into Guwahati. We like nature, dislike long treks.",
    format: "Day-by-day table: morning, afternoon, evening, travel time. Then a packing list.",
    examples: "",
    limits: "Max 3 hours in a car per day. Flag anything that needs booking in advance.",
  },
  Blank: { role: "", task: "", context: "", format: "", examples: "", limits: "" },
};

export function PromptBuilder() {
  const [vals, setVals] = useState<Record<Key, string>>(PRESETS["Study help"]);
  const [copied, setCopied] = useState(false);
  const baseId = useId();

  const filled = FIELDS.filter((f) => vals[f.key].trim().length > 0);
  const prompt = FIELDS.map((f) => vals[f.key].trim())
    .filter(Boolean)
    .join("\n\n");
  const missing = FIELDS.filter((f) => !vals[f.key].trim()).map((f) => f.label);
  const words = prompt ? prompt.split(/\s+/).length : 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Build a prompt, ingredient by ingredient</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-4">Pick a starting example or start blank. Nothing you type leaves this page.</p>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Starting examples">
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setVals(PRESETS[name])}
            className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--paper-tint)]"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {FIELDS.map((f) => {
          const id = `${baseId}-${f.key}`;
          return (
            <div key={f.key}>
              <label htmlFor={id} className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-[13px] font-semibold" style={{ color: f.color }}>{f.label}</span>
                <span className="text-[11.5px] text-[var(--text-tertiary)]">{f.hint}</span>
              </label>
              <textarea
                id={id}
                rows={2}
                value={vals[f.key]}
                onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                className="w-full resize-y rounded-lg border border-[var(--border-strong)] bg-[var(--paper)] px-3 py-2 text-[13.5px] leading-snug text-[var(--text-primary)]"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex gap-1" aria-hidden="true">
          {FIELDS.map((f) => (
            <span key={f.key} className="w-6 h-2 rounded-full" style={{ background: vals[f.key].trim() ? f.color : "var(--paper-sunk)" }} />
          ))}
        </div>
        <p className="text-[13px] text-[var(--text-secondary)]" aria-live="polite">
          <strong className="text-[var(--text-primary)]">{filled.length}/6</strong> ingredients · {words} words
          {missing.length > 0 && missing.length < 6 && <> · missing: {missing.join(", ")}</>}
        </p>
      </div>

      <div className="mt-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
          <span className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Your prompt</span>
          <button
            type="button"
            onClick={copy}
            disabled={!prompt}
            className="msrx-gradient rounded-lg px-3 py-1 text-[12.5px] font-semibold text-white disabled:opacity-40"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <pre className="whitespace-pre-wrap p-3 text-[13px] leading-relaxed text-[var(--text-primary)] font-[inherit] min-h-[4rem]">
          {prompt || "Fill in a field to start."}
        </pre>
      </div>
      <p className="mt-3 text-[12.5px] text-[var(--text-tertiary)]">
        Not every prompt needs all six. A quick question needs only a task. But when an answer disappoints, the fix is almost always a missing ingredient — usually context.
      </p>
    </div>
  );
}
