import { writeFile } from "fs/promises";
import { format } from "prettier";

import type { Mode, ModuleListOptions } from "../types";

import { generateModuleList } from "./generateModuleList.js";
import { readModuleList } from "./readModuleList.js";
import { readModule } from "./readModule.js";

export async function writeModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
  include: NonNullable<ModuleListOptions["include"]>,
  exclude: NonNullable<ModuleListOptions["exclude"]>,
  outputPath: NonNullable<ModuleListOptions["outputPath"]>,
  formatOptions: ModuleListOptions["formatOptions"] = {},
  mode: Mode,
  recursive: boolean = false,
) {
  const moduleList = generateModuleList(
    await readModuleList(
      rootPath,
      includeExtensions,
      include,
      exclude,
      outputPath,
      recursive,
    ),
    rootPath,
    outputPath,
    mode,
  );
  const moduleListContent =
    formatOptions === false
      ? moduleList
      : await format(moduleList, {
          filepath: outputPath,
          ...formatOptions,
        });
  const previousModuleListContent = await readModule(outputPath);
  if (moduleListContent === previousModuleListContent) {
    return;
  }
  await writeFile(outputPath, moduleListContent);
}
