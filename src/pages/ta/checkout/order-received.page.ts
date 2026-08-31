import { Locator, Page } from "fixtures/base-fixture";

import { OrderDetail } from "models/order-detail";
import NumberUtils from "utils/number-utils";

export default class OrderReceivedPage {
  readonly orderDetailsArea: Locator = this.page.locator(".order_details");
  readonly orderNumber: Locator = this.orderDetailsArea.locator(".order strong");
  readonly orderDate: Locator = this.orderDetailsArea.locator(".date strong");
  readonly total: Locator = this.orderDetailsArea.locator(".total strong");

  constructor(private readonly page: Page) {}

  async getOrderDetails(): Promise<OrderDetail> {
    const orderNumberText = await this.orderNumber.innerText();
    const orderDateText = await this.orderDate.innerText();
    const totalText = await this.total.innerText();

    return {
      orderNumber: Number(orderNumberText),
      orderDate: orderDateText || "N/A",
      total: NumberUtils.extractNumber(totalText || ""),
    };
  }
}
