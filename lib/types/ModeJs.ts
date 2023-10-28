/**
 * JavaScript mode.
 */
export type ModeJs = {
  /**
   * Generate a JavaScript module.
   */
  language: "js";
  /**
   * Generate a module that dynamically imports the module.
   */
  dynamic?: true;
  /**
   * Include the module file name extension when importing the module.
   */
  extension?: true;
};
