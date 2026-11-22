import type { Metadata } from "next";
import Link from "next/link";
import { fontClasses } from "./fonts";
import "./globals.css";

// One 404 for the whole site (two root layouts mean no single layout to build it
// from). Static hosting serves a single 404.html, so the page is bilingual.
export const metadata: Metadata = {
  title: "Page not found · Pagina non trovata",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontClasses} antialiased`}>
      <head>
        {/* Same script as the main pages, so a theme chosen with the toggle applies here too. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- tiny, must run before paint */}
        <script src="/js/site.js" />
      </head>
      <body className="min-h-dvh font-sans">
        <main id="main" className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center gap-12 px-4 sm:px-6">
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
            <Link href="/" className="mt-4 inline-block text-accent underline underline-offset-4">
              Back to the home page
            </Link>
          </section>
          <section lang="it">
            <h2 className="text-3xl font-semibold tracking-tight">Questa pagina non esiste.</h2>
            <Link href="/it" className="mt-4 inline-block text-accent underline underline-offset-4">
              Torna alla pagina iniziale
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
