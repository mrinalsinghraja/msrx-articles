import { ImageResponse } from "next/og";

// Social preview card shared by the index and every article. Each route's
// opengraph-image.tsx is a two-line wrapper around this, so a new article gets
// a matching card by copying that file.

export const ogSize = { width: 1200, height: 630 };

export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b12",
          padding: 72,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 10, background: "linear-gradient(90deg, #00c4df, #8b5cf6)" }} />
        <div style={{ display: "flex", color: "#a8a8b8", fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", color: "#f5f5f8", fontSize: title.length > 48 ? 64 : 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          {subtitle && <div style={{ display: "flex", color: "#a8a8b8", fontSize: 30, lineHeight: 1.3 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#85859a", fontSize: 24 }}>
          <span>articles.msrx.co.in</span>
          <span>MSRX · The AI World</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
