import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelLoginPage {
  readonly emailInput: Locator = this.page.locator("#email");
  readonly passwordInput: Locator = this.page.locator("#password");
  readonly loginButton: Locator = this.page.locator("#login-button");

  constructor(private readonly page: Page) {}

  @step("Navigate to Hotel Login Page")
  async goto(): Promise<void> {
    await this.page.goto("/en-US/login.html");
  }

  @step("Login with credentials")
  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    await this.page.waitForURL("**/mypage.html");
  }
}
