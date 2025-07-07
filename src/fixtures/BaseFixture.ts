import { expect as baseExpect, Locator } from "@playwright/test";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }): Promise<any> {
    const assertionName = "toHaveAmount";
    let pass: boolean;
    let matcherResult: any;
    try {
      const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
      await expectation.toHaveAttribute("data-amount", String(expected), options);
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    if (this.isNot) {
      pass = !pass;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          "\n\n" +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          "\n\n" +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : "");

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },

  async toBeVisibleWithReloadPage(locator: Locator, options?: { timeout?: number; interval?: number }) {
    const assertionName = "toBeVisibleWithReloadPage";
    const timeout = options?.timeout ?? 5_000;
    const interval = options?.interval ?? 500;

    let pass = false;
    let lastError: any;

    try {
      await baseExpect(async () => {
        try {
          const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
          await expectation.toBeVisible({ timeout: interval });
          pass = true;
        } catch (e) {
          lastError = e;
          await locator.page().reload();
          throw e; // Force toPass to retry
        }
      }).toPass({ timeout, intervals: [interval] });
    } catch {
      pass = false;
    }

    if (this.isNot) {
      pass = !pass;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          `\n\nLocator: ${locator}\nExpected: not to be visible (reloading until timeout)`
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          `\n\nLocator: ${locator}\nExpected: to be visible within ${timeout.toLocaleString()}ms (with reloads)\n` +
          (lastError?.message ? `Last error: ${lastError.message}` : "");

    return {
      message,
      pass,
      name: assertionName,
      expected: `visible within ${timeout.toLocaleString()}ms (with reloads)`,
      actual: lastError?.matcherResult?.actual,
    };
  },
});
