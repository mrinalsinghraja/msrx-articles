import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-24 text-center">
      <p className="eyebrow text-[var(--text-tertiary)] mb-4">404</p>
      <h1 className="display text-[clamp(30px,5vw,48px)] text-[var(--text-primary)] mb-4">No article here</h1>
      <p className="text-[16px] text-[var(--text-secondary)] mb-8">The link may be old, or the article may not be published yet.</p>
      <Link href="/" className="msrx-gradient inline-flex rounded-2xl px-6 py-3 text-[15px] font-semibold text-white">
        All articles
      </Link>
    </div>
  );
}
