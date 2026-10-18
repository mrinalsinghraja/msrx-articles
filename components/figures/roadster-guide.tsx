import type { ReactNode } from "react";

/**
 * Figures for "Tesla's flying Roadster: what was shown, what was promised, and
 * the AI claims we could not find".
 *
 * Every fact comes from a source listed for this article in lib/references.ts,
 * read on 18 October 2026: Tesla's Roadster page and its reservation page
 * (opened in a browser; nothing was entered or submitted), and reports by
 * TechCrunch, CBS News/AFP, Fox Business and Space.com. These are the company's
 * claims and press accounts of one demonstration, not independent tests.
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


const BASE = "/tesla-roadster-flying-launch";

/** A picture from Tesla's own Roadster page, hosted here because the site's CSP allows only same-origin images. */
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
        className="w-full h-auto rounded-[var(--radius)] border border-[var(--border)] bg-black"
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

/** Figure 1 — the long road. */
export function Timeline() {
  const items: { y: string; t: string; tone: Tone }[] = [
    { y: "2017", t: "Second-generation Roadster revealed at the end of the Tesla Semi event; deliveries promised for 2020. $50,000 deposits taken.", tone: "c" },
    { y: "2018", t: "Musk posts that a SpaceX package would add about 10 small rocket thrusters. The first Roadster launches into space on Falcon Heavy.", tone: "v" },
    { y: "2020–24", t: "Delayed in 2020, 2021, 2023 and 2024, as reported.", tone: "r" },
    { y: "2025–26", t: "A reveal “by end of 2025”, then April 1, 2026, then 1 October 2026, which severe weather pushed back.", tone: "a" },
    { y: "15 Oct 2026", t: "Reveal at a SpaceX test site near Waco, Texas, livestreamed on Tesla’s X account.", tone: "g" },
    { y: "2028", t: "Production, according to Musk. No price announced.", tone: "c" },
  ];
  return (
    <div>
      <ol className="space-y-2">
        {items.map((it) => (
          <li key={it.y} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3" style={{ borderLeft: `4px solid ${T[it.tone].fg}` }}>
            <span className="mono shrink-0 w-[5.5rem] text-[12.5px] font-bold" style={{ color: T[it.tone].fg }}>{it.y}</span>
            <p className="text-[13px] leading-snug text-[var(--text-primary)]">{it.t}</p>
          </li>
        ))}
      </ol>
      <Note>As reported by TechCrunch and others. Dates of past announcements are as the press recounts them.</Note>
    </div>
  );
}

/** Figure 2 — what happened on stage. */
export function OnStage() {
  const steps = [
    "The car drives up a curved ramp that becomes a vertical wall, then an overhanging ledge.",
    "A fan-based suction system holds it upside down against the ledge.",
    "It drops away, rolls in the air and lands on its wheels, using cold-gas thrusters.",
    "In a second stunt it launches over a line of vehicles, including a Tesla Semi cab.",
  ];
  return (
    <div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--fig-card)] p-3">
            <span className="mono shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: T.c.soft, color: T.c.fg }}>{i + 1}</span>
            <p className="text-[13px] leading-snug text-[var(--text-primary)]">{s}</p>
          </li>
        ))}
      </ol>
      <Note>Space.com reports the driver’s seat held a mannequin in a SpaceX spacesuit, a nod to “Starman”. The sources we read do not say how the car was controlled.</Note>
    </div>
  );
}

/** Figure 3 — three trims. */
export function Trims() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card tone="c" tag="By reservation" title="Performance">
          <p>“Road ready.” Two seats. Active aerodynamics and a multi-mode suction system for downforce.</p>
        </Card>
        <Card tone="a" tag="Limited release" title="Thrust">
          <p>“Race ready.” Two seats. Adds rear cold-gas thrusters that Tesla says take it from 0–60 in under 1 second.</p>
        </Card>
        <Card tone="r" tag="Invite only" title="Rocket">
          <p>“Air ready.” One seat. Thrusters around the car for forward, upward and rotational movement. “So yes, it can fly.”</p>
        </Card>
      </div>
      <Note>Quotations are Tesla’s own wording on its Roadster page. The page adds: “Not approved for public road use”, and that its listed specifications are for the Thrust augment only.</Note>
    </div>
  );
}

/** Figure 4 — the air system. */
export function AirSystem() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Big tone="r" value="10" label="Thrusters" sub="Tesla engineering VP Lars Moravy" />
        <Big tone="c" value="600 L" label="Compressed air" sub="about 250 kg, per Space.com" />
        <Big tone="a" value="COPVs" label="Pressure vessels in “every usable void”" sub="Tesla on X" />
        <Big tone="g" value="4–5×" label="Thruster force against what the tyres give" sub="Tesla on X, as quoted by Fox Business" />
      </div>
      <Note>Musk said the car has main thrusters at the rear and attitude-control thrusters that steer its orientation. Moravy said the tank can be recharged. All figures are Tesla’s claims, not measurements.</Note>
    </div>
  );
}

/** Figure 5 — the headline specs. */
export function Specs() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12.5px] border-collapse">
        <thead>
          <tr className="text-left text-[var(--text-tertiary)]">
            <th className="py-2 pr-3 font-semibold">Claim</th>
            <th className="py-2 pr-3 font-semibold">Figure</th>
            <th className="py-2 font-semibold">Applies to</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["0–60 mph", "Under 1 second", "Thrust (Tesla’s page)"],
            ["0–60 mph, as posted", "0.81 seconds", "Tesla’s X post, 16 October (a video clip)"],
            ["Range", "300 miles", "All three trims (TechCrunch)"],
            ["Top speed", "More than 230 mph", "All three trims (TechCrunch); Fox Business: Musk, “certain versions”"],
            ["Seats", "2 (Performance, Thrust), 1 (Rocket)", "Tesla’s page"],
            ["Production", "2028", "Musk, per all four press reports"],
          ].map((r) => (
            <tr key={r[0]} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3 font-semibold text-[var(--text-primary)]">{r[0]}</td>
              <td className="py-2 pr-3 text-[var(--text-primary)]">{r[1]}</td>
              <td className="py-2 text-[var(--text-secondary)]">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Note>Claims, not test results. The car was shown accelerating to 60 mph in under a second during the event, as Fox Business and TechCrunch report, and Tesla later posted a clip captioned 0.81 seconds; there has been no independent measurement.</Note>
    </div>
  );
}

/** Figure 6 — suction. */
export function Suction() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    { t: "What it is", d: "A multi-mode fan and ground-sealing system that pulls air out from beneath the car, acting as a downforce generator.", tone: "c", tag: "Tesla" },
    { t: "What it does", d: "Tesla says it gives enough suction to hold the car upside down even when stationary, and adds traction and cornering speed.", tone: "g", tag: "Tesla" },
    { t: "Why it matters on a road", d: "Musk said it will help the car stay connected to the ground during fast turns.", tone: "a", tag: "Musk" },
  ];
  return (
    <div>
      <Rows rows={rows} />
      <Note>Wording paraphrased from Tesla’s Roadster page and Space.com’s account of Musk’s remarks.</Note>
    </div>
  );
}

/** Figure 7 — the cost of reserving. */
export function Reserve() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card tone="c" tag="Reservation page" title="Performance: $50,000">
          <p>$5,000 due today, shown as “fully refundable”, then $45,000 within 10 days. The page says reservations are not final until payment is received.</p>
        </Card>
        <Card tone="a" tag="Reported" title="Thrust: $250,000">
          <p>TechCrunch and Fox Business report this reservation payment. Tesla’s page lists the trim as “limited”. We did not see this figure on the page ourselves.</p>
        </Card>
        <Card tone="r" tag="Reservation page" title="Rocket: invite only">
          <p>Not open for reservation. No price shown.</p>
        </Card>
      </div>
      <Note>These are reservation payments, not the price of the car, which Tesla has not announced. Fox Business notes that about a decade ago Tesla quoted a base price of $200,000.</Note>
    </div>
  );
}

/** Figure 8 — conflicts in the coverage. */
export function Conflicts() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    { t: "Deposit: $5,000 or $50,000?", d: "Both are right. CBS reported the $5,000 due today; TechCrunch and Fox reported the $50,000 total. Tesla’s page shows $5,000 now and $45,000 within 10 days.", tone: "g", tag: "Resolved" },
    { t: "0–60: “under a second”, “one second” or 0.81?", d: "All three are Tesla’s own. Its page says “under 1 second” for Thrust, TechCrunch wrote “one second”, and Tesla’s X account posted a clip captioned “0-60 mph in 0.81 seconds” on 16 October. They are consistent, but 0.81 is a claim from one video, not a measured test.", tone: "g", tag: "Resolved" },
    { t: "Event date: 15 or 16 October?", d: "The event was Thursday 15 October in Texas. Space.com’s text says “last night (Oct. 16)”, which conflicts with its own and others’ dates.", tone: "a", tag: "15 Oct" },
    { t: "Where: Waco or McGregor?", d: "The SpaceX test site is in McGregor, near Waco. Both are used.", tone: "g", tag: "Same place" },
  ];
  return (
    <div>
      <Rows rows={rows} />
    </div>
  );
}

/** Figure 9 — safety and regulators. */
export function SafetyRegs() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="r" title="What Musk has said about safety">
          <ul className="space-y-1 list-disc pl-4">
            <li>At the event: “not necessarily a safety-optimized car”.</li>
            <li>On a podcast earlier this year, as quoted by TechCrunch: if safety is your number one goal, do not buy the Roadster.</li>
            <li>Tesla would “aspire not to kill anyone in this car”.</li>
          </ul>
        </Card>
        <Card tone="a" title="What the regulators said (CBS News)">
          <ul className="space-y-1 list-disc pl-4">
            <li>The FAA told CBS the vehicle does not meet its definition of an aircraft.</li>
            <li>NHTSA normally oversees vehicles but delegates safety certification to the maker; it had not responded.</li>
            <li>A senior transport official was sceptical it could take off, but said there was no clear answer.</li>
          </ul>
        </Card>
      </div>
      <Note>Tesla’s page says the car is not approved for public road use. Space.com adds that it is hard to imagine the flying version being certified for everyday use.</Note>
    </div>
  );
}

/** Figure 10 — the claims we were handed. */
export function AiClaims() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    {
      t: "“Machine-learning algorithms and high-speed sensors balance the thrusters and suction.”",
      d: "Tesla’s page says the thrusters use all-electric actuators to make micro-adjustments within a fraction of a second to help stabilise the car in flight. It does not say machine learning or name sensors.",
      tone: "a",
      tag: "Control: yes. ML: not stated",
    },
    {
      t: "“The computer adjusts torque from your driving style, road and tyre grip to allow sub-1-second 0–60.”",
      d: "Not in any source we read. Tesla attributes the sub-1-second figure to the Thrust trim’s rear thrusters, and says the thrusters add 4–5× the force tyres can give.",
      tone: "r",
      tag: "Not supported",
    },
    {
      t: "“Tesla’s Grok assistant acts as a conversational co-pilot in the cabin.”",
      d: "Not found on Tesla’s Roadster page or in the four reports. The page describes a yoke for steer-by-wire, a centre touchscreen and two smaller forward displays.",
      tone: "r",
      tag: "Not found",
    },
    {
      t: "“Guardian Angel” neural networks brake and steer to prevent collisions.",
      d: "Not found. Musk called it “not necessarily a safety-optimized car” and said safety is not the main goal.",
      tone: "r",
      tag: "Not found",
    },
  ];
  return (
    <div>
      <Rows rows={rows} />
      <Note>Claims from a text we were given, whose origin we do not know. “Not found” means absent from the sources listed, not proof the feature does not exist. Tesla may say more later.</Note>
    </div>
  );
}

/** Figure 11 — what is not known. */
export function Unknowns() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    { t: "Price", d: "Not announced. Reservation payments are not a price.", tone: "r", tag: "Unknown" },
    { t: "Which trims will actually ship", d: "Performance is “by reservation”, Thrust “limited release”, Rocket “invite only” and “not available in all regions”.", tone: "r", tag: "Unknown" },
    { t: "Whether the flying version can be legal to use", d: "No agency has a clear answer, per CBS.", tone: "r", tag: "Unknown" },
    { t: "How the stunts were controlled", d: "The driver’s seat held a mannequin. The sources do not describe the control system.", tone: "a", tag: "Unclear" },
    { t: "Independent performance figures", d: "None yet. All numbers are Tesla’s.", tone: "a", tag: "Unclear" },
  ];
  return (
    <div>
      <Rows rows={rows} />
    </div>
  );
}

/** Figure 12 — the car against the AI story. */
export function AiAngle() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card tone="c" tag="Said by Tesla" title="“The best of the last human-driven cars”">
          <p>Tesla wrote this phrase on X, as Fox Business reports, and TechCrunch quotes Musk using similar words. A Cybercab was among the Tesla vehicles the Roadster jumped over at the event.</p>
        </Card>
        <Card tone="a" tag="Our reading" title="Control, not “AI”, is the claim">
          <p>What Tesla describes is fast control engineering: actuators, fans, active wings and steer-by-wire. That is precise and impressive, but it is not the same thing as AI, and Tesla did not call it that on its page.</p>
        </Card>
      </div>
      <Note>The “Our reading” card is our interpretation, an illustration rather than a Tesla statement.</Note>
    </div>
  );
}

/** Figure 13 — what to watch. */
export function WatchList() {
  const rows: { t: string; d: string; tone: Tone; tag: string }[] = [
    { t: "Tesla’s quarterly results, 21 October", d: "CBS cites an analyst expecting the Roadster to be a halo, not a revenue driver.", tone: "c", tag: "Soon" },
    { t: "A price and a spec sheet", d: "Until then, treat every figure as a target.", tone: "a", tag: "Next" },
    { t: "Regulators", d: "Whether NHTSA or the FAA issue statements on a road-legal and a flying version.", tone: "a", tag: "Next" },
    { t: "Independent tests", d: "None can happen before cars exist; production is planned for 2028.", tone: "r", tag: "Later" },
  ];
  return (
    <div>
      <Rows rows={rows} />
    </div>
  );
}
