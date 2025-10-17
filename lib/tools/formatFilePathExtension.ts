import { extname } from "path";

export function formatFilePathExtension(
  filePath: string,
  extension: boolean | string = false,
) {
  if (extension === true) {
    return filePath;
  }
  // const currentExtension = filePath.slice(filePath.lastIndexOf("."));
  const currentExtension = extname(filePath);
  const filePathWithoutExtension = !currentExtension
    ? filePath
    : filePath.slice(0, -currentExtension.length);
  if (!extension) {
    return filePathWithoutExtension;
  }
  return `${filePathWithoutExtension}.${extension}`;
}
