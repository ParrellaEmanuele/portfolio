import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { Download, GitHub, Mail } from "./icons";
import { ButtonLink, Container } from "./ui";

export function Contact({ c }: { c: Content }) {
  const contact = c.contact;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line py-20 sm:py-24">
      <Container>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">05</span> / {contact.label}
          </p>
          <h2 id="contact-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{contact.text}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-xl font-medium break-all text-accent underline decoration-accent/30 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} variant="primary">
              <Mail />
              {contact.emailMe}
            </ButtonLink>
            <ButtonLink href={site.cv} download>
              <Download />
              {contact.cvButton}
            </ButtonLink>
            <ButtonLink href={site.repo} external>
              <GitHub />
              {contact.repoButton}
            </ButtonLink>
            {site.linkedin ? (
              <ButtonLink href={site.linkedin} external>
                {contact.linkedinButton}
              </ButtonLink>
            ) : null}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">{contact.githubNote}</p>
        </div>
      </Container>
    </section>
  );
}
