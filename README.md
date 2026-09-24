# MSRX Articles

**The AI World**: articles on artificial intelligence, published at
[articles.msrx.co.in](https://articles.msrx.co.in). Each article is written for beginners
and technical readers at once, with every section tagged Beginner, Intermediate or Advanced.

Next.js 16 (App Router) + Tailwind CSS 4, statically generated and deployed on Vercel.
The typography, colour tokens and security headers match the main site
([msrx-portal](https://github.com/mrinalsinghraja/msrx-portal)).

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Layout

| Path | What it is |
| --- | --- |
| `lib/articles.ts` | The registry: one entry per article (title, dates, reading time, tags). Powers the index, the sitemap, the RSS feed and `llms.txt`. |
| `app/page.tsx` | The index at `/`. The newest article is shown as the featured card. |
| `app/<slug>/page.tsx` | One folder per article; the article body is written in TSX. |
| `app/<slug>/opengraph-image.tsx` | The social preview card for that article. |
| `components/articles/ArticleParts.tsx` | Shared building blocks: `SectionHeading`, `Figure`, `Callout`, `MathBlock`, `LevelTag`, `WindowFrame`. |
| `components/articles/ReadingAids.tsx` | The reading progress bar and the table of contents that follows your scroll. |
| `components/articles/AiFigures.tsx`, `AiPlaygrounds.tsx` | Diagrams and interactive demos. `FlowSteps` is generic; the others belong to article 1. |
| `app/globals.css` | Colour tokens, article typography (`.article-prose`) and figure colours (`.fig`, `--fig-*`). |

## Adding an article

1. **Register it.** Add an entry at the **top** of `articles` in `lib/articles.ts` (the list is
   newest first). Choose the `slug` carefully: it becomes the URL and must not change after
   publishing.
2. **Write it.** Copy `app/welcome-to-the-world-of-ai/` to `app/<slug>/`. In both
   `page.tsx` and `opengraph-image.tsx`, change the `getArticle("…")` slug, then replace
   the body and the `TOC` list. Each `SectionHeading id` must match an entry in `TOC`.
3. **Draw figures in markup.** Use inline SVG or HTML with the `--fig-*` colour classes
   (`c`, `v`, `a`, `g`, `r`, plus `-s` for soft fills and `-ln` for strokes) so figures work
   in both themes. The site's CSP only allows images it hosts itself; put image files in
   `public/<slug>/` and use a plain `<img>`. If an article has several figures, put them in
   `components/figures/<slug>.tsx`.
4. **Write text JSX-safe.** Use typographic quotes (’ “ ”) in body text: a straight `'` or `"`
   in JSX text fails lint.
5. **Check before publishing.**
   - Check each date, name, number and prize against its primary source.
   - Label anything illustrative (made-up probabilities, sample output) as illustrative.
   - Set `readingMinutes` to the word count ÷ 230.
   - Run `npm run lint && npm run build`, then read the page in light and dark mode, on a phone and on a desktop.
6. **Publish.** Commit and push to `main`. Vercel builds and deploys the site. The sitemap,
   RSS feed and `llms.txt` update automatically.
