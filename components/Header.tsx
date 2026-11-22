import { site } from "@/content/shared";
import type { Content, Locale } from "@/content/types";
import { Moon, Sun } from "./icons";
import { Container } from "./ui";

const LANGUAGES: { locale: Locale; code: string; name: string; href: string }[] = [
  { locale: "en", code: "EN", name: "English", href: "/" },
  { locale: "it", code: "IT", name: "Italiano", href: "/it" },
];

/**
 * EN | IT segmented switch made of plain links (no JavaScript). The current
 * language is highlighted and marked aria-current. Section ids are identical in
 * both languages, so /#work and /it#work are the same section.
 */
function LanguageSwitch({ c }: { c: Content }) {
  return (
    <nav aria-label={c.nav.languageLabel}>
      <ul className="flex rounded-md border border-line p-0.5 font-mono text-[0.75rem]">
        {LANGUAGES.map((l) => {
          const current = l.locale === c.locale;
          return (
            <li key={l.locale}>
              <a
                href={l.href}
                hrefLang={l.locale}
                lang={l.locale}
                aria-label={`${l.code} (${l.name})`}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-7 min-w-8 items-center justify-center rounded px-2 transition-colors ${
                  current ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {l.code}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Theme toggle: hidden by default, revealed and wired up by /js/site.js. */
function ThemeToggle({ c }: { c: Content }) {
  return (
    <button
      type="button"
      hidden
      data-theme-toggle
      data-to-light={c.nav.themeToLight}
      data-to-dark={c.nav.themeToDark}
      aria-label={c.nav.themeToDark}
      className="theme-toggle inline-flex size-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:text-fg"
    >
      <Moon className="icon-moon size-4" />
      <Sun className="icon-sun size-4" />
    </button>
  );
}

export function Header({ c }: { c: Content }) {
  return (
    <header className="border-b border-line bg-bg/85 backdrop-blur-md md:sticky md:top-0 md:z-10">
      <Container className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            {site.name}
          </a>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch c={c} />
            <ThemeToggle c={c} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav aria-label={c.nav.label}>
            <ul className="-mx-1.5 flex flex-wrap font-mono text-[0.75rem] text-muted sm:-mx-2 sm:gap-x-1 sm:text-[0.8rem]">
              {c.nav.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-link inline-block rounded px-1.5 py-2 transition-colors hover:text-fg sm:px-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitch c={c} />
            <ThemeToggle c={c} />
          </div>
        </div>
      </Container>
    </header>
  );
}
