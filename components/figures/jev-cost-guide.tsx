import type { ReactNode } from "react";

/**
 * Figures for "What $1.26 bought: a real day of TypeSafe Jev".
 *
 * Usage figures are read off the owner's TypeSafe console Usage page, captured
 * 15 October 2026 (last 24 hours): spend $1.2609, 38,304,199 tokens, 54,890
 * requests, 30,021,743 input tokens on the "macbook-dev" key. Jev's price is
 * from TypeSafe's Models page ($0.042 per million input tokens, output free).
 * Other prices are Anthropic's published list prices (platform.claude.com
 * pricing page, read 15 October 2026). Output tokens are inferred as total minus
 * input and the split is not labelled in the screenshot. Everything marked
 * "illustration" or "assumption" is ours.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

export const BASE = "/typesafe-jev-real-usage-cost";

// ── The measured numbers ────────────────────────────────────────────────────
const SPEND = 1.2609;
const TOTAL_TOKENS = 38_304_199;
const INPUT_TOKENS = 30_021_743;
const OUTPUT_TOKENS = TOTAL_TOKENS - INPUT_TOKENS; // inferred
const REQUESTS = 54_890;
const JEV_IN = 0.042; // $ per million input tokens
const mtok = (n: number) => n / 1_000_000;

const fmt = (n: number) => n.toLocaleString("en-GB");
const usd = (n: number) => (n >= 100 ? `$${n.toFixed(0)}` : n >= 10 ? `$${n.toFixed(1)}` : `$${n.toFixed(2)}`);

const MODELS = [
  { name: "Claude Haiku 5.5", input: 0.1, output: 0.5, tone: "c" as Tone },
  { name: "Claude Sonnet 5.5", input: 2, output: 10, tone: "v" as Tone },
  { name: "Claude Opus 5.5", input: 4, output: 20, tone: "a" as Tone },
  { name: "Claude Fable 5.1", input: 10, output: 50, tone: "r" as Tone },
].map((m) => ({ ...m, cost: mtok(INPUT_TOKENS) * m.input + mtok(OUTPUT_TOKENS) * m.output }));

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[11.5px] leading-snug text-[var(--text-tertiary)]">{children}</p>;
}

function Card({ tone, title, children, tag }: { tone: Tone; title: string; children: ReactNode; tag?: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4" style={{ borderTop: `3px solid ${T[tone].fg}` }}>
      {tag && (
        <span className="mono inline-block mb-2 rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[tone].fg, background: T[tone].soft }}>
          {tag}
        </span>
      )}
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

function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="mono shrink-0 self-start rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[tone].fg, background: T[tone].soft }}>
      {children}
    </span>
  );
}

/** The captured Usage page. */
export function Pic({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
  return (
    <div className="mx-auto max-w-full">
      {/* The site CSP allows only same-origin images, so pictures ship from public/. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/${file}`}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)] bg-white"
      />
    </div>
  );
}

/** Figure 2 — the numbers read off the page. */
export function ReadOff() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Big tone="g" value={usd(SPEND)} label="Spend" sub="last 24 hours" />
        <Big tone="c" value={fmt(REQUESTS)} label="Requests" />
        <Big tone="v" value={fmt(TOTAL_TOKENS)} label="Tokens" sub="all kinds" />
        <Big tone="a" value={fmt(INPUT_TOKENS)} label="Input tokens" sub="one API key" />
      </div>
      <Note>Read off the console Usage page on 15 October 2026. The page marks spend with an asterisk: “Estimated at $0.042/MTok input · Free output”.</Note>
    </div>
  );
}

/** Figure 3 — the bill, recomputed. */
export function BillCheck() {
  const calc = mtok(INPUT_TOKENS) * JEV_IN;
  return (
    <div>
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[var(--text-primary)]">
          <span className="mono rounded-[var(--radius)] px-2 py-1" style={{ background: T.a.soft }}>{mtok(INPUT_TOKENS).toFixed(3)} M input tokens</span>
          <span aria-hidden="true">×</span>
          <span className="mono rounded-[var(--radius)] px-2 py-1" style={{ background: T.v.soft }}>${JEV_IN} per M</span>
          <span aria-hidden="true">=</span>
          <span className="mono rounded-[var(--radius)] px-2 py-1 font-bold" style={{ background: T.g.soft }}>${calc.toFixed(4)}</span>
        </div>
        <p className="mt-3 text-[12.5px] leading-snug text-[var(--text-secondary)]">
          The page shows ${SPEND.toFixed(4)}. Our sum matches to four decimal places, which tells us the bill is the input tokens alone, priced at the list rate, with nothing charged for output.
        </p>
      </div>
      <Note>Price from TypeSafe’s Models page: $0.042 per million input tokens, output tokens free.</Note>
    </div>
  );
}

/** Figure 4 — what a request is, on average. */
export function PerRequest() {
  const inPer = INPUT_TOKENS / REQUESTS;
  const allPer = TOTAL_TOKENS / REQUESTS;
  const costPer = SPEND / REQUESTS;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Big tone="a" value={`~${Math.round(inPer)}`} label="Input tokens per request" sub="on average" />
        <Big tone="v" value={`~${Math.round(allPer)}`} label="Tokens per request, all kinds" />
        <Big tone="g" value={`$${costPer.toFixed(6)}`} label="Cost of one request" sub="about 2 thousandths of a cent" />
        <Big tone="c" value={`$${(costPer * 1000).toFixed(3)}`} label="Cost of 1,000 requests" />
      </div>
      <Note>Averages: the page gives totals, not a per-request breakdown, so individual requests will vary. “Input tokens per request” uses the one API key shown.</Note>
    </div>
  );
}

/** Figure 5 — the same tokens at other list prices. */
export function PriceCompare() {
  const max = MODELS[MODELS.length - 1].cost;
  const rows = [{ name: "TypeSafe Jev (measured)", cost: SPEND, tone: "g" as Tone, ratio: "1×" }].concat(
    MODELS.map((m) => ({ name: m.name, cost: m.cost, tone: m.tone, ratio: `${(m.cost / SPEND).toFixed(m.cost / SPEND < 10 ? 1 : 0)}×` })),
  );
  return (
    <div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-2">
            <span className="w-[8rem] sm:w-44 shrink-0 text-[12.5px] font-semibold leading-tight text-[var(--text-primary)]">{r.name}</span>
            <div className="flex-1 h-5 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${Math.max(1.5, (r.cost / max) * 100)}%`, background: T[r.tone].fg }} />
            </div>
            <span className="mono shrink-0 text-[11.5px] text-[var(--text-secondary)] w-[6.5rem] text-right">{usd(r.cost)} · {r.ratio}</span>
          </li>
        ))}
      </ul>
      <Note>
        Assumption: the same {mtok(INPUT_TOKENS).toFixed(1)}M input and {mtok(OUTPUT_TOKENS).toFixed(1)}M output tokens (total minus input; the split is not labelled on the page), at Anthropic’s standard list prices for prompts up to 100,000 tokens. Jev is measured; the others are arithmetic. No caching or batch discounts, which would lower them.
      </Note>
    </div>
  );
}

/** Figure 6 — the price table behind figure 5. */
export function PriceTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12.5px] border-collapse">
        <thead>
          <tr className="text-left text-[var(--text-tertiary)]">
            <th className="py-2 pr-3 font-semibold">Model</th>
            <th className="py-2 pr-3 font-semibold">Input $/M</th>
            <th className="py-2 pr-3 font-semibold">Output $/M</th>
            <th className="py-2 font-semibold">Same tokens</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[var(--border)]">
            <td className="py-2 pr-3 font-semibold text-[var(--text-primary)]">Jev</td>
            <td className="py-2 pr-3">0.042</td>
            <td className="py-2 pr-3">free</td>
            <td className="py-2 font-bold" style={{ color: T.g.fg }}>{usd(SPEND)}</td>
          </tr>
          {MODELS.map((m) => (
            <tr key={m.name} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 font-semibold text-[var(--text-primary)]">{m.name}</td>
              <td className="py-2 pr-3">{m.input}</td>
              <td className="py-2 pr-3">{m.output}</td>
              <td className="py-2 font-bold" style={{ color: T[m.tone].fg }}>{usd(m.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>Anthropic’s list prices as read from its pricing page on 15 October 2026. Haiku 5.5 is $0.10 and $0.50 for prompts up to 100,000 tokens. Prices change; check the page before you rely on a number.</Note>
    </div>
  );
}

/** Figure 7 — what the comparison does not include. */
export function NotInThere() {
  const rows: { t: string; d: string; tone: Tone }[] = [
    { t: "Quality", d: "Price says nothing about whether each answer was as good. A cheaper model that is wrong more often is not cheaper.", tone: "r" },
    { t: "Different output", d: "Jev returns typed answers and probabilities, not text. A general model used for the same job may emit more or fewer tokens than Jev did.", tone: "a" },
    { t: "Discounts", d: "Prompt caching and batch processing lower general-model prices. We ignored both, so those figures are upper bounds.", tone: "a" },
    { t: "Engineering time", d: "Switching has a cost, and so does tuning thresholds. A dollar figure alone leaves that out.", tone: "c" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.t} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <Tag tone={r.tone}>{r.t}</Tag>
            <p className="text-[13px] text-[var(--text-secondary)] leading-snug">{r.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figure 8 — one document, many questions. */
export function BatchCompare() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="One question per call" title="13 calls, document sent 13 times">
          <p>Every request carries the same document, so you pay for it again each time, and each call is a round trip.</p>
        </Card>
        <Card tone="g" tag="All questions in one call" title="1 call, document sent once">
          <p>Jev reads the state once and evaluates every question against it in parallel. TypeSafe’s benchmark reports answers did not change.</p>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Big tone="g" value="12.2×" label="Cheaper" sub="TypeSafe’s benchmark" />
        <Big tone="g" value="10.0×" label="Faster" sub="TypeSafe’s benchmark" />
      </div>
      <Note>From TypeSafe’s “Parallel questions” cookbook: 13 questions over a ~54,000-character article, run on an earlier model version (jev-1.12). TypeSafe’s own numbers, not ours.</Note>
    </div>
  );
}

/** Figure 9 — speed: what is known. */
export function SpeedKnown() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    { t: "The Usage page", d: "Shows spend, tokens, requests and keys. It does not show latency or time saved.", tone: "r", tag: "Not shown" },
    { t: "TypeSafe’s benchmark", d: "One call with all questions was 10.0× faster than one call per question, on one cookbook task.", tone: "a", tag: "Attributed" },
    { t: "Your own timings", d: "Log a start and end time around each call, and compare with what you used before on the same inputs.", tone: "g", tag: "Measure" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.t} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <Tag tone={r.tone}>{r.tag}</Tag>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.t}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figure 10 — who does what. */
export function WhoDoesWhat() {
  const rows: { job: string; who: string; tone: Tone }[] = [
    { job: "Is this ticket a refund request? Which team gets it? How urgent is it?", who: "Jev: a typed judgment, fast and cheap", tone: "g" },
    { job: "Add up the amounts, compare dates, apply the policy rules", who: "Your code: exact and free", tone: "c" },
    { job: "Write the reply to the customer; explain a decision in words", who: "A general LLM: Jev does not generate text", tone: "v" },
    { job: "Answer is uncertain, or the stakes are high", who: "Confidence gate: escalate to a person or a larger model", tone: "a" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.job} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[r.tone].fg}` }}>
            <p className="text-[13.5px] font-semibold text-[var(--text-primary)] leading-snug">{r.job}</p>
            <p className="text-[12.5px] mt-0.5 leading-snug" style={{ color: T[r.tone].fg }}>{r.who}</p>
          </li>
        ))}
      </ul>
      <Note>An illustration of the division of labour the docs recommend: code keeps control and the model gets narrow, structured decisions.</Note>
    </div>
  );
}

/** Figure 11 — jagged edges. */
export function Jagged() {
  const rows = [
    { k: "Literal reading", v: "Answers the words you wrote. Write the exact condition." },
    { k: "Math and counting", v: "Not a calculator. Keep arithmetic in code; ask one question per item and add up." },
    { k: "Dates and times", v: "Extract the parts, compare in code." },
    { k: "Indirection", v: "Double negatives and multi-hop questions lose accuracy. Ask directly." },
    { k: "Large, noisy state", v: "Accuracy falls with irrelevant detail. Filter first." },
    { k: "Generation", v: "Does not write replies, code or explanations. Use a generative model." },
  ];
  return (
    <div>
      <ul className="grid sm:grid-cols-2 gap-2">
        {rows.map((r) => (
          <li key={r.k} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.k}</p>
            <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.v}</p>
          </li>
        ))}
      </ul>
      <Note>Condensed from TypeSafe’s “Jev 1.13 jaggedness” page, last reviewed 2 October 2026. Jev 1.14 became available on 14 October 2026; read the current page for the model you use.</Note>
    </div>
  );
}

/** Figure 12 — do the sum on your own page. */
export function DoTheSum() {
  const steps = [
    "Open the Usage page and set the window you care about.",
    "Note spend, input tokens, total tokens and requests.",
    "Divide: spend ÷ requests is your cost per request; input tokens ÷ requests is your average request size.",
    "Check: input tokens × price per million should equal the spend shown.",
    "Price the same tokens at the other model’s list price, input and output separately.",
    "Compare answers on a sample, not just prices, before you move anything.",
  ];
  return (
    <div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T.v.soft, color: T.v.fg }}>{i + 1}</span>
            <p className="text-[13px] leading-snug text-[var(--text-primary)]">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Figure 13 — claim check. */
export function ClaimCheck() {
  const rows: { c: string; v: string; tone: Tone; tag: string }[] = [
    { c: "“54,890 requests for $1.26.”", v: "Read directly from the Usage page. The spend is an estimate at list price.", tone: "g", tag: "Measured" },
    { c: "“Jev is 100 times cheaper than a normal LLM.”", v: "Depends on which model. At Anthropic’s published prices the same tokens cost about 5.7× (Haiku 5.5) to about 570× (Fable 5.1) as much, before discounts and without a quality comparison.", tone: "a", tag: "Depends" },
    { c: "“Ten times faster.”", v: "Not from this page. TypeSafe reports 10.0× for batching on one task; your own timing is not in the screenshot.", tone: "r", tag: "Not shown" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.c} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <Tag tone={r.tone}>{r.tag}</Tag>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.c}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.v}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
