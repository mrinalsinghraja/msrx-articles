import type { ReactNode } from "react";

/**
 * Figures for "AI-made scams in India: cloned voices, deepfake video and
 * ‘digital arrest’, and the checks that still work".
 *
 * Facts come from the references in lib/references.ts (opened and read on
 * 30 October 2026). Anything labelled "illustration" is the author's, not data.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

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

function Steps({ steps, tone = "c" }: { steps: { t: string; d: string }[]; tone?: Tone }) {
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => (
        <li key={s.t} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
          <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T[tone].soft, color: T[tone].fg }}>
            {i + 1}
          </span>
          <div>
            <p className="text-[13.5px] font-bold leading-snug text-[var(--text-primary)]">{s.t}</p>
            <p className="text-[12.5px] leading-snug text-[var(--text-secondary)] mt-0.5">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Table({ head, rows, min = "34rem" }: { head: string[]; rows: ReactNode[][]; min?: string }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full text-left text-[12.5px] leading-snug border-separate border-spacing-0" style={{ minWidth: min }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="p-2.5 font-bold text-[var(--text-primary)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`p-2.5 border-t border-[var(--border)] align-top ${j === 0 ? "font-bold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Fig 1 — anatomy of a “digital arrest” call, as the Ministry of Home Affairs describes it. */
export function Anatomy() {
  return (
    <div>
      <Steps
        tone="r"
        steps={[
          { t: "A call about a parcel or a relative", d: "The caller says a parcel in your name holds illegal goods, drugs or fake passports, or that a near one is in custody after a crime or accident." },
          { t: "An official identity", d: "The caller claims to be police, CBI, the narcotics department, RBI, the Enforcement Directorate or another agency." },
          { t: "A staged set", d: "Some fraudsters use studios modelled on police stations and government offices, and wear uniforms." },
          { t: "‘Digital arrest’", d: "The victim is made to stay visible on Skype or another video call until the demands are met." },
          { t: "A demand for money", d: "Money is demanded to ‘compromise the case’." },
        ]}
      />
      <Note>Steps taken from the Ministry of Home Affairs alert on PIB, 14 May 2024. The order is a summary of that description, not an official flowchart.</Note>
    </div>
  );
}

/** Fig 2 — what generative AI changes and what it does not. */
export function AiChanges() {
  return (
    <div>
      <Table
        min="36rem"
        head={["Part of the scam", "Before cheap AI", "With generative AI", "Evidence"]}
        rows={[
          ["The voice", "A stranger’s voice, a bad line, a ‘cold’ or ‘crying’ excuse", "A short clip of a real voice can be turned into a copy", "FTC alert, March 2023 (regulator)"],
          ["The face on video", "A staged set and a uniform", "Faces and voices can be faked in real time on a call", "One company case, press (Guardian, 2024)"],
          ["The wording", "Typos, odd phrasing", "Fluent text in any language", "General knowledge; no source cited here"],
          ["The demand", "Money, secrecy, urgency", "The same money, secrecy and urgency", "MHA / PIB, 14 May 2024"],
          ["The cure", "Verify on a number you hold", "Verify on a number you hold", "FTC; DoT; TRAI"],
        ]}
      />
      <Note>The last two rows are the point of this article: AI changes how convincing the caller sounds, not what the caller wants or how you can check.</Note>
    </div>
  );
}

/** Fig 3 — how a cloned-voice call is put together (illustration). */
export function CloneChain() {
  const items = [
    { t: "A short clip", d: "from content posted online", tone: "c" as Tone },
    { t: "A cloning program", d: "builds a voice model", tone: "v" as Tone },
    { t: "A script", d: "‘I am in trouble, send money’", tone: "a" as Tone },
    { t: "The call", d: "sounds like your relative", tone: "r" as Tone },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-4 gap-2">
        {items.map((s, i) => (
          <li key={s.t} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 text-center" style={{ borderTop: `3px solid ${T[s.tone].fg}` }}>
            <p className="mono text-[11px] font-bold" style={{ color: T[s.tone].fg }}>{i + 1}</p>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-tight">{s.t}</p>
            <p className="mt-1 text-[11.5px] text-[var(--text-secondary)] leading-snug">{s.d}</p>
          </li>
        ))}
      </ol>
      <Note>Illustration of the process the FTC describes (a short audio clip, often from online posts, plus a voice-cloning program). Not a real call and not a tutorial.</Note>
    </div>
  );
}

/** Fig 4 — the PLOS ONE detection result. */
export function DetectBars() {
  const rows = [
    { l: "Listeners who spotted the deepfake", v: 73, tone: "a" as Tone },
    { l: "Listeners who did not", v: 27, tone: "r" as Tone },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Big tone="a" value="529" label="people tested" sub="English and Mandarin" />
        <Big tone="r" value="73%" label="deepfakes correctly spotted" sub="so 27% were missed" />
      </div>
      <ul className="space-y-2" aria-label="Share of deepfakes spotted by listeners">
        {rows.map((r) => (
          <li key={r.l}>
            <div className="flex justify-between text-[12.5px] text-[var(--text-secondary)] mb-1"><span>{r.l}</span><span className="mono font-bold">{r.v}%</span></div>
            <div className="h-3 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
              <div className="h-full" style={{ width: `${r.v}%`, background: T[r.tone].fg }} />
            </div>
          </li>
        ))}
      </ul>
      <Note>Mai, Bray, Davies and Griffin, PLOS ONE, 2 August 2023. A lab study with one set of audio clips; real calls add stress, a bad line and urgency. The authors say giving listeners examples only improved results slightly.</Note>
    </div>
  );
}

/** Fig 5 — the Arup case. */
export function ArupCase() {
  return (
    <div>
      <Steps
        tone="v"
        steps={[
          { t: "January 2024", d: "Arup says it notified police about a fraud in Hong Kong." },
          { t: "February 2024", d: "Hong Kong police say a worker at an unnamed company was tricked into transferring money on a hoax video call with people ‘posing as senior officers of the company’." },
          { t: "17 May 2024", d: "Arup confirms it was the company: an employee was duped into sending HK$200m (about £20m), and fake voices and images were used. It says its systems were not compromised." },
        ]}
      />
      <Note>Source: The Guardian, 17 May 2024. This is press reporting of a company statement and a police statement; the details of the investigation were not public. It is a corporate case, not an Indian one.</Note>
    </div>
  );
}

/** Fig 6 — five checks that survive AI. */
export function FiveChecks() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="g" tag="1" title="Call back on a number you already hold">
        Hang up. Use the saved contact, the number on your bank card, or the official site. Never the number the caller or the message gave you.
      </Card>
      <Card tone="c" tag="2" title="Agree a family code word">
        Pick a word or phrase only your family knows, and ask for it when a ‘relative’ asks for money. This is a family habit, not an official rule.
      </Card>
      <Card tone="r" tag="3" title="Refuse secrecy, and refuse to stay on the line">
        A real official does not need you to hide the call or stay visible on video. A demand for either is the stop sign.
      </Card>
      <Card tone="a" tag="4" title="Slow money down">
        No transfer, gift card, crypto or QR payment under pressure. Ask a family member in person, or wait an hour.
      </Card>
      <Card tone="v" tag="5" title="Report within hours">
        Call 1930 and file at cybercrime.gov.in. Tell your bank at once. The earlier you report, the better the odds of stopping the money.
      </Card>
      <Card tone="c" tag="Why they work" title="They do not depend on detecting AI">
        Each check uses a channel the scammer does not control: your own contact list, your family’s memory, your own judgement about secrecy and pressure.
      </Card>
    </div>
  );
}

/** Fig 7 — call-back decision. */
export function CallbackFlow() {
  return (
    <div>
      <ol className="space-y-2">
        {[
          { q: "Someone calls or video-calls with an urgent request for money, an OTP or a code.", a: "Do not decide on the call. Say you will call back.", tone: "c" as Tone },
          { q: "They say you cannot hang up, or must keep the video on.", a: "That is a stop sign. Hang up.", tone: "r" as Tone },
          { q: "Find the number yourself.", a: "Saved contact, bank card, official site. Not the caller’s number, not a link.", tone: "g" as Tone },
          { q: "Reached the real person or office?", a: "Ask them. If they know nothing, it was a scam. Go to 1930.", tone: "v" as Tone },
          { q: "Cannot reach them?", a: "Ask another family member or a friend, as the FTC advises, before any money moves.", tone: "a" as Tone },
        ].map((s, i) => (
          <li key={s.q} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T[s.tone].soft, color: T[s.tone].fg }}>{i + 1}</span>
            <div>
              <p className="text-[13.5px] font-semibold leading-snug text-[var(--text-primary)]">{s.q}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-secondary)] mt-0.5">{s.a}</p>
            </div>
          </li>
        ))}
      </ol>
      <Note>The author’s flow, built on the FTC’s advice to use ‘a phone number you know is theirs’ and DoT’s and TRAI’s advice not to act on threatening calls.</Note>
    </div>
  );
}

/** Fig 8 — call forwarding. */
export function ForwardFlow() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="The trick" title="A ‘courier’ asks you to dial a code">
          The press report describes a fake courier or delivery agent who says a parcel needs confirming, then tells you to dial a code beginning <span className="mono">21</span> followed by a number the fraudster controls. Forwarding starts at once, so bank calls, OTPs and WhatsApp or Telegram verification calls can reach the fraudster instead of you.
        </Card>
        <Card tone="g" tag="The fix" title="Never dial it. If you did, cancel it">
          Do not dial codes beginning 21, 61, 67 or similar when an unknown caller tells you to. If you suspect forwarding is on, the reported advice is to dial <span className="mono">##002#</span> to cancel all call forwarding, then call 1930.
        </Card>
      </div>
      <Note>Source: Storyboard18, 30 December 2025, reporting an I4C advisory. I could not open the advisory itself, so treat the detail as press reporting and confirm on cybercrime.gov.in.</Note>
    </div>
  );
}

/** Fig 9 — official statements. */
export function OfficialSays() {
  return (
    <div>
      <Table
        min="38rem"
        head={["Body", "Date", "What it says", "Where to report"]}
        rows={[
          ["Ministry of Home Affairs (PIB)", "14 May 2024", "Describes ‘digital arrest’ calls by people posing as police, CBI, narcotics, RBI, ED. Cross-border syndicates. I4C had blocked 1,000+ Skype IDs.", "1930; cybercrime.gov.in"],
          ["Department of Telecommunications (PIB)", "29 March 2024", "Callers in DoT’s name threatening disconnection are fraud. DoT does not authorise anyone to make such calls.", "Chakshu on Sanchar Saathi; 1930"],
          ["TRAI (Press Release 22/2025)", "2025", "TRAI does not initiate communication about disconnection. Disconnection for billing, KYC or misuse is done by the telecom provider.", "Chakshu; 1930; your provider’s call centre"],
          ["Ministry of Home Affairs (PIB)", "12 March 2025", "I4C had blocked 3,962+ Skype IDs and 83,668+ WhatsApp accounts used for digital arrest. No separate NCRB data on these scams.", "1930; cybercrime.gov.in"],
        ]}
      />
      <Note>The lead date for DoT is 29 March 2024, the date on the PIB release the author opened. Several news pieces and later documents repeat the same advice with other dates.</Note>
    </div>
  );
}

/** Fig 10 — RBI reporting windows. */
export function RbiWindows() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card tone="g" tag="Within 3 working days" title="Zero liability">
          For a third-party breach where the fault lies with neither the bank nor you, if you tell the bank within three working days of its communication.
        </Card>
        <Card tone="a" tag="4 to 7 working days" title="Limited liability">
          Your liability is capped at the lower of the transaction value or an amount set in the circular’s table, by account type.
        </Card>
        <Card tone="r" tag="Over 7 working days" title="Bank’s policy">
          Liability follows the bank’s Board-approved policy.
        </Card>
      </div>
      <Note>RBI circular of 6 July 2017 (RBI/2017-18/15), as I read it on 30 October 2026. It covers <em>unauthorised</em> electronic transactions. If you were tricked into approving a transfer yourself, whether it counts as unauthorised is not settled by the circular: tell the bank at once and ask. Later amendments were not checked.</Note>
    </div>
  );
}

/** Fig 11 — evidence quality. */
export function EvidenceLadder() {
  return (
    <div>
      <Table
        min="34rem"
        head={["Claim", "Source type", "How firm"]}
        rows={[
          ["Digital arrest is run by impersonators on video", "Ministry of Home Affairs release", "Official"],
          ["DoT / TRAI do not threaten disconnection by call", "DoT release; TRAI press release", "Official"],
          ["A short clip can clone a voice", "FTC consumer alert", "Regulator’s warning, no statistics"],
          ["Humans catch 73% of speech deepfakes", "Peer-reviewed study (PLOS ONE)", "Research, lab setting"],
          ["A deepfake video call cost one firm HK$200m", "Company and police statements via The Guardian", "Press"],
          ["USSD call-forward courier trick", "Storyboard18 on an I4C advisory", "Press; advisory not opened"],
          ["Cloned-voice relative-emergency advisory in India", "Not found", "No official source found"],
        ]}
      />
      <Note>The last row is deliberate. As of 30 October 2026 the author found no official Indian advisory specifically about cloned-voice relative-emergency scams; press and vendor pages mention them, which is not the same thing.</Note>
    </div>
  );
}

/** Fig 12 — report now. */
export function ReportNow() {
  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-3">
        <Big tone="r" value="1930" label="National Cyber Crime Helpline" sub="for money lost to fraud" />
        <Big tone="v" value="cybercrime.gov.in" label="Report online" sub="keep the acknowledgement number" />
        <Big tone="c" value="Chakshu" label="Suspect calls and SMS" sub="on sancharsaathi.gov.in" />
        <Big tone="g" value="Bank" label="Tell it at once" sub="reporting windows are short" />
      </div>
      <Note>Helpline and portals as named in the PIB, DoT and TRAI releases. MSRX’s own checked guide is at security.msrx.co.in/india. Contact details change; confirm them at the official sites.</Note>
    </div>
  );
}

/** Fig 13 — which free MSRX tool for which situation. */
export function ToolsMap() {
  return (
    <div>
      <Table
        min="36rem"
        head={["You received", "Use", "What it does"]}
        rows={[
          ["A suspicious SMS or message", "Scam checker", "Paste it and see which scam patterns it matches, including Indian ones such as parcel, call-forward, telecom threat, e-challan, electricity bill and family emergency."],
          ["A QR code to pay or ‘receive’", "QR checker", "Reads what the QR contains before you scan it into a payment app."],
          ["A link", "URL inspector", "Breaks a link into parts so look-alike domains stand out."],
          ["A suspicious email", "Phishing email checker", "Checks the wording and headers for common signs."],
          ["Not sure where to start", "Help (triage)", "Asks a few questions and points you to the right steps."],
          ["Money already sent by UPI", "UPI fraud playbook", "Step-by-step: bank, 1930, portal, evidence."],
        ]}
      />
      <Note>All free, run in the browser, from MSRX Security (security.msrx.co.in). MSRX is independent and not affiliated with any government body. A checker gives a signal, not a verdict.</Note>
    </div>
  );
}

/** Fig 14 — family code word. */
export function CodeWord() {
  return (
    <div>
      <Steps
        tone="g"
        steps={[
          { t: "Choose it together, in person", d: "A word or short phrase that is not on social media and not guessable from your family’s public posts." },
          { t: "Use it only for emergencies", d: "If it is used for ordinary chat it will leak." },
          { t: "Say the rule out loud", d: "‘If I ever ask for money by phone, you ask me for the word, and if I cannot say it, you hang up and call me back.’" },
          { t: "Change it if it leaks", d: "Treat it like a password." },
        ]}
      />
      <Note>Illustration. The FTC alert I read does not recommend a code word; the idea appears only in readers’ comments under it. It is sound as a family habit because it needs no tool, but it is not an official rule.</Note>
    </div>
  );
}

/** Fig 15 — what MSRX did not find. */
export function Gaps() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="a" tag="Not found" title="An official Indian cloned-voice advisory">
        I looked for an I4C, MeitY or CERT-In advisory specifically on cloned-voice relative-emergency scams and did not find one. Press and vendor pages mention such alerts without a document to read.
      </Card>
      <Card tone="a" tag="Not opened" title="The I4C call-forwarding advisory">
        Reported by the press (Storyboard18, 30 December 2025) but the advisory itself was not available to me.
      </Card>
      <Card tone="a" tag="Not opened" title="The I4C e-challan advisory">
        The scam checker has a rule for fake e-challan messages, but I did not read an official advisory on them, so this article makes no claim about their wording or scale.
      </Card>
      <Card tone="c" tag="Not claimed" title="Statistics on AI-made scams in India">
        I found no official count of how many Indian scams use AI, and the March 2025 PIB release says NCRB keeps no separate data on digital arrest scams. No such number appears here.
      </Card>
    </div>
  );
}
