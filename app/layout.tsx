import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import "./globals.css";
import { MsrxWordmark } from "@/components/MsrxLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { AUTHOR, MAIN_SITE, SITE_NAME, SITE_URL } from "@/lib/site";

// Same faces as the main MSRX site, so moving between the two feels like one place.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700"],
});

const DESCRIPTION =
  "The AI World by MSRX: artificial intelligence explained twice — once in plain words, once with the maths — with diagrams throughout.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — The AI World`, template: `%s — ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [AUTHOR],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: `${SITE_NAME} — The AI World`,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mrinalsinghraja",
    site: "@mrinalsinghraja",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#101017" },
  ],
};

// Same key as the main site, so a visitor's theme choice follows them only if
// they set it here too (localStorage is per origin). Runs before first paint.
const themeInit = `(function(){try{var t=localStorage.getItem("msrx-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <header className="sticky top-0 z-50 nav-blur border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-4">
            <Link href="/" aria-label={`${SITE_NAME} — home`} className="flex items-center gap-2.5">
              <MsrxWordmark uid="nav" />
              <span className="mono text-[11px] tracking-[0.16em] uppercase text-[var(--text-tertiary)] pt-0.5">Articles</span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <a
                href={MAIN_SITE}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--paper-tint)] transition-colors"
              >
                MSRX apps
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[13.5px] text-[var(--text-tertiary)]">
            <p>
              © {new Date().getFullYear()} {AUTHOR.name} · Part of <a href={MAIN_SITE} className="hover:text-[var(--text-primary)] underline underline-offset-4">MSRX</a>
            </p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/" className="hover:text-[var(--text-primary)]">All articles</Link>
              <a href="/feed.xml" className="hover:text-[var(--text-primary)]">RSS</a>
              <a href={`${MAIN_SITE}/privacy`} className="hover:text-[var(--text-primary)]">Privacy</a>
              <a href={`${MAIN_SITE}/contact`} className="hover:text-[var(--text-primary)]">Contact</a>
            </nav>
          </div>
        </footer>

        <SiteAnalytics />
      </body>
    </html>
  );
}
