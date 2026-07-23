import { expect, test } from "fixtures/base-fixture";
import HotelConfirmationPage from "pages/hotel/confirmation.page";
import HotelReservationPage from "pages/hotel/reservation.page";

test.describe("Hotel Reservation", () => {
  test("RESERVE_010 - Verify we can reserve a plan after being logged in", async ({
    hotelHomePage,
    hotelLoginPage,
    hotelPlansPage,
  }) => {
    // 1. Navigate to the page
    await hotelHomePage.goto();

    // 2. Log in with valid account (clark@example.com / password)
    await hotelHomePage.clickLoginLink();
    await hotelLoginPage.login("clark@example.com", "password");

    // 3. Click on the top menu link "Reserve"
    await hotelHomePage.clickReserveLink();

    // 4. Click on the button "Reserve room" of plan "Premium plan"
    const reservePageInstance = await hotelPlansPage.reservePlan("Premium plan");

    const reservationPage = new HotelReservationPage(reservePageInstance);
    const confirmationPage = new HotelConfirmationPage(reservePageInstance);

    // 5. Fill all required fields
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const dateStr = `${year}/${month}/${day}`;

    await reservationPage.fillReservationForm({
      date: dateStr,
      term: "1",
      headCount: "2",
      contact: "no",
    });

    // 6. Click on the button "Confirm Reservation"
    await reservationPage.clickConfirmReservation();

    // Expected Result: The user is redirected to Confirm Reservation page.
    await expect(reservePageInstance).toHaveURL(/.*confirm\.html.*/);

    // 7. Click on the button "Submit Reservation"
    await confirmationPage.clickSubmitReservation();

    // Expected Result: The success popup is displayed with title, content, and close button.
    await expect(confirmationPage.modal).toBeVisible();
    await expect(confirmationPage.modalTitle).toHaveText("Thank you for reserving.");
    await expect(confirmationPage.modalBody).toContainText("We look forward to visiting you.");
    await expect(confirmationPage.modalCloseButton).toBeVisible();
  });
});
