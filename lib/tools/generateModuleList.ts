import { dirname, relative, resolve } from "path";

import { COMMENT } from "../constants.js";
import type { Mode } from "../types";
import { formatRelativePath } from "./formatRelativePath.js";
import { formatValue } from "./formatValue.js";
import { formatFilePathExtension } from "./formatFilePathExtension.js";

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
                formatFilePathExtension(filePath, mode.extension),
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
          const relativeFilePath = relative(
            outputRootPath,
            resolve(
              rootPath,
              formatFilePathExtension(filePath, mode.extension),
            ),
          );
          return `export${
            mode.language === "ts" && mode.type ? " type" : ""
          } { ${formatFilePathExtension(filePath)} } from ${formatRelativePath(
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
