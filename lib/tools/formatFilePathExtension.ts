import { basename, extname } from "path";

export function formatFilePathExtension(
  filePath: string,
  extension: boolean | string = false,
) {
  if (extension === true) {
    return filePath;
  }
  const filePathWithoutExtension = basename(filePath, extname(filePath));
  if (!extension) {
    return filePathWithoutExtension;
  }
  return `${filePathWithoutExtension}.${extension}`;
}
