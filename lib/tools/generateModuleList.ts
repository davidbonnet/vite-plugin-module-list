import { dirname, relative, resolve } from "path";

import { COMMENT } from "../constants.js";
import type { Mode } from "../types";

import { formatFilePathExtension } from "./formatFilePathExtension.js";
import { formatRelativePath } from "./formatRelativePath.js";
import { formatValue } from "./formatValue.js";
import { identifierFromFilePath } from "./identifierFromFilePath.js";

export function generateModuleList(
  filePathList: readonly string[],
  rootPath: string,
  outputPath: string,
  mode: Mode,
) {
  const outputRootPath = dirname(outputPath);
  switch (mode.language) {
    case "ts":
    case "js": {
      if (mode.dynamic) {
        const moduleList = `[\n${filePathList
          .map((filePath) => {
            const relativeFilePath = relative(
              outputRootPath,
              resolve(
                rootPath,
                formatFilePathExtension(filePath, mode.extension),
              ),
            );
            return `  { path: ${formatValue(
              relativeFilePath,
            )}, module: () => import(${formatRelativePath(
              relativeFilePath,
            )}) }`;
          })
          .join(",\n")}\n]`;
        return `// ${COMMENT}\nexport default ${moduleList};\n`;
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
          } { ${identifierFromFilePath(filePath)} } from ${formatRelativePath(
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
