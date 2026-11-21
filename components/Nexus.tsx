import { nexus, type ModuleStatus } from "@/content/site";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Section, Tags } from "./ui";

const statusLabel: Record<ModuleStatus, string> = {
  complete: "Complete",
  "in-development": "In development",
};

function StatusBadge({ status }: { status: ModuleStatus }) {
  const done = status === "complete";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.7rem] ${
        done ? "bg-accent-soft text-accent" : "border border-dashed border-line text-muted"
      }`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${done ? "bg-accent" : "bg-muted"}`} />
      {statusLabel[status]}
    </span>
  );
}

export function Nexus() {
  return (
    <Section id="nexus" index="01" label="Featured project" title={`${nexus.title}: ${nexus.subtitle.toLowerCase()}`}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <p className="font-mono text-xs text-muted">{nexus.period}</p>
          <p className="mt-3 text-lg leading-relaxed text-pretty">{nexus.intro}</p>
          <div className="mt-5">
            <Tags items={nexus.stack} label="Nexus technology stack" />
          </div>

          <h3 className="mt-12 text-lg font-semibold">Security, layer by layer</h3>
          <ol className="mt-5 space-y-6">
            {nexus.layers.map((layer, i) => (
              <li key={layer.title} className="grid grid-cols-[2rem_1fr] gap-x-2">
                <span aria-hidden className="pt-0.5 font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{layer.title}</p>
                  <p className="mt-1 leading-relaxed text-muted">{layer.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="mx-auto w-full max-w-[360px] lg:sticky lg:top-24 lg:self-start">
          <ArchitectureDiagram />
          <figcaption className="mt-4 text-sm leading-relaxed text-muted">{nexus.privacyNote}</figcaption>
        </figure>
      </div>

      <h3 className="mt-16 text-lg font-semibold">Modules</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {nexus.modules.map((m) => (
          <li key={m.name} className="flex flex-col rounded-xl border border-line p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold">{m.name}</h4>
              <StatusBadge status={m.status} />
            </div>
            <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
            {m.note ? <p className="mt-3 text-sm leading-relaxed text-muted italic">{m.note}</p> : null}
            <div className="mt-auto pt-5">
              <Tags items={m.stack} label={`${m.name} stack`} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
