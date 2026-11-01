import type { ReactNode } from "react";

/**
 * Figures for "Beyond the Hype: the AI bubble burst and why a stock correction
 * will not extinguish the future of technology".
 *
 * Every number comes from a source in lib/references.ts and is labelled with
 * who reported it. Shapes and arrows marked "illustration" are ours and carry
 * no data. Screenshots are real captures taken on 1 November 2026.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/beyond-the-hype-ai-bubble-correction";

/** A real screenshot, hosted here because the site's CSP allows only same-origin images. */
export function Pic({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
  return (
    <div className="mx-auto max-w-full">
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

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-[var(--text-tertiary)] px-1" aria-hidden="true">
      <span className="text-[20px] leading-none">→</span>
      {label && <span className="mt-1 text-[10.5px] text-center leading-tight max-w-[5.5rem]">{label}</span>}
    </div>
  );
}

function Step({ tone, title, children }: { tone: Tone; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 min-w-[9rem] flex-1" style={{ borderLeft: `4px solid ${T[tone].fg}` }}>
      <p className="text-[13px] font-bold text-[var(--text-primary)] leading-snug">{title}</p>
      <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

/** Figure 2: the sell-off in numbers. */
export function Week() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Big tone="r" value="−2.9%" label="Nasdaq, Friday 30 Oct" sub="TechCrunch" />
        <Big tone="r" value="−12%" label="Alphabet, Thursday" sub="its worst day on record, about $500B of value" />
        <Big tone="r" value="−28%" label="Intel, Friday" sub="after a weak fourth-quarter outlook" />
        <Big tone="a" value="−11%" label="Qualcomm, Friday" sub="chip stocks hit" />
        <Big tone="a" value="−7%" label="Amazon, after earnings" sub="though AWS revenue grew 39%" />
        <Big tone="a" value="−4%" label="Nvidia, Friday" sub="Broadcom fell more than 5%" />
      </div>
      <Note>One-day moves as reported by TechCrunch on 30 and 31 October 2026. They are not a forecast and say nothing about where prices go next.</Note>
    </div>
  );
}

/** Figure 3: capex plans. */
export function CapexBars() {
  const rows: { name: string; v: number; label: string; tone: Tone }[] = [
    { name: "Amazon", v: 220, label: "$220B expected this year", tone: "a" },
    { name: "Alphabet", v: 205, label: "up to $205B this year", tone: "c" },
    { name: "Meta", v: 145, label: "$135–145B this year", tone: "v" },
  ];
  return (
    <div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <p className="w-20 shrink-0 text-[13px] font-semibold text-[var(--text-primary)]">{r.name}</p>
            <div className="flex-1 h-7 rounded bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
              <div className="h-full rounded-r" style={{ width: `${(r.v / 220) * 100}%`, background: T[r.tone].fg }} />
            </div>
            <p className="w-40 shrink-0 text-[12px] text-[var(--text-secondary)] leading-tight">{r.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        Together with Microsoft, TechCrunch says the four have outlined more than <strong className="text-[var(--text-primary)]">$740 billion</strong> of capital spending this year. Microsoft’s latest quarter alone was $45.2B, below the $50B it had projected.
      </p>
      <Note>Bars use each company’s own guidance as reported by TechCrunch and CNA (Reuters). Microsoft is left out of the bars because no full-year figure was reported.</Note>
    </div>
  );
}

/** Figure 4: free cash flow. */
export function CashTable() {
  const rows: { co: string; v: string; tone: Tone; what: string }[] = [
    { co: "Alphabet", v: "−$9.1B", tone: "r", what: "third quarter, the second quarter in a row below zero; capex $51.4B in the quarter" },
    { co: "Amazon", v: "−$42.4B", tone: "r", what: "last 12 months, against +$14.8B the year before" },
    { co: "Meta", v: "−$2.1B", tone: "r", what: "third quarter; S&P expects deficits of $39B in 2026 and $71B in 2027" },
    { co: "Microsoft", v: "+$18.6B", tone: "g", what: "latest quarter; the one exception among the four" },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-[13px] border-collapse">
          <thead>
            <tr className="text-left text-[11.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              <th className="py-2 pr-3 font-semibold">Company</th>
              <th className="py-2 pr-3 font-semibold">Free cash flow</th>
              <th className="py-2 font-semibold">What was reported</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.co} className="border-t border-[var(--border)]">
                <td className="py-2.5 pr-3 font-bold text-[var(--text-primary)]">{r.co}</td>
                <td className="py-2.5 pr-3 font-bold mono" style={{ color: T[r.tone].fg }}>{r.v}</td>
                <td className="py-2.5 text-[var(--text-secondary)]">{r.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>Free cash flow is the cash a company brings in minus what it spends. Figures from TechCrunch (30 October 2026) and CNA/Reuters (Meta forecast by S&P Global Ratings).</Note>
    </div>
  );
}

/** Figure 6: debt. */
export function DebtBlocks() {
  return (
    <div>
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
        <Card tone="a" title="2025" tag="before">
          <p>
            The five companies raised about <strong className="text-[var(--text-primary)]">one third</strong> as much debt, since 2026’s total is described as triple last year’s.
          </p>
        </Card>
        <Arrow label="×3" />
        <Card tone="r" title="2026" tag="so far">
          <p>
            Microsoft, Alphabet, Amazon, Meta and Oracle raised a combined <strong className="text-[var(--text-primary)]">$326 billion</strong> in debt, according to S&amp;P Global Market Intelligence.
          </p>
        </Card>
      </div>
      <Note>The $326B and the “triple” are from TechCrunch quoting S&amp;P Global Market Intelligence. “About one third” is our arithmetic from “triple”, not a reported number.</Note>
    </div>
  );
}

/** Figure 8: OpenAI's round. */
export function Ladder() {
  const steps: { head: string; body: string; tone: Tone }[] = [
    { head: "First reported", body: "$30B at a $1.4T valuation", tone: "c" },
    { head: "Then reported", body: "$30B at a $1.25T valuation", tone: "v" },
    { head: "FT, Friday 30 Oct", body: "target lowered to $20B", tone: "a" },
    { head: "WSJ, via TechCrunch and The Decoder", body: "$11B secured so far", tone: "r" },
  ];
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
        {steps.map((s, i) => (
          <div key={s.head} className="flex flex-1 items-stretch gap-2">
            <Step tone={s.tone} title={s.head}>{s.body}</Step>
            {i < steps.length - 1 && <div className="hidden sm:flex"><Arrow /></div>}
          </div>
        ))}
      </div>
      <Note>As reported by TechCrunch and The Decoder on 31 October 2026, citing the Financial Times and the Wall Street Journal. TechCrunch said it asked OpenAI for comment; we saw no reply in the sources.</Note>
    </div>
  );
}

/** Figure 10: how the AI boom can hurt a business that is not AI. */
export function MemoryLoop() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
        <Step tone="v" title="AI builds data centres">They use huge amounts of memory and other parts.</Step>
        <Arrow />
        <Step tone="a" title="Parts get dearer">Intel’s CEO said PC prices and memory prices rose.</Step>
        <Arrow />
        <Step tone="r" title="PC buyers wait">Intel warned of a PC slowdown and a weaker quarter.</Step>
        <Arrow />
        <Step tone="g" title="AI side still grows">Intel’s data centre revenue was up 78% on the year.</Step>
      </div>
      <Note>Read from TechCrunch’s report on Intel’s results (30 October 2026). The boxes are our summary of the reported chain, not Intel’s own diagram.</Note>
    </div>
  );
}

/** Figure 12: the financing loop around neoclouds. */
export function Circle() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
        <Step tone="g" title="Nvidia">Reported to have extended about $170B in investments and credit support to neoclouds and large customers.</Step>
        <Arrow label="money, and a guarantee in talks" />
        <Step tone="c" title="Nscale (a neocloud)">Builds the data centre; its IPO filing shows a $44.6B Anthropic contract for the first building.</Step>
        <Arrow label="buys chips" />
        <Step tone="v" title="Nvidia chips">The site is expected to use Nvidia’s next-generation Vera Rubin chips.</Step>
      </div>
      <Note>As reported by TechCrunch on 30 October 2026, citing The Information, Bloomberg, Nscale’s IPO filing and CNBC. The talks about Nvidia guaranteeing the debt were reported, not announced.</Note>
    </div>
  );
}

/** Figure 14: the rating ladder. */
export function Junk() {
  const rungs: { r: string; tone: Tone; t: string }[] = [
    { r: "Investment grade", tone: "g", t: "Lower risk for lenders. Blackstone had said Anthropic would reach this before 2027." },
    { r: "Top tier of “junk” (double B)", tone: "r", t: "Higher risk, dearer borrowing. Blackstone now expects this after the IPO, per the FT." },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        {rungs.map((x) => (
          <Card key={x.r} tone={x.tone} title={x.r}>{x.t}</Card>
        ))}
      </div>
      <Note>From TechCrunch (30 October 2026) citing the Financial Times. It is Blackstone’s prediction, not a rating; TechCrunch said Anthropic and Blackstone declined to comment.</Note>
    </div>
  );
}

/** Figure 16: what the dot-com history says. */
export function DotNumbers() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Big tone="g" value="+600%" label="Nasdaq, 1995 to March 2000" sub="peak 5,048.62 on 10 March 2000" />
        <Big tone="r" value="−78%" label="Fall from the peak by October 2002" sub="all the bubble’s gains given up" />
        <Big tone="r" value="$5 trillion" label="Market value lost" sub="from the peak to the 2002 downturn" />
        <Big tone="a" value="−80%" label="Cisco’s stock value" sub="Amazon also lost a large part of its value" />
        <Big tone="v" value="$500B+" label="Telecom fibre spending" sub="mostly financed with debt, 1996–2001" />
        <Big tone="g" value="48%" label="Dot-com firms still alive in 2004" sub="at lower valuations" />
      </div>
      <Note>All figures from Wikipedia’s “Dot-com bubble” article, read on 1 November 2026. It is an encyclopedia summary, not a primary record, so treat the exact numbers as approximate.</Note>
    </div>
  );
}

/** Figure 17: boom, bust, build. */
export function Cycle() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
        <Step tone="g" title="1. Boom">Money pours in, prices run ahead of profits, and everything with the label gets funded.</Step>
        <Arrow />
        <Step tone="r" title="2. Bust">Prices fall, weak firms fail, lenders pull back. Many good ideas get cheap.</Step>
        <Arrow />
        <Step tone="c" title="3. Build">Survivors use the cheap, already-built infrastructure to find what people actually pay for.</Step>
      </div>
      <Note>Illustration only: a simple three-step pattern drawn from the dot-com account in Wikipedia. It is not a forecast and no data is plotted.</Note>
    </div>
  );
}

/** Figure 18: worrying and reassuring signals. */
export function Signals() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" title="Signals that worry" tag="reported this week">
          <ul className="list-disc pl-4 space-y-1">
            <li>Free cash flow below zero at Alphabet, Amazon and Meta.</li>
            <li>$326B of new debt across five giants in 2026.</li>
            <li>OpenAI’s round: $11B secured against a $30B first target.</li>
            <li>Neocloud shares down more than 30% in October, per CNBC.</li>
            <li>S&amp;P’s negative outlook on Meta’s spending and cash flow.</li>
          </ul>
        </Card>
        <Card tone="g" title="Signals that reassure" tag="reported this week">
          <ul className="list-disc pl-4 space-y-1">
            <li>AWS revenue up 39%; Google, Amazon and Microsoft all grew cloud sales.</li>
            <li>Meta ad revenue up 26%.</li>
            <li>Intel’s data centre revenue up 78%.</li>
            <li>TechCrunch: demand for AI compute “remains strong”.</li>
            <li>The Decoder: Anthropic has been growing revenue faster lately.</li>
          </ul>
        </Card>
      </div>
      <Note>Lists are drawn from the cited reports. Neither column settles the question; the point is that both are true at once.</Note>
    </div>
  );
}

/** Figure 19: adoption reality check. */
export function Agents() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Big tone="c" value="~3 million" label="deliveries a day" sub="DoorDash’s 2025 report average, per TechCrunch" />
        <Big tone="a" value="“several hundred”" label="orders in total from outside AI agents" sub="DoorDash CEO Tony Xu, third-quarter call" />
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        The two numbers are not drawn to scale, because the first is a daily average and the second is a total. The gap is the point: a technology can be real and still be early.
      </p>
      <Note>From TechCrunch (30 October 2026). DoorDash also runs its own AI agents and said it wants a healthy relationship with outside agent makers.</Note>
    </div>
  );
}

/** Figure 20: a practical path. */
export function Plan() {
  const rows: { who: string; tone: Tone; t: string }[] = [
    { who: "If you build", tone: "c", t: "Price your product on what it earns today, not on promised growth. Keep a fallback if one AI provider changes terms." },
    { who: "If you learn", tone: "g", t: "Skills in using, testing and checking AI work do not depend on any company’s share price." },
    { who: "If you run a business", tone: "a", t: "Pilot where you can measure a result in a few weeks, and keep contracts short while prices move." },
    { who: "If you invest through funds", tone: "v", t: "A correction is a reason to check your plan, not to react to headlines. This is general information, not advice for you." },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {rows.map((r) => (
        <Card key={r.who} tone={r.tone} title={r.who}>{r.t}</Card>
      ))}
    </div>
  );
}
