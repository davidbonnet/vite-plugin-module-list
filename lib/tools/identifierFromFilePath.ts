import { basename, extname } from "path";

export function identifierFromFilePath(filePath: string): string {
  return basename(filePath, extname(filePath));
}
