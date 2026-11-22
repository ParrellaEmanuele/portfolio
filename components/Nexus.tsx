import { modules, nexusStack, pausedModule } from "@/content/shared";
import type { Content } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Section, Tags } from "./ui";

function Numbered({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item, i) => (
        <li key={item.title} className="grid grid-cols-[2rem_1fr] gap-x-2">
          <span aria-hidden className="pt-0.5 font-mono text-sm text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Nexus({ c }: { c: Content }) {
  const { nexus } = c;
  return (
    <Section id="nexus" index="01" label={nexus.label} title={nexus.title} subtitle={nexus.subtitle} tone="feature">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <p className="font-mono text-xs text-muted">{nexus.period}</p>
          <p className="mt-3 text-lg leading-relaxed text-pretty">{nexus.intro}</p>
          <div className="mt-5">
            <Tags items={nexusStack} label={nexus.stackLabel} />
          </div>

          <div className="mt-10">
            <Numbered items={nexus.keyPoints} />
          </div>

          {/* Native disclosure: works without JavaScript and within the CSP. */}
          <details className="group mt-8 rounded-xl border border-line bg-bg">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-3 font-medium [&::-webkit-details-marker]:hidden">
              {nexus.detailsSummary}
              <span
                aria-hidden
                className="font-mono text-lg leading-none text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="border-t border-line px-5 py-6">
              <Numbered items={nexus.layers} />
            </div>
          </details>
        </div>

        <figure className="mx-auto w-full max-w-[360px] lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-bg p-4">
            <ArchitectureDiagram d={c.diagram} />
          </div>
          <figcaption className="mt-4 text-sm leading-relaxed text-muted">{nexus.privacyNote}</figcaption>
        </figure>
      </div>

      <h3 className="mt-20 text-2xl font-semibold tracking-tight">{nexus.decisionsTitle}</h3>
      <ul className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {nexus.decisions.map((d) => (
          <li key={d.choice} className="border-l-2 border-accent pl-5">
            <p className="font-medium leading-snug">{d.choice}</p>
            <p className="mt-2 leading-relaxed text-muted">
              <span aria-hidden className="mr-1.5 font-mono text-accent">
                →
              </span>
              {d.why}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-20 text-2xl font-semibold tracking-tight">{nexus.modulesTitle}</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {modules.map((m) => {
          const t = nexus.modules[m.id];
          return (
          <li key={m.name} className="flex flex-col rounded-xl border border-line bg-bg p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold">{m.name}</h4>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.7rem] text-accent">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {nexus.statusComplete}
              </span>
            </div>
            <p className="mt-3 text-lg leading-snug text-pretty">{t.use}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
            {t.note ? <p className="mt-3 text-sm leading-relaxed text-muted italic">{t.note}</p> : null}
            <div className="mt-auto pt-5">
              <Tags items={m.stack} label={`${m.name}: ${nexus.stackLabel}`} />
            </div>
          </li>
          );
        })}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        <span className="mr-2 rounded-full border border-dashed border-line px-2 py-0.5 font-mono text-[0.7rem]">
          {nexus.inProgress.label}
        </span>
        <span className="font-medium text-fg">{pausedModule.name}</span> {nexus.inProgress.text}
      </p>
    </Section>
  );
}
