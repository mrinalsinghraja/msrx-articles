# Prompt: write and publish a new article

Paste everything in the code block into a new Claude Code session opened in this
repository, fill in the `TOPIC` line, and send. It encodes the house standards
(see `README.md` and articles.msrx.co.in/standards), so a session that follows it
publishes to the same bar as the existing articles.

```text
TOPIC: ____________________________________________
(Optional) ANGLE / AUDIENCE / MUST-COVER: __________________

You are writing the next article in "The AI World" series for MSRX Articles
(articles.msrx.co.in, repo ~/development/msrx-articles). Research it, write it,
build it, verify it and publish it to production. Read README.md and the most
recent article in app/ first, and match the house style exactly.

1. RESEARCH FROM PRIMARY SOURCES
- Read the original sources before writing: papers (arXiv, journals), official
  announcements, official documentation, government or regulator statements.
  Use news coverage only when no primary source exists, and say so.
- Write every fact from the source text, never from memory. Check every
  number, date, name, price and version against its source. Copy quotes word
  for word, and quote only what the source actually says.
- Where sources disagree or information is missing, say so plainly.
- Check what earlier articles in the series already cover. Link to them
  rather than repeating them, and give this article a clearly different angle.

2. STRUCTURE AND DEPTH
- 2,500–5,000 words. Start from zero and end at advanced.
- Tag every section Beginner, Intermediate or Advanced. Give it a "How to
  read this" box, a table of contents, plain-language callouts ("In plain
  words") and technical callouts ("Going deeper").
- Explain each idea twice where it helps: once with an everyday analogy,
  once with the real mechanism (and the maths, if there is any).
- End with a practical path or plan, a short quiz with answers, and a
  one-line takeaway.

3. VISUALS
- At least 10 figures: diagrams, flowcharts, timelines, comparisons and
  interactive demos, as inline SVG or HTML using the --fig-* colour classes,
  so they work in light and dark mode. Put wide diagrams in a sideways
  scroller so they stay readable on phones.
- Screenshots only if real (captured, saved in public/<slug>/, captioned
  "Real screenshot, captured <date>"). Terminal output only if from a real
  run, labelled "real run · <date>". Label every mock-up and made-up number
  as an illustration.
- Code samples must be run or type-checked before publishing. Generate the
  code constants from the tested files; never hand-copy them.

4. REFERENCES AND CITATIONS (non-negotiable)
- 5–10 references in lib/references.ts (up to 20 only for a long feature flagged `longFeature`). Open every URL and match its title
  to the work. Take authors and dates from the source's own metadata (arXiv,
  Crossref, the page's publish date). Pages behind bot walls must be
  confirmed in a real browser. Give each one a "note" saying what it
  supports. If more than 10 sources are needed, prefer one source that
  covers several claims.
- Put a <Cite slug={article.slug} src="…" /> marker after every claim a
  reference supports. Every reference must be cited at least once. Renumber
  the list in order of first appearance.

5. HONESTY AND INDEPENDENCE
- The "How this article was made" note (AI assistance) appears automatically.
  Never claim anything the process did not do.
- Say who makes each product, that MSRX is independent and not affiliated,
  and the date the facts were checked.
- Author facts come only from /author. No employer, no years of experience,
  no credentials.

6. PUBLISH
- Register the article at the top of lib/articles.ts (slug stable, reading
  minutes = words ÷ 230, published = updated = today). Add opengraph-image.tsx
  and the previous article's "Next article" link.
- Run: npm run lint, npm run build, node scripts/check-links.mjs
  lib/references.ts. Check every figure in a production build at desktop and
  375px, light and dark, with no sideways overflow.
- Commit, git push origin main (that is the deploy), then check the live page,
  index, RSS, llms.txt, sitemap and OG image.
- Add a "What's new" entry to ~/development/msrx-portal/lib/updates.ts
  (slug "articles") only if this is a milestone, then push the portal.
- Report what was published, the live URL, and anything you could not verify.
```
