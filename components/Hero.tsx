import { hero, site } from "@/content/site";
import { ArrowDown, Download, GitHub } from "./icons";
import { ButtonLink, Container } from "./ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-20 sm:py-28">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{hero.kicker}</p>
        <h1 id="hero-heading" className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">
          {hero.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-muted">{hero.detail}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#nexus" variant="primary">
            View projects
            <ArrowDown />
          </ButtonLink>
          <ButtonLink href={site.cv} download>
            <Download />
            Download CV
          </ButtonLink>
          <ButtonLink href={site.github} variant="ghost" external>
            <GitHub />
            GitHub
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
