import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelHomePage {
  readonly navLoginLink: Locator = this.page.locator("a[href*='login.html']");
  readonly navReserveLink: Locator = this.page.locator("a[href*='plans.html']");
  readonly navSignUpLink: Locator = this.page.getByRole("link", { name: "Sign up" });

  constructor(private readonly page: Page) {}

  @step("Navigate to Hotel Home Page")
  async goto(): Promise<void> {
    await this.page.goto("/en-US/");
  }

  @step("Click Login link in navigation")
  async clickLoginLink(): Promise<void> {
    await this.navLoginLink.click();
    await this.page.waitForURL("**/login.html");
  }

  @step("Click Sign up link in navigation")
  async clickSignUpLink(): Promise<void> {
    await this.navSignUpLink.click();
    await this.page.waitForURL("**/signup.html");
  }

  @step("Click Reserve link in navigation")
  async clickReserveLink(): Promise<void> {
    await this.navReserveLink.click();
    await this.page.waitForURL("**/plans.html");
  }
}
