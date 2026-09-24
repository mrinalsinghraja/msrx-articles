// ── MSRX mark ─────────────────────────────────────────────────────────────────
// The geometric 3D "M": cyan on the left stroke, violet on the right, with a
// shadowed inner V. Gradient element ids must be unique per instance, so every
// render site passes its own `uid` — otherwise two logos on one page emit
// duplicate ids and the second silently inherits the first's gradients.

export function MsrxLogo({
  size = 32,
  uid,
  className,
}: {
  size?: number;
  /** Unique within the page. e.g. "nav", "footer", "hero". */
  uid: string;
  className?: string;
}) {
  const left = `msrx-l-${uid}`;
  const right = `msrx-r-${uid}`;

  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MSRX"
      className={className}
    >
      <defs>
        <linearGradient id={left} x1="50" y1="8" x2="0" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7EE8F8" />
          <stop offset="100%" stopColor="#00AAC8" />
        </linearGradient>
        <linearGradient id={right} x1="50" y1="8" x2="100" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Left outer stroke */}
      <path d="M 5 110 L 5 12 L 22 12 L 22 110 Z" fill={`url(#${left})`} />
      {/* Left arm into the V */}
      <path d="M 22 12 L 50 58 L 50 78 L 22 46 Z" fill={`url(#${left})`} opacity="0.8" />
      {/* Left peak highlight */}
      <path d="M 5 12 L 50 12 L 50 22 L 22 22 Z" fill="rgba(200,248,255,0.4)" />
      {/* Inner V shadow — reads as depth */}
      <path d="M 22 46 L 50 78 L 78 46 L 78 62 L 50 94 L 22 62 Z" fill="rgba(0,0,30,0.28)" />
      {/* Right arm out of the V */}
      <path d="M 78 12 L 50 58 L 50 78 L 78 46 Z" fill={`url(#${right})`} opacity="0.8" />
      {/* Right outer stroke */}
      <path d="M 78 12 L 95 12 L 95 110 L 78 110 Z" fill={`url(#${right})`} />
      {/* Right peak highlight */}
      <path d="M 50 12 L 95 12 L 78 22 L 50 22 Z" fill="rgba(220,210,255,0.38)" />
      {/* Top ridge */}
      <path
        d="M 5 12 L 22 12 L 50 58 L 78 12 L 95 12 L 95 20 L 78 20 L 50 68 L 22 20 L 5 20 Z"
        fill="rgba(255,255,255,0.18)"
      />
    </svg>
  );
}

/** Mark plus wordmark, as used in the header and footer. */
export function MsrxWordmark({
  uid,
  size = 26,
  tone = "paper",
}: {
  uid: string;
  size?: number;
  tone?: "paper" | "stage";
}) {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <MsrxLogo size={size} uid={uid} />
      <span
        className="font-bold text-[17px] tracking-[0.14em]"
        style={{ color: tone === "stage" ? "var(--stage-text-primary)" : "var(--text-primary)" }}
      >
        MSRX
      </span>
    </span>
  );
}
