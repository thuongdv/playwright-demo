import { Locator, Page } from "fixtures/base-fixture";
import { AELoginGeneratedPage } from "pages/automationexercise/generated/AELogin.generated";
import { step } from "utils/step";

export default class AELoginPage extends AELoginGeneratedPage {
  readonly signupForm: Locator = this.page.locator("form[action='/signup']");
  readonly signupNameInput: Locator = this.signupForm.getByPlaceholder("Name");
  readonly signupEmailInput: Locator = this.signupForm.getByPlaceholder("Email Address");
  readonly signupSubmitButton: Locator = this.signupForm.getByRole("button", { name: "Signup" });
  readonly emailAlreadyExistErrorMessage: Locator = this.signupForm.getByText("Email Address already exist!");

  readonly loginForm: Locator = this.page.locator("form[action='/login']");
  readonly loginEmailInput: Locator = this.loginForm.getByPlaceholder("Email Address");
  readonly loginPasswordInput: Locator = this.loginForm.getByPlaceholder("Password");
  readonly loginSubmitButton: Locator = this.loginForm.getByRole("button", { name: "Login" });

  constructor(page: Page) {
    super(page);
  }

  @step("Navigate to AutomationExercise Login Page")
  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  @step("Enter name and email for New User Signup and click Signup")
  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupSubmitButton.click();
    await this.page.waitForURL("**/signup");
  }

  @step("Submit signup form with name and email")
  async submitSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupSubmitButton.click();
  }

  @step("Login with credentials")
  async login(email: string, pass: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginSubmitButton.click();
  }
}
