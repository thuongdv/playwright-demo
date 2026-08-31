import * as fs from "node:fs";

export default class FileUtils {
  /**
   * Reads a file and returns its content as an array of lines
   * @param filePath - Path to the text file
   * @returns An array where each element is a line from the file
   */
  static async readLines(filePath: string): Promise<string[]> {
    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      return data.split("\n");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to read file lines: ${errorMessage}`, { cause: error });
    }
  }

  /**
   * Appends content to the first line of a text file
   * @param filePath - Path to the text file
   * @param content - Content to append to the first line
   */
  static async appendToFirstLine(filePath: string, content: string): Promise<void> {
    try {
      // Read the entire file
      const data = await fs.promises.readFile(filePath, "utf8");

      // Split the content into lines
      const lines = data.split("\n");

      if (lines.length === 0) {
        // If file is empty, just write the content
        await fs.promises.writeFile(filePath, content);
        return;
      }

      // Append the content to the first line with a newline character
      lines[0] = lines[0] + "\n" + content;

      // Join the lines back together
      const newContent = lines.join("\n");

      // Write the modified content back to the file
      await fs.promises.writeFile(filePath, newContent);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to append content to first line: ${errorMessage}`, { cause: error });
    }
  }

  /**
   * Appends a string as a new line to the end of a text file
   * @param filePath - Path to the text file
   * @param content - Content to append as a new line
   */
  static async appendLine(filePath: string, content: string): Promise<void> {
    try {
      await fs.promises.appendFile(filePath, `\n${content}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to append line to file: ${errorMessage}`, { cause: error });
    }
  }

  static async doesFileContain(filePath: string, automatedQueue: string): Promise<boolean> {
    if (!(await FileUtils.isFileExists(filePath))) {
      return false;
    }

    return await FileUtils.readLines(filePath)
      .then((lines) => {
        return lines.some((line) => line.includes(automatedQueue));
      })
      .catch((error) => {
        console.error("Error reading file:", error);
        return false;
      });
  }

  static async isFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
}
