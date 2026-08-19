import { Locator, Page } from "fixtures/base-fixture";

export class TAMyAccountGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `link` | Accessible Name: "Account details"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Account details' })`
   */
  get accountDetailsLink(): Locator {
    return this.page.getByRole("link", { name: "Account details" });
  }

  /**
   * Role: `link` | Accessible Name: "Addresses"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Addresses' })`
   */
  get addressesLink(): Locator {
    return this.page.getByRole("link", { name: "Addresses" });
  }

  /**
   * Role: `textbox`
   * Variants: [standardUser.default]
   * Locator: `locator('#basic-local-avatar')`
   */
  get basicLocalAvatarTextbox(): Locator {
    return this.page.locator("#basic-local-avatar");
  }

  /** Scoped accessor for `basicLocalAvatarTextbox` within a parent container (Container) */
  getScopedBasicLocalAvatarTextbox(scope: Locator): Locator {
    return scope.locator("#basic-local-avatar");
  }

  /**
   * Role: `textbox`
   * Variants: [standardUser.default]
   * Locator: `locator('#_basic_user_avatar_nonce')`
   */
  get basicUserAvatarNonceTextbox(): Locator {
    return this.page.locator("#_basic_user_avatar_nonce");
  }

  /** Scoped accessor for `basicUserAvatarNonceTextbox` within a parent container (Container) */
  getScopedBasicUserAvatarNonceTextbox(scope: Locator): Locator {
    return scope.locator("#_basic_user_avatar_nonce");
  }

  /**
   * Role: `link` | Accessible Name: "Dashboard"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Dashboard' })`
   */
  get dashboardLink(): Locator {
    return this.page.getByRole("link", { name: "Dashboard" });
  }

  /**
   * Role: `link` | Accessible Name: "Downloads"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Downloads' })`
   */
  get downloadsLink(): Locator {
    return this.page.getByRole("link", { name: "Downloads" });
  }

  /**
   * Role: `textbox` | Accessible Name: "Email address *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Email address *')`
   */
  get emailAddressTextbox(): Locator {
    return this.page.getByLabel("Email address *");
  }

  /**
   * Role: `button` | Accessible Name: "Log in"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Log in' })`
   */
  get logInButton(): Locator {
    return this.page.getByRole("button", { name: "Log in" });
  }

  /**
   * Role: `heading` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Login' })`
   */
  get loginHeading(): Locator {
    return this.page.getByRole("heading", { name: "Login" });
  }

  /**
   * Role: `link` | Accessible Name: "Logout"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Logout' })`
   */
  get logoutLink(): Locator {
    return this.page.getByRole("link", { name: "Logout" });
  }

  /**
   * Role: `link` | Accessible Name: "Lost your password?"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Lost your password?' })`
   */
  get lostYourPasswordLink(): Locator {
    return this.page.getByRole("link", { name: "Lost your password?" });
  }

  /** Scoped accessor for `lostYourPasswordLink` within a parent container (Container) */
  getScopedLostYourPasswordLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Lost your password?" });
  }

  /**
   * Role: `link` | Accessible Name: "Lost your password?"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Lost your password?' })`
   */
  get lostYourPasswordLink2(): Locator {
    return this.page.getByRole("link", { name: "Lost your password?" });
  }

  /** Scoped accessor for `lostYourPasswordLink2` within a parent container (Container) */
  getScopedLostYourPasswordLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Lost your password?" });
  }

  /**
   * Role: `link` | Accessible Name: "Orders"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Orders' })`
   */
  get ordersLink(): Locator {
    return this.page.getByRole("link", { name: "Orders" });
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
   * Role: `link` | Accessible Name: "privacy policy"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'privacy policy' })`
   */
  get privacyPolicyLink(): Locator {
    return this.page.getByRole("link", { name: "privacy policy" });
  }

  /**
   * Role: `button` | Accessible Name: "Register"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Register' })`
   */
  get registerButton(): Locator {
    return this.page.getByRole("button", { name: "Register" });
  }

  /**
   * Role: `heading` | Accessible Name: "Register"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Register' })`
   */
  get registerHeading(): Locator {
    return this.page.getByRole("heading", { name: "Register" });
  }

  /**
   * Role: `checkbox` | Accessible Name: "Remember me"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('checkbox', { name: 'Remember me' })`
   */
  get rememberMeCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "Remember me" });
  }

  /**
   * Role: `link` | Accessible Name: "Subscriptions"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Subscriptions' })`
   */
  get subscriptionsLink(): Locator {
    return this.page.getByRole("link", { name: "Subscriptions" });
  }

  /**
   * Role: `textbox` | Accessible Name: "Username or email address *"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Username or email address *')`
   */
  get usernameOrEmailAddressTextbox(): Locator {
    return this.page.getByLabel("Username or email address *");
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#woocommerce-login-nonce')`
   */
  get woocommerceLoginNonceTextbox(): Locator {
    return this.page.locator("#woocommerce-login-nonce");
  }

  /** Scoped accessor for `woocommerceLoginNonceTextbox` within a parent container (Container) */
  getScopedWoocommerceLoginNonceTextbox(scope: Locator): Locator {
    return scope.locator("#woocommerce-login-nonce");
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#woocommerce-register-nonce')`
   */
  get woocommerceRegisterNonceTextbox(): Locator {
    return this.page.locator("#woocommerce-register-nonce");
  }

  /** Scoped accessor for `woocommerceRegisterNonceTextbox` within a parent container (Container) */
  getScopedWoocommerceRegisterNonceTextbox(scope: Locator): Locator {
    return scope.locator("#woocommerce-register-nonce");
  }
}

export default TAMyAccountGeneratedPage;
