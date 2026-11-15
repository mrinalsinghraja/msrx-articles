import type { ReactNode } from "react";

/**
 * Figures for "The 24-Hour Blackout".
 *
 * Every fact comes from a source in lib/references.ts and is labelled with who
 * said it. Anything marked "our illustration" or "our arithmetic" is ours.
 * Screenshots are real captures taken on 15 November 2026, cropped to leave out
 * advertising, sign-in prompts and promotions.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/microsoft-365-24-hour-blackout";

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

/** Figure 2: the timeline, in UTC. */
export function Timeline() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-[60rem]">
        <Step tone="a" when="Thu 12 Nov · 16:20 UTC" title="Impact starts">
          Start time in Microsoft’s incident record for EX1550543. Users in the Americas cannot reach Exchange Online mailboxes.
        </Step>
        <Step tone="c" when="Thu · about 17:54 UTC" title="First public post">
          Microsoft’s status account posts that it is investigating, then warns within minutes that any region may be affected.
        </Step>
        <Step tone="v" when="Thu · 18:57 UTC" title="Deployments paused">
          Deployments and configuration changes are halted while the team looks for the cause.
        </Step>
        <Step tone="r" when="Thu evening" title="Servers failing checks">
          Many servers fail automated health checks and drop out. An alternative health-check method brings a first subset back.
        </Step>
        <Step tone="a" when="Thu night to Fri 13 Nov" title="Rollback and capacity">
          A recent network change is reverted, capacity is added, a patch is applied and the email retry window is extended to 48 hours.
        </Step>
        <Step tone="g" when="Fri · 11:01–13:00 UTC" title="Regions recover">
          Asia Pacific first, then Europe, then North America.
        </Step>
        <Step tone="g" when="Fri · 16:10 UTC" title="Impact ends">
          End time in the incident record. Monitoring and the email backlog continue; a final status follows on Saturday.
        </Step>
      </div>
      <Note>
        Times are Microsoft’s own, as mirrored by Cloud Admin Hub, plus the first public post time from Wikipedia. Between the 16:20 start and the 16:10 end is 23 hours 50 minutes (our arithmetic). The mirror’s page header also shows a 10:05 start and “30h 5m”, which does not match its own details.
      </Note>
    </div>
  );
}

/** Figure 3: how many people? */
export function ScaleCheck() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Big tone="c" value="≈ 430M" label="“People who use Microsoft 365”" sub="Wikipedia’s figure; all users, not those affected" />
        <Big tone="v" value="450M+" label="Paid commercial seats" sub="Microsoft, January 2026: the total customer base" />
        <Big tone="r" value="Not published" label="People actually cut off" sub="Microsoft has given no count" />
      </div>
      <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
        The two big numbers describe how many people Microsoft 365 <em>has</em>, not how many lost access. A “seat” is a paid licence, not a unique person. The outage hit Exchange Online and the services that lean on it, and the status page said components that do not depend on Exchange Online stayed up.
      </p>
      <Note>Sources: Wikipedia (430 million), Tony Redmond’s report of Microsoft’s FY26 Q2 results (450 million paid commercial seats), SecurityWeek (components not dependent on Exchange Online stayed functional).</Note>
    </div>
  );
}

/** Figure 5: what went down. */
export function ServicesMap() {
  const dep: { name: string; tone: Tone; note: string }[] = [
    { name: "Teams", tone: "r", note: "CNBC, The Register, SecurityWeek" },
    { name: "SharePoint Online", tone: "r", note: "SecurityWeek, CNBC" },
    { name: "Microsoft 365 Copilot", tone: "r", note: "SecurityWeek, The Register" },
    { name: "Defender XDR / Defender for Office 365", tone: "a", note: "SecurityWeek, The Register" },
    { name: "Intune", tone: "a", note: "The Register" },
    { name: "Apps Admin Center", tone: "a", note: "The Register: admins lost tools to diagnose" },
    { name: "Outlook.com, OneDrive, OneNote, To Do", tone: "v", note: "Personal services, per Outlook India" },
  ];
  return (
    <div>
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4 text-center mb-3" style={{ borderTop: `4px solid ${T.r.fg}` }}>
        <p className="mono text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T.r.fg }}>At the centre · incident EX1550543</p>
        <p className="mt-1 text-[16px] font-bold text-[var(--text-primary)]">Exchange Online mailboxes</p>
        <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">Outlook on the web, MAPI, Exchange ActiveSync and the REST API; on-premises mail flow to or from Exchange Online too.</p>
      </div>
      <p className="text-center text-[12px] text-[var(--text-tertiary)] mb-3">…and everything that leans on it (incident MO1550821)</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {dep.map((d) => (
          <div key={d.name} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[d.tone].fg}` }}>
            <p className="text-[13px] font-bold text-[var(--text-primary)] leading-snug">{d.name}</p>
            <p className="text-[11.5px] text-[var(--text-tertiary)] leading-snug">{d.note}</p>
          </div>
        ))}
      </div>
      <Note>Compiled from the sources named on each card. Not every service failed for every user; reports varied by region and hour.</Note>
    </div>
  );
}

/** Figure 7: the cascade, as an illustration. */
export function Cascade() {
  const steps: { tone: Tone; n: string; title: string; body: string }[] = [
    { tone: "a", n: "1", title: "An earlier network capacity upgrade", body: "Microsoft says the incident was introduced here. Nothing visibly broke." },
    { tone: "c", n: "2", title: "A later network change shifts traffic", body: "Traffic shifts during maintenance exposed what Microsoft calls a latent bug." },
    { tone: "v", n: "3", title: "New connections cannot complete", body: "The systems that set up secure connections stall, and requests queue up." },
    { tone: "r", n: "4", title: "Servers run out of capacity", body: "They stop accepting connections and fail automated health checks." },
    { tone: "r", n: "5", title: "The rest carry more load", body: "Microsoft says “a number of servers being unexpectedly unavailable” strained the remaining infrastructure." },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[s.tone].fg}` }}>
            <span className="display text-[22px] leading-none shrink-0 w-6" style={{ color: T[s.tone].fg }}>{s.n}</span>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{s.title}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-secondary)]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Note>Our illustration of Microsoft’s preliminary description. The steps and their order simplify what Microsoft wrote; the post-incident report may change the picture.</Note>
    </div>
  );
}

/** Figure 9: how Microsoft's explanation changed. */
export function StoryChanged() {
  const rows: { tone: Tone; tag: string; text: string }[] = [
    { tone: "c", tag: "First", text: "Microsoft says it is investigating mailbox access problems in the Americas, then that any region could be affected." },
    { tone: "a", tag: "Then", text: "A portion of infrastructure has “elevated load” across several regions, which is likely adding to the errors." },
    { tone: "a", tag: "Then", text: "The load is not from more traffic. Many servers are unexpectedly unavailable, which strains the rest." },
    { tone: "v", tag: "Then", text: "Servers fail automated health checks and drop out; later, a core process on them is described as overwhelmed." },
    { tone: "r", tag: "Tension", text: "One post says no recent change lines up with the start of impact. Another says Microsoft is weighing a revert of a few recent configuration updates." },
    { tone: "g", tag: "Final", text: "A technical issue, not cyber or AI. It began in an earlier network capacity upgrade and surfaced after a recent network change." },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[r.tone].fg}` }}>
          <span className="mono shrink-0 w-[4.4rem] text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg }}>{r.tag}</span>
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{r.text}</p>
        </div>
      ))}
      <Note>Paraphrased from posts by @MSFT365Status and The Register, in the order Microsoft made them. Changing an explanation as evidence arrives is normal in an investigation; it is not a sign of anything hidden.</Note>
    </div>
  );
}

/** Figure 10: suspects. */
export function Suspects() {
  const rows: { tone: Tone; tag: string; what: string; status: string }[] = [
    { tone: "g", tag: "Microsoft says no", what: "A cyberattack", status: "“No evidence of malicious activity associated with this incident” (status page, via SecurityWeek). Not independently verified." },
    { tone: "g", tag: "Microsoft says no", what: "AI or AI agents", status: "“Not related to cyber or AI / agents.” Copilot was among the services that went down." },
    { tone: "g", tag: "Microsoft says no", what: "A surge in demand", status: "Overall traffic had not increased; servers were unavailable (SecurityWeek, Microsoft’s posts)." },
    { tone: "a", tag: "Unlinked", what: "The 10 November Patch Tuesday update", status: "Fixed 1,094 vulnerabilities two days earlier. Microsoft’s advisories have not linked it (SecurityWeek). Timing alone proves nothing." },
    { tone: "a", tag: "Unrelated", what: "An AWS or Google outage", status: "Some users reported problems elsewhere; Amazon said its services were operating normally (CNBC)." },
    { tone: "r", tag: "Microsoft’s cause", what: "Network capacity upgrade plus a later network change", status: "Preliminary. A full post-incident report is promised." },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[r.tone].fg}` }}>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="mono text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg }}>{r.tag}</span>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)]">{r.what}</p>
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">{r.status}</p>
        </div>
      ))}
      <Note>Where the evidence stands on 15 November 2026. “Microsoft says” means Microsoft’s own statement, not an outside finding.</Note>
    </div>
  );
}

/** Figure 12: what Microsoft did to recover. */
export function RecoveryLevers() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card tone="v" title="Stop making changes" tag="Contain">
        <p>Deployments and configuration changes were paused on Thursday evening so nothing new could make things worse.</p>
      </Card>
      <Card tone="c" title="Move traffic away" tag="Relieve">
        <p>Connection traffic was redistributed across the wider infrastructure and moved off the affected servers.</p>
      </Card>
      <Card tone="a" title="Restart and re-test" tag="Recover">
        <p>Microsoft described isolating a portion of infrastructure, restarting components and reintroducing traffic to confirm stability before widening.</p>
      </Card>
      <Card tone="a" title="Change the health check" tag="Workaround">
        <p>An alternative service health check method let a subset of servers return, then was applied more broadly.</p>
      </Card>
      <Card tone="r" title="Rebuild, patch and add capacity" tag="Repair">
        <p>Servers were rebuilt on a previous configuration, capacity was added, and a patch was applied to a subset and then widened (Cloud Admin Hub’s mirror).</p>
      </Card>
      <Card tone="g" title="Protect the mail" tag="Safeguard">
        <p>The delayed-mail timeout was extended to 48 hours so queued messages would be retried instead of bouncing.</p>
      </Card>
    </div>
  );
}

/** Figure 13: who felt it. */
export function Impact() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" title="Health" tag="Hospitals">
          <p>UK NHS staff reportedly moved to paper records (Outlook India). Toronto hospital networks had difficulties and one declared a code grey; the NHS cancelled some operations (Wikipedia).</p>
        </Card>
        <Card tone="a" title="Courts and government" tag="Public sector">
          <p>A Manchester court sent jurors home and a Colorado sheriff’s office asked people to post bond in person (Outlook India). Departments in Australia, Japan, the Philippines, Singapore and the US were affected (Wikipedia).</p>
        </Card>
        <Card tone="c" title="Business" tag="Companies">
          <p>Richemont delayed its earnings and Workhorse Group moved its results to 16 November (CNBC). Air India rerouted email; IndiGo and Akasa Air had email problems (CNBC, Outlook India).</p>
        </Card>
        <Card tone="v" title="Schools" tag="Education">
          <p>Ofqual, the Department for Education and many schools in England had major disruption (Wikipedia).</p>
        </Card>
      </div>
      <Note>Each claim names the outlet that reported it. Wikipedia is a crowd-edited summary and I did not open its underlying sources, so those lines are the least certain on the page.</Note>
    </div>
  );
}

/** Figure 15: two big incidents in 2026. */
export function Compare2026() {
  const rows: [string, string, string][] = [
    ["Dates", "22–23 January 2026", "12–14 November 2026"],
    ["Where", "North America", "Worldwide; more than 70 countries reported"],
    ["How long", "Nearly 10 hours (The Register)", "About 24 hours of core impact; backlog and monitoring into 14 November"],
    ["Services", "Outlook, Defender, Purview; external mail largely blocked", "Exchange Online, Teams, SharePoint, Copilot, Defender, Intune and more"],
    ["Microsoft’s stated cause", "A portion of North American service infrastructure “not processing traffic as expected”", "A fault from an earlier network capacity upgrade, surfaced by a later network change"],
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-[13px] border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2 border-b border-[var(--border)] text-[var(--text-tertiary)] font-semibold"> </th>
              <th className="p-2 border-b border-[var(--border)] font-bold" style={{ color: T.c.fg }}>January</th>
              <th className="p-2 border-b border-[var(--border)] font-bold" style={{ color: T.r.fg }}>November</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, a, b]) => (
              <tr key={k} className="align-top">
                <td className="p-2 border-b border-[var(--border)] font-semibold text-[var(--text-primary)]">{k}</td>
                <td className="p-2 border-b border-[var(--border)] text-[var(--text-secondary)]">{a}</td>
                <td className="p-2 border-b border-[var(--border)] text-[var(--text-secondary)]">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>January row from The Register’s report of 23 January 2026; November row from the sources in this article. The two causes are described differently, and nothing in the sources links them.</Note>
    </div>
  );
}

/** Figure 16: known against unknown. */
export function KnownUnknown() {
  const rows: { tone: Tone; tag: string; text: string }[] = [
    { tone: "g", tag: "Confirmed", text: "Exchange Online and related services failed from 12 November; Microsoft’s incident record puts impact from 16:20 UTC on 12 November to 16:10 UTC on 13 November (Microsoft’s record, via a mirror)." },
    { tone: "g", tag: "Confirmed", text: "Microsoft apologised and said it was “a technical issue not related to cyber or AI / agents” (Microsoft’s own post; CNBC)." },
    { tone: "a", tag: "Preliminary", text: "The cause: an earlier network capacity upgrade, a later network change, and a latent bug in the systems that set up secure connections. Microsoft calls the analysis ongoing." },
    { tone: "a", tag: "Differs", text: "Wikipedia says “faulty server updates”; Microsoft’s own wording is a network capacity upgrade and a network change. The incident page’s start time also disagrees with itself (10:05 against 16:20 UTC)." },
    { tone: "r", tag: "Unknown", text: "How many people or organisations were cut off. Microsoft has published no count; the 430 and 450 million figures are customer totals." },
    { tone: "r", tag: "Unknown", text: "The final root cause and the fixes. Microsoft promised a preliminary post-incident report within two business days and a final one within five; I found neither published yet." },
    { tone: "r", tag: "Unknown", text: "The cost. Wikipedia mentions an estimate of about $7 billion in lost productivity, attributed to Anderson Economic Group; I did not open that estimate, so I do not rely on it." },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[r.tone].fg}` }}>
          <span className="mono shrink-0 w-[5rem] text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg }}>{r.tag}</span>
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Figure 17: a practical path. */
export function Plan() {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Card tone="c" title="If you use Microsoft 365" tag="User">
        <p>Delayed mail was kept and retried for up to 48 hours, so a missing message is not necessarily lost. Check the status page before reinstalling or resetting anything.</p>
      </Card>
      <Card tone="a" title="If you run IT" tag="Admin">
        <p>Microsoft’s own admin centre was hit too, and it pointed people to status.cloud.microsoft. Keep a contact route that does not depend on Microsoft 365, and rehearse working without email.</p>
      </Card>
      <Card tone="g" title="If you lead a team" tag="Leader">
        <p>Decide in advance how the team talks, signs off urgent work and reaches customers when email and chat are both down. General guidance, not a claim about any one company.</p>
      </Card>
    </div>
  );
}
