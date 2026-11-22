#!/usr/bin/env node
/**
 * Post-build step: ship the exported site as HTML + CSS plus ONE small script of ours.
 *
 * Every section is rendered to static HTML at build time, so the React runtime that
 * Next.js adds for hydration is dead weight. Removing it:
 *
 *   - removes ~600 KB of JavaScript and every inline script, which allows a strict,
 *     fixed CSP in vercel.json: `script-src 'self'`, no 'unsafe-inline', no hashes
 *     (inline-script hashes differ between Windows and Linux builds anyway);
 *   - leaves only /js/site.js (public/js/site.js): theme toggle, copy-email and the
 *     active menu item, all progressive enhancements.
 *
 * Kept: JSON-LD blocks (type="application/ld+json": data, never executed) and the
 * external <script src="/js/site.js">. The build fails if anything else executable
 * (inline script, other src, on* handler) is left, or if the CSP gets weaker.
 *
 * Usage: node scripts/postbuild.mjs   (runs automatically in `npm run build`)
 */
import { readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";
const ALLOWED_SCRIPT = "/js/site.js";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(OUT_DIR);
const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
const SCRIPT_PRELOAD = /<link\b[^>]*\b(?:as="script"|rel="modulepreload")[^>]*\/?>/g;

const isJsonLd = (attrs) => attrs.includes('type="application/ld+json"');
const isOwnScript = (attrs, body) => body.trim() === "" && attrs.includes(`src="${ALLOWED_SCRIPT}"`);
const keep = (attrs, body) => isJsonLd(attrs) || isOwnScript(attrs, body);

let removed = 0;
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const stripped = html
    .replace(SCRIPT_TAG, (tag, attrs, body) => (keep(attrs, body) ? tag : (removed++, "")))
    .replace(SCRIPT_PRELOAD, () => (removed++, ""));

  const leftover = [...stripped.matchAll(SCRIPT_TAG)].filter(([, attrs, body]) => !keep(attrs, body));
  const markup = stripped.replace(SCRIPT_TAG, "");
  if (leftover.length > 0 || /\son[a-z]+=/i.test(markup)) {
    console.error(`postbuild: unexpected executable script left in ${file}`);
    process.exit(1);
  }
  writeFileSync(file, stripped);
}

// The Next.js JS chunks and RSC payloads are no longer referenced by any page.
let deleted = 0;
for (const file of files) {
  const isChunk = file.includes(join("_next", "static")) && file.endsWith(".js");
  const isRscPayload = file.endsWith(".txt") && !file.endsWith("robots.txt");
  if (isChunk || isRscPayload) {
    rmSync(file);
    deleted++;
  }
}

// Remove folders left empty (the per-route RSC payload folders).
function removeEmptyDirs(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(join(dir, entry.name));
  }
  if (dir !== OUT_DIR && readdirSync(dir).length === 0) rmdirSync(dir);
}
removeEmptyDirs(OUT_DIR);

// The deployed CSP must allow scripts only from this origin: no inline, no eval.
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
const csp = config.headers
  ?.flatMap((rule) => rule.headers)
  .find((h) => h.key === "Content-Security-Policy")?.value;
const scriptSrc = csp?.match(/script-src ([^;]*)/)?.[1].trim();
if (scriptSrc !== "'self'") {
  console.error(`postbuild: vercel.json must send exactly script-src 'self' (found: ${scriptSrc})`);
  process.exit(1);
}

console.log(`postbuild: removed ${removed} Next.js script tags, deleted ${deleted} unused files; CSP ok`);
