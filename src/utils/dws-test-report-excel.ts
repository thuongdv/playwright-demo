import { format } from "date-fns";
import * as XLSX from "xlsx";

import { TestResultsResponse } from "utils/dws-test-result";
import { ColumnWidth, ExcelUtils, RowData } from "utils/excel-utils";

export interface DwsTestReportRow {
  [key: string]: string | number; // Index signature for Record<string, unknown>
  "Queue ID": string;
  Date: string;
  "Total Tests": number;
  Passed: number;
  Failed: number;
  "Pass Rate": string;
  Duration: string;
}

export interface TestStats {
  total: number;
  passed: number;
  failed: number;
}

export class DwsTestReportExcel {
  static readonly COLUMN_WIDTHS: ColumnWidth[] = [
    { wch: 15 }, // Queue ID
    { wch: 12 }, // Date
    { wch: 12 }, // Total Tests
    { wch: 10 }, // Passed
    { wch: 10 }, // Failed
    { wch: 12 }, // Pass Rate
    { wch: 20 }, // Duration
  ];

  static readonly KEYS: (keyof DwsTestReportRow)[] = [
    "Queue ID",
    "Date",
    "Total Tests",
    "Passed",
    "Failed",
    "Pass Rate",
    "Duration",
  ];

  static readonly HEADERS = this.KEYS;

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
    const stats: TestStats = {
      total: testResults.data.Value.length,
      passed: 0,
      failed: 0,
    };

    for (const test of testResults.data.Value) {
      if (test.successful === "SUCCESS") {
        stats.passed++;
      } else {
        stats.failed++;
      }
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
   * Merge existing worksheet data with new data
   * Keeps existing rows and appends only new rows (based on Queue ID)
   */
  static mergeWorksheetData(existingData: RowData[], newData: RowData[]): RowData[] {
    if (existingData.length === 0) {
      return newData;
    }

    // Extract existing queue IDs from existing data (skip header row)
    const existingQueueIds = new Set<string>();
    for (let i = 1; i < existingData.length; i++) {
      const queueId = existingData[i][0]; // Queue ID is in first column
      if (queueId) {
        existingQueueIds.add(String(queueId));
      }
    }

    // Filter new data to only include rows with queue IDs that don't exist
    const newRows: RowData[] = [];
    for (let i = 1; i < newData.length; i++) {
      const queueId = newData[i][0];
      if (queueId && !existingQueueIds.has(String(queueId))) {
        newRows.push(newData[i]);
      }
    }

    // Combine existing data with new rows
    return [...existingData, ...newRows];
  }

  /**
   * Update project's worksheet in the workbook
   * Preserves existing data and appends only new rows
   */
  static updateProjectSheet(workbook: XLSX.WorkBook, projectName: string, wsData: RowData[]): void {
    // Read existing data if sheet exists
    let existingData: RowData[] = [];
    if (workbook.SheetNames.includes(projectName)) {
      const existingSheet = workbook.Sheets[projectName];
      const existingRows = ExcelUtils.readWorksheetData<DwsTestReportRow>(existingSheet);

      // Convert existing rows to RowData format
      if (existingRows.length > 0) {
        existingData = [this.HEADERS];
        for (const row of existingRows) {
          existingData.push(this.KEYS.map((key) => row[key]));
        }
      }
    }

    // Merge existing data with new data
    const newDataWithHeaders = [this.HEADERS, ...wsData];
    const mergedData = this.mergeWorksheetData(existingData, newDataWithHeaders);

    // Create worksheet with merged data
    const ws = ExcelUtils.createWorksheet(mergedData, this.COLUMN_WIDTHS);
    ExcelUtils.updateWorkbookSheet(workbook, projectName, ws);
  }

  /**
   * Save the test report workbook
   */
  static saveWorkbook(workbook: XLSX.WorkBook, excelPath: string): void {
    ExcelUtils.saveWorkbook(workbook, excelPath);
  }
}
