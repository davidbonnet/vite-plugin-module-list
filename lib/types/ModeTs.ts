/**
 * TypeScript mode.
 */
export type ModeTs = {
  /**
   * Generate a TypeScript module.
   */
  language: "ts";
  /**
   * Generate a module that dynamically imports the module.
   */
  dynamic?: true;
  /**
   * Include the module file name extension when importing the module.
   * Can be set to "js" to use this file extension instead of "ts".
   */
  extension?: true | "js";
  /**
   * Use the `type` keyword when importing the module.
   */
  type?: true;
};
