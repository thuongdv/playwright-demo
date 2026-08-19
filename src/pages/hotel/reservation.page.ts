import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export interface ReservationDetails {
  date?: string;
  term?: string;
  headCount?: string;
  contact?: string; // "no" | "email" | "tel"
  username?: string;
  email?: string;
  tel?: string;
  comment?: string;
}

export default class HotelReservationPage {
  readonly dateInput: Locator = this.page.locator("#date");
  readonly termInput: Locator = this.page.locator("#term");
  readonly headCountInput: Locator = this.page.locator("#head-count");
  readonly breakfastCheckbox: Locator = this.page.locator("#breakfast");
  readonly earlyCheckInCheckbox: Locator = this.page.locator("#early-check-in");
  readonly sightseeingCheckbox: Locator = this.page.locator("#sightseeing");
  readonly usernameInput: Locator = this.page.locator("#username");
  readonly contactSelect: Locator = this.page.locator("#contact");
  readonly emailInput: Locator = this.page.locator("#email");
  readonly telInput: Locator = this.page.locator("#tel");
  readonly commentTextarea: Locator = this.page.locator("#comment");
  readonly confirmReservationButton: Locator = this.page.locator("#submit-button");

  constructor(private readonly page: Page) {}

  @step("Fill required reservation fields")
  async fillReservationForm(details: ReservationDetails): Promise<void> {
    if (details.date) {
      await this.dateInput.fill(details.date);
      await this.page.evaluate((d) => {
        const $ = (window as any).$;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if ($ && $("#date").data("datepicker")) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          $("#date").datepicker("setDate", d);
        }
      }, details.date);
    }
    if (details.term) {
      await this.termInput.fill(details.term);
      await this.termInput.dispatchEvent("change");
    }
    if (details.headCount) {
      await this.headCountInput.fill(details.headCount);
      await this.headCountInput.dispatchEvent("change");
    }
    if (details.contact) {
      await this.contactSelect.selectOption(details.contact);
      await this.contactSelect.dispatchEvent("change");
    }
    if (details.username) {
      await this.usernameInput.fill(details.username);
    }
    if (details.email) {
      await this.emailInput.fill(details.email);
    }
    if (details.tel) {
      await this.telInput.fill(details.tel);
    }
    if (details.comment) {
      await this.commentTextarea.fill(details.comment);
    }
  }

  @step("Click Confirm Reservation button")
  async clickConfirmReservation(): Promise<void> {
    await Promise.all([this.page.waitForURL("**/confirm.html*"), this.confirmReservationButton.click()]);
  }
}
