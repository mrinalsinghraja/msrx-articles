import type { ReactNode } from "react";

/**
 * Diagrams for "AI governance and risk management".
 *
 * Facts in these figures come from the sources listed in lib/references.ts
 * (NIST AI 100-1 and AI 600-1, the European Commission’s AI Act page, ISO’s
 * page for ISO/IEC 42001, India’s PIB backgrounder, the OECD AI Principles,
 * and two company posts), read on 29 September 2026. Anything marked
 * “illustration” is our own example, not part of any standard.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className="arrowhead" />
      </marker>
    </defs>
  );
}

/** Wide diagrams scroll sideways on phones instead of shrinking to unreadable text. */
function Wide({ min, children }: { min: number; children: ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1" tabIndex={0} role="group" aria-label="Diagram, scrolls sideways on small screens">
      <div style={{ minWidth: min }}>{children}</div>
    </div>
  );
}

function Card({ tone, title, children, icon }: { tone: Tone; title: ReactNode; children: ReactNode; icon?: string }) {
  return (
    <div className="rounded-[var(--radius)] border-2 p-4" style={{ borderColor: T[tone].fg, background: T[tone].soft }}>
      <p className="text-[16px] font-bold" style={{ color: T[tone].fg }}>
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </p>
      <div className="mt-2 text-[13px] leading-snug text-[var(--text-primary)] space-y-1.5">{children}</div>
    </div>
  );
}

// ── 1. Governance vs risk management ─────────────────────────────────────────

export function GovernanceVsRisk() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="v" icon="🏛️" title="Governance decides">
        <p>Who is allowed to build or buy AI here? For what? Who signs off, who is answerable when it goes wrong, and which rules apply?</p>
        <p className="text-[12px] text-[var(--text-secondary)]">Like the rules of the road and the licence you need to drive.</p>
      </Card>
      <Card tone="a" icon="🚦" title="Risk management checks">
        <p>For each AI system: what could go wrong, how likely, how bad, and what are we doing about it, before and after launch?</p>
        <p className="text-[12px] text-[var(--text-secondary)]">Like checking the brakes, the tyres and the weather before a journey.</p>
      </Card>
    </div>
  );
}

// ── 2. Why AI needs its own treatment ────────────────────────────────────────

const DIFFS: { old: string; ai: string }[] = [
  { old: "Behaves the same way every time it gets the same input", ai: "Probabilistic: the same question can get different answers" },
  { old: "Changes only when someone ships a new version", ai: "Can shift with new data, new prompts or a new model behind the same name" },
  { old: "You can read the code to see why it did something", ai: "Often can’t be fully explained; you test behaviour instead" },
  { old: "Does what it is programmed to do", ai: "Agents may take actions nobody spelled out in advance" },
];

export function WhyDifferent() {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] overflow-hidden">
      <div className="grid grid-cols-2 text-[12px] font-bold uppercase tracking-[0.08em]">
        <p className="px-3 py-2" style={{ background: T.c.soft, color: T.c.fg }}>Traditional software</p>
        <p className="px-3 py-2" style={{ background: T.v.soft, color: T.v.fg }}>AI systems</p>
      </div>
      {DIFFS.map((d) => (
        <div key={d.ai} className="grid grid-cols-2 border-t border-[var(--border)] text-[13px] leading-snug">
          <p className="px-3 py-2.5 text-[var(--text-secondary)]">{d.old}</p>
          <p className="px-3 py-2.5 text-[var(--text-primary)]">{d.ai}</p>
        </div>
      ))}
      <p className="border-t border-[var(--border)] px-3 py-2 text-[11.5px] text-[var(--text-tertiary)]">A simplification for teaching. Some traditional software is also unpredictable, and some AI is tightly controlled.</p>
    </div>
  );
}

// ── 3. The NIST core ─────────────────────────────────────────────────────────

export function NistCore() {
  const fn = [
    { x: 60, y: 92, w: 150, t: "MAP", s: "Understand the context and what could go wrong", cls: "c-s" },
    { x: 250, y: 92, w: 150, t: "MEASURE", s: "Test and track the risks you found", cls: "a-s" },
    { x: 440, y: 92, w: 150, t: "MANAGE", s: "Act on the risks and respond to incidents", cls: "r-s" },
  ];
  return (
    <Wide min={560}>
      <svg viewBox="0 0 650 250" role="img" aria-labelledby="nist-t">
        <title id="nist-t">The four functions of the NIST AI Risk Management Framework. GOVERN is a cross-cutting function drawn as a band across the top that applies to everything. Beneath it, MAP, MEASURE and MANAGE follow one another and loop back, applied at each stage of an AI system’s lifecycle.</title>
        <Arrow id="nist-ar" />
        <rect x="20" y="16" width="610" height="56" rx="14" className="v-s" strokeWidth="1.8" />
        <text x="325" y="40" textAnchor="middle" fontSize="15" fontWeight="700" className="t">GOVERN</text>
        <text x="325" y="59" textAnchor="middle" fontSize="11" className="t2">culture, policies, roles and accountability — applies to everything below</text>
        {fn.map((f, i) => (
          <g key={f.t}>
            <rect x={f.x} y={f.y} width={f.w} height="86" rx="12" className={f.cls} strokeWidth="1.5" />
            <text x={f.x + f.w / 2} y={f.y + 30} textAnchor="middle" fontSize="14" fontWeight="700" className="t">{f.t}</text>
            <text x={f.x + f.w / 2} y={f.y + 50} textAnchor="middle" fontSize="10.5" className="t2">{f.s.split(" ").slice(0, 4).join(" ")}</text>
            <text x={f.x + f.w / 2} y={f.y + 65} textAnchor="middle" fontSize="10.5" className="t2">{f.s.split(" ").slice(4).join(" ")}</text>
            {i < 2 && <line x1={f.x + f.w + 3} y1={f.y + 43} x2={f.x + f.w + 37} y2={f.y + 43} className="ln" strokeWidth="1.8" markerEnd="url(#nist-ar)" />}
          </g>
        ))}
        <path d="M 515 182 L 515 214 L 135 214 L 135 186" className="a-ln" strokeWidth="1.5" strokeDasharray="4 4" fill="none" markerEnd="url(#nist-ar)" />
        <text x="325" y="234" textAnchor="middle" fontSize="11" className="t2">repeat as the system, its context and its risks change — not a checklist, not one-off</text>
      </svg>
    </Wide>
  );
}

// ── 4. Seven characteristics of trustworthy AI ───────────────────────────────

const TRUST: { n: string; q: string; tone: Tone }[] = [
  { n: "Valid and reliable", q: "Does it do what it claims, consistently?", tone: "c" },
  { n: "Safe", q: "Can it hurt people or property?", tone: "r" },
  { n: "Secure and resilient", q: "Can it be attacked, and does it recover?", tone: "a" },
  { n: "Accountable and transparent", q: "Is someone answerable, and can we see how it works?", tone: "v" },
  { n: "Explainable and interpretable", q: "Can a person understand its output?", tone: "g" },
  { n: "Privacy-enhanced", q: "Does it protect personal data?", tone: "c" },
  { n: "Fair, with harmful bias managed", q: "Does it treat groups equitably?", tone: "a" },
];

export function TrustCharacteristics() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {TRUST.map((t, i) => (
        <div key={t.n} className="rounded-[var(--radius)] border p-3 bg-[var(--fig-card)]" style={{ borderColor: T[t.tone].fg }}>
          <p className="flex items-center gap-2 text-[13.5px] font-bold text-[var(--text-primary)]">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px]" style={{ background: T[t.tone].soft, color: T[t.tone].fg }}>{i + 1}</span>
            {t.n}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">{t.q}</p>
        </div>
      ))}
    </div>
  );
}

// ── 5. NIST’s twelve generative-AI risks ─────────────────────────────────────

const GAI: { n: string; e: string }[] = [
  { n: "CBRN information or capabilities", e: "help with chemical, biological, radiological or nuclear weapons" },
  { n: "Confabulation", e: "confident, false statements (“hallucinations”)" },
  { n: "Dangerous, violent or hateful content", e: "content that encourages harm" },
  { n: "Data privacy", e: "leaks or misuse of personal data" },
  { n: "Environmental impacts", e: "energy and resources used to train and run models" },
  { n: "Harmful bias and homogenization", e: "unfair outcomes; everything starting to sound the same" },
  { n: "Human–AI configuration", e: "over-trust, or confusing people about what they’re talking to" },
  { n: "Information integrity", e: "misinformation and disinformation at scale" },
  { n: "Information security", e: "new ways to attack systems, and new attack surface" },
  { n: "Intellectual property", e: "copying of protected content; exposure of trade secrets" },
  { n: "Obscene, degrading or abusive content", e: "including synthetic abuse imagery" },
  { n: "Value chain and component integration", e: "untraceable third-party models, data and libraries" },
];

export function GenAiRisks() {
  return (
    <ol className="grid sm:grid-cols-2 gap-2">
      {GAI.map((g, i) => (
        <li key={g.n} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-2.5">
          <span className="mono w-6 shrink-0 text-[12px] font-bold text-[var(--fig-violet)]">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-[12.5px] leading-snug">
            <strong className="text-[var(--text-primary)]">{g.n}</strong>
            <span className="text-[var(--text-secondary)]"> — {g.e}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// ── 6. The landscape: five instruments ───────────────────────────────────────

const LANDSCAPE: { tone: Tone; name: string; kind: string; binding: string; what: string }[] = [
  { tone: "r", name: "EU AI Act", kind: "Law", binding: "Binding in the EU", what: "Bans some uses; strict duties for high-risk systems; transparency rules; rules for general-purpose models" },
  { tone: "c", name: "NIST AI RMF", kind: "Framework", binding: "Voluntary (US)", what: "Govern, Map, Measure, Manage; plus a Generative AI Profile of 12 risks" },
  { tone: "g", name: "ISO/IEC 42001", kind: "Management-system standard", binding: "Voluntary international standard, sold by ISO", what: "Requirements for establishing, implementing, maintaining and continually improving an AI management system" },
  { tone: "v", name: "OECD AI Principles", kind: "Principles", binding: "Intergovernmental; 47 adherents", what: "Five values-based principles; the shared vocabulary many laws borrow" },
  { tone: "a", name: "India AI Governance Guidelines", kind: "National guidelines", binding: "Principle-based; builds on existing Indian laws", what: "Seven sutras, six pillars, new national institutions proposed" },
];

export function Landscape() {
  return (
    <ul className="space-y-2">
      {LANDSCAPE.map((l) => (
        <li key={l.name} className="grid sm:grid-cols-[10rem_1fr] gap-x-4 gap-y-1 rounded-[var(--radius)] border-l-4 border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeftColor: T[l.tone].fg }}>
          <div>
            <p className="text-[14px] font-bold text-[var(--text-primary)]">{l.name}</p>
            <p className="mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: T[l.tone].fg }}>{l.kind}</p>
          </div>
          <div className="text-[12.5px] leading-snug">
            <p className="text-[var(--text-primary)]">{l.what}</p>
            <p className="mt-0.5 text-[var(--text-secondary)]"><strong>Status:</strong> {l.binding}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── 7. EU risk pyramid ───────────────────────────────────────────────────────

const PYRAMID: { tone: Tone; t: string; rule: string; ex: string; w: number }[] = [
  { tone: "r", t: "Unacceptable", rule: "Banned", ex: "social scoring; manipulation and deception that cause harm; untargeted scraping of faces", w: 46 },
  { tone: "a", t: "High risk", rule: "Strict duties before market: risk management, data quality, logging, documentation, human oversight, robustness", ex: "CV sorting; credit scoring; exam scoring; safety parts of machines", w: 64 },
  { tone: "v", t: "Transparency risk", rule: "People must be told; AI content must be identifiable", ex: "chatbots; deepfakes; AI-written public-interest text", w: 82 },
  { tone: "g", t: "Minimal or none", rule: "No new rules", ex: "spam filters; AI in video games", w: 100 },
];

export function EuPyramid() {
  return (
    <div className="space-y-2">
      {PYRAMID.map((p) => (
        <div key={p.t} className="mx-auto rounded-[var(--radius)] border-2 px-4 py-2.5" style={{ width: `${p.w}%`, borderColor: T[p.tone].fg, background: T[p.tone].soft }}>
          <p className="text-[14px] font-bold" style={{ color: T[p.tone].fg }}>{p.t} <span className="font-medium text-[var(--text-primary)]">— {p.rule.split(":")[0]}</span></p>
          {p.rule.includes(":") && <p className="text-[12px] text-[var(--text-primary)]">{p.rule.split(":").slice(1).join(":").trim()}</p>}
          <p className="mt-0.5 text-[11.5px] text-[var(--text-secondary)]">e.g. {p.ex}</p>
        </div>
      ))}
    </div>
  );
}

// ── 8. EU dates ──────────────────────────────────────────────────────────────

const EU_DATES: { d: string; t: string; tone: Tone }[] = [
  { d: "Feb 2025", t: "Prohibitions 1–8 apply", tone: "r" },
  { d: "Aug 2025", t: "Rules for general-purpose AI models apply", tone: "v" },
  { d: "Aug 2026", t: "Transparency rules apply; Commission starts enforcing on 2 August", tone: "c" },
  { d: "Dec 2026", t: "Ninth prohibition (non-consensual sexual content) applies", tone: "r" },
  { d: "2 Dec 2027", t: "High-risk obligations apply, after the Omnibus deferral", tone: "a" },
];

export function EuDates() {
  return (
    <ol className="relative border-l-2 border-[var(--fig-line)] ml-2 space-y-4">
      {EU_DATES.map((e) => (
        <li key={e.d} className="pl-5 relative">
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2" style={{ borderColor: T[e.tone].fg, background: T[e.tone].soft }} aria-hidden="true" />
          <p className="mono text-[11.5px] font-semibold" style={{ color: T[e.tone].fg }}>{e.d}</p>
          <p className="text-[13.5px] text-[var(--text-primary)] leading-snug">{e.t}</p>
        </li>
      ))}
    </ol>
  );
}

// ── 9. India’s seven sutras ──────────────────────────────────────────────────

const SUTRAS: { n: string; b: string; tone: Tone }[] = [
  { n: "Trust is the foundation", b: "across technology, organisations and institutions", tone: "v" },
  { n: "People first", b: "humans keep meaningful control", tone: "c" },
  { n: "Innovation over restraint", b: "responsible innovation over cautionary restraint, all else equal", tone: "g" },
  { n: "Fairness and equity", b: "avoid bias, especially against marginalised groups", tone: "a" },
  { n: "Accountability", b: "assigned by function, risk of harm and due diligence", tone: "r" },
  { n: "Understandable by design", b: "clear explanations and disclosures", tone: "c" },
  { n: "Safety, resilience, sustainability", b: "safeguards, early warnings, resource-efficient models", tone: "g" },
];

export function Sutras() {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {SUTRAS.map((s, i) => (
        <div key={s.n} className="flex gap-3 rounded-[var(--radius)] border p-3 bg-[var(--fig-card)]" style={{ borderColor: T[s.tone].fg }}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold" style={{ background: T[s.tone].soft, color: T[s.tone].fg }}>{i + 1}</span>
          <div>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">{s.n}</p>
            <p className="text-[12px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 10. Tiering: how much control does each system need? ─────────────────────

function TierQ({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border-2 border-[var(--fig-line)] bg-[var(--fig-card)] px-3.5 py-2.5 text-[13.5px] font-semibold text-[var(--text-primary)]">
      <span className="mono mr-2 text-[var(--text-tertiary)]">Q{n}</span>{children}
    </div>
  );
}

function TierOut({ tone, title, children }: { tone: Tone; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border-2 px-3.5 py-2.5 text-[12.5px] leading-snug" style={{ borderColor: T[tone].fg, background: T[tone].soft }}>
      <p className="text-[13.5px] font-bold" style={{ color: T[tone].fg }}>{title}</p>
      <p className="text-[var(--text-primary)]">{children}</p>
    </div>
  );
}

export function TierFlow() {
  return (
    <ol className="space-y-2.5">
      <li className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TierQ n={1}>Does it affect people’s rights, safety, money or access to services, or act on its own without a person approving each action?</TierQ>
        <span className="text-center mono text-[12px] text-[var(--text-tertiary)]" aria-hidden="true">yes →</span>
        <TierOut tone="r" title="Tier 1 · full controls">Impact assessment, testing before launch, human sign-off, monitoring, incident plan, named owner.</TierOut>
      </li>
      <li className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TierQ n={2}>If no: does it handle personal or confidential data, or talk to customers?</TierQ>
        <span className="text-center mono text-[12px] text-[var(--text-tertiary)]" aria-hidden="true">yes →</span>
        <TierOut tone="a" title="Tier 2 · standard controls">Data review, testing, logging, named owner, periodic review.</TierOut>
      </li>
      <li className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TierQ n={3}>If no to both:</TierQ>
        <span className="text-center mono text-[12px] text-[var(--text-tertiary)]" aria-hidden="true">→</span>
        <TierOut tone="g" title="Tier 3 · light touch">Listed in the inventory, basic monitoring, a named owner.</TierOut>
      </li>
      <li className="text-[12px] text-[var(--text-secondary)]">Our illustration, not from any standard. Re-tier a system whenever its purpose, data or autonomy changes.</li>
    </ol>
  );
}

// ── 11. Who does what ────────────────────────────────────────────────────────

const ROLES: { role: string; icon: string; job: string; tone: Tone }[] = [
  { role: "Leadership / board", icon: "🏛️", job: "Sets risk appetite; owns the policy; is told about serious incidents", tone: "v" },
  { role: "AI system owner", icon: "🧭", job: "One named person per system: purpose, limits, sign-off, ongoing monitoring", tone: "c" },
  { role: "Builders and buyers", icon: "🛠️", job: "Test, document, apply controls; vet third-party models and data", tone: "g" },
  { role: "Risk, legal, security, privacy", icon: "🛡️", job: "Set the rules, review Tier 1 systems, advise on law and standards", tone: "a" },
  { role: "Independent review", icon: "🔍", job: "Internal audit or outside assessors check the system and the process", tone: "r" },
];

export function Roles() {
  return (
    <ul className="space-y-2">
      {ROLES.map((r) => (
        <li key={r.role} className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft }}>
          <span className="text-[22px] text-center" aria-hidden="true">{r.icon}</span>
          <div>
            <p className="text-[13.5px] font-bold" style={{ color: T[r.tone].fg }}>{r.role}</p>
            <p className="text-[12.5px] leading-snug text-[var(--text-primary)]">{r.job}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── 12. Risk register row ────────────────────────────────────────────────────

export function RegisterExample() {
  const rows: [string, string][] = [
    ["System", "Customer-support chatbot (illustration)"],
    ["Owner", "Head of Customer Care"],
    ["Risk", "Promises a refund the policy doesn’t allow (confabulation, NIST risk 2)"],
    ["Likelihood × impact", "3 × 4 = 12, rated High on our example scale"],
    ["Controls", "Answers only from the policy text; a checker blocks money promises; a person approves refunds"],
    ["Residual risk", "Medium, reviewed monthly"],
    ["Evidence", "Test results, sampled chat logs, complaint count"],
  ];
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] overflow-hidden">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[8rem_1fr] border-t border-[var(--border)] first:border-t-0 text-[13px]">
          <p className="px-3 py-2 font-semibold text-[var(--text-primary)] bg-[var(--fig-sunk)]">{k}</p>
          <p className="px-3 py-2 text-[var(--text-secondary)]">{v}</p>
        </div>
      ))}
    </div>
  );
}

// ── 13. Case study: the 20 September sandbox incident ────────────────────────

const CONTROLS: { layer: string; assumed: string; result: string; tone: Tone; mark: string }[] = [
  { layer: "Network restriction", assumed: "The sandbox has no live internet access", result: "Gap: DNS lookups reached the outside world", tone: "r", mark: "✗" },
  { layer: "Automated monitoring", assumed: "Attempts that succeed will be detected", result: "Flagged within 15 minutes, but other DNS attempts were not flagged at the expected severity", tone: "a", mark: "≈" },
  { layer: "Human review", assumed: "A person looks at high-priority alerts", result: "Acknowledged about three minutes after the alert", tone: "g", mark: "✓" },
  { layer: "Automatic stop", assumed: "The run halts by itself on an alert", result: "Did not halt on its own; the run was stopped by hand about 2.5 hours after review began", tone: "r", mark: "✗" },
];

export function IncidentControls() {
  return (
    <div>
      <ul className="space-y-2">
        {CONTROLS.map((c) => (
          <li key={c.layer} className="grid grid-cols-[2rem_1fr] gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="grid h-7 w-7 place-items-center rounded-full text-[14px] font-bold" style={{ background: T[c.tone].soft, color: T[c.tone].fg }} aria-hidden="true">{c.mark}</span>
            <div>
              <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">{c.layer}</p>
              <p className="text-[12px] text-[var(--text-secondary)]">Assumed: {c.assumed}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-primary)]">What happened: {c.result}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[12px] text-[var(--text-secondary)]">
        Four layers, four assumptions. Two failed, one partly worked, one did. That is why layers exist.
      </p>
    </div>
  );
}

// ── 14. Incident loop ────────────────────────────────────────────────────────

export function IncidentLoop() {
  const steps: { icon: string; t: string; b: string; tone: Tone }[] = [
    { icon: "🔔", t: "Detect", b: "monitoring or a report raises the alarm", tone: "a" },
    { icon: "⏸️", t: "Contain", b: "pause the system; stop the spread", tone: "r" },
    { icon: "🔎", t: "Investigate", b: "what happened, to whom, since when", tone: "c" },
    { icon: "📣", t: "Notify", b: "affected people, regulators, partners as required", tone: "v" },
    { icon: "🔧", t: "Fix", b: "close the gap; test the fix", tone: "g" },
    { icon: "📚", t: "Learn", b: "update the risk register and the rules", tone: "g" },
  ];
  return (
    <div>
      <ol className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-[var(--radius)] border p-3 text-center" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <p className="text-[20px] leading-none" aria-hidden="true">{s.icon}</p>
            <p className="mt-1 text-[13px] font-bold text-[var(--text-primary)]">{i + 1}. {s.t}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">↻ then back to detect, with better eyes</p>
    </div>
  );
}

// ── 15. Controls stack ───────────────────────────────────────────────────────

const STACK: { tone: Tone; t: string; b: string }[] = [
  { tone: "v", t: "Policy and accountability", b: "named owners, approval gates, rules people can follow" },
  { tone: "c", t: "Process", b: "impact assessments, testing before launch, change control, incident plan" },
  { tone: "a", t: "People and training", b: "AI literacy; know when to override the machine" },
  { tone: "g", t: "Technical guardrails", b: "least-privilege access, approvals for risky actions, logging, monitoring, kill switch" },
];

export function ControlStack() {
  return (
    <div className="space-y-2">
      {STACK.map((s, i) => (
        <div key={s.t} className="rounded-[var(--radius)] border-2 px-4 py-2.5" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft, marginLeft: `${i * 3}%`, marginRight: `${(3 - i) * 3}%` }}>
          <p className="text-[14px] font-bold" style={{ color: T[s.tone].fg }}>{s.t}</p>
          <p className="text-[12.5px] text-[var(--text-primary)]">{s.b}</p>
        </div>
      ))}
      <p className="pt-1 text-center text-[12px] text-[var(--text-secondary)]">Rules that live only on paper fail first. Put the important ones in the system itself.</p>
    </div>
  );
}

// ── 16. Ninety days ──────────────────────────────────────────────────────────

const NINETY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "Days 1–30", t: "See", b: "Inventory every AI system, including shadow AI and vendor features. Name an owner for each. Write a one-page policy.", tone: "c" },
  { d: "Days 31–60", t: "Tier", b: "Rate each system Tier 1, 2 or 3. Run impact assessments and testing on Tier 1. Fix the biggest gaps.", tone: "a" },
  { d: "Days 61–90", t: "Run", b: "Turn on monitoring and logging. Rehearse an incident. Brief leadership. Set the review calendar.", tone: "g" },
];

export function NinetyDays() {
  return (
    <ol className="grid sm:grid-cols-3 gap-2.5">
      {NINETY.map((n) => (
        <li key={n.d} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[n.tone].fg, background: T[n.tone].soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T[n.tone].fg }}>{n.d}</p>
          <p className="mt-0.5 text-[15px] font-bold text-[var(--text-primary)]">{n.t}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">{n.b}</p>
        </li>
      ))}
    </ol>
  );
}
