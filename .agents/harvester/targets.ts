import { HarvesterConfig } from "./types";

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
