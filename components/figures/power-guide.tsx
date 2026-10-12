import type { ReactNode } from "react";

/**
 * Figures for "AI runs on electricity, and India is where the demand is growing
 * fastest".
 *
 * Every number comes from a source listed for this article in lib/references.ts,
 * read in full on 12 October 2026: the IEA's Key Questions on Energy and AI
 * (April 2026), Energy and AI (April 2025), Electricity 2026 (February 2026),
 * Electricity Mid-Year Update 2026 (July 2026) and World Energy Outlook 2025
 * (November 2025); the Energy Institute and Ember data as published by Our
 * World in Data (updated 30 June 2026); CBRE's report as reported by IBEF; and
 * Google's and Amazon's own announcements. Conversions use 1 exajoule (EJ) =
 * 277.8 terawatt-hours (TWh). Anything marked "illustration" or "approximate"
 * is ours; the values read off the supplied chart are eyeballed from the image.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/ai-electricity-and-india";

const fmt = (n: number) => n.toLocaleString("en-GB");

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[11.5px] leading-snug text-[var(--text-tertiary)]">{children}</p>;
}

/** One horizontal bar row. `ghost` draws an outline bar (a claim, not a measurement). */
function Row({ label, value, max, tone, shown, ghost, lw }: { label: string; value: number; max: number; tone: Tone; shown?: string; ghost?: boolean; lw?: string }) {
  const w = Math.max(1.5, (value / max) * 100);
  return (
    <li className="flex items-center gap-2">
      <span className={`${lw ?? "w-[8.5rem] sm:w-44"} shrink-0 text-[12.5px] font-semibold leading-tight text-[var(--text-primary)]`}>{label}</span>
      <div className="flex-1 h-5 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={
            ghost
              ? { width: `${w}%`, border: `2px dashed ${T[tone].fg}`, background: T[tone].soft }
              : { width: `${w}%`, background: T[tone].fg }
          }
        />
      </div>
      <span className="mono text-[11.5px] font-bold w-[4.6rem] shrink-0 text-right text-[var(--text-primary)]">{shown ?? fmt(value)}</span>
    </li>
  );
}

// ── Photograph-style picture (the supplied chart) ──────────────────────────────

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

// ── 1. The post that started it ────────────────────────────────────────────────

export function PostCard() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T.c.fg, background: T.c.soft }}>
        <p className="mono text-[10.5px] tracking-[0.12em] uppercase" style={{ color: T.c.fg }}>Elon Musk · X · 10 October 2026</p>
        <p className="mt-2 text-[16px] font-semibold leading-snug text-[var(--text-primary)]">
          “Electricity production is the best metric for the true strength of any large-scale economy imo”
        </p>
        <p className="mt-2 text-[12px] text-[var(--text-secondary)]">4.5 million views when we read it on 12 October.</p>
      </div>
      <div className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T.a.fg, background: T.a.soft }}>
        <p className="mono text-[10.5px] tracking-[0.12em] uppercase" style={{ color: T.a.fg }}>The post he quoted · a16z</p>
        <p className="mt-2 text-[16px] font-semibold leading-snug text-[var(--text-primary)]">
          “Energy capacity = economic capacity, in one chart. There are no low electricity, rich countries.”
        </p>
        <p className="mt-2 text-[12px] text-[var(--text-secondary)]">
          The chart plots each country’s electricity use per person against its income per person, on logarithmic scales, with one region marked “There are no low electricity, rich countries.”
        </p>
      </div>
    </div>
  );
}

// ── 2. Energy is not electricity ───────────────────────────────────────────────

export function TwoMeasures() {
  const rows: { name: string; energy: number; elec: number; tone: Tone }[] = [
    { name: "China", energy: 45054, elec: 10583, tone: "r" },
    { name: "United States", energy: 26064, elec: 4520, tone: "c" },
    { name: "India", energy: 10861, elec: 2082, tone: "a" },
  ];
  const max = 45054;
  return (
    <div>
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.name}>
            <p className="text-[13px] font-bold text-[var(--text-primary)]">
              {r.name} <span className="font-normal text-[var(--text-secondary)]">· electricity is {Math.round((r.elec / r.energy) * 100)}% of the total</span>
            </p>
            <ul className="mt-1 space-y-1">
              <Row label="All energy" value={r.energy} max={max} tone="v" />
              <Row label="Electricity generated" value={r.elec} max={max} tone={r.tone} />
            </ul>
          </div>
        ))}
      </div>
      <Note>
        2025, in terawatt-hours (TWh). “All energy” is total energy supply: oil, gas, coal, nuclear, hydro, wind, solar and the rest. Source: Energy Institute and Ember data as published by Our World in Data, updated 30 June 2026. World totals: 166,754 TWh of energy, 31,772 TWh of electricity (19%).
      </Note>
    </div>
  );
}

// ── 3. The unit ladder ─────────────────────────────────────────────────────────

export function UnitsLadder() {
  const steps = [
    { u: "kWh", v: "1", b: "What a household bill counts. One kilowatt-hour runs a 1,000-watt heater for an hour.", tone: "g" as Tone },
    { u: "MWh", v: "1,000 kWh", b: "A thousand of those bill units.", tone: "c" as Tone },
    { u: "GWh", v: "1 million kWh", b: "A thousand megawatt-hours.", tone: "a" as Tone },
    { u: "TWh", v: "1 billion kWh", b: "How whole countries and whole industries are counted. The IEA expects the world’s data centres to use about 950 of these in 2030.", tone: "r" as Tone },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-4 gap-2.5">
        {steps.map((s) => (
          <li key={s.u} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="mono text-[18px] font-bold" style={{ color: T[s.tone].fg }}>{s.u}</p>
            <p className="text-[12.5px] font-semibold text-[var(--text-primary)]">{s.v}</p>
            <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </li>
        ))}
      </ol>
      <Note>
        Power and energy are different things. A gigawatt (GW) is a rate, like litres per second; a terawatt-hour is an amount, like litres in the tank. The IEA says 2 GW of Indian data centres in mid-2024 used electricity equivalent to 6.5 million Indian households.
      </Note>
    </div>
  );
}

// ── 4. The power chain ─────────────────────────────────────────────────────────

export function PowerChain() {
  const links: { t: string; b: string; tone: Tone }[] = [
    { t: "You ask", b: "A question, a picture, or a task for an agent.", tone: "g" },
    { t: "An AI service", b: "Software that turns the request into a lot of arithmetic.", tone: "c" },
    { t: "A data centre", b: "Thousands of chips, plus the cooling and power equipment to keep them running.", tone: "v" },
    { t: "The grid", b: "Wires, substations and the people who balance supply and demand every second.", tone: "a" },
    { t: "Power plants", b: "Coal, gas, nuclear, hydro, wind, solar, and batteries to fill the gaps.", tone: "r" },
  ];
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <ol className="flex gap-2 min-w-[40rem]">
        {links.map((l, i) => (
          <li key={l.t} className="flex-1 flex items-stretch gap-2">
            <div className="flex-1 rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[l.tone].fg, background: T[l.tone].soft }}>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)]">{l.t}</p>
              <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{l.b}</p>
            </div>
            {i < links.length - 1 && <span className="self-center text-[var(--text-tertiary)]" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <Note>Illustration. Every question you ask an AI service travels this whole chain. The chain is only as strong as its weakest link.</Note>
    </div>
  );
}

// ── 5. Cheaper per task, bigger in total ───────────────────────────────────────

export function TaskVsTotal() {
  const cards: { h: string; big: string; b: string; tone: Tone }[] = [
    { h: "Per task", big: "≥10× less a year", b: "The IEA says energy use per AI task has dropped by “at least an order of magnitude annually in recent years”. A simple text query now typically uses less electricity than running a television for the same time.", tone: "g" },
    { h: "In total", big: "+17% and +50%", b: "Data-centre electricity rose 17% in 2025, to 485 TWh. AI-focused data centres rose 50%.", tone: "a" },
    { h: "New kinds of task", big: "100× to 1,000×", b: "Video generation, reasoning and agentic tasks “can consume hundreds or thousands of times more energy per query than simple text generation”.", tone: "r" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-2.5">
        {cards.map((c) => (
          <div key={c.h} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
            <p className="mono text-[10.5px] tracking-[0.12em] uppercase" style={{ color: T[c.tone].fg }}>{c.h}</p>
            <p className="mt-1 text-[19px] font-bold text-[var(--text-primary)]">{c.big}</p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
          </div>
        ))}
      </div>
      <Note>Source: International Energy Agency, Key Questions on Energy and AI, 16 April 2026. The quotations are the IEA’s own words.</Note>
    </div>
  );
}

// ── 6. Data-centre electricity, 2023–2030 ──────────────────────────────────────

export function DCBars() {
  const years: { y: string; us: number; cn: number; rest: number; total: number; note?: string }[] = [
    { y: "2023", us: 154, cn: 84, rest: 122, total: 360 },
    { y: "2024", us: 183, cn: 102, rest: 131, total: 416 },
    { y: "2025", us: 224, cn: 117, rest: 144, total: 485 },
    { y: "2030", us: 426, cn: 277, rest: 242, total: 945, note: "IEA Base Case" },
  ];
  const max = 945;
  return (
    <div>
      <ul className="space-y-2.5">
        {years.map((r) => (
          <li key={r.y} className="flex items-center gap-2">
            <span className="mono w-12 shrink-0 text-[12px] font-bold text-[var(--text-primary)]">{r.y}</span>
            <div className="flex-1 h-7 rounded-md bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden flex" role="img" aria-label={`${r.y}: ${r.total} terawatt-hours; United States ${r.us}, China ${r.cn}, rest of world ${r.rest}`}>
              <div style={{ width: `${(r.us / max) * 100}%`, background: T.c.fg }} />
              <div style={{ width: `${(r.cn / max) * 100}%`, background: T.r.fg }} />
              <div style={{ width: `${(r.rest / max) * 100}%`, background: T.v.fg }} />
            </div>
            <span className="mono text-[12px] font-bold w-14 shrink-0 text-right text-[var(--text-primary)]">{r.total}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--text-secondary)]">
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T.c.fg }} />United States</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T.r.fg }} />China</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T.v.fg }} />Rest of the world (including India)</span>
      </div>
      <Note>
        Terawatt-hours a year. Source: IEA, Key Questions on Energy and AI (2026), Table A.4, with “rest of the world” worked out by subtraction. 2030 is the IEA’s Base Case projection, not a measurement.
      </Note>
    </div>
  );
}

// ── 7. Perspective ─────────────────────────────────────────────────────────────

export function Perspective() {
  return (
    <div>
      <ul className="space-y-2">
        <Row label="World’s data centres, 2030 (IEA projection)" value={945} max={31772} tone="r" shown="945" ghost />
        <Row label="India, all electricity, 2025" value={2082} max={31772} tone="a" />
        <Row label="United States, all electricity, 2025" value={4520} max={31772} tone="c" />
        <Row label="China, all electricity, 2025" value={10583} max={31772} tone="v" />
        <Row label="World, all electricity, 2025" value={31772} max={31772} tone="g" />
      </ul>
      <Note>
        TWh. The dashed bar is a projection; the others are 2025 generation (Energy Institute and Ember data via Our World in Data). Data centres worldwide in 2030 would use about 3% of the world’s electricity, according to the IEA, and a little under half of what all of India generates today.
      </Note>
    </div>
  );
}

// ── 9. Claim check ─────────────────────────────────────────────────────────────

export function ClaimCheck() {
  const rows: { claim: string; data: string; verdict: string; tone: Tone }[] = [
    {
      claim: "India’s energy use passes the United States’ in 2026, at about 22,000 TWh.",
      data: "In 2025 India used 10,861 TWh against the US’s 26,064 TWh: 42% of it. India’s figure is about half of what the chart shows.",
      verdict: "Not supported",
      tone: "r",
    },
    {
      claim: "India reaches about 60,000 TWh in 2051.",
      data: "The IEA’s 2050 figures for India are 77.5 EJ (about 21,500 TWh) in its Stated Policies Scenario and 89.5 EJ (about 24,900 TWh) in its Current Policies Scenario. 60,000 TWh is 216 EJ.",
      verdict: "Far above both",
      tone: "r",
    },
    {
      claim: "India overtakes China around 2041.",
      data: "In 2050 the IEA has China at 170 to 192 EJ and India at 78 to 90 EJ: China is roughly twice India’s size.",
      verdict: "Not supported",
      tone: "r",
    },
    {
      claim: "China rises, then plateaus and edges down.",
      data: "The IEA’s China lines rise to 2035 and then flatten or fall (Current Policies: 196.4 EJ in 2035, 191.8 in 2050; Stated Policies: 181.9 and 169.8).",
      verdict: "Right in shape",
      tone: "g",
    },
    {
      claim: "The US is roughly flat, then edges up; Western Europe and Japan decline and level off.",
      data: "The IEA has the US at 93.0 EJ in 2024 and between 91.0 and 106.3 EJ in 2050, and the EU and Japan lower in 2050 than in 2024.",
      verdict: "Right in shape",
      tone: "g",
    },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.claim} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft }}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13.5px] font-bold leading-snug text-[var(--text-primary)]">{r.claim}</p>
              <span className="mono shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg, background: "var(--fig-card)" }}>{r.verdict}</span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{r.data}</p>
          </li>
        ))}
      </ul>
      <Note>
        Checked against the IEA’s World Energy Outlook 2025 (Table A.6, total energy supply in exajoules, converted at 1 EJ = 277.8 TWh) and the Energy Institute and Ember data published by Our World in Data. The chart names “IEA World Energy Outlook 2024” and “EIA International Energy Outlook 2023” as sources without naming tables, so its numbers could not be traced to them.
      </Note>
    </div>
  );
}

// ── 10. Chart vs data ──────────────────────────────────────────────────────────

export function ChartVsData() {
  const groups: { title: string; rows: { label: string; chart: number; real: number; tone: Tone }[] }[] = [
    {
      title: "Around 2001",
      rows: [
        { label: "United States", chart: 19000, real: 25759, tone: "c" },
        { label: "China", chart: 8000, real: 11935, tone: "r" },
        { label: "India", chart: 2700, real: 3601, tone: "a" },
      ],
    },
    {
      title: "Around 2026 (chart) and 2025 (data)",
      rows: [
        { label: "United States", chart: 22000, real: 26064, tone: "c" },
        { label: "China", chart: 42000, real: 45054, tone: "r" },
        { label: "India", chart: 22000, real: 10861, tone: "a" },
      ],
    },
  ];
  const max = 46000;
  return (
    <div>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-[13px] font-bold text-[var(--text-primary)] mb-1.5">{g.title}</p>
            <div className="space-y-3">
              {g.rows.map((r) => (
                <div key={r.label}>
                  <p className="text-[12.5px] font-semibold text-[var(--text-primary)]">{r.label}</p>
                  <ul className="space-y-1 mt-0.5">
                    <Row label="Data" value={r.real} max={max} tone={r.tone} lw="w-[6.5rem]" />
                    <Row label="Supplied chart" value={r.chart} max={max} tone={r.tone} ghost shown={`≈${fmt(r.chart)}`} lw="w-[6.5rem]" />
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Note>
        TWh of total energy supply. Solid bars: Energy Institute data via Our World in Data. Dashed bars: values we read by eye from the supplied chart, so treat them as approximate to within a few hundred TWh. The United States and China are in the right neighbourhood; India in 2026 is not.
      </Note>
    </div>
  );
}

// ── 11. India's paths ──────────────────────────────────────────────────────────

export function IEAPaths() {
  const rows: { label: string; ej: number; twh: number; tone: Tone; ghost?: boolean }[] = [
    { label: "2024 (IEA)", ej: 48.4, twh: 13445, tone: "a" },
    { label: "2035, Stated Policies", ej: 64.0, twh: 17778, tone: "g" },
    { label: "2050, Stated Policies", ej: 77.5, twh: 21528, tone: "g" },
    { label: "2050, Current Policies", ej: 89.5, twh: 24861, tone: "c" },
    { label: "2051, the supplied chart", ej: 216, twh: 60000, tone: "r", ghost: true },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.twh} max={60000} tone={r.tone} ghost={r.ghost} shown={`${fmt(r.twh)}`} />
        ))}
      </ul>
      <Note>
        India’s total energy supply in TWh. IEA values are exajoules from World Energy Outlook 2025 Table A.6, converted at 277.8 TWh per EJ (48.4, 64.0, 77.5 and 89.5 EJ). The IEA and the Energy Institute count some fuels differently, so IEA’s 2024 figure for India (about 13,400 TWh) is higher than the Energy Institute’s (about 10,800 TWh); each is used here on its own terms.
      </Note>
    </div>
  );
}

// ── 12. Who adds the most ──────────────────────────────────────────────────────

export function WhoAdds() {
  const rows: { name: string; steps: number; cps: number }[] = [
    { name: "India", steps: 15.6, cps: 18.6 },
    { name: "China", steps: 7.4, cps: 21.9 },
    { name: "Southeast Asia", steps: 10.1, cps: 11.1 },
    { name: "Middle East", steps: 8.0, cps: 10.8 },
    { name: "Africa", steps: 6.5, cps: 8.7 },
    { name: "United States", steps: 0.3, cps: 5.3 },
    { name: "European Union", steps: -4.3, cps: -2.8 },
  ];
  const max = 22;
  const bar = (v: number, tone: Tone) =>
    v >= 0 ? (
      <div className="h-3.5 rounded-full" style={{ width: `${Math.max(1.5, (v / max) * 100)}%`, background: T[tone].fg }} />
    ) : (
      <div className="h-3.5 rounded-full" style={{ width: `${(Math.abs(v) / max) * 100}%`, background: "var(--fig-card)", border: `2px dashed ${T[tone].fg}` }} />
    );
  return (
    <div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.name}>
            <p className="text-[12.5px] font-semibold text-[var(--text-primary)]">{r.name}</p>
            <div className="mt-0.5 grid grid-cols-[1fr_3.6rem] gap-2 items-center">
              <div>{bar(r.steps, "g")}</div>
              <span className="mono text-[11px] font-bold text-right text-[var(--text-primary)]">{r.steps > 0 ? "+" : ""}{r.steps.toFixed(1)}</span>
              <div className="mt-0.5">{bar(r.cps, "c")}</div>
              <span className="mono text-[11px] font-bold text-right text-[var(--text-primary)]">{r.cps > 0 ? "+" : ""}{r.cps.toFixed(1)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--text-secondary)]">
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T.g.fg }} />Stated Policies Scenario</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T.c.fg }} />Current Policies Scenario</span>
      </div>
      <Note>
        Change in total energy supply from 2024 to 2035, in exajoules (EJ). Source: IEA, World Energy Outlook 2025, Table A.6; the differences are our arithmetic. Dashed bars are falls. The ranking of India and China flips between the two scenarios.
      </Note>
    </div>
  );
}

// ── 13. Per person ─────────────────────────────────────────────────────────────

export function PerPerson() {
  const rows = [
    { l: "United States", v: 13015, tone: "c" as Tone },
    { l: "China", v: 7474, tone: "r" as Tone },
    { l: "India", v: 1422, tone: "a" as Tone },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <Row key={r.l} label={r.l} value={r.v} max={13015} tone={r.tone} />
        ))}
      </ul>
      <p className="mt-2 text-[13px] font-bold text-[var(--text-primary)]">India: about 11% of the US figure and 19% of China’s.</p>
      <Note>Kilowatt-hours of electricity generated per person, 2025. Source: Ember and the Energy Institute, as published by Our World in Data (updated 30 June 2026).</Note>
    </div>
  );
}

// ── 14. India's demand timeline ────────────────────────────────────────────────

export function GrowthTimeline() {
  const beats: { t: string; b: string; tone: Tone }[] = [
    { t: "2021–2025", b: "Net electricity demand grew by close to 430 TWh. Four years above 6%, then a slow 2025.", tone: "c" },
    { t: "2025", b: "+1.4% in the IEA’s February estimate, +1.6% in its July update. An early monsoon cut air-conditioning and pumping.", tone: "a" },
    { t: "First half of 2026", b: "About +6%, with May up 11%. Peak demand reached a record 270.8 GW on 21 May.", tone: "r" },
    { t: "2026, full year", b: "The IEA forecasts about +7%.", tone: "v" },
    { t: "2026–2030", b: "About 6.4% a year on average, adding over 570 TWh to India’s annual consumption over the five years.", tone: "g" },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {beats.map((b) => (
          <li key={b.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[b.tone].fg, background: T[b.tone].soft }}>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">{b.t}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{b.b}</p>
          </li>
        ))}
      </ol>
      <Note>Source: IEA, Electricity 2026 (February 2026) and Electricity Mid-Year Update 2026 (July 2026).</Note>
    </div>
  );
}

// ── 15. What drives India's growth ─────────────────────────────────────────────

export function DemandSources() {
  const bars: { t: string; parts: { l: string; v: number; tone: Tone }[]; note: string }[] = [
    {
      t: "2021–2025 (what happened)",
      parts: [
        { l: "Homes and services (buildings)", v: 50, tone: "g" },
        { l: "Industry", v: 36, tone: "c" },
        { l: "Agriculture and transport", v: 14, tone: "a" },
      ],
      note: "Of the buildings share, space cooling was 15 points of the total.",
    },
    {
      t: "2026–2030 (the IEA’s forecast)",
      parts: [
        { l: "Homes and services (buildings)", v: 47, tone: "g" },
        { l: "Industry", v: 33, tone: "c" },
        { l: "Agriculture and transport", v: 20, tone: "a" },
      ],
      note: "Cooling alone is forecast to be over 20 points. Buildings is our remainder; the IEA says its share “will decrease slightly”.",
    },
  ];
  return (
    <div>
      <div className="space-y-4">
        {bars.map((b) => (
          <div key={b.t}>
            <p className="text-[13px] font-bold text-[var(--text-primary)] mb-1">{b.t}</p>
            <div className="flex h-8 rounded-md overflow-hidden border border-[var(--border)]" role="img" aria-label={b.parts.map((p) => `${p.l} ${p.v}%`).join(", ")}>
              {b.parts.map((p) => (
                <div key={p.l} className="flex items-center justify-center text-[12px] font-bold" style={{ width: `${p.v}%`, background: T[p.tone].fg, color: "#fff" }}>
                  {p.v}%
                </div>
              ))}
            </div>
            <p className="mt-1 text-[11.5px] text-[var(--text-tertiary)]">{b.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--text-secondary)]">
        {bars[0].parts.map((p) => (
          <span key={p.l}><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: T[p.tone].fg }} />{p.l}</span>
        ))}
      </div>
      <Note>
        Share of the growth in India’s electricity demand. 2021–2025: buildings about half, industry 36%, with agriculture and transport “the rest”. 2026–2030: industry about a third and agriculture plus transport about a fifth, per IEA, Electricity 2026. Data centres are one of several end uses inside these groups; the IEA does not give them their own share for India.
      </Note>
    </div>
  );
}

// ── 16. India's data centres, in numbers ───────────────────────────────────────

export function DCIndiaCards() {
  const cards: { k: string; big: string; b: string; tone: Tone }[] = [
    { k: "June 2024 (IEA)", big: "2 GW", b: "Installed data-centre capacity in operation, doubled in four years. About 9 TWh of electricity in 2024, or 0.5% of India’s consumption.", tone: "c" },
    { k: "2025 (IEA)", big: "≈ +50%", b: "Growth in India’s data-centre electricity demand, as the IEA describes it. Maharashtra holds more than half of operating capacity.", tone: "a" },
    { k: "H1 2026 (CBRE)", big: "+130 MW", b: "New capacity added in six months, 94% of it in Mumbai. More than 200 MW more expected in the second half.", tone: "g" },
    { k: "End of 2026 (CBRE)", big: "2 GW", b: "Operational capacity CBRE expects, on its own definition.", tone: "v" },
    { k: "2030 (IEA, 2025)", big: "≈ 5 GW", b: "Where installed capacity is “on track” to reach, as of the IEA’s April 2025 report.", tone: "r" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {cards.map((c) => (
          <div key={c.k} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
            <p className="mono text-[10.5px] tracking-[0.12em] uppercase" style={{ color: T[c.tone].fg }}>{c.k}</p>
            <p className="mt-1 text-[22px] font-bold text-[var(--text-primary)]">{c.big}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
          </div>
        ))}
      </div>
      <Note>
        Sources: IEA, Energy and AI (April 2025); IEA, Electricity 2026 (February 2026); CBRE South Asia’s report as reported by IBEF on 7 October 2026. The IEA and CBRE do not use the same definition of “capacity”, so do not read these as one series.
      </Note>
    </div>
  );
}

// ── 17. The money ──────────────────────────────────────────────────────────────

export function MoneyCards() {
  const cards: { k: string; big: string; b: string; tone: Tone }[] = [
    { k: "All data centres, since 2021 (CBRE)", big: "US$173 bn", b: "Investment commitments in India’s data-centre sector, including about US$38 bn in the first half of 2026. More than 15% is tied to AI.", tone: "a" },
    { k: "Google, 2026–2030", big: "≈ US$15 bn", b: "Its first AI hub in India, at Visakhapatnam, with a campus “capable of gigawatt-scale compute capacity”, built with AdaniConneX and Airtel.", tone: "c" },
    { k: "Amazon, 2026–2030", big: "US$48 bn", b: "Its total for India, after adding US$13 bn for AI and cloud infrastructure, which it says will expand AWS data-centre capacity in Mumbai and Hyderabad.", tone: "g" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-2.5">
        {cards.map((c) => (
          <div key={c.k} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
            <p className="mono text-[10.5px] tracking-[0.1em] uppercase leading-snug" style={{ color: T[c.tone].fg }}>{c.k}</p>
            <p className="mt-1 text-[22px] font-bold text-[var(--text-primary)]">{c.big}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
          </div>
        ))}
      </div>
      <Note>
        These are commitments and plans announced by the companies and reported by CBRE, not money already spent. Google’s post is dated 14 October 2025. Amazon’s page follows a 25 June meeting between its chief executive and the Prime Minister, and says it builds on a US$35 bn investment announced in 2025.
      </Note>
    </div>
  );
}

// ── 18. A hot afternoon on the grid ────────────────────────────────────────────

export function GridStrain() {
  const cards: { k: string; big: string; b: string; tone: Tone }[] = [
    { k: "21 May 2026, 3:45 pm", big: "270.8 GW", b: "A record peak load, the fourth record day in a row. It was met, with solar PV covering 22% of the daytime peak (60 GW).", tone: "c" },
    { k: "The evening problem", big: "Net load", b: "After the sun sets, coal and gas have to ramp up fast. Shortages more than doubled in January to May 2026 against a year earlier.", tone: "r" },
    { k: "Prices", big: "Ceiling hit", b: "Spot prices reached the regulatory ceiling of INR 10,000/MWh several times in the first half of 2026.", tone: "a" },
    { k: "Supply response", big: "+30% nuclear", b: "New and restarted reactors are set to lift India’s nuclear generation by 30% in 2026 and 22% in 2027, the IEA says; solar is forecast +39% in 2026.", tone: "g" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {cards.map((c) => (
          <div key={c.k} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[c.tone].fg, background: T[c.tone].soft }}>
            <p className="mono text-[10.5px] tracking-[0.12em] uppercase" style={{ color: T[c.tone].fg }}>{c.k}</p>
            <p className="mt-1 text-[20px] font-bold text-[var(--text-primary)]">{c.big}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{c.b}</p>
          </div>
        ))}
      </div>
      <Note>Source: IEA, Electricity Mid-Year Update 2026 (July 2026).</Note>
    </div>
  );
}

// ── 19. What “lead” can mean ───────────────────────────────────────────────────

export function LeadScoreboard() {
  const rows: { m: string; who: string; india: string; tone: Tone }[] = [
    { m: "Electricity generated today (2025)", who: "China 10,583 TWh, then the US 4,520", india: "Third among individual countries: 2,082 TWh", tone: "a" },
    { m: "Electricity per person (2025)", who: "The US: 13,015 kWh", india: "1,422 kWh, about 11% of the US", tone: "r" },
    { m: "Growth in total energy demand to 2035 (IEA, Stated Policies)", who: "India, +15.6 EJ", india: "First (China is first in the Current Policies Scenario)", tone: "g" },
    { m: "Growth in electricity demand to 2030, in TWh (IEA)", who: "China: “nearly 50%” of the world’s increase", india: "Adds over 570 TWh to its annual consumption", tone: "a" },
    { m: "Growth in electricity demand to 2030, as a rate (IEA)", who: "India, 6.4% a year (Southeast Asia 5.3%, China 4.9%)", india: "First", tone: "g" },
    { m: "Data-centre electricity added, 2025 to 2030 (IEA)", who: "The US, +202 TWh; China, +160 TWh", india: "Not tabulated separately by the IEA; small today (about 9 TWh in 2024)", tone: "r" },
  ];
  return (
    <div>
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {rows.map((r) => (
          <li key={r.m} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft }}>
            <p className="text-[13.5px] font-bold leading-snug text-[var(--text-primary)]">{r.m}</p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">
              <span className="mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Ahead </span>
              {r.who}
            </p>
            <p className="mt-1 text-[12.5px] font-semibold leading-snug" style={{ color: T[r.tone].fg }}>
              <span className="mono text-[10.5px] uppercase tracking-[0.1em]">India </span>
              {r.india}
            </p>
          </li>
        ))}
      </ul>
      <Note>Sources as in the sections above. Green cards are where India leads; amber and rose are where it does not, yet.</Note>
    </div>
  );
}

// ── 20. Watch list ─────────────────────────────────────────────────────────────

export function WatchList() {
  const items: { t: string; b: string; tone: Tone }[] = [
    { t: "Capacity that is switched on", b: "Announced gigawatts are plans. Watch quarterly operational capacity from firms such as CBRE, and ask which definition they use.", tone: "c" },
    { t: "Evening peaks", b: "The IEA’s warnings are about the hours after sunset. Storage and fast-ramping supply are the fix to watch.", tone: "a" },
    { t: "Where the power comes from", b: "Coal fuelled 74% of Indian electricity in the IEA’s 2025 report, with renewables forecast at 35% by 2030. Direct purchase agreements decide what new data centres run on.", tone: "g" },
    { t: "The monsoon", b: "In 2025 an early monsoon helped hold India’s demand growth to about 1.5%, after four years above 6%. One year does not make a trend.", tone: "v" },
    { t: "The IEA’s next update", b: "It published its first AI report in April 2025 and an update in April 2026. Check the date on any figure you read.", tone: "r" },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-2 gap-2.5">
        {items.map((s, i) => (
          <li key={s.t} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]"><span className="mono mr-1.5" style={{ color: T[s.tone].fg }}>{i + 1}</span>{s.t}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
