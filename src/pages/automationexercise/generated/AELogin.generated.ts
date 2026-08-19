import { Locator, Page } from "fixtures/base-fixture";

export class AELoginGeneratedPage {
  constructor(protected readonly page: Page) {}

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
   * Role: `link` | Accessible Name: "Contact us"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Contact us', exact: true })`
   */
  get contactUsLink(): Locator {
    return this.page.getByRole("link", { name: "Contact us", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Email Address"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Email Address', exact: true })`
   */
  get emailAddressTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Email Address", exact: true });
  }

  /** Scoped accessor for `emailAddressTextbox` within a parent container (Container) */
  getScopedEmailAddressTextbox(scope: Locator): Locator {
    return scope.getByRole("textbox", { name: "Email Address", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Email Address"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Email Address', exact: true })`
   */
  get emailAddressTextbox2(): Locator {
    return this.page.getByRole("textbox", { name: "Email Address", exact: true });
  }

  /** Scoped accessor for `emailAddressTextbox2` within a parent container (Container) */
  getScopedEmailAddressTextbox2(scope: Locator): Locator {
    return scope.getByRole("textbox", { name: "Email Address", exact: true });
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
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login', exact: true })`
   */
  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Login to your account"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Login to your account', exact: true })`
   */
  get loginToYourAccountHeading(): Locator {
    return this.page.getByRole("heading", { name: "Login to your account", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Name"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Name', exact: true })`
   */
  get nameTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Name", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "New User Signup!"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'New User Signup!', exact: true })`
   */
  get newUserSignupHeading(): Locator {
    return this.page.getByRole("heading", { name: "New User Signup!", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "OR"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'OR', exact: true })`
   */
  get orHeading(): Locator {
    return this.page.getByRole("heading", { name: "OR", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Password"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Password', exact: true })`
   */
  get passwordTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Password", exact: true });
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
   * Role: `button` | Accessible Name: "Signup"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Signup', exact: true })`
   */
  get signupButton(): Locator {
    return this.page.getByRole("button", { name: "Signup", exact: true });
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
   * Role: `textbox` | Accessible Name: "Your email address"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Your email address', exact: true })`
   */
  get yourEmailAddressTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Your email address", exact: true });
  }
}

export default AELoginGeneratedPage;
