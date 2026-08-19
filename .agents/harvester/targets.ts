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
  ],
};

export default config;
