import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found · Emanuele Parrella",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh items-center">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
        <Link href="/" className="mt-6 inline-block text-accent underline underline-offset-4">
          Back to the home page
        </Link>
      </Container>
    </main>
  );
}
