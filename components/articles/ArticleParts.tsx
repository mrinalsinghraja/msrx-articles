import type { ReactNode } from "react";
import { Baby, Brain, Lightbulb, TriangleAlert, Sparkles } from "lucide-react";
import type { ArticleLevel } from "@/lib/articles";

/**
 * Building blocks shared by every article. All server-rendered; nothing here
 * ships JavaScript. Colours come from the --fig-* tokens in globals.css so the
 * same markup reads in both themes.
 */

const LEVEL_STYLE: Record<ArticleLevel, { color: string; soft: string; label: string }> = {
  Beginner: { color: "var(--fig-green)", soft: "var(--fig-green-soft)", label: "Beginner" },
  Intermediate: { color: "var(--fig-amber)", soft: "var(--fig-amber-soft)", label: "Intermediate" },
  Advanced: { color: "var(--fig-rose)", soft: "var(--fig-rose-soft)", label: "Advanced" },
};

/** Small pill that says how deep the section below goes. */
export function LevelTag({ level }: { level: ArticleLevel }) {
  const s = LEVEL_STYLE[level];
  return (
    <span
      className="mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium tracking-[0.12em] uppercase align-middle"
      style={{ color: s.color, background: s.soft }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: s.color }} aria-hidden="true" />
      {s.label}
    </span>
  );
}

/** A section heading with an anchor id and a level tag above it. */
export function SectionHeading({
  id,
  level,
  number,
  children,
}: {
  id: string;
  level: ArticleLevel;
  number: number;
  children: ReactNode;
}) {
  return (
    <>
      <div className="!mt-20 flex items-center gap-3">
        <span className="mono text-[13px] text-[var(--text-tertiary)]">{String(number).padStart(2, "0")}</span>
        <LevelTag level={level} />
      </div>
      <h2 id={id} className="!mt-3">
        {children}
      </h2>
    </>
  );
}

/** A diagram or illustration with a numbered caption. */
export function Figure({
  number,
  caption,
  children,
  wide = false,
}: {
  number: number;
  caption: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={`fig !my-10 ${wide ? "lg:-mx-16" : ""}`}>
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--fig-sunk)] p-4 sm:p-6 overflow-hidden">
        {children}
      </div>
      <figcaption className="mt-3 text-[13.5px] leading-relaxed text-[var(--text-tertiary)]">
        <span className="mono font-medium text-[var(--text-secondary)]">Fig. {number}</span> — {caption}
      </figcaption>
    </figure>
  );
}

const CALLOUT = {
  eli5: { icon: Baby, title: "In plain words", color: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  deep: { icon: Brain, title: "Going deeper", color: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
  tip: { icon: Lightbulb, title: "Try this", color: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  warn: { icon: TriangleAlert, title: "Watch out", color: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
  fact: { icon: Sparkles, title: "Did you know?", color: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
} as const;

/** A boxed aside: the plain-English version, a deeper dive, a tip or a warning. */
export function Callout({
  kind,
  title,
  children,
}: {
  kind: keyof typeof CALLOUT;
  title?: string;
  children: ReactNode;
}) {
  const c = CALLOUT[kind];
  const Icon = c.icon;
  return (
    <aside
      className="!my-8 rounded-[var(--radius)] border-l-4 px-5 py-4 text-[15.5px] leading-relaxed"
      style={{ borderColor: c.color, background: c.soft }}
    >
      <p className="flex items-center gap-2 font-semibold mb-1.5" style={{ color: c.color }}>
        <Icon size={16} aria-hidden="true" />
        {title ?? c.title}
      </p>
      <div className="text-[var(--text-primary)] space-y-2 [&_code]:bg-[var(--card)]">{children}</div>
    </aside>
  );
}

/** A displayed equation, centred, with an optional plain-English reading. */
export function MathBlock({ children, reading }: { children: ReactNode; reading?: string }) {
  return (
    <div className="!my-7 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-5 text-center overflow-x-auto">
      <p className="math text-[20px] whitespace-nowrap">{children}</p>
      {reading && <p className="mt-2 text-[13.5px] text-[var(--text-tertiary)]">{reading}</p>}
    </div>
  );
}

/** A mock window frame for illustrated "screenshots" of an interface. */
export function WindowFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--card)] overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--paper-tint)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[var(--text-tertiary)] truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}
