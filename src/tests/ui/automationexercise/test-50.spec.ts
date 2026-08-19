import { expect, test } from "fixtures/base-fixture";

test.describe("User Registration", () => {
  test("TEST-50 - Successful user registration with valid unregistered email", async ({
    aeHomePage,
    aeLoginPage,
    aeSignupPage,
    aeAccountCreatedPage,
  }) => {
    // 1. Navigate to the home page and click on 'Signup / Login' in the top navigation bar
    await aeHomePage.goto();
    await aeHomePage.clickSignupLoginLink();

    // Expected Result: The Signup / Login page is displayed with Signup and Login forms.
    await expect(aeLoginPage.newUserSignupHeading).toBeVisible();
    await expect(aeLoginPage.loginToYourAccountHeading).toBeVisible();
    await expect(aeLoginPage.signupNameInput).toBeVisible();
    await expect(aeLoginPage.signupEmailInput).toBeVisible();
    await expect(aeLoginPage.signupSubmitButton).toBeVisible();

    // 2. In the 'New User Signup!' section, enter a name and a unique unregistered email address, then click 'Signup'
    const timestamp = Date.now();
    const testUser = {
      name: "John Doe",
      email: `john.doe.${timestamp}@example.com`,
      title: "Mr." as const,
      password: "Password123!",
      dateOfBirth: {
        day: "1",
        month: "1",
        year: "2000",
      },
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      country: "United States",
      state: "NY",
      city: "New York",
      zipcode: "10001",
      mobileNumber: "1234567890",
    };

    await aeLoginPage.signup(testUser.name, testUser.email);

    // Expected Result: The Account Information registration form is displayed.
    await expect(aeSignupPage.enterAccountInfoHeading).toBeVisible();

    // 3. Fill in the required account information fields (Title, Password, Date of Birth, Address details, Mobile Number) and click 'Create Account'
    await aeSignupPage.fillAccountInformation(testUser);
    await aeSignupPage.clickCreateAccount();

    // Expected Result: Account creation success message is displayed and user account is created.
    await expect(aeAccountCreatedPage.successHeading).toBeVisible();
    await expect(aeAccountCreatedPage.continueBtn).toBeVisible();
  });
});
