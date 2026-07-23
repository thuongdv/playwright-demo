import { Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelPlansPage {
  constructor(private readonly page: Page) {}

  @step("Navigate to Hotel Plans Page")
  async goto(): Promise<void> {
    await this.page.goto("/en-US/plans.html");
  }

  @step("Reserve plan by name")
  async reservePlan(planName: string): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent("page");
    const planCard = this.page.locator(".card").filter({ hasText: new RegExp(planName, "i") });
    await planCard.getByRole("link", { name: "Reserve room" }).click();

    const reservePage = await pagePromise;
    await reservePage.waitForLoadState("domcontentloaded");
    return reservePage;
  }
}
