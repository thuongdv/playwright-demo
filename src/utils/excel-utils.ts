import * as fs from "node:fs";

import * as XLSX from "xlsx";

export type CellValue = string | number | boolean | Date;
export type RowData = CellValue[];
export interface ColumnWidth {
  wch: number;
}

export class ExcelUtils {
  /**
   * Create or get existing workbook
   */
  static getWorkbook(excelPath: string): XLSX.WorkBook {
    return fs.existsSync(excelPath) ? XLSX.readFile(excelPath) : XLSX.utils.book_new();
  }

  /**
   * Create worksheet from array of arrays data
   */
  static createWorksheet(wsData: RowData[], columnWidths?: ColumnWidth[]): XLSX.WorkSheet {
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    if (columnWidths) {
      ws["!cols"] = columnWidths;
    }
    return ws;
  }

  /**
   * Update or create sheet in workbook
   */
  static updateWorkbookSheet(workbook: XLSX.WorkBook, sheetName: string, ws: XLSX.WorkSheet): void {
    // Remove existing worksheet if it exists
    if (workbook.SheetNames.includes(sheetName)) {
      const idx = workbook.SheetNames.indexOf(sheetName);
      workbook.SheetNames.splice(idx, 1);
      delete workbook.Sheets[sheetName];
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
  }

  /**
   * Save workbook to file
   */
  static saveWorkbook(workbook: XLSX.WorkBook, excelPath: string): void {
    XLSX.writeFile(workbook, excelPath);
  }

  /**
   * Read worksheet data as array of objects
   */
  static readWorksheetData<T>(ws: XLSX.WorkSheet): T[] {
    return XLSX.utils.sheet_to_json<T>(ws);
  }

  /**
   * Get all sheets from workbook
   */
  static getSheets(workbook: XLSX.WorkBook): Record<string, XLSX.WorkSheet> {
    return workbook.Sheets;
  }

  /**
   * Convert array of objects to array of arrays format
   */
  static objectsToArrays<T>(data: T[], headers: Array<keyof T>): RowData[] {
    const rows: RowData[] = [headers as string[]];
    for (const item of data) {
      const row: RowData = [];
      for (const header of headers) {
        const value = item[header];
        row.push((value as CellValue) ?? "");
      }
      rows.push(row);
    }
    return rows;
  }
}
