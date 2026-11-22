/**
 * Data shared by both languages: URLs, contacts, screenshots and stacks.
 * Translatable text lives in content/en.ts and content/it.ts.
 *
 * Rule of thumb: every claim must be verifiable in the CV or in the project
 * repositories. No invented numbers, clients or results.
 */

export const site = {
  url: "https://emanueleparrella.dev",
  name: "Emanuele Parrella",
  email: "emanueleparrella9@gmail.com",
  github: "https://github.com/ParrellaEmanuele",
  githubHandle: "ParrellaEmanuele",
  /** Source of this site (the only public repository for now). */
  repo: "https://github.com/ParrellaEmanuele/portfolio",
  /** Set to the profile URL to show a LinkedIn button in Contact; empty = hidden. */
  linkedin: "",
  /** File in /public, English only. Replace it to update the CV (see README). */
  cv: "/Emanuele-Parrella-CV.pdf",
};

export const nexusStack = ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "Traefik", "Proxmox", "Tailscale"];

export type ModuleId = "fin-engine" | "transcriber" | "quiz-engine";

/** Finished Nexus modules, in display order. */
export const modules: { id: ModuleId; name: string; stack: string[] }[] = [
  { id: "fin-engine", name: "Fin-Engine", stack: ["FastAPI", "PostgreSQL", "Next.js"] },
  { id: "transcriber", name: "Transcriber", stack: ["FastAPI", "FFmpeg", "Groq Whisper"] },
  { id: "quiz-engine", name: "Quiz-Engine", stack: ["FastAPI", "PostgreSQL", "PWA"] },
];

/** The paused module, shown as a single line. */
export const pausedModule = { name: "Ads Automator" };

export type ProjectId = "shifts" | "shelter";

export const projects: {
  id: ProjectId;
  stack: string[];
  /**
   * Optional screenshot, 1200×750 WebP made by `npm run images`.
   * No image = compact text-only card.
   */
  image?: string;
}[] = [
  // Never add an image to "shifts": the app contains real staff data.
  { id: "shifts", stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"] },
  {
    id: "shelter",
    stack: ["PHP", "MySQL", "JavaScript", "React"],
    // image: "/projects/animal-shelter.webp",
  },
];

export type ClientSiteId =
  | "edilmatt"
  | "rapid-fabbro"
  | "fabbro-spadino"
  | "express-torino"
  | "l3k-service"
  | "idraulico-torino";

export type ClientSite = {
  id: ClientSiteId;
  name: string;
  url: string;
  /** Optional screenshot, 1200×750 WebP made by `npm run images`. */
  image?: string;
};

export const clientSites: ClientSite[] = [
  {
    id: "edilmatt",
    name: "EdilMatt",
    url: "https://www.prontointerventoedilmatt.it/",
    // image: "/work/edilmatt.webp",
  },
  {
    id: "rapid-fabbro",
    name: "Rapid Fabbro",
    url: "https://www.fabbrotorino.cloud/",
    // image: "/work/rapid-fabbro.webp",
  },
  {
    id: "fabbro-spadino",
    name: "Fabbro Spadino",
    url: "https://www.fabbrotorinospadino.cloud/",
    // image: "/work/fabbro-spadino.webp",
  },
  {
    id: "express-torino",
    name: "Express Torino",
    url: "https://www.expresstorinoprontointervento.it/",
    // image: "/work/express-torino.webp",
  },
  {
    id: "l3k-service",
    name: "L3K Service",
    url: "https://www.l3kservice.it/",
    // image: "/work/l3k-service.webp",
  },
  {
    id: "idraulico-torino",
    name: "Pronto Intervento Idraulico Torino",
    url: "https://idraulicotorinomadonnadicampagna.it/",
    // image: "/work/idraulico-torino.webp",
  },
];
