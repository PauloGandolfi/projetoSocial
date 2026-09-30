import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: resolve(projectRoot, "html"),
  input: {
    home: resolve(projectRoot, "html/index.html"),
    projetos: resolve(projectRoot, "html/projetos.html"),
    cadastro: resolve(projectRoot, "html/cadastro.html"),
  },
  build: {
    outDir: resolve(projectRoot, "dist"),
    emptyOutDir: true,
    minify: "oxc",
    cssMinify: true,
  },
});
