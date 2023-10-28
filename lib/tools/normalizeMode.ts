import type { Mode } from "../types";

export function normalizeMode(mode: Mode | Mode["language"]): Mode {
  return typeof mode === "string" ? { language: mode } : mode;
}
