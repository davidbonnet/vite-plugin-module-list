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
    moduleList({
      rootPath: resolve("src/icons"),
      includeExtensions: ["tsx"],
      outputPath: resolve("src/icons.ts"),
      mode: "named-static-no-extension",
    }),
    moduleList({
      rootPath: resolve("src/pages"),
      includeExtensions: ["css"],
      outputPath: resolve("src/pages.css"),
      mode: "css-module",
      formatOptions: false,
    }),
    preact(),
  ],
  clearScreen: false,
  root: ".",
  build: {},
});
