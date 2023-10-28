import { basename, dirname, extname, relative, resolve } from "path";

import { COMMENT } from "../constants";
import type { Mode } from "../types";
import { formatRelativePath } from "./formatRelativePath";
import { formatValue } from "./formatValue";

export function generateModuleList(
  filePathList: string[],
  rootPath: string,
  outputPath: string,
  mode: Mode,
) {
  const outputRootPath = dirname(outputPath);
  switch (mode.language) {
    case "ts":
    case "js": {
      if (mode.dynamic) {
        const moduleList = `[ ${filePathList
          .map((filePath) => {
            const relativeFilePath = relative(
              outputRootPath,
              resolve(
                rootPath,
                mode.extension
                  ? filePath
                  : basename(filePath, extname(filePath)),
              ),
            );
            return `{ path: ${formatValue(
              filePath,
            )}, module: () => import(${formatRelativePath(
              relativeFilePath,
            )}) }`;
          })
          .join(",")} ]`;
        return `// ${COMMENT}\nexport default ${moduleList}\n`;
      }
      const moduleList = filePathList
        .map((filePath) => {
          const filePathWithoutExtension = basename(
            filePath,
            extname(filePath),
          );
          const relativeFilePath = relative(
            outputRootPath,
            resolve(
              rootPath,
              mode.extension ? filePath : filePathWithoutExtension,
            ),
          );
          return `export${
            mode.language === "ts" && mode.type ? " type" : ""
          } { ${filePathWithoutExtension} } from ${formatRelativePath(
            relativeFilePath,
          )}`;
        })
        .join("\n");
      return `// ${COMMENT}\n${moduleList}\n`;
    }
    case "css": {
      const moduleList = filePathList
        .map((filePath) => {
          const relativeFilePath = relative(
            outputRootPath,
            resolve(rootPath, filePath),
          );
          return `@import ${formatRelativePath(relativeFilePath)};`;
        })
        .join("\n");
      return `/* ${COMMENT} */\n${moduleList}\n`;
    }
    default:
      throw new Error(`Unsupported language '${(mode as any).language}'`);
  }
}