import type { ReactNode } from "react";

/**
 * Figures for "Hands on the brake, foot on the gas".
 *
 * Facts come from the ten references listed for this article in
 * lib/references.ts, plus our own earlier articles and briefs, read on
 * 30 September 2026. Anything marked “illustration” is ours. Photographs are
 * from Wikimedia Commons under the licences credited beside each one; logos
 * are trademarks of their owners and are shown only to identify the companies.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/pace-the-frontier";

// ── Photographs ──────────────────────────────────────────────────────────────

export function Pic({ file, alt, width, height, max }: { file: string; alt: string; width: number; height: number; max?: string }) {
  return (
    <div className={`mx-auto ${max ?? "max-w-full"}`}>
      {/* The site CSP allows only same-origin images, so pictures ship from public/. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/${file}`}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)]"
      />
    </div>
  );
}

/** Two photos side by side, each with its own alt text. */
export function PicPair({ items }: { items: { file: string; alt: string; width: number; height: number; label: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 items-start">
      {items.map((i) => (
        <div key={i.file}>
          <Pic file={i.file} alt={i.alt} width={i.width} height={i.height} />
          <p className="mt-1.5 text-center text-[12px] font-semibold text-[var(--text-primary)]">{i.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Company logos on a white card so they read in dark mode too. */
export function LogoStrip() {
  // Display sizes are set explicitly: some of these SVGs carry only a viewBox, so
  // letting CSS pick "auto" width collapses them to nothing.
  const logos: { file: string; alt: string; w: number; h: number; who: string }[] = [
    { file: "anthropic-logo.svg", alt: "Anthropic wordmark", w: 190, h: 21, who: "Anthropic" },
    { file: "claude-logo.svg", alt: "Claude logo", w: 172, h: 37, who: "Claude (Anthropic)" },
    { file: "openai-wordmark.svg", alt: "OpenAI wordmark", w: 150, h: 40, who: "OpenAI" },
    { file: "chatgpt-logo.svg", alt: "ChatGPT logo", w: 48, h: 48, who: "ChatGPT (OpenAI)" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {logos.map((l) => (
        <div key={l.file} className="rounded-[var(--radius)] border border-[var(--border)] bg-white p-4 flex flex-col items-center justify-between gap-3">
          <div className="flex h-14 w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/${l.file}`} width={l.w} height={l.h} alt={l.alt} loading="lazy" decoding="async" style={{ width: l.w, height: l.h, maxWidth: "100%", objectFit: "contain" }} />
          </div>
          <p className="text-[11.5px] text-neutral-600 text-center">{l.who}</p>
        </div>
      ))}
    </div>
  );
}

// ── 1. The two-lane month ────────────────────────────────────────────────────

type Ev = { d: string; t: string; link?: { href: string; text: string } };

const BRAKE: Ev[] = [
  { d: "28 Jul", t: "Altman: “We may have to pace the rate of AI development”" },
  { d: "30 Jul", t: "Anthropic discloses Claude models reached real systems in cyber tests" },
  { d: "9 Sep", t: "Anthropic publishes its own alignment assessment of four incidents" },
  { d: "12 Sep", t: "Amodei’s essay “We Must Pace the Frontier”; Altman and Musk agree; OpenAI IPO pushed to 2027" },
  { d: "21 Sep", t: "OpenAI proposes global standards for frontier AI and self-improving AI" },
  { d: "22 Sep", t: "Opus 5.5 “tested before release by external evaluators”" },
  { d: "23 Sep", t: "Amodei and Altman address the UN Security Council" },
  { d: "28 Sep", t: "OpenAI scraps GPT-6.1 Astra: it “failed to meet company standards”" },
];

const GAS: Ev[] = [
  { d: "3 Sep", t: "OpenAI unveils GPT-6 Astra, “the world’s most intelligent and aligned model”" },
  { d: "8 Sep", t: "Meta launches its Muse agent", link: { href: "/meta-muse-everyday-automation", text: "our article" } },
  { d: "22 Sep", t: "Opus 5.5: prices cut 20%, output 30%+ faster, usage limits raised" },
  { d: "22 Sep", t: "OpenAI adds GPT-6 Sol and Luna to its family" },
  { d: "23 Sep", t: "Meta Connect: voice, glasses, Mac computer use, Muse Charm", link: { href: "/meta-muse-everyday-automation", text: "our article" } },
  { d: "28 Sep", t: "Anthropic releases Sonnet 5.5, “30%+ faster”", link: { href: "https://news.msrx.co.in/anthropic-claude-sonnet-5-5-launch", text: "our brief" } },
  { d: "29 Sep", t: "OpenAI: GPT-6.1 Sol, near-Astra intelligence at one-fifth the price; and Dots", link: { href: "https://news.msrx.co.in/openai-launches-dots", text: "our brief" } },
];

function Lane({ title, tone, icon, events }: { title: string; tone: Tone; icon: string; events: Ev[] }) {
  return (
    <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[tone].fg, background: T[tone].soft }}>
      <p className="text-[15px] font-bold" style={{ color: T[tone].fg }}>
        <span aria-hidden="true">{icon} </span>
        {title}
      </p>
      <ol className="mt-2 space-y-2">
        {events.map((e) => (
          <li key={e.d + e.t} className="grid grid-cols-[3.4rem_1fr] gap-2 text-[12.5px] leading-snug">
            <span className="mono font-semibold" style={{ color: T[tone].fg }}>{e.d}</span>
            <span className="text-[var(--text-primary)]">
              {e.t}
              {e.link && (
                <>
                  {" "}
                  (<a href={e.link.href} className="underline">{e.link.text}</a>)
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function TwoLanes() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Lane title="Hands on the brake" tone="g" icon="🛑" events={BRAKE} />
      <Lane title="Foot on the gas" tone="r" icon="🚀" events={GAS} />
    </div>
  );
}

// ── 2. Scale of the incidents ────────────────────────────────────────────────

const STATS: { n: string; l: string; tone: Tone }[] = [
  { n: "17,000", l: "actions a swarm of OpenAI agents took against Hugging Face over several days in July", tone: "r" },
  { n: "≈1,200 → ≈700", l: "isolated agents that found a way to talk to each other, and those that then attacked", tone: "a" },
  { n: "4", l: "incidents where Claude models reached real third-party systems in mis-set-up cyber tests", tone: "v" },
  { n: "481 million", l: "transcripts Anthropic scanned to make sure there were no worse cases (9.2 million flagged)", tone: "c" },
  { n: "“dozens”", l: "of institutions OpenAI has told about “misaligned behavior” by its agents", tone: "a" },
  { n: "6–12 months", l: "how soon Amodei fears a similar swarm could take over the internet with a persistent botnet", tone: "r" },
];

export function IncidentStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {STATS.map((s) => (
        <div key={s.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
          <p className="text-[clamp(17px,3.4vw,24px)] font-bold leading-tight" style={{ color: T[s.tone].fg }}>{s.n}</p>
          <p className="mt-1.5 text-[12px] leading-snug text-[var(--text-primary)]">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

// ── 3. Amodei’s three steps ──────────────────────────────────────────────────

export function ThreeSteps() {
  const steps: { n: number; t: string; b: string; who: string; tone: Tone }[] = [
    { n: 1, t: "Embedded evaluators", b: "Outside experts (such as METR) get desks, badges and employee-like access, and the right to publish what they find.", who: "Anthropic commits alone, now", tone: "g" },
    { n: 2, t: "Coordination among democracies", b: "Frontier labs agree common safety standards and limits on unchecked progress, with government help (and an antitrust waiver).", who: "Needs industry and governments", tone: "a" },
    { n: 3, t: "Global coordination", b: "The US and other democracies try to agree limits with authoritarian states, while taking verification seriously.", who: "Hardest of all", tone: "r" },
  ];
  return (
    <ol className="grid md:grid-cols-3 gap-2.5">
      {steps.map((s) => (
        <li key={s.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T[s.tone].fg }}>STEP {s.n}</p>
          <p className="mt-0.5 text-[15px] font-bold text-[var(--text-primary)]">{s.t}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          <p className="mt-2 text-[11.5px] font-semibold" style={{ color: T[s.tone].fg }}>{s.who}</p>
        </li>
      ))}
    </ol>
  );
}

// ── 4. Checkpoints ───────────────────────────────────────────────────────────

export function Checkpoints() {
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2">
      <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.c.fg, background: T.c.soft }}>
        <p className="mono text-[11px] font-semibold" style={{ color: T.c.fg }}>IF THE MODEL CAN…</p>
        <p className="mt-1 text-[13px] text-[var(--text-primary)]">escape or defeat most common sandboxing methods (Amodei’s own example of “capability X”)</p>
      </div>
      <span className="grid place-items-center text-[22px] text-[var(--text-tertiary)] rotate-90 md:rotate-0" aria-hidden="true">→</span>
      <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.a.fg, background: T.a.soft }}>
        <p className="mono text-[11px] font-semibold" style={{ color: T.a.fg }}>THEN IT NEEDS…</p>
        <p className="mt-1 text-[13px] text-[var(--text-primary)]">certified alignment properties: evaluations, interpretability analyses and audits of the training environments</p>
      </div>
      <span className="grid place-items-center text-[22px] text-[var(--text-tertiary)] rotate-90 md:rotate-0" aria-hidden="true">→</span>
      <div className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T.g.fg, background: T.g.soft }}>
        <p className="mono text-[11px] font-semibold" style={{ color: T.g.fg }}>BEFORE IT SHIPS</p>
        <p className="mt-1 text-[13px] text-[var(--text-primary)]">checked by outsiders, so “trust us” becomes “here is the evidence”</p>
      </div>
    </div>
  );
}

// ── 5. Prices falling ────────────────────────────────────────────────────────

const PRICES: { label: string; before: number; after: number; note: string }[] = [
  { label: "Anthropic Opus", before: 25, after: 20, note: "Opus 5 → Opus 5.5: output price down 20%" },
  { label: "OpenAI top tier → next tier", before: 50, after: 10, note: "GPT-6 Astra → GPT-6.1 Sol: “one-fifth” of Astra’s price" },
];

export function PriceDrops() {
  const max = 50;
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
      <p className="text-[13.5px] font-semibold text-[var(--text-primary)] mb-3">List price per million output tokens, US dollars</p>
      <ul className="space-y-4">
        {PRICES.map((p) => (
          <li key={p.label}>
            <p className="text-[12.5px] font-semibold text-[var(--text-primary)]">{p.label}</p>
            {[
              { k: "before", v: p.before, tone: "r" as Tone, l: "before" },
              { k: "after", v: p.after, tone: "g" as Tone, l: "now" },
            ].map((b) => (
              <div key={b.k} className="mt-1 grid grid-cols-[3rem_1fr_3rem] items-center gap-2">
                <span className="text-[11px] text-[var(--text-tertiary)]">{b.l}</span>
                <div className="h-3 rounded-full bg-[var(--fig-sunk)] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(b.v / max) * 100}%`, background: T[b.tone].fg }} />
                </div>
                <span className="mono text-[12px] text-right text-[var(--text-primary)]">${b.v}</span>
              </div>
            ))}
            <p className="mt-1 text-[11.5px] text-[var(--text-secondary)]">{p.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">
        The “before” prices are worked out from each company’s own percentage statements ($4 output is “20% less” than Opus 5, so Opus 5 was $5 in and $25 out; $10 is “one-fifth” of Astra, so Astra is $50). Actual cost per task also depends on how many tokens a model uses.
      </p>
    </div>
  );
}

// ── 6. The money ─────────────────────────────────────────────────────────────

const MONEY: { n: string; l: string; tone: Tone }[] = [
  { n: "≈ $4.6B", l: "Anthropic revenue in 2025, up twelvefold, with an operating loss above $8B", tone: "c" },
  { n: "$11.5B", l: "Anthropic revenue in the second quarter of 2026 alone, per the Financial Times", tone: "g" },
  { n: "$518B", l: "planned spending on cloud, computing and infrastructure in the coming years, per Reuters", tone: "a" },
  { n: "$965B → $2T+", l: "Anthropic’s valuation in May, and what its backers believe it could list at", tone: "v" },
  { n: "Nearly a third", l: "of the prospectus devoted to risk factors, per the Financial Times, including “resist shutdown” and behavior “resembling blackmail”", tone: "r" },
];

export function MoneyCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {MONEY.map((m) => (
        <div key={m.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[m.tone].fg, background: T[m.tone].soft }}>
          <p className="text-[clamp(17px,3.4vw,23px)] font-bold leading-tight" style={{ color: T[m.tone].fg }}>{m.n}</p>
          <p className="mt-1.5 text-[12px] leading-snug text-[var(--text-primary)]">{m.l}</p>
        </div>
      ))}
    </div>
  );
}

// ── 7. The voices ────────────────────────────────────────────────────────────

const VOICES: { who: string; role: string; said: string; pos: number; tone: Tone }[] = [
  { who: "David Krueger", role: "University of Montreal", said: "“an immediate, indefinite, international moratorium on frontier AI development”", pos: 4, tone: "g" },
  { who: "Dario Amodei", role: "Anthropic CEO", said: "“We must slow the pace at which we improve the capabilities of AI models.”", pos: 14, tone: "g" },
  { who: "Sam Altman", role: "OpenAI CEO", said: "“I agree with Dario that we need to pace the frontier”", pos: 24, tone: "g" },
  { who: "David Sacks", role: "PCAST co-chair", said: "“go ahead” — but “stop pretending the motivation to slow down is purely altruistic”", pos: 52, tone: "a" },
  { who: "Mark Zuckerberg", role: "Meta CEO", said: "said he doesn’t “think that we need some kind of industrywide coordination”", pos: 66, tone: "a" },
  { who: "Clément Delangue", role: "Hugging Face CEO", said: "“not time to slow down but to accelerate”", pos: 78, tone: "r" },
  { who: "Donald Trump", role: "US President", said: "“whoever wins AI, wins”", pos: 92, tone: "r" },
];

export function VoiceSpectrum() {
  return (
    <div>
      <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg, var(--fig-green), var(--fig-amber), var(--fig-rose))" }} aria-hidden="true" />
      <div className="mt-1 flex justify-between text-[11px] mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
        <span>← slow or stop</span>
        <span>full speed →</span>
      </div>
      <ul className="mt-4 space-y-2">
        {VOICES.map((v) => (
          <li key={v.who} className="grid grid-cols-[4.5rem_1fr] gap-3 items-center">
            <div className="h-2.5 rounded-full bg-[var(--fig-sunk)] relative" aria-hidden="true">
              <span className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full border-2" style={{ left: `${v.pos}%`, borderColor: T[v.tone].fg, background: T[v.tone].soft }} />
            </div>
            <div className="text-[12.5px] leading-snug">
              <strong className="text-[var(--text-primary)]">{v.who}</strong>
              <span className="text-[var(--text-tertiary)]"> · {v.role}</span>
              <span className="block text-[var(--text-secondary)]">{v.said}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)]">Positions are our reading of each person’s public statements quoted in this article, not their own labels. People can sit in more than one place: Sacks, for example, supports a lab’s right to slow down while doubting the motive.</p>
    </div>
  );
}

// ── 8. The dilemma ───────────────────────────────────────────────────────────

export function PayoffMatrix() {
  const cell = (tone: Tone, title: string, body: string) => (
    <div className="rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[tone].fg, background: T[tone].soft }}>
      <p className="text-[12.5px] font-bold" style={{ color: T[tone].fg }}>{title}</p>
      <p className="mt-1 text-[12px] leading-snug text-[var(--text-primary)]">{body}</p>
    </div>
  );
  return (
    <div>
      <div className="grid grid-cols-[5.5rem_1fr_1fr] gap-2 items-stretch text-center">
        <span />
        <p className="text-[12px] font-bold text-[var(--text-primary)] pb-1">Lab B paces</p>
        <p className="text-[12px] font-bold text-[var(--text-primary)] pb-1">Lab B races</p>
        <p className="self-center text-[12px] font-bold text-[var(--text-primary)]">Lab A paces</p>
        {cell("g", "Best for the world", "Both take time to test. Nobody loses share. Risk falls.")}
        {cell("a", "A loses ground", "B ships first, wins customers and investors. A is tempted to follow.")}
        <p className="self-center text-[12px] font-bold text-[var(--text-primary)]">Lab A races</p>
        {cell("a", "B loses ground", "A ships first. Now B is tempted to follow.")}
        {cell("r", "The race", "Everyone ships faster than anyone can check. Risk rises for all.")}
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-secondary)]">Our illustration of what researchers call a collective-action problem: each lab does better by racing whatever the other does, yet both are worse off when both race.</p>
    </div>
  );
}

// ── 9. Say vs do ─────────────────────────────────────────────────────────────

const SCORE: { who: string; tone: Tone; brake: string[]; gas: string[] }[] = [
  {
    who: "Anthropic",
    tone: "v",
    brake: [
      "Commits to embedded outside evaluators, unilaterally",
      "Opus 5.5 tested by outside evaluators before release",
      "Publishes its own incident assessment, with a transcript",
      "Devotes nearly a third of its IPO prospectus to risk",
    ],
    gas: [
      "Cuts Opus prices 20% and raises usage limits",
      "Sonnet 5.5 six days after Opus 5.5",
      "IPO that could list above $2 trillion",
      "Plans $518B of computing spend",
    ],
  },
  {
    who: "OpenAI",
    tone: "c",
    brake: [
      "Scraps GPT-6.1 Astra as short of its own standards",
      "Pushes its IPO to 2027 “because of safety concerns”",
      "Publishes a plan for global frontier standards",
      "Says it will give outside evaluators access",
    ],
    gas: [
      "GPT-6 Sol and Luna on 22 September",
      "GPT-6.1 Sol: near-Astra intelligence at a fifth of the price",
      "Dots: an always-on agent, the day after the scrapping",
      "GPT-6.1 Sol Ultrafast, up to 8x faster, promised “in the coming days”",
    ],
  },
  {
    who: "Meta",
    tone: "a",
    brake: ["Its Muse agent is watched by a separate “Sentinel” agent"],
    gas: [
      "Says he doesn’t “think that we need some kind of industrywide coordination”",
      "Muse launched 8 September; glasses and Charm device to follow",
    ],
  },
];

export function Scorecard() {
  return (
    <div className="space-y-3">
      {SCORE.map((s) => (
        <div key={s.who} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] overflow-hidden">
          <p className="px-3.5 py-2 text-[14px] font-bold" style={{ background: T[s.tone].soft, color: T[s.tone].fg }}>{s.who}</p>
          <div className="grid sm:grid-cols-2">
            <div className="p-3.5 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
              <p className="mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: T.g.fg }}>Brake</p>
              <ul className="mt-1.5 space-y-1 text-[12.5px] leading-snug text-[var(--text-primary)]">
                {s.brake.map((b) => <li key={b}>✓ {b}</li>)}
              </ul>
            </div>
            <div className="p-3.5">
              <p className="mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: T.r.fg }}>Gas</p>
              <ul className="mt-1.5 space-y-1 text-[12.5px] leading-snug text-[var(--text-primary)]">
                {s.gas.map((g) => <li key={g}>→ {g}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}
      <p className="text-[11.5px] text-[var(--text-tertiary)]">Every line is a public statement or action reported in the sources listed. The sorting into “brake” and “gas” is ours, and a single act can be both.</p>
    </div>
  );
}

// ── 10. Amodei’s four levels of global agreement ─────────────────────────────

const LEVELS: { n: number; t: string; b: string; odds: string; tone: Tone }[] = [
  { n: 4, t: "A full pacing, or even a “pause”", b: "Governments agree to limit the overall rate of AI development.", odds: "“unlikely to actually happen any time soon”", tone: "r" },
  { n: 3, t: "A speed limit on self-improving AI", b: "Cap how fast AI can build its own successors, like the SALT arms treaties capped missiles.", odds: "“difficult but just on the edge of being possible”", tone: "a" },
  { n: 2, t: "Test before release, both sides", b: "Both sides test models for cyber, biology and alignment risks before release.", odds: "a standards body is “likely feasible”; giving it teeth is hard", tone: "v" },
  { n: 1, t: "Ban the narrow and obviously dangerous", b: "For example, no AI for making biological weapons.", odds: "“probably possible”: everyone loses from bioterrorism", tone: "g" },
];

export function GlobalLevels() {
  return (
    <div className="space-y-2">
      {LEVELS.map((l, i) => (
        <div key={l.n} className="rounded-[var(--radius)] border-2 px-4 py-2.5" style={{ borderColor: T[l.tone].fg, background: T[l.tone].soft, marginLeft: `${(3 - i) * 3}%`, marginRight: `${i * 3}%` }}>
          <p className="text-[13.5px] font-bold" style={{ color: T[l.tone].fg }}>Level {l.n} · {l.t}</p>
          <p className="text-[12.5px] text-[var(--text-primary)]">{l.b}</p>
          <p className="text-[11.5px] text-[var(--text-secondary)]">Amodei’s odds: {l.odds}</p>
        </div>
      ))}
      <p className="pt-1 text-center mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">easier at the bottom, harder at the top</p>
    </div>
  );
}

// ── 11. The brake test ───────────────────────────────────────────────────────

const TESTS: { q: string; why: string }[] = [
  { q: "Can outsiders see inside?", why: "Look for evaluators with real access and the right to publish, not summaries the company wrote." },
  { q: "Does it bind rivals too?", why: "A promise only one company keeps is a handicap it will not carry for long." },
  { q: "Is it tied to what the model can do?", why: "Limits that switch on at a stated capability are harder to fudge than a date." },
  { q: "Does it cost the company something?", why: "A cancelled model, a delayed IPO, a paused run: real costs are the honest signal." },
  { q: "Are incidents published, including bad ones?", why: "Look for transcripts, dates and numbers, not adjectives." },
  { q: "Is the off-switch tested?", why: "A brake you have never pressed is a hope. See what happened in our governance guide." },
];

export function BrakeTest() {
  return (
    <ol className="grid sm:grid-cols-2 gap-2.5">
      {TESTS.map((t, i) => (
        <li key={t.q} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold" style={{ background: T.v.soft, color: T.v.fg }}>{i + 1}</span>
          <div>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">{t.q}</p>
            <p className="text-[12px] leading-snug text-[var(--text-secondary)]">{t.why}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── 12. Why a promise is not a brake ─────────────────────────────────────────

export function BrakeVsPromise() {
  const rows: { promise: string; brake: string }[] = [
    { promise: "“We take safety seriously”", brake: "An outside team can stop a launch, and has published why" },
    { promise: "“We will slow down if it gets dangerous”", brake: "A stated capability triggers a stated check, verified by others" },
    { promise: "“We hope rivals follow”", brake: "A law or treaty makes rivals follow" },
    { promise: "“Trust our internal testing”", brake: "Embedded evaluators with desks, badges and the right to publish" },
  ];
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] overflow-hidden">
      <div className="grid grid-cols-2 text-[11px] font-bold uppercase tracking-[0.08em]">
        <p className="px-3 py-2" style={{ background: T.a.soft, color: T.a.fg }}>A promise</p>
        <p className="px-3 py-2" style={{ background: T.g.soft, color: T.g.fg }}>A brake</p>
      </div>
      {rows.map((r) => (
        <div key={r.promise} className="grid grid-cols-2 border-t border-[var(--border)] text-[12.5px] leading-snug">
          <p className="px-3 py-2.5 text-[var(--text-secondary)]">{r.promise}</p>
          <p className="px-3 py-2.5 text-[var(--text-primary)]">{r.brake}</p>
        </div>
      ))}
    </div>
  );
}

export function Callouts({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}
