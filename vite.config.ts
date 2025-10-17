import { resolve } from "node:path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import moduleList from "vite-plugin-module-list";

export default defineConfig({
  base: "/",
  build: {
    emptyOutDir: true,
    outDir: resolve("public"),
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[ext]",
        chunkFileNames: "[hash].js",
        entryFileNames: "[hash].js",
      },
    },
    sourcemap: true,
  },
  clearScreen: false,
  plugins: [
    // Library
    moduleList({
      rootPath: resolve("lib/types"),
      outputPath: resolve("lib/types.ts"),
      mode: { language: "ts", type: true },
    }),
    moduleList({
      rootPath: resolve("lib/tools"),
      outputPath: resolve("lib/tools.ts"),
      mode: { language: "ts", extension: "js" },
    }),
    moduleList({
      rootPath: resolve("lib/constants"),
      outputPath: resolve("lib/constants.ts"),
      mode: { language: "ts", extension: "js" },
    }),
    // Demo
    moduleList({
      rootPath: resolve("src/pages"),
      outputPath: resolve("src/pages.ts"),
      formatOptions: {
        trailingComma: "all",
      },
      recursive: true,
      mode: {
        language: "ts",
        dynamic: true,
      },
    }),
    moduleList({
      rootPath: resolve("src/icons"),
      includeExtensions: ["tsx"],
      outputPath: resolve("src/icons.ts"),
      mode: "ts",
    }),
    moduleList({
      rootPath: resolve("src/types"),
      outputPath: resolve("src/types.ts"),
      mode: { language: "ts", type: true },
    }),
    moduleList({
      rootPath: resolve("src/pages"),
      includeExtensions: ["css"],
      outputPath: resolve("src/pages.css"),
      mode: "css",
    }),
    preact(),
  ],
  publicDir: "src/public",
  root: ".",
  build: {},
});
