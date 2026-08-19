import { Locator, Page } from "fixtures/base-fixture";
import { AEHomeGeneratedPage } from "pages/automationexercise/generated/AEHome.generated";
import { step } from "utils/step";

export default class AEHomePage extends AEHomeGeneratedPage {
  readonly navSignupLoginLink: Locator = this.page.getByRole("link", { name: "Signup / Login" });

  constructor(page: Page) {
    super(page);
  }

  @step("Navigate to AutomationExercise Home Page")
  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  @step("Click 'Signup / Login' link in navigation bar")
  async clickSignupLoginLink(): Promise<void> {
    await this.navSignupLoginLink.click();
    await this.page.waitForURL("**/login");
  }
}
