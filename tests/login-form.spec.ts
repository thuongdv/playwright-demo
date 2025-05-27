import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import dotenv from "dotenv";
import settings from "settings";

dotenv.config();

// Login form tests for https://demo.testarchitect.com/my-account/
test.describe("Login Form", () => {
  test("should display login form", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("should show error for empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("", "");
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalid-user", "invalid-pass");
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("should allow Remember me checkbox", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await loginPage.rememberMeCheckbox.check();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
  });

  test("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const email = settings.TA_EMAIL!;
    const password = settings.TA_PASSWORD!;
    await loginPage.login(email, password);
    // Assert successful login: check for logout link or account page
    await expect(loginPage.logoutLink).toBeVisible();
  });
});
