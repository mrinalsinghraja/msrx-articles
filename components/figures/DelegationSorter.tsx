"use client";

import { useState } from "react";

/**
 * A short sorting game: which jobs would you hand to an agent, which would you
 * do together, and which would you keep? The "right" answers are our own
 * judgement, explained on each card. Reasonable people can disagree, which is
 * part of the point. It is loosely inspired by the modes Microsoft describes
 * (delegation, collaboration), but the tasks and answers are ours.
 */

type Answer = "delegate" | "team" | "keep";

interface Card {
  id: string;
  task: string;
  answer: Answer;
  why: string;
}

const CARDS: Card[] = [
  { id: "emails", task: "Draft first replies to thirty routine customer emails.", answer: "delegate", why: "Routine, repetitive and easy to check. Let the agent draft; you skim and send." },
  { id: "offer", task: "Decide whether to accept a job offer.", answer: "keep", why: "An agent can research the company and list pros and cons, but the choice depends on your life, and it is yours." },
  { id: "quotes", task: "Compare five insurance quotes and list the differences.", answer: "delegate", why: "Read-only, tedious and well defined. Ask it to quote the clauses so you can verify the important ones." },
  { id: "message", task: "Write a message to a friend who has just lost someone.", answer: "keep", why: "The value is that it comes from you. An agent might help you find the first words, but the words should be yours." },
  { id: "trip", task: "Plan a family trip: places, timings, options for rain.", answer: "team", why: "It can build the skeleton in minutes, but only you know that your mother hates long drives. Go back and forth." },
  { id: "payment", task: "Approve a large payment to a new supplier.", answer: "keep", why: "Money leaving your account is exactly where a human gate belongs. The agent can prepare the file and flag oddities." },
  { id: "report", task: "Summarise a 60-page report and list the open questions.", answer: "delegate", why: "A classic hand-off. Skim the source for the two or three claims that matter most." },
  { id: "names", task: "Come up with names for a new product.", answer: "team", why: "Agents are good at producing many options fast; taste is yours. Keep asking until something sparks." },
  { id: "contract", task: "Sign a contract.", answer: "keep", why: "Read it with help if you like, but the signature is a personal act with legal weight." },
  { id: "meetings", task: "Find a time across five people’s calendars and send the invite.", answer: "delegate", why: "Coordination is where agents shine, so long as they show you the proposed slot before sending." },
];

const LABEL: Record<Answer, string> = { delegate: "Hand it over", team: "Team up", keep: "Keep it" };
const COLOR: Record<Answer, { fg: string; soft: string }> = {
  delegate: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  team: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  keep: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

export function DelegationSorter() {
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
              <p className="text-[13.5px] leading-snug text-[var(--text-primary)]">{c.task}</p>
              {!p ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={`Sort: ${c.task}`}>
                  {(["delegate", "team", "keep"] as Answer[]).map((a) => (
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
                <div className="mt-2.5 rounded-[var(--radius)] p-2.5 text-[12.5px] leading-snug" style={{ background: COLOR[c.answer].soft, border: `1px solid ${COLOR[c.answer].fg}` }} aria-live="polite">
                  <p className="font-bold" style={{ color: COLOR[c.answer].fg }}>
                    {p === c.answer ? "✓ Same as ours" : `You chose “${LABEL[p]}”. Ours: “${LABEL[c.answer]}”`}
                    {p === c.answer ? `: ${LABEL[c.answer]}` : ""}
                  </p>
                  <p className="mt-1 text-[var(--text-primary)]">{c.why}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[12.5px]">
        <span className="text-[var(--text-secondary)]">
          {done === 0 ? "Sort each job, then read our reasoning." : done < CARDS.length ? `${done} of ${CARDS.length} sorted, ${right} the same as ours.` : `All sorted: ${right} of ${CARDS.length} the same as ours. Disagreeing is fine; the useful part is the why.`}
        </span>
        {done > 0 && (
          <button type="button" onClick={() => setPicks({})} className="rounded-full border border-[var(--border)] px-3 py-1 font-semibold text-[var(--text-primary)]">
            Start again
          </button>
        )}
      </div>
    </div>
  );
}
