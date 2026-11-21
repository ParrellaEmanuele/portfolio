import NextImage from "next/image";
import { projects } from "@/content/site";
import { Placeholder, Section, Tags } from "./ui";

export function Projects() {
  return (
    <Section id="projects" index="02" label="Other projects" title="Built for real users">
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.name} className="flex flex-col rounded-xl border border-line p-5 sm:p-6">
            {p.image ? (
              <NextImage
                src={p.image}
                alt={p.imageAlt ?? p.name}
                width={1600}
                height={1000}
                className="aspect-[16/10] rounded-lg border border-line object-cover object-top"
              />
            ) : p.note ? (
              <Placeholder caption="Private tool · no screenshots" locked />
            ) : (
              <Placeholder caption="Screenshot coming soon" />
            )}
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
              <span className="font-mono text-xs text-muted">{p.period}</span>
            </div>
            <p className="mt-1 text-sm text-accent">{p.context}</p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Problem</dt>
                <dd className="mt-1 leading-relaxed">{p.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">What I built</dt>
                <dd className="mt-1 leading-relaxed">{p.built}</dd>
              </div>
            </dl>
            {p.note ? <p className="mt-4 text-sm leading-relaxed text-muted italic">{p.note}</p> : null}
            <div className="mt-auto pt-6">
              <Tags items={p.stack} label={`${p.name} stack`} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
