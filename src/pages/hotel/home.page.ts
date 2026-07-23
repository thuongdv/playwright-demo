import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelHomePage {
  readonly navLoginLink: Locator = this.page.locator("a[href*='login.html']");
  readonly navReserveLink: Locator = this.page.locator("a[href*='plans.html']");

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

  @step("Click Reserve link in navigation")
  async clickReserveLink(): Promise<void> {
    await this.navReserveLink.click();
    await this.page.waitForURL("**/plans.html");
  }
}
