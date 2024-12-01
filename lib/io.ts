import { file } from "bun";

/**
 * Reads a file and returns an array of strings.
 * @param filename The name of the file to read.
 * @returns An array of strings.
 */
async function readFile(filename: string): Promise<string[]> {
  const data = await file(filename).text();
  return data.trim().split("\n");
}

export { readFile };
