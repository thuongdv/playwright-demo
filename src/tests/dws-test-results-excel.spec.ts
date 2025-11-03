import * as fs from "node:fs";
import * as path from "node:path";

import { expect, test } from "@playwright/test";
import { format } from "date-fns";
import * as XLSX from "xlsx";

import LoginPage from "pages/dws/login-page";
import settings from "settings";
import DwsApi from "utils/dws-api";
import { TestResultsResponse } from "utils/dws-test-result";

const PROJECTS = [
  { name: "01.) JDEdwards Finance", standardName: "FIN" },
  {
    name: "02.) JDEdwards Sales & Distribution",
    standardName: "S_D",
  },
  { name: "03.) JDEdwards Manufacturing", standardName: "MFG" },
];

const EXCEL_FILE = "test-results.xlsx";

// Helper function to process test results and calculate statistics
function calculateTestStats(testResults: TestResultsResponse) {
  const stats = {
    total: testResults.data.Value.length,
    passed: 0,
    failed: 0,
    totalDuration: 0,
  };

  for (const test of testResults.data.Value) {
    if (test.successful === "SUCCESS") {
      stats.passed++;
    } else {
      stats.failed++;
    }

    // Calculate duration in seconds
    const duration = test.duration.split(":").reduce((acc, time, index) => {
      return acc + Number.parseFloat(time) * Math.pow(60, 2 - index);
    }, 0);
    stats.totalDuration += duration;
  }

  return stats;
}

interface ExcelRow {
  "Queue ID": string;
  Date: string;
  "Total Tests": number;
  Passed: number;
  Failed: number;
  "Pass Rate": string;
  "Total Duration (min)": string;
}

type ExcelRowData = [string, string, string, string, string, string, string];
type RawRowData = [string, string, number, number, number, string, string];

interface QueueData {
  row: RawRowData;
  queueId: string;
}

// Helper: Read existing queue IDs from Excel file
function readExistingQueueIds(excelPath: string): Set<string> {
  const existingQueueIds = new Set<string>();

  if (fs.existsSync(excelPath)) {
    const workbook = XLSX.readFile(excelPath);
    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet);
      for (const row of data) {
        if (row["Queue ID"]) {
          existingQueueIds.add(row["Queue ID"]);
        }
      }
    }
  }

  return existingQueueIds;
}

// Helper function to generate row data
function generateRowData(testResults: TestResultsResponse, queueId: string, executionDate: string): RawRowData {
  const stats = calculateTestStats(testResults);

  return [
    queueId,
    format(new Date(executionDate), "yyyy-MM-dd"),
    stats.total,
    stats.passed,
    stats.failed,
    `${((stats.passed / stats.total) * 100).toFixed(0)}%`,
    (stats.totalDuration / 60).toFixed(0),
  ];
}

// Helper: Convert raw row data to Excel row data
function convertToExcelRow(row: RawRowData): ExcelRowData {
  return [row[0], row[1], row[2].toString(), row[3].toString(), row[4].toString(), row[5], row[6]];
}

// Helper: process automated queues for a project and generate worksheet
async function processProjectQueues(
  _project: { name: string; standardName: string },
  automatedQueuesData: { data?: { Value?: Array<{ key?: string | number; executionStartTimeStamp?: string }> } },
  numberOfTestResultsToCollect: number,
  dwsApi: DwsApi,
  existingQueueIds: Set<string>,
): Promise<ExcelRowData[] | null> {
  if (!automatedQueuesData.data?.Value) throw new Error("No automated queues found for the test queue");

  const queueData: QueueData[] = [];

  // Process all available queues first
  for (const automatedQueue of automatedQueuesData.data.Value) {
    if (!automatedQueue.key) continue;

    const queueId = automatedQueue.key as string;

    // Skip if already processed
    if (existingQueueIds.has(queueId)) {
      console.log(`Queue ${queueId} already processed, skipping...`);
      continue;
    }

    const automatedTestList = await dwsApi.getAutomatedTestListForTestQueue(automatedQueue.key as number);
    if (!automatedTestList?.data?.Value?.length) {
      console.log(`No test results found for queue ${queueId}`);
      continue;
    }

    queueData.push({
      queueId,
      row: generateRowData(automatedTestList, queueId, automatedQueue.executionStartTimeStamp as string),
    });
  }

  if (queueData.length === 0) return null;

  // Sort by queue ID (larger to smaller)
  queueData.sort((a, b) => b.queueId.localeCompare(a.queueId));

  // Take only the requested number of results
  const limitedData = queueData.slice(0, numberOfTestResultsToCollect);

  return [
    // Headers
    ["Queue ID", "Date", "Total Tests", "Passed", "Failed", "Pass Rate", "Total Duration (min)"],
    // Sorted values
    ...limitedData.map((d) => convertToExcelRow(d.row)),
  ];
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

  // Create reports directory if it doesn't exist
  const reportsPath = settings.REPORTS_PATH;
  if (!fs.existsSync(reportsPath)) {
    fs.mkdirSync(reportsPath, { recursive: true });
  }

  const excelPath = path.join(reportsPath, EXCEL_FILE);
  const existingQueueIds = readExistingQueueIds(excelPath);

  // Create workbook
  const workbook = fs.existsSync(excelPath) ? XLSX.readFile(excelPath) : XLSX.utils.book_new();

  // Process each project
  for (const project of PROJECTS) {
    console.log(`Processing ${project.name}...`);

    // Get queue item for the project
    const queueItem = await dwsApi.findQueueItemByTitle(project.name);
    if (!queueItem) {
      console.log(`Queue not found for ${project.name}`);
      continue;
    }

    // Get automated test queues for the project
    const automatedQueuesData = await dwsApi.getAutomatedTestQueues(queueItem.key);
    if (!automatedQueuesData?.data?.Value?.length) {
      console.log(`No automated queues found for ${project.name}`);
      continue;
    }

    const wsData = await processProjectQueues(
      project,
      automatedQueuesData,
      numberOfTestResultsToCollect,
      dwsApi,
      existingQueueIds,
    );

    if (wsData) {
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Add column widths
      ws["!cols"] = [
        { wch: 15 }, // Queue ID
        { wch: 12 }, // Date
        { wch: 12 }, // Total Tests
        { wch: 10 }, // Passed
        { wch: 10 }, // Failed
        { wch: 12 }, // Pass Rate
        { wch: 20 }, // Total Duration
      ];

      // Remove existing worksheet if it exists
      if (workbook.SheetNames.includes(project.standardName)) {
        const idx = workbook.SheetNames.indexOf(project.standardName);
        workbook.SheetNames.splice(idx, 1);
        delete workbook.Sheets[project.standardName];
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, ws, project.standardName);
    }
  }

  // Save workbook
  XLSX.writeFile(workbook, excelPath);
  console.log(`Excel report generated: ${excelPath}`);
});
