import type { MetadataRoute } from "next";
import { site } from "@/content/shared";

export const dynamic = "force-static";

// Both languages, each listing the other as an alternate (hreflang).
const languages = { en: site.url, it: `${site.url}/it` };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/it`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
