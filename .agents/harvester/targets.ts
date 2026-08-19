import { Page } from "@playwright/test";
import { HarvesterConfig } from "./types";

function resolveTargetUrl(route: string, baseURL?: string): string {
  const defaultBase = "https://hotel-example-site.takeyaqa.dev/en-US/";
  const base = (baseURL || defaultBase).endsWith("/") ? baseURL || defaultBase : `${baseURL || defaultBase}/`;
  let cleaned = route;
  if (base.includes("/en-US/") && cleaned.startsWith("/en-US/")) {
    cleaned = cleaned.replace(/^\/en-US\//, "");
  }
  return new URL(cleaned.replace(/^\//, ""), base).toString();
}

export const config: HarvesterConfig = {
  baseURL: process.env.BASE_HOTEL_URL || "https://hotel-example-site.takeyaqa.dev",
  appBuild: process.env.APP_BUILD || "local-dev",
  harvesterVersion: "1.0.0",
  outputDir: ".agents/page-map",
  targets: [
    {
      pageKey: "HotelHome",
      route: "/en-US/index.html",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "HotelPlans",
      route: "/en-US/plans.html",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "networkidle",
        extraSelector: ".card",
      },
    },
    {
      pageKey: "HotelLogin",
      route: "/en-US/login.html",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "HotelSignup",
      route: "/en-US/signup.html",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "HotelMyPage",
      route: "/en-US/mypage.html",
      rootSelector: "body",
      roles: ["hotelUser"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "HotelReservation",
      route: "/en-US/reserve.html?plan-id=0",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "HotelConfirmation",
      route: "/en-US/confirm.html",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
          fixture: async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
            await page.goto(resolveTargetUrl("/en-US/reserve.html?plan-id=0", baseURL), {
              waitUntil: "domcontentloaded",
            });
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
            const day = String(tomorrow.getDate()).padStart(2, "0");
            const dateStr = `${year}/${month}/${day}`;
            await page.locator("#date").fill(dateStr);
            await page.evaluate((d) => {
              const $ = (window as any).$;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              if ($ && $("#date").data("datepicker")) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                $("#date").datepicker("setDate", d);
              }
            }, dateStr);
            await page.locator("#term").fill("1");
            await page.locator("#head-count").fill("1");
            await page.locator("#username").fill("Test User");
            await page.locator("#contact").selectOption("no");
            await Promise.all([
              page.waitForURL("**/confirm.html*", { waitUntil: "domcontentloaded", timeout: 15_000 }),
              page.locator("#submit-button").click(),
            ]);
          },
        },
        {
          key: "modalOpened",
          fixture: async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
            await page.goto(resolveTargetUrl("/en-US/reserve.html?plan-id=0", baseURL), {
              waitUntil: "domcontentloaded",
            });
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
            const day = String(tomorrow.getDate()).padStart(2, "0");
            const dateStr = `${year}/${month}/${day}`;
            await page.locator("#date").fill(dateStr);
            await page.evaluate((d) => {
              const $ = (window as any).$;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              if ($ && $("#date").data("datepicker")) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                $("#date").datepicker("setDate", d);
              }
            }, dateStr);
            await page.locator("#term").fill("1");
            await page.locator("#head-count").fill("1");
            await page.locator("#username").fill("Test User");
            await page.locator("#contact").selectOption("no");
            await Promise.all([
              page.waitForURL("**/confirm.html*", { waitUntil: "domcontentloaded", timeout: 15_000 }),
              page.locator("#submit-button").click(),
            ]);
          },
          openers: [
            {
              description: "Open Success Modal",
              action: async (page: Page) => {
                const btn = page.getByRole("button", { name: "Submit Reservation" });
                if (await btn.isVisible()) {
                  await btn.click();
                  await page.locator(".modal.show, .modal-title").first().waitFor({ state: "visible", timeout: 5000 });
                }
              },
            },
          ],
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "TAMyAccount",
      route: "/my-account/",
      baseURL: process.env.BASE_TA_URL || "https://demo.testarchitect.com",
      rootSelector: ".woocommerce-MyAccount-navigation-wrapper, #customer_login",
      roles: ["unauthenticated", "standardUser"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "AEHome",
      route: "/",
      baseURL: process.env.BASE_AE_URL || "https://automationexercise.com",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "AELogin",
      route: "/login",
      baseURL: process.env.BASE_AE_URL || "https://automationexercise.com",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "AESignup",
      route: "/signup",
      baseURL: process.env.BASE_AE_URL || "https://automationexercise.com",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
          fixture: async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
            const email = `harvester_${Date.now()}@example.com`;
            await page.goto(resolveTargetUrl("/login", baseURL || "https://automationexercise.com"), {
              waitUntil: "domcontentloaded",
            });
            await page.locator("form[action='/signup'] input[name='name']").fill("Harvester Temp");
            await page.locator("form[action='/signup'] input[name='email']").fill(email);
            await Promise.all([
              page.waitForURL("**/signup", { waitUntil: "domcontentloaded", timeout: 15_000 }),
              page.locator("form[action='/signup'] button[type='submit']").click(),
            ]);
          },
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
    {
      pageKey: "AEAccountCreated",
      route: "/account_created",
      baseURL: process.env.BASE_AE_URL || "https://automationexercise.com",
      rootSelector: "body",
      roles: ["unauthenticated"],
      variants: [
        {
          key: "default",
          fixture: async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
            const email = `harvester_${Date.now()}@example.com`;
            await page.goto(resolveTargetUrl("/login", baseURL || "https://automationexercise.com"), {
              waitUntil: "domcontentloaded",
            });
            await page.locator("form[action='/signup'] input[name='name']").fill("Harvester Temp");
            await page.locator("form[action='/signup'] input[name='email']").fill(email);
            await Promise.all([
              page.waitForURL("**/signup", { waitUntil: "domcontentloaded", timeout: 15_000 }),
              page.locator("form[action='/signup'] button[type='submit']").click(),
            ]);
            await page.locator("#id_gender1").check();
            await page.locator("#password").fill("Password123!");
            await page.locator("#days").selectOption("1");
            await page.locator("#months").selectOption("1");
            await page.locator("#years").selectOption("2000");
            await page.locator("#first_name").fill("John");
            await page.locator("#last_name").fill("Doe");
            await page.locator("#address1").fill("123 Main St");
            await page.locator("#country").selectOption("United States");
            await page.locator("#state").fill("NY");
            await page.locator("#city").fill("New York");
            await page.locator("#zipcode").fill("10001");
            await page.locator("#mobile_number").fill("1234567890");
            await Promise.all([
              page.waitForURL("**/account_created", { waitUntil: "domcontentloaded", timeout: 15_000 }),
              page.locator("button[data-qa='create-account']").click(),
            ]);
          },
        },
      ],
      settle: {
        waitFor: "domcontentloaded",
      },
    },
  ],
};

export default config;
