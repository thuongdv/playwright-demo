import { Locator, Page } from "fixtures/base-fixture";

export class HotelHomeGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Confirmation Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Confirmation Page' })`
   */
  get confirmationPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Confirmation Page" });
  }

  /**
   * Role: `heading` | Accessible Name: "Details"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Details' })`
   */
  get detailsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Details" });
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
   * Role: `heading` | Accessible Name: "This site is a sandbox to practice test automation."
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'This site is a sandbox to practice test automation.' })`
   */
  get heading(): Locator {
    return this.page.getByRole("heading", { name: "This site is a sandbox to practice test automation." });
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
   * Role: `link` | Accessible Name: "https://hotel-example-site.takeyaqa.dev/"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'https://hotel-example-site.takeyaqa.dev/' })`
   */
  get httpshotelExampleSitetakeyaqadevLink(): Locator {
    return this.page.getByRole("link", { name: "https://hotel-example-site.takeyaqa.dev/" });
  }

  /**
   * Role: `button` | Accessible Name: "Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Login' })`
   */
  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }

  /**
   * Role: `heading` | Accessible Name: "Login Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Login Page' })`
   */
  get loginPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Login Page" });
  }

  /**
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Logout' })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout" });
  }

  /**
   * Role: `link` | Accessible Name: "MIT License"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'MIT License' })`
   */
  get mitLicenseLink(): Locator {
    return this.page.getByRole("link", { name: "MIT License" });
  }

  /**
   * Role: `heading` | Accessible Name: "My Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'My Page' })`
   */
  get myPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "My Page" });
  }

  /**
   * Role: `link` | Accessible Name: "Mypage"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Mypage' })`
   */
  get mypageLink(): Locator {
    return this.page.getByRole("link", { name: "Mypage" });
  }

  /**
   * Role: `heading` | Accessible Name: "Notice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Notice' })`
   */
  get noticeHeading(): Locator {
    return this.page.getByRole("heading", { name: "Notice" });
  }

  /**
   * Role: `heading` | Accessible Name: "Plans Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plans Page' })`
   */
  get plansPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plans Page" });
  }

  /**
   * Role: `heading` | Accessible Name: "Reservation Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Reservation Page' })`
   */
  get reservationPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Reservation Page" });
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
   * Role: `heading` | Accessible Name: "Sign up Page"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Sign up Page' })`
   */
  get signUpPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Sign up Page" });
  }

  /**
   * Role: `heading` | Accessible Name: "Site Structure"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Site Structure' })`
   */
  get siteStructureHeading(): Locator {
    return this.page.getByRole("heading", { name: "Site Structure" });
  }

  /**
   * Role: `heading` | Accessible Name: "Terms of Use"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Terms of Use' })`
   */
  get termsOfUseHeading(): Locator {
    return this.page.getByRole("heading", { name: "Terms of Use" });
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

export default HotelHomeGeneratedPage;
