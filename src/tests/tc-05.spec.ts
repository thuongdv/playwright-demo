import { test } from "@playwright/test";

import { expect } from "fixtures/BaseFixture";
import { MyAccountPage } from "pages/MyAccountPage";
import settings from "settings";

const orderHistories = [
  {
    order: 12174,
    date: "JULY 4, 2025",
    status: "PROCESSING",
    total: "1,728.00",
  },
  {
    order: 12095,
    date: "JULY 2, 2025",
    status: "PROCESSING",
    total: "258.00",
  },
];

test("Verify orders appear in order history - grab order history information", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.goto();
  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);

  await myAccountPage.orderButton.click();

  // Verify that the order history is displayed
  for (const expOrderHistory of orderHistories) {
    const orderHistory = await myAccountPage.getOrderHistory(expOrderHistory.order);
    // Verify that the order history details are correct
    expect(orderHistory.date).toBe(expOrderHistory.date);
    expect(orderHistory.status).toBe(expOrderHistory.status);
    expect(orderHistory.total).toContain(expOrderHistory.total);
  }
});
