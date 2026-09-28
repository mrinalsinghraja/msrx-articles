# CLAUDE.md — MSRX Articles

Writing or publishing an article? Follow `docs/PROMPT.md` step by step. It is the
standard brief for every article, and `README.md` has the layout and the checks.

Non-negotiables, enforced by the build or the monthly link check:
- 5–10 references per article in `lib/references.ts`, each opened and verified;
  a `<Cite>` marker after every claim a reference supports.
- Facts come from primary sources, never memory; quotes word for word.
- Illustrations, mock-ups and made-up numbers are labelled; "real run" and
  "real screenshot" only when they are.
- Author facts only from `/author`: no employer, years or credentials.
- Publishing = `npm run lint && npm run build`, then `git push origin main`
  (Vercel deploys), then verify the live page.
