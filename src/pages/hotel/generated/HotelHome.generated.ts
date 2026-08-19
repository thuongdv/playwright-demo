import { Locator, Page } from "fixtures/base-fixture";

export class HotelHomeGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Confirmation Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Confirmation Page', exact: true })`
   */
  get confirmationPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Confirmation Page", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Details"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Details', exact: true })`
   */
  get detailsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Details", exact: true });
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
   * Role: `heading` | Accessible Name: "This site is a sandbox to practice test automation."
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'This site is a sandbox to practice test automation.', exact: true })`
   */
  get heading(): Locator {
    return this.page.getByRole("heading", { name: "This site is a sandbox to practice test automation.", exact: true });
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
   * Role: `link` | Accessible Name: "https://hotel-example-site.takeyaqa.dev/"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'https://hotel-example-site.takeyaqa.dev/', exact: true })`
   */
  get httpshotelExampleSitetakeyaqadevLink(): Locator {
    return this.page.getByRole("link", { name: "https://hotel-example-site.takeyaqa.dev/", exact: true });
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
   * Role: `heading` | Accessible Name: "Login Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Login Page', exact: true })`
   */
  get loginPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Login Page", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Logout', exact: true })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "MIT License"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'MIT License', exact: true })`
   */
  get mitLicenseLink(): Locator {
    return this.page.getByRole("link", { name: "MIT License", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "My Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'My Page', exact: true })`
   */
  get myPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "My Page", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Mypage"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Mypage', exact: true })`
   */
  get mypageLink(): Locator {
    return this.page.getByRole("link", { name: "Mypage", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Notice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Notice', exact: true })`
   */
  get noticeHeading(): Locator {
    return this.page.getByRole("heading", { name: "Notice", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Plans Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plans Page', exact: true })`
   */
  get plansPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plans Page", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Reservation Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Reservation Page', exact: true })`
   */
  get reservationPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Reservation Page", exact: true });
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
   * Role: `heading` | Accessible Name: "Sign up Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Sign up Page', exact: true })`
   */
  get signUpPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Sign up Page", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Site Structure"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Site Structure', exact: true })`
   */
  get siteStructureHeading(): Locator {
    return this.page.getByRole("heading", { name: "Site Structure", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Terms of Use"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Terms of Use', exact: true })`
   */
  get termsOfUseHeading(): Locator {
    return this.page.getByRole("heading", { name: "Terms of Use", exact: true });
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

export default HotelHomeGeneratedPage;
