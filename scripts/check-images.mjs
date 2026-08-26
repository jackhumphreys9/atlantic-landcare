#!/usr/bin/env node
/**
 * Verifies that every image path referenced in src/ actually exists in public/.
 *
 * Next.js won't fail a build over a missing image — you just get a broken
 * picture on the live site. This catches it before deploy instead.
 *
 * Run with: npm run check:images
 */

import { readdir, readFile, access } from "node:fs/promises";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

/** Matches "/some/path.jpg" style string literals. */
const IMAGE_PATH = /["'`](\/[\w\-./]+\.(?:jpg|jpeg|png|webp|avif|svg))["'`]/gi;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const exists = (path) =>
  access(path).then(
    () => true,
    () => false,
  );

const sourceFiles = (await walk(SRC)).filter((file) => /\.(tsx?|jsx?)$/.test(file));

/** Map of image path -> the source files that reference it. */
const referenced = new Map();
for (const file of sourceFiles) {
  const contents = await readFile(file, "utf8");
  for (const [, path] of contents.matchAll(IMAGE_PATH)) {
    const relative = file.slice(ROOT.length + 1);
    referenced.set(path, [...(referenced.get(path) ?? []), relative]);
  }
}

const missing = [];
for (const [path, sources] of referenced) {
  if (!(await exists(join(PUBLIC, path)))) missing.push({ path, sources });
}

const total = referenced.size;
if (missing.length === 0) {
  console.log(`✓ All ${total} referenced image${total === 1 ? "" : "s"} found in public/.`);
  process.exit(0);
}

console.error(
  `\n✗ ${missing.length} of ${total} referenced images are missing from public/:\n`,
);
for (const { path, sources } of missing) {
  console.error(`  public${path}`);
  console.error(`      referenced by ${[...new Set(sources)].join(", ")}`);
}
console.error("\nAdd the files at those exact paths, then run this again.\n");
process.exit(1);
