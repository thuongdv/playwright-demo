import { Locator, Page } from "fixtures/base-fixture";
import { step } from "utils/step";

export default class HotelMyPage {
  readonly mypageHeading: Locator = this.page.getByRole("heading", { name: "MyPage", exact: true });
  readonly emailHeading: Locator = this.page.getByRole("heading", { name: "Email", exact: true });
  readonly nameHeading: Locator = this.page.getByRole("heading", { name: "Name", exact: true });
  readonly membershipHeading: Locator = this.page.getByRole("heading", { name: "Membership", exact: true });
  readonly addressHeading: Locator = this.page.getByRole("heading", { name: "Address", exact: true });
  readonly telHeading: Locator = this.page.getByRole("heading", { name: "Tel", exact: true });
  readonly genderHeading: Locator = this.page.getByRole("heading", { name: "Gender", exact: true });
  readonly dateOfBirthHeading: Locator = this.page.getByRole("heading", { name: "Date of birth", exact: true });
  readonly notificationHeading: Locator = this.page.getByRole("heading", { name: "Notification", exact: true });
  readonly logoutButton: Locator = this.page.getByRole("button", { name: "Logout" });
  readonly iconSettingButton: Locator = this.page.getByRole("button", { name: "Icon Setting" });
  readonly deleteAccountButton: Locator = this.page.getByRole("button", { name: "Delete Account" });

  readonly emailText: Locator = this.page.locator("#email");
  readonly nameText: Locator = this.page.locator("#username");
  readonly membershipText: Locator = this.page.locator("#rank");
  readonly addressText: Locator = this.page.locator("#address");
  readonly telText: Locator = this.page.locator("#tel");
  readonly genderText: Locator = this.page.locator("#gender");
  readonly dateOfBirthText: Locator = this.page.locator("#birthday");
  readonly notificationText: Locator = this.page.locator("#notification");

  constructor(private readonly page: Page) {}

  @step("Navigate to Hotel MyPage")
  async goto(): Promise<void> {
    await this.page.goto("/en-US/mypage.html");
  }

  @step("Click Logout button")
  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }
}
