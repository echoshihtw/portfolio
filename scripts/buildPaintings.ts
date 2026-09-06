// Generates the committed painting derivatives from Echo's originals.
//
// The originals live outside the repo and are not committed. Only the
// derivatives ship. Set PAINTINGS_SRC to point at the originals folder.
//
// macOS only: it shells out to `swift scripts/imagetool.swift`, which uses
// Core Image. That is fine, because this is a local generator whose output
// is committed, the same arrangement as `npm run build-icons`. CI never runs
// it and a normal build needs no extra step.
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import {
  derivativeName,
  paintingsConfig,
  WIDTHS,
  type Painting,
} from "../src/content/paintings.config.js";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "static", "assets", "paintings");
const TOOL = path.join(ROOT, "scripts", "imagetool.swift");
const DEFAULT_SRC = path.join(
  process.env.HOME ?? "",
  "Documents/Personal/media/my_paintings"
);

/** Everything that would produce a broken page, checked before any work. */
export function validateManifest(items: Painting[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  // Rounded: 0.5 + 0.8 is 1.3000000000000000444 in binary floating point,
  // and an error message is not the place to show that.
  const round = (n: number) => Math.round(n * 1000) / 1000;

  for (const item of items) {
    if (seen.has(item.id)) {
      problems.push(`duplicate id: ${item.id}`);
      continue;
    }
    seen.add(item.id);

    if (!item.alt.trim()) problems.push(`${item.id}: alt is required`);

    const [x, y, w, h] = item.crop;
    if (x + w > 1) {
      problems.push(
        `${item.id}: crop runs off the right edge (x + w = ${round(x + w)})`
      );
    }
    if (y + h > 1) {
      problems.push(
        `${item.id}: crop runs off the bottom edge (y + h = ${round(y + h)})`
      );
    }
  }
  return problems;
}

function main() {
  const srcDir = process.env.PAINTINGS_SRC ?? DEFAULT_SRC;

  const problems = validateManifest(paintingsConfig);
  if (problems.length) {
    throw new Error(`paintings.config.ts:\n  ${problems.join("\n  ")}`);
  }

  if (!fs.existsSync(srcDir)) {
    throw new Error(
      `originals not found at ${srcDir}. Set PAINTINGS_SRC to the folder holding them.`
    );
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const item of paintingsConfig) {
    const source = path.join(srcDir, item.source);
    if (!fs.existsSync(source)) {
      throw new Error(`${item.id}: source not found: ${source}`);
    }
    for (const width of WIDTHS) {
      execFileSync(
        "swift",
        [
          TOOL,
          source,
          path.join(OUT_DIR, derivativeName(item.id, width)),
          ...item.crop.map(String),
          String(width),
        ],
        { stdio: "inherit" }
      );
    }
    console.log(`✓ ${item.id}`);
  }

  console.log(
    `\n${paintingsConfig.length} paintings, ${WIDTHS.length} widths each, in static/assets/paintings/`
  );
}

// Same guard buildResume.ts uses, so the two scripts agree on what "run
// directly" means.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
