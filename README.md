# emanueleparrella.dev

Personal portfolio of Emanuele Parrella: a one-page static site in English (`/`) and Italian (`/it`),
built with Next.js (App Router, TypeScript) and Tailwind CSS, exported as plain HTML + CSS and hosted on Vercel.

- No cookies, analytics, third-party fonts or scripts at runtime (fonts are self-hosted by `next/font`).
- Strict security headers in [`vercel.json`](vercel.json), including a Content-Security-Policy with `script-src 'none'`.
- Light and dark theme from `prefers-color-scheme`, responsive from 360 px, `prefers-reduced-motion` respected.

## Requirements

- Node.js 20.9 or newer (developed on Node 24) and npm.

## Commands

```bash
npm install        # once
npm run dev        # development server on http://localhost:3000
npm run build      # static export to out/, then strip the unused JavaScript (see below)
npm run preview    # serve out/ on http://localhost:4173 with the same headers as Vercel
npm run lint       # ESLint
npm run images     # convert screenshots in images/ to WebP in public/ (see below)
```

## Project structure

```
content/types.ts           the Content type: every translatable string, shared by both languages
content/en.ts, it.ts       English and Italian copy (both typed as Content)
content/shared.ts          language-independent data: URLs, contacts, screenshots, stacks
app/(en)/layout.tsx        root layout of the English site: <html lang="en">, metadata
app/(en)/page.tsx          English page (/)
app/(it)/layout.tsx        root layout of the Italian site: <html lang="it">, metadata
app/(it)/it/page.tsx       Italian page (/it)
app/global-not-found.tsx   bilingual 404 (two root layouts need a global one)
app/**/opengraph-image.png Open Graph image per language (+ .alt.txt)
app/sitemap.ts, robots.ts  sitemap.xml (with hreflang alternates) and robots.txt
app/fonts.ts, icon.svg     self-hosted fonts, favicon
lib/seo.ts                 metadata per language: canonical, hreflang, og:locale, JSON-LD Person
components/HomePage.tsx    the page = the sections in order, rendered once per language
components/                one component per section, plus ui.tsx (shared bits) and icons.tsx
components/ArchitectureDiagram.tsx   hand-drawn SVG of Project Nexus (no IPs or hostnames), labels translated
public/                    static files served as-is (CV, screenshots)
scripts/postbuild.mjs      removes the unused JavaScript from out/ and checks the CSP (see below)
scripts/serve.mjs          local preview server
scripts/images.mjs         screenshot conversion (sharp)
vercel.json                security and cache headers
```

## Updating content

Components never contain copy. Text lives in [`content/en.ts`](content/en.ts) and
[`content/it.ts`](content/it.ts); data that does not change with the language (URLs, screenshots, stacks)
lives in [`content/shared.ts`](content/shared.ts).

- **Text:** edit the string in **both** language files and run `npm run build`. Both files are typed as
  `Content` (`content/types.ts`): a missing or misspelt key in either language fails the build.
- **A new client site:** add it to `clientSites` in `shared.ts` (with a new id in `ClientSiteId`), then add
  its sector in `work.sectors` in both language files (the build fails until you do). Check the URL answers.
- **LinkedIn:** set `site.linkedin` in `shared.ts`; the Contact button appears only when it is set.
- **GitHub wording:** `contact.githubNote` must stay true (today the only public repository is this site).
- **Nexus modules:** finished ones are listed in `modules` (`shared.ts`) with text in `nexus.modules`; the
  paused one is the single line `nexus.inProgress`.
- **Translation style:** natural Italian, technical terms left in English where Italians use them
  (homelab, reverse proxy, deploy). The CV exists only in English, so the Italian button says so.
- **Screenshots:** see the next section.

### Adding screenshots

Without an image a card is a compact, text-only card (no placeholder). To add a screenshot:

1. Take a desktop screenshot of the page (at least 1200 px wide; a 1440×900 browser window is ideal).
2. Save it as PNG or JPG with **exactly** this name:

   | Card | Source file | Becomes |
   |---|---|---|
   | EdilMatt | `images/work/edilmatt.png` | `public/work/edilmatt.webp` |
   | Rapid Fabbro | `images/work/rapid-fabbro.png` | `public/work/rapid-fabbro.webp` |
   | Fabbro Spadino | `images/work/fabbro-spadino.png` | `public/work/fabbro-spadino.webp` |
   | Express Torino | `images/work/express-torino.png` | `public/work/express-torino.webp` |
   | L3K Service | `images/work/l3k-service.png` | `public/work/l3k-service.webp` |
   | Pronto Intervento Idraulico Torino | `images/work/idraulico-torino.png` | `public/work/idraulico-torino.webp` |
   | Animal shelter platform | `images/projects/animal-shelter.png` | `public/projects/animal-shelter.webp` |

3. Run `npm run images`: it crops each image from the top to 16:10 and writes a 1200×750 WebP
   (quality 80) into `public/`. The originals in `images/` are not committed.
4. In `content/shared.ts`, uncomment the matching `image: "/work/....webp"` line, then `npm run build`.
   One line activates the image in both languages; the alt text is translated automatically.

The card then shows the screenshot in a light browser-window frame, with fixed size (no layout shift) and
lazy loading. The shift-scheduling app never gets a screenshot: it contains real staff data.

### Updating the CV

The download buttons point to `public/Emanuele-Parrella-CV.pdf`. To publish a new version:

```bash
cp ../../cv/cv.pdf public/Emanuele-Parrella-CV.pdf   # or copy it by hand from C:\dev\cv\cv.pdf
npm run build
git commit -am "Update CV" && git push
```

Keep the same file name so the existing links keep working. Vercel serves static files with
revalidation, so the new PDF is live as soon as the deploy finishes.

## Zero JavaScript and Content-Security-Policy

Every section is rendered to HTML at build time and nothing on the page needs client-side code (the theme
follows `prefers-color-scheme` in CSS). So `scripts/postbuild.mjs`, run at the end of `npm run build`,
removes the React runtime that Next.js adds for hydration: the site ships as **pure HTML + CSS**.
The JSON-LD block stays, because it is data and is never executed.

This allows the strictest policy, sent from `vercel.json`:

```
default-src 'none'; script-src 'none'; style-src 'self'; img-src 'self'; font-src 'self';
connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

`connect-src 'self'` only exists so audit tools such as Lighthouse can fetch `robots.txt` from the page;
with no scripts on the page, nothing else can use it.

Why not keep the scripts and allow them by hash? Next.js inline scripts are not byte-identical between a
Windows and a Linux build, so hashes computed locally do not match Vercel's build. The post-build step
fails the build if any executable script is left in the HTML or if the CSP stops forbidding scripts.

**If you ever add interactivity** (a client component), the post-build step will strip it: you would need
to drop the step and move to a nonce- or hash-based CSP generated on the build machine.

## Languages and SEO

- English at `/` (the CV links there), Italian at `/it`. Each has its own root layout, so `<html lang>` is right.
- The header has a plain link to the other language (no JavaScript). Section ids are identical, so
  `/#work` and `/it#work` are the same section.
- Each page declares its canonical URL and `hreflang` alternates (`en`, `it`, `x-default` → English);
  `sitemap.xml` lists both URLs with alternates. Title, description, `og:locale` and the Open Graph image
  are per language.
- One bilingual `404.html`: static hosting serves a single 404 page for every path.

## Deploy (Vercel)

The Vercel project builds with `npm run build` and serves `out/` (both set in `vercel.json`).

- **With GitHub:** every push to `main` deploys to production; other branches get preview URLs.
- **From the CLI:** `npx vercel` (preview) and `npx vercel --prod` (production).

Domains: `emanueleparrella.dev` is the primary domain and `www.emanueleparrella.dev` redirects to it
(configured in Vercel → Project → Settings → Domains). DNS is managed at Porkbun: only the apex and `www`
records point to Vercel; the other subdomains belong to a private homelab and must not be changed.
