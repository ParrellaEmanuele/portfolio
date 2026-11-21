import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { education, site, skills } from "@/content/site";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from this
// domain: no request to Google at runtime.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_GB",
    firstName: "Emanuele",
    lastName: "Parrella",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Torino", addressCountry: "IT" },
  affiliation: { "@type": "CollegeOrUniversity", name: education[0].school, url: "https://www.polito.it" },
  knowsAbout: skills.filter((s) => s.group !== "Languages").flatMap((s) => s.items),
  sameAs: [site.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static data from content/site.ts; "<" is escaped as recommended by Next.js.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
