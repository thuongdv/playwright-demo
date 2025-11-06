import * as fs from "node:fs";
import * as path from "node:path";
import { setTimeout } from "node:timers/promises";

import { expect, test } from "@playwright/test";
import { format } from "date-fns";
import LoginPage from "pages/dws/login-page";
import sanitize from "sanitize-filename";

import settings from "settings";
import DwsApi from "utils/dws-api";
import { QueueInfo, TestResultsResponse } from "utils/dws-test-result";
import FileUtils from "utils/file-utils";
import { ReportPortalUtils } from "utils/report-portal-utils";

const PROJECTS = [
  { name: "01.) JDEdwards Finance", standardName: "FIN", storeStatusFile: "fin-automated-queue-results.txt" },
  {
    name: "02.) JDEdwards Sales & Distribution",
    standardName: "S_D",
    storeStatusFile: "sd-automated-queue-results.txt",
  },
  { name: "03.) JDEdwards Manufacturing", standardName: "MFG", storeStatusFile: "man-automated-queue-results.txt" },
];

// Helper: save automatedTestList to filesystem and register queue id
async function saveAutomatedTestList(
  project: { name: string; storeStatusFile: string },
  automatedQueue: any,
  automatedTestList: TestResultsResponse,
) {
  if (!automatedQueue.executionStartTimeStamp) {
    throw new Error("Automated queue does not have an execution start timestamp");
  }
  const folderName = format(automatedQueue.executionStartTimeStamp as string, "dd-MM-yyyy");
  const folderPath = path.join(settings.REPORTS_PATH, folderName);

  if (!fs.existsSync(folderPath)) {
    await fs.promises.mkdir(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, `${sanitize(project.name)}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(automatedTestList, null, 2));

  const storeStatusFilePath = path.join(settings.REPORTS_PATH, project.storeStatusFile);
  if (!(await FileUtils.isFileExists(storeStatusFilePath))) {
    await fs.promises.writeFile(storeStatusFilePath, "");
  }
  await FileUtils.appendToFirstLine(storeStatusFilePath, automatedQueue.key as string);
  console.log(`Report saved to: ${filePath}`);
  return { filePath, storeStatusFilePath };
}

// Helper: upload junit to ReportPortal if enabled
async function uploadToReportPortalIfNeeded(
  projectStandardName: string,
  automatedTestList: TestResultsResponse,
  automatedQueue: any,
) {
  if (process.env.UPLOAD_TO_REPORT_PORTAL === "true") {
    console.log("Uploading to ReportPortal...");
    const queueInfo: QueueInfo = {
      key: automatedQueue.key as string,
      duration: automatedQueue.duration,
      executionStartTimeStamp: automatedQueue.executionStartTimeStamp,
      executionEndTimeStamp: automatedQueue.executionEndTimeStamp,
      executedByUserName: automatedQueue.executedByUserName,
      environment: automatedQueue.environment,
    };
    const junitFilePath = ReportPortalUtils.createJUnitReport(projectStandardName, automatedTestList, queueInfo);
    await ReportPortalUtils.importToReportPortal(junitFilePath, projectStandardName);
    await setTimeout(1000); // To make the ReportPortal builds in expected order
    console.log("Upload to ReportPortal completed");
  } else {
    console.log("Skipping upload to ReportPortal as UPLOAD_TO_REPORT_PORTAL is not set to true");
  }
}

// Helper: process automated queues for a project
async function processAutomatedQueues(
  project: { name: string; standardName: string; storeStatusFile: string },
  automatedQueuesData: any,
  numberOfTestResultsToCollect: number,
  dwsApi: DwsApi,
) {
  if (!automatedQueuesData.data?.Value) throw new Error("No automated queues found for the test queue");
  const automateQueues = automatedQueuesData.data.Value.length;
  const numberOfAutomatedQueuesToCollect = Math.min(numberOfTestResultsToCollect, automateQueues as number);

  for (let i = numberOfAutomatedQueuesToCollect - 1; i >= 0; i--) {
    const automatedQueue = automatedQueuesData.data.Value[i];
    if (!automatedQueue) {
      console.log(`No automated queue found at index ${i}`);
      continue;
    }

    if (!automatedQueue.key) throw new Error("First automated queue does not have a key");

    const storeStatusFilePath = path.join(settings.REPORTS_PATH, project.storeStatusFile);
    if (await FileUtils.doesFileContain(storeStatusFilePath, automatedQueue.key as string)) {
      console.log(`${storeStatusFilePath} already contains queue id ${automatedQueue.key}, skipping...`);
      continue;
    }

    const automatedTestList = await dwsApi.getAutomatedTestListForTestQueue(automatedQueue.key as number);

    await saveAutomatedTestList(project, automatedQueue, automatedTestList);
    await uploadToReportPortalIfNeeded(project.standardName, automatedTestList, automatedQueue);
  }
}

// Set environment variables to control test execution.
// Example: bash
// NUMBER_OF_TEST_RESULTS=1 UPLOAD_TO_REPORT_PORTAL=false PAGE_SIZE=200 npx playwright test dws-test-result-rp.spec.ts
for (const project of PROJECTS) {
  const numberOfTestResultsToCollect = Number(process.env.NUMBER_OF_TEST_RESULTS || 10);

  test(`${project.name} - Collect ${numberOfTestResultsToCollect} test results`, async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const dwsApi = new DwsApi(request);

    // Navigate to the dashboard and login
    await page.goto(`${settings.DWS_URL}/SwifTest/Dashboard`);
    await loginPage.login(settings.DWS_EMAIL, settings.DWS_PASSWORD);

    await expect(page).toHaveURL(new RegExp(`${settings.DWS_URL}/SwifTest/Dashboard`), { timeout: 60_000 });
    await page.waitForTimeout(5000); // Wait for the page to load completely

    if (!settings.DWS_URL) throw new Error("DWS_URL is not set in settings");
    const cookies = await page.context().cookies();
    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
    dwsApi.setCookies(cookieString);

    // Find the queue item for the project and fetch automated queues
    const filteredItem = await dwsApi.findQueueItemByTitle(project.name);
    if (!filteredItem?.key) throw new Error("Filtered item does not have a key");
    const automatedQueuesData = await dwsApi.getAutomatedTestQueues(filteredItem.key);

    await processAutomatedQueues(project, automatedQueuesData, numberOfTestResultsToCollect, dwsApi);
  });
}
