import type { ReactNode } from "react";
import { RUN1, RUN2, TRIAGE, MASK_DEMO } from "./scam-judge-data";

/**
 * Figures for "Can an AI model tell a scam from a real message?".
 *
 * Every number in RUN1, RUN2, TRIAGE and MASK_DEMO was produced on 30 October
 * 2026 by components/figures/scam-judge-data.ts, which is generated from the
 * real runs (rule engine = msrx-security src/lib/tools/scam.ts run locally;
 * Jev answers = POST https://security.msrx.co.in/api/scam and /api/triage).
 * The test messages are written by the author, modelled on public advisories;
 * they are not real victims' messages. Anything marked "illustration" is ours.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

type Verdict = "scam" | "suspicious" | "no-signs";
const VERDICT_TONE: Record<Verdict, Tone> = { scam: "r", suspicious: "a", "no-signs": "g" };
const VERDICT_LABEL: Record<Verdict, string> = { scam: "scam", suspicious: "suspicious", "no-signs": "no signs" };

/** Mirrors decide() in msrx-security src/lib/tools/scam.ts. Used only to draw Fig. 9. */
function decideView(rules: number, jev: number | null): Verdict {
  if (jev !== null) {
    if (jev >= 0.85 || (jev >= 0.6 && rules >= 50)) return "scam";
    if (jev >= 0.4 || rules >= 50) return "suspicious";
    if (rules >= 25) return "suspicious";
    return "no-signs";
  }
  if (rules >= 60) return "scam";
  if (rules >= 25) return "suspicious";
  return "no-signs";
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[11.5px] leading-snug text-[var(--text-tertiary)]">{children}</p>;
}

function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="mono inline-block rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] whitespace-nowrap" style={{ color: T[tone].fg, background: T[tone].soft }}>
      {children}
    </span>
  );
}

function Card({ tone, title, children, tag }: { tone: Tone; title: string; children: ReactNode; tag?: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4" style={{ borderTop: `3px solid ${T[tone].fg}` }}>
      {tag && <div className="mb-2"><Chip tone={tone}>{tag}</Chip></div>}
      <p className="text-[14.5px] font-bold leading-snug text-[var(--text-primary)] mb-1.5">{title}</p>
      <div className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}

function Big({ tone, value, label, sub }: { tone: Tone; value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4 text-center">
      <p className="display text-[26px] sm:text-[30px] leading-none" style={{ color: T[tone].fg }}>{value}</p>
      <p className="mt-2 text-[13px] font-semibold text-[var(--text-primary)] leading-snug">{label}</p>
      {sub && <p className="mt-1 text-[11.5px] text-[var(--text-tertiary)] leading-snug">{sub}</p>}
    </div>
  );
}

const Arrow = () => (
  <span className="hidden sm:flex items-center justify-center text-[var(--fig-faint)] text-[20px]" aria-hidden="true">→</span>
);

// ── Fig 1: the pipeline ─────────────────────────────────────────────────────
export function TwoLayers() {
  return (
    <div>
      <div className="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-stretch">
        <Card tone="c" tag="Step 1" title="You paste a message">
          The text stays in your browser. The rule layer runs right there, on your own device.
        </Card>
        <Arrow />
        <div className="grid gap-3">
          <Card tone="v" tag="Layer A · rules" title="Pattern checks">
            About two dozen written-down scam scripts and a link inspector. Runs offline, instantly, free.
          </Card>
          <Card tone="a" tag="Layer B · judgment" title="Jev, only if you ask">
            Numbers, e-mails and UPI IDs are hidden first, then five questions go to the server in one request.
          </Card>
        </div>
        <Arrow />
        <Card tone="g" tag="Step 3" title="decide() in plain code">
          Combines the two numbers with fixed thresholds. Its three outcomes are scam, suspicious and “no signs”. There is no “safe”.
        </Card>
      </div>
      <Note>Illustration of the flow in src/lib/tools/scam.ts, src/lib/scamjev.ts and src/app/api/scam/route.ts. Neither layer depends on the other: if Jev is off, the rules still answer.</Note>
    </div>
  );
}

// ── Fig 2: a rule score, worked ─────────────────────────────────────────────
const ARREST_SIGNALS = [
  { name: "parcel-illegal", w: 38 },
  { name: "authority", w: 35 },
  { name: "payment-pretext", w: 35 },
  { name: "stay-on-call", w: 30 },
];
export function RuleScoreSum() {
  const rows = ARREST_SIGNALS.map((s, i) => ({ ...s, i, part: s.w * Math.pow(0.7, i) }));
  const total = rows.reduce((a, r) => a + r.part, 0);
  return (
    <div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[7.5rem_1fr_3.2rem] sm:grid-cols-[9rem_1fr_4.5rem] items-center gap-2 text-[12.5px]">
            <span className="mono text-[var(--text-secondary)] truncate">{r.name}</span>
            <div className="h-5 rounded bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden" role="img" aria-label={`${r.name}: weight ${r.w}, counts for ${r.part.toFixed(1)}`}>
              <div className="h-full" style={{ width: `${(r.part / 40) * 100}%`, background: T.v.fg }} />
            </div>
            <span className="mono text-right text-[var(--text-primary)]">{r.part.toFixed(1)}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13.5px] text-[var(--text-primary)]">
        <strong>38 + 35×0.7 + 35×0.7² + 30×0.7³ = {total.toFixed(1)} → rounded {Math.round(total)}</strong> (capped at 100)
      </p>
      <Note>Recomputed from the weights in scam.ts for the “digital arrest” test message in Fig. 6. Each signal counts 0.7 times as much as the one before it, strongest first, so a pile of small hints cannot shout down one serious one.</Note>
    </div>
  );
}

// ── Fig 3: sentence-level negation ──────────────────────────────────────────
const NEG_ROWS = [
  { text: "Rs 1,250.00 debited from HDFC Bank A/c XX1234 on 29-10-26 to VPA shop@okhdfcbank.", note: "No “share”-type verb next to a secret word. Nothing fires.", tone: "g" as Tone, tag: "no match" },
  { text: "If this was not done by you, call 18002586161.", note: "No secret asked for. Nothing fires.", tone: "g" as Tone, tag: "no match" },
  { text: "Never share your OTP or PIN with anyone, including bank staff.", note: "Matches the OTP pattern, but the sentence contains “never”, so the rule skips it.", tone: "v" as Tone, tag: "skipped: negated" },
];
export function NegationSplit() {
  return (
    <div>
      <div className="space-y-2.5">
        {NEG_ROWS.map((r) => (
          <div key={r.text} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 grid sm:grid-cols-[1fr_11rem] gap-2 items-start">
            <div>
              <p className="mono text-[12px] leading-snug text-[var(--text-primary)]">{r.text}</p>
              <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">{r.note}</p>
            </div>
            <div className="sm:text-right"><Chip tone={r.tone}>{r.tag}</Chip></div>
          </div>
        ))}
      </div>
      <Note>The genuine-style debit alert from the real run of 30 October 2026, split the way sentences() in scam.ts splits it. Result: rule score 0.</Note>
    </div>
  );
}

// ── Fig 4: the five questions ───────────────────────────────────────────────
const QUESTIONS = [
  { id: "scam", type: "noul", tone: "r" as Tone, ask: "Is the message an attempt to deceive the reader into handing over money, login details, an OTP or PIN, documents, remote access, or into installing something?", out: "probability, 0 to 1" },
  { id: "kind", type: "choice", tone: "v" as Tone, ask: "Which fraud script does it follow? Ten options, from phishing_credentials to not_a_scam.", out: "one option + confidence" },
  { id: "pressure", type: "noul", tone: "a" as Tone, ask: "Does it use urgency, fear or a deadline to push the reader to act before thinking?", out: "probability" },
  { id: "secret", type: "noul", tone: "a" as Tone, ask: "Does it ask the reader to share or enter an OTP, PIN, password, CVV, card, Aadhaar or PAN number, or a code?", out: "probability" },
  { id: "impersonation", type: "noul", tone: "a" as Tone, ask: "Does it claim to come from a bank, a government body, a courier, a known company or an authority?", out: "probability" },
];
export function FiveQuestions() {
  return (
    <div>
      <div className="space-y-2">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 grid sm:grid-cols-[8rem_1fr_9rem] gap-2 items-center">
            <div className="flex items-center gap-2"><span className="mono text-[12.5px] font-bold text-[var(--text-primary)]">{q.id}</span><Chip tone={q.tone}>{q.type}</Chip></div>
            <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{q.ask}</p>
            <p className="mono text-[11.5px] text-[var(--text-tertiary)] sm:text-right">{q.out}</p>
          </div>
        ))}
      </div>
      <Note>Paraphrased from the questions in src/lib/scamjev.ts. All five go out in one request and are answered in parallel. Only the first one feeds decide(); the other four are shown to the reader as extra context.</Note>
    </div>
  );
}

// ── Fig 5: bar chart of the scam probability ────────────────────────────────
export function ScamBars() {
  return (
    <div>
      <div className="relative">
        <div className="space-y-1.5">
          {RUN1.map((r) => (
            <div key={r.id} className="grid grid-cols-[6.2rem_1fr_2.6rem] sm:grid-cols-[13rem_1fr_2.8rem] items-center gap-2 text-[12px]">
              <span className="truncate text-[var(--text-secondary)]" title={r.label}>{r.label}</span>
              <div className="relative h-5 rounded bg-[var(--fig-card)] border border-[var(--border)]" role="img" aria-label={`${r.label}: Jev scam probability ${r.jev.toFixed(2)}, truly ${r.truth}`}>
                <div className="h-full rounded-l" style={{ width: `${Math.max(r.jev * 100, 0.8)}%`, background: r.truth === "scam" ? T.r.fg : T.g.fg }} />
                <span className="absolute top-0 bottom-0 w-px" style={{ left: "40%", background: "var(--fig-line)" }} />
                <span className="absolute top-0 bottom-0 w-px" style={{ left: "85%", background: "var(--fig-line)" }} />
              </div>
              <span className="mono text-right text-[var(--text-primary)]">{r.jev.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-[var(--text-tertiary)]">
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm align-middle mr-1" style={{ background: T.r.fg }} />written as a scam</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm align-middle mr-1" style={{ background: T.g.fg }} />written as genuine</span>
        <span>thin lines: 0.40 (suspicious) and 0.85 (scam)</span>
      </div>
      <Note>Real run, 30 October 2026: the “is this a scam” probability Jev returned for each of the 14 messages through the live /api/scam endpoint. Labels are the author’s own, by construction.</Note>
    </div>
  );
}

// ── Fig 6: the matrix ───────────────────────────────────────────────────────
export function Matrix() {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full min-w-[34rem] text-[12px] border-separate border-spacing-y-1">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            <th className="font-bold pr-2">Message (written as)</th>
            <th className="font-bold pr-2 text-right">Rules</th>
            <th className="font-bold pr-2">Rules alone</th>
            <th className="font-bold pr-2 text-right">Jev</th>
            <th className="font-bold pr-2">Combined</th>
          </tr>
        </thead>
        <tbody>
          {RUN1.map((r) => (
            <tr key={r.id} className="bg-[var(--fig-card)]">
              <td className="py-1.5 pl-2 pr-2 rounded-l border-y border-l border-[var(--border)]">
                <span className="text-[var(--text-primary)]">{r.label}</span> <Chip tone={r.truth === "scam" ? "r" : "g"}>{r.truth}</Chip>
              </td>
              <td className="py-1.5 pr-2 border-y border-[var(--border)] mono text-right">{r.rules}</td>
              <td className="py-1.5 pr-2 border-y border-[var(--border)]"><Chip tone={VERDICT_TONE[r.rulesOnly as Verdict]}>{VERDICT_LABEL[r.rulesOnly as Verdict]}</Chip></td>
              <td className="py-1.5 pr-2 border-y border-[var(--border)] mono text-right">{r.jev.toFixed(2)}</td>
              <td className="py-1.5 pr-2 rounded-r border-y border-r border-[var(--border)]"><Chip tone={VERDICT_TONE[r.combined as Verdict]}>{VERDICT_LABEL[r.combined as Verdict]}</Chip></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>Real run, 30 October 2026. “Rules alone” is what the checker says with the AI check switched off (≥ 60 scam, ≥ 25 suspicious). “Combined” applies decide() to both numbers. Fourteen hand-written messages: a demonstration, not a benchmark.</Note>
    </div>
  );
}

// ── Fig 7: tallies ──────────────────────────────────────────────────────────
export function Tally() {
  const scams = RUN1.filter((r) => r.truth === "scam");
  const genuine = RUN1.filter((r) => r.truth === "genuine");
  const flag = (v: string) => v !== "no-signs";
  const rulesCaught = scams.filter((r) => flag(r.rulesOnly)).length;
  const jevCaught = scams.filter((r) => r.jev >= 0.4).length;
  const jevStrong = scams.filter((r) => r.jev >= 0.85).length;
  const combCaught = scams.filter((r) => flag(r.combined)).length;
  const falseAlarms = genuine.filter((r) => flag(r.combined) || flag(r.rulesOnly) || r.jev >= 0.4).length;
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Big tone="v" value={`${rulesCaught} of ${scams.length}`} label="scams flagged by rules alone" sub="suspicious or scam" />
        <Big tone="a" value={`${jevCaught} of ${scams.length}`} label="scams at Jev ≥ 0.40" sub={`${jevStrong} of ${scams.length} at ≥ 0.85`} />
        <Big tone="r" value={`${combCaught} of ${scams.length}`} label="scams flagged, combined" sub="suspicious or scam" />
        <Big tone="g" value={`${falseAlarms} of ${genuine.length}`} label="genuine messages flagged" sub="by any layer" />
      </div>
      <Note>Counted from Fig. 6. With 8 scam-style and 6 genuine messages, one message moves a percentage by more than ten points, so no percentage is quoted anywhere in this article.</Note>
    </div>
  );
}

// ── Fig 8: why the rules missed three ───────────────────────────────────────
const MISSES = [
  { id: "challan", why: "Wrong word order", detail: "The e-challan rule wants “challan” and then a word such as pending or pay. The message said “pending e-challan of Rs 500”, so the order was reversed. Only the look-alike link scored (15)." },
  { id: "hinglish", why: "Another language", detail: "The rules are English phrases. Hindi written in Roman letters (“bijli ka connection aaj raat kat jayega”) contains none of them." },
  { id: "advance", why: "A polite story with no keywords", detail: "No OTP, no threat, no link, no urgency. It is an old advance-fee approach in careful English, which is exactly what a pattern list cannot enumerate." },
];
export function RuleMisses() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        {MISSES.map((m) => {
          const r = RUN1.find((x) => x.id === m.id)!;
          return (
            <Card key={m.id} tone="v" tag={`rules ${r.rules} → ${VERDICT_LABEL[r.rulesOnly as Verdict]}`} title={m.why}>
              <p>{m.detail}</p>
              <p className="mt-2">Jev: <strong>{r.jev.toFixed(2)}</strong> → combined: <strong>{VERDICT_LABEL[r.combined as Verdict]}</strong></p>
            </Card>
          );
        })}
      </div>
      <Note>Real run, 30 October 2026. The rule scores come from running the repository’s scam.ts; the Jev numbers from the live endpoint.</Note>
    </div>
  );
}

// ── Fig 9: the decide() grid ────────────────────────────────────────────────
export function DecideGrid() {
  const jevRows = [0.95, 0.7, 0.5, 0.3, 0.1];
  const ruleCols = [0, 25, 50, 75];
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[24rem]">
          <div className="grid grid-cols-[4.5rem_repeat(5,1fr)] gap-1 text-[11.5px]">
            <div />
            {[...ruleCols.map((c) => `rules ${c}`), "no Jev"].map((h) => (
              <div key={h} className="mono text-center text-[var(--text-tertiary)] pb-1">{h}</div>
            ))}
            {jevRows.map((j) => (
              <div key={j} className="contents">
                <div className="mono text-[var(--text-tertiary)] self-center">Jev {j.toFixed(2)}</div>
                {ruleCols.map((c) => {
                  const v = decideView(c, j);
                  return <div key={c} className="rounded text-center py-2 font-bold text-[10.5px] uppercase tracking-[0.05em]" style={{ background: T[VERDICT_TONE[v]].soft, color: T[VERDICT_TONE[v]].fg }}>{VERDICT_LABEL[v]}</div>;
                })}
                <div className="rounded text-center py-2 text-[10.5px] text-[var(--text-tertiary)] border border-dashed border-[var(--border)]">n/a</div>
              </div>
            ))}
            <div className="mono text-[var(--text-tertiary)] self-center">rules only</div>
            {ruleCols.map((c) => {
              const v = decideView(c, null);
              return <div key={c} className="rounded text-center py-2 font-bold text-[10.5px] uppercase tracking-[0.05em]" style={{ background: T[VERDICT_TONE[v]].soft, color: T[VERDICT_TONE[v]].fg }}>{VERDICT_LABEL[v]}</div>;
            })}
            <div />
          </div>
        </div>
      </div>
      <Note>Drawn by a copy of decide() from scam.ts: each cell is the verdict for a Jev probability (rows) and a rule score (columns). The bottom row is the checker with AI off. The only green cell needs both layers quiet. Even then the page says “No scam signs found”, never “safe”.</Note>
    </div>
  );
}

// ── Fig 10: what 0.12 means (illustration) ──────────────────────────────────
export function HundredSquares() {
  const sq = (n: number, tone: Tone) =>
    Array.from({ length: 100 }, (_, i) => (
      <span key={i} className="block aspect-square rounded-[2px]" style={{ background: i < n ? T[tone].fg : T[tone].soft }} />
    ));
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[13px] font-bold text-[var(--text-primary)] mb-2">Calibrated 0.12: about 12 in 100</p>
          <div className="grid grid-cols-10 gap-[3px] max-w-[15rem]" role="img" aria-label="Illustration: 12 of 100 squares filled">{sq(12, "g")}</div>
        </div>
        <div>
          <p className="text-[13px] font-bold text-[var(--text-primary)] mb-2">Calibrated 0.99: about 99 in 100</p>
          <div className="grid grid-cols-10 gap-[3px] max-w-[15rem]" role="img" aria-label="Illustration: 99 of 100 squares filled">{sq(99, "r")}</div>
        </div>
      </div>
      <Note>Illustration, not data. If a model is calibrated, then among many messages that each got 0.12, roughly 12 in 100 would really be scams. TypeSafe says calibration is measured across groups of predictions and does not guarantee that one individual answer is correct. We did not measure calibration.</Note>
    </div>
  );
}

// ── Fig 11: confidence ──────────────────────────────────────────────────────
export function ConfidenceTable() {
  const picks = ["phish", "hdfc", "hinglish", "job"].map((id) => RUN1.find((r) => r.id === id)!);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] text-[12.5px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            <th className="pb-2 pr-2">Message</th><th className="pb-2 pr-2 text-right">scam (noul)</th><th className="pb-2 pr-2 text-right">|2p − 1|</th><th className="pb-2 pr-2">kind (choice)</th><th className="pb-2 text-right">confidence</th>
          </tr>
        </thead>
        <tbody>
          {picks.map((r) => (
            <tr key={r.id} className="border-t border-[var(--border)]">
              <td className="py-2 pr-2 text-[var(--text-primary)]">{r.label}</td>
              <td className="py-2 pr-2 mono text-right">{r.jev.toFixed(2)}</td>
              <td className="py-2 pr-2 mono text-right">{Math.abs(2 * r.jev - 1).toFixed(2)}</td>
              <td className="py-2 pr-2 mono">{r.kind}</td>
              <td className="py-2 mono text-right">{r.kindConf.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>Real run, 30 October 2026. A noul has no separate confidence; the docs suggest |2p − 1| if you want one. The choice question returns its own. Note how the Hinglish message gets a middling scam probability and the weakest kind confidence of the four.</Note>
    </div>
  );
}

// ── Fig 12: failure cases ───────────────────────────────────────────────────
export function FailureCases() {
  const rows = RUN2;
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.key} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[13px] font-bold text-[var(--text-primary)]">{r.label}</span>
            <Chip tone="r">written as scam</Chip>
          </div>
          <p className="mono text-[11.5px] leading-snug text-[var(--text-secondary)] break-words">{r.message}</p>
          <p className="mt-2 text-[12.5px] text-[var(--text-primary)]">
            Rules: <strong>{r.rules}</strong> ({r.signals.length ? r.signals.join(", ") : "no signals"}) · Jev: <strong>{r.jevText}</strong>
            {r.kind ? <> · kind: <span className="mono">{r.kind}</span></> : null}
          </p>
          <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">{r.takeaway}</p>
        </div>
      ))}
      <Note>Real run, 30 October 2026, against the live checker. Messages are the author’s own. Our first attempt at the repeat runs hit the endpoint’s limit of 15 AI checks per 10 minutes, so we waited out the window and ran them again; no result was dropped or re-rolled.</Note>
    </div>
  );
}

// ── Fig 13: who fails where ─────────────────────────────────────────────────
export function WhoFailsWhere() {
  const rows = [
    ["A word the list does not know", "Misses it", "Usually fine"],
    ["Another language or script", "Misses it", "Weaker; scored 0.58 on Hinglish"],
    ["A genuine bank text full of warnings", "Fine, thanks to negation", "Fine in all six genuine tests"],
    ["Text written to talk the model round", "Ignores it (no keywords to match)", "Documented weakness; one test here"],
    ["Same input twice", "Always identical", "Can differ; see the repeat run"],
    ["Why did it decide that?", "Names the exact pattern", "A number, not an explanation"],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] text-[12.5px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            <th className="pb-2 pr-3">Situation</th><th className="pb-2 pr-3" style={{ color: T.v.fg }}>Pattern rules</th><th className="pb-2" style={{ color: T.a.fg }}>Judgment model</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-[var(--border)] align-top">
              <td className="py-2 pr-3 text-[var(--text-primary)]">{r[0]}</td>
              <td className="py-2 pr-3 text-[var(--text-secondary)]">{r[1]}</td>
              <td className="py-2 text-[var(--text-secondary)]">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>A summary of this article’s own runs and TypeSafe’s documented weak spots. It is a reading guide, not a measurement.</Note>
    </div>
  );
}

// ── Fig 14: masking ─────────────────────────────────────────────────────────
export function MaskDemo() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="r" tag="Before" title="What you typed"><p className="mono text-[12px] break-words">{MASK_DEMO.before}</p></Card>
      <Card tone="g" tag="After maskForAi()" title="What would leave your browser"><p className="mono text-[12px] break-words">{MASK_DEMO.after}</p></Card>
      <div className="sm:col-span-2"><Note>Real run of maskForAi() from scam.ts, 30 October 2026, on an invented message with invented numbers. Links and words are kept because they carry the scam; the text is also cut at 1,800 characters.</Note></div>
    </div>
  );
}

// ── Fig 15: the /help triage table ──────────────────────────────────────────
export function TriageTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-[12px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            <th className="pb-2 pr-2">What the person wrote</th><th className="pb-2 pr-2">Keyword fallback</th><th className="pb-2 pr-2">Jev situation</th><th className="pb-2 text-right">conf.</th>
          </tr>
        </thead>
        <tbody>
          {TRIAGE.map((t) => (
            <tr key={t.text} className="border-t border-[var(--border)] align-top">
              <td className="py-2 pr-2 text-[var(--text-primary)]">{t.text}</td>
              <td className="py-2 pr-2 mono">{t.keywords ?? "no match"}</td>
              <td className="py-2 pr-2 mono">{t.situation}</td>
              <td className="py-2 mono text-right">{t.conf.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>Real run, 30 October 2026, against POST /api/triage and the keyword rules in triage.ts. Three of six had no keyword match at all. Jev also rated the Pune weather question {TRIAGE[TRIAGE.length - 1].india.toFixed(2)} on “does this involve India”, a literal reading of the city name; the page treats that number as a hint only.</Note>
    </div>
  );
}

// ── Fig 16: practical path ──────────────────────────────────────────────────
export function PracticalPath() {
  const steps = [
    { n: 1, tone: "c" as Tone, t: "Do not act yet", d: "Money, an OTP, an install or a click can wait. The sender can wait too." },
    { n: 2, tone: "v" as Tone, t: "Run the checks", d: "Paste the text into the scam checker. Inspect any link. Scan a QR before you pay." },
    { n: 3, tone: "a" as Tone, t: "Read it as “not proof”", d: "Scam or suspicious: stop. “No signs”: still go through an official channel for anything involving money." },
    { n: 4, tone: "g" as Tone, t: "Verify the channel", d: "Open the bank’s own app, or type the official site yourself. Never call a number from the message." },
    { n: 5, tone: "r" as Tone, t: "If money moved", d: "Call 1930 at once and report at cybercrime.gov.in." },
  ];
  return (
    <div className="grid gap-2.5">
      {steps.map((s) => (
        <div key={s.n} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 grid grid-cols-[2rem_1fr] gap-3 items-start" style={{ borderLeft: `4px solid ${T[s.tone].fg}` }}>
          <span className="mono text-[18px] font-bold" style={{ color: T[s.tone].fg }}>{s.n}</span>
          <div><p className="text-[14px] font-bold text-[var(--text-primary)]">{s.t}</p><p className="text-[12.5px] text-[var(--text-secondary)]">{s.d}</p></div>
        </div>
      ))}
      <Note>Step 5 follows the helpline and portal named in the Ministry of Home Affairs releases cited in this article.</Note>
    </div>
  );
}
