import type { Content } from "./types";

/** English copy (served at /). Every claim must be verifiable in the CV or the repositories. */
export const en: Content = {
  locale: "en",
  path: "/",
  ogLocale: "en_GB",
  meta: {
    title: "Emanuele Parrella · Self-hosted infrastructure and web apps",
    description:
      "I build self-hosted infrastructure and web apps: a Zero-Trust homelab, a shift planner in production at a care home and websites for local businesses in Torino.",
  },

  nav: {
    label: "Sections",
    skip: "Skip to content",
    links: [
      { href: "#nexus", label: "Nexus" },
      { href: "#projects", label: "Projects" },
      { href: "#work", label: "Work" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    switchTo: { label: "Italiano", ariaLabel: "Leggi il sito in italiano" },
  },

  hero: {
    kicker: "Torino, Italy",
    tagline:
      "I build self-hosted infrastructure and web apps: from a Zero-Trust homelab to a shift planner in production at a care home.",
    context: [
      "Management Engineering student at Politecnico di Torino",
      "B.Sc. expected 2027",
      "M.Sc. in Software Engineering planned",
    ],
    viewProjects: "View projects",
    downloadCv: "Download CV",
    glanceTitle: "At a glance",
    // Every figure comes from the CV.
    glance: [
      { value: "6", label: "client websites built and live" },
      { value: "600+", label: "automated tests in Project Nexus" },
      { value: "0", label: "ports open to the internet at home" },
      { value: "1", label: "app in production at a care home" },
    ],
  },

  nexus: {
    label: "Featured project",
    title: "Project Nexus",
    subtitle: "My self-hosted, Zero-Trust homelab",
    period: "Oct 2026 – Present",
    intro:
      "A home server I built to learn DevSecOps hands-on. Every service runs in its own Docker container behind one reverse proxy, and nothing is reachable from the internet: I get in through a VPN.",
    privacyNote:
      "Nexus is private by design, so there is no public demo. The diagram shows how it is put together.",
    stackLabel: "Nexus technology stack",
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
    modules: {
      "fin-engine": {
        use: "Tells me how much each hour spent on a project actually earns, net of costs.",
        text: "Projects, a ledger with recurring entries and time tracking, with KPIs such as net profit, burn rate and hourly ROI computed in SQL.",
        note: "Real data from mid-December 2026; a news section fed by the News Aggregator is planned.",
      },
      transcriber: {
        use: "I send a voice note on Telegram and get the text back.",
        text: "Also has a web UI and an API. Long recordings are split with FFmpeg; on errors it retries, then fails over to a backup provider and resumes from the failed chunk.",
      },
      "quiz-engine": {
        use: "I study for my courses with AI-generated quizzes and spaced repetition.",
        text: "An installable web app with multiple-choice questions, worked exercises, Leitner boxes and statistics. Works with any course without code changes.",
      },
    },
    inProgress: {
      label: "In progress",
      text: "reads each freelance client's Google Ads metrics through OAuth2. Paused while waiting for Basic access to the Google Ads API.",
    },
  },

  diagram: {
    title: "Project Nexus architecture",
    desc: "My devices reach the home server only through the Tailscale VPN; the public internet has no inbound ports. On a Proxmox host, a Debian 13 VM runs Docker. Traefik is the single entry point, terminating HTTPS and applying an IP allowlist. Behind it, on the internal nexus-net network, run Fin-Engine, Transcriber, Quiz-Engine and Ads Automator (in development), each with its own isolated storage. Every container runs as non-root with a read-only filesystem and no Linux capabilities. Outbound only: Porkbun DNS points subdomains to private Tailscale IPs, and Let's Encrypt issues certificates through the DNS-01 challenge.",
    devices: "Your devices",
    devicesSub: "laptop · phone",
    internet: "Public internet",
    internetSub: "no inbound ports",
    tunnelSub: "WireGuard tunnel",
    host: "PROXMOX VE · DEBIAN 13 VM · DOCKER",
    traefik: "Traefik · the only open door",
    traefikSub: "HTTPS (Let's Encrypt) · IP allowlist → 403",
    network: "nexus-net · internal network",
    ownPostgres: "own PostgreSQL",
    telegramBot: "Telegram bot ↗",
    inDevelopment: "in development",
    encryptedSqlite: "encrypted SQLite",
    hardening: ["Every container: non-root user,", "read-only filesystem, no capabilities"],
    outbound: "outbound only",
    dnsSub: "subdomains → private IPs",
    certsSub: "certificates via DNS-01",
  },

  projects: {
    label: "Other projects",
    title: "A production app and a university project",
    problemLabel: "Problem",
    builtLabel: "What I built",
    stackLabel: "stack",
    items: {
      shifts: {
        name: "Shift-scheduling web app",
        context: "In production at a care home",
        period: "Oct – Nov 2026",
        problem:
          "A care home needs a monthly staff rota that respects rest after night shifts, rotates public holidays fairly and keeps everyone's hour totals right.",
        built:
          "A password-protected monthly planner: shifts and absences in a few clicks, an automatic rest day after every night shift, holiday rotation history, automatic hour totals with manual overrides, Excel-ready CSV export and database backups.",
        note: "It holds real staff data, so it stays private: no screenshots or demo.",
        imageAlt: "Shift-scheduling web app",
      },
      shelter: {
        name: "Animal shelter platform",
        context: "University project, Politecnico di Torino",
        period: "2026",
        problem:
          "A cat shelter needs one place to manage adoptions and volunteering: staff add the animals, visitors book get-to-know visits and sign up for volunteer shifts.",
        built:
          "A PHP JSON API, JavaScript validation on every form and a React gallery with search and sorting. Security: password hashing, CSRF tokens, prepared statements, session-fixation protection and locks against double bookings.",
        imageAlt: "Animal shelter platform, cat gallery page",
      },
    },
  },

  work: {
    label: "Selected work",
    title: "Websites built to bring in calls",
    intro: [
      "Six small businesses in Torino, most of them emergency repair services.",
      "Each one got the same complete setup from me.",
    ],
    // What every business got, in plain words (from the CV).
    gets: [
      {
        title: "A website people find nearby",
        text: "Built and put online with hosting and domain, and set up for Local SEO so it shows up in local searches.",
      },
      {
        title: "Every call counted",
        text: "Google Tag Manager records each call and WhatsApp click from the site, so the owner sees what it brings in.",
      },
      {
        title: "Its own Google Ads campaign",
        text: "A campaign for that business alone, measured on those tracked calls and messages.",
      },
    ],
    sectors: {
      edilmatt: "Emergency home repairs: plumbing, locks, electrical, glazing",
      "rapid-fabbro": "24-hour locksmith",
      "fabbro-spadino": "Locksmith",
      "express-torino": "Emergency repairs for shops and businesses",
      "l3k-service": "Emergency home repairs",
      "idraulico-torino": "Plumbing",
    },
    imageAlt: "Home page of the {name} website",
    newTab: "(opens in a new tab)",
  },

  skills: {
    label: "Skills & education",
    title: "What I work with",
    groups: [
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
    ],
    educationTitle: "Education",
    education: [
      {
        school: "Politecnico di Torino",
        degree: "B.Sc. in Management Engineering (L-8); planned M.Sc. in Software Engineering",
        when: "Expected 2027",
        detail:
          "Relevant coursework: Computer Science in Python (30 cum laude), Object-Oriented Programming in Java (29/30), Operations Research (28/30), Databases, Web Applications, Computer Networks (SDN, P4).",
      },
      {
        school: "ITIS Galileo Galilei, Imperia",
        degree: "Technical High School Diploma in Computer Science",
        when: "2023",
        detail: "Networking, Java and C++ programming.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Get in touch",
    text: "Email is the best way to reach me, and the CV has the full picture.",
    // Keep this true: today the only public repository is this site.
    githubNote: "This site's source is on GitHub. Nexus is private for now; more repositories are coming.",
    emailMe: "Email me",
    repoButton: "This site on GitHub",
    cvButton: "Download CV",
    linkedinButton: "LinkedIn",
  },

  footer: {
    location: "Torino, Italy",
    privacy: "Privacy: no cookies, analytics or third-party scripts.",
  },
};
