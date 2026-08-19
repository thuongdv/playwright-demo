import { Locator, Page } from "fixtures/base-fixture";

export class HotelConfirmationGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `button` | Accessible Name: "Close"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('button', { name: 'Close', exact: true })`
   */
  get closeButton(): Locator {
    return this.page.getByRole("button", { name: "Close", exact: true });
  }

  /** Scoped accessor for `closeButton` within a parent container (Modal) */
  getScopedCloseButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Close", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Confirm Reservation"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Confirm Reservation', exact: true })`
   */
  get confirmReservationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Confirm Reservation", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "GitHub"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('link', { name: 'GitHub', exact: true })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere', exact: true })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Plan with special offers"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Plan with special offers', exact: true })`
   */
  get planWithSpecialOffersHeading(): Locator {
    return this.page.getByRole("heading", { name: "Plan with special offers", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Submit Reservation"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('button', { name: 'Submit Reservation', exact: true })`
   */
  get submitReservationButton(): Locator {
    return this.page.getByRole("button", { name: "Submit Reservation", exact: true });
  }

  /**
   * Role: `dialog` | Accessible Name: "Thank you for reserving. × We look forward to visiting you. Close"
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('dialog', { name: 'Thank you for reserving. × We look forward to visiting you. Close', exact: true })`
   */
  get successModalDialog(): Locator {
    return this.page.getByRole("dialog", {
      name: "Thank you for reserving. × We look forward to visiting you. Close",
      exact: true,
    });
  }

  /** Scoped accessor for `successModalDialog` within a parent container (Modal) */
  getScopedSuccessModalDialog(scope: Locator): Locator {
    return scope.getByRole("dialog", {
      name: "Thank you for reserving. × We look forward to visiting you. Close",
      exact: true,
    });
  }

  /**
   * Role: `heading` | Accessible Name: "Thank you for reserving."
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: 'Thank you for reserving.', exact: true })`
   */
  get thankYouForReservingHeading(): Locator {
    return this.page.getByRole("heading", { name: "Thank you for reserving.", exact: true });
  }

  /** Scoped accessor for `thankYouForReservingHeading` within a parent container (Modal) */
  getScopedThankYouForReservingHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Thank you for reserving.", exact: true });
  }

  /**
   * Role: `heading`
   * Variants: [unauthenticated.default, unauthenticated.modalOpened]
   * Locator: `getByRole('heading', { name: /^Total [$¥€£]\s?\d+(?:,\d{3})*(?:\.\d{2})? (included taxes)$/ })`
   */
  get totalBillHeading(): Locator {
    return this.page.getByRole("heading", { name: /^Total [$¥€£]\s?\d+(?:,\d{3})*(?:\.\d{2})? (included taxes)$/ });
  }
}

export default HotelConfirmationGeneratedPage;
