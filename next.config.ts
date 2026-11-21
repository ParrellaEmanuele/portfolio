import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // No image optimisation server in a static export; images are pre-sized by hand.
  images: { unoptimized: true },
  // A fixed build ID keeps the inline scripts byte-identical between builds,
  // so the CSP hashes in vercel.json stay valid (see scripts/csp.mjs).
  generateBuildId: async () => "portfolio",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
