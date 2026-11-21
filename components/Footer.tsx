import { site } from "@/content/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p>Privacy: no cookies, analytics or third-party scripts.</p>
      </Container>
    </footer>
  );
}
