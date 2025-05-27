import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly usernameInput: Locator = this.page.getByLabel(
    "Username or email address *"
  );
  readonly passwordInput: Locator = this.page.getByLabel("Password *");
  readonly rememberMeCheckbox: Locator = this.page.getByLabel("Remember me");
  readonly loginButton: Locator = this.page.getByRole("button", {
    name: "Log in",
  });
  readonly errorMessage: Locator = this.page.locator(".woocommerce-error");
  readonly heading: Locator = this.page.getByRole("heading", { name: "Login" });
  readonly logoutLink: Locator = this.page.getByRole("link", {
    name: "Logout",
  });

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://demo.testarchitect.com/my-account/");
  }

  async login(username: string, password: string, rememberMe = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }
}
