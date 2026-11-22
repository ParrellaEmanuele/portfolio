import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

// Root layout for the English site (/). The Italian site has its own, so each
// page gets the right <html lang>.
export const metadata = pageMetadata(en);
export { viewport } from "@/lib/seo";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell c={en}>{children}</RootShell>;
}
