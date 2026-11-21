import type { ReactNode } from "react";
import { Image as ImageIcon, Lock } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
};

/** A page section with a numbered mono label and an h2. */
export function Section({ id, index, label, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 sm:py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">{index}</span> / {label}
        </p>
        <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

export function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.75rem] leading-5 text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "secondary", download, external }: ButtonLinkProps) {
  const styles = {
    primary: "bg-accent text-bg hover:opacity-90",
    secondary: "border border-line bg-bg text-fg hover:border-fg/40",
    ghost: "text-fg hover:bg-surface",
  }[variant];
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
    </a>
  );
}

/**
 * Elegant stand-in for a screenshot that has not been provided yet.
 * Looks like an empty browser frame, so it never passes for a real capture.
 */
export function Placeholder({
  caption,
  locked = false,
  aspect = "aspect-[16/10]",
}: {
  caption: string;
  locked?: boolean;
  aspect?: string;
}) {
  const Icon = locked ? Lock : ImageIcon;
  return (
    <div
      className={`${aspect} flex flex-col overflow-hidden rounded-lg border border-line bg-surface`}
      role="img"
      aria-label={caption}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center" aria-hidden>
        <Icon className="size-5 text-muted" />
        <span className="font-mono text-[0.75rem] text-muted">{caption}</span>
      </div>
    </div>
  );
}
