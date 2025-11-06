import * as path from "node:path";

import { test } from "@playwright/test";

import settings from "settings";

import logger from "logger";
import { DwsTestReportExcel } from "utils/dws-test-report-excel";

const PROJECTS = [
  { name: "03.) JDEdwards Manufacturing", standardName: "MFG" },
  { name: "01.) JDEdwards Finance", standardName: "FIN" },
  { name: "02.) JDEdwards Sales & Distribution", standardName: "S_D" },
];

const EXCEL_FILE = "test-results.xlsx";

// Generate summary sheet with dates available for all three pods
// Usage: npx playwright test dws-test-results-summary.spec.ts
test("Generate summary sheet with common dates across all pods", () => {
  const excelPath = path.join(settings.REPORTS_PATH, EXCEL_FILE);

  logger.info("Reading existing Excel file...");
  const workbook = DwsTestReportExcel.getOrCreateWorkbook(excelPath);

  // Extract pod names in the order they should appear in the summary
  const podNames = PROJECTS.map((p) => p.standardName);

  logger.info(`Creating summary sheet with common dates for pods: ${podNames.join(", ")}`);
  DwsTestReportExcel.createSummarySheet(workbook, podNames);

  // Save workbook
  DwsTestReportExcel.saveWorkbook(workbook, excelPath);
  logger.info(`Summary sheet generated successfully in: ${excelPath}`);
});
