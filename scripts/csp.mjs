#!/usr/bin/env node
/**
 * Keeps the Content-Security-Policy in vercel.json in sync with the build.
 *
 * Next.js inlines a few small <script> tags (the React Server Components
 * payload). Instead of allowing every inline script with 'unsafe-inline', the
 * CSP lists the SHA-256 hash of each one. This script runs after `next build`:
 *
 *   - locally:   it recomputes the hashes from out/*.html and rewrites vercel.json;
 *   - on Vercel: (VERCEL=1) it only checks them and fails the build on a mismatch,
 *                so a stale policy can never reach production. Fix: run
 *                `npm run build` locally and commit vercel.json.
 *
 * Usage: node scripts/csp.mjs [--check]
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";
const VERCEL_JSON = "vercel.json";
const checkOnly = process.argv.includes("--check") || process.env.VERCEL === "1";

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

// Inline, executable scripts only: skip external ones (src=) and JSON-LD data blocks.
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;

const hashes = new Set();
for (const file of htmlFiles(OUT_DIR)) {
  const html = readFileSync(file, "utf8");
  for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
    if (body.length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
}

const policy = [
  "default-src 'none'",
  `script-src 'self' ${[...hashes].sort().join(" ")}`.trim(),
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const config = JSON.parse(readFileSync(VERCEL_JSON, "utf8"));
const header = config.headers
  ?.find((rule) => rule.source === "/(.*)")
  ?.headers.find((h) => h.key === "Content-Security-Policy");

if (!header) {
  console.error(`csp: no Content-Security-Policy header for "/(.*)" in ${VERCEL_JSON}`);
  process.exit(1);
}

if (header.value === policy) {
  console.log(`csp: ${VERCEL_JSON} is up to date (${hashes.size} inline script hashes)`);
} else if (checkOnly) {
  console.error(
    `csp: the CSP in ${VERCEL_JSON} does not match this build.\n` +
      "     Run `npm run build` locally and commit the updated vercel.json.\n" +
      `     expected: ${policy}\n     found:    ${header.value}`,
  );
  process.exit(1);
} else {
  header.value = policy;
  writeFileSync(VERCEL_JSON, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`csp: updated ${VERCEL_JSON} (${hashes.size} inline script hashes)`);
}
