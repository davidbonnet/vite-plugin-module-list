import { readdir, writeFile } from "fs/promises";
import { dirname, relative, resolve } from "path";

import normalizePath from "normalize-path";
import { type Options as FormatOptions, format } from "prettier";
import { type PluginOption } from "vite";

const COMMENT = "File automatically generated by `vite-plugin-module-list`";

/**
 * Plugin options.
 */
export type ModuleListOptions = {
  /**
   * Specifies how the modules are listed and exported.
   *
   * @defaultValue "full-dynamic"
   */
  mode?: Mode;
  /**
   * Path to the folder containing the modules to list.
   *
   * @defaultValue `"."`
   */
  rootPath?: string;
  /**
   * Module file name extensions to include. Files with other extensions are ignored.
   *
   * @defaultValue `["js", "ts", "jsx", "tsx"]`
   */
  includeExtensions?: string[];
  /**
   * Path to the module into wich the module list is written.
   *
   * @defaultValue `${rootPath}/main.ts`.
   */
  outputPath?: string;
  /**
   * Prettier options. If explicitely set to false, the code is not formatted.
   *
   * @see {@link FormatOptions} for the list of options.
   */
  formatOptions?: FormatOptions | false;
};

/**
 * Generation mode:
 * - `full-dynamic`: Every found module is listed in an array with a `{ path, module: () => import() }` object description, `module` being a callback that does a dynamic import.
 * - `named-static`: Every found module has a reference of the same module name being re-exported.
 * - `named-static-no-extension`: Same as `named-static` except that imports do not include the file name extension.
 * - `css-module`: Every found module is imported as a CSS module using the `@import` statement.
 */
export type Mode =
  | "full-dynamic"
  | "named-static"
  | "named-static-no-extension"
  | "css-module";

const { stringify: formatValue } = JSON;

function formatRelativePath(path: string) {
  return formatValue(`./${normalizePath(path, false)}`);
}

function generateModuleList(
  filePathList: string[],
  rootPath: string,
  outputPath: string,
  mode: Mode,
) {
  const outputRootPath = dirname(outputPath);
  switch (mode) {
    case "full-dynamic": {
      const moduleList = `[ ${filePathList
        .map((filePath) => {
          const relativeFilePath = relative(
            outputRootPath,
            resolve(rootPath, filePath),
          );
          return `{ path: ${formatValue(
            filePath,
          )}, module: () => import(${formatRelativePath(relativeFilePath)}) }`;
        })
        .join(",")} ]`;
      return `// ${COMMENT}\nexport default ${moduleList}\n`;
    }
    case "named-static": {
      const moduleList = filePathList
        .map((filePath) => {
          const relativeFilePath = relative(
            outputRootPath,
            resolve(rootPath, filePath),
          );
          return `export { ${filePath.slice(
            0,
            filePath.lastIndexOf("."),
          )} } from ${formatRelativePath(relativeFilePath)}`;
        })
        .join("\n");
      return `// ${COMMENT}\n${moduleList}\n`;
    }
    case "named-static-no-extension": {
      const moduleList = filePathList
        .map((filePath) => {
          const filePathWithoutExtension = filePath.slice(
            0,
            filePath.lastIndexOf("."),
          );
          const relativeFilePath = relative(
            outputRootPath,
            resolve(rootPath, filePathWithoutExtension),
          );
          return `export { ${filePathWithoutExtension} } from ${formatRelativePath(
            relativeFilePath,
          )}`;
        })
        .join("\n");
      return `// ${COMMENT}\n${moduleList}\n`;
    }
    case "css-module": {
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
  }
}

async function readModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
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
    const resolvedFilePath = resolve(rootPath, filePath);
    if (resolvedFilePath === outputPath) {
      return false;
    }
    return true;
  });
}

async function writeModuleList(
  rootPath: NonNullable<ModuleListOptions["rootPath"]>,
  includeExtensions: NonNullable<ModuleListOptions["includeExtensions"]>,
  outputPath: NonNullable<ModuleListOptions["outputPath"]>,
  formatOptions: ModuleListOptions["formatOptions"] = {},
  mode: NonNullable<ModuleListOptions["mode"]>,
) {
  const moduleList = await generateModuleList(
    await readModuleList(rootPath, includeExtensions, outputPath),
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

/**
 *
 * @param options See {@link ModuleListOptions}
 * @returns A vite plugin that writes a module that dynamically imports modules found in a folder.
 */
export default function moduleList({
  mode = "full-dynamic",
  rootPath = ".",
  includeExtensions = ["js", "ts", "jsx", "tsx"],
  outputPath = `${rootPath}/main.ts`,
  formatOptions,
}: ModuleListOptions): PluginOption {
  const resolvedRootPath = resolve(rootPath);
  return {
    name: "module-list",
    async configureServer(server) {
      await writeModuleList(
        rootPath,
        includeExtensions,
        outputPath,
        formatOptions,
        mode,
      );
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
          outputPath,
          formatOptions,
          mode,
        );
      });
    },
  };
}
