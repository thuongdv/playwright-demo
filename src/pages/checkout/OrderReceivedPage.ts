import { Locator, Page } from "@playwright/test";

import { OrderDetail } from "models/order-detail";
import NumberUtils from "utils/Number";

export default class OrderReceivedPage {
  private readonly orderDetailsArea: Locator = this.page.locator(".order_details");
  private readonly orderNumber: Locator = this.orderDetailsArea.locator(".order strong");
  private readonly orderDate: Locator = this.orderDetailsArea.locator(".date strong");
  private readonly total: Locator = this.orderDetailsArea.locator(".total strong");

  constructor(private page: Page) {}

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
