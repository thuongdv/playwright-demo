import { Locator, Page } from "@playwright/test";

import { BillingDetail } from "models/billing-detail";

export default class CheckoutPage {
  private readonly firstNameText: Locator = this.page.getByRole("textbox", { name: /First name/i });
  private readonly lastNameText: Locator = this.page.getByRole("textbox", { name: /Last name/i });
  private readonly countryCombobox: Locator = this.page.locator("#billing_country");
  private readonly streetAddressText: Locator = this.page.getByRole("textbox", { name: /Street address/i });
  private readonly cityText: Locator = this.page.getByRole("textbox", { name: /Town|City/i });
  private readonly phoneText: Locator = this.page.getByRole("textbox", { name: /Phone/i });
  private readonly emailText: Locator = this.page.getByRole("textbox", { name: /Email address/i });
  private readonly placeOrderButton: Locator = this.page.getByRole("button", { name: /Place Order/i });

  constructor(private page: Page) {}

  async fillBillingDetails(details: BillingDetail): Promise<void> {
    await this.fillFirstName(details.firstName);
    await this.fillLastName(details.lastName);
    await this.selectCountry(details.country);
    await this.fillStreetAddress(details.streetAddress);
    await this.fillCity(details.city);
    await this.fillPhone(details.phone);
    await this.fillEmail(details.email);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameText.fill("");
    await this.firstNameText.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameText.fill("");
    await this.lastNameText.fill(lastName);
  }

  async fillStreetAddress(streetAddress: string): Promise<void> {
    await this.streetAddressText.fill("");
    await this.streetAddressText.fill(streetAddress);
  }

  async fillCity(city: string): Promise<void> {
    await this.cityText.fill("");
    await this.cityText.fill(city);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneText.fill("");
    await this.phoneText.fill(phone);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailText.fill("");
    await this.emailText.fill(email);
  }

  async selectCountry(country: string): Promise<void> {
    await this.countryCombobox.selectOption(country);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
