#!/usr/bin/env node
// Monthly link check for every reference cited on the site.
//
//   node scripts/check-links.mjs lib/references.ts
//
// Reads the URLs straight from the data file, so new articles are covered with
// no extra step. A link is:
//   ok       — 2xx/3xx
//   blocked  — 401/403/406/429/999: bot walls on sites such as openai.com and
//              TIME. Almost always fine in a real browser, so they are listed
//              for a manual look but do not fail the run.
//   broken   — 404/410, other 4xx, 5xx, or no response. These fail the run, and
//              GitHub emails the repository owner.
// On GitHub Actions the results are also written to the job summary.

import { readFileSync, appendFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/check-links.mjs <data file>");
  process.exit(2);
}

const urls = [...new Set([...readFileSync(file, "utf8").matchAll(/url: "(https?:\/\/[^"]+)"/g)].map((m) => m[1]))];
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36";
const BLOCKED = new Set([401, 403, 406, 429, 999]);

async function check(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*" },
        signal: AbortSignal.timeout(20_000),
      });
      res.body?.cancel();
      if (res.status < 400) return { url, status: res.status, verdict: "ok" };
      if (BLOCKED.has(res.status)) return { url, status: res.status, verdict: "blocked" };
      if (res.status < 500 || attempt === 2) return { url, status: res.status, verdict: "broken" };
    } catch (err) {
      if (attempt === 2) return { url, status: err?.name === "TimeoutError" ? "timeout" : "no response", verdict: "broken" };
    }
    await new Promise((r) => setTimeout(r, 3_000)); // one retry for 5xx and network errors
  }
}

const results = [];
for (let i = 0; i < urls.length; i += 6) {
  results.push(...(await Promise.all(urls.slice(i, i + 6).map(check))));
}

const by = (v) => results.filter((r) => r.verdict === v);
const [ok, blocked, broken] = [by("ok"), by("blocked"), by("broken")];
console.log(`${urls.length} links: ${ok.length} ok, ${blocked.length} blocked by bot walls, ${broken.length} broken`);
for (const r of blocked) console.log(`  blocked ${r.status}  ${r.url}`);
for (const r of broken) console.log(`  BROKEN  ${r.status}  ${r.url}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = [...broken, ...blocked].map((r) => `| ${r.verdict === "broken" ? "❌ broken" : "⚠️ blocked"} | ${r.status} | ${r.url} |`);
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    [
      `### Link check — ${file}`,
      `${urls.length} links: **${ok.length} ok**, ${blocked.length} blocked by bot walls (check by hand), **${broken.length} broken**.`,
      rows.length ? "\n| Result | Status | URL |\n| --- | --- | --- |\n" + rows.join("\n") : "",
      "",
    ].join("\n"),
  );
}

process.exit(broken.length ? 1 : 0);
