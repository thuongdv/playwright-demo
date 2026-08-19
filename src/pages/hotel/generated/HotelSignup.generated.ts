import { Locator, Page } from "fixtures/base-fixture";

export class HotelSignupGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `textbox` | Accessible Name: "Address"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Address')`
   */
  get addressTextbox(): Locator {
    return this.page.getByLabel("Address");
  }

  /**
   * Role: `textbox` | Accessible Name: "Date of birth"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Date of birth')`
   */
  get dateOfBirthTextbox(): Locator {
    return this.page.getByLabel("Date of birth");
  }

  /**
   * Role: `textbox` | Accessible Name: "Email required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Email required')`
   */
  get emailRequiredTextbox(): Locator {
    return this.page.getByLabel("Email required");
  }

  /**
   * Role: `combobox` | Accessible Name: "Gender"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Gender')`
   */
  get genderCombobox(): Locator {
    return this.page.getByLabel("Gender");
  }

  /**
   * Role: `link` | Accessible Name: "GitHub"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'GitHub', exact: true })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub", exact: true });
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
   * Role: `heading` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Hotel Planisphere', exact: true })`
   */
  get hotelPlanisphereHeading(): Locator {
    return this.page.getByRole("heading", { name: "Hotel Planisphere", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere', exact: true })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login', exact: true })`
   */
  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }

  /**
   * Role: `radio` | Accessible Name: "Membership"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('radio', { name: 'Membership', exact: true })`
   */
  get membershipRadio(): Locator {
    return this.page.getByRole("radio", { name: "Membership", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Name required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Name required')`
   */
  get nameRequiredTextbox(): Locator {
    return this.page.getByLabel("Name required");
  }

  /**
   * Role: `textbox` | Accessible Name: "Password (confirmation) required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Password (confirmation) required')`
   */
  get passwordConfirmationRequiredTextbox(): Locator {
    return this.page.getByLabel("Password (confirmation) required");
  }

  /**
   * Role: `textbox` | Accessible Name: "Password required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Password required')`
   */
  get passwordRequiredTextbox(): Locator {
    return this.page.getByLabel("Password required");
  }

  /**
   * Role: `radio` | Accessible Name: "PREMIUM Membership"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('radio', { name: 'PREMIUM Membership', exact: true })`
   */
  get premiumMembershipRadio(): Locator {
    return this.page.getByRole("radio", { name: "PREMIUM Membership", exact: true });
  }

  /**
   * Role: `checkbox` | Accessible Name: "Receive notification"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Receive notification')`
   */
  get receiveNotificationCheckbox(): Locator {
    return this.page.getByLabel("Receive notification");
  }

  /**
   * Role: `link` | Accessible Name: "Reserve"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Reserve', exact: true })`
   */
  get reserveLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Sign up"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Sign up', exact: true })`
   */
  get signUpButton(): Locator {
    return this.page.getByRole("button", { name: "Sign up", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Sign up"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Sign up', exact: true })`
   */
  get signUpHeading(): Locator {
    return this.page.getByRole("heading", { name: "Sign up", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Sign up"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Sign up', exact: true })`
   */
  get signUpLink(): Locator {
    return this.page.getByRole("link", { name: "Sign up", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Tel"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Tel')`
   */
  get telTextbox(): Locator {
    return this.page.getByLabel("Tel");
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation', exact: true })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation", exact: true });
  }
}

export default HotelSignupGeneratedPage;
