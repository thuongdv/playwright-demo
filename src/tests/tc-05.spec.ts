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

test("Verify orders appear in order history", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.goto();
  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);

  await myAccountPage.orderLink.click();

  // Verify that the order history is displayed
  await myAccountPage.verifyOrderHistoriesDisplayed(orderHistories);
});

test("Verify orders appear in order history - grab order history information", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.goto();
  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);

  await myAccountPage.orderLink.click();

  // Verify that the order history is displayed
  const orderHistory = await myAccountPage.getOrderHistory(orderHistories[0].order);
  // Verify that the order history details are correct
  expect(orderHistory.date).toBe(orderHistories[0].date);
  expect(orderHistory.status).toBe(orderHistories[0].status);
  expect(orderHistory.total).toContain(orderHistories[0].total);
});
