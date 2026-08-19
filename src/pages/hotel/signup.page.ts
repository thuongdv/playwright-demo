import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export interface SignupDetails {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  rank?: "normal" | "premium";
  address?: string;
  tel?: string;
  gender?: string;
  dateOfBirth?: string;
  notification?: boolean;
}

export default class HotelSignupPage {
  readonly emailInput: Locator = this.page.getByLabel("Email required");
  readonly passwordInput: Locator = this.page.getByLabel("Password required");
  readonly passwordConfirmationInput: Locator = this.page.getByLabel("Password (confirmation) required");
  readonly nameInput: Locator = this.page.getByLabel("Name required");
  readonly normalMembershipRadio: Locator = this.page.getByRole("radio", { name: "Membership", exact: true });
  readonly premiumMembershipRadio: Locator = this.page.getByRole("radio", { name: "PREMIUM Membership" });
  readonly addressInput: Locator = this.page.getByLabel("Address");
  readonly telInput: Locator = this.page.getByLabel("Tel");
  readonly genderSelect: Locator = this.page.getByLabel("Gender");
  readonly dateOfBirthInput: Locator = this.page.getByLabel("Date of birth");
  readonly notificationCheckbox: Locator = this.page.getByLabel("Receive notification");
  readonly signUpButton: Locator = this.page.getByRole("button", { name: "Sign up" });
  readonly signUpHeading: Locator = this.page.getByRole("heading", { name: "Sign up" });

  constructor(private readonly page: Page) {}

  @step("Navigate to Hotel Signup Page")
  async goto(): Promise<void> {
    await this.page.goto("/en-US/signup.html");
  }

  @step("Fill signup form")
  async fillSignupForm(details: SignupDetails): Promise<void> {
    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
    await this.passwordConfirmationInput.fill(details.passwordConfirmation);
    await this.nameInput.fill(details.name);

    if (details.rank === "premium") {
      await this.premiumMembershipRadio.check();
    } else if (details.rank === "normal") {
      await this.normalMembershipRadio.check();
    }

    if (details.address) {
      await this.addressInput.fill(details.address);
    }
    if (details.tel) {
      await this.telInput.fill(details.tel);
    }
    if (details.gender) {
      await this.genderSelect.selectOption(details.gender);
    }
    if (details.dateOfBirth) {
      await this.dateOfBirthInput.fill(details.dateOfBirth);
    }
    if (details.notification !== undefined) {
      if (details.notification) {
        await this.notificationCheckbox.check();
      } else {
        await this.notificationCheckbox.uncheck();
      }
    }
  }

  @step("Click Sign up button")
  async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
    await this.page.waitForURL("**/mypage.html");
  }
}
