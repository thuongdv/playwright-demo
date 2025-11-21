import path from "node:path";

import { test } from "@playwright/test";
import * as XLSX from "xlsx";

import settings from "settings";
import { JiraClient } from "utils/jira-client";

import logger from "logger";
import type { JiraIssue } from "utils/jira-client";

interface IssueWithBugs {
  issueSummary: string;
  issueId: string;
  bugTickets: string;
}

// JQL Query to find Bug issues with specific label in JDETA project
// Then we'll extract the parent Stories/Tasks these bugs are linked to
const JQL_BUG_FILTER = `project = JDETA
AND issuetype = Bug
AND labels = "DB-Refresh-2025-11-14" ORDER BY created DESC`;

const jiraClient = new JiraClient();

// npx playwright test src/tests/jira-issues-have-bugs.spec.ts --workers=1
test("Collect Jira issues with linked bugs and export to Excel", async () => {

  // Fetch all issues with issuelinks field included
  const bugs: JiraIssue[] = await jiraClient.getAllIssues(JQL_BUG_FILTER, [
    "key",
    "summary",
    "status",
    "created",
    "updated",
    "issuelinks",
  ]);

  // Process bugs to extract their parent Story/Task issues
  const parentIssuesMap = new Map<string, { summary: string; bugs: string[] }>();

  for (const bug of bugs) {
    const parentIssues = extractParentIssues(bug);

    for (const parent of parentIssues) {
      if (!parentIssuesMap.has(parent.key)) {
        parentIssuesMap.set(parent.key, {
          summary: parent.summary,
          bugs: [],
        });
      }
      parentIssuesMap.get(parent.key)!.bugs.push(bug.key);
    }
  }

  // Convert map to array
  const issuesWithBugs: IssueWithBugs[] = Array.from(parentIssuesMap.entries()).map(([key, data]) => ({
    issueId: `${settings.JIRA_BASE_URL}/browse/${key}`,
    issueSummary: data.summary,
    bugTickets: data.bugs.map((bugKey) => `${settings.JIRA_BASE_URL}/browse/${bugKey}`).join(",\n"),
  }));


  // Export to Excel
  const outputPath = path.join(settings.REPORTS_PATH, `jira-issues-with-bugs-${Date.now()}.xlsx`);
  exportToExcel(issuesWithBugs, outputPath);

  logger.info(`\nTotal issues with bugs: ${issuesWithBugs.length}`);
  logger.info(`Excel file saved to: ${outputPath}`);
});

/**
 * Extract parent Story/Task issues from a Bug issue
 * - Link type is "Bug" with "is a bug of" relationship (inwardIssue)
 */
function extractParentIssues(bug: JiraIssue): Array<{ key: string; summary: string }> {
  const parentIssues: Array<{ key: string; summary: string }> = [];

  if (!bug.fields.issuelinks || bug.fields.issuelinks.length === 0) {
    return parentIssues;
  }

  for (const link of bug.fields.issuelinks) {
    // Check if this is a "is a bug of" link (inward direction)
    if (link.type.inward.toLowerCase() === "is a bug of" && link.inwardIssue) {
      const parentIssue = link.inwardIssue;
      
      // For now, include all parent issues since we can't filter by service group
      // (service group field is not included in the linked issue data)
      parentIssues.push({
        key: parentIssue.key,
        summary: parentIssue.fields.summary,
      });
    }
  }

  return parentIssues;
}

/**
 * Export issues with bugs to Excel file
 */
function exportToExcel(data: IssueWithBugs[], outputPath: string): void {
  // Create worksheet data with headers
  const worksheetData = [
    ["Issue Summary", "Issue ID", "Bug Tickets"],
    ...data.map((item) => [item.issueSummary, item.issueId, item.bugTickets]),
  ];

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column widths for better readability
  worksheet["!cols"] = [{ wch: 60 }, { wch: 45 }, { wch: 45 }];

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Issues with Bugs");

  // Write to file
  XLSX.writeFile(workbook, outputPath);
}
