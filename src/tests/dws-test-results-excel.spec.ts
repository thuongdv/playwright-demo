import * as path from "node:path";

import { expect, test } from "@playwright/test";
import LoginPage from "pages/dws/login-page";

import { PROJECTS } from "constants/project-configs";
import logger from "logger";
import settings from "settings";
import DwsApi from "utils/dws-api";
import { DwsTestReportExcel } from "utils/dws-test-report-excel";
import { RowData } from "utils/excel-utils";

const EXCEL_FILE = "test-results.xlsx";

// Helper: process automated queues for a project and generate worksheet
async function processProjectQueues(
  _project: { name: string; standardName: string },
  automatedQueuesData: {
    data?: { Value?: Array<{ key?: string | number; executionStartTimeStamp?: string; duration?: string }> };
  },
  dwsApi: DwsApi,
  existingQueueIds: Set<string>,
): Promise<RowData[] | null> {
  if (!automatedQueuesData.data?.Value) throw new Error("No automated queues found for the test queue");

  const queueData: { queueId: string; row: RowData }[] = [];

  // Process all available queues first
  for (const automatedQueue of automatedQueuesData.data.Value) {
    if (!automatedQueue.key) continue;

    const queueId = automatedQueue.key as string;

    // Skip if already processed
    if (existingQueueIds.has(queueId)) {
      logger.info(`Queue ${queueId} already processed, skipping...`);
      continue;
    }

    logger.info(`Processing queue ${queueId}...`);

    const automatedTestList = await dwsApi.getAutomatedTestListForTestQueue(automatedQueue.key as number);
    if (!automatedTestList?.data?.Value?.length) {
      logger.info(`No test results found for queue ${queueId}`);
      continue;
    }

    const rowData: RowData = DwsTestReportExcel.generateRowData(
      automatedTestList,
      queueId,
      automatedQueue.executionStartTimeStamp as string,
    );
    // Format duration to HH:MM:SS (remove fractional seconds)
    const formattedDuration = (automatedQueue.duration as string)?.split(".")[0] || "";
    rowData.push(formattedDuration);

    queueData.push({
      queueId,
      row: rowData,
    });
  }

  if (queueData.length === 0) return null;

  // Sort by queue ID (larger to smaller)
  queueData.sort((a, b) => b.queueId.localeCompare(a.queueId));

  return queueData.map((qd) => qd.row);
}

// Set environment variables to control test execution.
// Example: bash
// NUMBER_OF_TEST_RESULTS=1 UPLOAD_TO_REPORT_PORTAL=false PAGE_SIZE=200 npx playwright test dws-test-results-excel.spec.ts
test("Generate Excel report with test results", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const dwsApi = new DwsApi(request);
  const numberOfTestResultsToCollect = Number(process.env.NUMBER_OF_TEST_RESULTS || 1);

  // Navigate to dashboard and login
  await page.goto(`${settings.DWS_URL}/SwifTest/Dashboard`);
  await loginPage.login(settings.DWS_EMAIL, settings.DWS_PASSWORD);

  await expect(page).toHaveURL(new RegExp(`${settings.DWS_URL}/SwifTest/Dashboard`), { timeout: 60_000 });
  await page.waitForTimeout(5000); // Wait for page load

  if (!settings.DWS_URL) throw new Error("DWS_URL is not set in settings");
  const cookies = await page.context().cookies();
  const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  dwsApi.setCookies(cookieString);

  const excelPath = path.join(settings.REPORTS_PATH, EXCEL_FILE);
  const existingQueueIds = DwsTestReportExcel.readExistingQueueIds(excelPath);

  // Create workbook
  const workbook = DwsTestReportExcel.getOrCreateWorkbook(excelPath);

  // Process each project
  for (const project of PROJECTS) {
    logger.info(`Processing ${project.name}...`);

    // Get queue item for the project
    const queueItem = await dwsApi.findQueueItemByTitle(project.name);
    if (!queueItem) {
      logger.info(`Queue not found for ${project.name}`);
      continue;
    }

    // Get automated test queues for the project
    const automatedQueuesData = await dwsApi.GetAutomatedTestQueuesForTestQueue(
      queueItem.key,
      1,
      numberOfTestResultsToCollect,
    );
    if (!automatedQueuesData?.data?.Value?.length) {
      logger.info(`No automated queues found for ${project.name}`);
      continue;
    }

    const rowsData = await processProjectQueues(project, automatedQueuesData, dwsApi, existingQueueIds);

    if (rowsData) {
      DwsTestReportExcel.updateProjectSheet(workbook, project.standardName, rowsData);
    }
  }

  // Save workbook
  DwsTestReportExcel.saveWorkbook(workbook, excelPath);
  logger.info(`Excel report generated: ${excelPath}`);
});
