import { projects } from "@/content/shared";
import type { Content } from "@/content/types";
import { Screenshot, Section, Tags } from "./ui";

export function Projects({ c }: { c: Content }) {
  const t = c.projects;
  return (
    <Section id="projects" index="02" label={t.label} title={t.title}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => {
          const item = t.items[p.id];
          return (
            <li key={p.id} className="card reveal flex flex-col rounded-xl border border-line p-5 sm:p-6">
              {p.image ? (
                <div className="mb-6">
                  <Screenshot src={p.image} alt={item.imageAlt} />
                </div>
              ) : null}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight">{item.name}</h3>
                <span className="font-mono text-xs text-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{item.context}</p>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t.problemLabel}</dt>
                  <dd className="mt-1 leading-relaxed">{item.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t.builtLabel}</dt>
                  <dd className="mt-1 leading-relaxed">{item.built}</dd>
                </div>
              </dl>
              {item.note ? <p className="mt-4 text-sm leading-relaxed text-muted italic">{item.note}</p> : null}
              <div className="mt-auto pt-6">
                <Tags items={p.stack} label={`${item.name}: ${t.stackLabel}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
