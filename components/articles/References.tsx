import { getReferences, REFERENCES_CHECKED } from "@/lib/references";
import { formatArticleDate } from "@/lib/articles";

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
    </section>
  );
}
