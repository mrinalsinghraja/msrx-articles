import type { NextConfig } from "next";

// ── HTTP Security Headers ──────────────────────────────────────────────────────
// Copied from the MSRX portal and kept in step with it. This is a static
// articles site (no API, no auth, no DB),
// so headers focus on XSS, clickjacking, MIME sniffing, and protocol security.
const securityHeaders = [
  // ── Content Security Policy ─────────────────────────────────────────────────
  // Google Fonts self-hosted via next/font → no external font CDN needed.
  //
  // script-src/style-src keep 'unsafe-inline' deliberately, not by default:
  // the theme-init snippet and JSON-LD blocks (layout.tsx, lib/site.tsx JsonLd)
  // render via dangerouslySetInnerHTML on every page, including per-app schema
  // on every /apps/[slug]. Removing unsafe-inline means either:
  //   - nonce-based CSP (Next 16 proxy.ts) → forces every route to dynamic
  //     rendering, losing static generation/ISR and Vercel edge caching site-wide, or
  //   - hash-based CSP → one hardcoded sha256 per JSON-LD block in this file,
  //     silently stale (schema stops rendering, no error) on any content edit.
  // The one place a visitor's input reaches the page is search: the query is
  // typed into the palette and /search, and only ever rendered as React text
  // children, which React escapes. Nothing typed is written into an inline
  // script, an attribute that runs code, or dangerouslySetInnerHTML — so there
  // is still no injection point for unsafe-inline to expose. Revisit this if
  // that ever changes: any new dangerouslySetInnerHTML fed by input voids it.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",      // Next.js hydration
      // unsafe-inline above admits <script> blocks, which Next needs. It does not have
      // to admit onclick="…" attributes: React attaches listeners in JS and no page or
      // game here uses an inline handler, so an injected one is refused outright.
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",        // Next.js CSS
      "font-src 'self'",                         // next/font self-hosts Google Fonts
      "img-src 'self' data: blob:",              // SVG data URIs
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",                      // no forms on site
      "frame-ancestors 'none'",                  // belt-and-suspenders with X-Frame-Options
      "upgrade-insecure-requests",               // force HTTPS for sub-resources
    ].join("; "),
  },

  // ── Clickjacking ─────────────────────────────────────────────────────────────
  { key: "X-Frame-Options", value: "DENY" },

  // ── MIME sniffing ─────────────────────────────────────────────────────────────
  { key: "X-Content-Type-Options", value: "nosniff" },

  // ── HTTPS enforcement (HSTS) ─────────────────────────────────────────────────
  // 2 years, include subdomains, preload list eligible.
  // WARNING: Only enable once the site is confirmed HTTPS-only (Vercel = always HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ── Referrer leakage ─────────────────────────────────────────────────────────
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // ── Browser API restrictions ─────────────────────────────────────────────────
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "bluetooth=()",
      "serial=()",
      "hid=()",
      "display-capture=()",
      "idle-detection=()",
      "xr-spatial-tracking=()",
      "browsing-topics=()",   // block Topics, FLoC's successor
      "interest-cohort=()",   // block FLoC
    ].join(", "),
  },

  // ── Legacy XSS filter ────────────────────────────────────────────────────────
  // Explicitly OFF, which is not the same as omitting it. The legacy auditor
  // this header enables was removed from Chrome and Edge years ago, and while
  // it existed its block mode was itself exploitable: an attacker who could
  // influence one parameter could make the filter suppress a legitimate script
  // on the page. `0` is the value OWASP and the Chrome security team recommend.
  { key: "X-XSS-Protection", value: "0" },

  // ── Cross-origin isolation ───────────────────────────────────────────────────
  // same-origin-allow-popups rather than same-origin: the App Store and social
  // links open in new tabs, and strict same-origin severs window.opener for
  // them. Nothing here needs SharedArrayBuffer, so the strict value would buy
  // nothing in exchange.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },

  // Stops another origin embedding this site's assets as a subresource.
  // same-site, not same-origin, because the app subdomains are siblings.
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },

  // ── Legacy Flash/PDF cross-domain policy ─────────────────────────────────────
  // There is no crossdomain.xml here and there never will be; saying so stops a
  // future uploaded file from being read as one.
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },

  // ── Cross-origin reads ───────────────────────────────────────────────────────
  // Vercel's CDN answers static files with `Access-Control-Allow-Origin: *`,
  // which lets any site's script read these responses — the opposite of what
  // the Cross-Origin-Resource-Policy above says. Nothing here is secret, but
  // nothing here needs to be read cross-origin by a browser either: feed
  // readers, crawlers and llms.txt consumers fetch server-side, where CORS
  // does not apply. So the two headers now agree.
  { key: "Access-Control-Allow-Origin", value: "https://articles.msrx.co.in" },

  // Asks the browser to give this origin its own agent cluster (its own process
  // where the browser can), rather than sharing one with sibling subdomains.
  { key: "Origin-Agent-Cluster", value: "?1" },
];

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this Next walks up and finds the lockfile in
  // the home directory, then traces files against the wrong root.
  turbopack: {
    root: __dirname,
  },

  // Nothing on this site uses <Image>, so Next's own optimizer is switched off.
  //
  // What this does and does not do, measured on production rather than
  // assumed: it stops Next generating /_next/image URLs and keeps its own
  // sharp-based optimizer — the code path behind GHSA-2xp9-vwfh-vxw4, an
  // unauthenticated RCE via AVIF in 16.2.7 — out of any self-hosted build.
  // It does NOT remove /_next/image on Vercel. There, that path is served by
  // Vercel's own image service (its errors read INVALID_IMAGE_OPTIMIZE_REQUEST
  // from a Vercel edge id), which is not Next's code and is patched by Vercel.
  // An earlier version of this comment read a 400 from that service as proof
  // the vulnerable Next code was reachable here; it was not.
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/(.*)",   // apply to all routes
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
