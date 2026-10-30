"use client";

import { useState } from "react";

/**
 * Interactive demo for "AI-made scams in India". The signs are the ones the
 * article draws from the PIB / DoT / TRAI / FTC sources; the verdict wording is
 * the author's rule of thumb, not an official scoring system.
 */
const SIGNS = [
  { id: "secret", label: "Asks you to keep it secret, or stay on the call or video call", weight: 3 },
  { id: "money", label: "Wants money, a transfer, gift cards or crypto right now", weight: 3 },
  { id: "official", label: "Says it is the police, CBI, customs, TRAI/DoT or your bank", weight: 2 },
  { id: "threat", label: "Threatens arrest, a disconnected number or a frozen account", weight: 2 },
  { id: "code", label: "Tells you to dial a code such as *21*… or to read out an OTP", weight: 3 },
  { id: "link", label: "Sends a link or QR code to “settle” or “reschedule”", weight: 1 },
  { id: "voice", label: "The voice or face is familiar, but the request is unusual", weight: 1 },
] as const;

export function ScamStopSign() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const score = SIGNS.reduce((n, s) => n + (on[s.id] ? s.weight : 0), 0);
  const any = Object.values(on).some(Boolean);
  const verdict =
    score >= 3
      ? { t: "Stop. Do not act on this call.", d: "Hang up. Call back on a number you already hold, then tell someone you trust. If money has moved, call 1930 now.", c: "var(--fig-rose)", s: "var(--fig-rose-soft)" }
      : score >= 1
        ? { t: "Pause and verify first.", d: "Nothing here proves a scam, but verify through a number you already hold before you do anything.", c: "var(--fig-amber)", s: "var(--fig-amber-soft)" }
        : { t: "Tick what you were told.", d: "Tick the signs that match the call, message or video call you got.", c: "var(--fig-green)", s: "var(--fig-green-soft)" };
  return (
    <div>
      <ul className="space-y-2">
        {SIGNS.map((s) => (
          <li key={s.id}>
            <label className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0"
                checked={!!on[s.id]}
                onChange={(e) => setOn((p) => ({ ...p, [s.id]: e.target.checked }))}
              />
              <span className="text-[13.5px] leading-snug text-[var(--text-primary)]">{s.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-[var(--radius)] p-4" style={{ background: verdict.s, borderLeft: `4px solid ${verdict.c}` }} aria-live="polite">
        <p className="text-[15px] font-bold" style={{ color: verdict.c }}>{any || score ? verdict.t : "Tick what you were told."}</p>
        <p className="mt-1 text-[13px] leading-snug text-[var(--text-primary)]">{verdict.d}</p>
      </div>
      <p className="mt-3 text-[11.5px] leading-snug text-[var(--text-tertiary)]">
        Illustration: a rule of thumb by the author, not an official test. A call can be a scam with none of these signs. When unsure, verify through a number you already hold.
      </p>
    </div>
  );
}
