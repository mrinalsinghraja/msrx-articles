"use client";

import { useState } from "react";

/**
 * A teaching toy: score an AI use case on likelihood and impact and see which
 * tier and treatment it lands in. The 5×5 scale, the bands and the two
 * “bump up” rules are our own illustration, not part of NIST, ISO, the EU AI
 * Act or any other standard. Real programmes tune these to their own risk
 * appetite.
 */

interface Preset {
  id: string;
  label: string;
  likelihood: number;
  impact: number;
  rights: boolean;
  autonomous: boolean;
}

const PRESETS: Preset[] = [
  { id: "spam", label: "Spam filter for staff email", likelihood: 3, impact: 1, rights: false, autonomous: false },
  { id: "notes", label: "Meeting-notes summariser", likelihood: 3, impact: 2, rights: false, autonomous: false },
  { id: "chat", label: "Customer chatbot that quotes policy", likelihood: 3, impact: 4, rights: false, autonomous: false },
  { id: "cv", label: "CV-screening tool for hiring", likelihood: 3, impact: 4, rights: true, autonomous: false },
  { id: "agent", label: "Agent that buys supplies on its own", likelihood: 2, impact: 4, rights: false, autonomous: true },
];

const LEVELS = ["Rare", "Unlikely", "Possible", "Likely", "Almost certain"];
const IMPACTS = ["Negligible", "Minor", "Moderate", "Major", "Severe"];

function band(score: number) {
  if (score >= 17) return { name: "Critical", fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)", action: "Do not launch until the risk is reduced. Escalate to leadership." };
  if (score >= 10) return { name: "High", fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)", action: "Needs named-owner sign-off, tested controls and monitoring before launch." };
  if (score >= 5) return { name: "Medium", fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)", action: "Add sensible controls; review on a schedule." };
  return { name: "Low", fg: "var(--fig-green)", soft: "var(--fig-green-soft)", action: "Accept, list in the inventory, and watch for change." };
}

const ORDER = ["Low", "Medium", "High", "Critical"];

export function RiskScorerDemo() {
  const [p, setP] = useState<Preset>(PRESETS[2]);
  const score = p.likelihood * p.impact;
  const base = band(score);
  // Illustrative rule: systems that touch people’s rights, or act alone, never rate below High.
  const bumped = (p.rights || p.autonomous) && ORDER.indexOf(base.name) < ORDER.indexOf("High");
  const final = bumped ? band(12) : base;
  const tier = p.rights || p.autonomous ? "Tier 1" : p.impact >= 3 ? "Tier 2" : "Tier 3";

  const set = (patch: Partial<Preset>) => setP((prev) => ({ ...prev, ...patch, id: "custom" }));

  return (
    <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-4">
        <fieldset>
          <legend className="text-[13px] font-semibold text-[var(--text-primary)] mb-1.5">Start from an example</legend>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setP(x)}
                aria-pressed={p.id === x.id}
                className="rounded-full border px-2.5 py-1 text-[12px] text-[var(--text-primary)]"
                style={{ borderColor: p.id === x.id ? "var(--fig-violet)" : "var(--border)", background: p.id === x.id ? "var(--fig-violet-soft)" : "var(--fig-card)" }}
              >
                {x.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block text-[13px] text-[var(--text-primary)]">
          <span className="font-semibold">How likely is a harmful failure?</span>
          <span className="ml-2 mono text-[12px] text-[var(--fig-violet)]">{p.likelihood} · {LEVELS[p.likelihood - 1]}</span>
          <input type="range" min={1} max={5} step={1} value={p.likelihood} onChange={(e) => set({ likelihood: Number(e.target.value) })} className="mt-1.5 w-full accent-[var(--fig-violet)]" />
        </label>
        <label className="block text-[13px] text-[var(--text-primary)]">
          <span className="font-semibold">How bad is it if it happens?</span>
          <span className="ml-2 mono text-[12px] text-[var(--fig-violet)]">{p.impact} · {IMPACTS[p.impact - 1]}</span>
          <input type="range" min={1} max={5} step={1} value={p.impact} onChange={(e) => set({ impact: Number(e.target.value) })} className="mt-1.5 w-full accent-[var(--fig-violet)]" />
        </label>
        <label className="flex items-start gap-2 text-[13px] text-[var(--text-primary)]">
          <input type="checkbox" checked={p.rights} onChange={(e) => set({ rights: e.target.checked })} className="mt-0.5 accent-[var(--fig-violet)]" />
          <span>It affects people’s rights, safety, money or access to services</span>
        </label>
        <label className="flex items-start gap-2 text-[13px] text-[var(--text-primary)]">
          <input type="checkbox" checked={p.autonomous} onChange={(e) => set({ autonomous: e.target.checked })} className="mt-0.5 accent-[var(--fig-violet)]" />
          <span>It can act on its own, without a person approving each action</span>
        </label>
      </div>

      <div aria-live="polite" className="rounded-[var(--radius)] border-2 p-4 self-start" style={{ borderColor: final.fg, background: final.soft }}>
        <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Result on our example scale</p>
        <p className="mt-1 text-[22px] font-bold" style={{ color: final.fg }}>{final.name} risk</p>
        <p className="mt-1 text-[13px] text-[var(--text-primary)]">
          {p.likelihood} × {p.impact} = <strong>{score}</strong> out of 25{bumped && <> — raised to High because the system touches rights or acts alone</>}.
        </p>
        <p className="mt-2 text-[13px]"><strong>Suggested tier:</strong> {tier}</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-primary)]">{final.action}</p>
        <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Our illustration of a risk matrix, not a standard. Bands: 1–4 Low, 5–9 Medium, 10–16 High, 17–25 Critical.</p>
      </div>
    </div>
  );
}
