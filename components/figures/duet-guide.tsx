import type { ReactNode } from "react";

/**
 * Figures for "Claude Duet: what it is, how it works, and how to get ready".
 *
 * Every fact comes from a source listed for this article in lib/references.ts,
 * read on 22 October 2026: Anthropic's announcement and product page for Claude
 * Duet, Anthropic's X thread, and three Anthropic pages on agent safety. These
 * are the company's descriptions of a research preview that we have not used.
 * Anything marked "illustration" is ours.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/claude-duet-proactive-agent";

/** A real screenshot or image from Anthropic's own pages, hosted here because the site's CSP allows only same-origin images. */
export function Pic({ file, alt, width, height, contain }: { file: string; alt: string; width: number; height: number; contain?: boolean }) {
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
        className={`w-full h-auto rounded-[var(--radius)] border border-[var(--border)] ${contain ? "max-w-sm mx-auto bg-[var(--fig-card)]" : ""}`}
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

function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="mono shrink-0 self-start rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[tone].fg, background: T[tone].soft }}>
      {children}
    </span>
  );
}

function Rows({ rows }: { rows: { t: string; d: string; tone: Tone; tag: string }[] }) {
  return (
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
  );
}

function Steps({ steps, tone = "c" }: { steps: string[]; tone?: Tone }) {
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
          <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T[tone].soft, color: T[tone].fg }}>
            {i + 1}
          </span>
          <p className="text-[13px] leading-snug text-[var(--text-primary)]">{s}</p>
        </li>
      ))}
    </ol>
  );
}

/** Figure 2 — the four promises in the one-sentence description. */
export function FourVerbs() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" tag="Comes to you" title="Brings what needs your attention">
          A short brief each morning, then messages through the day only when something needs you.
        </Card>
        <Card tone="v" tag="Does tasks" title="Completes tasks you ask of it">
          From scheduling a meeting to building a dashboard or a forecast.
        </Card>
        <Card tone="g" tag="Keeps going" title="Works when you step away">
          It has its own virtual machine with a browser, so your laptop or phone need not be on.
        </Card>
        <Card tone="a" tag="Checks first" title="Asks before it acts on your behalf">
          Sending, paying, signing and deleting wait for your approval.
        </Card>
      </div>
      <Note>Anthropic’s own one-sentence description, split into its four parts.</Note>
    </div>
  );
}

/** Figure 3 — chat app versus Duet. */
export function VsClaude() {
  const rows: { q: string; chat: string; duet: string }[] = [
    { q: "Who starts?", chat: "You open a chat and work alongside Claude.", duet: "Duet comes to you: a morning brief, then messages when something needs you." },
    { q: "Where does the work happen?", chat: "In the conversation you are watching.", duet: "In the background, on Duet’s own cloud computer, with a notification when done." },
    { q: "What does it know?", chat: "Your Claude account’s memory, skills and connectors.", duet: "The same: memory, skills and connectors carry over from your account." },
    { q: "Conversation shape", chat: "Many chats.", duet: "One ongoing thread, by typing or voice." },
    { q: "Where do you use it?", chat: "The Claude app.", duet: "A separate app on iOS and Android, and claude.ai on the web." },
  ];
  return (
    <div>
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[34rem] text-left text-[12.5px] leading-snug border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-2.5 text-[var(--text-tertiary)] font-semibold" />
              <th className="p-2.5 font-bold" style={{ color: T.c.fg }}>The Claude app</th>
              <th className="p-2.5 font-bold" style={{ color: T.v.fg }}>Claude Duet</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.q}>
                <td className="p-2.5 border-t border-[var(--border)] font-bold text-[var(--text-primary)] align-top">{r.q}</td>
                <td className="p-2.5 border-t border-[var(--border)] text-[var(--text-secondary)] align-top">{r.chat}</td>
                <td className="p-2.5 border-t border-[var(--border)] text-[var(--text-primary)] align-top">{r.duet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>From Anthropic’s product-page FAQ and announcement, condensed.</Note>
    </div>
  );
}

/** Figure 6 — a day with Duet. */
export function DayWithDuet() {
  const items: { t: string; d: string; tone: Tone }[] = [
    { t: "Morning", d: "A short brief on the most important items across your connected apps.", tone: "c" },
    { t: "Through the day", d: "It keeps tabs on those apps, checking every few hours, and messages you only when something needs attention.", tone: "v" },
    { t: "Any time", d: "You hand it a task in a short message, by typing or voice. It works out the apps and steps itself.", tone: "g" },
    { t: "In the background", d: "It works on its own cloud computer. You get a notification when the task is done or needs review.", tone: "a" },
    { t: "Before anything risky", d: "It shows exactly what it is about to do and waits for your approval.", tone: "r" },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {items.map((it) => (
          <li key={it.t} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[it.tone].fg}` }}>
            <span className="mono shrink-0 w-[7.5rem] text-[12px] font-bold" style={{ color: T[it.tone].fg }}>{it.t}</span>
            <p className="text-[13px] leading-snug text-[var(--text-primary)]">{it.d}</p>
          </li>
        ))}
      </ol>
      <Note>Illustration: our ordering of behaviours Anthropic documents. It is not a recording of a real day.</Note>
    </div>
  );
}

/** Figure 7 — how it is put together. */
export function Stack() {
  const layers: { t: string; d: string; tone: Tone }[] = [
    { t: "You", d: "Typing or voice, one thread. Approvals and steering.", tone: "a" },
    { t: "Claude Duet", d: "Built around Claude Opus 5.5, which supplies the judgment about what needs you, what can wait and when to ask.", tone: "v" },
    { t: "Your Claude account", d: "Memory, skills and connected apps, carried over.", tone: "c" },
    { t: "Its own cloud computer", d: "A virtual machine with a browser. Approvals, logins and safety checks run here.", tone: "g" },
    { t: "Your apps", d: "Gmail, Slack, QuickBooks, Stripe and others through connectors.", tone: "r" },
  ];
  return (
    <div>
      <div className="space-y-1.5">
        {layers.map((l, i) => (
          <div key={l.t}>
            <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 text-center" style={{ borderLeft: `4px solid ${T[l.tone].fg}` }}>
              <p className="text-[13.5px] font-bold" style={{ color: T[l.tone].fg }}>{l.t}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{l.d}</p>
            </div>
            {i < layers.length - 1 && <p className="text-center text-[var(--text-tertiary)] leading-none py-0.5" aria-hidden="true">↓</p>}
          </div>
        ))}
      </div>
      <Note>Our diagram of what Anthropic’s announcement and product page describe. Anthropic does not publish an architecture diagram.</Note>
    </div>
  );
}

/** Figure 8 — the approval rule. */
export function Approvals() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card tone="g" tag="On its own" title="Reads, drafts, prepares">
          It reads your accounts, drafts replies and prepares documents without asking each time.
        </Card>
        <Card tone="a" tag="Needs your OK" title="Send, pay, sign, delete">
          It shows exactly what it is about to do and waits for approval.
        </Card>
        <Card tone="r" tag="Off-limits" title="Even with approval">
          Anthropic gives two examples: trading securities and moving money between accounts.
        </Card>
      </div>
      <Note>Anthropic says “a few things” are off-limits and names these two. The full list is not published in the pages we read.</Note>
    </div>
  );
}

/** Figure 9 — safety layers. */
export function SafetyLayers() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Framework", tone: "c", t: "Trustworthy-agents framework", d: "The same framework that guides Claude Code and Claude in Chrome." },
          { tag: "Credentials", tone: "v", t: "Never sees passwords or sign-in tokens", d: "Handled the way Claude Managed Agents handles them." },
          { tag: "Actions", tone: "g", t: "Auto mode classifier approves actions", d: "The safeguard that stops Claude and Claude Code taking steps you did not ask for." },
          { tag: "Injection", tone: "a", t: "Defences against hidden instructions", d: "From Anthropic’s browser-use research on prompt injection." },
          { tag: "Testing", tone: "r", t: "Red teams, an external penetration test, a bug bounty", d: "Duet is covered by Anthropic’s public bug bounty program." },
        ]}
      />
      <Note>Anthropic’s five stated layers. These are claims in a launch post; Anthropic says it will publish more detail on Duet’s safety design.</Note>
    </div>
  );
}

/** Figure 10 — credentials. */
export function Credentials() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="The risk" title="Tokens in the same place as the code">
          Anthropic’s engineering post says that when generated code ran in the same container as credentials, a prompt injection only had to convince Claude to read its own environment.
        </Card>
        <Card tone="g" tag="The fix" title="Tokens kept outside the sandbox">
          Credentials sit in a vault. Claude calls tools through a proxy that fetches them, so the harness is never made aware of them.
        </Card>
      </div>
      <Note>From Anthropic’s Managed Agents post. Duet’s announcement says its credential handling follows this design.</Note>
    </div>
  );
}

/** Figure 11 — information tiers. */
export function Sensitive() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="Strictest tier" title="Requests to share are rejected">
          Anthropic’s examples: credit card numbers and government identification.
        </Card>
        <Card tone="a" tag="Other sensitive" title="Shared only if you explicitly instruct it">
          Anthropic’s examples: health and personal finances.
        </Card>
      </div>
      <Note>The check is a new dedicated classifier plus a safety system prompt, run on each message. Anthropic does not publish how well it works.</Note>
    </div>
  );
}

/** Figure 12 — connectors in the announcement. */
export function Connectors() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Inbox", tone: "c", t: "Gmail and Slack", d: "Find messages you missed and help you reply." },
          { tag: "Money in", tone: "g", t: "QuickBooks and Stripe", d: "Check for unpaid invoices and draft reminders." },
          { tag: "People", tone: "v", t: "Gusto", d: "Prepare and run payroll with hours, bonuses and reimbursements filled in." },
          { tag: "Hiring", tone: "a", t: "LinkedIn", d: "Draft a job posting and, once you edit and approve, post it." },
          { tag: "Contracts", tone: "r", t: "Docusign", d: "Help prepare agreements and send them for review and signature." },
          { tag: "Sales", tone: "c", t: "HubSpot", d: "Draft follow-ups from contact and deal history." },
          { tag: "Marketing", tone: "v", t: "Canva", d: "Turn a product launch into a social campaign." },
          { tag: "Store", tone: "g", t: "Shopify", d: "Set up, design and manage a store. A richer visual editor is listed as coming soon." },
        ]}
      />
      <Note>Anthropic’s examples from its announcement. It says Duet can use over 6,000 connectors and plugins in the Claude Marketplace; these eight are examples, not a complete list.</Note>
    </div>
  );
}

/** Figure 13 — buying things. */
export function Buying() {
  return (
    <div>
      <Steps
        tone="g"
        steps={[
          "You ask Duet to buy something for your business.",
          "Duet confirms the item with you.",
          "Link, Stripe’s digital wallet, asks you to approve the spend.",
          "It pays with a virtual card, so your real card number is not shared.",
        ]}
      />
      <Note>Also named: Shop Pay from Shopify for checking out at online stores. Signing in to sites with logins saved in 1Password is listed as “coming soon”.</Note>
    </div>
  );
}

/** Figure 15 — who and where. */
export function Availability() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="g" tag="Today" title="Research preview, by waitlist">
          Claude Pro and Max subscribers in the US, on iOS, Android and claude.ai.
        </Card>
        <Card tone="r" tag="Not yet" title="Team and Enterprise plans">
          The product page says these plans are not included yet. It names no other countries.
        </Card>
        <Card tone="c" tag="Cost" title="Included in the plan">
          No separate price. It shares your plan’s usage limits with the rest of Claude.
        </Card>
        <Card tone="a" tag="Join" title="Waitlist form">
          The form asks for name, email, company, phone type, and what you would hand off first. Anthropic says it will email when Duet is ready for you.
        </Card>
      </div>
      <Note>As on Anthropic’s pages on 22 October 2026. A research preview can change quickly.</Note>
    </div>
  );
}

/** Figure 16 — usage. */
export function Usage() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="a" tag="Counts" title="Background checks">
          Duet checks your connected accounts every few hours. Nonstop checking would use up your limits much faster, Anthropic says.
        </Card>
        <Card tone="r" tag="Counts more" title="Large tasks">
          A financial model or a deck needs more model turns and background work.
        </Card>
      </div>
      <Note>Anthropic does not publish a number for how much of a plan Duet uses. Watch your own usage during the preview.</Note>
    </div>
  );
}

/** Figure 17 — testers. */
export function Testers() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Anthropic", tone: "c", t: "Boris Cherny, leads Claude Code", d: "Talks through his mental to-do list with Duet on walks." },
          { tag: "Anthropic", tone: "v", t: "Chelsea Larsson, leads model and product behavior design", d: "Hands Duet her to-do list before leaving to be with her kids and gets results in an evening report." },
          { tag: "Anthropic", tone: "g", t: "Karan Ahuja, leads the Duet team", d: "Schedules user interviews, builds prototypes and ships code with it." },
          { tag: "Owner", tone: "a", t: "Jess Provencher, broker, Pro Homes", d: "Duet flagged, unprompted, a property showing on her calendar on the wrong day." },
          { tag: "Owner", tone: "r", t: "Mya Dalton, brand strategist", d: "Duet prepared a call brief, noticed the call fell right before her flight and offered to move it." },
        ]}
      />
      <Note>All five are stories Anthropic chose to publish. The three “Anthropic” rows are Anthropic employees describing their own product.</Note>
    </div>
  );
}

/** Figure 18 — limits. */
export function Limits() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Judgment", tone: "r", t: "May misread a thread or miscalibrate what is urgent", d: "Anthropic says this plainly, and that it will keep tuning it." },
          { tag: "Timing", tone: "a", t: "Can miss something that arrives between check-ins", d: "Checks are every few hours, not continuous." },
          { tag: "Errands", tone: "v", t: "Personal errands are weaker than work", d: "Booking tickets is Anthropic’s example. The core was built around work." },
          { tag: "Visibility", tone: "c", t: "Cannot yet show you its browser", d: "You can see what it has done and is doing, and steer it." },
          { tag: "Separate", tone: "g", t: "Lives in its own app", d: "Separate from the main Claude app for now." },
        ]}
      />
      <Note>All from Anthropic’s announcement and product-page FAQ.</Note>
    </div>
  );
}

/** Figure 19 — a practical path. */
export function GetReady() {
  return (
    <div>
      <Steps
        tone="v"
        steps={[
          "Join the waitlist on Anthropic’s page, if you are on Pro or Max in the US.",
          "Before access arrives, tidy your Claude account: memory, skills and connected apps all carry over.",
          "Connect only the apps you would hand over, and know you can disconnect any of them.",
          "Pick a first task that is low risk and easy to check, such as a morning brief or drafting reminders.",
          "Tell it what you want to hear about and how often.",
          "Read every approval screen. It shows exactly what it is about to do.",
          "Watch your usage during the first week.",
        ]}
      />
      <Note>Illustration: our suggested order, built from what Anthropic describes. We have not used Duet.</Note>
    </div>
  );
}

/** Figure 20 — unknowns. */
export function Unknowns() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Safety", tone: "r", t: "The full safety write-up", d: "Anthropic says it will share more about Duet’s safety design “in the coming days”. We did not find it in the pages we read." },
          { tag: "Numbers", tone: "a", t: "How often it is right", d: "No error rates, no measured false alarms and no independent test in the sources we read." },
          { tag: "Usage", tone: "v", t: "How much of your plan it uses", d: "Described in words only." },
          { tag: "Reach", tone: "c", t: "Countries and plans beyond US Pro and Max", d: "No dates given." },
          { tag: "Later", tone: "g", t: "How it joins the main Claude app", d: "Anthropic says early users will shape this." },
        ]}
      />
      <Note>What we could not find in Anthropic’s pages on 22 October 2026.</Note>
    </div>
  );
}
