import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  input: {
    home: resolve(projectRoot, "html/index.html"),
    projetos: resolve(projectRoot, "html/projetos.html"),
    cadastro: resolve(projectRoot, "html/cadastro.html"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "oxc",
    cssMinify: true,
  },
});
