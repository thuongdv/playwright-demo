import { Locator, Page } from "fixtures/base-fixture";

export class HotelPlansGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Business trip"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Business trip', exact: true })`
   */
  get businessTripHeading(): Locator {
    return this.page.getByRole("heading", { name: "Business trip", exact: true });
  }

  /** Scoped accessor for `businessTripHeading` within a parent container (Card) */
  getScopedBusinessTripHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Business trip", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "For honeymoon"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'For honeymoon', exact: true })`
   */
  get forHoneymoonHeading(): Locator {
    return this.page.getByRole("heading", { name: "For honeymoon", exact: true });
  }

  /** Scoped accessor for `forHoneymoonHeading` within a parent container (Card) */
  getScopedForHoneymoonHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "For honeymoon", exact: true });
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
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Logout', exact: true })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout", exact: true });
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
   * Role: `heading` | Accessible Name: "Plans"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plans', exact: true })`
   */
  get plansHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plans", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Plan with special offers"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plan with special offers', exact: true })`
   */
  get planWithSpecialOffersHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plan with special offers", exact: true });
  }

  /** Scoped accessor for `planWithSpecialOffersHeading` within a parent container (Card) */
  getScopedPlanWithSpecialOffersHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Plan with special offers", exact: true });
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
   * Role: `link` | Accessible Name: "Reserve room"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Reserve room', exact: true })`
   */
  get reserveRoomLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve room", exact: true });
  }

  /** Scoped accessor for `reserveRoomLink` within a parent container (Card) */
  getScopedReserveRoomLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Reserve room", exact: true });
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
   * Role: `heading` | Accessible Name: "Staying without meals"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Staying without meals', exact: true })`
   */
  get stayingWithoutMealsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Staying without meals", exact: true });
  }

  /** Scoped accessor for `stayingWithoutMealsHeading` within a parent container (Card) */
  getScopedStayingWithoutMealsHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Staying without meals", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation', exact: true })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "With beauty salon"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With beauty salon', exact: true })`
   */
  get withBeautySalonHeading(): Locator {
    return this.page.getByRole("heading", { name: "With beauty salon", exact: true });
  }

  /** Scoped accessor for `withBeautySalonHeading` within a parent container (Card) */
  getScopedWithBeautySalonHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With beauty salon", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "With complimentary ticket"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With complimentary ticket', exact: true })`
   */
  get withComplimentaryTicketHeading(): Locator {
    return this.page.getByRole("heading", { name: "With complimentary ticket", exact: true });
  }

  /** Scoped accessor for `withComplimentaryTicketHeading` within a parent container (Card) */
  getScopedWithComplimentaryTicketHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With complimentary ticket", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "With private onsen"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With private onsen', exact: true })`
   */
  get withPrivateOnsenHeading(): Locator {
    return this.page.getByRole("heading", { name: "With private onsen", exact: true });
  }

  /** Scoped accessor for `withPrivateOnsenHeading` within a parent container (Card) */
  getScopedWithPrivateOnsenHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With private onsen", exact: true });
  }
}

export default HotelPlansGeneratedPage;
