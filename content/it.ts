import type { Content } from "./types";

/**
 * Testi in italiano (serviti su /it). Scritti in italiano, non tradotti parola per parola:
 * frasi brevi, prima persona, termini tecnici in inglese dove in Italia si usano così.
 * Ogni affermazione deve essere verificabile nel CV o nei repository.
 */
export const it: Content = {
  locale: "it",
  path: "/it",
  ogLocale: "it_IT",
  meta: {
    title: "Emanuele Parrella · Server self-hosted e applicazioni web",
    description:
      "Costruisco server e applicazioni web: il mio homelab Zero-Trust, un'app per i turni in uso in una RSA e siti per attività locali di Torino.",
  },

  nav: {
    label: "Sezioni",
    skip: "Salta al contenuto",
    links: [
      { href: "#nexus", label: "Nexus" },
      { href: "#projects", label: "Progetti" },
      { href: "#work", label: "Siti" },
      { href: "#skills", label: "Competenze" },
      { href: "#contact", label: "Contatti" },
    ],
    languageLabel: "Lingua",
    themeToLight: "Passa al tema chiaro",
    themeToDark: "Passa al tema scuro",
  },

  hero: {
    kicker: "Torino",
    tagline:
      "Costruisco server e applicazioni web: dal mio homelab Zero-Trust a un'app per i turni che una RSA usa davvero.",
    context: [
      "Studio Ingegneria Gestionale al Politecnico di Torino",
      "triennale prevista nel 2027",
      "poi magistrale in Software Engineering",
    ],
    viewProjects: "Vedi i progetti",
    downloadCv: "Scarica il CV (in inglese)",
    glanceTitle: "In breve",
    glance: [
      { value: "6", label: "siti realizzati per clienti, tutti online" },
      { value: "600+", label: "test automatici in Project Nexus" },
      { value: "0", label: "porte di casa aperte verso internet" },
      { value: "1", label: "app in uso in una RSA" },
    ],
  },

  nexus: {
    label: "Progetto principale",
    title: "Project Nexus",
    subtitle: "Il mio homelab, self-hosted e Zero-Trust",
    period: "Da ottobre 2026",
    intro:
      "È il server che tengo a casa e che ho costruito per imparare il DevSecOps sul campo. Ogni servizio vive in un container Docker dietro un unico reverse proxy, e da internet non si raggiunge nulla: ci entro solo tramite VPN.",
    privacyNote: "Nexus è privato di proposito, quindi non c'è una demo pubblica: lo schema mostra com'è fatto.",
    stackLabel: "Tecnologie usate in Nexus",
    keyPoints: [
      {
        title: "Nessuna porta aperta",
        text: "Il router non inoltra niente. Tutto passa dalla VPN Tailscale: chi è fuori non vede nemmeno che i servizi esistono.",
      },
      {
        title: "HTTPS vero anche sui servizi privati",
        text: "Ogni servizio ha il suo sottodominio con un certificato Let's Encrypt valido, ottenuto senza aprire alcuna porta verso l'esterno.",
      },
      {
        title: "Container blindati e testati",
        text: "Ogni container gira senza privilegi di root, con il filesystem in sola lettura e senza capability Linux. Prima di ogni deploy passano oltre 600 test.",
      },
    ],
    detailsSummary: "Tutti i livelli di sicurezza",
    layers: [
      {
        title: "Nessuna porta aperta",
        text: "Il router non inoltra niente e al server, SSH compreso, si arriva solo da Tailscale. Il DNS pubblico punta a un indirizzo privato della VPN, che da fuori non porta da nessuna parte.",
      },
      {
        title: "Una sola porta d'ingresso",
        text: "Traefik è l'unico container che espone porte. Un filtro IP comune a tutti i servizi risponde 403 a chi arriva da fuori, prima ancora che la richiesta tocchi un'app.",
      },
      {
        title: "Certificati senza traffico in ingresso",
        text: "I certificati Let's Encrypt arrivano con la verifica DNS-01, tramite l'API di Porkbun: l'HTTPS funziona su servizi che da fuori nessuno può raggiungere.",
      },
      {
        title: "Database separati",
        text: "Ogni servizio ha il suo database su una rete privata, che il reverse proxy non vede.",
      },
      {
        title: "Container blindati",
        text: "Niente utente root, filesystem in sola lettura, tutte le capability Linux tolte e no-new-privileges. Si scrive solo su volumi dedicati e su un tmpfs di dimensione limitata.",
      },
      {
        title: "Un bot che non apre porte",
        text: "Il bot Telegram usa il long polling: è lui a chiamare Telegram, quindi non serve aprire nulla. E risponde solo agli utenti autorizzati.",
      },
      {
        title: "Segreti fuori da Git, test prima del deploy",
        text: "Nel repository finiscono solo i file .env.example e ogni container riceve soltanto le variabili che gli servono. Prima di ogni deploy passano oltre 600 test pytest, compresi i controlli sui file Docker.",
      },
    ],
    decisionsTitle: "Scelte tecniche, e perché",
    decisions: [
      {
        choice: "Certificati con verifica DNS-01, senza aprire le porte 80 e 443",
        why: "Let's Encrypt controlla un record DNS che imposto tramite l'API di Porkbun: i servizi privati hanno un HTTPS valido senza mai esporsi.",
      },
      {
        choice: "Il filtro IP comune sta nel provider file di Traefik, non nelle label dei container",
        why: "Se il middleware sta nelle label, esiste solo finché Traefik rilegge quel container: quando non succede, ogni router che lo usa risponde 404. Un file osservato si carica per conto suo e applica subito le modifiche.",
      },
      {
        choice: "Versioni esatte (==) per ogni dipendenza Python",
        why: "In produzione gira esattamente quello che ha superato i test: niente aggiornamenti a sorpresa, né pacchetti pubblicati il giorno prima.",
      },
      {
        choice: "Due chiamate REST con httpx al posto della libreria ufficiale google-ads",
        why: "La libreria si porta dietro gRPC e Protobuf, decine di megabyte di codice nativo, per usare appena due endpoint in sola lettura.",
      },
    ],
    modulesTitle: "I moduli",
    statusComplete: "Completo",
    modules: {
      "fin-engine": {
        use: "Mi dice quanto mi rende davvero ogni ora passata su un progetto, tolti i costi.",
        text: "Progetti, entrate e uscite (anche ricorrenti) e ore lavorate, con indicatori come utile netto, burn rate e ROI orario calcolati direttamente in SQL.",
        note: "Dati reali da metà dicembre 2026; in programma una sezione notizie collegata al News Aggregator.",
      },
      transcriber: {
        use: "Mando un vocale su Telegram e mi torna il testo.",
        text: "Oltre al bot ci sono un'interfaccia web e un'API. Le registrazioni lunghe vengono spezzate con FFmpeg; se qualcosa va storto riprova, poi passa a un provider di riserva e riparte dal pezzo rimasto in sospeso.",
      },
      "quiz-engine": {
        use: "Preparo gli esami con quiz generati dall'AI e ripassi programmati.",
        text: "Una web app che si installa sul telefono, con domande a scelta multipla, esercizi svolti, scatole di Leitner e statistiche. Va bene per qualsiasi corso, senza toccare il codice.",
      },
    },
    inProgress: {
      label: "In lavorazione",
      text: "legge le metriche Google Ads di ogni cliente freelance tramite OAuth2. È in pausa finché Google non concede l'accesso Basic alla sua API.",
    },
  },

  diagram: {
    title: "Come è fatto Project Nexus",
    desc: "I miei dispositivi arrivano al server di casa solo attraverso la VPN Tailscale; da internet non c'è nessuna porta aperta. Su un host Proxmox gira una VM Debian 13 con Docker. Traefik è l'unico ingresso: gestisce l'HTTPS e applica un filtro IP. Dietro di lui, sulla rete interna nexus-net, girano Fin-Engine, Transcriber, Quiz-Engine e Ads Automator (in sviluppo), ognuno con il proprio archivio separato. Ogni container gira senza root, con filesystem in sola lettura e senza capability Linux. Solo connessioni in uscita: il DNS di Porkbun punta i sottodomini a indirizzi privati della VPN e Let's Encrypt rilascia i certificati con la verifica DNS-01.",
    devices: "I miei dispositivi",
    devicesSub: "portatile · telefono",
    internet: "Internet",
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
    hardening: ["Ogni container: niente root,", "filesystem in sola lettura, zero capability"],
    outbound: "solo in uscita",
    dnsSub: "sottodomini → IP privati",
    certsSub: "certificati via DNS-01",
    hint: "Tocca una parte dello schema, passaci sopra o raggiungila con Tab per vedere a cosa serve.",
    nodes: {
      tunnel:
        "VPN Tailscale: l'unica via d'accesso. Portatile e telefono entrano in una rete cifrata WireGuard; da internet non c'è niente a cui collegarsi.",
      traefik:
        "Traefik: l'unico ingresso. Gestisce l'HTTPS e risponde 403 a qualsiasi indirizzo che non arrivi dalla rete privata.",
      "fin-engine":
        "Fin-Engine: quanto rende davvero ogni ora passata su un progetto, tolti i costi. Dashboard in Next.js, FastAPI e un PostgreSQL tutto suo.",
      transcriber:
        "Transcriber: un vocale mandato su Telegram torna indietro come testo. Il bot si collega solo verso l'esterno, quindi non apre porte.",
      "quiz-engine": "Quiz-Engine: quiz generati dall'AI e ripassi programmati per studiare, con un PostgreSQL tutto suo.",
      "ads-automator":
        "Ads Automator, in sviluppo: legge le metriche Google Ads di ogni cliente tramite OAuth2 e conserva i token cifrati.",
    },
  },

  projects: {
    label: "Altri progetti",
    title: "Un'app in uso e un progetto universitario",
    problemLabel: "Il problema",
    builtLabel: "Cosa ho fatto",
    stackLabel: "tecnologie",
    items: {
      shifts: {
        name: "Gestionale dei turni",
        context: "In uso in una RSA",
        period: "ott – nov 2026",
        problem:
          "Ogni mese una RSA deve organizzare i turni del personale: riposo dopo le notti, festività distribuite in modo equo e il monte ore giusto per ciascuno.",
        built:
          "Un planner mensile protetto da password. Turni e assenze si inseriscono in pochi clic, il riposo dopo la notte si aggiunge da solo, le festività hanno uno storico e le ore si sommano in automatico, con la possibilità di correggerle. In più, export CSV per Excel e backup del database.",
        note: "Contiene dati reali del personale, per questo resta privato: niente screenshot né demo.",
        imageAlt: "Gestionale dei turni",
      },
      shelter: {
        name: "Piattaforma per un gattile",
        context: "Progetto universitario al Politecnico di Torino",
        period: "2026",
        problem:
          "Un gattile vuole gestire adozioni e volontariato in un unico posto: lo staff inserisce i gatti, chi visita il sito prenota un incontro o si offre per un turno da volontario.",
        built:
          "API JSON in PHP, controlli JavaScript su ogni modulo e una galleria in React con ricerca e ordinamento. Sul fronte sicurezza: password salvate solo come hash, token CSRF, prepared statement, protezione dalla session fixation e blocchi contro le prenotazioni doppie.",
        imageAlt: "Piattaforma per un gattile, la galleria dei gatti",
      },
    },
  },

  work: {
    label: "Lavori per clienti",
    title: "Siti pensati per far squillare il telefono",
    intro: ["Sei piccole attività di Torino, quasi tutte di pronto intervento.", "A ognuna ho dato lo stesso pacchetto completo."],
    gets: [
      {
        title: "Un sito che si trova in zona",
        text: "Lo realizzo e lo metto online con hosting e dominio, e curo la Local SEO perché compaia quando qualcuno cerca quel servizio in zona.",
      },
      {
        title: "Sai quante chiamate arrivano dal sito",
        text: "Con Google Tag Manager ogni chiamata e ogni messaggio WhatsApp partiti dal sito vengono registrati: il titolare vede cosa gli porta.",
      },
      {
        title: "Una campagna Google Ads tutta sua",
        text: "Una campagna dedicata solo a quell'attività, misurata proprio su quelle chiamate e quei messaggi.",
      },
    ],
    sectors: {
      edilmatt: "Pronto intervento in casa: idraulico, fabbro, elettricista, vetraio",
      "rapid-fabbro": "Fabbro 24 ore su 24",
      "fabbro-spadino": "Fabbro",
      "express-torino": "Riparazioni urgenti per negozi e attività commerciali",
      "l3k-service": "Pronto intervento in casa",
      "idraulico-torino": "Idraulico",
    },
    imageAlt: "La home page del sito di {name}",
    newTab: "(si apre in una nuova scheda)",
  },

  skills: {
    label: "Competenze e studi",
    title: "Gli strumenti che uso",
    groups: [
      { group: "Programmazione", items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "SQL", "HTML/CSS"] },
      {
        group: "Framework e database",
        items: ["FastAPI", "Next.js", "React", "Prisma", "SQLAlchemy", "PostgreSQL", "MySQL", "pytest"],
      },
      {
        group: "Infrastruttura",
        items: ["Docker", "Traefik", "Proxmox", "Linux (Debian)", "Tailscale", "Git", "Vercel"],
      },
      { group: "Web e marketing", items: ["Google Ads", "Google Tag Manager", "Local SEO", "WordPress"] },
      { group: "Lingue", items: ["Italiano (madrelingua)", "Inglese (B2, sto preparando l'IELTS)"] },
    ],
    educationTitle: "Studi",
    education: [
      {
        school: "Politecnico di Torino",
        degree: "Laurea triennale in Ingegneria Gestionale (L-8), poi magistrale in Software Engineering",
        when: "Triennale prevista nel 2027",
        detail:
          "I corsi più vicini a quello che faccio: Informatica in Python (30 e lode), Programmazione a oggetti in Java (29/30), Ricerca operativa (28/30), Basi di dati, Applicazioni web, Reti di calcolatori (SDN, P4).",
      },
      {
        school: "ITIS Galileo Galilei, Imperia",
        degree: "Diploma tecnico in Informatica",
        when: "2023",
        detail: "Reti e programmazione in Java e C++.",
      },
    ],
  },

  contact: {
    label: "Contatti",
    title: "Scrivimi",
    text: "Per contattarmi la strada più veloce è l'email. Nel CV trovi tutto il resto.",
    githubNote: "Su GitHub c'è il codice di questo sito. Nexus per ora resta privato; altri repository arriveranno.",
    emailMe: "Scrivimi un'email",
    repoButton: "Il codice del sito su GitHub",
    cvButton: "Scarica il CV (in inglese)",
    linkedinButton: "LinkedIn",
    copyEmail: "Copia l'indirizzo",
    copied: "Copiato",
  },

  footer: {
    location: "Torino",
    privacy: "Niente cookie, niente statistiche, niente script di terze parti.",
  },
};
