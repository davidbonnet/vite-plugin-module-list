import { readdir } from "fs/promises";
import { resolve, join, extname } from "path";

import type { ModuleListOptions } from "../types";

export async function readModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
  include: NonNullable<ModuleListOptions["include"]>,
  exclude: NonNullable<ModuleListOptions["exclude"]>,
  outputPath: NonNullable<ModuleListOptions["outputPath"]>,
  recursive: NonNullable<ModuleListOptions["recursive"]>,
): Promise<readonly string[]> {
  return (await readdir(rootPath, { recursive, withFileTypes: true })).reduce(
    (result, file) => {
      if (!file.isFile()) {
        return result;
      }
      const filePath = join(file.path, file.name);
      const extension = extname(filePath).slice(1);
      if (
        !includeExtensions.some(
          (includedExtension) => includedExtension === extension,
        )
      ) {
        return result;
      }
      if (!include.test(filePath)) {
        return result;
      }
      if (exclude.test(filePath)) {
        return result;
      }
      const resolvedFilePath = resolve(rootPath, filePath);
      if (resolvedFilePath === outputPath) {
        return result;
      }
      result.push(filePath);
      return result;
    },
    [] as string[],
  );
}
