import { format } from "date-fns";
import * as XLSX from "xlsx";

import { TestResultsResponse } from "./dws-test-result";
import { ColumnWidth, ExcelUtils, RowData } from "./excel-utils";

export interface DwsTestReportRow {
  [key: string]: string | number; // Index signature for Record<string, unknown>
  "Queue ID": string;
  Date: string;
  "Total Tests": number;
  Passed: number;
  Failed: number;
  "Pass Rate": string;
  "Total Duration (min)": string;
}

export interface TestStats {
  total: number;
  passed: number;
  failed: number;
  totalDuration: number;
}

export class DwsTestReportExcel {
  static readonly COLUMN_WIDTHS: ColumnWidth[] = [
    { wch: 15 }, // Queue ID
    { wch: 12 }, // Date
    { wch: 12 }, // Total Tests
    { wch: 10 }, // Passed
    { wch: 10 }, // Failed
    { wch: 12 }, // Pass Rate
    { wch: 20 }, // Total Duration
  ];

  static readonly HEADERS = [
    "Queue ID",
    "Date",
    "Total Tests",
    "Passed",
    "Failed",
    "Pass Rate",
    "Total Duration (min)",
  ];

  /**
   * Read existing queue IDs from Excel file
   */
  static readExistingQueueIds(excelPath: string): Set<string> {
    const existingQueueIds = new Set<string>();
    const workbook = ExcelUtils.getWorkbook(excelPath);
    const sheets = ExcelUtils.getSheets(workbook);

    for (const sheetName of Object.keys(sheets)) {
      const data = ExcelUtils.readWorksheetData<DwsTestReportRow>(sheets[sheetName]);
      for (const row of data) {
        if (row["Queue ID"]) {
          existingQueueIds.add(row["Queue ID"]);
        }
      }
    }

    return existingQueueIds;
  }

  /**
   * Calculate test statistics from test results
   */
  static calculateTestStats(testResults: TestResultsResponse): TestStats {
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

  /**
   * Generate row data from test results
   */
  static generateRowData(testResults: TestResultsResponse, queueId: string, executionDate: string): RowData {
    const stats = this.calculateTestStats(testResults);

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

  /**
   * Create a new DWS test report workbook or get existing one
   */
  static getOrCreateWorkbook(excelPath: string): XLSX.WorkBook {
    ExcelUtils.ensureDirectoryExists(excelPath);
    return ExcelUtils.getWorkbook(excelPath);
  }

  /**
   * Create worksheet for a project's test results
   */
  static createProjectWorksheet(rowsData: RowData[]): XLSX.WorkSheet {
    const wsData = [this.HEADERS, ...rowsData];
    return ExcelUtils.createWorksheet(wsData, this.COLUMN_WIDTHS);
  }

  /**
   * Update project's worksheet in the workbook
   */
  static updateProjectSheet(workbook: XLSX.WorkBook, projectName: string, wsData: RowData[]): void {
    const ws = this.createProjectWorksheet(wsData);
    ExcelUtils.updateWorkbookSheet(workbook, projectName, ws);
  }

  /**
   * Save the test report workbook
   */
  static saveWorkbook(workbook: XLSX.WorkBook, excelPath: string): void {
    ExcelUtils.saveWorkbook(workbook, excelPath);
  }
}
