# emanueleparrella.dev

Personal portfolio of Emanuele Parrella: a single static page built with Next.js (App Router, TypeScript)
and Tailwind CSS, exported as plain HTML/CSS/JS and hosted on Vercel.

- No cookies, analytics, third-party fonts or scripts at runtime (fonts are self-hosted by `next/font`).
- Strict security headers in [`vercel.json`](vercel.json), including a hash-based Content-Security-Policy.
- Light and dark theme from `prefers-color-scheme`, responsive from 360 px, `prefers-reduced-motion` respected.

## Requirements

- Node.js 20.9 or newer (developed on Node 24) and npm.

## Commands

```bash
npm install        # once
npm run dev        # development server on http://localhost:3000
npm run build      # static export to out/ + refresh the CSP hashes in vercel.json
npm run preview    # serve out/ on http://localhost:4173 with the same headers as Vercel
npm run lint       # ESLint
```

## Project structure

```
content/site.ts            ALL texts and project data (edit this to change the site)
app/layout.tsx             <html>, fonts, metadata (title, Open Graph, canonical), JSON-LD Person
app/page.tsx               page = the sections in order
app/opengraph-image.tsx    Open Graph image, rendered to a PNG at build time
app/sitemap.ts, robots.ts  sitemap.xml and robots.txt
app/icon.svg               favicon
components/                one component per section, plus ui.tsx (shared bits) and icons.tsx
components/ArchitectureDiagram.tsx   hand-drawn SVG of Project Nexus (no IPs or hostnames)
public/                    static files served as-is (CV, screenshots)
scripts/csp.mjs            computes the CSP script hashes (see below)
scripts/serve.mjs          local preview server
vercel.json                security and cache headers
```

## Updating content

Everything visible on the page comes from [`content/site.ts`](content/site.ts): hero, Nexus modules,
projects, client websites, skills, education and contact. Components never contain copy.

- **Text:** edit the strings and run `npm run build` to check.
- **A new client site:** add an object to `clientWork.sites` (`name`, `sector`, `url`). Check the URL
  answers before publishing.
- **A Nexus module status:** change `status` to `"complete"` or `"in-development"` and update `note`.
- **Screenshots:** until an image is set, each card shows a neutral placeholder. To add one:
  1. save a 16:10 image (1600×1000 recommended, WebP or PNG) in `public/work/` (client sites) or
     `public/projects/` (projects), e.g. `public/work/l3k-service.webp`;
  2. set `image: "/work/l3k-service.webp"` on that entry in `content/site.ts`.

### Updating the CV

The download buttons point to `public/Emanuele-Parrella-CV.pdf`. To publish a new version:

```bash
cp ../../cv/cv.pdf public/Emanuele-Parrella-CV.pdf   # or copy it by hand from C:\dev\cv\cv.pdf
npm run build
git commit -am "Update CV" && git push
```

Keep the same file name so the existing links keep working. Vercel serves static files with
revalidation, so the new PDF is live as soon as the deploy finishes.

## Content-Security-Policy

Next.js inlines a few small scripts (the React Server Components payload). Instead of allowing all inline
scripts with `'unsafe-inline'`, the CSP in `vercel.json` lists the SHA-256 hash of each one.
`scripts/csp.mjs` runs at the end of `npm run build`:

- **locally** it recomputes the hashes from `out/*.html` and rewrites the CSP in `vercel.json`;
- **on Vercel** (`VERCEL=1`) it only verifies them and **fails the build** if they differ, so a stale
  policy can never reach production. If that happens: run `npm run build` locally, commit `vercel.json`, push.

`next.config.ts` pins `generateBuildId` so the inline scripts are identical between builds of the same
source. Rule of thumb: **after changing content, run `npm run build` and commit `vercel.json` too.**

The page is fully server-rendered HTML: even if JavaScript were blocked, every section would still display.

## Deploy (Vercel)

The Vercel project builds with `npm run build` and serves `out/` (both set in `vercel.json`).

- **With GitHub:** every push to `main` deploys to production; other branches get preview URLs.
- **From the CLI:** `npx vercel` (preview) and `npx vercel --prod` (production).

Domains: `emanueleparrella.dev` is the primary domain and `www.emanueleparrella.dev` redirects to it
(configured in Vercel → Project → Settings → Domains). DNS is managed at Porkbun: only the apex and `www`
records point to Vercel; the other subdomains belong to a private homelab and must not be changed.
