import { expect, Page, test } from "fixtures/base-fixture";
import { billingDetail } from "models/billing-detail";
import { OrderDetail } from "models/order-detail";
import { OrderHistory } from "models/order-history";
import CartPage from "pages/ta-demo/cart.page";
import CheckoutPage from "pages/ta-demo/checkout.page";
import OrderReceivedPage from "pages/ta-demo/checkout/order-received.page";
import HomePage from "pages/ta-demo/home.page";
import MyAccountPage from "pages/ta-demo/my-account.page";
import ProductCategoryPage from "pages/ta-demo/product-category.page";
import settings from "settings";

let homePage: HomePage;
let cartPage: CartPage;
const orderDetails: OrderDetail[] = [];

test.beforeEach("Login", async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickLoginButton();

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.login(settings.TA_EMAIL, settings.TA_PASSWORD);
});

test.beforeEach("Clear shopping cart", async ({ page }) => {
  await homePage.clickShoppingCartButton();

  cartPage = new CartPage(page);
  await cartPage.clearShoppingCart({ timeout: 60_000 });
});

test.beforeEach("Create orders", async ({ page }) => {
  await createOrder(page);
  await createOrder(page);
});

test("Verify orders appear in order history - grab order history information", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);

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

const createOrder = async (page: Page) => {
  await homePage.selectDepartment("Consumer Electronics");

  const productCategoryPage = new ProductCategoryPage(page);
  await productCategoryPage.addRandomProductToCart(2);

  await homePage.clickShoppingCartButton();
  await cartPage.clickProcessCheckoutButton();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillBillingDetails(billingDetail);
  await checkoutPage.placeOrder();

  const orderReceivedPage = new OrderReceivedPage(page);
  const orderDetail: OrderDetail = await orderReceivedPage.getOrderDetails();
  orderDetails.push(orderDetail);
};
