/**
 * All copy and project data for the site lives here.
 * Edit this file to update content; components only render what it exports.
 *
 * Rule of thumb: every claim must be verifiable in the CV or in the project
 * repositories. No invented numbers, clients or results.
 */

export const site = {
  url: "https://emanueleparrella.dev",
  name: "Emanuele Parrella",
  title: "Emanuele Parrella · Self-hosted systems and web products",
  description:
    "Management Engineering student at Politecnico di Torino who builds self-hosted systems and web products: a Zero-Trust homelab, a shift planner in production and websites for local businesses.",
  location: "Torino, Italy",
  email: "emanueleparrella9@gmail.com",
  github: "https://github.com/ParrellaEmanuele",
  githubHandle: "ParrellaEmanuele",
  /** File in /public. Replace it to update the CV (see README). */
  cv: "/Emanuele-Parrella-CV.pdf",
};

export const nav = [
  { href: "#nexus", label: "Nexus" },
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  kicker: "Management Engineering · Politecnico di Torino",
  tagline:
    "I study Management Engineering at Politecnico di Torino and build self-hosted systems and web products.",
  detail:
    "B.Sc. expected in 2027, with an M.Sc. in Software Engineering planned next. Based in Torino.",
};

export type ModuleStatus = "complete" | "in-development";

export const nexus = {
  title: "Project Nexus",
  subtitle: "A self-hosted, Zero-Trust homelab",
  period: "Oct 2026 – Present",
  intro:
    "A Proxmox / Debian 13 home server where every service is a Docker container behind a Traefik reverse proxy. Nothing is exposed to the internet: all access goes through the Tailscale VPN.",
  privacyNote:
    "Nexus is private by design, so there is no public demo. The diagram shows how it is put together.",
  stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "Traefik", "Proxmox", "Tailscale"],
  layers: [
    {
      title: "No open ports",
      text: "The router forwards nothing. Every request arrives through the Tailscale VPN; outside it, the services do not exist.",
    },
    {
      title: "Real HTTPS on private subdomains",
      text: "Each service has a subdomain of my own domain. Porkbun DNS points to private Tailscale IPs and Let's Encrypt certificates are issued with the DNS-01 challenge, so no inbound port is ever needed.",
    },
    {
      title: "One way in",
      text: "Traefik is the only container that publishes ports. A shared IP allowlist answers 403 to anything outside the private network before a request reaches an app.",
    },
    {
      title: "Hardened containers",
      text: "Non-root user, read-only filesystem, all Linux capabilities dropped and no-new-privileges. Each database sits on a private network the proxy cannot see.",
    },
    {
      title: "Tested before every deploy",
      text: "600+ pytest tests across the services, including checks on the Docker files, run before each deploy. Secrets never enter Git.",
    },
  ],
  modules: [
    {
      name: "Fin-Engine",
      status: "complete" as ModuleStatus,
      text: "Finance and time-ROI tracker: projects, a ledger with recurring entries and time tracking, with KPIs such as net profit, burn rate and hourly ROI computed in SQL.",
      note: "Real data from mid-December 2026; a news section fed by the News Aggregator is planned.",
      stack: ["FastAPI", "PostgreSQL", "Next.js"],
    },
    {
      name: "Transcriber",
      status: "complete" as ModuleStatus,
      text: "Audio-to-text service used from a web UI and a Telegram bot. Long recordings are split with FFmpeg; on errors it retries, then fails over to a backup provider and resumes from the failed chunk.",
      stack: ["FastAPI", "FFmpeg", "Groq Whisper"],
    },
    {
      name: "Quiz-Engine",
      status: "complete" as ModuleStatus,
      text: "Study PWA with AI-generated quizzes and worked exercises, spaced repetition with Leitner boxes and statistics. Works with any course without code changes.",
      stack: ["FastAPI", "PostgreSQL", "PWA"],
    },
    {
      name: "Ads Automator",
      status: "in-development" as ModuleStatus,
      text: "Reads each freelance client's Google Ads metrics through OAuth2, one independent account per client, with refresh tokens encrypted at rest.",
      note: "Paused while waiting for Basic access to the Google Ads API.",
      stack: ["FastAPI", "OAuth2", "SQLite"],
    },
  ],
};

export type Project = {
  name: string;
  context: string;
  period: string;
  problem: string;
  built: string;
  stack: string[];
  note?: string;
  /**
   * Optional screenshot, 1200×750 WebP made by `npm run images`.
   * No image = compact text-only card.
   */
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    name: "Shift-scheduling web app",
    context: "In production at a care home",
    period: "Oct – Nov 2026",
    problem:
      "A care home needs a monthly staff rota that respects rest after night shifts, rotates public holidays fairly and keeps everyone's hour totals right.",
    built:
      "A password-protected monthly planner: shifts and absences in a few clicks, an automatic rest day after every night shift, holiday rotation history, automatic hour totals with manual overrides, Excel-ready CSV export and database backups.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
    note: "It holds real staff data, so it stays private: no screenshots or demo.",
    // Never add an image here: the app contains real staff data.
  },
  {
    name: "Animal shelter platform",
    context: "University project, Politecnico di Torino",
    period: "2026",
    problem:
      "A cat shelter needs one place to manage adoptions and volunteering: staff add the animals, visitors book get-to-know visits and sign up for volunteer shifts.",
    built:
      "A PHP JSON API, JavaScript validation on every form and a React gallery with search and sorting. Security: password hashing, CSRF tokens, prepared statements, session-fixation protection and locks against double bookings.",
    stack: ["PHP", "MySQL", "JavaScript", "React"],
    // image: "/projects/animal-shelter.webp",
    imageAlt: "Animal shelter platform, cat gallery page",
  },
];

export type ClientSite = {
  name: string;
  sector: string;
  url: string;
  /** Optional screenshot, 1200×750 WebP made by `npm run images`. */
  image?: string;
};

export const clientWork = {
  intro:
    "Since March 2025 I have built six websites for small businesses in Torino, together with hosting and DNS setup. On every site I set up Local SEO and Google Tag Manager tracking of calls and WhatsApp clicks, and ran a dedicated Google Ads campaign measured on those tracked leads.",
  services: ["Development", "Local SEO", "Google Tag Manager", "Google Ads campaign"],
  sites: [
    {
      name: "EdilMatt",
      sector: "Emergency home repairs: plumbing, locks, electrical, glazing",
      url: "https://www.prontointerventoedilmatt.it/",
      // image: "/work/edilmatt.webp",
    },
    {
      name: "Rapid Fabbro",
      sector: "24-hour locksmith",
      url: "https://www.fabbrotorino.cloud/",
      // image: "/work/rapid-fabbro.webp",
    },
    {
      name: "Fabbro Spadino",
      sector: "Locksmith",
      url: "https://www.fabbrotorinospadino.cloud/",
      // image: "/work/fabbro-spadino.webp",
    },
    {
      name: "Express Torino",
      sector: "Emergency repairs for shops and businesses",
      url: "https://www.expresstorinoprontointervento.it/",
      // image: "/work/express-torino.webp",
    },
    {
      name: "L3K Service",
      sector: "Emergency home repairs",
      url: "https://www.l3kservice.it/",
      // image: "/work/l3k-service.webp",
    },
    {
      name: "Pronto Intervento Idraulico Torino",
      sector: "Plumbing",
      url: "https://idraulicotorinomadonnadicampagna.it/",
      // image: "/work/idraulico-torino.webp",
    },
  ] as ClientSite[],
};

export const skills = [
  { group: "Programming", items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "SQL", "HTML/CSS"] },
  {
    group: "Frameworks & Data",
    items: ["FastAPI", "Next.js", "React", "Prisma", "SQLAlchemy", "PostgreSQL", "MySQL", "pytest"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Traefik", "Proxmox", "Linux (Debian)", "Tailscale", "Git", "Vercel"],
  },
  { group: "Web & Marketing", items: ["Google Ads", "Google Tag Manager", "Local SEO", "WordPress"] },
  { group: "Languages", items: ["Italian (native)", "English (B2, IELTS in progress)"] },
];

export const education = [
  {
    school: "Politecnico di Torino",
    degree: "B.Sc. in Management Engineering (L-8); planned M.Sc. in Software Engineering",
    when: "Expected 2027",
    detail:
      "Relevant coursework: Computer Science in Python (30 cum laude), Object-Oriented Programming in Java (29/30), Operations Research (28/30), Databases, Web Applications, Computer Networks.",
  },
  {
    school: "ITIS Galileo Galilei, Imperia",
    degree: "Technical High School Diploma in Computer Science",
    when: "2023",
    detail: "Networking, Java and C++ programming.",
  },
];

export const contact = {
  title: "Get in touch",
  text: "Email is the best way to reach me. My code is on GitHub and the CV has the full picture.",
};
