import { Locator, Page } from "fixtures/base-fixture";

export class HotelLoginGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `textbox` | Accessible Name: "Email"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Email')`
   */
  get emailTextbox(): Locator {
    return this.page.getByLabel("Email");
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

  /** Scoped accessor for `loginButton` within a parent container (Container) */
  getScopedLoginButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Login", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login', exact: true })`
   */
  get loginButton2(): Locator {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }

  /** Scoped accessor for `loginButton2` within a parent container (Container) */
  getScopedLoginButton2(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Login", exact: true });
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
   * Role: `textbox` | Accessible Name: "Password"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Password')`
   */
  get passwordTextbox(): Locator {
    return this.page.getByLabel("Password");
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
   * Role: `link` | Accessible Name: "Sign up"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Sign up', exact: true })`
   */
  get signUpLink(): Locator {
    return this.page.getByRole("link", { name: "Sign up", exact: true });
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

export default HotelLoginGeneratedPage;
