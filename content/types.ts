/**
 * Shape of every translatable string on the site.
 * content/en.ts and content/it.ts are both typed as `Content`, so a missing
 * or misspelt key in either language fails `npm run build` (TypeScript).
 * Data that does not change with the language (URLs, images, stacks) lives
 * in content/shared.ts.
 */
import type { ClientSiteId, ModuleId, ProjectId } from "./shared";

export type Locale = "en" | "it";

/** Parts of the Nexus diagram that can be hovered or focused. */
export type DiagramNode = "tunnel" | "traefik" | "fin-engine" | "transcriber" | "quiz-engine" | "ads-automator";

type Item = { title: string; text: string };
/** Fixed-length lists keep both languages in step. */
type Three<T> = [T, T, T];
type Four<T> = [T, T, T, T];

export type Content = {
  locale: Locale;
  /** Path of this language's home page. */
  path: "/" | "/it";
  ogLocale: string;
  meta: { title: string; description: string };

  nav: {
    label: string;
    skip: string;
    links: { href: `#${string}`; label: string }[];
    /** Accessible name of the EN | IT language switch. */
    languageLabel: string;
    /** Theme toggle (shown only when JavaScript runs). */
    themeToLight: string;
    themeToDark: string;
  };

  hero: {
    kicker: string;
    tagline: string;
    context: string[];
    viewProjects: string;
    downloadCv: string;
    glanceTitle: string;
    glance: Four<{ value: string; label: string }>;
  };

  nexus: {
    label: string;
    title: string;
    subtitle: string;
    period: string;
    intro: string;
    privacyNote: string;
    stackLabel: string;
    keyPoints: Three<Item>;
    detailsSummary: string;
    layers: Item[];
    decisionsTitle: string;
    decisions: Four<{ choice: string; why: string }>;
    modulesTitle: string;
    statusComplete: string;
    modules: Record<ModuleId, { use: string; text: string; note?: string }>;
    inProgress: { label: string; text: string };
  };

  /** Labels inside the architecture SVG. */
  diagram: {
    title: string;
    desc: string;
    devices: string;
    devicesSub: string;
    internet: string;
    internetSub: string;
    tunnelSub: string;
    host: string;
    traefik: string;
    traefikSub: string;
    network: string;
    ownPostgres: string;
    telegramBot: string;
    inDevelopment: string;
    encryptedSqlite: string;
    hardening: [string, string];
    outbound: string;
    dnsSub: string;
    certsSub: string;
    /** Shown under the diagram until a part is hovered or focused. */
    hint: string;
    /** What each interactive part of the diagram does. */
    nodes: Record<DiagramNode, string>;
  };

  projects: {
    label: string;
    title: string;
    problemLabel: string;
    builtLabel: string;
    stackLabel: string;
    items: Record<
      ProjectId,
      { name: string; context: string; period: string; problem: string; built: string; note?: string; imageAlt: string }
    >;
  };

  work: {
    label: string;
    title: string;
    intro: string[];
    gets: Three<Item>;
    sectors: Record<ClientSiteId, string>;
    /** "{name}" is replaced with the business name. */
    imageAlt: string;
    newTab: string;
  };

  skills: {
    label: string;
    title: string;
    groups: { group: string; items: string[] }[];
    educationTitle: string;
    education: { school: string; degree: string; when: string; detail: string }[];
  };

  contact: {
    label: string;
    title: string;
    text: string;
    githubNote: string;
    emailMe: string;
    repoButton: string;
    cvButton: string;
    linkedinButton: string;
    /** "Copy address" button (shown only when JavaScript runs) and its confirmation. */
    copyEmail: string;
    copied: string;
  };

  footer: { location: string; privacy: string };
};
