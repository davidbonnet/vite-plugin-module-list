import type { PluginOption } from "vite";
import { resolve } from "path";

import type { ModuleListOptions } from "../types";

import { normalizeMode } from "./normalizeMode.js";
import { writeModuleList } from "./writeModuleList.js";

/**
 * Vite plugin that writes a module that imports modules found in a folder.
 *
 * @param options See {@link ModuleListOptions}
 * @returns A vite plugin that writes a module that imports modules found in a folder.
 */
export function moduleList({
  mode = "js",
  rootPath = ".",
  includeExtensions = ["js", "ts", "jsx", "tsx"],
  include = /(?:)/,
  exclude = /\.(?:tests?|spec)\.[^.]+$/,
  outputPath = `${rootPath}/main.ts`,
  formatOptions,
  watch = true,
}: ModuleListOptions): PluginOption {
  const resolvedRootPath = resolve(rootPath);
  const normalizedMode = normalizeMode(mode);
  return {
    name: "module-list",
    async config() {
      await writeModuleList(
        rootPath,
        includeExtensions,
        include,
        exclude,
        outputPath,
        formatOptions,
        normalizedMode,
      );
    },
    async configureServer(server) {
      await writeModuleList(
        rootPath,
        includeExtensions,
        include,
        exclude,
        outputPath,
        formatOptions,
        normalizedMode,
      );
      if (!watch) {
        return;
      }
      server.watcher.on("all", async (eventName, filePath) => {
        if (eventName !== "add" && eventName !== "unlink") {
          return;
        }
        const resolvedFilePath = resolve(filePath);
        if (
          resolvedFilePath === outputPath ||
          !resolvedFilePath.startsWith(resolvedRootPath)
        ) {
          return;
        }
        await writeModuleList(
          rootPath,
          includeExtensions,
          include,
          exclude,
          outputPath,
          formatOptions,
          normalizedMode,
        );
      });
    },
  };
}
