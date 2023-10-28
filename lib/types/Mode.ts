import type { ModeCss } from "./ModeCss";
import type { ModeJs } from "./ModeJs";
import type { ModeTs } from "./ModeTs";

/**
 * Generation mode.
 */
export type Mode = ModeJs | ModeTs | ModeCss;
