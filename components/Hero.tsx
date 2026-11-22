import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { ArrowDown, Download, GitHub } from "./icons";
import { ButtonLink, Container } from "./ui";

export function Hero({ c }: { c: Content }) {
  const { hero } = c;
  return (
    <section aria-labelledby="hero-heading" className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{hero.kicker}</p>
          <h1 id="hero-heading" className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">
            {hero.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">{hero.context.join(" · ")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#nexus" variant="primary">
              {hero.viewProjects}
              <ArrowDown />
            </ButtonLink>
            <ButtonLink href={site.cv} download>
              <Download />
              {hero.downloadCv}
            </ButtonLink>
            <ButtonLink href={site.github} variant="ghost" external>
              <GitHub />
              GitHub
            </ButtonLink>
          </div>
        </div>

        <aside aria-labelledby="glance-heading" className="rounded-2xl border border-line bg-surface p-6">
          <h2 id="glance-heading" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {hero.glanceTitle}
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
            {hero.glance.map((g) => (
              <div key={g.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm leading-snug text-muted">{g.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-accent">{g.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </section>
  );
}
