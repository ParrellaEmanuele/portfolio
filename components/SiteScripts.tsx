import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The site's own scripts, rendered in <head> (runs at build time: static export).
 * Each URL carries a hash of the file (?v=…), so vercel.json can cache /js/* for a
 * year: any change to the file changes the URL. scripts/postbuild.mjs allows exactly
 * these two files and nothing else.
 */
function versioned(file: string) {
  const hash = createHash("sha256")
    .update(readFileSync(join(process.cwd(), "public", "js", file)))
    .digest("hex")
    .slice(0, 12);
  return `/js/${file}?v=${hash}`;
}

export function SiteScripts() {
  return (
    <>
      {/*
        Applies a saved theme. Async, so it never blocks rendering; being tiny and fetched in
        parallel with the stylesheet (which does block), it runs before the first paint in
        practice. Without a saved choice it does nothing and CSS follows the system theme.
      */}
      <script src={versioned("theme.js")} async />
      {/* Theme toggle, copy-email, active menu item: deferred, never blocks rendering. */}
      <script src={versioned("site.js")} defer />
    </>
  );
}
