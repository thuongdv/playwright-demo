import { expect, test } from "fixtures/base-fixture";

test.describe("User Registration", () => {
  test("TEST-51 - Prevent account registration with an already registered email", async ({
    aeHomePage,
    aeLoginPage,
    aeSignupPage,
  }) => {
    // 1. Navigate to the Signup / Login page from the top navigation
    await aeHomePage.goto();
    await aeHomePage.clickSignupLoginLink();

    // Expected Result: The Signup / Login page is displayed.
    await expect(aeLoginPage.newUserSignupHeading).toBeVisible();
    await expect(aeLoginPage.loginToYourAccountHeading).toBeVisible();
    await expect(aeLoginPage.signupNameInput).toBeVisible();
    await expect(aeLoginPage.signupEmailInput).toBeVisible();
    await expect(aeLoginPage.signupSubmitButton).toBeVisible();

    // 2. Enter a name and an already registered email address in the Signup section and click 'Signup'
    const existingUser = {
      name: "Jane Doe",
      email: "existing.user@example.com",
    };

    await aeLoginPage.submitSignup(existingUser.name, existingUser.email);

    // Expected Result: An error message indicating that the email address already exists is displayed.
    await expect(aeLoginPage.emailAlreadyExistErrorMessage).toBeVisible();

    // 3. Verify system state after registration attempt
    // Expected Result: User is not navigated to the account creation form and no duplicate account is created.
    await expect(aeSignupPage.enterAccountInfoHeading).not.toBeVisible();
  });
});
