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
npm run build      # static export to out/, then strip the unused JavaScript (see below)
npm run preview    # serve out/ on http://localhost:4173 with the same headers as Vercel
npm run lint       # ESLint
npm run images     # convert screenshots in images/ to WebP in public/ (see below)
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
scripts/postbuild.mjs      removes the unused JavaScript from out/ and checks the CSP (see below)
scripts/serve.mjs          local preview server
scripts/images.mjs         screenshot conversion (sharp)
vercel.json                security and cache headers
```

## Updating content

Everything visible on the page comes from [`content/site.ts`](content/site.ts): hero, Nexus modules,
projects, client websites, skills, education and contact. Components never contain copy.

- **Text:** edit the strings and run `npm run build` to check.
- **A new client site:** add an object to `clientWork.sites` (`name`, `sector`, `url`). Check the URL
  answers before publishing.
- **LinkedIn:** set `site.linkedin` to the profile URL; the Contact button appears only when it is set.
- **GitHub wording:** `contact.githubNote` must stay true (today the only public repository is this site).
- **A Nexus module status:** change `status` to `"complete"` or `"in-development"` and update `note`.
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
4. In `content/`, uncomment the matching `image: "/work/....webp"` line, then `npm run build`.

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

## Deploy (Vercel)

The Vercel project builds with `npm run build` and serves `out/` (both set in `vercel.json`).

- **With GitHub:** every push to `main` deploys to production; other branches get preview URLs.
- **From the CLI:** `npx vercel` (preview) and `npx vercel --prod` (production).

Domains: `emanueleparrella.dev` is the primary domain and `www.emanueleparrella.dev` redirects to it
(configured in Vercel → Project → Settings → Domains). DNS is managed at Porkbun: only the apex and `www`
records point to Vercel; the other subdomains belong to a private homelab and must not be changed.
