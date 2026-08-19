import { Locator, Page } from "fixtures/base-fixture";

export class HotelPlansGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Business trip"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Business trip' })`
   */
  get businessTripHeading(): Locator {
    return this.page.getByRole("heading", { name: "Business trip" });
  }

  /** Scoped accessor for `businessTripHeading` within a parent container (Card) */
  getScopedBusinessTripHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Business trip" });
  }

  /**
   * Role: `heading` | Accessible Name: "For honeymoon"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'For honeymoon' })`
   */
  get forHoneymoonHeading(): Locator {
    return this.page.getByRole("heading", { name: "For honeymoon" });
  }

  /** Scoped accessor for `forHoneymoonHeading` within a parent container (Card) */
  getScopedForHoneymoonHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "For honeymoon" });
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

  /**
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Logout' })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout" });
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
   * Role: `heading` | Accessible Name: "Plans"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plans' })`
   */
  get plansHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plans" });
  }

  /**
   * Role: `heading` | Accessible Name: "Plan with special offers"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Plan with special offers' })`
   */
  get planWithSpecialOffersHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plan with special offers" });
  }

  /** Scoped accessor for `planWithSpecialOffersHeading` within a parent container (Card) */
  getScopedPlanWithSpecialOffersHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Plan with special offers" });
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
   * Role: `link` | Accessible Name: "Reserve room"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Reserve room' })`
   */
  get reserveRoomLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve room" });
  }

  /** Scoped accessor for `reserveRoomLink` within a parent container (Card) */
  getScopedReserveRoomLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Reserve room" });
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
   * Role: `heading` | Accessible Name: "Staying without meals"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Staying without meals' })`
   */
  get stayingWithoutMealsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Staying without meals" });
  }

  /** Scoped accessor for `stayingWithoutMealsHeading` within a parent container (Card) */
  getScopedStayingWithoutMealsHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Staying without meals" });
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation' })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation" });
  }

  /**
   * Role: `heading` | Accessible Name: "With beauty salon"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With beauty salon' })`
   */
  get withBeautySalonHeading(): Locator {
    return this.page.getByRole("heading", { name: "With beauty salon" });
  }

  /** Scoped accessor for `withBeautySalonHeading` within a parent container (Card) */
  getScopedWithBeautySalonHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With beauty salon" });
  }

  /**
   * Role: `heading` | Accessible Name: "With complimentary ticket"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With complimentary ticket' })`
   */
  get withComplimentaryTicketHeading(): Locator {
    return this.page.getByRole("heading", { name: "With complimentary ticket" });
  }

  /** Scoped accessor for `withComplimentaryTicketHeading` within a parent container (Card) */
  getScopedWithComplimentaryTicketHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With complimentary ticket" });
  }

  /**
   * Role: `heading` | Accessible Name: "With private onsen"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'With private onsen' })`
   */
  get withPrivateOnsenHeading(): Locator {
    return this.page.getByRole("heading", { name: "With private onsen" });
  }

  /** Scoped accessor for `withPrivateOnsenHeading` within a parent container (Card) */
  getScopedWithPrivateOnsenHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "With private onsen" });
  }
}

export default HotelPlansGeneratedPage;
