import { readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { minify } = require("html-minifier-terser");
const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));

async function minifyHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await minifyHtmlFiles(filePath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const html = await readFile(filePath, "utf8");
      const minified = await minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
      await writeFile(filePath, minified, "utf8");
    }
  }
}

await minifyHtmlFiles(outputDirectory);
console.log("HTML minificado em dist/.");
