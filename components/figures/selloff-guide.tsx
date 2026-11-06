import type { ReactNode } from "react";

/**
 * Figures for "The $2.5 trillion day".
 *
 * Every number comes from a source in lib/references.ts and is labelled with
 * who reported it. Anything marked "our arithmetic" is a calculation from those
 * numbers. Screenshots are real captures taken on 6 November 2026, cropped to
 * leave out advertising.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/ai-selloff-2-5-trillion-day";

/** A real screenshot, hosted here because the site's CSP allows only same-origin images. */
export function Pic({ file, alt, width, height, max }: { file: string; alt: string; width: number; height: number; max?: string }) {
  return (
    <div className="mx-auto max-w-full" style={max ? { maxWidth: max } : undefined}>
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

function Step({ tone, when, title, children }: { tone: Tone; when: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 min-w-[11rem] flex-1" style={{ borderTop: `4px solid ${T[tone].fg}` }}>
      <p className="mono text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[tone].fg }}>{when}</p>
      <p className="mt-1 text-[13px] font-bold text-[var(--text-primary)] leading-snug">{title}</p>
      <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

/** Horizontal bars for falls, longest bar = largest fall in the list. */
function FallBars({ rows, max }: { rows: { name: string; v: number; label: string; tone?: Tone }[]; max: number }) {
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-3">
          <p className="w-28 sm:w-36 shrink-0 text-[12.5px] font-semibold text-[var(--text-primary)] leading-tight">{r.name}</p>
          <div className="flex-1 h-6 rounded bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
            <div className="h-full rounded-r" style={{ width: `${(r.v / max) * 100}%`, background: T[r.tone ?? "r"].fg }} />
          </div>
          <p className="w-16 sm:w-20 shrink-0 text-right text-[12.5px] font-bold text-[var(--text-primary)]">{r.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Figure 2: the scoreboard. */
export function Scoreboard() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Big tone="r" value="−5.52%" label="Nasdaq Composite" sub="closed at 24,315.00 (ANI)" />
        <Big tone="r" value="−4.36%" label="S&P 500" sub="closed at 7,353.73 (ANI)" />
        <Big tone="r" value="−3.44%" label="Dow Jones" sub="−1,833.06 points, to 51,523.06 (ANI)" />
        <Big tone="r" value="−6.36%" label="Nasdaq 100" sub="worst day since March 2020 (CNN)" />
        <Big tone="r" value="−12.3%" label="Chipmaker index" sub="worst day in about 6½ years (CNN)" />
        <Big tone="a" value="+70%" label="VIX “fear gauge”" sub="roughly; biggest one-day jump in almost two years (CNN)" />
      </div>
      <Note>Thursday 5 November 2026, US closing figures as reported by CNN and by ANI (which cites CNN). The VIX measures expected volatility.</Note>
    </div>
  );
}

/** Figure 4: three ways to count the same day. */
export function ThreeCounts() {
  const rows = [
    { name: "Nasdaq 100", v: 2.3, label: "$2.3T", tone: "c" as Tone, src: "NBC News: index fell 6.3%" },
    { name: "Nasdaq Composite", v: 2.5, label: "$2.5T", tone: "v" as Tone, src: "CNN: index fell 5.52%" },
    { name: "S&P 500", v: 2.8, label: "$2.8T", tone: "r" as Tone, src: "NBC News: index fell 4.4%" },
  ];
  return (
    <div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.name}>
            <div className="flex items-center gap-3">
              <p className="w-32 shrink-0 text-[13px] font-semibold text-[var(--text-primary)]">{r.name}</p>
              <div className="flex-1 h-7 rounded bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
                <div className="h-full rounded-r" style={{ width: `${(r.v / 2.8) * 100}%`, background: T[r.tone].fg }} />
              </div>
              <p className="w-14 shrink-0 text-right text-[13px] font-bold text-[var(--text-primary)]">{r.label}</p>
            </div>
            <p className="ml-[8.5rem] mt-0.5 text-[11.5px] text-[var(--text-tertiary)]">{r.src}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        None of these is wrong. Each adds up the value of a <em>different</em> group of companies, so the “$2.5 trillion” in the headline is the Nasdaq Composite’s figure, not the whole market’s.
      </p>
      <Note>Values as reported on 5–6 November 2026. “T” is trillion US dollars of stock-market value.</Note>
    </div>
  );
}

/** Figure 8: how the week unfolded. */
export function WeekFlow() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-[44rem]">
        <Step tone="c" when="Tue 3 Nov" title="Midterm elections">
          Democrats make large gains and Gina Hinojosa wins the Texas governorship; JoongAng Daily reports they secured both houses of Congress (NBC News, CNN).
        </Step>
        <Step tone="g" when="Wed 4 Nov" title="Relief rally">
          Dow +1,569 points, Nasdaq +1.44%. Amazon, Meta and Google rise; chip and data-centre stocks already fall underneath (CNN).
        </Step>
        <Step tone="a" when="Wed night" title="Chip earnings">
          Qualcomm and Arm report. NBC News says investors viewed both as mixed; CNN says Qualcomm missed estimates.
        </Step>
        <Step tone="r" when="Thu 5 Nov" title="The sell-off">
          Nasdaq −5.52%, S&amp;P 500 −4.36%, Dow −1,833 points, erasing Wednesday’s gains (CNN).
        </Step>
        <Step tone="v" when="Fri 6 Nov" title="Asia reacts">
          Kospi halted for 20 minutes after an opening drop of about 9%, then closes −6.02% (CNN, JoongAng Daily).
        </Step>
      </div>
      <Note>Sequence as reported by CNN and NBC News. Times of day are given only where the sources give them.</Note>
    </div>
  );
}

/** Figure 9: Wednesday against Thursday. */
export function Reversal() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="g" title="Wednesday 4 November" tag="Up">
          <p className="display text-[28px] leading-none" style={{ color: "var(--fig-green)" }}>+1,569</p>
          <p className="mt-1">Dow points, “historic” post-midterm rally. Nasdaq Composite +1.44%.</p>
        </Card>
        <Card tone="r" title="Thursday 5 November" tag="Down">
          <p className="display text-[28px] leading-none" style={{ color: "var(--fig-rose)" }}>−1,833</p>
          <p className="mt-1">Dow points. That is 264 more than Wednesday’s gain (our arithmetic: 1,833 − 1,569), so the Dow ended the two days lower.</p>
        </Card>
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        CNN described the Thursday close as wiping out all of Wednesday’s gains. The two-day net is our subtraction of the two reported point moves, not a figure from the sources.
      </p>
      <Note>Source for both days: CNN. Points are index points, not dollars.</Note>
    </div>
  );
}

/** Figure 10: who fell hardest. */
export function HitHardest() {
  const rows = [
    { name: "SanDisk", v: 22, label: "−22%" },
    { name: "“DRAM” memory ETF", v: 18, label: "≈ −18%" },
    { name: "Micron, WD, AMD", v: 17, label: "−17%" },
    { name: "Seagate", v: 16, label: "−16%" },
    { name: "Nebius", v: 15, label: "≈ −15%" },
    { name: "Arm Holdings", v: 13, label: "−13%" },
    { name: "Chipmaker index", v: 12.3, label: "−12.3%" },
    { name: "Tesla", v: 11, label: "−11%" },
    { name: "Broadcom", v: 10, label: "−10%" },
    { name: "CoreWeave", v: 10, label: "≈ −10%" },
    { name: "Nvidia", v: 9.3, label: "−9.3%" },
    { name: "Oracle", v: 7, label: "≈ −7%" },
  ];
  return (
    <div>
      <FallBars rows={rows} max={22} />
      <Note>
        One-day falls on 5 November 2026 as reported by NBC News (SanDisk, DRAM ETF, Micron, Western Digital, AMD, Seagate, Arm, chipmaker index), CNN (Nebius, Tesla, CoreWeave, Nvidia) and ANI (Broadcom, Oracle). “≈” marks sources that wrote “almost” or “roughly”. For Tesla, CNN says 11% and NBC News says “nearly 10%”; the bar uses CNN.
      </Note>
    </div>
  );
}

/** Figure 11: Asia on Friday. */
export function Dominoes() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Big tone="r" value="−8%+" label="Kospi at the open" sub="20-minute market halt" />
        <Big tone="a" value="−6.02%" label="Kospi at the close" sub="5,059.69; low 4,911.28" />
        <Big tone="r" value="−10.44%" label="SK hynix, close" sub="Samsung −6.35% (JoongAng)" />
        <Big tone="r" value="−9%" label="Taiwan’s TAIEX" sub="Nikkei fell as much as 6% (NBC)" />
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        The same market fell by more than 8% at the open and 6.02% by the close. Quoting the open or the close tells a different story, so check which one a headline uses.
      </p>
      <Note>NBC News described the Nikkei and TAIEX moves from early Friday trading; their closing figures are not in the sources we read.</Note>
    </div>
  );
}

/** Figure 12: competing readings. */
export function Readings() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="g" title="Air coming out, not a burst" tag="Ed Yardeni, Yardeni Research">
        <p>Told NBC News it is “an AI bubble losing some air very, very rapidly”, which lowers the chance of a bursting bubble with wider damage. Told CNN a slowdown is wanted.</p>
      </Card>
      <Card tone="c" title="A knee-jerk reaction" tag="Keith Lerner, Truist">
        <p>Sees the week’s moves as more knee-jerk than a real signal for tech under a Democratic Congress, and says risk-reward is improving for longer-term investors.</p>
      </Card>
      <Card tone="a" title="A reaction called excessive" tag="Lee Kyoung-min, Daishin Securities">
        <p>Says a complete suspension of US data-centre building is unlikely and calls the market reaction excessive.</p>
      </Card>
      <Card tone="r" title="Blame for the fall" tag="President Trump">
        <p>Wrote on Truth Social that the fall was based on the election results and blamed Democrats (NBC News).</p>
      </Card>
    </div>
  );
}

/** Figure 13: known against unknown. */
export function KnownUnknown() {
  const rows: { tone: Tone; tag: string; text: string }[] = [
    { tone: "g", tag: "Confirmed", text: "On 5 November the Nasdaq closed down 5.52% and in correction; the S&P 500 and Dow had their worst days since April 2025 (CNN, NBC News, ANI)." },
    { tone: "g", tag: "Confirmed", text: "The Nasdaq Composite’s close of 24,315 matches the St. Louis Fed’s own record (FRED)." },
    { tone: "a", tag: "Disputed", text: "Why: sources link it to data-centre rules, but also to chip earnings, and Lerner and Lee call the reaction knee-jerk or excessive." },
    { tone: "a", tag: "Differs", text: "The size of the loss depends on the index: $2.3 trillion, $2.5 trillion or $2.8 trillion." },
    { tone: "r", tag: "Unknown", text: "Whether laws restricting data centres will actually pass, and what they would cover. The sources describe pledges and campaign promises, not enacted rules." },
    { tone: "r", tag: "Unknown", text: "Whether prices recover or fall further. No source we read can know that, and neither can we." },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[r.tone].fg}` }}>
          <span className="mono shrink-0 w-[4.8rem] text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg }}>{r.tag}</span>
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Figure 14: a practical path. */
export function Plan() {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Card tone="c" title="If you read the news" tag="Reader">
        <p>Ask which index, which time (open or close) and who said it. Compare two sources before sharing a number.</p>
      </Card>
      <Card tone="a" title="If you invest" tag="Investor">
        <p>A one-day move is not a plan. Know why you hold what you hold, and speak to a licensed adviser about your own situation. This is not advice.</p>
      </Card>
      <Card tone="g" title="If you build with AI" tag="Builder">
        <p>Policy on data centres, power and water can change costs and timing. Keep your product working if a provider or region gets slower or dearer.</p>
      </Card>
    </div>
  );
}

/** Figure 5: what the reported moves imply about the size of each index. */
export function ImpliedSizes() {
  const rows = [
    { name: "Nasdaq 100", lost: 2.3, pct: 6.3, tone: "c" as Tone },
    { name: "Nasdaq Composite", lost: 2.5, pct: 5.52, tone: "v" as Tone },
    { name: "S&P 500", lost: 2.8, pct: 4.36, tone: "r" as Tone },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-[13px] border-collapse">
          <thead>
            <tr className="text-left text-[11.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              <th className="py-2 pr-3 font-semibold">Index</th>
              <th className="py-2 pr-3 font-semibold">Reported loss</th>
              <th className="py-2 pr-3 font-semibold">Reported fall</th>
              <th className="py-2 font-semibold">Implied size before the fall</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-[var(--border)]">
                <td className="py-2 pr-3 font-semibold text-[var(--text-primary)]">{r.name}</td>
                <td className="py-2 pr-3 text-[var(--text-secondary)]">${r.lost}T</td>
                <td className="py-2 pr-3 text-[var(--text-secondary)]">{r.pct}%</td>
                <td className="py-2 font-bold" style={{ color: T[r.tone].fg }}>about ${(r.lost / (r.pct / 100)).toFixed(0)}T</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] text-[var(--text-secondary)]">
        Dividing each loss by its percentage fall gives the rough total value of the companies in that index. The S&amp;P 500’s is larger, which is why its smaller percentage fall still removed more dollars.
      </p>
      <Note>Our arithmetic from the figures reported by CNN and NBC News: loss ÷ fall. Rounded to the nearest trillion; the reported percentages are themselves rounded.</Note>
    </div>
  );
}

/** Figure 14: the year in corrections. */
export function YearTimeline() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-[44rem]">
        <Step tone="r" when="March" title="Correction">Nasdaq closed in correction.</Step>
        <Step tone="g" when="Early June" title="Record highs">Nasdaq rallied back to records.</Step>
        <Step tone="a" when="Late July" title="Near miss">Nasdaq stumbled and nearly fell into correction.</Step>
        <Step tone="g" when="Sep–Oct" title="New records">Records reclaimed; the peak was 6 October.</Step>
        <Step tone="r" when="5 Nov" title="Correction again">Nasdaq closed more than 10% below that peak.</Step>
      </div>
      <Note>As CNN described the Nasdaq’s year. Arrangement is ours; no index levels are implied by the spacing.</Note>
    </div>
  );
}

/** Figure 15: other markets that moved on 5 November. */
export function WhatElse() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Big tone="r" value="11 of 11" label="S&P 500 sectors fell" sub="CNN" />
      <Big tone="g" value="4.84%" label="10-year Treasury yield" sub="fell, lowest in two months (CNN)" />
      <Big tone="a" value="+3.8%" label="Brent crude" sub="rebounded; US crude +2.7% (NBC News)" />
      <Big tone="a" value="≈ 60%" label="Odds of a December Fed rate rise" sub="traders dialled back bets (NBC News)" />
    </div>
  );
}
