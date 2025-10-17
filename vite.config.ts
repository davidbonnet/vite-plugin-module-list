import { resolve } from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

import moduleList from "./lib/main";

export default defineConfig({
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
  clearScreen: false,
  root: ".",
  build: {},
});
