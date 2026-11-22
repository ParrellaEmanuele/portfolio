import type { Metadata, Viewport } from "next";
import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { en } from "@/content/en";
import { it } from "@/content/it";

/** hreflang map: English at /, Italian at /it, English as the default. */
export const languageAlternates = { en: "/", it: "/it", "x-default": "/" } as const;

export function pageMetadata(c: Content): Metadata {
  const other = c.locale === "en" ? it : en;
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    alternates: { canonical: c.path, languages: languageAlternates },
    openGraph: {
      type: "profile",
      url: c.path,
      siteName: site.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.ogLocale,
      alternateLocale: [other.ogLocale],
      firstName: "Emanuele",
      lastName: "Parrella",
    },
    twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

/** schema.org Person, localized description. */
export function personJsonLd(c: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    description: c.meta.description,
    address: { "@type": "PostalAddress", addressLocality: "Torino", addressCountry: "IT" },
    affiliation: { "@type": "CollegeOrUniversity", name: "Politecnico di Torino", url: "https://www.polito.it" },
    knowsAbout: en.skills.groups.slice(0, 4).flatMap((g) => g.items),
    sameAs: [site.github],
  };
}
