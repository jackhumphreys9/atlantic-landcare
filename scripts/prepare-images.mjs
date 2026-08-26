#!/usr/bin/env node
/**
 * Turns raw phone photos into web-ready images.
 *
 * Drop originals into assets-raw/ (gitignored, never deployed) and run:
 *   npm run prepare:images
 *
 * For each image this:
 *   1. detects and crops off the black letterbox bars iOS screenshots come with,
 *   2. caps the long edge so we're not shipping 12-megapixel photos,
 *   3. re-encodes as JPEG,
 *   4. writes the result to public/<name>.jpg.
 *
 * Originals stay in assets-raw/ untouched, so this is always safe to re-run.
 *
 * Uses macOS `sips` for the pixel work — no npm image dependency.
 */

import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import { promisify } from "node:util";
import { decodePng, findBars } from "./lib/png-bars.mjs";

const run = promisify(execFile);
const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "assets-raw");
const PUBLIC = join(ROOT, "public");
const TMP = join(ROOT, "node_modules", ".cache", "prepare-images");

const MAX_EDGE = 1800; // plenty for a full-bleed photo on a retina laptop
const QUALITY = 78;
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".heic"]);

/**
 * The detected bar edge is often a row or two of not-quite-black gradient rather
 * than a hard cut. Left in, those rows survive the downscale as a visible dark
 * line along the bottom of the frame, so trim a few extra pixels past whatever
 * the detector found.
 */
const INSET = 10;

/**
 * Per-file overrides, keyed by filename stem.
 *
 * The logo never renders above ~200px on the page, so it doesn't need the photo
 * dimensions. It stays JPEG: the artwork has a textured background and gradient
 * sun, which PNG stores far less efficiently than a photo codec.
 */
const OVERRIDES = {
  logo: { maxEdge: 640 },
};

const sips = (args) => run("sips", args);
const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function dimensions(path) {
  const { stdout } = await sips(["-g", "pixelWidth", "-g", "pixelHeight", path]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(stdout.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return { width, height };
}

await mkdir(TMP, { recursive: true });

let entries;
try {
  entries = await readdir(RAW);
} catch {
  console.error(`No assets-raw/ directory. Create it and put the original photos there.`);
  process.exit(1);
}

const images = entries.filter((name) => IMAGE_EXT.has(extname(name).toLowerCase()));
if (images.length === 0) {
  console.log("No images in assets-raw/ — nothing to do.");
  process.exit(0);
}

for (const name of images) {
  const source = join(RAW, name);
  const stem = basename(name, extname(name));
  const { format = "jpeg", maxEdge = MAX_EDGE } = OVERRIDES[stem] ?? {};
  const target = join(PUBLIC, `${stem}.${format === "png" ? "png" : "jpg"}`);

  // The bar detector reads PNG only, so convert anything else to a scratch PNG
  // first. This copy is only ever used for measurement.
  let probe = source;
  if (extname(name).toLowerCase() !== ".png") {
    probe = join(TMP, `${stem}.png`);
    await sips(["-s", "format", "png", source, "--out", probe]);
  }

  const detected = findBars(decodePng(await readFile(probe)));
  const bars = {
    top: detected.top > 0 ? detected.top + INSET : 0,
    bottom: detected.bottom > 0 ? detected.bottom + INSET : 0,
  };
  bars.offsetY = bars.top;
  bars.cropHeight = detected.cropHeight - (bars.top - detected.top) - (bars.bottom - detected.bottom);

  // sips edits in place, so work on a copy and leave the original alone.
  const scratch = join(TMP, `${stem}-work.png`);
  await sips(["-s", "format", "png", source, "--out", scratch]);

  if (bars.top > 0 || bars.bottom > 0) {
    const { width } = decodePng(await readFile(scratch));
    await sips([
      "-c",
      String(bars.cropHeight),
      String(width),
      "--cropOffset",
      String(bars.offsetY),
      "0",
      scratch,
    ]);
  }

  // Only ever shrink. `sips -Z` resizes the long edge to the target in both
  // directions, and upscaling a cropped screenshot just invents pixels and
  // inflates the file.
  const size = await dimensions(scratch);
  if (Math.max(size.width, size.height) > maxEdge) {
    await sips(["-Z", String(maxEdge), scratch]);
  }
  await sips([
    "-s",
    "format",
    format,
    ...(format === "jpeg" ? ["-s", "formatOptions", String(QUALITY)] : []),
    scratch,
    "--out",
    target,
  ]);

  const before = (await stat(source)).size;
  const after = (await stat(target)).size;
  const cropped =
    bars.top || bars.bottom ? `cropped ${bars.top}px/${bars.bottom}px bars, ` : "";
  console.log(
    `${name} → public/${basename(target)}  (${cropped}${kb(before)} → ${kb(after)})`,
  );
}

await rm(TMP, { recursive: true, force: true });
console.log(`\nDone. ${images.length} image${images.length === 1 ? "" : "s"} written.`);
