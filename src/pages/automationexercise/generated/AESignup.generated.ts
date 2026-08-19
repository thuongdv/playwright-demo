import { Locator, Page } from "fixtures/base-fixture";

export class AESignupGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `textbox` | Accessible Name: "Address * (Street address, P.O. Box, Company name, etc.)"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Address * (Street address, P.O. Box, Company name, etc.)')`
   */
  get address1Textbox(): Locator {
    return this.page.getByLabel("Address * (Street address, P.O. Box, Company name, etc.)");
  }

  /**
   * Role: `textbox` | Accessible Name: "Address 2"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Address 2')`
   */
  get address2Textbox(): Locator {
    return this.page.getByLabel("Address 2");
  }

  /**
   * Role: `heading` | Accessible Name: "Address Information"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Address Information', exact: true })`
   */
  get addressInformationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Address Information", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "API Testing"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'API Testing', exact: true })`
   */
  get apiTestingLink(): Locator {
    return this.page.getByRole("link", { name: "API Testing", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Cart"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Cart', exact: true })`
   */
  get cartLink(): Locator {
    return this.page.getByRole("link", { name: "Cart", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "City *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('City *')`
   */
  get cityTextbox(): Locator {
    return this.page.getByLabel("City *");
  }

  /**
   * Role: `textbox` | Accessible Name: "Company"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Company')`
   */
  get companyTextbox(): Locator {
    return this.page.getByLabel("Company");
  }

  /**
   * Role: `link` | Accessible Name: "Contact us"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Contact us', exact: true })`
   */
  get contactUsLink(): Locator {
    return this.page.getByRole("link", { name: "Contact us", exact: true });
  }

  /**
   * Role: `combobox` | Accessible Name: "Country *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Country *')`
   */
  get countryCombobox(): Locator {
    return this.page.getByLabel("Country *");
  }

  /**
   * Role: `button` | Accessible Name: "Create Account"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Create Account', exact: true })`
   */
  get createAccountButton(): Locator {
    return this.page.getByRole("button", { name: "Create Account", exact: true });
  }

  /**
   * Role: `combobox` | Accessible Name: "Day 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('combobox', { name: 'Day 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31', exact: true })`
   */
  get daysCombobox(): Locator {
    return this.page.getByRole("combobox", {
      name: "Day 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31",
      exact: true,
    });
  }

  /**
   * Role: `textbox` | Accessible Name: "Email *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Email *')`
   */
  get emailTextbox(): Locator {
    return this.page.getByLabel("Email *");
  }

  /**
   * Role: `heading` | Accessible Name: "Enter Account Information"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Enter Account Information', exact: true })`
   */
  get enterAccountInformationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Enter Account Information", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "First name *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('First name *')`
   */
  get firstNameTextbox(): Locator {
    return this.page.getByLabel("First name *");
  }

  /**
   * Role: `link` | Accessible Name: "Home"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Home', exact: true })`
   */
  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Last name *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Last name *')`
   */
  get lastNameTextbox(): Locator {
    return this.page.getByLabel("Last name *");
  }

  /**
   * Role: `textbox` | Accessible Name: "Mobile Number *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Mobile Number *')`
   */
  get mobileNumberTextbox(): Locator {
    return this.page.getByLabel("Mobile Number *");
  }

  /**
   * Role: `combobox` | Accessible Name: "Month January February March April May June July August September October November December"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('combobox', { name: 'Month January February March April May June July August September October November December', exact: true })`
   */
  get monthsCombobox(): Locator {
    return this.page.getByRole("combobox", {
      name: "Month January February March April May June July August September October November December",
      exact: true,
    });
  }

  /**
   * Role: `radio` | Accessible Name: "Mr."
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('radio', { name: 'Mr.', exact: true })`
   */
  get mrRadio(): Locator {
    return this.page.getByRole("radio", { name: "Mr.", exact: true });
  }

  /**
   * Role: `radio` | Accessible Name: "Mrs."
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('radio', { name: 'Mrs.', exact: true })`
   */
  get mrsRadio(): Locator {
    return this.page.getByRole("radio", { name: "Mrs.", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Name *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Name *')`
   */
  get nameTextbox(): Locator {
    return this.page.getByLabel("Name *");
  }

  /**
   * Role: `checkbox` | Accessible Name: "Receive special offers from our partners!"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Receive special offers from our partners!')`
   */
  get optinCheckbox(): Locator {
    return this.page.getByLabel("Receive special offers from our partners!");
  }

  /**
   * Role: `textbox` | Accessible Name: "Password *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Password *')`
   */
  get passwordTextbox(): Locator {
    return this.page.getByLabel("Password *");
  }

  /**
   * Role: `link` | Accessible Name: " Products"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: ' Products', exact: true })`
   */
  get productsLink(): Locator {
    return this.page.getByRole("link", { name: " Products", exact: true });
  }

  /**
   * Role: `link`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#scrollUp')`
   */
  get scrollupLink(): Locator {
    return this.page.locator("#scrollUp");
  }

  /** Scoped accessor for `scrollupLink` within a parent container (Container) */
  getScopedScrollupLink(scope: Locator): Locator {
    return scope.locator("#scrollUp");
  }

  /**
   * Role: `checkbox` | Accessible Name: "Sign up for our newsletter!"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Sign up for our newsletter!')`
   */
  get signUpForOurNewsletterCheckbox(): Locator {
    return this.page.getByLabel("Sign up for our newsletter!");
  }

  /**
   * Role: `link` | Accessible Name: "Signup / Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Signup / Login', exact: true })`
   */
  get signupLoginLink(): Locator {
    return this.page.getByRole("link", { name: "Signup / Login", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "State *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('State *')`
   */
  get stateTextbox(): Locator {
    return this.page.getByLabel("State *");
  }

  /**
   * Role: `button`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#subscribe')`
   */
  get subscribeButton(): Locator {
    return this.page.locator("#subscribe");
  }

  /**
   * Role: `heading` | Accessible Name: "Subscription"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Subscription', exact: true })`
   */
  get subscriptionHeading(): Locator {
    return this.page.getByRole("heading", { name: "Subscription", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Test Cases', exact: true })`
   */
  get testCasesLink(): Locator {
    return this.page.getByRole("link", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Video Tutorials"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Video Tutorials', exact: true })`
   */
  get videoTutorialsLink(): Locator {
    return this.page.getByRole("link", { name: "Video Tutorials", exact: true });
  }

  /**
   * Role: `combobox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#years')`
   */
  get yearsCombobox(): Locator {
    return this.page.locator("#years");
  }

  /**
   * Role: `textbox` | Accessible Name: "Your email address"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Your email address', exact: true })`
   */
  get yourEmailAddressTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Your email address", exact: true });
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#zipcode')`
   */
  get zipcodeTextbox(): Locator {
    return this.page.locator("#zipcode");
  }

  /** Scoped accessor for `zipcodeTextbox` within a parent container (Container) */
  getScopedZipcodeTextbox(scope: Locator): Locator {
    return scope.locator("#zipcode");
  }
}

export default AESignupGeneratedPage;
