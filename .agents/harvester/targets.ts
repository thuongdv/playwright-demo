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
  ],
};

export default config;
