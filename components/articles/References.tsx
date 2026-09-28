import Link from "next/link";
import { getReferences, REFERENCES_CHECKED } from "@/lib/references";
import { formatArticleDate } from "@/lib/articles";

/**
 * An inline citation marker, [n], linking to entry n of the article's reference
 * list. `src` is a fragment of the reference's URL that picks out exactly one
 * entry (an arXiv ID, a page slug); the number is derived from the list, so the
 * markers renumber themselves if the list changes. A fragment that matches no
 * entry, or more than one, fails the build rather than pointing at the wrong
 * source.
 */
export function Cite({ slug, src }: { slug: string; src: string }) {
  const refs = getReferences(slug);
  // An exact URL wins; otherwise the fragment must pick out a single entry.
  const exact = refs.findIndex((r) => r.url === src);
  const hits = exact >= 0 ? [exact] : refs.map((r, i) => (r.url.includes(src) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) {
    throw new Error(`<Cite src="${src}"> in "${slug}" matches ${hits.length} references; it must match exactly one`);
  }
  const n = hits[0] + 1;
  return (
    <sup className="cite">
      <a href={`#ref-${n}`} aria-label={`Reference ${n}: ${refs[n - 1].title}`}>
        [{n}]
      </a>
    </sup>
  );
}

/**
 * The numbered source list at the end of an article. Server-rendered; the same
 * list is published as `citation` in the article's JSON-LD.
 */
export function References({ slug }: { slug: string }) {
  const refs = getReferences(slug);
  if (refs.length === 0) return null;
  return (
    <section aria-labelledby="references" className="!mt-16">
      <h2 id="references">References</h2>
      <p className="text-[14.5px] text-[var(--text-secondary)]">
        The sources behind this article: original papers, official announcements and documentation. Each link was opened and checked on{" "}
        <time dateTime={REFERENCES_CHECKED}>{formatArticleDate(REFERENCES_CHECKED)}</time>; documentation without a fixed date is cited as it read that day.
      </p>
      <ol className="!mt-6 !pl-0 list-none space-y-4">
        {refs.map((r, i) => (
          <li key={r.url} id={`ref-${i + 1}`} className="grid grid-cols-[2rem_1fr] gap-x-2 text-[14.5px] leading-relaxed">
            <span className="mono text-[13px] text-[var(--text-tertiary)] pt-[1px]">[{i + 1}]</span>
            <div>
              <p className="!my-0 text-[var(--text-primary)]">
                {r.authors}
                {r.date ? ` (${r.date}). ` : ". "}
                <a href={r.url} rel="noopener" className="font-medium">
                  {r.title}
                </a>
                . <span className="text-[var(--text-secondary)]">{r.container}.</span>
              </p>
              <p className="!my-0 mt-0.5 text-[13px] text-[var(--text-tertiary)]">
                <span className="mono text-[11px] tracking-[0.08em] uppercase">{r.kind}</span> · Supports: {r.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="!mt-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-4 text-[14.5px] leading-relaxed">
        <p className="!my-0 font-semibold text-[var(--text-primary)]">How this article was made</p>
        <p className="!my-0 mt-1 text-[var(--text-secondary)]">
          Researched and drafted with the help of AI assistants, checked against the sources above, and published by{" "}
          <Link href="/author">Mrinal Singh Raja</Link>, who is responsible for what it says. Our{" "}
          <Link href="/standards#ai">editorial standards</Link> explain how AI is used here.
        </p>
      </div>
    </section>
  );
}
