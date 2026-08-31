import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HomePage {
  readonly headerArea: Locator = this.page.locator("#header");
  readonly loginButton: Locator = this.headerArea.getByRole("link", { name: "Log in / Sign up" });
  readonly allDepartmentsButton: Locator = this.headerArea.locator(".header-secondary-menu", {
    hasText: "All departments",
  });
  readonly shoppingCartButton: Locator = this.headerArea
    .getByRole("link")
    .filter({ has: this.page.locator(".et-cart-total") });

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  @step("Select department")
  async selectDepartment(department: string): Promise<void> {
    await this.allDepartmentsButton.hover();
    await this.page.getByRole("link", { name: department }).click();
  }

  @step("Click shopping cart button")
  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton.click();
    await this.page.waitForLoadState();
  }

  @step("Click login button")
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
