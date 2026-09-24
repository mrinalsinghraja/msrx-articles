"use client";

import { useState } from "react";

/**
 * "Which Claude is right for me?" — two quick choices, one recommendation.
 * Plain lookup in the browser; nothing is sent or stored.
 */

type Goal = "chat" | "files" | "web" | "code" | "build";
type Where = "desk" | "phone" | "both";

const GOALS: { id: Goal; label: string }[] = [
  { id: "chat", label: "💬 Ask, write, learn" },
  { id: "files", label: "📄 Work with my documents" },
  { id: "web", label: "🧭 Get things done on websites" },
  { id: "code", label: "⌨️ Write and fix code" },
  { id: "build", label: "⚙️ Build Claude into my own app" },
];

const WHERE: { id: Where; label: string }[] = [
  { id: "desk", label: "🖥️ Mostly at a computer" },
  { id: "phone", label: "📱 Mostly on my phone" },
  { id: "both", label: "🔁 Both" },
];

const RECS: Record<Goal, { use: string; first: string; model: string; plan: string }> = {
  chat: {
    use: "The Claude apps: claude.ai in your browser or the desktop app",
    first: "Open claude.ai, sign in, and ask for help with one real task you have today.",
    model: "The default model is fine; switch up for hard reasoning.",
    plan: "Free to start",
  },
  files: {
    use: "A Project in the Claude apps, plus connectors for Drive, Gmail or Calendar",
    first: "Create a Project, upload your key files, and write two lines of instructions.",
    model: "Default model; turn on Research for multi-source, cited reports.",
    plan: "Free to start; Projects and Research need Pro",
  },
  web: {
    use: "Claude in Chrome — Claude in your browser’s side panel",
    first: "Install the extension, open a site, and give Claude a small chore to try.",
    model: "Default model. It asks before important actions — stay in charge of payments.",
    plan: "Paid plans",
  },
  code: {
    use: "Claude Code — in your terminal, VS Code or JetBrains, the desktop app, or on the web",
    first: "Install it, open your project, run `claude`, then `/init` to create CLAUDE.md.",
    model: "Opus 5.5 is the usual starting point for coding work.",
    plan: "Pro, Max, Team or Enterprise, or an API account",
  },
  build: {
    use: "The Claude API with the official SDK",
    first: "Get an API key at platform.claude.com, `pip install anthropic`, and send your first message.",
    model: "Start with claude-opus-5-5; try claude-sonnet-5 or claude-haiku-4-5 where speed and cost matter more.",
    plan: "Pay per token",
  },
};

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
        on
          ? "border-[var(--fig-amber)] bg-[var(--fig-amber-soft)] text-[var(--text-primary)] font-medium"
          : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--paper-tint)]"
      }`}
    >
      {children}
    </button>
  );
}

export function ClaudeChooser() {
  const [goal, setGoal] = useState<Goal>("chat");
  const [where, setWhere] = useState<Where>("both");
  const rec = RECS[goal];

  const phoneNote =
    where === "desk"
      ? null
      : goal === "code" || goal === "build"
        ? "On your phone, the Claude app still helps you think, plan and review on the go — and your chats sync with the computer."
        : "Install the Claude app for iPhone or Android: same account, same chats, plus voice mode and your camera.";

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-4">Which Claude is right for me?</p>

      <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-2">1. What do you mostly want to do?</p>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Goal">
        {GOALS.map((g) => (
          <Chip key={g.id} on={goal === g.id} onClick={() => setGoal(g.id)}>{g.label}</Chip>
        ))}
      </div>
      <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-2">2. Where will you use it?</p>
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Device">
        {WHERE.map((w) => (
          <Chip key={w.id} on={where === w.id} onClick={() => setWhere(w.id)}>{w.label}</Chip>
        ))}
      </div>

      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-amber)] bg-[var(--fig-amber-soft)] p-4" aria-live="polite">
        <p className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--fig-amber)] font-semibold mb-1">Your starting point</p>
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">{rec.use}</p>
        <dl className="mt-3 grid sm:grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 text-[13.5px]">
          <dt className="text-[var(--text-tertiary)]">First step</dt>
          <dd className="text-[var(--text-primary)]">{rec.first}</dd>
          <dt className="text-[var(--text-tertiary)]">Model</dt>
          <dd className="text-[var(--text-primary)]">{rec.model}</dd>
          <dt className="text-[var(--text-tertiary)]">Access</dt>
          <dd className="text-[var(--text-primary)]">{rec.plan}</dd>
          {phoneNote && (
            <>
              <dt className="text-[var(--text-tertiary)]">On mobile</dt>
              <dd className="text-[var(--text-primary)]">{phoneNote}</dd>
            </>
          )}
        </dl>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">Plan names and what they include change over time; check claude.com/pricing for today’s details.</p>
    </div>
  );
}
