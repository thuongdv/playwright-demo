import { Page, Locator } from "@playwright/test";

import { expect } from "fixtures/BaseFixture";
import { OrderHistory, OrderHistoryTableHeaders } from "models/order-history";

export class MyAccountPage {
  readonly usernameInput: Locator = this.page.getByLabel("Username or email address *");
  readonly passwordInput: Locator = this.page.getByLabel("Password *");
  readonly rememberMeCheckbox: Locator = this.page.getByLabel("Remember me");
  readonly loginButton: Locator = this.page.getByRole("button", {
    name: "Log in",
  });
  readonly errorMessage: Locator = this.page.locator(".woocommerce-error");
  readonly heading: Locator = this.page.getByRole("heading", { name: "Login" });
  readonly logoutLink: Locator = this.page.getByRole("link", {
    name: "Logout",
  });

  private readonly myAccountNavigationArea: Locator = this.page.locator('div[class*="MyAccount-navigation-wrapper"]');
  readonly orderLink: Locator = this.myAccountNavigationArea.getByRole("link", {
    name: "Orders",
  });
  readonly oderHistoryTable: Locator = this.page.getByRole("table");
  readonly orderHistoryTableRows: Locator = this.oderHistoryTable.getByRole("row");
  readonly orderHistoryTableHeaders: Locator = this.oderHistoryTable.locator("tr th");

  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/my-account/");
  }

  async login(username: string, password: string, rememberMe = false): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }

  async verifyOrderHistoriesDisplayed(orderHistories: OrderHistory | OrderHistory[]): Promise<void> {
    const histories = Array.isArray(orderHistories) ? orderHistories : [orderHistories];

    for (const orderHistory of histories) {
      await this.verifyOrderHistoryIsDisplayed(orderHistory);
    }
  }

  private async verifyOrderHistoryIsDisplayed(orderHistory: OrderHistory): Promise<void> {
    const row = this.oderHistoryTable.getByRole("row").filter({
      has: this.page.locator('[data-title="Order"]', {
        hasText: `${orderHistory.order}`,
      }),
    });

    await expect(row).toBeVisibleWithReloadPage({ timeout: 60_000, interval: 5_000 });

    await expect(row.locator('[data-title="Date"]')).toHaveText(`${orderHistory.date}`, {
      timeout: 1_000,
      useInnerText: true,
    });
    await expect(row.locator('[data-title="Status"]')).toHaveText(`${orderHistory.status}`, {
      timeout: 1_000,
      useInnerText: true,
    });
    await expect(row.locator('[data-title="Total"]')).toHaveText(new RegExp(`${orderHistory.total.toLocaleString()}`), {
      timeout: 1_000,
      useInnerText: true,
    });
  }

  async getOrderHistory(orderNumber: number): Promise<OrderHistory> {
    const row = this.orderHistoryTableRows.filter({
      hasText: `${orderNumber}`,
    });

    await expect(row).toBeVisibleWithReloadPage({ timeout: 30_000, interval: 5_000 });

    const [dateHeaderIndex, statusHeaderIndex, totalHeaderIndex] = await Promise.all([
      this.getOrderHistoryTableHeaderIndex(OrderHistoryTableHeaders.date),
      this.getOrderHistoryTableHeaderIndex(OrderHistoryTableHeaders.status),
      this.getOrderHistoryTableHeaderIndex(OrderHistoryTableHeaders.total),
    ]);

    const [date, status, total] = await Promise.all([
      row.getByRole("cell").nth(dateHeaderIndex).innerText(),
      row.getByRole("cell").nth(statusHeaderIndex).innerText(),
      row.getByRole("cell").nth(totalHeaderIndex).innerText(),
    ]);

    const orderHistory: OrderHistory = {
      order: orderNumber,
      date: date ?? "",
      status: status ?? "",
      total: total ?? "",
    };

    return orderHistory;
  }

  private async getOrderHistoryTableHeaderIndex(headerName: string): Promise<number> {
    await expect(this.orderHistoryTableHeaders).toContainText([headerName]);
    const headers = await this.orderHistoryTableHeaders.allTextContents();
    return headers.indexOf(headerName);
  }
}
