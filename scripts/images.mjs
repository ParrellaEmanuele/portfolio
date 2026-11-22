#!/usr/bin/env node
/**
 * Converts screenshots into the WebP files the site uses.
 *
 *   images/work/<id>.png|jpg|jpeg|webp      →  public/work/<id>.webp
 *   images/projects/<id>.png|jpg|jpeg|webp  →  public/projects/<id>.webp
 *
 * Every image is cropped from the top to 16:10 and resized to 1200×750
 * (the size the cards declare, so there is no layout shift), WebP quality 80.
 * The originals in images/ are not committed (see .gitignore).
 *
 * Usage: npm run images
 */
import { mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const SIZE = { width: 1200, height: 750 };
const FOLDERS = ["work", "projects"];
const INPUT = /\.(png|jpe?g|webp)$/i;

let converted = 0;
for (const folder of FOLDERS) {
  const src = join("images", folder);
  if (!existsSync(src)) continue;
  const dest = join("public", folder);
  mkdirSync(dest, { recursive: true });

  for (const file of readdirSync(src).filter((f) => INPUT.test(f))) {
    const id = parse(file).name.toLowerCase();
    const out = join(dest, `${id}.webp`);
    const info = await sharp(join(src, file))
      .resize({ ...SIZE, fit: "cover", position: "top" })
      .webp({ quality: 80 })
      .toFile(out);
    converted++;
    console.log(`${out}  ${Math.round(info.size / 1024)} KB   → set image: "/${folder}/${id}.webp" in content/`);
  }
}

if (converted === 0) {
  console.log("No images found. Put PNG/JPG files in images/work/ or images/projects/ (see README).");
}
