#!/usr/bin/env node
/**
 * Post-build step: ship the exported site as pure HTML + CSS, with zero JavaScript.
 *
 * Every section is rendered to static HTML at build time and the site has no
 * client-side interactivity (the theme follows prefers-color-scheme in CSS), so
 * the React runtime that Next.js adds for hydration is dead weight. Removing it:
 *
 *   - allows the strictest Content-Security-Policy, `script-src 'none'`, as a fixed
 *     string in vercel.json (inline-script hashes differ between Windows and Linux
 *     builds, so a hash-based policy cannot be precomputed reliably);
 *   - removes ~600 KB of JavaScript from the page.
 *
 * JSON-LD blocks (type="application/ld+json") are kept: they are data, never executed.
 * The script then verifies the result and fails the build if anything executable is left.
 *
 * Usage: node scripts/postbuild.mjs   (runs automatically in `npm run build`)
 */
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(OUT_DIR);
const SCRIPT_TAG = /<script\b([^>]*)>[\s\S]*?<\/script>/g;
const SCRIPT_PRELOAD = /<link\b[^>]*\b(?:as="script"|rel="modulepreload")[^>]*\/?>/g;
const isJsonLd = (attrs) => /type="application\/ld\+json"/.test(attrs);

let removed = 0;
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const stripped = html
    .replace(SCRIPT_TAG, (tag, attrs) => (isJsonLd(attrs) ? tag : (removed++, "")))
    .replace(SCRIPT_PRELOAD, () => (removed++, ""));

  const leftover = [...stripped.matchAll(SCRIPT_TAG)].filter(([, attrs]) => !isJsonLd(attrs));
  if (leftover.length > 0 || /\son[a-z]+=/i.test(stripped.replace(/<script[\s\S]*?<\/script>/g, ""))) {
    console.error(`postbuild: executable script left in ${file}`);
    process.exit(1);
  }
  writeFileSync(file, stripped);
}

// The JS chunks and RSC payloads are no longer referenced by any page.
let deleted = 0;
for (const file of files) {
  const isChunk = file.includes(join("_next", "static")) && file.endsWith(".js");
  const isRscPayload = file.endsWith(".txt") && !file.endsWith("robots.txt");
  if (isChunk || isRscPayload) {
    rmSync(file);
    deleted++;
  }
}

// The deployed CSP must forbid scripts entirely.
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
const csp = config.headers
  ?.flatMap((rule) => rule.headers)
  .find((h) => h.key === "Content-Security-Policy")?.value;
if (!csp?.includes("script-src 'none'")) {
  console.error("postbuild: vercel.json must send a CSP with script-src 'none'");
  process.exit(1);
}

console.log(`postbuild: removed ${removed} script tags, deleted ${deleted} unused files; CSP ok`);
