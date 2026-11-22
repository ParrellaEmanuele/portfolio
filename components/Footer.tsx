import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { Container } from "./ui";

export function Footer({ c }: { c: Content }) {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {c.footer.location}
        </p>
        <p>{c.footer.privacy}</p>
      </Container>
    </footer>
  );
}
