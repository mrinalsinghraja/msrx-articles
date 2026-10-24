import type { ReactNode } from "react";

/**
 * Figures for "Black October: PHP2Shell, the flaws AI found in the code behind
 * about 70% of websites".
 *
 * Every fact comes from a source listed for this article in lib/references.ts,
 * read on 24 October 2026. The numbers are claims by named parties (Wiz, OpenAI,
 * Cloudflare, Palo Alto Networks and others) or press reports of them, not our
 * own measurements. Anything marked "illustration" is ours.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/black-october-php2shell";

/** A real screenshot we captured, hosted here because the site's CSP allows only same-origin images. */
export function Pic({ file, alt, width, height }: { file: string; alt: string; width: number; height: number }) {
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
        className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)]"
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

function Timeline({ items }: { items: { d: string; t: string; tone: Tone }[] }) {
  return (
    <ol className="space-y-2">
      {items.map((it) => (
        <li key={it.d + it.t} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[it.tone].fg}` }}>
          <span className="mono shrink-0 w-[6.5rem] text-[12px] font-bold leading-snug" style={{ color: T[it.tone].fg }}>{it.d}</span>
          <p className="text-[13px] leading-snug text-[var(--text-primary)]">{it.t}</p>
        </li>
      ))}
    </ol>
  );
}

/** Figure 2 — the headline numbers. */
export function Numbers() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Big tone="r" value="2" label="critical flaws" sub="CVE-2026-109618 and -109619" />
        <Big tone="a" value="9.2" label="CVSS 4.0 score" sub="PHP Foundation’s rating" />
        <Big tone="c" value="~70%" label="of websites run PHP" sub="Wiz, W3Techs; BBC could not verify" />
        <Big tone="v" value="5.4+" label="versions affected" sub="Wiz; CERT-EU says PHP 5 on" />
      </div>
      <Note>Scores and shares are as stated by the PHP Foundation, Wiz, W3Techs (via iTWire) and CERT-EU (via the BBC). The sources do not agree on how far back the affected versions go.</Note>
    </div>
  );
}

/** Figure 3 — the week. */
export function TheWeek() {
  return (
    <div>
      <Timeline
        items={[
          { d: "17 Oct", t: "Amazon’s honeypots log a PHP2Shell exploit attempt from an anonymised address, four days before disclosure.", tone: "r" },
          { d: "20 Oct, ~15:00 UTC", t: "The two CVE IDs start circulating online, with some wrong details. PHP moves its release forward a day.", tone: "a" },
          { d: "21 Oct, 14:00 UTC", t: "PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 are released. OpenAI, Wiz and the PHP project publish. Agencies in many countries issue alerts.", tone: "g" },
          { d: "21–22 Oct", t: "Government and other sites go offline in several countries. Wikimedia takes down some systems.", tone: "v" },
          { d: "22 Oct", t: "Cloudflare reports exploit attempts in the millions. Australia’s agency says patches are out.", tone: "c" },
          { d: "23 Oct", t: "PHP reserves a third CVE for an unlikely configuration and publishes an informational advisory. No publicly confirmed compromise yet, per The Register.", tone: "a" },
        ]}
      />
      <Note>Times are UTC where the sources give them. Dates are from the PHP Foundation, Amazon, iTWire, the BBC and The Register.</Note>
    </div>
  );
}

/** Figure 4 — the two bugs. */
export function TwoBugs() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="CVE-2026-109618" title="RCE via out-of-memory corruption">
          If a request reaches PHP’s memory limit at exactly the wrong moment, PHP can leave half-built internal data behind and later treat it as valid. On Apache with mod_php, the PHP project says an unauthenticated request can trigger it before any application code runs.
        </Card>
        <Card tone="a" tag="CVE-2026-109619" title="RCE via stale global state">
          A fatal error at the wrong point can leave internal state pointing at memory from an earlier request. A later request handled by the same worker can then use that freed memory.
        </Card>
      </div>
      <Note>Paraphrased from the PHP Foundation’s post and the php.net advisory. Both sit in memory management and error handling, which nearly every request touches.</Note>
    </div>
  );
}

/** Figure 5 — why PHP holds the keys. */
export function KeysToTheKingdom() {
  return (
    <div>
      <Steps
        tone="r"
        steps={[
          "A visitor sends a crafted request to a PHP web server.",
          "The flaw lets that request corrupt the PHP process’s memory.",
          "The attacker can run code as the web server, or read memory.",
          "Memory can hold passwords, tokens and API keys. A site’s own config often holds its database login.",
          "From there an attacker can usually reach the data behind the site.",
        ]}
      />
      <Note>Illustration: our ordering of what Wiz and iTWire describe. The database software itself is not touched by these CVEs, according to iTWire.</Note>
    </div>
  );
}

/** Figure 7 — AI across three eras. */
export function AiEras() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card tone="c" tag="Earlier" title="People, fuzzers, and one early AI win">
          Humans audit code and fuzzers throw random input at it. Google’s Big Sleep reports in November 2024 what it calls the first public example of an AI agent finding an exploitable memory-safety bug in widely used software.
        </Card>
        <Card tone="r" tag="Now" title="AI finds the bug and builds the exploit">
          In PHP2Shell, researchers used GPT-5.6 Sol, Gemini 4 Argon and Wiz Atlas to find the flaws and, Wiz says, to build and adapt working exploits in hours.
        </Card>
        <Card tone="v" tag="Next" title="More findings, shorter windows">
          OpenAI expects similar findings to increase sharply. Experts quoted by iTWire say the time between disclosure and exploitation is shrinking.
        </Card>
      </div>
      <Note>Each column summarises claims from the sources named in the text. “Next” is what named parties expect, not something we can show.</Note>
    </div>
  );
}

/** Figure 8 — human effort versus AI effort. */
export function EffortGap() {
  const rows: { q: string; before: string; now: string }[] = [
    { q: "Finding the flaw", before: "A 2024 human audit found only “the first signs” of the memory problem; no working exploit was known.", now: "Calif, with GPT-5.6 Sol, reported an unconditional RCE on 11 August 2026." },
    { q: "Turning it into an exploit", before: "Wiz says it needed “an exceptionally complex chain of steps, at the edge of what human researchers could practically achieve”.", now: "Wiz says frontier models let it build and adapt working exploits across several applications in hours." },
    { q: "Adapting it to each target", before: "Each version, setting and memory layout needed fresh analysis, testing and debugging.", now: "Wiz says LLMs can help adapt an exploit to different PHP versions, configurations and memory layouts." },
    { q: "Checking the fix", before: "Maintainers test patches by hand and with their own tools.", now: "OpenAI says its process includes adversarial testing with frontier models to look for ways around the patch." },
  ];
  return (
    <div>
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[36rem] text-left text-[12.5px] leading-snug border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-2.5 text-[var(--text-tertiary)] font-semibold" />
              <th className="p-2.5 font-bold" style={{ color: T.a.fg }}>Before frontier AI</th>
              <th className="p-2.5 font-bold" style={{ color: T.r.fg }}>With it</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.q}>
                <td className="p-2.5 border-t border-[var(--border)] font-bold text-[var(--text-primary)] align-top">{r.q}</td>
                <td className="p-2.5 border-t border-[var(--border)] text-[var(--text-secondary)] align-top">{r.before}</td>
                <td className="p-2.5 border-t border-[var(--border)] text-[var(--text-primary)] align-top">{r.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>Quotes and claims are Wiz’s, the PHP Foundation’s and OpenAI’s. None was independently tested, and Wiz sells security products.</Note>
    </div>
  );
}

/** Figure 9 — who found it, with what. */
export function WhoFound() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Calif", tone: "c", t: "Security firm, in OpenAI’s Patch the Planet", d: "A Calif researcher used GPT-5.6 Sol and reported a critical RCE on 11 August 2026, per the PHP Foundation and OpenAI." },
          { tag: "Wiz", tone: "v", t: "Cloud-security firm, independently", d: "Used Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol. It says it found the first bug on 19 August and reported on 24 August." },
          { tag: "OpenAI", tone: "g", t: "An internal researcher, around the same time", d: "The BBC reports OpenAI saying a researcher inside the company also found the issue around the same time as the other firms." },
          { tag: "PHP team", tone: "a", t: "Maintainers, who wrote and shipped the fix", d: "PHP’s maintainers led the fixes and the release, per OpenAI. The Foundation says a person makes every call and works on every patch." },
        ]}
      />
      <Note>Dates differ between sources: Wiz says 19 August for its discovery, and the Foundation lists reports from Calif and OpenAI on 11 August.</Note>
    </div>
  );
}

/** Figure 11 — the attacker clock. */
export function AttackerClock() {
  const rows: { label: string; value: string; w: number; tone: Tone }[] = [
    { label: "10 hours before disclosure", value: "thousands", w: 12, tone: "a" },
    { label: "45 minutes after disclosure", value: "tens of thousands", w: 38, tone: "a" },
    { label: "2 hours after disclosure", value: "hundreds of thousands", w: 66, tone: "r" },
    { label: "Since", value: "millions", w: 100, tone: "r" },
  ];
  return (
    <div>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-[12.5px] font-semibold text-[var(--text-primary)]">{r.label}</span>
              <span className="mono text-[11.5px] font-bold" style={{ color: T[r.tone].fg }}>{r.value}</span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${r.w}%`, background: T[r.tone].fg }} />
            </div>
          </li>
        ))}
      </ul>
      <Note>Exploit attempts that Cloudflare reported, as relayed by The Register. Bar lengths are our illustration of the order of magnitude, not measured values. Attempts are not successful compromises.</Note>
    </div>
  );
}

/** Figure 12 — who went offline. */
export function WhoWentOffline() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Australia", tone: "c", t: "cyber.gov.au and other federal sites", d: "iTWire reports they went dark on the night of 21 October. A spokesperson for the Home Affairs Minister cited “disruptions to several Australian websites”." },
          { tag: "Finland", tone: "v", t: "Government public web services", d: "The BBC reports Finland temporarily shut down the government’s public web services." },
          { tag: "Netherlands", tone: "a", t: "The cyber-security agency’s own site, RIVM, the Tweede Kamer", d: "The BBC reports the agency took its own website offline, and that the health institute and the lower house of parliament became inaccessible." },
          { tag: "Wikimedia", tone: "g", t: "A number of systems, taken down “as a precautionary measure”", d: "Some people could not reach parts of Wikipedia on Wednesday, the BBC reports." },
          { tag: "Others", tone: "r", t: "France, Denmark, the Port of Rotterdam, 4chan, Something Awful", d: "Listed by iTWire. The BBC says Edinburgh council and some BBC programme sites were also inaccessible, with no confirmed link to PHP." },
        ]}
      />
      <Note>A partial list from two outlets. Reasons for each outage were mostly not given by the sites themselves.</Note>
    </div>
  );
}

/** Figure 14 — offline is not hacked. */
export function OfflineNotHacked() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="a" tag="What the sources say" title="Most outages were precautions">
          Agencies including the NSA and the UK’s NCSC advised taking systems offline if they could not be patched at once. Wikimedia described its shutdowns as precautionary.
        </Card>
        <Card tone="g" tag="What we could not find" title="A confirmed compromise count">
          The Register reported on 23 October that no successful compromises attributed to PHP2Shell had been publicly confirmed. The PHP Foundation said it had no evidence of exploitation on patched versions.
        </Card>
      </div>
      <Note>This can change. Exploit attempts are reported in the millions, and evidence of a past breach may take time to surface.</Note>
    </div>
  );
}

/** Figure 15 — leak chain. */
export function LeakChain() {
  return (
    <div>
      <Steps
        tone="a"
        steps={[
          "Tuesday 20 October, about 15:00 UTC: the two CVE IDs circulate online, with a wrong release time and a wrong score of 10.0.",
          "19:30 UTC: PHP publishes its pre-announcement and moves the release from 22 to 21 October.",
          "About 20:00 UTC: Calif publishes, then deletes, a video of its proof of concept. Copies spread.",
          "21 October, 07:41 UTC: Chainguard publishes built images containing the fix, per the Foundation.",
          "14:00 UTC: the coordinated release.",
        ]}
      />
      <Note>The PHP Foundation’s account. Chainguard’s chief executive told iTWire he made the call “when exploits hit in the wild”; Amazon’s earlier sighting is on 17 October.</Note>
    </div>
  );
}

/** Figure 16 — split views. */
export function Views() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Alarm", tone: "r", t: "Wiz: “most severe vulnerabilities ever discovered” by AI", d: "As the BBC quotes it. Tenable’s Satnam Narang, via iTWire, called it among the most consequential events since Log4Shell." },
          { tag: "Caution", tone: "a", t: "The PHP Foundation: the third bug is unlikely", d: "Executive director Elizabeth Barron said it needs a “very unlikely combination” of settings and code, so no emergency fix." },
          { tag: "Critique", tone: "c", t: "Dr Belinda Barnet, Swinburne University", d: "Quoted by iTWire: “It’s like a massive weapons manufacturer offering us safer helmets.”" },
          { tag: "Capacity", tone: "g", t: "Dr Shalinka Jayatilleke, La Trobe University", d: "Via iTWire: AI investment “must be matched by investment in maintenance, human expertise and incident preparedness.”" },
        ]}
      />
      <Note>Opinions of named people, as reported. We do not endorse any of them.</Note>
    </div>
  );
}

/** Figure 17 — the future. */
export function FutureAi() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="g" tag="Defenders" title="Find and fix before attackers do">
          OpenAI says that, to its knowledge, frontier AI found these flaws before attackers did, opening a “Defender’s Window” for maintainers. Google’s Big Sleep team hoped in 2024 for an “asymmetric advantage for defenders”.
        </Card>
        <Card tone="r" tag="Attackers" title="The same tools, faster">
          Wiz says AI lowers the barrier to scaling attacks. Keeper Security’s Shane Barney, via iTWire, warns of a shrinking window between disclosure and exploitation.
        </Card>
        <Card tone="c" tag="Process" title="A repeatable response">
          OpenAI proposes a five-stage framework: fix upstream, give affected organisations time, involve governments, prepare updates, then publish guidance.
        </Card>
        <Card tone="a" tag="People" title="Maintainers are the bottleneck">
          The PHP Foundation says tools cannot decide the right fix for a long-standing design choice, weigh compatibility, or review the patch.
        </Card>
      </div>
      <Note>Forecasts by named parties, not facts. OpenAI and Wiz both sell AI or security products.</Note>
    </div>
  );
}

/** Figure 18 — what to do. */
export function Playbook() {
  return (
    <div>
      <Steps
        tone="g"
        steps={[
          "Find every PHP in your estate: servers, containers, cloud images, hosting panels and appliances that bundle it.",
          "Update to PHP 8.5.12, 8.4.27, 8.3.36 or 8.2.35, or your vendor’s patched package, then restart web workers and containers.",
          "On PHP 8.1 or older, move to a supported version, or use a vendor backport.",
          "If you cannot update now, apply the PHP project’s listed mitigations and treat them as partial.",
          "Keep logs. Look for odd multipart POSTs, memory-limit errors, repeated worker crashes and processes started by PHP.",
          "If code execution is suspected, isolate and rebuild the system, then rotate database credentials and API secrets.",
        ]}
      />
      <Note>Assembled from the php.net advisory and the advice of Qualys and Securonix as relayed by iTWire. Follow your own security team and vendor.</Note>
    </div>
  );
}

/** Figure 19 — unknowns. */
export function Unknowns() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Harm", tone: "r", t: "How many sites were actually compromised", d: "No confirmed count in the sources, as of 23 October." },
          { tag: "Origin", tone: "a", t: "Who tried the exploit four days early, and how they knew", d: "Amazon says it remains unclear how the actor acquired exploit information." },
          { tag: "Scale", tone: "v", t: "The real share of the web affected", d: "“Roughly 70%” is Wiz’s figure; the BBC says it could not verify it." },
          { tag: "Versions", tone: "c", t: "How far back the flaws go", d: "Wiz says to PHP 5.4; CERT-EU, via the BBC, says PHP 5 onwards." },
          { tag: "AI role", tone: "g", t: "How much the AI contributed versus the people", d: "The firms describe large gains; none has published a controlled comparison." },
        ]}
      />
      <Note>What we could not find in the sources on 24 October 2026.</Note>
    </div>
  );
}
