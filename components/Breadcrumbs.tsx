import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 * separately by each page, so the markup and the schema stay in step.
 * The final crumb is the current page and is not a link.
 */
export function Breadcrumbs({
  trail,
  tone = "paper",
}: {
  trail: { name: string; path: string }[];
  tone?: "paper" | "stage";
}) {
  const muted = tone === "stage" ? "var(--stage-text-tertiary)" : "var(--text-tertiary)";
  const link = tone === "stage" ? "var(--stage-text-secondary)" : "var(--text-secondary)";
  const current = tone === "stage" ? "var(--stage-text-primary)" : "var(--text-primary)";

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight size={13} aria-hidden="true" style={{ color: muted }} />
              )}
              {isLast ? (
                <span className="font-medium" style={{ color: current }} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: link }}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
