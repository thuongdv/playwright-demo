import fs from "node:fs/promises";
import Path from "node:path";

import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";

import settings from "settings";
import Slack from "utils/slack-api";

type Summary = {
  totalCount: number;
  passed: string[];
  flaky: string[];
  failed: string[];
  skipped: string[];
};

class SlackReporter implements Reporter {
  private totalCount = 0;
  private readonly testResults: Record<string, TestResult[]> = {};
  private readonly summaryFilePath: string;

  constructor(options: { reportId?: string }) {
    this.summaryFilePath = Path.join(
      settings.APP_ROOT_PATH,
      "test-report",
      options.reportId ?? settings.REPORT_ID ?? "",
      "slack",
      "summary-report.json",
    );
  }

  onBegin(_: FullConfig, suite: Suite): void {
    this.totalCount = suite.allTests().length;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const testId = test.titlePath().filter(Boolean).join(" > ");
    if (!this.testResults[testId]) this.testResults[testId] = [];
    this.testResults[testId].push(result);
  }

  async onEnd(): Promise<{ status?: FullResult["status"] } | undefined | void> {
    const currentSummary = this.createSummary(this.testResults, this.totalCount);

    await Slack.postMessage({
      channelId: settings.SLACK_REPORT_CHANNEL_ID,
      ts: settings.SLACK_REPORT_THREAD_TIMESTAMP,
      text: this.createSlackReportText(
        currentSummary,
        `Test results progress \n\`${process.argv.join(" ").replace(/.*playwright test /, "")}\``,
      ),
    });

    const previousSummary = (await this.readPreviousSummaryFile()) ?? {
      totalCount: 0,
      passed: [],
      flaky: [],
      failed: [],
      skipped: [],
    };

    const totalSummary = {
      totalCount: previousSummary.totalCount + currentSummary.totalCount,
      passed: [...previousSummary.passed, ...currentSummary.passed],
      flaky: [...previousSummary.flaky, ...currentSummary.flaky],
      failed: [...previousSummary.failed, ...currentSummary.failed],
      skipped: [...previousSummary.skipped, ...currentSummary.skipped],
    };

    await fs.mkdir(Path.dirname(this.summaryFilePath), { recursive: true });
    await fs.writeFile(this.summaryFilePath, JSON.stringify(totalSummary));

    console.log(`Slack test report is saved: ${this.summaryFilePath}`);
  }

  private createSummary(testResults: Record<string, TestResult[]>, totalCount: number): Summary {
    const passed: string[] = [];
    const flaky: string[] = [];
    const failed: string[] = [];
    const skipped: string[] = [];

    for (const [testId, results] of Object.entries(testResults)) {
      const statuses = results.map((result) => result.status);
      if (statuses.includes("passed")) passed.push(testId);
      if (statuses.includes("passed") && statuses.some((s) => ["failed", "timedOut"].includes(s))) flaky.push(testId);
      if (statuses.every((s) => ["failed", "timedOut", "interrupted"].includes(s))) failed.push(testId);
      if (statuses.includes("skipped")) skipped.push(testId);
    }

    return {
      totalCount,
      passed,
      flaky,
      failed,
      skipped,
    };
  }

  private async readPreviousSummaryFile(): Promise<Summary | undefined> {
    try {
      const previousSummary = JSON.parse(await fs.readFile(this.summaryFilePath, { encoding: "utf8" })) as Summary;
      return previousSummary;
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      const errorWithCode = err as { code?: unknown };
      if (typeof errorWithCode.code !== "string") throw err;
      if (errorWithCode.code !== "ENOENT") throw err;
      return undefined;
    }
  }

  private createSlackReportText(summary: Summary, title: string): string {
    // See: https://api.slack.com/reference/block-kit/composition-objects
    const maxLength = 3000;
    let text = `:playwright-logo-1: ${title}
\`\`\`
■ Number of tests: ${summary.totalCount}

■ Passed (${summary.passed.length})
...

■ Failed (${summary.failed.length})
${summary.failed.join("\n")}

■ Flaky (${summary.flaky.length})
${summary.flaky.join("\n")}

■ Skipped (${summary.skipped.length})
${summary.skipped.join("\n")}
\`\`\``;

    if (text.length > maxLength) {
      text = text.slice(0, maxLength - 6) + "...```";
    }
    return text;
  }

  async sendSummary(): Promise<void> {
    const summary = (await this.readPreviousSummaryFile()) ?? {
      totalCount: 0,
      passed: [],
      flaky: [],
      failed: [],
      skipped: [],
    };

    await Slack.postMessage({
      channelId: settings.SLACK_REPORT_CHANNEL_ID,
      ts: settings.SLACK_REPORT_THREAD_TIMESTAMP,
      text: this.createSlackReportText(summary, "Test results summary"),
    });
  }
}

export default SlackReporter;
