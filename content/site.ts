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
  title: "Emanuele Parrella · Self-hosted infrastructure and web apps",
  description:
    "I build self-hosted infrastructure and web apps: a Zero-Trust homelab, a shift planner in production at a care home and websites for local businesses in Torino.",
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
  kicker: "Torino, Italy",
  tagline:
    "I build self-hosted infrastructure and web apps: from a Zero-Trust homelab to a shift planner in production at a care home.",
  context: [
    "Management Engineering student at Politecnico di Torino",
    "B.Sc. expected 2027",
    "M.Sc. in Software Engineering planned",
  ],
  glanceTitle: "At a glance",
  // Every figure comes from the CV.
  glance: [
    { value: "6", label: "client websites built and live" },
    { value: "600+", label: "automated tests in Project Nexus" },
    { value: "0", label: "ports open to the internet at home" },
    { value: "1", label: "app in production at a care home" },
  ],
};

export const nexus = {
  label: "Featured project",
  title: "Project Nexus",
  subtitle: "My self-hosted, Zero-Trust homelab",
  period: "Oct 2026 – Present",
  intro:
    "A home server I built to learn DevSecOps hands-on. Every service runs in its own Docker container behind one reverse proxy, and nothing is reachable from the internet: I get in through a VPN.",
  privacyNote:
    "Nexus is private by design, so there is no public demo. The diagram shows how it is put together.",
  stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "Traefik", "Proxmox", "Tailscale"],
  /** The three strongest points, always visible. */
  keyPoints: [
    {
      title: "No open ports",
      text: "The router forwards nothing. Every request arrives through the Tailscale VPN; outside it, the services do not exist.",
    },
    {
      title: "Real HTTPS on private subdomains",
      text: "Each service has a subdomain of my own domain with a valid Let's Encrypt certificate, issued without opening a single inbound port.",
    },
    {
      title: "Hardened and tested",
      text: "Every container runs as non-root on a read-only filesystem with no Linux capabilities, and 600+ pytest tests run before each deploy.",
    },
  ],
  detailsSummary: "How it is secured, in detail",
  /** Full list, inside a collapsible <details>. */
  layers: [
    {
      title: "No open ports",
      text: "The router forwards nothing and the server, SSH included, is reached only through Tailscale. Public DNS points to a private Tailscale IP, which leads nowhere outside the VPN.",
    },
    {
      title: "One way in",
      text: "Traefik is the only container that publishes ports. A shared IP allowlist answers 403 to anything outside the private network before a request reaches an app.",
    },
    {
      title: "Certificates without inbound traffic",
      text: "Let's Encrypt certificates are issued with the DNS-01 challenge through the Porkbun API, so HTTPS works on services nobody outside can reach.",
    },
    {
      title: "Isolated databases",
      text: "Each service has its own database on a private network of its stack: the proxy cannot see it.",
    },
    {
      title: "Hardened containers",
      text: "Non-root user, read-only filesystem, all Linux capabilities dropped and no-new-privileges; writes only to dedicated volumes and a size-limited tmpfs.",
    },
    {
      title: "Outbound-only bot",
      text: "The Telegram bot uses long polling: it calls Telegram, so no port is open for it, and it answers only authorised user IDs.",
    },
    {
      title: "Secrets out of Git, tests before deploy",
      text: "Only .env.example files are committed and each container gets only the variables it needs. 600+ pytest tests, including checks on the Docker files, run before every deploy.",
    },
  ],
  decisionsTitle: "Engineering decisions",
  decisions: [
    {
      choice: "DNS-01 certificates instead of opening ports 80 and 443",
      why: "Let's Encrypt checks a DNS record set through the Porkbun API, so private services get valid HTTPS without ever being reachable from outside.",
    },
    {
      choice: "The shared IP allowlist lives in Traefik's file provider, not in container labels",
      why: "A middleware defined in labels exists only while Traefik re-reads that container; when it does not, every router using it fails with a 404. A watched file loads on its own and applies changes instantly.",
    },
    {
      choice: "Exact versions (==) for every Python dependency",
      why: "Production runs exactly what passed the tests: no surprise upgrade, and no package published yesterday slipping into a build.",
    },
    {
      choice: "Two REST calls with httpx instead of the official google-ads library",
      why: "The library brings gRPC and Protobuf, tens of megabytes of native code, for what are two read-only endpoints.",
    },
  ],
  modulesTitle: "Modules",
  statusComplete: "Complete",
  modules: [
    {
      name: "Fin-Engine",
      use: "Tells me how much each hour spent on a project actually earns, net of costs.",
      text: "Projects, a ledger with recurring entries and time tracking, with KPIs such as net profit, burn rate and hourly ROI computed in SQL.",
      note: "Real data from mid-December 2026; a news section fed by the News Aggregator is planned.",
      stack: ["FastAPI", "PostgreSQL", "Next.js"],
    },
    {
      name: "Transcriber",
      use: "I send a voice note on Telegram and get the text back.",
      text: "Also has a web UI and an API. Long recordings are split with FFmpeg; on errors it retries, then fails over to a backup provider and resumes from the failed chunk.",
      stack: ["FastAPI", "FFmpeg", "Groq Whisper"],
    },
    {
      name: "Quiz-Engine",
      use: "I study for my courses with AI-generated quizzes and spaced repetition.",
      text: "An installable web app with multiple-choice questions, worked exercises, Leitner boxes and statistics. Works with any course without code changes.",
      stack: ["FastAPI", "PostgreSQL", "PWA"],
    },
  ],
  /** Paused module: one line, so it does not weigh like the finished ones. */
  inProgress: {
    label: "In progress",
    name: "Ads Automator",
    text: "reads each freelance client's Google Ads metrics through OAuth2. Paused while waiting for Basic access to the Google Ads API.",
  },
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
