import type { ReactNode } from "react";

/**
 * Diagrams for "Democratizing automation: bringing Meta’s Muse into everyday life".
 *
 * Every fact in these figures comes from Meta’s own posts of 8 and 24 September
 * 2026, Stripe’s announcement of 8 September 2026 or TechCrunch’s reporting of
 * 25 September 2026, as read on 28 September 2026. They are drawings, not
 * screenshots of Muse; example tasks marked “illustration” are ours.
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

// ── 1. Assistant vs agent ────────────────────────────────────────────────────

export function AssistantVsAgent() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="c" icon="💬" title="An assistant answers">
        <p>You ask “what’s a good gift for a 10-year-old?”. It gives you a list. Then <em>you</em> compare prices, open the shop, type your card number and check out.</p>
        <p className="text-[12px] text-[var(--text-secondary)]">One turn at a time. Stops when you stop typing.</p>
      </Card>
      <Card tone="v" icon="🛠️" title="An agent does the work">
        <p>You say “sort out a birthday gift for Aarav, under ₹2,000, delivered by Friday”. It searches, compares, fills the cart, and comes back to you only to approve the payment.</p>
        <p className="text-[12px] text-[var(--text-secondary)]">Keeps working after you close the app. Asks before anything hard to undo.</p>
      </Card>
    </div>
  );
}

// ── 2. Where you can reach Muse ──────────────────────────────────────────────

const PLACES: { icon: string; name: string; note: string; status: "now" | "soon"; }[] = [
  { icon: "📱", name: "Muse app", note: "iOS and Android", status: "now" },
  { icon: "💬", name: "WhatsApp", note: "message it like a person", status: "now" },
  { icon: "🌐", name: "Web", note: "muse.ai", status: "now" },
  { icon: "💻", name: "Mac app", note: "computer use: can drive any app, with your permission", status: "now" },
  { icon: "🕶️", name: "AI glasses", note: "say its name; it sees what you see", status: "soon" },
  { icon: "🔮", name: "Muse Charm", note: "pocket device with real-time voice", status: "soon" },
];

export function WhereMuseLives() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {PLACES.map((p) => (
        <div key={p.name} className="rounded-[var(--radius)] border bg-[var(--fig-card)] p-3" style={{ borderColor: p.status === "now" ? T.g.fg : T.a.fg }}>
          <p className="text-[22px] leading-none" aria-hidden="true">{p.icon}</p>
          <p className="mt-1.5 text-[14px] font-bold text-[var(--text-primary)]">{p.name}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-[var(--text-secondary)]">{p.note}</p>
          <p className="mt-1.5 mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: p.status === "now" ? T.g.fg : T.a.fg }}>
            {p.status === "now" ? "● available (US)" : "○ announced, coming"}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── 3. Timeline ──────────────────────────────────────────────────────────────

const EVENTS: { date: string; what: string; tone: Tone }[] = [
  { date: "Early 2026", what: "Meta’s team starts using Muse internally", tone: "c" },
  { date: "8 Apr 2026", what: "Muse Spark, the first model from Meta Superintelligence Labs, launches inside Meta AI", tone: "c" },
  { date: "8 Sep 2026", what: "Muse launches in the US; Stripe’s Link wallet built in; bug bounty opens to all", tone: "v" },
  { date: "18–19 Sep 2026", what: "No. 1 on the US App Store (18th) and Google Play (19th), per Sensor Tower", tone: "g" },
  { date: "23 Sep 2026", what: "Connect 2026: voice, glasses, Mac computer use, new connectors, Muse Charm", tone: "a" },
  { date: "Later in 2026", what: "Muse Confidential VM promised: data encrypted so even Meta can’t read it", tone: "r" },
];

export function MuseTimeline() {
  return (
    <ol className="relative border-l-2 border-[var(--fig-line)] ml-2 space-y-4">
      {EVENTS.map((e) => (
        <li key={e.date} className="pl-5 relative">
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2" style={{ borderColor: T[e.tone].fg, background: T[e.tone].soft }} aria-hidden="true" />
          <p className="mono text-[11.5px] font-semibold" style={{ color: T[e.tone].fg }}>{e.date}</p>
          <p className="text-[13.5px] text-[var(--text-primary)] leading-snug">{e.what}</p>
        </li>
      ))}
    </ol>
  );
}

// ── 4. A day with Muse ───────────────────────────────────────────────────────

const DAY: { time: string; icon: string; task: string; kind: "Meta example" | "illustration"; approve?: string }[] = [
  { time: "07:30", icon: "🏫", task: "Reads the school emails overnight, puts a sports tryout deadline on the family calendar and pings you about it", kind: "Meta example" },
  { time: "10:00", icon: "🧾", task: "Checks for unclaimed money in your name (a TechCrunch reviewer found some on day one)", kind: "Meta example" },
  { time: "13:00", icon: "🍲", task: "Turns a recipe reel you saved on Instagram into a grocery list", kind: "Meta example" },
  { time: "16:00", icon: "📉", task: "Works on lowering one of your bills and shows you the offer it got", kind: "Meta example", approve: "you approve the new plan" },
  { time: "19:00", icon: "🎉", task: "Plans a dinner party menu that respects your friends’ dietary needs, drafts the invites", kind: "Meta example", approve: "you approve before they send" },
  { time: "22:00", icon: "💊", task: "Reminds you that your mother’s prescription refill is due and queues the pharmacy order", kind: "illustration", approve: "you approve the purchase" },
];

export function DayWithMuse() {
  return (
    <ul className="space-y-2">
      {DAY.map((d) => (
        <li key={d.time} className="grid grid-cols-[3.5rem_1fr] gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
          <div className="text-center">
            <p className="text-[20px] leading-none" aria-hidden="true">{d.icon}</p>
            <p className="mono text-[11px] mt-1 text-[var(--text-secondary)]">{d.time}</p>
          </div>
          <div>
            <p className="text-[13.5px] leading-snug text-[var(--text-primary)]">{d.task}</p>
            <p className="mt-1 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full px-2 py-0.5" style={{ background: d.kind === "Meta example" ? T.v.soft : T.a.soft, color: d.kind === "Meta example" ? T.v.fg : T.a.fg }}>
                {d.kind === "Meta example" ? "example from the sources" : "our illustration"}
              </span>
              {d.approve && (
                <span className="rounded-full px-2 py-0.5" style={{ background: T.r.soft, color: T.r.fg }}>✋ {d.approve}</span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── 5. Access ladder ─────────────────────────────────────────────────────────

const RUNGS: { step: string; ex: string; risk: string; tone: Tone }[] = [
  { step: "4. Spend", ex: "buy the gift, pay the bill", risk: "money leaves — approval every time", tone: "r" },
  { step: "3. Act for you", ex: "send the email, book the table", risk: "others see it — hard to undo", tone: "a" },
  { step: "2. Draft", ex: "write the reply, fill the cart", risk: "nothing leaves until you say so", tone: "c" },
  { step: "1. Read", ex: "read my calendar, flag clashes", risk: "lowest risk — start here", tone: "g" },
];

export function AccessLadder() {
  return (
    <div className="space-y-2">
      {RUNGS.map((r, i) => (
        <div
          key={r.step}
          className="rounded-[var(--radius)] border-2 px-4 py-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          style={{ borderColor: T[r.tone].fg, background: T[r.tone].soft, marginLeft: `${(3 - i) * 4}%`, marginRight: `${i * 4}%` }}
        >
          <p className="text-[14px] font-bold" style={{ color: T[r.tone].fg }}>{r.step}</p>
          <p className="text-[12.5px] text-[var(--text-primary)]">{r.ex}</p>
          <p className="w-full text-[11.5px] text-[var(--text-secondary)]">{r.risk}</p>
        </div>
      ))}
      <p className="pt-1 text-center mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">climb one rung at a time, once the one below has earned your trust</p>
    </div>
  );
}

// ── 6. The Muse Secure VM ────────────────────────────────────────────────────

export function SecureVm() {
  return (
    <Wide min={600}>
      <svg viewBox="0 0 680 400" role="img" aria-labelledby="vm-t">
        <title id="vm-t">Inside the Muse Secure VM, as Meta describes it. Your own cloud computer holds two isolated domains. The runtime cell, which handles untrusted data, contains the Muse agent harness, your files and workspace, the tools Muse runs and the browser sub-agent. The host side holds the security services: the Sentinel, the only authority that can approve connector actions and network traffic; authd, which stores credentials and hands Muse only surrogate tokens; privsep workers that run connector code with narrow credentials; safety classifiers; and the app database. Every request to the internet or to a connected service passes through the Sentinel, which allows it, denies it or asks you in the app.</title>
        <Arrow id="vm-ar" />
        <rect x="8" y="8" width="664" height="384" rx="16" className="box" strokeWidth="1.5" />
        <text x="24" y="32" fontSize="13" fontWeight="700" className="t">Your Muse Secure VM — your own dedicated computer in the cloud</text>

        <rect x="24" y="48" width="290" height="250" rx="14" className="v-s" strokeWidth="1.5" />
        <text x="169" y="72" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">Runtime cell</text>
        <text x="169" y="88" textAnchor="middle" fontSize="10.5" className="t2">expects untrusted data · no real passwords</text>
        {["🧠 Muse agent (the harness)", "📁 your files, workspace, memory", "🛠️ tools and code Muse writes", "🌐 browser sub-agent (sees an", "accessibility tree, runs no JS)"].map((s, i) => (
          <text key={s} x={i === 4 ? 64 : 44} y={118 + i * 24 - (i === 4 ? 6 : 0)} fontSize="11.5" className="t">{s}</text>
        ))}
        <text x="44" y="252" fontSize="10.5" className="t2">holds only surrogate tokens like</text>
        <text x="44" y="268" fontSize="10.5" className="t2 mono">tok_surrogate_7f…</text>

        <rect x="366" y="48" width="290" height="250" rx="14" className="g-s" strokeWidth="1.5" />
        <text x="511" y="72" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">Host side — security services</text>
        <text x="511" y="88" textAnchor="middle" fontSize="10.5" className="t2">Muse cannot reach in or switch them off</text>
        {[
          ["🛡️ Sentinel", "sole authority for actions + egress"],
          ["🔑 authd", "stores credentials, mints surrogates"],
          ["⚙️ privsep workers", "run connector code, narrow keys"],
          ["🔎 safety classifiers", "watch for prompt injection"],
          ["🗄️ database", "app state, kept separate"],
        ].map(([a, b], i) => (
          <g key={a}>
            <text x="384" y={118 + i * 34} fontSize="11.5" fontWeight="600" className="t">{a}</text>
            <text x="404" y={132 + i * 34} fontSize="10.5" className="t2">{b}</text>
          </g>
        ))}

        <line x1="316" y1="170" x2="362" y2="170" className="ln" strokeWidth="1.8" markerEnd="url(#vm-ar)" />
        <text x="339" y="160" textAnchor="middle" fontSize="9.5" className="t3">asks</text>

        <rect x="366" y="316" width="290" height="60" rx="12" className="a-s" strokeWidth="1.5" />
        <text x="511" y="340" textAnchor="middle" fontSize="12" fontWeight="700" className="t">Internet · Gmail · shops · your car</text>
        <text x="511" y="358" textAnchor="middle" fontSize="10.5" className="t2">reached only after the Sentinel says yes</text>
        <line x1="511" y1="300" x2="511" y2="312" className="ln" strokeWidth="1.8" markerEnd="url(#vm-ar)" />

        <rect x="24" y="316" width="290" height="60" rx="12" className="c-s" strokeWidth="1.5" />
        <text x="169" y="340" textAnchor="middle" fontSize="12" fontWeight="700" className="t">📱 You, in the Muse app</text>
        <text x="169" y="358" textAnchor="middle" fontSize="10.5" className="t2">approval cards come from the Sentinel</text>
        <path d="M 400 300 C 380 330, 340 346, 318 346" className="a-ln" strokeWidth="1.5" strokeDasharray="4 4" fill="none" markerEnd="url(#vm-ar)" />
        <text x="340" y="376" textAnchor="middle" fontSize="9.5" className="t3">“ask you”</text>
      </svg>
    </Wide>
  );
}

// ── 7. Surrogate tokens ──────────────────────────────────────────────────────

export function SurrogateFlow() {
  const lanes = [
    { x: 90, l: "Muse", s: "runtime cell", cls: "v-s" },
    { x: 300, l: "Sentinel", s: "network boundary", cls: "g-s" },
    { x: 510, l: "Gmail API", s: "outside world", cls: "a-s" },
  ];
  const msgs: { y: number; from: number; to: number; t: string; dash?: boolean }[] = [
    { y: 100, from: 90, to: 300, t: "request + surrogate token" },
    { y: 140, from: 300, to: 300, t: "" },
    { y: 190, from: 300, to: 510, t: "same request + real OAuth token" },
    { y: 240, from: 510, to: 90, t: "the reply (never the real token)", dash: true },
  ];
  return (
    <Wide min={540}>
      <svg viewBox="0 0 600 290" role="img" aria-labelledby="sg-t">
        <title id="sg-t">How Muse uses a password it never sees. Muse sends its request with a surrogate token. The Sentinel checks the request against your rules and, only if it is allowed, swaps the surrogate for the real credential from secure storage at the network boundary before forwarding it. The reply comes back to Muse, which never holds the real token, so a prompt injection cannot trick it into revealing one.</title>
        <Arrow id="sg-ar" />
        {lanes.map((l) => (
          <g key={l.l}>
            <rect x={l.x - 72} y="14" width="144" height="46" rx="10" className={l.cls} strokeWidth="1.5" />
            <text x={l.x} y="34" textAnchor="middle" fontSize="12.5" fontWeight="700" className="t">{l.l}</text>
            <text x={l.x} y="50" textAnchor="middle" fontSize="10" className="t2">{l.s}</text>
            <line x1={l.x} y1="62" x2={l.x} y2="280" className="ln" strokeWidth="1" strokeDasharray="3 4" />
          </g>
        ))}
        {msgs.filter((m) => m.t).map((m) => (
          <g key={m.t}>
            <line x1={m.from} y1={m.y} x2={m.to + (m.to > m.from ? -4 : 4)} y2={m.y} className="ln" strokeWidth="1.6" strokeDasharray={m.dash ? "5 4" : undefined} markerEnd="url(#sg-ar)" />
            <text x={(m.from + m.to) / 2} y={m.y - 7} textAnchor="middle" fontSize="10.5" className="t2">{m.t}</text>
          </g>
        ))}
        <rect x="222" y="118" width="156" height="46" rx="8" className="g-s" strokeWidth="1.2" />
        <text x="300" y="137" textAnchor="middle" fontSize="10.5" fontWeight="600" className="t">1. allowed by your rules?</text>
        <text x="300" y="153" textAnchor="middle" fontSize="10.5" fontWeight="600" className="t">2. swap in the real token</text>
      </svg>
    </Wide>
  );
}

// ── 8. The lethal trifecta ───────────────────────────────────────────────────

const TRI: { n: string; what: string; muse: string; tone: Tone }[] = [
  { n: "Private data", what: "your inbox, calendar, files", muse: "read and write access split; email connector filters out one-time codes, password-reset and login links", tone: "c" },
  { n: "Untrusted content", what: "web pages, emails, downloads anyone can write", muse: "labelled untrusted; a model trained to resist injection; a separate ensemble of injection classifiers", tone: "a" },
  { n: "A way to send data out", what: "web requests, emails, form posts", muse: "every request goes through the Sentinel; “tainted” processes that read your data lose auto-approval", tone: "r" },
];

export function Trifecta() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-2.5">
        {TRI.map((t) => (
          <div key={t.n} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[t.tone].fg, background: T[t.tone].soft }}>
            <p className="text-[14.5px] font-bold" style={{ color: T[t.tone].fg }}>{t.n}</p>
            <p className="mt-1 text-[12px] text-[var(--text-secondary)]">{t.what}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-[var(--text-primary)]"><strong>Muse’s answer:</strong> {t.muse}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[12.5px] text-[var(--text-secondary)]">
        All three together = an attacker can trick the agent into sending your data to them. Muse keeps the first two (it has to, to be useful) and puts a gate on the third.
      </p>
    </div>
  );
}

// ── 9. Paying safely ─────────────────────────────────────────────────────────

export function PurchaseFlow() {
  const steps: { icon: string; t: string; b: string; tone: Tone }[] = [
    { icon: "🛒", t: "Muse fills the cart", b: "on the shop’s site, in its own browser", tone: "v" },
    { icon: "🧭", t: "Checkout detected", b: "the browser spots the checkout page", tone: "a" },
    { icon: "✋", t: "You approve", b: "exact total, in an approval card — every time", tone: "r" },
    { icon: "💳", t: "Link pays", b: "saved method where Link is accepted; elsewhere a one-time card for this shop, amount and time", tone: "g" },
    { icon: "📦", t: "Order placed", b: "Muse never sees your card details", tone: "c" },
  ];
  return (
    <ol className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
      {steps.map((s, i) => (
        <li key={s.t} className="flex flex-col md:flex-row items-center md:flex-1 md:min-w-0">
          <div className="w-full md:h-full rounded-[var(--radius)] border px-3 py-3 text-center" style={{ borderColor: T[s.tone].fg, background: T[s.tone].soft }}>
            <div className="text-[22px] leading-none mb-1.5" aria-hidden="true">{s.icon}</div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-snug">{s.t}</p>
            <p className="mt-1 text-[11.5px] leading-snug text-[var(--text-secondary)]">{s.b}</p>
          </div>
          {i < steps.length - 1 && (
            <span className="text-[var(--text-tertiary)] text-[18px] leading-none py-1 md:py-0 md:px-0.5 rotate-90 md:rotate-0" aria-hidden="true">→</span>
          )}
        </li>
      ))}
    </ol>
  );
}

// ── 10. Download estimates ───────────────────────────────────────────────────

const ESTIMATES = [
  { firm: "Apptopia", n: 4.3, note: "total to date" },
  { firm: "Sensor Tower", n: 3.4, note: "“more than”, as of Thu 24 Sep" },
  { firm: "Appfigures", n: 2.3, note: "“roughly”, as of Thu 24 Sep" },
];

export function DownloadEstimates() {
  const max = 5;
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
      <p className="text-[13.5px] font-semibold text-[var(--text-primary)] mb-3">Muse downloads, millions — three firms, three answers</p>
      <ul className="space-y-3">
        {ESTIMATES.map((e) => (
          <li key={e.firm}>
            <div className="flex justify-between text-[12.5px]">
              <span className="font-medium text-[var(--text-primary)]">{e.firm}</span>
              <span className="mono text-[var(--text-secondary)]">{e.n.toFixed(1)}M · {e.note}</span>
            </div>
            <div className="mt-1 h-3 rounded-full bg-[var(--fig-sunk)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(e.n / max) * 100}%`, background: T.v.fg }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-[var(--text-secondary)]">
        Estimates, not official figures: Meta has not published a download count. Source: TechCrunch, 25 September 2026.
      </p>
    </div>
  );
}

// ── 11. What Meta promises, and what stays open ──────────────────────────────

const PROMISES: { claim: string; detail: string; status: "yes" | "partly" | "open" }[] = [
  { claim: "Muse never sees your passwords or card numbers", detail: "credentials sit in separate storage; Muse holds surrogates", status: "yes" },
  { claim: "It asks before sending or spending", detail: "approval cards for emails and every purchase; you can tune the defaults", status: "yes" },
  { claim: "Your chats and VM data stay out of Meta’s ad systems", detail: "but sites Muse visits for you can still show you ads, as if you had visited", status: "partly" },
  { claim: "Your data trains Meta’s models only if you allow it", detail: "on by default, with key personal details removed first; one switch in Settings turns it off", status: "partly" },
  { claim: "Meta itself can’t read your data", detail: "not yet: today policy restricts staff access; the encrypted Confidential VM is promised for later this year", status: "open" },
  { claim: "Prompt injection is solved", detail: "Meta says the opposite: it “remains an open problem in the industry”", status: "open" },
];

export function PromiseCheck() {
  const S = {
    yes: { l: "in place at launch", tone: "g" as Tone, i: "✓" },
    partly: { l: "true, with a catch", tone: "a" as Tone, i: "≈" },
    open: { l: "not yet / not claimed", tone: "r" as Tone, i: "…" },
  };
  return (
    <ul className="space-y-2">
      {PROMISES.map((p) => {
        const s = S[p.status];
        return (
          <li key={p.claim} className="grid grid-cols-[2rem_1fr] gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="grid h-7 w-7 place-items-center rounded-full text-[14px] font-bold" style={{ background: T[s.tone].soft, color: T[s.tone].fg }} aria-hidden="true">{s.i}</span>
            <div>
              <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">{p.claim}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{p.detail}</p>
              <p className="mt-1 mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: T[s.tone].fg }}>{s.l}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ── 12. Writing a good goal ──────────────────────────────────────────────────

const GOAL_PARTS: { k: string; ex: string; tone: Tone }[] = [
  { k: "Outcome", ex: "Get my father’s passport renewed", tone: "v" },
  { k: "Deadline", ex: "before our trip on 15 December", tone: "c" },
  { k: "Limits", ex: "no agent fees; don’t book anything without asking", tone: "r" },
  { k: "Context", ex: "his old passport expires in January; he lives in Pune", tone: "a" },
  { k: "Check-ins", ex: "message me only when you need a document or a decision", tone: "g" },
];

export function GoalRecipe() {
  return (
    <div className="space-y-2">
      {GOAL_PARTS.map((g) => (
        <div key={g.k} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
          <span className="rounded-full px-3 py-1 text-center text-[12px] font-bold" style={{ background: T[g.tone].soft, color: T[g.tone].fg, border: `1.5px solid ${T[g.tone].fg}` }}>{g.k}</span>
          <span className="text-[13.5px] text-[var(--text-primary)]">“{g.ex}”</span>
        </div>
      ))}
      <p className="pt-2 text-[12.5px] text-[var(--text-secondary)]">Together: one message Muse can turn into a plan on its Goals tab. The wording is our illustration.</p>
    </div>
  );
}

// ── 13. Your first 30 days ───────────────────────────────────────────────────

const PATH: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "Day 1", t: "Meet it", b: "Name your Muse. Ask what it can do. Open Settings; switch off model training if you prefer.", tone: "c" },
  { d: "Days 2–5", t: "Read-only", b: "Connect one account with read access. Ask for a daily summary and clash alerts.", tone: "g" },
  { d: "Week 2", t: "One goal", b: "Give it one real goal with a deadline and limits. Watch the activity log every evening.", tone: "v" },
  { d: "Week 3", t: "Drafts", b: "Let it draft emails and fill carts. You still press send and pay.", tone: "a" },
  { d: "Week 4", t: "Review", b: "Read its memory files, remove what it shouldn’t keep, trim permissions you didn’t use.", tone: "r" },
];

export function MonthPath() {
  return (
    <ol className="grid sm:grid-cols-5 gap-2">
      {PATH.map((p) => (
        <li key={p.d} className="rounded-[var(--radius)] border-2 p-3" style={{ borderColor: T[p.tone].fg, background: T[p.tone].soft }}>
          <p className="mono text-[11px] font-semibold" style={{ color: T[p.tone].fg }}>{p.d}</p>
          <p className="mt-0.5 text-[14px] font-bold text-[var(--text-primary)]">{p.t}</p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{p.b}</p>
        </li>
      ))}
    </ol>
  );
}
