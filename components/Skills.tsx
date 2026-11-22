import { education, skills } from "@/content/site";
import { Section } from "./ui";

export function Skills() {
  return (
    <Section id="skills" index="04" label="Skills & education" title="What I work with">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{s.group}</dt>
              <dd className="mt-2 leading-relaxed">{s.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Education</h3>
          <ul className="mt-2 space-y-6">
            {education.map((e) => (
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
