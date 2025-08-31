import { devices, PlaywrightTestConfig } from "@playwright/test";
import _ from "underscore";

import settings from "settings";

const RPconfig = {
  apiKey: settings.REPORT_PORTAL_TOKEN,
  endpoint: settings.REPORT_PORTAL_URL,
  project: settings.REPORT_PORTAL_PROJECT,
  launch: "playwright-demo",
  description: "Playwright with Report Portal",
  includeTestSteps: true,
};

const config: PlaywrightTestConfig = {
  reporter: [["@reportportal/agent-js-playwright", RPconfig], ["html"]],
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const defaultConfig: PlaywrightTestConfig = {
  // Timeout for each test in milliseconds. Defaults to 30 seconds.
  timeout: 180_000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText('text')`.
     */
    timeout: 20_000,
  },
  testDir: "./src/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: settings.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Screenshot on failure. */
    screenshot: "only-on-failure",
    // Record video only when retrying a test for the first time.
    video: "on-first-retry",
    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    channel: "chrome",
    actionTimeout: 30_000,
    navigationTimeout: 30_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1600, height: 900 },
      },
    },
  ],
};

export default process.env.REPORT === "rp" ? _.extend(defaultConfig, config) : defaultConfig;
