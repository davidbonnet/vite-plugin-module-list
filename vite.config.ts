import { resolve } from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

import moduleList from "./lib/main";

export default defineConfig({
  plugins: [
    moduleList({
      rootPath: resolve("src/pages"),
      outputPath: resolve("src/pages.ts"),
      formatOptions: {
        trailingComma: "all",
      },
    }),
    preact(),
  ],
  clearScreen: false,
  root: ".",
  build: {},
});
