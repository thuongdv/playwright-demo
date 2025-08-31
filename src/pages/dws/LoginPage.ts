import { Page } from "@playwright/test";

export default class LoginPage {
  private readonly acceptCookiesButton = this.page.getByRole("button", { name: "Accept Cookies" });
  private readonly signInButton = this.page.getByRole("button", { name: "Sign In" });
  private readonly emailText = this.page.getByLabel("Email");
  private readonly passwordText = this.page.getByLabel("Password");
  private readonly continueButton = this.page.getByRole("button", { name: "Continue" });

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.acceptCookiesButton.waitFor({ state: "visible", timeout: 5_000 }).catch(() => {
      console.log("No cookie consent popup found, continuing...");
    });
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }

    await this.signInButton.click();

    await this.emailText.fill(username);
    await this.passwordText.fill(password);

    await this.signInButton.click();

    await this.continueButton.click();

    await this.page.waitForLoadState("networkidle");
  }
}
