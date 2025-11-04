import util from "node:util";

import { test } from "@playwright/test";

import { JiraClient } from "utils/jira-client";

// Time periods for data-driven testing
const TIME_PERIODS = [
  { from: "2025-07-01", to: "2025-10-21" },
  { from: "2025-10-22", to: "2025-10-28" },
  { from: "2025-10-29", to: "2025-11-04" },
  { from: "2025-11-05", to: "2025-11-11" },
  { from: "2025-11-12", to: "2025-11-18" },
  { from: "2025-11-19", to: "2025-11-25" },
  { from: "2025-11-26", to: "2025-12-02" },
  { from: "2025-12-03", to: "2025-12-09" },
  { from: "2025-12-10", to: "2025-12-16" },
];

const JQL_TEMPLATE = `project = JDETA
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
