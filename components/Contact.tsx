import { site } from "@/content/shared";
import type { Content } from "@/content/types";
import { Copy, Download, GitHub, Mail } from "./icons";
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
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="text-xl font-medium break-all text-accent underline decoration-accent/30 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl"
            >
              {site.email}
            </a>
            {/* Hidden without JavaScript; /js/site.js reveals it when the Clipboard API exists. */}
            <button
              type="button"
              hidden
              data-copy={site.email}
              data-done={contact.copied}
              aria-describedby="copy-status"
              className="copy-button inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-bg px-3 font-mono text-[0.75rem] text-muted transition-colors hover:text-fg"
            >
              <Copy className="size-3.5" />
              <span data-label>{contact.copyEmail}</span>
            </button>
            <span id="copy-status" role="status" className="sr-only" />
          </div>
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
