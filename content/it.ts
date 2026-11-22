import type { Content } from "./types";

/** Testi in italiano (serviti su /it). Ogni affermazione deve essere verificabile nel CV o nei repository. */
export const it: Content = {
  locale: "it",
  path: "/it",
  ogLocale: "it_IT",
  meta: {
    title: "Emanuele Parrella · Infrastrutture self-hosted e web app",
    description:
      "Progetto e realizzo infrastrutture self-hosted e web app: un homelab Zero-Trust, un'app per i turni in produzione in una RSA e siti web per attività locali a Torino.",
  },

  nav: {
    label: "Sezioni",
    skip: "Vai al contenuto",
    links: [
      { href: "#nexus", label: "Nexus" },
      { href: "#projects", label: "Progetti" },
      { href: "#work", label: "Siti" },
      { href: "#skills", label: "Competenze" },
      { href: "#contact", label: "Contatti" },
    ],
    switchTo: { label: "English", ariaLabel: "Read the site in English" },
  },

  hero: {
    kicker: "Torino",
    tagline:
      "Realizzo infrastrutture self-hosted e web app: da un homelab Zero-Trust a un'app per i turni in produzione in una RSA.",
    context: [
      "Studente di Ingegneria Gestionale al Politecnico di Torino",
      "laurea triennale prevista nel 2027",
      "poi la magistrale in Software Engineering",
    ],
    viewProjects: "Guarda i progetti",
    downloadCv: "Scarica il CV (in inglese)",
    glanceTitle: "In sintesi",
    glance: [
      { value: "6", label: "siti per clienti, realizzati e online" },
      { value: "600+", label: "test automatici in Project Nexus" },
      { value: "0", label: "porte di casa aperte su internet" },
      { value: "1", label: "app in produzione in una RSA" },
    ],
  },

  nexus: {
    label: "Progetto di punta",
    title: "Project Nexus",
    subtitle: "Il mio homelab self-hosted e Zero-Trust",
    period: "ott 2026 – oggi",
    intro:
      "Un server di casa che ho costruito per imparare il DevSecOps sul campo. Ogni servizio gira nel suo container Docker dietro un unico reverse proxy e niente è raggiungibile da internet: entro solo tramite VPN.",
    privacyNote:
      "Nexus è privato per scelta, quindi non c'è una demo pubblica. Lo schema mostra com'è costruito.",
    stackLabel: "Tecnologie di Nexus",
    keyPoints: [
      {
        title: "Nessuna porta aperta",
        text: "Il router non inoltra nulla. Ogni richiesta passa dalla VPN Tailscale: fuori dalla VPN, i servizi semplicemente non esistono.",
      },
      {
        title: "HTTPS vero su sottodomini privati",
        text: "Ogni servizio ha un sottodominio del mio dominio con un certificato Let's Encrypt valido, ottenuto senza aprire nessuna porta in ingresso.",
      },
      {
        title: "Blindato e testato",
        text: "Ogni container gira con utente non-root, filesystem in sola lettura e nessuna capability Linux; prima di ogni deploy girano oltre 600 test pytest.",
      },
    ],
    detailsSummary: "Com'è protetto, nel dettaglio",
    layers: [
      {
        title: "Nessuna porta aperta",
        text: "Il router non inoltra nulla e il server, SSH compreso, si raggiunge solo da Tailscale. Il DNS pubblico punta a un IP privato di Tailscale, che fuori dalla VPN non porta da nessuna parte.",
      },
      {
        title: "Un solo ingresso",
        text: "Traefik è l'unico container che espone porte. Un filtro IP condiviso risponde 403 a chiunque arrivi da fuori dalla rete privata, prima che la richiesta tocchi un'app.",
      },
      {
        title: "Certificati senza traffico in ingresso",
        text: "I certificati Let's Encrypt arrivano con la verifica DNS-01 tramite l'API di Porkbun: l'HTTPS funziona su servizi che da fuori nessuno può raggiungere.",
      },
      {
        title: "Database isolati",
        text: "Ogni servizio ha il suo database su una rete privata del proprio stack: il reverse proxy non lo vede.",
      },
      {
        title: "Container blindati",
        text: "Utente non-root, filesystem in sola lettura, tutte le capability Linux rimosse e no-new-privileges; scrittura solo su volumi dedicati e su un tmpfs di dimensione limitata.",
      },
      {
        title: "Bot solo in uscita",
        text: "Il bot Telegram usa il long polling: è lui a contattare Telegram, quindi non serve nessuna porta aperta, e risponde solo agli utenti autorizzati.",
      },
      {
        title: "Segreti fuori da Git, test prima del deploy",
        text: "Nel repository entrano solo i file .env.example e ogni container riceve solo le variabili che gli servono. Prima di ogni deploy girano oltre 600 test pytest, compresi i controlli sui file Docker.",
      },
    ],
    decisionsTitle: "Scelte tecniche",
    decisions: [
      {
        choice: "Certificati con verifica DNS-01 invece di aprire le porte 80 e 443",
        why: "Let's Encrypt controlla un record DNS impostato tramite l'API di Porkbun: i servizi privati hanno un HTTPS valido senza mai essere raggiungibili da fuori.",
      },
      {
        choice: "Il filtro IP condiviso sta nel provider file di Traefik, non nelle label dei container",
        why: "Un middleware definito nelle label esiste solo finché Traefik rilegge quel container; se non lo fa, ogni router che lo usa risponde 404. Un file osservato si carica da solo e applica subito le modifiche.",
      },
      {
        choice: "Versioni esatte (==) per tutte le dipendenze Python",
        why: "In produzione gira esattamente ciò che ha passato i test: nessun aggiornamento a sorpresa e nessun pacchetto pubblicato ieri che finisce in una build.",
      },
      {
        choice: "Due chiamate REST con httpx invece della libreria ufficiale google-ads",
        why: "La libreria si porta dietro gRPC e Protobuf, decine di megabyte di codice nativo, per quelli che sono due endpoint di sola lettura.",
      },
    ],
    modulesTitle: "Moduli",
    statusComplete: "Completo",
    modules: {
      "fin-engine": {
        use: "Mi dice quanto rende davvero ogni ora dedicata a un progetto, al netto dei costi.",
        text: "Progetti, registro di entrate e uscite anche ricorrenti e time tracking, con KPI come utile netto, burn rate e ROI orario calcolati in SQL.",
        note: "Dati reali da metà dicembre 2026; in programma una sezione notizie alimentata dal News Aggregator.",
      },
      transcriber: {
        use: "Mando un vocale su Telegram e ricevo il testo.",
        text: "Ha anche un'interfaccia web e un'API. Le registrazioni lunghe vengono divise con FFmpeg; in caso di errore riprova, poi passa a un provider di riserva e riprende dal blocco fallito.",
      },
      "quiz-engine": {
        use: "Studio per gli esami con quiz generati dall'AI e ripasso dilazionato.",
        text: "Una web app installabile con domande a scelta multipla, esercizi svolti, scatole di Leitner e statistiche. Funziona con qualsiasi corso senza modificare il codice.",
      },
    },
    inProgress: {
      label: "In corso",
      text: "legge le metriche Google Ads di ogni cliente freelance tramite OAuth2. In pausa in attesa dell'accesso Basic all'API di Google Ads.",
    },
  },

  diagram: {
    title: "Architettura di Project Nexus",
    desc: "I miei dispositivi raggiungono il server di casa solo tramite la VPN Tailscale; da internet non c'è nessuna porta in ingresso. Su un host Proxmox, una VM Debian 13 esegue Docker. Traefik è l'unico punto d'ingresso: gestisce l'HTTPS e applica un filtro IP. Dietro di lui, sulla rete interna nexus-net, girano Fin-Engine, Transcriber, Quiz-Engine e Ads Automator (in sviluppo), ciascuno con il proprio archivio isolato. Ogni container gira con utente non-root, filesystem in sola lettura e nessuna capability Linux. Solo in uscita: il DNS di Porkbun punta i sottodomini a IP privati di Tailscale e Let's Encrypt emette i certificati con la verifica DNS-01.",
    devices: "I miei dispositivi",
    devicesSub: "portatile · telefono",
    internet: "Internet pubblico",
    internetSub: "nessuna porta aperta",
    tunnelSub: "tunnel WireGuard",
    host: "PROXMOX VE · VM DEBIAN 13 · DOCKER",
    traefik: "Traefik · l'unico ingresso",
    traefikSub: "HTTPS (Let's Encrypt) · filtro IP → 403",
    network: "nexus-net · rete interna",
    ownPostgres: "DB dedicato",
    telegramBot: "bot Telegram ↗",
    inDevelopment: "in sviluppo",
    encryptedSqlite: "SQLite cifrato",
    hardening: ["Ogni container: utente non-root,", "filesystem in sola lettura, zero capability"],
    outbound: "solo in uscita",
    dnsSub: "sottodomini → IP privati",
    certsSub: "certificati via DNS-01",
  },

  projects: {
    label: "Altri progetti",
    title: "Un'app in produzione e un progetto universitario",
    problemLabel: "Il problema",
    builtLabel: "Cosa ho realizzato",
    stackLabel: "tecnologie",
    items: {
      shifts: {
        name: "Web app per i turni",
        context: "In produzione in una RSA",
        period: "ott – nov 2026",
        problem:
          "Una RSA deve preparare ogni mese i turni del personale rispettando il riposo dopo le notti, ruotando in modo equo le festività e tenendo giusti i totali delle ore di ciascuno.",
        built:
          "Un planner mensile protetto da password: turni e assenze in pochi clic, riposo automatico dopo ogni notte, storico delle festività, totali delle ore automatici con correzioni manuali, export CSV per Excel e backup del database.",
        note: "Contiene dati reali del personale, quindi resta privata: niente screenshot né demo.",
        imageAlt: "Web app per i turni",
      },
      shelter: {
        name: "Piattaforma per un gattile",
        context: "Progetto universitario, Politecnico di Torino",
        period: "2026",
        problem:
          "Un gattile ha bisogno di un unico posto per adozioni e volontariato: lo staff inserisce gli animali, i visitatori prenotano visite conoscitive e si propongono per i turni di volontariato.",
        built:
          "Un'API JSON in PHP, validazione JavaScript su ogni form e una galleria React con ricerca e ordinamento. Sicurezza: hash delle password, token CSRF, prepared statement, protezione dalla session fixation e blocchi contro le doppie prenotazioni.",
        imageAlt: "Piattaforma per un gattile, pagina della galleria dei gatti",
      },
    },
  },

  work: {
    label: "Lavori selezionati",
    title: "Siti web fatti per portare chiamate",
    intro: [
      "Sei piccole attività di Torino, quasi tutte di pronto intervento.",
      "Ognuna ha avuto da me lo stesso pacchetto completo.",
    ],
    gets: [
      {
        title: "Un sito che si trova in zona",
        text: "Realizzato e messo online con hosting e dominio, e impostato per la Local SEO così da comparire nelle ricerche in zona.",
      },
      {
        title: "Ogni chiamata contata",
        text: "Google Tag Manager registra ogni chiamata e ogni clic su WhatsApp partiti dal sito: il titolare vede cosa gli porta.",
      },
      {
        title: "Una campagna Google Ads dedicata",
        text: "Una campagna solo per quell'attività, misurata proprio su quelle chiamate e quei messaggi.",
      },
    ],
    sectors: {
      edilmatt: "Pronto intervento in casa: idraulico, fabbro, elettricista, vetraio",
      "rapid-fabbro": "Fabbro h24",
      "fabbro-spadino": "Fabbro",
      "express-torino": "Riparazioni urgenti per negozi e attività",
      "l3k-service": "Pronto intervento in casa",
      "idraulico-torino": "Idraulico",
    },
    imageAlt: "Home page del sito di {name}",
    newTab: "(si apre in una nuova scheda)",
  },

  skills: {
    label: "Competenze e formazione",
    title: "Con cosa lavoro",
    groups: [
      { group: "Programmazione", items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "SQL", "HTML/CSS"] },
      {
        group: "Framework e dati",
        items: ["FastAPI", "Next.js", "React", "Prisma", "SQLAlchemy", "PostgreSQL", "MySQL", "pytest"],
      },
      {
        group: "Infrastruttura",
        items: ["Docker", "Traefik", "Proxmox", "Linux (Debian)", "Tailscale", "Git", "Vercel"],
      },
      { group: "Web e marketing", items: ["Google Ads", "Google Tag Manager", "Local SEO", "WordPress"] },
      { group: "Lingue", items: ["Italiano (madrelingua)", "Inglese (B2, IELTS in corso)"] },
    ],
    educationTitle: "Formazione",
    education: [
      {
        school: "Politecnico di Torino",
        degree: "Laurea triennale in Ingegneria Gestionale (L-8); in programma la magistrale in Software Engineering",
        when: "Prevista nel 2027",
        detail:
          "Esami principali: Informatica in Python (30 e lode), Programmazione a oggetti in Java (29/30), Ricerca operativa (28/30), Basi di dati, Applicazioni web, Reti di calcolatori.",
      },
      {
        school: "ITIS Galileo Galilei, Imperia",
        degree: "Diploma di perito in Informatica",
        when: "2023",
        detail: "Reti, programmazione in Java e C++.",
      },
    ],
  },

  contact: {
    label: "Contatti",
    title: "Scrivimi",
    text: "Il modo migliore per contattarmi è l'email; nel CV trovi il quadro completo.",
    githubNote: "Il codice di questo sito è su GitHub. Nexus per ora è privato; altri repository arriveranno.",
    emailMe: "Scrivimi un'email",
    repoButton: "Questo sito su GitHub",
    cvButton: "Scarica il CV (in inglese)",
    linkedinButton: "LinkedIn",
  },

  footer: {
    location: "Torino",
    privacy: "Privacy: nessun cookie, nessuna statistica, nessuno script di terze parti.",
  },
};
