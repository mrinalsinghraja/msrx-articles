"use client";

import { useState } from "react";

/**
 * "Same question, different person" — shows how Microsoft 365 Copilot only
 * grounds answers in content the asker can already open. A fictional company
 * and fictional files; the logic is a plain permission filter in the browser.
 */

type Person = "intern" | "manager" | "hr";

const PEOPLE: { id: Person; name: string; role: string }[] = [
  { id: "intern", name: "Kabir", role: "Marketing intern" },
  { id: "manager", name: "Meera", role: "Sales manager" },
  { id: "hr", name: "Farhan", role: "HR business partner" },
];

const FILES: { name: string; icon: string; access: Person[] }[] = [
  { name: "Travel policy 2026.pdf", icon: "📄", access: ["intern", "manager", "hr"] },
  { name: "Offsite agenda — Goa.docx", icon: "📝", access: ["intern", "manager", "hr"] },
  { name: "Sales team budget FY27.xlsx", icon: "📊", access: ["manager", "hr"] },
  { name: "Offsite headcount & costs.xlsx", icon: "📊", access: ["manager", "hr"] },
  { name: "Leave records — all staff.xlsx", icon: "🔒", access: ["hr"] },
];

const ANSWERS: Record<Person, string> = {
  intern:
    "The Goa offsite runs 14–16 November. Per the travel policy, economy flights are booked by the travel desk and you can claim ₹1,500 a day for meals. I can’t see budget or headcount details for the event.",
  manager:
    "The Goa offsite runs 14–16 November. Your team has 9 people confirmed, and the offsite line in the FY27 sales budget has ₹3.2 lakh left after bookings. Economy flights, ₹1,500 a day for meals.",
  hr:
    "The Goa offsite runs 14–16 November with 64 people confirmed company-wide. Three confirmed attendees have approved leave overlapping those dates — worth checking with their managers. Budget and travel rules as per policy.",
};

export function PermissionDemo() {
  const [who, setWho] = useState<Person>("intern");
  const person = PEOPLE.find((p) => p.id === who)!;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <p className="eyebrow text-[var(--text-tertiary)] mb-1">Playground</p>
      <p className="display-sm text-[19px] text-[var(--text-primary)] mb-1">Same question, different person</p>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-4">
        Everyone asks Microsoft 365 Copilot: <span className="mono text-[var(--text-primary)]">“What do I need to know about the Goa offsite?”</span> Pick who is asking.
      </p>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Who is asking">
        {PEOPLE.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={who === p.id}
            onClick={() => setWho(p.id)}
            className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              who === p.id
                ? "border-[var(--fig-cyan)] bg-[var(--fig-cyan-soft)] text-[var(--text-primary)] font-medium"
                : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--paper-tint)]"
            }`}
          >
            {p.name} · {p.role}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-[1fr_1.2fr] gap-4">
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">Files Copilot may use</p>
          <ul className="space-y-1.5 !pl-0 !list-none">
            {FILES.map((f) => {
              const ok = f.access.includes(who);
              return (
                <li
                  key={f.name}
                  className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[12.5px] transition-opacity"
                  style={{
                    borderColor: ok ? "var(--fig-green)" : "var(--border)",
                    background: ok ? "var(--fig-green-soft)" : "transparent",
                    opacity: ok ? 1 : 0.45,
                  }}
                >
                  <span aria-hidden="true">{f.icon}</span>
                  <span className="flex-1 text-[var(--text-primary)]">{f.name}</span>
                  <span className="text-[11px]" style={{ color: ok ? "var(--fig-green)" : "var(--text-tertiary)" }}>{ok ? "✓ can open" : "✗ no access"}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--paper-tint)] p-4" aria-live="polite">
          <p className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">Copilot’s answer for {person.name}</p>
          <p className="text-[14px] leading-relaxed text-[var(--text-primary)]">{ANSWERS[who]}</p>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">
        A fictional company. The rule it shows is real: Copilot grounds answers only in what the signed-in person could already open — so tidy permissions matter more than ever.
      </p>
    </div>
  );
}
