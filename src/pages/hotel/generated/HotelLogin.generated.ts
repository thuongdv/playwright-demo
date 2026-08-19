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
   * Locator: `getByRole('link', { name: 'GitHub' })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub" });
  }

  /**
   * Role: `link` | Accessible Name: "Home"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Home' })`
   */
  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home" });
  }

  /**
   * Role: `heading` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Hotel Planisphere' })`
   */
  get hotelPlanisphereHeading(): Locator {
    return this.page.getByRole("heading", { name: "Hotel Planisphere" });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere' })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere" });
  }

  /**
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login' })`
   */
  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }

  /** Scoped accessor for `loginButton` within a parent container (Container) */
  getScopedLoginButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Login" });
  }

  /**
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login' })`
   */
  get loginButton2(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }

  /** Scoped accessor for `loginButton2` within a parent container (Container) */
  getScopedLoginButton2(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Login" });
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
   * Locator: `getByRole('link', { name: 'Reserve' })`
   */
  get reserveLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve" });
  }

  /**
   * Role: `link` | Accessible Name: "Sign up"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Sign up' })`
   */
  get signUpLink(): Locator {
    return this.page.getByRole("link", { name: "Sign up" });
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation' })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation" });
  }
}

export default HotelLoginGeneratedPage;
