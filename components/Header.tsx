import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { Container } from "./ui";

export function Header({ c }: { c: Content }) {
  // Plain link to the other language (no JavaScript). Section ids are the same in
  // both languages, so /#work and /it#work point to the same section.
  const other = c.locale === "en" ? { href: "/it", lang: "it" } : { href: "/", lang: "en" };
  return (
    <header className="border-b border-line bg-bg/85 backdrop-blur-md md:sticky md:top-0 md:z-10">
      <Container className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            {site.name}
          </a>
          <a
            href={other.href}
            hrefLang={other.lang}
            lang={other.lang}
            aria-label={c.nav.switchTo.ariaLabel}
            className="rounded border border-line px-2 py-1 font-mono text-[0.75rem] text-muted transition-colors hover:text-fg md:hidden"
          >
            {c.nav.switchTo.label}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <nav aria-label={c.nav.label}>
            <ul className="-mx-1.5 flex flex-wrap font-mono text-[0.75rem] text-muted sm:-mx-2 sm:gap-x-1 sm:text-[0.8rem]">
              {c.nav.links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-block rounded px-1.5 py-2 transition-colors hover:text-fg sm:px-2">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={other.href}
            hrefLang={other.lang}
            lang={other.lang}
            aria-label={c.nav.switchTo.ariaLabel}
            className="hidden rounded border border-line px-2 py-1 font-mono text-[0.75rem] text-muted transition-colors hover:text-fg md:inline-block"
          >
            {c.nav.switchTo.label}
          </a>
        </div>
      </Container>
    </header>
  );
}
