import { WindowFrame } from "@/components/articles/ArticleParts";

/**
 * Diagrams and illustrated screens for "Microsoft Copilot 101".
 *
 * Screens are drawings labelled as illustrations. Licence tiers and the
 * orchestration steps follow Microsoft Learn's Microsoft 365 Copilot overview;
 * consumer plans follow microsoft.com; GitHub plans follow GitHub Docs — all
 * read on 24 September 2026.
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

function Pin({ n }: { n: number }) {
  return (
    <span className="inline-grid place-items-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0" style={{ background: "#0e7490" }} aria-hidden="true">
      {n}
    </span>
  );
}

// ── The Copilot family ───────────────────────────────────────────────────────

export function CopilotFamily() {
  const groups: { title: string; who: string; tone: Tone; items: [string, string][] }[] = [
    { title: "Microsoft Copilot", who: "for you, at home", tone: "c", items: [["💬", "Copilot app — web, Windows, Mac, phone"], ["🪟", "Copilot in Windows and the Copilot key"], ["🧭", "Copilot in Edge"], ["📄", "Copilot in Word, Excel, PowerPoint, Outlook with a Microsoft 365 plan"]] },
    { title: "Microsoft 365 Copilot", who: "for your job", tone: "v", items: [["💼", "Copilot Chat — secure AI chat for work"], ["📊", "Copilot in Word, Excel, PowerPoint, Outlook, Teams"], ["🔎", "Grounded in your work email, files and meetings"], ["🤖", "Agents such as Researcher and Analyst"]] },
    { title: "GitHub Copilot", who: "for developers", tone: "g", items: [["⌨️", "Code completion in your editor"], ["💬", "Chat and agent mode in VS Code and more"], ["🛠️", "A coding agent you assign GitHub issues to"], ["🖥️", "Copilot CLI in the terminal"]] },
    { title: "Build and secure", who: "for makers and IT", tone: "a", items: [["🧩", "Copilot Studio — build agents with low code"], ["⚙️", "Microsoft Foundry — models and agents in code"], ["🛡️", "Security Copilot — for security teams"]] },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {groups.map((g) => (
        <div key={g.title} className="rounded-[var(--radius)] border-2 p-3.5" style={{ borderColor: T[g.tone].fg, background: T[g.tone].soft }}>
          <p className="text-[15px] font-bold" style={{ color: T[g.tone].fg }}>{g.title}</p>
          <p className="mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-2">{g.who}</p>
          <ul className="space-y-1.5">
            {g.items.map(([i, t]) => (
              <li key={t} className="flex gap-2 rounded-lg bg-[var(--fig-card)] px-2.5 py-1.5 text-[12.5px] leading-snug text-[var(--text-primary)]">
                <span aria-hidden="true">{i}</span> {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── History ──────────────────────────────────────────────────────────────────

const HISTORY: { d: string; t: string; b: string; tone: Tone }[] = [
  { d: "2014", t: "Cortana", b: "Microsoft’s first voice assistant ships on Windows Phone, then Windows 10.", tone: "c" },
  { d: "2019", t: "Microsoft invests in OpenAI", b: "A $1 billion partnership begins: Microsoft’s Azure cloud trains OpenAI’s models, and Microsoft gets to build on them.", tone: "c" },
  { d: "2021–2022", t: "GitHub Copilot", b: "The first “Copilot”: an AI pair programmer in code editors, previewed in 2021 and generally available in June 2022.", tone: "v" },
  { d: "Feb 2023", t: "The new Bing", b: "Bing search gets an AI chat mode built on OpenAI technology — Microsoft’s first big consumer chatbot.", tone: "v" },
  { d: "Mar–Nov 2023", t: "Microsoft 365 Copilot and the rename", b: "Copilot for Word, Excel, PowerPoint, Outlook and Teams is announced in March and reaches large businesses in November, when Bing Chat is renamed Copilot.", tone: "v" },
  { d: "2024", t: "Copilot key and Copilot+ PCs", b: "New Windows keyboards get a Copilot key; Copilot+ PCs add chips for AI on the device; the Copilot app is redesigned around voice and vision.", tone: "a" },
  { d: "Jan 2025", t: "Copilot in Microsoft 365 Personal and Family", b: "Home subscribers get Copilot inside Word, Excel, PowerPoint and Outlook as part of their plan.", tone: "a" },
  { d: "2025", t: "Agents and more models", b: "Researcher and Analyst agents, Copilot Mode in Edge, Microsoft’s own MAI models, and Anthropic’s Claude models available alongside OpenAI’s in Microsoft 365 Copilot.", tone: "g" },
  { d: "2026", t: "Copilot does the work", b: "Work IQ grounds agents in organisational knowledge, Cowork carries out tasks across Microsoft 365, and GitHub Copilot’s agents take on whole issues.", tone: "g" },
];

export function CopilotTimeline() {
  return (
    <ol className="relative ml-2 border-l-2 border-[var(--fig-line)] space-y-5">
      {HISTORY.map((h) => (
        <li key={h.d + h.t} className="relative pl-6">
          <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{ background: T[h.tone].fg }} aria-hidden="true" />
          <p className="mono text-[12px] font-semibold" style={{ color: T[h.tone].fg }}>{h.d}</p>
          <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug">{h.t}</p>
          <p className="text-[13.5px] leading-snug text-[var(--text-secondary)]">{h.b}</p>
        </li>
      ))}
    </ol>
  );
}

// ── How Microsoft 365 Copilot answers ────────────────────────────────────────

export function OrchestrationFlow() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-labelledby="orc-t">
      <title id="orc-t">How Microsoft 365 Copilot answers a work question. Your prompt goes to an orchestrator, which gathers grounding from Microsoft Graph and Work IQ, the semantic index and optionally the web — but only content you already have permission to see. The enriched prompt goes to a large language model, the draft passes responsible AI checks, and the answer comes back with citations to the source files.</title>
      <Arrow id="orc-ar" />
      <rect x="20" y="30" width="130" height="60" rx="12" className="c-s" strokeWidth="1.5" />
      <text x="85" y="56" textAnchor="middle" fontSize="13" className="t" fontWeight="700">1 · Your prompt</text>
      <text x="85" y="74" textAnchor="middle" fontSize="10.5" className="t2">“Prep me for the 3pm”</text>
      <line x1="152" y1="60" x2="208" y2="60" className="ln" strokeWidth="1.8" markerEnd="url(#orc-ar)" />
      <rect x="212" y="20" width="200" height="80" rx="14" className="v-s" strokeWidth="2" />
      <text x="312" y="50" textAnchor="middle" fontSize="13.5" className="t" fontWeight="700">2 · Orchestrator</text>
      <text x="312" y="68" textAnchor="middle" fontSize="10.5" className="t2">works out what to look up</text>
      <text x="312" y="83" textAnchor="middle" fontSize="10.5" className="t2">and which tools or agents to use</text>

      {[
        { x: 170, l: "Microsoft Graph + Work IQ", s: "mail, files, chats, meetings" },
        { x: 330, l: "Semantic index", s: "finds meaning, not just words" },
        { x: 490, l: "Web (Bing)", s: "if allowed by your admin" },
      ].map((g) => (
        <g key={g.l}>
          <line x1="312" y1="102" x2={g.x} y2="136" className="ln" strokeWidth="1.4" markerEnd="url(#orc-ar)" />
          <rect x={g.x - 78} y="140" width="156" height="50" rx="10" className="a-s" strokeWidth="1.3" />
          <text x={g.x} y="161" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">{g.l}</text>
          <text x={g.x} y="177" textAnchor="middle" fontSize="10" className="t2">{g.s}</text>
        </g>
      ))}
      <rect x="92" y="202" width="476" height="30" rx="8" className="r-s" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="330" y="222" textAnchor="middle" fontSize="12" className="t" fontWeight="700">🔒 3 · Only content you already have permission to open</text>
      <line x1="330" y1="234" x2="330" y2="254" className="ln" strokeWidth="1.8" markerEnd="url(#orc-ar)" />
      <rect x="220" y="258" width="220" height="40" rx="10" className="box" strokeWidth="1.5" />
      <text x="330" y="283" textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">4 · Large language model</text>
      <line x1="442" y1="278" x2="470" y2="278" className="ln" strokeWidth="1.8" markerEnd="url(#orc-ar)" />
      <rect x="474" y="258" width="150" height="40" rx="10" className="g-s" strokeWidth="1.5" />
      <text x="549" y="276" textAnchor="middle" fontSize="11.5" className="t" fontWeight="700">5 · Responsible AI</text>
      <text x="549" y="290" textAnchor="middle" fontSize="10" className="t2">checks on the draft</text>
      <line x1="549" y1="300" x2="549" y2="318" className="ln" strokeWidth="1.8" markerEnd="url(#orc-ar)" />
      <rect x="360" y="320" width="264" height="34" rx="10" className="c-s" strokeWidth="1.5" />
      <text x="492" y="342" textAnchor="middle" fontSize="12" className="t" fontWeight="700">6 · Answer, with citations [1] [2]</text>
    </svg>
  );
}

// ── Licence tiers at work ────────────────────────────────────────────────────

export function WorkLicences() {
  const cols: { n: string; tone: Tone; rows: string[] }[] = [
    { n: "Copilot Chat (Basic)", tone: "c", rows: ["Included with eligible work accounts", "Secure chat grounded in the web", "Uses work files only if you upload or open them", "Enterprise data protection"] },
    { n: "Microsoft 365 Copilot (Basic)", tone: "a", rows: ["Everything in Copilot Chat", "Standard access to Copilot in Word, Excel, PowerPoint, OneNote", "Meeting recaps in Teams", "Pay-as-you-go work-data agents"] },
    { n: "Microsoft 365 Copilot (Premium)", tone: "v", rows: ["The paid add-on licence", "Priority access in every app", "Automatically grounded in your mail, files, meetings and chats", "Agents that use work data; admin analytics"] },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {cols.map((c, i) => (
        <div key={c.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[c.tone].fg }}>
          <p className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Tier {i + 1}</p>
          <p className="text-[14.5px] font-bold leading-snug mt-0.5" style={{ color: T[c.tone].fg }}>{c.n}</p>
          <ul className="mt-2.5 space-y-1.5">
            {c.rows.map((r) => (
              <li key={r} className="flex gap-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]"><span style={{ color: T[c.tone].fg }} aria-hidden="true">✓</span>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Consumer app ─────────────────────────────────────────────────────────────

export function CopilotAppTour() {
  const legend = [
    "New conversation.",
    "History, and Pages — documents you build with Copilot and can share.",
    "Model menu — Quick response, Think deeper, or Auto.",
    "The message box — type, or add a photo or file.",
    "Voice — talk to Copilot out loud.",
    "Vision — share your screen or camera so Copilot can see.",
  ];
  return (
    <div>
      <WindowFrame title="copilot.microsoft.com — illustration">
        <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9.5rem_1fr] min-h-[280px] text-[12.5px]">
          <div className="border-r border-[var(--border)] bg-[var(--paper-tint)] p-2.5 space-y-2">
            <p className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 font-medium text-[var(--text-primary)]"><Pin n={1} /> <span className="truncate">＋ New chat</span></p>
            <p className="flex items-center gap-1.5 pt-1 text-[var(--text-tertiary)]"><Pin n={2} /> History</p>
            {["Diwali menu for 12", "Explain GST on rent", "Pages: Trip to Ooty"].map((x) => <p key={x} className="pl-2 truncate text-[var(--text-secondary)]">{x}</p>)}
          </div>
          <div className="flex flex-col">
            <div className="flex-1 grid place-items-center p-4">
              <div className="text-center">
                <p className="text-[26px]" aria-hidden="true">🌈</p>
                <p className="display-sm text-[18px] sm:text-[22px] text-[var(--text-primary)]">Hey Neha, what’s on your mind?</p>
              </div>
            </div>
            <div className="m-3 rounded-3xl border border-[var(--border-strong)] bg-[var(--card)] p-2.5">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]"><Pin n={4} /> <span className="flex-1">Message Copilot</span></div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 rounded-full bg-[var(--paper-sunk)] px-2 py-0.5 text-[var(--text-primary)]"><Pin n={3} /> Auto ▾</span>
                <span className="ml-auto flex items-center gap-1 text-[var(--text-secondary)]"><Pin n={6} /> 👁️</span>
                <span className="flex items-center gap-1 text-[var(--text-secondary)]"><Pin n={5} /> 🎙️</span>
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>
      <ol className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
        {legend.map((l, i) => (
          <li key={l} className="flex gap-2 text-[13px] leading-snug text-[var(--text-secondary)]"><Pin n={i + 1} /> <span>{l}</span></li>
        ))}
      </ol>
    </div>
  );
}

// ── Office apps ──────────────────────────────────────────────────────────────

export function OfficeTrio() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <WindowFrame title="Word — illustration">
        <div className="grid grid-cols-[1fr_9rem] text-[11.5px] min-h-[170px]">
          <div className="p-3 space-y-1.5">
            <p className="font-bold text-[13px] text-[var(--text-primary)]">Q3 Sales Review</p>
            {[90, 100, 75, 95, 60].map((w, i) => <span key={i} className="block h-1.5 rounded bg-[var(--paper-sunk)]" style={{ width: `${w}%` }} aria-hidden="true" />)}
          </div>
          <div className="border-l border-[var(--border)] bg-[var(--paper-tint)] p-2 space-y-1.5">
            <p className="font-semibold text-[var(--text-primary)]">Copilot</p>
            <p className="rounded bg-[var(--paper-sunk)] px-1.5 py-1 text-[var(--text-primary)]">Summarise this in 5 bullets for the CEO</p>
            <p className="text-[var(--text-secondary)]">• Revenue up 12%… • South zone missed target…</p>
          </div>
        </div>
      </WindowFrame>
      <WindowFrame title="Excel — illustration">
        <div className="p-3 text-[11.5px] space-y-2 min-h-[170px]">
          <div className="grid grid-cols-4 gap-px bg-[var(--border)] rounded overflow-hidden mono text-[10.5px]">
            {["Region", "Q1", "Q2", "Q3", "North", "40", "44", "51", "South", "38", "36", "33", "West", "29", "35", "41"].map((c, i) => (
              <span key={i} className={`px-1.5 py-1 bg-[var(--fig-card)] ${i < 4 ? "font-semibold" : ""} ${c === "33" ? "text-[var(--fig-rose)] font-bold" : "text-[var(--text-primary)]"}`}>{c}</span>
            ))}
          </div>
          <p className="rounded-md border border-[var(--border)] bg-[var(--paper-tint)] px-2 py-1.5 text-[var(--text-primary)]">
            <strong>Copilot:</strong> South is the only region falling for two quarters. Add a column with % change and highlight drops?
          </p>
        </div>
      </WindowFrame>
      <WindowFrame title="PowerPoint — illustration">
        <div className="p-3 grid grid-cols-3 gap-2 min-h-[130px]">
          {["Title", "Results", "Next steps"].map((s, i) => (
            <div key={s} className="rounded border border-[var(--border)] bg-[var(--fig-card)] p-1.5 aspect-[4/3] flex flex-col">
              <span className="text-[10px] font-semibold text-[var(--text-primary)]">{s}</span>
              <span className="mt-auto h-8 rounded" style={{ background: i === 1 ? "linear-gradient(90deg,var(--fig-cyan-soft),var(--fig-violet-soft))" : "var(--paper-sunk)" }} aria-hidden="true" />
            </div>
          ))}
          <p className="col-span-3 text-[11px] text-[var(--text-secondary)]">“Create a 3-slide deck from <u>Q3 Sales Review.docx</u>”</p>
        </div>
      </WindowFrame>
      <WindowFrame title="Teams meeting recap — illustration">
        <div className="p-3 text-[11.5px] space-y-1.5 min-h-[130px]">
          <p className="font-semibold text-[var(--text-primary)]">📅 Weekly sync · 42 min · recap by Copilot</p>
          <p className="text-[var(--text-secondary)]">• Launch moved to 3 Nov (vendor delay)</p>
          <p className="text-[var(--text-secondary)]">• Budget approved for two contractors</p>
          <p className="text-[var(--text-primary)]"><strong>Action items:</strong> Ravi — vendor contract · Sara — hiring post</p>
        </div>
      </WindowFrame>
    </div>
  );
}

// ── GCSE prompt formula ──────────────────────────────────────────────────────

export function GcsePrompt() {
  const parts: { k: string; q: string; ex: string; tone: Tone }[] = [
    { k: "Goal", q: "What do you want?", ex: "Draft a status update for my manager", tone: "c" },
    { k: "Context", q: "Why, and for whom?", ex: "She has 2 minutes before the board meeting and cares about risks", tone: "v" },
    { k: "Source", q: "Which information?", ex: "Use /Project Falcon plan.docx and my emails from Arjun this week", tone: "a" },
    { k: "Expectations", q: "What should it look like?", ex: "Five bullets, plain English, risks first, under 120 words", tone: "g" },
  ];
  return (
    <div className="space-y-2">
      {parts.map((p) => (
        <div key={p.k} className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_11rem_1fr] rounded-[var(--radius)] border overflow-hidden" style={{ borderColor: T[p.tone].fg }}>
          <div className="grid place-items-center px-2 py-2 text-[14px] font-bold" style={{ background: T[p.tone].soft, color: T[p.tone].fg }}>{p.k}</div>
          <div className="hidden sm:flex items-center px-3 text-[13px] text-[var(--text-secondary)] border-r border-[var(--border)] bg-[var(--fig-card)]">{p.q}</div>
          <div className="flex items-center px-3 py-2 text-[13.5px] text-[var(--text-primary)] bg-[var(--fig-card)]">{p.ex}</div>
        </div>
      ))}
      <p className="text-[12.5px] text-[var(--text-tertiary)] pt-1">Typing <code>/</code> in Copilot lets you pick a specific file, email or meeting as the source.</p>
    </div>
  );
}

// ── GitHub Copilot in VS Code ────────────────────────────────────────────────

export function VsCodeMock() {
  const dim = "text-[#8b8ba0]";
  return (
    <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border-strong)] shadow-sm" style={{ background: "#11111a" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="mono ml-3 text-[11.5px] text-[#8b8ba0]">gst.py — VS Code with GitHub Copilot — illustration</span>
      </div>
      <div className="grid md:grid-cols-[1fr_15rem]">
        <pre className="mono text-[12px] leading-[1.75] p-4 overflow-x-auto text-[#e8e8f0] whitespace-pre">
<span className={dim}> 1</span>  <span className="text-[#b69cfb]">def</span> <span className="text-[#7aa7ff]">price_with_gst</span>(amount: float, rate: float = 0.18) -&gt; float:{"\n"}
<span className={dim}> 2</span>      <span className="text-[#5fd68b]">&quot;&quot;&quot;Return amount including GST, rounded to 2 decimals.&quot;&quot;&quot;</span>{"\n"}
<span className={dim}> 3</span>      <span className="text-[#6b6b80] italic">return round(amount * (1 + rate), 2)</span>{"   "}<span className="text-[#6b6b80]">⇥ Tab to accept</span>{"\n"}
<span className={dim}> 4</span>{"\n"}
<span className={dim}> 5</span>  <span className="text-[#b69cfb]">def</span> <span className="text-[#7aa7ff]">split_bill</span>(total, people):{"\n"}
<span className={dim}> 6</span>      <span className="text-[#6b6b80] italic">return [round(total / people, 2)] * people</span>
        </pre>
        <div className="border-t md:border-t-0 md:border-l border-white/10 p-3 text-[11.5px] text-[#e8e8f0] space-y-2">
          <p className="font-semibold">🤖 Copilot · Agent</p>
          <p className="rounded bg-white/10 px-2 py-1.5">split_bill loses paise when it doesn’t divide evenly. Fix it and add tests.</p>
          <p className={dim}>✓ Edited gst.py — last person pays the remainder</p>
          <p className={dim}>✓ Created test_gst.py (4 tests)</p>
          <p className="text-[#38d9f0]">? Run pytest in terminal</p>
          <p className="text-[#5fd68b]">✓ 4 passed</p>
        </div>
      </div>
    </div>
  );
}

// ── Copilot Studio agent ─────────────────────────────────────────────────────

export function StudioAgent() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-labelledby="st-t">
      <title id="st-t">Anatomy of a Copilot Studio agent. Triggers such as a user message, a new email or a schedule start it. Instructions and knowledge from SharePoint, websites and files guide it. It uses tools and actions such as Power Automate flows and connectors to hundreds of services, and it can hand off to a human. It is published to Teams, Microsoft 365 Copilot or a website.</title>
      <Arrow id="st-ar" />
      <rect x="230" y="90" width="180" height="100" rx="18" className="v-s" strokeWidth="2" />
      <text x="320" y="130" textAnchor="middle" fontSize="15" className="t" fontWeight="700">🤖 Your agent</text>
      <text x="320" y="150" textAnchor="middle" fontSize="11" className="t2">“HR Helper”</text>
      <text x="320" y="168" textAnchor="middle" fontSize="10.5" className="t3">instructions + model</text>
      {[
        { x: 20, y: 30, l: "⚡ Triggers", s: "a message, an email, a schedule", cls: "c-s", line: [202, 60, 228, 110] },
        { x: 20, y: 190, l: "📚 Knowledge", s: "SharePoint, websites, files", cls: "a-s", line: [202, 220, 228, 170] },
        { x: 440, y: 30, l: "🛠️ Tools and actions", s: "flows, 1,000+ connectors, MCP", cls: "g-s", line: [412, 110, 438, 60] },
        { x: 440, y: 190, l: "📣 Publish to", s: "Teams, Copilot, a website", cls: "r-s", line: [412, 170, 438, 220] },
      ].map((b) => (
        <g key={b.l}>
          <rect x={b.x} y={b.y} width="180" height="60" rx="12" className={b.cls} strokeWidth="1.5" />
          <text x={b.x + 90} y={b.y + 25} textAnchor="middle" fontSize="12.5" className="t" fontWeight="700">{b.l}</text>
          <text x={b.x + 90} y={b.y + 43} textAnchor="middle" fontSize="10" className="t2">{b.s}</text>
          <line x1={b.line[0]} y1={b.line[1]} x2={b.line[2]} y2={b.line[3]} className="ln" strokeWidth="1.6" markerEnd="url(#st-ar)" />
        </g>
      ))}
      <text x="320" y="272" textAnchor="middle" fontSize="11" className="t3">👤 can hand off to a person when it’s unsure</text>
    </svg>
  );
}

// ── Oversharing ──────────────────────────────────────────────────────────────

export function OversharingRisk() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-rose)] bg-[var(--fig-rose-soft)] p-4">
        <p className="text-[14px] font-bold text-[var(--fig-rose)]">Before: shared with “Everyone”</p>
        <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]">A salary spreadsheet sits in a SharePoint site anyone in the company can open. Nobody ever found it — until someone asks Copilot, “what does my team earn?”</p>
        <p className="mt-2 mono text-[11px] text-[var(--text-primary)]">Copilot didn’t leak it. The permissions did.</p>
      </div>
      <div className="rounded-[var(--radius)] border-2 border-[var(--fig-green)] bg-[var(--fig-green-soft)] p-4">
        <p className="text-[14px] font-bold text-[var(--fig-green)]">After: fix access first</p>
        <ul className="mt-1.5 space-y-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">
          <li>✓ Review “Everyone” and org-wide sharing links</li>
          <li>✓ Sensitivity labels with Microsoft Purview</li>
          <li>✓ SharePoint Advanced Management to find overshared sites</li>
          <li>✓ Restricted content discovery while you clean up</li>
        </ul>
      </div>
    </div>
  );
}

// ── Consumer plans ───────────────────────────────────────────────────────────

export function HomePlans() {
  const plans: { n: string; tone: Tone; b: string[] }[] = [
    { n: "Copilot (free)", tone: "g", b: ["The Copilot app on web, Windows, Mac and phone", "Voice, vision and image creation", "Search the web with sources"] },
    { n: "Microsoft 365 Personal / Family", tone: "c", b: ["Copilot inside Word, Excel, PowerPoint, Outlook", "More image creation and usage", "Office apps and cloud storage"] },
    { n: "Microsoft 365 Premium", tone: "v", b: ["Everything above", "Researcher and Analyst agents", "The highest usage for home users"] },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {plans.map((p) => (
        <div key={p.n} className="rounded-[var(--radius)] border-2 bg-[var(--fig-card)] p-4" style={{ borderColor: T[p.tone].fg }}>
          <p className="text-[14.5px] font-bold" style={{ color: T[p.tone].fg }}>{p.n}</p>
          <ul className="mt-2 space-y-1.5">
            {p.b.map((x) => <li key={x} className="flex gap-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]"><span style={{ color: T[p.tone].fg }} aria-hidden="true">✓</span>{x}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── 30-day path ──────────────────────────────────────────────────────────────

export function CopilotPath() {
  const weeks: { w: string; tone: Tone; items: string[] }[] = [
    { w: "Week 1 · Chat", tone: "g", items: ["Use the Copilot app daily", "Try voice, and vision on your screen", "Ask it to explain a bill or form"] },
    { w: "Week 2 · Office", tone: "c", items: ["Summarise a long Word document", "Ask Excel to explain a trend", "Draft emails with Outlook coaching"] },
    { w: "Week 3 · Work", tone: "a", items: ["Write GCSE prompts with / file picks", "Recap a Teams meeting", "Try the Researcher agent"] },
    { w: "Week 4 · Build", tone: "r", items: ["Build an agent in Agent Builder", "Try GitHub Copilot agent mode", "Make one call from Microsoft Foundry"] },
  ];
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {weeks.map((w) => (
        <li key={w.w} className="rounded-[var(--radius)] border p-4" style={{ borderColor: T[w.tone].fg, background: T[w.tone].soft }}>
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">{w.w}</p>
          <ul className="mt-2 space-y-1.5">
            {w.items.map((it) => (
              <li key={it} className="flex gap-1.5 text-[12.5px] leading-snug text-[var(--text-secondary)]"><span style={{ color: T[w.tone].fg }} aria-hidden="true">☐</span>{it}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
