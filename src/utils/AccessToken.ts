import * as fs from "fs/promises";
import * as path from "path";

import { Mutex } from "async-mutex";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { tempPath } from "assets";

interface TokenData {
  token: string;
  decodedToken: JwtPayload & { [key: string]: unknown };
}

export class TokenFileError extends Error {
  public originalError?: unknown;

  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = "TokenFileError";
    this.originalError = originalError;
  }
}

export default class AccessToken {
  private static readonly tokenFile = path.resolve(tempPath(), "access-token.json");
  private static readonly fileAccessMutex = new Mutex();

  /**
   * Reads and parses the token file safely.
   * MUST be called within a mutex lock.
   * @throws {TokenFileError} If the file cannot be read or parsed.
   */
  private static async readTokenData(): Promise<TokenData> {
    let fileContent: string;
    try {
      fileContent = await fs.readFile(this.tokenFile, "utf-8");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
        throw new TokenFileError("Token file not found.", error);
      } else if (error instanceof Error) {
        throw new TokenFileError(`Failed to read token file: ${error.message}`, error);
      } else {
        throw new TokenFileError("An unknown error occurred while reading the token file.", error);
      }
    }

    try {
      const parsedContent: unknown = JSON.parse(fileContent);

      if (
        typeof parsedContent !== "object" ||
        parsedContent === null ||
        typeof (parsedContent as TokenData).token !== "string" ||
        typeof (parsedContent as TokenData).decodedToken !== "object" ||
        (parsedContent as TokenData).decodedToken === null
      ) {
        throw new Error("Invalid token file structure");
      }

      const tokenContent = parsedContent as TokenData;
      return tokenContent;
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        throw new TokenFileError("Failed to parse token file (invalid JSON).", error);
      } else if (error instanceof Error) {
        throw new TokenFileError(`Failed to process token file content: ${error.message}`, error);
      } else {
        throw new TokenFileError("An unknown error occurred while processing the token file.", error);
      }
    }
  }

  /**
   * Checks if the stored access token has expired.
   * Returns true if the token is expired, doesn't exist, or is invalid.
   * @returns {Promise<boolean>} True if expired or invalid/missing, false otherwise.
   */
  public static async isExpired(): Promise<boolean> {
    return await this.fileAccessMutex.runExclusive(async () => {
      try {
        const tokenContent = await this.readTokenData();

        const currentTimeSeconds = Math.floor(Date.now() / 1000);
        const bufferSeconds = 5 * 60;

        if (typeof tokenContent.decodedToken.exp !== "number") {
          console.warn('Token file exists but is missing or has an invalid "exp" claim. Treating as expired.');
          return true;
        }

        return tokenContent.decodedToken.exp < currentTimeSeconds + bufferSeconds;
      } catch (error: unknown) {
        if (error instanceof TokenFileError && error.message.includes("not found")) {
          return true;
        } else if (error instanceof TokenFileError) {
          console.warn(`Error reading token file for expiration check: ${error.message}. Treating as expired.`);
          return true;
        } else if (error instanceof Error) {
          console.error(`Unexpected error during expiration check: ${error.message}`, error);
          return true;
        } else {
          console.error("Unknown error during expiration check:", error);
          return true;
        }
      }
    });
  }

  /**
   * Creates or overwrites the access token file.
   * @param {string} token - The JWT token string.
   * @throws {TokenFileError} If writing the file fails.
   * @throws {Error} If decoding the token fails.
   */
  public static async create(token: string): Promise<void> {
    await this.fileAccessMutex.runExclusive(async () => {
      let decodedToken: JwtPayload & { [key: string]: unknown };
      try {
        decodedToken = jwtDecode<JwtPayload & { [key: string]: unknown }>(token);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to decode JWT token: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred during JWT decoding.");
        }
      }

      const content: TokenData = {
        token,
        decodedToken,
      };

      try {
        await fs.writeFile(this.tokenFile, JSON.stringify(content, null, 4), "utf-8");
      } catch (error: unknown) {
        throw new TokenFileError("Failed to write token file.", error);
      }
    });
  }

  /**
   * Retrieves the stored access token string.
   * @returns {Promise<string>} The access token string.
   * @throws {TokenFileError} If the token file cannot be found, read, or parsed.
   */
  public static async getAccessToken(): Promise<string> {
    return await this.fileAccessMutex.runExclusive(async () => {
      const tokenContent = await this.readTokenData();
      return tokenContent.token;
    });
  }
}
