"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Anonymous page-view counts (Vercel Web Analytics), exactly as the privacy
 * notice describes them.
 *
 * The query string and fragment are removed before anything is sent, because
 * either can carry something a visitor typed. The notice says so, so this is
 * not an optimisation to drop later.
 */
function redact(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url);
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
}

export function SiteAnalytics() {
  return <Analytics beforeSend={redact} />;
}
