import type { ReactNode } from "react";

/**
 * Figures for "I let AI scan all 70 of my repositories".
 *
 * The numbers come from the author's own security report dated 25 October 2026
 * (an AI-assisted review of the author's repositories and apps). That report is
 * not a public document, so the figures say "from the author's report". The
 * advisory facts come from the three GitHub advisories listed in
 * lib/references.ts. Anything marked "illustration" is ours.
 */

type Tone = "c" | "v" | "a" | "g" | "r";
const T: Record<Tone, { fg: string; soft: string }> = {
  c: { fg: "var(--fig-cyan)", soft: "var(--fig-cyan-soft)" },
  v: { fg: "var(--fig-violet)", soft: "var(--fig-violet-soft)" },
  a: { fg: "var(--fig-amber)", soft: "var(--fig-amber-soft)" },
  g: { fg: "var(--fig-green)", soft: "var(--fig-green-soft)" },
  r: { fg: "var(--fig-rose)", soft: "var(--fig-rose-soft)" },
};

const BASE = "/ai-security-scan-70-repositories";

/** A graphic or screenshot hosted here because the site's CSP allows only same-origin images. */
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

/** Figure 1 — the scoreboard. */
export function Scoreboard() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Big tone="c" value="70" label="repositories scanned" sub="plus 28 live sites" />
        <Big tone="v" value="26" label="web apps tested" sub="in a real browser" />
        <Big tone="g" value="11/14" label="findings closed" sub="1 partly, 2 low-priority left" />
        <Big tone="a" value="0" label="Next.js advisories left" sub="all 25 apps upgraded" />
      </div>
      <Note>From the author’s own security report of 25 October 2026. The report is not public; the figures are the author’s, not independently audited.</Note>
    </div>
  );
}

/** Figure 3 — the kinds of check. */
export function ChecksGrid() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" tag="Read" title="Secret scan and code review">
          Searched the full git history of all 70 repositories for keys and tokens, and read every API route, server action and database rule for injection, missing checks and open proxies. No live secret was found.
        </Card>
        <Card tone="v" tag="Audit" title="Dependency advisories">
          Checked every lockfile against published advisories. This is where the biggest finding came from.
        </Card>
        <Card tone="g" tag="Run" title="Build, tests and a browser crawl">
          Built each app as production does, ran 5,984 unit tests and 789 database tests on real Postgres, and opened 484 pages in Chromium.
        </Card>
        <Card tone="r" tag="Attack" title="Penetration tests on the author’s own builds">
          113 conclusive tests on login gates, lockouts, session tampering, SSRF payloads and cross-site requests. 112 passed; the one that did not only matters off Vercel.
        </Card>
        <Card tone="a" tag="Stress" title="Load test">
          727,639 requests with 500 concurrent users across 25 apps, with no crashes.
        </Card>
        <Card tone="c" tag="Watch" title="Live checks, read-only">
          Fetched 28 live sites for status and headers. Deeper testing ran only on source code and local builds.
        </Card>
      </div>
      <Note>From the author’s report. “Penetration tests” here means tests against the author’s own code and local builds, never anyone else’s systems.</Note>
    </div>
  );
}

/** Figure 5 — the pipeline. */
export function Pipeline() {
  const steps: { t: string; d: string; tone: Tone }[] = [
    { t: "Scan", d: "secrets, dependencies, static analysis", tone: "c" },
    { t: "Triage", d: "severity, and proof where possible", tone: "c" },
    { t: "Fix", d: "one branch per app, smallest change", tone: "v" },
    { t: "Pull request", d: "checks run on a clean clone", tone: "v" },
    { t: "Merge", d: "only on green checks", tone: "g" },
    { t: "Deploy", d: "git push, or a command-line deploy", tone: "g" },
    { t: "Verify", d: "a live request, a browser crawl", tone: "g" },
  ];
  return (
    <div>
      <ol className="grid sm:grid-cols-7 gap-2">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3 text-center" style={{ borderTop: `3px solid ${T[s.tone].fg}` }}>
            <p className="mono text-[11px] font-bold" style={{ color: T[s.tone].fg }}>{i + 1}</p>
            <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-tight">{s.t}</p>
            <p className="mt-1 text-[11.5px] text-[var(--text-secondary)] leading-snug">{s.d}</p>
          </li>
        ))}
      </ol>
      <Note>The seven steps every fix followed, from the author’s report. The last step is the one that matters most.</Note>
    </div>
  );
}

/** Figure 6 — the fixed list, as a table. */
export function FixTable() {
  const rows: ReactNode[][] = [
    ["Critical", "A framework advisory let a stranger run code on the server, across 25 apps", "All 25 upgraded; no advisories left"],
    ["High", "A URL-fetching feature could be pointed at internal addresses, and one tool used a shell", "Internal addresses refused, shell removed, origin check and rate limits added"],
    ["High", "Any signed-in user could read group invite codes and join any group as its owner", "Database rules tightened; invites redeemed through one checked server step"],
    ["High", "New accounts could approve their own role in a patrol app", "Role-based database rules, tested in an emulator (19 of 19)"],
    ["High", "Critical and high library advisories in 6 apps", "Upgraded or overridden; unused packages dropped"],
    ["Medium", "A login cookie that never expired and could not be revoked", "Signed, expiring sessions and login throttling"],
    ["Medium", "AI endpoints that any website could call, without limits", "Same-origin checks, size caps and rate limits"],
    ["Medium", "A form that stored the whole request body", "Field allow-list, size cap and rate limit"],
  ];
  return (
    <div>
      <Table head={["Severity", "What the scan found", "What changed"]} rows={rows} min="36rem" />
      <Note>The eight biggest items among the 14 findings, described generally. All were fixed and checked on the live system.</Note>
    </div>
  );
}

/** Figure 8 — the advisories. */
export function Advisories() {
  const rows: ReactNode[][] = [
    ["GHSA-673q-mjm6-r5xr", "App Router with Cache Components, a use cache function returning multiple typed arrays", "16.0.0 to 16.4.0", "16.4.1"],
    ["GHSA-2464-fhr4-w9xw", "Image Optimization API when SVG files are used, on glibc-based Linux", "10.0.0 to 15.5.27, and 16.0.0 to 16.4.0", "15.5.28, 16.4.1"],
    ["GHSA-vcvr-r3jv-pc5j", "next/og ImageResponse (Node.js) when attacker-controlled values reach SVG content", "16.2.0 up to 16.3.6", "16.3.6"],
  ];
  return (
    <div>
      <Table head={["Advisory", "When it applies", "Affected next", "Patched"]} rows={rows} min="38rem" />
      <Note>From the three GitHub advisories, all rated critical (CVSS 9.5). The author’s apps now run 16.4.2, above every patched version.</Note>
    </div>
  );
}

/** Figure 9 — merged is not live. */
export function MergedNotLive() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="g" tag="Git-connected" title="Merge, and it deploys itself">
          Most apps redeploy when a change lands on main, so a merged fix reaches visitors within minutes.
        </Card>
        <Card tone="a" tag="Command-line deploys" title="Merge, and nothing happens">
          Three apps are deployed by hand. Their last deploys were 29, 41 and 40 days old, so fixes sitting on main were not reaching visitors until each was deployed and checked.
        </Card>
      </div>
      <Note>From the author’s report. Fix: sync every local copy to GitHub first, check what the host is actually serving, then deploy and verify with a live request.</Note>
    </div>
  );
}

/** Figure 10 — before and after. */
export function BeforeAfter() {
  const rows: ReactNode[][] = [
    ["Next.js advisories", "Critical RCE advisories on 25 apps", "0 left, on 16.4.2"],
    ["Content-Security-Policy on the tools site", "None", "257 pages, 0 violations, on the local build and live"],
    ["Home-page favicon", "796 KB", "19 KB"],
    ["Home-page weight", "1,614 KB", "855 KB"],
    ["Dependency updates", "Manual, when remembered", "Weekly grouped pull requests across 25 repositories"],
    ["Font loading at build time", "Downloaded from a third party", "Packaged with each app, no outside call"],
  ];
  return (
    <div>
      <Table head={["", "Before", "After"]} rows={rows} min="32rem" />
      <Note>From the author’s report. Lighthouse and page-weight numbers are the author’s own measurements.</Note>
    </div>
  );
}

/** Figure 12 — CSP test. */
export function CspTest() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <Big tone="g" value="257" label="pages opened" sub="every page in the sitemap" />
        <Big tone="g" value="0" label="violations" sub="local build and live site" />
        <Big tone="c" value="0" label="third-party origins" sub="the policy allows none" />
      </div>
      <Note>The policy allows the site’s own origin, in-memory blob files and two WebAssembly engines. Tools that merge, compress, protect and convert files still produced downloads under it.</Note>
    </div>
  );
}

/** Figure 13 — the automation loop. */
export function AutoLoop() {
  return (
    <div>
      <Steps
        tone="g"
        steps={[
          "A new advisory or update appears.",
          "Dependabot opens one grouped weekly pull request, after a cooldown for version updates.",
          "CI runs the tests and a production build on a clean clone.",
          "Where CI exists, the grouped patch pull request merges itself. Minor and major bumps stay manual.",
          "Where CI does not exist yet, it waits for a one-click human review.",
        ]}
      />
      <Note>The author’s setup. GitHub’s documentation says the cooldown applies to version updates, not security updates.</Note>
    </div>
  );
}

/** Figure 14 — a cadence you can copy. */
export function Cadence() {
  const rows: ReactNode[][] = [
    ["Every week", "Merge or review the grouped dependency pull request", "Minutes"],
    ["Every month", "Ask an AI coding assistant to review your API routes and database rules, and to read your dependency advisories", "An hour or two"],
    ["After any big advisory", "Check your own stack against it the same day, and deploy the fix", "Same day"],
    ["Every quarter", "Run the full sweep: secrets in history, dependencies, tests, browser crawl, a few attack tests on your own build", "A day"],
    ["Always", "Verify on the live site, not just in the code", "Seconds"],
  ];
  return (
    <div>
      <Table head={["How often", "What to do", "Roughly"]} rows={rows} min="34rem" />
      <Note>Illustration: a starting rhythm of ours, based on the author’s setup. Adjust it to your own risk.</Note>
    </div>
  );
}

/** Figure 15 — prompts you can use. */
export function Prompts() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Routes", tone: "c", t: "“Read every API route in this repo. For each, say who can call it, what input it trusts, and what happens if the input is huge or hostile.”", d: "Finds open proxies, missing checks and unbounded input." },
          { tag: "Rules", tone: "v", t: "“Read my database rules. Who can read or change each table or document? Show me any row a signed-in user should not reach.”", d: "Finds access-control gaps, the top risk in OWASP’s 2025 list." },
          { tag: "Advisories", tone: "g", t: "“Check my lockfile against published advisories. List only what applies to how I use the package.”", d: "Turns a long audit into a short, ranked list." },
          { tag: "Secrets", tone: "r", t: "“Search my git history for keys, tokens and passwords. Do not print any value.”", d: "Find them without copying them into a chat." },
          { tag: "Proof", tone: "a", t: "“For each fix, give me a command I can run against the live site to prove it works.”", d: "Makes ‘merged’ into ‘verified’." },
        ]}
      />
      <Note>Illustration: prompts of ours in the spirit of the author’s process, not a record of the prompts used. Run them only on code you own or are authorised to test.</Note>
    </div>
  );
}

/** Figure 16 — safe use. */
export function SafeUse() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="g" tag="Do" title="Scan what you own">
          Your own code and your own builds, plus read-only checks of your own live sites.
        </Card>
        <Card tone="g" tag="Do" title="Keep a human on the approve button">
          Let AI propose, test and explain. You merge, you deploy, you rotate keys.
        </Card>
        <Card tone="r" tag="Don’t" title="Paste secrets into a chat">
          Ask the tool to search for them without printing them. If one is exposed, rotate it.
        </Card>
        <Card tone="r" tag="Don’t" title="Test other people’s systems">
          No scanning or attack testing without the owner’s written permission.
        </Card>
        <Card tone="a" tag="Check" title="Treat findings as leads">
          AI can be wrong or miss things. Reproduce serious findings and verify every fix.
        </Card>
        <Card tone="a" tag="Check" title="Mind the cost of auto-merge">
          Auto-merge only where tests exist, and never on code from a pull request you have not read.
        </Card>
      </div>
      <Note>Illustration: our guidance, in line with the author’s own rules. Not legal advice.</Note>
    </div>
  );
}

/** Figure 17 — what went right. */
export function WentRight() {
  return (
    <div>
      <Rows
        rows={[
          { tag: "Found", tone: "c", t: "A critical, account-wide problem", d: "One class of framework flaw across 25 apps, found in one sweep rather than one at a time." },
          { tag: "Fixed", tone: "g", t: "Nearly everything, quickly", d: "11 of 14 findings closed and verified, including all four high-severity items." },
          { tag: "Proved", tone: "v", t: "Fixes checked on the live system", d: "Live requests, console checks and a browser crawl, not just merged code." },
          { tag: "Learned", tone: "a", t: "Merged is not live", d: "Hand-deployed apps were weeks behind. Finding that was worth more than any single bug." },
          { tag: "Kept", tone: "g", t: "A system that stays fixed", d: "CI, weekly dependency pull requests and self-merging patches where tests exist." },
        ]}
      />
      <Note>From the author’s report, summarised.</Note>
    </div>
  );
}
