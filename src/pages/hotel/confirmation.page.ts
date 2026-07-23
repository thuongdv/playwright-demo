import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelConfirmationPage {
  readonly submitReservationButton: Locator = this.page.getByRole("button", { name: "Submit Reservation" });
  readonly modal: Locator = this.page.locator(".modal");
  readonly modalTitle: Locator = this.page.locator(".modal-title, #exampleModalLabel, h5.modal-title");
  readonly modalBody: Locator = this.page.locator(".modal-body");
  readonly modalCloseButton: Locator = this.modal.getByRole("button", { name: "Close" }).filter({ hasText: "Close" });
  readonly modalDismissButton: Locator = this.modal.locator("button.close");

  constructor(private readonly page: Page) {}

  @step("Click Submit Reservation button")
  async clickSubmitReservation(): Promise<void> {
    await this.submitReservationButton.click();
    await this.modal.waitFor({ state: "visible" });
  }
}
