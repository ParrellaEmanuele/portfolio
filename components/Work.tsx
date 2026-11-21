import NextImage from "next/image";
import { clientWork } from "@/content/site";
import { ArrowUpRight } from "./icons";
import { Placeholder, Section, Tags } from "./ui";

function domainOf(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function Work() {
  return (
    <Section id="work" index="03" label="Selected work" title="Websites for local businesses">
      <p className="max-w-3xl text-lg leading-relaxed text-pretty">{clientWork.intro}</p>
      <div className="mt-5">
        <Tags items={clientWork.services} label="Done on every site" />
      </div>

      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {clientWork.sites.map((s) => {
          const domain = domainOf(s.url);
          return (
            <li key={s.url} className="flex flex-col">
              {s.image ? (
                <NextImage
                  src={s.image}
                  alt={`Home page of the ${s.name} website`}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] rounded-lg border border-line object-cover object-top"
                />
              ) : (
                <Placeholder caption={domain} />
              )}
              <h3 className="mt-4 font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.sector}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-1 py-1 text-sm text-accent underline-offset-4 hover:underline"
              >
                {domain}
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
