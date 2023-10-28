import { readFile } from "fs/promises";

export async function readModule(filePath: string) {
  try {
    return await readFile(filePath, { encoding: "utf-8" });
  } catch (error) {
    return "";
  }
}
