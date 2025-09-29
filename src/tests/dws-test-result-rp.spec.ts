import * as fs from "fs";
import * as path from "path";
import { setTimeout } from "timers/promises";

import { expect, test } from "@playwright/test";
import { format } from "date-fns";
import sanitize from "sanitize-filename";

import LoginPage from "pages/dws/LoginPage";
import settings from "settings";
import DwsApi from "utils/DwsApi";
import FileUtils from "utils/FileUtils";
import { ReportPortalUtils } from "utils/ReportPortalUtils";

const PROJECTS = [
  { name: "01.) JDEdwards Finance", standardName: "FIN", storeStatusFile: "fin-automated-queue-results.txt" },
  {
    name: "02.) JDEdwards Sales & Distribution",
    standardName: "S_D",
    storeStatusFile: "sd-automated-queue-results.txt",
  },
  { name: "03.) JDEdwards Manufacturing", standardName: "MFG", storeStatusFile: "man-automated-queue-results.txt" },
];

// Set environment variables to control test execution.
// Example: bash
// NUMBER_OF_TEST_RESULTS=1 UPLOAD_TO_REPORT_PORTAL=false PAGE_SIZE=200 npx playwright test dws-test-result-rp.spec.ts
for (const project of PROJECTS) {
  const numberOfTestResultsToCollect = Number(process.env.NUMBER_OF_TEST_RESULTS || 10);
  test(`${project.name} - Collect ${numberOfTestResultsToCollect} test results`, async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const dwsApi = new DwsApi(request);

    // Navigate to the dashboard
    await page.goto(`${settings.DWS_URL}/SwifTest/Dashboard`);

    // Login to DWS
    await loginPage.login(settings.DWS_EMAIL, settings.DWS_PASSWORD);

    await expect(page).toHaveURL(new RegExp(`${settings.DWS_URL}/SwifTest/Dashboard`));
    await page.waitForTimeout(5_000); // Wait for the page to load completely

    // Set cookies for DwsApi
    if (!settings.DWS_URL) throw new Error("DWS_URL is not set in settings");
    const cookies = await page.context().cookies();
    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
    dwsApi.setCookies(cookieString);

    // Find the item with title $projectName
    const filteredItem = await dwsApi.findQueueItemByTitle(project.name);

    // Send POST request to get automated test queues
    if (!filteredItem?.key) throw new Error("Filtered item does not have a key");
    const automatedQueuesData = await dwsApi.getAutomatedTestQueues(filteredItem.key);

    if (!automatedQueuesData.data?.Value) throw new Error("No automated queues found for the test queue");
    const automateQueues = automatedQueuesData.data.Value.length;
    const numberOfAutomatedQueuesToCollect = Math.min(numberOfTestResultsToCollect, automateQueues as number);

    for (let i = numberOfAutomatedQueuesToCollect - 1; i >= 0; i--) {
      const automatedQueue = automatedQueuesData.data.Value[i];
      if (!automatedQueue) {
        console.log(`No automated queue found at index ${i}`);
        continue;
      }

      // Get automated test list for the test queue
      if (!automatedQueue.key) throw new Error("First automated queue does not have a key");

      const storeStatusFilePath = path.join(settings.REPORTS_PATH, project.storeStatusFile);
      if (await FileUtils.doesFileContain(storeStatusFilePath, automatedQueue.key as string)) {
        console.log(`Queue id ${automatedQueue.key} is already collected`);
        continue;
      }

      const automatedTestList = await dwsApi.getAutomatedTestListForTestQueue(automatedQueue.key as number);

      // Create timestamp folder name using date-fns
      if (!automatedQueue.executionStartTimeStamp) {
        throw new Error("Automated queue does not have an execution start timestamp");
      }
      const folderName = format(automatedQueue.executionStartTimeStamp as string, "dd-MM-yyyy");
      const folderPath = path.join(settings.REPORTS_PATH, folderName);

      // Create folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        await fs.promises.mkdir(folderPath, { recursive: true });
      }

      // Save automatedTestList to JSON file
      const filePath = path.join(folderPath, `${sanitize(project.name)}.json`);
      await fs.promises.writeFile(filePath, JSON.stringify(automatedTestList, null, 2));

      if (!(await FileUtils.isFileExists(storeStatusFilePath))) {
        await fs.promises.writeFile(storeStatusFilePath, "");
      }

      await FileUtils.appendToFirstLine(storeStatusFilePath, automatedQueue.key as string);
      console.log(`Report saved to: ${filePath}`);

      if (process.env.UPLOAD_TO_REPORT_PORTAL === "true") {
        console.log("Uploading to ReportPortal...");
        // Create JUnit XML report and import to ReportPortal
        const junitFilePath = ReportPortalUtils.createJUnitReport(project.standardName, automatedTestList, {
          key: automatedQueue.key as string,
          duration: automatedQueue.duration,
          executionStartTimeStamp: automatedQueue.executionStartTimeStamp,
          executionEndTimeStamp: automatedQueue.executionEndTimeStamp,
        });
        await ReportPortalUtils.importToReportPortal(junitFilePath, project.standardName);
        await setTimeout(1_000); // To make the ReportPortal builds in expected order
        console.log("Upload to ReportPortal completed");
      } else {
        console.log("Skipping upload to ReportPortal as UPLOAD_TO_REPORT_PORTAL is not set to true");
      }
    }
  });
}
