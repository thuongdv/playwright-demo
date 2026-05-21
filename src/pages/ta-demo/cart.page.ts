import { Page } from "@playwright/test";

import { expect } from "fixtures/base-fixture";

export default class CartPage {
  readonly cartItems = this.page.getByRole("row");
  readonly processCheckoutButton = this.page.getByRole("link", { name: /PROCEED TO CHECKOUT/i });

  constructor(private readonly page: Page) {}

  async getCartItemCount(): Promise<number> {
    await this.page.waitForLoadState();
    return await this.cartItems.count();
  }

  async isCartEmpty(): Promise<boolean> {
    await this.page.waitForLoadState();
    return (await this.getCartItemCount()) === 0;
  }

  async clearShoppingCart(options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 60_000; // Default timeout of 60 seconds

    await expect(async () => {
      while (!(await this.isCartEmpty())) {
        await this.cartItems.getByRole("link", { name: "Remove" }).first().click();
      }
    }).toPass({ timeout });
  }

  async clickProcessCheckoutButton(): Promise<void> {
    await this.processCheckoutButton.click();
  }
}
