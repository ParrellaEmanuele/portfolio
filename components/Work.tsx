import { clientSites, type ClientSite } from "@/content/shared";
import type { Content } from "@/content/types";
import { ArrowUpRight } from "./icons";
import { Screenshot, Section } from "./ui";

function domainOf(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function SiteLink({ site, newTab }: { site: ClientSite; newTab: string }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-1 py-1 text-sm break-all text-accent underline-offset-4 hover:underline"
    >
      {domainOf(site.url)}
      <ArrowUpRight className="size-3.5 shrink-0" />
      <span className="sr-only"> {newTab}</span>
    </a>
  );
}

export function Work({ c }: { c: Content }) {
  const t = c.work;
  // Sites with a screenshot form an image grid; the others a compact list.
  const withImage = clientSites.filter((s) => s.image);
  const textOnly = clientSites.filter((s) => !s.image);

  return (
    <Section id="work" index="03" label={t.label} title={t.title}>
      <div className="max-w-2xl space-y-1 text-lg leading-relaxed">
        {t.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {t.gets.map((g, i) => (
          <li key={g.title} className="border-t-2 border-fg pt-4">
            <span aria-hidden className="font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-lg font-semibold tracking-tight">{g.title}</p>
            <p className="mt-2 leading-relaxed text-muted">{g.text}</p>
          </li>
        ))}
      </ol>

      {withImage.length > 0 ? (
        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {withImage.map((s) => (
            <li key={s.id}>
              <Screenshot src={s.image!} alt={t.imageAlt.replace("{name}", s.name)} />
              <h3 className="mt-4 font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.sectors[s.id]}</p>
              <SiteLink site={s} newTab={t.newTab} />
            </li>
          ))}
        </ul>
      ) : null}

      {textOnly.length > 0 ? (
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {textOnly.map((s) => (
            <li key={s.id} className="flex flex-col rounded-xl border border-line p-5">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.sectors[s.id]}</p>
              <div className="mt-auto pt-2">
                <SiteLink site={s} newTab={t.newTab} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
