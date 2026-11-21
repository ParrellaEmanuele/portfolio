import { contact, site } from "@/content/site";
import { Download, GitHub, Mail } from "./icons";
import { ButtonLink, Section } from "./ui";

export function Contact() {
  return (
    <Section id="contact" index="05" label="Contact" title={contact.title}>
      <p className="max-w-2xl text-lg leading-relaxed text-muted">{contact.text}</p>
      <a
        href={`mailto:${site.email}`}
        className="mt-8 inline-block text-xl font-medium break-all text-accent underline decoration-accent/30 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl"
      >
        {site.email}
      </a>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${site.email}`} variant="primary">
          <Mail />
          Email me
        </ButtonLink>
        <ButtonLink href={site.github} external>
          <GitHub />
          github.com/{site.githubHandle}
        </ButtonLink>
        <ButtonLink href={site.cv} download>
          <Download />
          Download CV
        </ButtonLink>
      </div>
    </Section>
  );
}
