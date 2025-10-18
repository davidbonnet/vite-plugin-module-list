import { resolve } from "node:path";

import preact from "@preact/preset-vite";
import moduleList from "vite-plugin-module-list";
import { defineConfig } from "vitest/config";

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
      mode: { language: "ts", type: true },
      outputPath: resolve("lib/types.ts"),
      rootPath: resolve("lib/types"),
    }),
    moduleList({
      mode: { extension: "js", language: "ts" },
      outputPath: resolve("lib/tools.ts"),
      rootPath: resolve("lib/tools"),
    }),
    moduleList({
      mode: { extension: "js", language: "ts" },
      outputPath: resolve("lib/constants.ts"),
      rootPath: resolve("lib/constants"),
    }),
    // Demo
    moduleList({
      formatOptions: {
        trailingComma: "all",
      },
      mode: {
        dynamic: true,
        language: "ts",
      },
      outputPath: resolve("src/pages.ts"),
      recursive: true,
      rootPath: resolve("src/pages"),
    }),
    moduleList({
      includeExtensions: ["tsx"],
      mode: "ts",
      outputPath: resolve("src/icons.ts"),
      rootPath: resolve("src/icons"),
    }),
    moduleList({
      mode: { language: "ts", type: true },
      outputPath: resolve("src/types.ts"),
      rootPath: resolve("src/types"),
    }),
    moduleList({
      includeExtensions: ["css"],
      mode: "css",
      outputPath: resolve("src/pages.css"),
      rootPath: resolve("src/pages"),
    }),
    preact(),
  ],
  publicDir: "src/public",
  root: ".",
  test: {
    exclude: ["node_modules/**", "src/**"],
  },
});
