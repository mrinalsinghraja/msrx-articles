import type { ReactNode } from "react";

/**
 * Figures for "Redesigning source control at Anthropic".
 *
 * Every number comes from Anthropic's engineering post "Redesigning source
 * control at Anthropic" (13 October 2026), read in full on 14 October 2026, and
 * is Anthropic's own account; we could not check it independently. The one sum
 * that is ours is marked: 25 million checkouts x 25 GB is about 625 PB.
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
      <p className="display text-[30px] leading-none" style={{ color: T[tone].fg }}>{value}</p>
      <p className="mt-2 text-[13px] font-semibold text-[var(--text-primary)] leading-snug">{label}</p>
      {sub && <p className="mt-1 text-[11.5px] text-[var(--text-tertiary)] leading-snug">{sub}</p>}
    </div>
  );
}

function Arrow() {
  return <div className="text-center text-[var(--text-tertiary)] text-lg leading-none py-1" aria-hidden="true">↓</div>;
}

/** Figure 1 — merges per day, the two figures the post states. */
export function MergeGrowth() {
  const rows = [
    { label: "May 2026", value: 2500, shown: "about 2,500 a day", tone: "c" as Tone },
    { label: "September 2026", value: 30000, shown: "over 30,000 a day", tone: "r" as Tone },
  ];
  return (
    <div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2">
            <span className="w-[7.5rem] sm:w-40 shrink-0 text-[12.5px] font-semibold text-[var(--text-primary)]">{r.label}</span>
            <div className="flex-1 h-7 rounded-full bg-[var(--fig-card)] border border-[var(--border)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(r.value / 30000) * 100}%`, background: T[r.tone].fg }} />
            </div>
            <span className="mono shrink-0 text-[11.5px] text-[var(--text-secondary)] w-[7.5rem] sm:w-36">{r.shown}</span>
          </li>
        ))}
      </ul>
      <Note>Code changes merged to Anthropic’s monorepo per day, as the post states them. The post also charts January to September; we show only the two values it gives in words. Anthropic’s own figures, not independently checked.</Note>
    </div>
  );
}

/** Figure 2 — the size of the problem. */
export function ScaleCards() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Big tone="v" value="~100 GB" label="History of the main branch alone" />
        <Big tone="v" value="25 GB+" label="Compressed working copy" />
        <Big tone="a" value="~25 million" label="Code checkouts a day, for CI alone" sub="Developer environments, agent sandboxes and research jobs are extra" />
        <Big tone="r" value="600 PB+" label="Git traffic a day if fetched naively" sub="Our check: 25 million × 25 GB ≈ 625 PB" />
      </div>
      <Note>All figures are Anthropic’s, from its post. “Naively” means every checkout fetching a full copy.</Note>
    </div>
  );
}

/** Figure 3 — git's design against the agent workload. */
export function GitVsAgents() {
  const rows = [
    { git: "Every clone is a complete repository", agents: "Agents and jobs are online by definition" },
    { git: "Works fully offline: diff, history, blame, any revision", agents: "Nothing ever needs to work offline" },
    { git: "Each client can act as a server", agents: "Only one authoritative copy is ever used" },
    { git: "Great for most repositories", agents: "Strained at ~100 GB of history and 25M checkouts a day" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-2 text-[11px] font-bold uppercase tracking-[0.1em]">
        <span style={{ color: T.c.fg }}>What git assumes</span>
        <span style={{ color: T.r.fg }}>What the workload is</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.git} className="grid grid-cols-2 gap-2 text-[13px] leading-snug">
            <span className="rounded-[var(--radius)] p-3" style={{ background: T.c.soft, color: "var(--text-primary)" }}>{r.git}</span>
            <span className="rounded-[var(--radius)] p-3" style={{ background: T.r.soft, color: "var(--text-primary)" }}>{r.agents}</span>
          </li>
        ))}
      </ul>
      <Note>Paraphrased from the post’s section “Growing our monorepo”.</Note>
    </div>
  );
}

/** Figure 4 — the workarounds already tried. */
export function Workarounds() {
  const items = [
    { n: "Shallow clones, sparse checkouts, promisor remotes", w: "Git’s own tools for taking a slice of a repository. Used." },
    { n: "Internal git mirrors", w: "Several hundred at the peak. Harder to run as the merge rate rose, and no longer scaled once the repo outgrew a mirror’s disk or memory." },
    { n: "Seeds (repository snapshots in blob storage)", w: "Fell further behind the tip of main between refreshes." },
    { n: "Partial clones for history queries", w: "Diff and blame took more and more care to keep working." },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {items.map((it, i) => (
          <li key={it.n} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T.a.soft, color: T.a.fg }}>{i + 1}</span>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{it.n}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{it.w}</p>
            </div>
          </li>
        ))}
      </ol>
      <Note>Anthropic’s account of what it tried before building its own. It says this “bought us time”.</Note>
    </div>
  );
}

/** Figure 5 — five principles. */
export function Principles() {
  const p: { t: string; b: string; tone: Tone }[] = [
    { t: "Clients are always online", b: "Design for a server that is always reachable; clients fetch data when they need it.", tone: "c" },
    { t: "Client–server asymmetry", b: "The server answers history, blame, commits, merges and rebases. The client keeps a bounded cache and lays out files.", tone: "v" },
    { t: "Everything scales out", b: "Data is distributed; no full copy of the repo exists anywhere, even on the server; no packfiles, no maintenance.", tone: "a" },
    { t: "Commits are cheap, incremental, lock-free", b: "Every commit, rebase and merge happens on the server. Cost scales with the change, not the repo. Few refs.", tone: "g" },
    { t: "The working copy is optional and sparse", b: "Ask the server for a diff instead of checking out. When files are needed, fetch only what is read.", tone: "r" },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        {p.map((x, i) => (
          <Card key={x.t} tone={x.tone} tag={`Principle ${i + 1}`} title={x.t}>{x.b}</Card>
        ))}
      </div>
      <Note>The post lists these as the principles it set for Scion, and credits Google’s Piper and Meta’s Sapling as prior art.</Note>
    </div>
  );
}

/** Figure 6 — git commit versus Scion changeset. */
export function ChangesetCompare() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" tag="Git" title="Commit">
          <ul className="space-y-1 list-disc pl-4">
            <li>Points to a tree: a snapshot of the whole directory structure</li>
            <li>Made locally, then pushed to share</li>
            <li>Stored in packfiles that need maintenance</li>
          </ul>
        </Card>
        <Card tone="g" tag="Scion" title="Changeset">
          <ul className="space-y-1 list-disc pl-4">
            <li>An entry in a write-ahead log</li>
            <li>Lists the files changed against the first parent, with content-addressed pointers to compressed contents in blob storage</li>
            <li>Created on the server; available everywhere instantly</li>
          </ul>
        </Card>
      </div>
      <Note>From the post’s “Data structures” section. The first-parent choice suits trunk-based development in a monorepo, where people mostly care about main-line history.</Note>
    </div>
  );
}

/** Figure 7 — derived data. */
export function DerivedData() {
  return (
    <div>
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: T.v.fg }}>Changeset: only what changed</p>
        <Arrow />
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: T.a.fg }}>Derived data: built from changesets</p>
        <div className="grid sm:grid-cols-3 gap-2 text-[12.5px] text-[var(--text-primary)]">
          <span className="rounded-[var(--radius)] p-2.5" style={{ background: T.a.soft }}>File blame</span>
          <span className="rounded-[var(--radius)] p-2.5" style={{ background: T.a.soft }}>Path history</span>
          <span className="rounded-[var(--radius)] p-2.5" style={{ background: T.a.soft }}>Skip lists for the commit graph</span>
        </div>
        <p className="mt-3 text-[12.5px] leading-snug text-[var(--text-secondary)]">
          Each type is defined recursively: its value for a changeset is computed from its values for that changeset’s parents. It can be computed eagerly or deferred, and the client never sees the internals.
        </p>
      </div>
      <Note>Schematic of the post’s description. Not Anthropic’s own diagram.</Note>
    </div>
  );
}

/** Figure 8 — the checkout tiers. */
export function CheckoutTiers() {
  const tiers: { n: string; d: string; tone: Tone }[] = [
    { n: "scn (client)", d: "Asks for trees, then blobs it is missing; talks over a socket to the node’s daemon", tone: "c" },
    { n: "scion-daemon", d: "One per node; stores objects for every job on that node; starts from a periodically refreshed snapshot", tone: "v" },
    { n: "scion-cache", d: "Regional tree and blob caches; stream objects from memory in the daemon’s on-disk format", tone: "a" },
    { n: "scion-server", d: "Authoritative; reads from Spanner or cloud storage; computes derived data on demand", tone: "g" },
  ];
  return (
    <div>
      <div className="max-w-md mx-auto">
        {tiers.map((t, i) => (
          <div key={t.n}>
            <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[t.tone].fg}` }}>
              <p className="mono text-[13px] font-bold" style={{ color: T[t.tone].fg }}>{t.n}</p>
              <p className="text-[12.5px] leading-snug text-[var(--text-secondary)] mt-0.5">{t.d}</p>
            </div>
            {i < tiers.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <Note>All four tiers answer identical RPCs, so a client does not need to know the cache layout; Anthropic enforces the tiering to keep a failure in one regional cache from reaching the servers. Each tier is reported at over 99% cache hit rate.</Note>
    </div>
  );
}

/** Figure 9 — how fetching differs. */
export function FetchCompare() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" tag="Git, in the post’s terms" title="Tell the server what you have">
          <ol className="list-decimal pl-4 space-y-1">
            <li>Client and server negotiate what the client already has</li>
            <li>Server works out the missing objects and compresses them</li>
            <li>One large packfile comes back</li>
          </ol>
        </Card>
        <Card tone="g" tag="Scion" title="Ask for what you want">
          <ol className="list-decimal pl-4 space-y-1">
            <li>Start from a root tree; check the local store</li>
            <li>Request missing trees, recursively, then blobs</li>
            <li>Every request is for one immutable object, so any cache can answer</li>
          </ol>
        </Card>
      </div>
      <Note>Sparse and virtualized checkouts need no special support because the client simply does not ask for trees it does not want. The git side is a simplification of the post’s comparison.</Note>
    </div>
  );
}

/** Figure 10 — reported results. */
export function Results() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Big tone="g" value="200×" label="Smaller footprint" sub="CPU and memory, against the git mirror fleet" />
        <Big tone="g" value="~100×" label="Faster checkouts" sub="Seconds rather than minutes, CI and research jobs" />
        <Big tone="g" value="25%" label="CPU capacity won back" sub="In CI alone" />
        <Big tone="c" value="99%+" label="Cache hit rate" sub="At each tier" />
        <Big tone="v" value="20×" label="Less memory" sub="Rewritten ingestion pipeline, same invariants" />
        <Big tone="v" value="4×" label="Faster" sub="Same rewritten ingestion pipeline" />
      </div>
      <Note>All reported by Anthropic. “Two orders of magnitude” is the post’s phrase for the checkout speed-up. The last two figures are for one pipeline, not the whole system.</Note>
    </div>
  );
}

/** Figure 11 — humans and the model. */
export function EngineerNo() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" title="What the model did, per the post">
          <ul className="space-y-1 list-disc pl-4">
            <li>Rewrote the git-to-Scion ingestion prototype</li>
            <li>Built simulations of every non-trivial infrastructure interaction, plus fuzzing and rate limiting</li>
            <li>Found an ancestry-query optimization that missed one of the indexes</li>
            <li>Watched component health in Slack channels (“superfans”)</li>
          </ul>
        </Card>
        <Card tone="a" title="What the engineers did, per the post">
          <ul className="space-y-1 list-disc pl-4">
            <li>Held the design-level tradeoffs and the scale target</li>
            <li>Said “no” when systems brute-forced a lookup by reading the commit log</li>
            <li>Steered away from over-engineering driven by adversarial review</li>
            <li>Reviewed every change request, for intent rather than every line</li>
          </ul>
        </Card>
      </div>
      <Note>A seven-person team built both Scion and the code-review tool Antique, per the post. Its engineers say they now rate Claude as better than themselves at writing code.</Note>
    </div>
  );
}

/** Figure 12 — merge queue. */
export function MergeQueue() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" tag="Human scale" title="Merge queue with a global lock">
          <p>Changes line up. Each one is tested against the latest main, then merged. Main stays green, at the cost of waiting.</p>
        </Card>
        <Card tone="r" tag="Agent scale" title="Test after, fix fast">
          <p>Hundreds or thousands of changes can merge while tests run. Anthropic says it could not replicate a global-lock queue, so it leans on post-merge and pre-deploy testing and lets agents repair conflicts.</p>
        </Card>
      </div>
      <Note>The trade-off the post names: concurrent changes can conflict. Its claim is that Claude can typically fix conflicts faster than humans can identify them. We could not verify that.</Note>
    </div>
  );
}

/** Figure 13 — what git could adopt. */
export function GitCanLearn() {
  const rows = [
    { k: "Server-side RPCs for history, blame, merge bases", v: "Git platforms could offer them, perhaps standardized across forges, for the git client to learn to use" },
    { k: "Different negotiation protocol", v: "It “doesn’t have to look exactly like it does today”" },
    { k: "Novel server architectures", v: "A git server doesn’t have to work the way a git client does" },
    { k: "Sparse and shallow features", v: "Can be made to compose well" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.k} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.k}</p>
            <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.v}</p>
          </li>
        ))}
      </ul>
      <Note>The post’s suggestions for applying the best parts of Scion to git “without departing from the overall model”. Anthropic says it wants to partner with GitHub, GitLab and the open-source community.</Note>
    </div>
  );
}

/** Figure 14 — do you need this? */
export function DoYouNeedThis() {
  const rows: { q: string; a: string; tone: Tone; tag: string }[] = [
    { q: "A normal-sized repo, a team of people and a few agents", a: "Git as it is. Nothing in the post suggests otherwise.", tone: "g", tag: "Stay" },
    { q: "A big repo where clones and CI checkouts have become slow", a: "Look at git’s partial clone and sparse checkout first; both are documented and shipped.", tone: "c", tag: "Tune" },
    { q: "A monorepo with swarms of agents and CI doing tens of millions of checkouts", a: "This is the class the post is about. Expect to need server-side thinking, and watch what git platforms add.", tone: "a", tag: "Watch" },
    { q: "Anyone wanting Scion itself", a: "The post says it is not a suitable general replacement and is hard to offer in a form others could adopt.", tone: "r", tag: "Not available" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.q} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 self-start rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg, background: T[r.tone].soft }}>{r.tag}</span>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.q}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.a}</p>
            </div>
          </li>
        ))}
      </ul>
      <Note>Our reading of the post, not Anthropic’s advice. An illustration.</Note>
    </div>
  );
}

/** Figure 15 — claim check. */
export function ClaimCheck() {
  const rows: { c: string; v: string; tone: Tone; tag: string }[] = [
    { c: "“Anthropic replaced git.”", v: "For its monorepo, yes, in five months. The post says Scion is not a general replacement.", tone: "a", tag: "Needs care" },
    { c: "“Merges went from 2,500 to 30,000 a day.”", v: "Stated in the post: about 2,500 in May, over 30,000 in September 2026.", tone: "g", tag: "In the post" },
    { c: "“It cut infrastructure 200×.”", v: "Stated, against the git mirror fleet, in CPU and memory. Anthropic’s own measurement.", tone: "g", tag: "In the post" },
    { c: "“Seven people built it with Claude.”", v: "Stated: seven people built Scion and Antique. The post credits Claude heavily; the exact share of code is not given.", tone: "a", tag: "Partly" },
    { c: "“Others can use Scion.”", v: "Not available. The post explains why and shares ideas instead.", tone: "r", tag: "Not in the post" },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.c} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 self-start rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: T[r.tone].fg, background: T[r.tone].soft }}>{r.tag}</span>
            <div>
              <p className="text-[13.5px] font-bold text-[var(--text-primary)] leading-snug">{r.c}</p>
              <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mt-0.5">{r.v}</p>
            </div>
          </li>
        ))}
      </ul>
      <Note>Claims as they circulated on X and in summaries, checked against the post.</Note>
    </div>
  );
}
