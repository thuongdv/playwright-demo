import { Locator, Page } from "fixtures/base-fixture";
import { AEAccountCreatedGeneratedPage } from "pages/automationexercise/generated/AEAccountCreated.generated";
import { step } from "utils/step";

export default class AEAccountCreatedPage extends AEAccountCreatedGeneratedPage {
  readonly successHeading: Locator = this.page.getByRole("heading", { name: "Account Created!" });
  readonly continueBtn: Locator = this.page.getByRole("link", { name: "Continue" });

  constructor(page: Page) {
    super(page);
  }

  @step("Click Continue button after account creation")
  async clickContinue(): Promise<void> {
    await this.continueBtn.click();
  }
}
