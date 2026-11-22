import type { ReactNode } from "react";
import { fontClasses } from "@/app/fonts";
import type { Content } from "@/content/types";
import { personJsonLd } from "@/lib/seo";

/** <html> and <body> for one language: each language has its own root layout. */
export function RootShell({ c, children }: { c: Content; children: ReactNode }) {
  return (
    <html lang={c.locale} className={`${fontClasses} antialiased`}>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout: <head> is valid here */}
      <head>
        {/*
          The site's only script (public/js/site.js): theme toggle, copy-email, active
          menu item. Loaded before the body on purpose, so a saved theme is applied before
          the first paint (no flash). It is tiny and served from this origin (CSP 'self').
        */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- intentional, see above */}
        <script src="/js/site.js" />
      </head>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {c.nav.skip}
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static data from content/; "<" is escaped as recommended by Next.js.
          // JSON-LD is data, not code: it is kept by scripts/postbuild.mjs and allowed by the CSP.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(c)).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
