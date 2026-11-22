import type { ReactNode } from "react";

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

/** Screenshot size: every image is exported at this size by `npm run images`. */
export const SHOT = { width: 1200, height: 750 } as const;

/**
 * A real screenshot in a discreet browser-window frame.
 * Fixed 16:10 box with explicit width/height (no layout shift), lazy-loaded.
 * Plain <img> on purpose: next/image adds an inline style attribute, which the
 * CSP (style-src 'self') would block.
 */
export function Screenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- see the comment above */}
      <img
        src={src}
        alt={alt}
        width={SHOT.width}
        height={SHOT.height}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] h-auto w-full object-cover object-top"
      />
    </div>
  );
}
