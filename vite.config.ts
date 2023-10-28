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
  clearScreen: false,
  root: ".",
  build: {},
});
