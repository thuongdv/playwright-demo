import * as fs from "node:fs";
import * as path from "node:path";

import axios from "axios";
import { format } from "date-fns";
import { Builder } from "xml2js";

import settings from "settings";
import { QueueInfo, TestResultsResponse } from "utils/DwsTestResult";

export class ReportPortalUtils {
  /**
   * Creates a JUnit XML report from test results
   * @param projectName Name of the project
   * @param testResults Test results from DWS API
   * @returns Path to the generated JUnit XML file
   */
  static createJUnitReport(projectName: string, testResults: TestResultsResponse, queueInfo?: QueueInfo): string {
    const testsuites = {
      $: {
        name: projectName,
        tests: testResults.data.Value.length,
        failures: testResults.data.Value.filter((test) => test.successful === "FAIL").length,
        time: testResults.data.Value.reduce((acc, test) => {
          const duration = test.duration.split(":").reduce((acc, time, index) => {
            return acc + Number.parseFloat(time) * Math.pow(60, 2 - index);
          }, 0);
          return acc + duration;
        }, 0),
        timestamp: format(queueInfo?.executionStartTimeStamp || new Date().toISOString(), "yyyy-MM-dd'T'HH:mm:ss"),
        executedBy: queueInfo?.executedByUserName,
        totalDuration: queueInfo?.duration,
        environment: queueInfo?.environment || "N/A",
        executionEndTime: format(queueInfo?.executionEndTimeStamp || new Date().toISOString(), "yyyy-MM-dd'T'HH:mm:ss"),
      },
      testsuite: testResults.data.Value.map((test) => ({
        $: {
          name: test.testName,
          classname: test.scenarioName,
          time: test.duration.split(":").reduce((acc, time, index) => {
            return acc + Number.parseFloat(time) * Math.pow(60, 2 - index);
          }, 0),
          timestamp: format(test.executionStartTimeStamp || new Date().toISOString(), "yyyy-MM-dd'T'HH:mm:ss"),
        },
        testcase: [
          {
            $: {
              name: test.testName,
              classname: test.scenarioName,
              time: test.duration.split(":").reduce((acc, time, index) => {
                return acc + Number.parseFloat(time) * Math.pow(60, 2 - index);
              }, 0),
            },
            ...(test.successful === "FAIL" && {
              failure: [
                {
                  _: test.description || "Test failed",
                  $: {
                    message: test.description || "Test failed",
                    type: "Error",
                  },
                },
              ],
            }),
          },
        ],
      })),
    };

    // Create the XML string
    const builder = new Builder();
    const xml = builder.buildObject({ testsuites });

    // Ensure the reports directory exists
    if (!fs.existsSync(settings.REPORTS_PATH)) {
      fs.mkdirSync(settings.REPORTS_PATH, { recursive: true });
    }

    // Save XML to file
    const filePath = path.join(settings.REPORTS_PATH, `${projectName}.xml`);
    fs.writeFileSync(filePath, xml);

    return filePath;
  }

  /**
   * Imports a JUnit XML report to ReportPortal
   * @param filePath Path to the JUnit XML file
   */
  static async importToReportPortal(filePath: string, projectName: string): Promise<void> {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const formData = new FormData();
      formData.append("file", new Blob([fileContent], { type: "text/xml" }), path.basename(filePath));

      // Use POST method and settings from .env
      await axios.post(`${settings.REPORT_PORTAL_URL}/api/v1/plugin/${projectName}/junit/import`, formData, {
        headers: {
          Authorization: `Bearer ${settings.REPORT_PORTAL_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Successfully imported report to ReportPortal");
    } catch (error: any) {
      console.error("Failed to import report to ReportPortal:", error.response?.data || error.message);
      // Don't throw error to allow the test to continue
      throw error;
    }
  }
}
