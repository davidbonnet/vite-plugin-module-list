import { writeFile } from "fs/promises";
import { format } from "prettier";

import type { Mode, ModuleListOptions } from "../types";

import { generateModuleList } from "./generateModuleList.js";
import { readModuleList } from "./readModuleList.js";

export async function writeModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
  include: NonNullable<ModuleListOptions["include"]>,
  exclude: NonNullable<ModuleListOptions["exclude"]>,
  outputPath: NonNullable<ModuleListOptions["outputPath"]>,
  formatOptions: ModuleListOptions["formatOptions"] = {},
  mode: Mode,
) {
  const moduleList = generateModuleList(
    await readModuleList(
      rootPath,
      includeExtensions,
      include,
      exclude,
      outputPath,
    ),
    rootPath,
    outputPath,
    mode,
  );
  await writeFile(
    outputPath,
    formatOptions === false
      ? moduleList
      : await format(moduleList, {
          filepath: outputPath,
          ...formatOptions,
        }),
  );
}
