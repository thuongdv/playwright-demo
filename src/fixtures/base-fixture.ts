import { Locator, expect as baseExpect, test as baseTest } from "@playwright/test";
import HotelHomePage from "pages/hotel/home.page";
import HotelLoginPage from "pages/hotel/login.page";
import HotelPlansPage from "pages/hotel/plans.page";
import CartPage from "pages/ta/cart.page";
import CheckoutPage from "pages/ta/checkout.page";
import OrderReceivedPage from "pages/ta/checkout/order-received.page";
import HomePage from "pages/ta/home.page";
import MyAccountPage from "pages/ta/my-account.page";
import ProductCategoryPage from "pages/ta/product-category.page";

export { Locator, Page } from "@playwright/test";

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

  /**
   * Asserts that the given locator becomes visible within a specified timeout, reloading the page and retrying as needed.
   *
   * This method repeatedly checks if the locator is visible, and if not, reloads the page and retries until the timeout is reached.
   * It supports both positive and negative assertions (using `this.isNot`).
   *
   * @param locator - The Playwright Locator to check for visibility.
   * @param options - Optional settings for the assertion.
   * @param options.timeout - Maximum time in milliseconds to wait for the locator to become visible. Defaults to 5000ms.
   * @param options.interval - Interval in milliseconds between retries. Defaults to 500ms.
   * @returns An object containing the assertion result, message, and details about the expectation.
   */
  async toBeVisibleWithReloadPage(locator: Locator, options?: { timeout?: number; interval?: number }) {
    const assertionName = "toBeVisibleWithReloadPage";
    const timeout = options?.timeout ?? this.timeout ?? 5000;
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

  /**
   * Asserts that the number of elements matched by the given locator is greater than or equal to the expected count.
   *
   * @param locator - The Playwright Locator instance to evaluate.
   * @param expected - The minimum number of elements expected.
   * @param options - Optional configuration object.
   * @param options.timeout - Maximum time in milliseconds to wait for the condition to be met. Defaults to 5000ms.
   * @returns An object containing a message function and a pass boolean indicating the result.
   */
  async toHaveCountGTE(locator: Locator, expected: number, options?: { timeout?: number }) {
    const timeout = options?.timeout ?? this.timeout ?? 5000;

    const result = await baseExpect
      .poll(async () => await locator.count(), {
        message: `Checking if element count is >= ${expected}`,
        timeout,
      })
      .toBeGreaterThanOrEqual(expected);

    return {
      message: () => `Expected element count to be greater than or equal to ${expected}, but got ${result}`,
      pass: true,
    };
  },
});

type Pages = {
  homePage: HomePage;
  cartPage: CartPage;
  myAccountPage: MyAccountPage;
  orderReceivedPage: OrderReceivedPage;
  checkoutPage: CheckoutPage;
  productCategoryPage: ProductCategoryPage;
  hotelHomePage: HotelHomePage;
  hotelLoginPage: HotelLoginPage;
  hotelPlansPage: HotelPlansPage;
};

export const test = baseTest.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },
  orderReceivedPage: async ({ page }, use) => {
    const orderReceivedPage = new OrderReceivedPage(page);
    await use(orderReceivedPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  productCategoryPage: async ({ page }, use) => {
    const productCategoryPage = new ProductCategoryPage(page);
    await use(productCategoryPage);
  },
  hotelHomePage: async ({ page }, use) => {
    const hotelHomePage = new HotelHomePage(page);
    await use(hotelHomePage);
  },
  hotelLoginPage: async ({ page }, use) => {
    const hotelLoginPage = new HotelLoginPage(page);
    await use(hotelLoginPage);
  },
  hotelPlansPage: async ({ page }, use) => {
    const hotelPlansPage = new HotelPlansPage(page);
    await use(hotelPlansPage);
  },
});
