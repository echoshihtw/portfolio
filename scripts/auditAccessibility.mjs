// Runs axe against the built site and fails if it finds a WCAG 2.2 AA
// violation. A skills list can claim accessibility; this checks it.
//
// axe catches perhaps a third of what matters, so this is a floor and not a
// pass mark. The things it cannot see, keyboard order, focus visibility and
// heading structure, are asserted in e2e/accessibility.spec.ts.
//
//   npm run build && npm run audit:a11y
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const ROOT = path.join(process.cwd(), "build");
const PORT = 4319;
const ROUTES = [
  "/",
  "/paintings",
  "/blog",
  "/blog/dont-fight-the-tools-defaults",
];
const THEMES = ["dark", "light"];

// WCAG 2.2 Level AA, the standard the site claims to meet.
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

if (!fs.existsSync(ROOT)) {
  console.error("build/ not found. Run `npm run build` first.");
  process.exit(1);
}

// Serves build/ the way the host does, resolving /blog to blog.html the way
// Vercel's cleanUrls setting does.
const server = http.createServer((req, res) => {
  res.setHeader("Connection", "close");
  const url = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(ROOT, url);
  if (fs.existsSync(file + ".html")) file += ".html";
  else if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    return res.end("not found");
  }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
  });
  fs.createReadStream(file).pipe(res);
});
server.keepAliveTimeout = 1000;
await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await chromium.launch();
const found = new Map();

for (const theme of THEMES) {
  for (const route of ROUTES) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    // The gate is a once-per-session splash; every route behind it is what
    // needs auditing.
    await page.addInitScript((t) => {
      try {
        sessionStorage.setItem("echo-gate-seen", "1");
        localStorage.setItem("echo-theme", t);
      } catch {
        // Private mode: the audit still runs, just in the default theme.
      }
    }, theme);
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1200);

    const { violations } = await new AxeBuilder({ page })
      .withTags(TAGS)
      .analyze();
    for (const v of violations) {
      const key = `${v.impact}|${v.id}|${v.help}`;
      if (!found.has(key))
        found.set(key, { nodes: 0, where: new Set(), sample: v.nodes[0] });
      const entry = found.get(key);
      entry.nodes += v.nodes.length;
      entry.where.add(`${theme}${route}`);
    }
    await page.close();
    await context.close();
  }
}

await browser.close();
server.close();

const pages = ROUTES.length * THEMES.length;
if (!found.size) {
  console.log(`✅ no WCAG 2.2 AA violations across ${pages} page renders`);
  process.exit(0);
}

for (const [key, entry] of [...found].sort()) {
  const [impact, id, help] = key.split("|");
  console.error(`\n[${impact}] ${id}`);
  console.error(`  ${help}`);
  console.error(`  ${entry.nodes} node(s), on: ${[...entry.where].join(", ")}`);
  console.error(`  target: ${entry.sample.target.join(" ")}`);
  const why =
    entry.sample.any?.[0]?.message ||
    entry.sample.all?.[0]?.message ||
    entry.sample.none?.[0]?.message;
  if (why) console.error(`  why: ${why.slice(0, 200)}`);
}
console.error(`\n❌ ${found.size} distinct violation(s)`);
process.exit(1);
