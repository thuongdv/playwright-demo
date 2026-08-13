import { devices, PlaywrightTestConfig, TraceMode } from "@playwright/test";

import settings from "settings";

const traceMode = (process.env.TRACE_MODE || (process.env.CI ? "retain-on-failure" : "on")) as TraceMode;

// Browser configuration
const browserName = (process.env.BROWSER as "chromium" | "firefox" | "webkit") || "chromium";
const browserChannel = process.env.BROWSER_CHANNEL || "chrome";

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
  forbidOnly: !!settings.CI,
  /* Retry on CI only */
  retries: settings.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: settings.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"]],
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: traceMode,
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
      name: "ui-hotel",
      testDir: "./src/tests/ui/hotel",
      use: {
        ...(devices[`Desktop ${browserName.charAt(0).toUpperCase() + browserName.slice(1)}`] ||
          devices["Desktop Chrome"]),
        channel: browserChannel,
        viewport: { width: 1600, height: 900 },
        baseURL: process.env.BASE_HOTEL_URL || "https://hotel-example-site.takeyaqa.dev/en-US/",
      },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1600, height: 900 } },
    },
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

export default defaultConfig;
