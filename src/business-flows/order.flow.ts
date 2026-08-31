import { Page } from "fixtures/base-fixture";
import { billingDetail } from "models/billing-detail";
import { OrderDetail } from "models/order-detail";
import CartPage from "pages/ta/cart.page";
import CheckoutPage from "pages/ta/checkout.page";
import OrderReceivedPage from "pages/ta/checkout/order-received.page";
import HomePage from "pages/ta/home.page";
import ProductCategoryPage from "pages/ta/product-category.page";
import { step } from "utils/step";

export default class OrderFlow {
  private readonly homePage = new HomePage(this.page);
  private readonly cartPage = new CartPage(this.page);
  private readonly checkoutPage = new CheckoutPage(this.page);
  private readonly orderReceivedPage = new OrderReceivedPage(this.page);
  private readonly productCategoryPage = new ProductCategoryPage(this.page);

  constructor(private readonly page: Page) {}

  @step("Create a new order")
  async createOrder(): Promise<OrderDetail> {
    await this.homePage.selectDepartment("Consumer Electronics");

    await this.productCategoryPage.addRandomProductToCart(2);

    await this.homePage.clickShoppingCartButton();
    await this.cartPage.clickProcessCheckoutButton();

    await this.checkoutPage.fillBillingDetails(billingDetail);
    await this.checkoutPage.placeOrder();

    const orderDetail: OrderDetail = await this.orderReceivedPage.getOrderDetails();

    return orderDetail;
  }
}
