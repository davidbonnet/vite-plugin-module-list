import { type Options as FormatOptions } from "prettier";
import type { Mode } from "./Mode";

/**
 * Plugin options.
 */
export type ModuleListOptions = {
  /**
   * Specifies how the modules are listed and exported.
   *
   * @defaultValue "js"
   */
  mode?: Mode | Mode["language"];
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
   * Regular expression that matches file names to include. Files that do not match will be excluded.
   *
   * @defaultValue `/(?:)/`
   */
  include?: RegExp;
  /**
   * Regular expression that matches file names to exclude. Files that match the `include` regular expression but match the `exclude` regular expression will be excluded.
   *
   * @defaultValue `/\.(?:tests?|spec)\.[^.]+$/`
   */
  exclude?: RegExp;
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
