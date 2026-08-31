import OrderFlow from "business-flows/order.flow";
import { expect, test } from "fixtures/base-fixture";
import { OrderDetail } from "models/order-detail";
import { OrderHistory } from "models/order-history";
import settings from "settings";

const orderDetails: OrderDetail[] = [];

test.beforeEach("Login", async ({ homePage, myAccountPage }) => {
  await homePage.goto();
  await homePage.clickLoginButton();

  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);
});

test.beforeEach("Clear shopping cart", async ({ homePage, cartPage }) => {
  await homePage.clickShoppingCartButton();

  await cartPage.clearShoppingCart({ timeout: 60_000 });
});

test.beforeEach("Create orders", async ({ page }) => {
  const orderFlow = new OrderFlow(page);

  const orderDetail1 = await orderFlow.createOrder();
  orderDetails.push(orderDetail1);

  const orderDetail2 = await orderFlow.createOrder();
  orderDetails.push(orderDetail2);
});

test("Verify orders appear in order history - grab order history information", async ({ myAccountPage }) => {
  // 1. Go to My Account page
  await myAccountPage.goto();

  // 2. Click on Orders in left navigation
  await myAccountPage.clickOrderButton();

  // 3. Verify order details
  for (const expOrderDetail of orderDetails) {
    const orderHistory: OrderHistory = await myAccountPage.getOrderHistory(expOrderDetail.orderNumber);
    // Verify that the order history details are correct
    expect.soft(orderHistory.date).toMatch(new RegExp(`^${expOrderDetail.orderDate}$`, "i"));
    expect.soft(orderHistory.status).toMatch(/^On hold$/i);
    expect.soft(orderHistory.total).toContain(expOrderDetail.total);
  }
});
