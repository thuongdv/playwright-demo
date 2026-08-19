import { Locator, Page } from "fixtures/base-fixture";
import { AESignupGeneratedPage } from "pages/automationexercise/generated/AESignup.generated";
import { step } from "utils/step";

export interface SignupAccountDetails {
  title?: "Mr." | "Mrs.";
  name?: string;
  email?: string;
  password: string;
  dateOfBirth?: {
    day?: string;
    month?: string;
    year?: string;
  };
  newsletter?: boolean;
  specialOffers?: boolean;
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobileNumber?: string;
}

export default class AESignupPage extends AESignupGeneratedPage {
  readonly titleMrRadio: Locator = this.page.getByRole("radio", { name: "Mr." });
  readonly titleMrsRadio: Locator = this.page.getByRole("radio", { name: "Mrs." });
  readonly passwordField: Locator = this.page.getByLabel("Password *");
  readonly daysSelect: Locator = this.page.locator("#days");
  readonly monthsSelect: Locator = this.page.locator("#months");
  readonly yearsSelect: Locator = this.page.locator("#years");
  readonly newsletterField: Locator = this.page.getByLabel("Sign up for our newsletter!");
  readonly specialOffersField: Locator = this.page.getByLabel("Receive special offers from our partners!");
  readonly firstNameField: Locator = this.page.getByLabel("First name *");
  readonly lastNameField: Locator = this.page.getByLabel("Last name *");
  readonly companyField: Locator = this.page.getByLabel("Company");
  readonly addressField: Locator = this.page.getByLabel("Address * (Street address, P.O. Box, Company name, etc.)");
  readonly address2Field: Locator = this.page.getByLabel("Address 2");
  readonly countryField: Locator = this.page.getByLabel("Country *");
  readonly stateField: Locator = this.page.getByLabel("State *");
  readonly cityField: Locator = this.page.getByLabel("City *");
  readonly zipCodeField: Locator = this.page.locator("#zipcode");
  readonly mobileNumberField: Locator = this.page.getByLabel("Mobile Number *");
  readonly submitAccountButton: Locator = this.page.getByRole("button", { name: "Create Account" });
  readonly enterAccountInfoHeading: Locator = this.page.getByRole("heading", { name: "Enter Account Information" });

  constructor(page: Page) {
    super(page);
  }

  @step("Fill account information form")
  async fillAccountInformation(details: SignupAccountDetails): Promise<void> {
    if (details.title === "Mr.") {
      await this.titleMrRadio.check();
    } else if (details.title === "Mrs.") {
      await this.titleMrsRadio.check();
    }

    if (details.password) {
      await this.passwordField.fill(details.password);
    }

    if (details.dateOfBirth?.day) {
      await this.daysSelect.selectOption(details.dateOfBirth.day);
    }
    if (details.dateOfBirth?.month) {
      await this.monthsSelect.selectOption(details.dateOfBirth.month);
    }
    if (details.dateOfBirth?.year) {
      await this.yearsSelect.selectOption(details.dateOfBirth.year);
    }

    if (details.newsletter) {
      await this.newsletterField.check();
    }
    if (details.specialOffers) {
      await this.specialOffersField.check();
    }

    if (details.firstName) {
      await this.firstNameField.fill(details.firstName);
    }
    if (details.lastName) {
      await this.lastNameField.fill(details.lastName);
    }
    if (details.company) {
      await this.companyField.fill(details.company);
    }
    if (details.address) {
      await this.addressField.fill(details.address);
    }
    if (details.address2) {
      await this.address2Field.fill(details.address2);
    }
    if (details.country) {
      await this.countryField.selectOption(details.country);
    }
    if (details.state) {
      await this.stateField.fill(details.state);
    }
    if (details.city) {
      await this.cityField.fill(details.city);
    }
    if (details.zipcode) {
      await this.zipCodeField.fill(details.zipcode);
    }
    if (details.mobileNumber) {
      await this.mobileNumberField.fill(details.mobileNumber);
    }
  }

  @step("Click Create Account button")
  async clickCreateAccount(): Promise<void> {
    await this.submitAccountButton.click();
    await this.page.waitForURL("**/account_created");
  }
}
