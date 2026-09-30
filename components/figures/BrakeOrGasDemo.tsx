"use client";

import { useState } from "react";

/**
 * A short sorting game. Each card is a real public act from September 2026,
 * as reported in this article’s sources or our own earlier briefs. The
 * “right” answers are our own judgement, explained on each card; reasonable
 * people can disagree, which is rather the point of the article.
 */

type Answer = "brake" | "gas" | "both";

interface Card {
  id: string;
  act: string;
  answer: Answer;
  why: string;
}

const CARDS: Card[] = [
  { id: "astra", act: "OpenAI scraps GPT-6.1 Astra after it misses the company’s own safety bar.", answer: "brake", why: "A finished frontier model was withheld. This is the clearest cost-bearing brake in the month." },
  { id: "sol", act: "OpenAI releases GPT-6.1 Sol, nearly matching Astra’s intelligence at one-fifth of Astra’s price.", answer: "gas", why: "Near-frontier capability, far cheaper and to far more people. OpenAI also reports safety gains, but the direction of travel is faster and wider." },
  { id: "evals", act: "Anthropic commits to embedded outside evaluators with employee-like access.", answer: "brake", why: "It is the step Amodei calls the key to verifying any pacing promise, and Anthropic took it alone." },
  { id: "price", act: "Anthropic cuts Opus prices by 20% and raises usage limits.", answer: "gas", why: "Cheaper, faster and more generous use pulls more people onto the most capable model." },
  { id: "ipo-o", act: "Altman says an OpenAI IPO now would be “ill-advised”, pushing it to 2027.", answer: "brake", why: "Delaying a listing forgoes money and momentum in the name of safety, whatever else is going on." },
  { id: "ipo-a", act: "Anthropic’s IPO prospectus spends nearly a third of its pages on risk, and could list above $2 trillion.", answer: "both", why: "Unusually candid disclosure sits beside one of the biggest financial prizes in history. Both pedals at once." },
  { id: "muse", act: "Meta launches Muse and says there is no need for industrywide coordination.", answer: "gas", why: "It ships fast and rejects coordination, though it adds a separate ‘Sentinel’ agent to watch Muse." },
  { id: "opus", act: "Opus 5.5 ships “tested before release by external evaluators”, with cyber safeguards.", answer: "both", why: "It is the first release since Anthropic called for pacing, tested by outsiders, and it is also the new flagship, cheaper and faster than before." },
];

const LABEL: Record<Answer, string> = { brake: "Brake", gas: "Gas", both: "Both" };
const COLOR: Record<Answer, { fg: string; soft: string }> = {
  brake: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  gas: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
  both: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
};

export function BrakeOrGasDemo() {
  const [picks, setPicks] = useState<Record<string, Answer>>({});
  const done = Object.keys(picks).length;
  const right = CARDS.filter((c) => picks[c.id] === c.answer).length;

  return (
    <div>
      <ul className="space-y-2.5">
        {CARDS.map((c) => {
          const p = picks[c.id];
          return (
            <li key={c.id} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3.5">
              <p className="text-[13.5px] leading-snug text-[var(--text-primary)]">{c.act}</p>
              {!p ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={`Sort: ${c.act}`}>
                  {(["brake", "gas", "both"] as Answer[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setPicks((prev) => ({ ...prev, [c.id]: a }))}
                      className="rounded-full border px-3 py-1 text-[12.5px] font-semibold text-[var(--text-primary)]"
                      style={{ borderColor: COLOR[a].fg }}
                    >
                      {LABEL[a]}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-2.5 rounded-[var(--radius)] px-3 py-2 text-[12.5px] leading-snug" style={{ background: COLOR[c.answer].soft }} aria-live="polite">
                  <p className="font-bold" style={{ color: COLOR[c.answer].fg }}>
                    {p === c.answer ? "✓ Same as ours: " : `✗ You said ${LABEL[p].toLowerCase()}. We say `}
                    {LABEL[c.answer].toLowerCase()}.
                  </p>
                  <p className="mt-0.5 text-[var(--text-primary)]">{c.why}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[13px] text-[var(--text-primary)]" aria-live="polite">
        {done < CARDS.length ? (
          <>Sorted {done} of {CARDS.length}.</>
        ) : (
          <>
            You matched us on <strong>{right}</strong> of {CARDS.length}. Notice how many acts could honestly go in either pile. That ambiguity is the story.{" "}
            <button type="button" className="underline text-[var(--fig-violet)]" onClick={() => setPicks({})}>Play again</button>
          </>
        )}
      </p>
    </div>
  );
}
