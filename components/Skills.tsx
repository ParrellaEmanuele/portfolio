import type { Content } from "@/content/types";
import { Section } from "./ui";

export function Skills({ c }: { c: Content }) {
  const t = c.skills;
  return (
    <Section id="skills" index="04" label={t.label} title={t.title}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {t.groups.map((s) => (
            <div key={s.group}>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{s.group}</dt>
              <dd className="mt-2 leading-relaxed">{s.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t.educationTitle}</h3>
          <ul className="mt-2 space-y-6">
            {t.education.map((e) => (
              <li key={e.school}>
                <p className="font-medium">
                  {e.school} <span className="font-mono text-xs font-normal text-muted">· {e.when}</span>
                </p>
                <p className="mt-0.5 text-sm text-muted">{e.degree}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
