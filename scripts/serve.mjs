#!/usr/bin/env node
/**
 * Local preview of the static build in out/, with the same security headers
 * Vercel will send (read from vercel.json), so the CSP can be tested locally.
 * Not used in production.
 *
 * Usage: npm run preview   (then open http://localhost:4173)
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { createGzip } from "node:zlib";

const ROOT = resolve("out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

// Vercel "source" patterns used here are simple: "/(.*)" and "/prefix/(.*)".
// vercel.json is re-read on every request: `npm run build` rewrites the CSP hashes.
function headersFor(pathname) {
  const config = JSON.parse(readFileSync("vercel.json", "utf8"));
  const out = {};
  for (const rule of config.headers ?? []) {
    const re = new RegExp(`^${rule.source}$`);
    if (re.test(pathname)) for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
}

function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const candidates = [clean, `${clean}.html`, join(clean, "index.html")];
  for (const c of candidates) {
    const file = join(ROOT, c);
    if (file.startsWith(ROOT) && existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = resolveFile(pathname);
  const status = file ? 200 : 404;
  const target = file ?? join(ROOT, "404.html");
  const type = TYPES[extname(target)] ?? (target.endsWith("opengraph-image") ? "image/png" : "application/octet-stream");
  const headers = { "Content-Type": type, ...headersFor(pathname) };
  // Compress text like Vercel does, so local Lighthouse runs are realistic.
  const compressible = /text|javascript|json|xml|svg/.test(type);
  if (compressible && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    createReadStream(target).pipe(createGzip()).pipe(res);
    return;
  }
  res.writeHead(status, headers);
  createReadStream(target).pipe(res);
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`));
