import util from "node:util";

import { test } from "@playwright/test";

import { JiraClient } from "utils/jira-client";
import settings from "settings";

// Time periods for data-driven testing
const TIME_PERIODS = [
  { from: "2025-07-01", to: "2025-10-20" },
  { from: "2025-10-21", to: "2025-10-27" },
  { from: "2025-10-28", to: "2025-11-03" },
  { from: "2025-11-04", to: "2025-11-10" },
  { from: "2025-11-11", to: "2025-11-17" },
  { from: "2025-11-18", to: "2025-11-24" },
  { from: "2025-11-25", to: "2025-12-01" },
  { from: "2025-12-02", to: "2025-12-08" },
  { from: "2025-12-09", to: "2025-12-15" },
];

const JQL_TEMPLATE = `project = ${settings.JIRA_PROJECT}
AND "system/service group[dropdown]" IN (FIN, MFG, "S&D")
AND status IN (Done, "Production Ready")
AND (
  status CHANGED TO Done DURING ("%s", "%s")
  OR status CHANGED TO "Production Ready" DURING ("%s", "%s")
)`;

const jiraClient: JiraClient = new JiraClient();

// npx playwright test src/tests/jira-issue-count.spec.ts --workers=1
test(`Get approximate issue count`, async () => {
  for (const period of TIME_PERIODS) {
    const jql = util.format(JQL_TEMPLATE, period.from, period.to, period.from, period.to);

    const approximateCount = await jiraClient.getApproximateIssueCount(jql);
    console.log(approximateCount);
  }
});
