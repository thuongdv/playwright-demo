import { Locator, Page } from "fixtures/base-fixture";

export class HotelConfirmationGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `button` | Accessible Name: "Close"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('button', { name: 'Close' })`
   */
  get closeButton(): Locator {
    return this.page.getByRole("button", { name: "Close" });
  }

  /** Scoped accessor for `closeButton` within a parent container (Modal) */
  getScopedCloseButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Close" });
  }

  /**
   * Role: `heading` | Accessible Name: "Confirm Reservation"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Confirm Reservation' })`
   */
  get confirmReservationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Confirm Reservation" });
  }

  /**
   * Role: `link` | Accessible Name: "GitHub"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('link', { name: 'GitHub' })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub" });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere' })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere" });
  }

  /**
   * Role: `heading` | Accessible Name: "Plan with special offers"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Plan with special offers' })`
   */
  get planWithSpecialOffersHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plan with special offers" });
  }

  /**
   * Role: `button` | Accessible Name: "Submit Reservation"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('button', { name: 'Submit Reservation' })`
   */
  get submitReservationButton(): Locator {
    return this.page.getByRole("button", { name: "Submit Reservation" });
  }

  /**
   * Role: `dialog` | Accessible Name: "Thank you for reserving. × We look forward to visiting you. Close"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('dialog', { name: 'Thank you for reserving. × We look forward to visiting you. Close' })`
   */
  get successModalDialog(): Locator {
    return this.page.getByRole("dialog", { name: "Thank you for reserving. × We look forward to visiting you. Close" });
  }

  /** Scoped accessor for `successModalDialog` within a parent container (Modal) */
  getScopedSuccessModalDialog(scope: Locator): Locator {
    return scope.getByRole("dialog", { name: "Thank you for reserving. × We look forward to visiting you. Close" });
  }

  /**
   * Role: `heading` | Accessible Name: "Thank you for reserving."
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Thank you for reserving.' })`
   */
  get thankYouForReservingHeading(): Locator {
    return this.page.getByRole("heading", { name: "Thank you for reserving." });
  }

  /** Scoped accessor for `thankYouForReservingHeading` within a parent container (Modal) */
  getScopedThankYouForReservingHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Thank you for reserving." });
  }

  /**
   * Role: `heading`
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `locator('#total-bill')`
   */
  get totalBillHeading(): Locator {
    return this.page.locator("#total-bill");
  }
}

export default HotelConfirmationGeneratedPage;
