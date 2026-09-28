"use client";

import { useState } from "react";

/**
 * "What does the Sentinel do with this?" — an illustration of the approval
 * rules Meta describes for Muse (research.meta.ai, 8 September 2026): read-only,
 * already-allowed or demonstrably low-risk actions flow; anything that sends,
 * spends or moves your data out asks you; some things are filtered or blocked
 * outright. This is our simplified model of the published description, not
 * Meta’s code, and the real system weighs more signals than shown here.
 */

type Verdict = "allow" | "ask" | "block";

interface Action {
  id: string;
  label: string;
  verdict: Verdict;
  why: string;
}

const ACTIONS: Action[] = [
  { id: "read-cal", label: "Read my calendar to spot a clash", verdict: "allow", why: "Read-only, on a connector you already allowed. Meta says read-only and previously allowed actions proceed without interrupting you." },
  { id: "search", label: "Look up train times on a public website", verdict: "allow", why: "Ordinary browsing from a process that hasn’t read your private data is the kind of clean, low-risk request that can be auto-allowed." },
  { id: "send-email", label: "Send an email to my child’s school", verdict: "ask", why: "Sending is hard to undo and others will see it. Meta lists sending an email as a sensitive action that needs your approval." },
  { id: "buy", label: "Buy the sweatshirt in the cart (₹1,899)", verdict: "ask", why: "Every purchase gets an approval card showing the exact total. The card Muse pays with is valid only for this shop, this amount and a short time." },
  { id: "upload", label: "Upload my bank statement to a website", verdict: "ask", why: "The process has read your private data, so it is “tainted”: it loses auto-approval and anything it sends out waits for you." },
  { id: "otp", label: "Read the one-time login code in my inbox", verdict: "block", why: "The email connector filters out one-time codes, password-reset links and login links, so a tricked agent can’t use your inbox to get into your other accounts." },
  { id: "bad-site", label: "Open a site known for scams", verdict: "block", why: "Meta matches navigation against its list of known harmful sites, inside your VM, and stops the browser going there." },
];

const DECLINED = "declined";
const GRANTS = ["Just this once", "For this session", "For this task", "For a set time", "Always"];

const STYLE: Record<Verdict, { label: string; fg: string; soft: string; icon: string }> = {
  allow: { label: "Goes ahead", fg: "var(--fig-green)", soft: "var(--fig-green-soft)", icon: "✓" },
  ask: { label: "Asks you first", fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)", icon: "✋" },
  block: { label: "Blocked or filtered", fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)", icon: "⛔" },
};

export function MuseApprovalDemo() {
  const [picked, setPicked] = useState<string>("send-email");
  const [grant, setGrant] = useState<string | null>(null);
  const a = ACTIONS.find((x) => x.id === picked) ?? ACTIONS[0];
  const s = STYLE[a.verdict];

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4">
      <fieldset className="space-y-1.5">
        <legend className="text-[13px] font-semibold text-[var(--text-primary)] mb-2">Muse wants to…</legend>
        {ACTIONS.map((x) => (
          <label
            key={x.id}
            className="flex items-start gap-2.5 rounded-[var(--radius)] border px-3 py-2 cursor-pointer text-[13px] leading-snug bg-[var(--fig-card)]"
            style={{ borderColor: x.id === picked ? "var(--fig-violet)" : "var(--border)" }}
          >
            <input
              type="radio"
              name="muse-action"
              value={x.id}
              checked={x.id === picked}
              onChange={() => {
                setPicked(x.id);
                setGrant(null);
              }}
              className="mt-0.5 accent-[var(--fig-violet)]"
            />
            <span className="text-[var(--text-primary)]">{x.label}</span>
          </label>
        ))}
      </fieldset>

      <div aria-live="polite" className="rounded-[var(--radius)] border-2 p-4 self-start" style={{ borderColor: s.fg, background: s.soft }}>
        <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Sentinel</p>
        <p className="mt-1 text-[18px] font-bold" style={{ color: s.fg }}>
          <span aria-hidden="true">{s.icon}</span> {s.label}
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-primary)]">{a.why}</p>

        {a.verdict === "ask" && (
          <div className="mt-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <p className="text-[12.5px] font-semibold text-[var(--text-primary)]">Approval card in the app — not in the chat</p>
            <p className="mt-0.5 text-[12px] text-[var(--text-secondary)]">{a.label}</p>
            {grant ? (
              <p className="mt-3 text-[13px] text-[var(--text-primary)]">
                {grant === DECLINED ? (
                  <>Declined. Nothing is sent or spent, and Muse carries on with the rest of the task.</>
                ) : (
                  <>Approved <strong>{grant.toLowerCase()}</strong>. The permission covers exactly this kind of action and nothing wider.</>
                )}{" "}
                <button type="button" className="underline text-[var(--fig-violet)]" onClick={() => setGrant(null)}>Undo</button>
              </p>
            ) : (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {GRANTS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrant(g)}
                    className="rounded-full border border-[var(--fig-green)] px-2.5 py-1 text-[12px] text-[var(--text-primary)] hover:bg-[var(--fig-green-soft)]"
                  >
                    {g}
                  </button>
                ))}
                <button type="button" onClick={() => setGrant(DECLINED)} className="rounded-full border border-[var(--fig-rose)] px-2.5 py-1 text-[12px] text-[var(--text-primary)] hover:bg-[var(--fig-rose-soft)]">
                  Decline
                </button>
              </div>
            )}
          </div>
        )}
        <p className="mt-4 text-[11.5px] text-[var(--text-tertiary)]">Illustration of Meta’s published rules, not Meta’s code. Which grant choices you see depends on the action.</p>
      </div>
    </div>
  );
}
