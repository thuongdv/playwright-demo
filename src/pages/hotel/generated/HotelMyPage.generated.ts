import { Locator, Page } from "fixtures/base-fixture";

export class HotelMyPageGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Address"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Address', exact: true })`
   */
  get addressHeading(): Locator {
    return this.page.getByRole("heading", { name: "Address", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Date of birth"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Date of birth', exact: true })`
   */
  get dateOfBirthHeading(): Locator {
    return this.page.getByRole("heading", { name: "Date of birth", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Delete Account"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Delete Account', exact: true })`
   */
  get deleteAccountButton(): Locator {
    return this.page.getByRole("button", { name: "Delete Account", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Email"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Email', exact: true })`
   */
  get emailHeading(): Locator {
    return this.page.getByRole("heading", { name: "Email", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Gender"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Gender', exact: true })`
   */
  get genderHeading(): Locator {
    return this.page.getByRole("heading", { name: "Gender", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "GitHub"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'GitHub', exact: true })`
   */
  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Home"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Home', exact: true })`
   */
  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Hotel Planisphere"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Hotel Planisphere', exact: true })`
   */
  get hotelPlanisphereHeading(): Locator {
    return this.page.getByRole("heading", { name: "Hotel Planisphere", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Hotel Planisphere"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Hotel Planisphere', exact: true })`
   */
  get hotelPlanisphereLink(): Locator {
    return this.page.getByRole("link", { name: "Hotel Planisphere", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Icon Setting"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Icon Setting', exact: true })`
   */
  get iconSettingButton(): Locator {
    return this.page.getByRole("button", { name: "Icon Setting", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Logout"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Logout', exact: true })`
   */
  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Membership"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Membership', exact: true })`
   */
  get membershipHeading(): Locator {
    return this.page.getByRole("heading", { name: "Membership", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "MyPage"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'MyPage', exact: true })`
   */
  get mypageHeading(): Locator {
    return this.page.getByRole("heading", { name: "MyPage", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Mypage"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Mypage', exact: true })`
   */
  get mypageLink(): Locator {
    return this.page.getByRole("link", { name: "Mypage", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Name"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Name', exact: true })`
   */
  get nameHeading(): Locator {
    return this.page.getByRole("heading", { name: "Name", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Notification"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Notification', exact: true })`
   */
  get notificationHeading(): Locator {
    return this.page.getByRole("heading", { name: "Notification", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Reserve"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('link', { name: 'Reserve', exact: true })`
   */
  get reserveLink(): Locator {
    return this.page.getByRole("link", { name: "Reserve", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Tel"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('heading', { name: 'Tel', exact: true })`
   */
  get telHeading(): Locator {
    return this.page.getByRole("heading", { name: "Tel", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Toggle navigation"
   * Variants: [hotelUser.default]
   * Locator: `getByRole('button', { name: 'Toggle navigation', exact: true })`
   */
  get toggleNavigationButton(): Locator {
    return this.page.getByRole("button", { name: "Toggle navigation", exact: true });
  }
}

export default HotelMyPageGeneratedPage;
