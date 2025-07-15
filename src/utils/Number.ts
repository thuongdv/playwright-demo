export default class NumberUtils {
  static getRandomNumbersInRange(min: number, max: number, count: number): number[] {
    if (count > max - min + 1) {
      throw new Error("Count exceeds the number of unique values in range");
    }

    const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    // Shuffle the range
    for (let i = range.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [range[i], range[j]] = [range[j], range[i]];
    }

    return range.slice(0, count);
  }

  /**
   * Extracts and returns only the numeric characters (digits and decimal points) from the given string.
   * Trims any leading or trailing whitespace before extraction.
   * If no numeric characters are found, returns an empty string.
   *
   * @param stringNumber - The input string potentially containing numbers and other characters.
   * @returns A string containing only the digits and decimal points from the input, or an empty string if none are found.
   *
   * @example
   * NumberUtils.extractNumber(" $1,234.56 ") // returns "1234.56"
   * NumberUtils.extractNumber("abc123xyz")   // returns "123"
   * NumberUtils.extractNumber("no numbers")  // returns ""
   */
  static extractNumber(stringNumber: string): string {
    return stringNumber.trim().replace(/[^0-9.]/g, "");
  }
}
