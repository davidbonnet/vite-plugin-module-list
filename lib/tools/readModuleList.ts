import { readdir } from "fs/promises";
import { resolve } from "path";

import type { ModuleListOptions } from "../types";

export async function readModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
  include: NonNullable<ModuleListOptions["include"]>,
  exclude: NonNullable<ModuleListOptions["exclude"]>,
  outputPath: NonNullable<ModuleListOptions["outputPath"]>,
) {
  return (await readdir(rootPath)).filter((filePath) => {
    const extension = filePath.slice(filePath.lastIndexOf(".") + 1);
    if (extension === filePath) {
      return false;
    }
    if (
      !includeExtensions.some(
        (includedExtension) => includedExtension === extension,
      )
    ) {
      return false;
    }
    if (!include.test(filePath)) {
      return false;
    }
    if (exclude.test(filePath)) {
      return false;
    }
    const resolvedFilePath = resolve(rootPath, filePath);
    if (resolvedFilePath === outputPath) {
      return false;
    }
    return true;
  });
}
