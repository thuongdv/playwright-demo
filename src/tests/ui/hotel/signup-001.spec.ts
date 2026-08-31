import { expect, test } from "fixtures/base-fixture";

test.describe("Hotel Sign Up", () => {
  test("SIGNUP_001 - Verify a user is able to sign up a new account", async ({
    hotelHomePage,
    hotelSignupPage,
    hotelMyPage,
  }) => {
    // 1. Navigate to the page (https://hotel-example-site.takeyaqa.dev/en-US/)
    await hotelHomePage.goto();

    // 2. Click on the top menu link "Sign up"
    await hotelHomePage.clickSignUpLink();

    // 3. Fill all required fields
    const timestamp = Date.now();
    const newUser = {
      email: `test_user_${timestamp}@example.com`,
      password: "Password123!",
      passwordConfirmation: "Password123!",
      name: "Jane Doe",
      rank: "normal" as const,
      address: "123 Main Street, Tokyo",
      tel: "01234567890",
      gender: "female",
      dateOfBirth: "1995-05-15",
      notification: true,
    };

    await hotelSignupPage.fillSignupForm(newUser);

    // 4. Click on the button "Sign up"
    await hotelSignupPage.clickSignUpButton();

    // Expected Result 1: The page "MyPage" is shown with the new user's information
    await expect(hotelMyPage.mypageHeading).toBeVisible();
    await expect(hotelMyPage.emailHeading).toBeVisible();
    await expect(hotelMyPage.nameHeading).toBeVisible();
    await expect(hotelMyPage.membershipHeading).toBeVisible();
    await expect(hotelMyPage.addressHeading).toBeVisible();
    await expect(hotelMyPage.telHeading).toBeVisible();
    await expect(hotelMyPage.genderHeading).toBeVisible();
    await expect(hotelMyPage.dateOfBirthHeading).toBeVisible();
    await expect(hotelMyPage.notificationHeading).toBeVisible();

    await expect(hotelMyPage.emailText).toHaveText(newUser.email);
    await expect(hotelMyPage.nameText).toHaveText(newUser.name);
    await expect(hotelMyPage.addressText).toHaveText(newUser.address);
    await expect(hotelMyPage.telText).toHaveText(newUser.tel);

    // Expected Result 2: The new user is logged in
    await expect(hotelMyPage.logoutButton).toBeVisible();
  });
});
