import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { it } from "@/content/it";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

// Root layout for the Italian site (/it): <html lang="it">.
export const metadata = pageMetadata(it);
export { viewport } from "@/lib/seo";

export default function ItalianLayout({ children }: { children: ReactNode }) {
  return <RootShell c={it}>{children}</RootShell>;
}
