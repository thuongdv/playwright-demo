import { Locator, Page } from "@playwright/test";

export default class HomePage {
  private readonly headerArea: Locator = this.page.locator("#header");
  private readonly loginButton: Locator = this.headerArea.getByRole("link", { name: "Log in / Sign up" });
  private readonly allDepartmentsButton: Locator = this.headerArea.locator(".header-secondary-menu", {
    hasText: "All departments",
  });
  readonly shoppingCartButton: Locator = this.headerArea
    .getByRole("link")
    .filter({ has: this.page.locator(".et-cart-total") });

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async selectDepartment(department: string): Promise<void> {
    await this.allDepartmentsButton.hover();
    await this.page.getByRole("link", { name: department }).click();
  }

  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton.click();
    await this.page.waitForLoadState();
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
