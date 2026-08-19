import { Locator, Page } from "fixtures/base-fixture";

export class HotelMyPageGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Address"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Address' })`
   */
  get addressHeading(): Locator {
    return this.page.getByRole("heading", { name: "Address" });
  }

  /**
   * Role: `heading` | Accessible Name: "Date of birth"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Date of birth' })`
   */
  get dateOfBirthHeading(): Locator {
    return this.page.getByRole("heading", { name: "Date of birth" });
  }

  /**
   * Role: `button` | Accessible Name: "Delete Account"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Delete Account' })`
   */
  get deleteAccountButton(): Locator {
    return this.page.getByRole("button", { name: "Delete Account" });
  }

  /**
   * Role: `heading` | Accessible Name: "Email"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Email' })`
   */
  get emailHeading(): Locator {
    return this.page.getByRole("heading", { name: "Email" });
  }

  /**
   * Role: `heading` | Accessible Name: "Gender"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Gender' })`
   */
  get genderHeading(): Locator {
    return this.page.getByRole("heading", { name: "Gender" });
  }

  /**
   * Role: `link` | Accessible Name: "GitHub"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'GitHub' })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub" });
  }

  /**
   * Role: `link` | Accessible Name: "Home"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Home' })`
   */
  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home" });
  }

  /**
   * Role: `heading` | Accessible Name: "Hotel Planisphere"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Hotel Planisphere' })`
   */
  get hotelPlanisphereHeading(): Locator {
    return this.page.getByRole("heading", { name: "Hotel Planisphere" });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere' })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere" });
  }

  /**
   * Role: `button` | Accessible Name: "Icon Setting"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Icon Setting' })`
   */
  get iconSettingButton(): Locator {
    return this.page.getByRole("button", { name: "Icon Setting" });
  }

  /**
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Logout' })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout" });
  }

  /**
   * Role: `heading` | Accessible Name: "Membership"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Membership' })`
   */
  get membershipHeading(): Locator {
    return this.page.getByRole("heading", { name: "Membership" });
  }

  /**
   * Role: `heading` | Accessible Name: "MyPage"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'MyPage' })`
   */
  get mypageHeading(): Locator {
    return this.page.getByRole("heading", { name: "MyPage" });
  }

  /**
   * Role: `link` | Accessible Name: "Mypage"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Mypage' })`
   */
  get mypageLink(): Locator {
    return this.page.getByRole("link", { name: "Mypage" });
  }

  /**
   * Role: `heading` | Accessible Name: "Name"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Name' })`
   */
  get nameHeading(): Locator {
    return this.page.getByRole("heading", { name: "Name" });
  }

  /**
   * Role: `heading` | Accessible Name: "Notification"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Notification' })`
   */
  get notificationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Notification" });
  }

  /**
   * Role: `link` | Accessible Name: "Reserve"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Reserve' })`
   */
  get reserveLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve" });
  }

  /**
   * Role: `heading` | Accessible Name: "Tel"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Tel' })`
   */
  get telHeading(): Locator {
    return this.page.getByRole("heading", { name: "Tel", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation' })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation" });
  }
}

export default HotelMyPageGeneratedPage;
