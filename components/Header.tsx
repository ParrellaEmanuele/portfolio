import { nav, site } from "@/content/site";
import { Container } from "./ui";

export function Header() {
  return (
    <header className="border-b border-line bg-bg/85 backdrop-blur-md md:sticky md:top-0 md:z-10">
      <Container className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <a href="#top" className="w-fit text-sm font-semibold tracking-tight">
          {site.name}
        </a>
        <nav aria-label="Sections">
          <ul className="-mx-2 flex flex-wrap gap-x-1 font-mono text-[0.8rem] text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-block rounded px-2 py-2 transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
