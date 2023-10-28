import normalizePath from "normalize-path";

import { formatValue } from "./formatValue.js";

export function formatRelativePath(path: string) {
  return formatValue(`./${normalizePath(path, false)}`);
}
