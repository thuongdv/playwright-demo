import { Locator, Page } from "fixtures/base-fixture";

export class HotelReservationGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `checkbox` | Accessible Name: "Breakfast"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Breakfast')`
   */
  get breakfastCheckbox(): Locator {
    return this.page.getByLabel("Breakfast");
  }

  /**
   * Role: `textbox` | Accessible Name: "Check-in required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Check-in required')`
   */
  get checkInRequiredTextbox(): Locator {
    return this.page.getByLabel("Check-in required");
  }

  /**
   * Role: `combobox` | Accessible Name: "Confirmation required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Confirmation required')`
   */
  get confirmationRequiredCombobox(): Locator {
    return this.page.getByLabel("Confirmation required");
  }

  /**
   * Role: `checkbox` | Accessible Name: "Early check-in"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Early check-in')`
   */
  get earlyCheckInCheckbox(): Locator {
    return this.page.getByLabel("Early check-in");
  }

  /**
   * Role: `textbox` | Accessible Name: "Email required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Email required')`
   */
  get emailRequiredTextbox(): Locator {
    return this.page.getByLabel("Email required");
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
   * Role: `spinbutton` | Accessible Name: "Guests required"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('spinbutton', { name: 'Guests required' })`
   */
  get guestsRequiredSpinbutton(): Locator {
    return this.page.getByRole("spinbutton", { name: "Guests required" });
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
   * Role: `textbox` | Accessible Name: "Name required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Name required')`
   */
  get nameRequiredTextbox(): Locator {
    return this.page.getByLabel("Name required");
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#plan-id-hidden')`
   */
  get planIdHiddenTextbox(): Locator {
    return this.page.locator("#plan-id-hidden");
  }

  /** Scoped accessor for `planIdHiddenTextbox` within a parent container (Container) */
  getScopedPlanIdHiddenTextbox(scope: Locator): Locator {
    return scope.locator("#plan-id-hidden");
  }

  /**
   * Role: `heading`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#plan-name')`
   */
  get planNameHeading(): Locator {
    return this.page.locator("#plan-name");
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#plan-name-hidden')`
   */
  get planNameHiddenTextbox(): Locator {
    return this.page.locator("#plan-name-hidden");
  }

  /** Scoped accessor for `planNameHiddenTextbox` within a parent container (Container) */
  getScopedPlanNameHiddenTextbox(scope: Locator): Locator {
    return scope.locator("#plan-name-hidden");
  }

  /**
   * Role: `heading` | Accessible Name: "Reservation"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Reservation' })`
   */
  get reservationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Reservation" });
  }

  /**
   * Role: `textbox`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#room-bill-hidden')`
   */
  get roomBillHiddenTextbox(): Locator {
    return this.page.locator("#room-bill-hidden");
  }

  /** Scoped accessor for `roomBillHiddenTextbox` within a parent container (Container) */
  getScopedRoomBillHiddenTextbox(scope: Locator): Locator {
    return scope.locator("#room-bill-hidden");
  }

  /**
   * Role: `checkbox` | Accessible Name: "Sightseeing"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Sightseeing')`
   */
  get sightseeingCheckbox(): Locator {
    return this.page.getByLabel("Sightseeing");
  }

  /**
   * Role: `textbox` | Accessible Name: "Special request"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Special request')`
   */
  get specialRequestTextbox(): Locator {
    return this.page.getByLabel("Special request");
  }

  /**
   * Role: `spinbutton` | Accessible Name: "Stay required"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('spinbutton', { name: 'Stay required' })`
   */
  get stayRequiredSpinbutton(): Locator {
    return this.page.getByRole("spinbutton", { name: "Stay required" });
  }

  /**
   * Role: `button` | Accessible Name: "Confirm Reservation"
   * Variants: [unauthenticated.default]
   * Locator: `getByTestId('submit-button')`
   */
  get submitButton(): Locator {
    return this.page.getByTestId("submit-button");
  }

  /**
   * Role: `textbox` | Accessible Name: "Tel required"
   * Variants: [unauthenticated.default]
   * Locator: `getByLabel('Tel required')`
   */
  get telRequiredTextbox(): Locator {
    return this.page.getByLabel("Tel required");
  }

  /**
   * Role: `heading` | Accessible Name: "Total"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Total' })`
   */
  get totalHeading(): Locator {
    return this.page.getByRole("heading", { name: "Total" });
  }
}

export default HotelReservationGeneratedPage;
