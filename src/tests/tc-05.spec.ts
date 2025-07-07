import { test } from "@playwright/test";

import { MyAccountPage } from "pages/MyAccountPage";
import settings from "settings";

test("Verify orders appear in order history", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.goto();
  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);

  await myAccountPage.orderLink.click();

  // Verify that the order history is displayed
  const orderHistories = [
    {
      order: 12174,
      date: "July 4, 2025",
      status: "Processing",
      total: 1728,
    },
    {
      order: 12095,
      date: "July 2, 2025",
      status: "Processing",
      total: 258,
    },
  ];
  await myAccountPage.verifyOrderHistoryIsDisplayed(orderHistories);
});
