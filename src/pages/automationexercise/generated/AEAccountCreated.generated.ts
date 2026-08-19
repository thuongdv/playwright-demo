import { Locator, Page } from "fixtures/base-fixture";

export class AEAccountCreatedGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Account Created!"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Account Created!', exact: true })`
   */
  get accountCreatedHeading(): Locator {
    return this.page.getByRole("heading", { name: "Account Created!", exact: true });
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
   * Role: `link` | Accessible Name: "Contact us"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Contact us', exact: true })`
   */
  get contactUsLink(): Locator {
    return this.page.getByRole("link", { name: "Contact us", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Continue"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Continue', exact: true })`
   */
  get continueLink(): Locator {
    return this.page.getByRole("link", { name: "Continue", exact: true });
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

export default AEAccountCreatedGeneratedPage;
