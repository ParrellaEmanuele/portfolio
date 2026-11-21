import { education, skills } from "@/content/site";
import { Section } from "./ui";

export function Skills() {
  return (
    <Section id="skills" index="04" label="Skills & education" title="What I work with">
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((s) => (
          <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="font-mono text-xs uppercase leading-6 tracking-[0.12em] text-muted">{s.group}</dt>
            <dd className="leading-6">{s.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-16 text-lg font-semibold">Education</h3>
      <ul className="mt-5 space-y-8">
        {education.map((e) => (
          <li key={e.school} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <p className="font-mono text-xs leading-6 text-muted">{e.when}</p>
            <div>
              <p className="font-medium">{e.school}</p>
              <p className="mt-0.5 text-muted">{e.degree}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
