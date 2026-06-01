import * as fs from "node:fs/promises";
import * as path from "node:path";

import sanitizeFilename from "sanitize-filename";
import * as XLSX from "xlsx";

type RowData = Record<string, string>;

type TestCaseRow = {
  id: string;
  scenario: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
};

type CliArgs = {
  file: string;
  template: string;
  outputPath: string;
  id?: string;
};

const HEADER_ALIASES: Record<string, keyof TestCaseRow> = {
  testcaseid: "id",
  id: "id",
  scenario: "scenario",
  preconditions: "preconditions",
  teststeps: "steps",
  steps: "steps",
  expectedresult: "expectedResult",
};

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const templatePath = path.resolve(process.cwd(), args.template);
  const workbookPath = path.resolve(process.cwd(), args.file);
  const outputDirectory = path.resolve(process.cwd(), args.outputPath);

  const template = await fs.readFile(templatePath, "utf8");
  const rows = readTestCases(workbookPath);
  const selectedRows = args.id ? rows.filter((row) => row.id === args.id) : rows;

  if (args.id && selectedRows.length === 0) {
    throw new Error(`Test case ${args.id} was not found in ${workbookPath}`);
  }

  if (selectedRows.length === 0) {
    throw new Error(`No test cases were found in ${workbookPath}`);
  }

  await fs.mkdir(outputDirectory, { recursive: true });

  for (const row of selectedRows) {
    const markdown = renderTemplate(template, row);
    const outputFileName = `${sanitizeFilename(row.id || row.scenario || "test-case")}.md`;
    await fs.writeFile(path.join(outputDirectory, outputFileName), markdown, "utf8");
  }

  console.log(`Generated ${selectedRows.length} markdown file(s) in ${outputDirectory}`);
}

function readTestCases(workbookPath: string): TestCaseRow[] {
  const workbook = XLSX.readFile(workbookPath, { cellDates: false });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error(`Workbook ${workbookPath} does not contain any sheets`);
  }

  const worksheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<RowData>(worksheet, {
    defval: "",
    raw: false,
  });

  return rawRows
    .map((row) => mapRow(row))
    .filter((row): row is TestCaseRow => Boolean(row && (row.id || row.scenario || row.steps || row.expectedResult)));
}

function mapRow(row: RowData): TestCaseRow | undefined {
  const mapped: Partial<TestCaseRow> = {};

  for (const [header, value] of Object.entries(row)) {
    const normalizedHeader = normalizeHeader(header);
    const fieldName = HEADER_ALIASES[normalizedHeader];

    if (!fieldName) {
      continue;
    }

    mapped[fieldName] = normalizeCellValue(value);
  }

  if (!mapped.id && !mapped.scenario && !mapped.steps && !mapped.expectedResult) {
    return undefined;
  }

  return {
    id: mapped.id ?? "",
    scenario: mapped.scenario ?? "",
    preconditions: mapped.preconditions ?? "",
    steps: mapped.steps ?? "",
    expectedResult: mapped.expectedResult ?? "",
  };
}

function renderTemplate(template: string, row: TestCaseRow): string {
  const replacements: Record<string, string> = {
    id: row.id || "Not provided",
    scenario: row.scenario || "Not provided",
    preconditions: formatBlock(row.preconditions),
    steps: formatSteps(row.steps),
    expectedResult: formatBlock(row.expectedResult),
  };

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => replacements[key] ?? "");
}

function formatBlock(value: string): string {
  const normalized = value.trim();
  return normalized ? normalized : "Not provided";
}

function formatSteps(value: string): string {
  const steps = splitSteps(value);

  if (steps.length === 0) {
    return "Not provided";
  }

  return steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
}

function splitSteps(value: string): string[] {
  const normalized = value.replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  const matches = [...normalized.matchAll(/(?:^|\s)(\d+)[.)]\s+/g)];

  if (matches.length > 0) {
    const steps: string[] = [];

    for (let index = 0; index < matches.length; index += 1) {
      const currentMatch = matches[index];
      const start = (currentMatch.index ?? 0) + currentMatch[0].length;
      const nextMatch = matches[index + 1];
      const end = nextMatch?.index ?? normalized.length;
      const step = normalized.slice(start, end).trim().replace(/\s+/g, " ");

      if (step) {
        steps.push(step);
      }
    }

    return steps;
  }

  return normalized
    .split("\n")
    .map((step) => step.trim())
    .filter(Boolean);
}

function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function normalizeCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function parseArgs(argv: string[]): CliArgs {
  const parsed: Partial<CliArgs> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (!argument.startsWith("--")) {
      continue;
    }

    const separatorIndex = argument.indexOf("=");
    const flag = separatorIndex >= 0 ? argument.slice(0, separatorIndex) : argument;
    const inlineValue = separatorIndex >= 0 ? argument.slice(separatorIndex + 1) : undefined;
    const spaceSeparatedValue = argv[index + 1];
    const nextValue =
      inlineValue ?? (spaceSeparatedValue && !spaceSeparatedValue.startsWith("--") ? spaceSeparatedValue : undefined);

    if (inlineValue === undefined && nextValue) {
      index += 1;
    }

    switch (flag) {
      case "--file":
        parsed.file = nextValue;
        break;
      case "--template":
        parsed.template = nextValue;
        break;
      case "--output-path":
        parsed.outputPath = nextValue;
        break;
      case "--id":
        parsed.id = nextValue;
        break;
      case "--help":
        printHelpAndExit(0);
        break;
      default:
        break;
    }
  }

  if (!parsed.file || !parsed.template || !parsed.outputPath) {
    printHelpAndExit(1);
  }

  return parsed as CliArgs;
}

function printHelpAndExit(code: number): never {
  console.log(
    [
      "Usage:",
      "  npm run spec-gen -- --file=path/to/testcases.xlsx --id=TC_01 --template=src/utils/excel2md/test-template.md --output-path=path/to/output",
      "",
      "Required:",
      "  --file         Path to the Excel workbook",
      "  --template     Path to the markdown template",
      "  --output-path  Directory for generated markdown files",
      "",
      "Optional:",
      "  --id           Generate only the matching test case id",
    ].join("\n"),
  );

  process.exit(code);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
