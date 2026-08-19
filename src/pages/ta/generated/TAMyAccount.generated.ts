import { Locator, Page } from "fixtures/base-fixture";

export class TAMyAccountGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `link` | Accessible Name: "Account details"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Account details', exact: true })`
   */
  get accountDetailsLink(): Locator {
    return this.page.getByRole("link", { name: "Account details", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Addresses"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Addresses', exact: true })`
   */
  get addressesLink(): Locator {
    return this.page.getByRole("link", { name: "Addresses", exact: true });
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
   * Locator: `getByRole('link', { name: 'Dashboard', exact: true })`
   */
  get dashboardLink(): Locator {
    return this.page.getByRole("link", { name: "Dashboard", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Downloads"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Downloads', exact: true })`
   */
  get downloadsLink(): Locator {
    return this.page.getByRole("link", { name: "Downloads", exact: true });
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
   * Locator: `getByRole('button', { name: 'Log in', exact: true })`
   */
  get logInButton(): Locator {
    return this.page.getByRole("button", { name: "Log in", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Login', exact: true })`
   */
  get loginHeading(): Locator {
    return this.page.getByRole("heading", { name: "Login", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Logout"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Logout', exact: true })`
   */
  get logoutLink(): Locator {
    return this.page.getByRole("link", { name: "Logout", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Lost your password?"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Lost your password?', exact: true })`
   */
  get lostYourPasswordLink(): Locator {
    return this.page.getByRole("link", { name: "Lost your password?", exact: true });
  }

  /** Scoped accessor for `lostYourPasswordLink` within a parent container (Container) */
  getScopedLostYourPasswordLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Lost your password?", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Lost your password?"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Lost your password?', exact: true })`
   */
  get lostYourPasswordLink2(): Locator {
    return this.page.getByRole("link", { name: "Lost your password?", exact: true });
  }

  /** Scoped accessor for `lostYourPasswordLink2` within a parent container (Container) */
  getScopedLostYourPasswordLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Lost your password?", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Orders"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Orders', exact: true })`
   */
  get ordersLink(): Locator {
    return this.page.getByRole("link", { name: "Orders", exact: true });
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
   * Locator: `getByRole('link', { name: 'privacy policy', exact: true })`
   */
  get privacyPolicyLink(): Locator {
    return this.page.getByRole("link", { name: "privacy policy", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Register"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Register', exact: true })`
   */
  get registerButton(): Locator {
    return this.page.getByRole("button", { name: "Register", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Register"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Register', exact: true })`
   */
  get registerHeading(): Locator {
    return this.page.getByRole("heading", { name: "Register", exact: true });
  }

  /**
   * Role: `checkbox` | Accessible Name: "Remember me"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('checkbox', { name: 'Remember me', exact: true })`
   */
  get rememberMeCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "Remember me", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Subscriptions"
   * Variants: [standardUser.default]
   * Locator: `getByRole('link', { name: 'Subscriptions', exact: true })`
   */
  get subscriptionsLink(): Locator {
    return this.page.getByRole("link", { name: "Subscriptions", exact: true });
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
