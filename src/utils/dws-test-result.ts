export interface TestResult {
  testName: string;
  scenarioName: string;
  duration: string;
  successful: string;
  description?: string;
  executionStartTimeStamp: string;
}

export interface TestResultsResponse {
  data: {
    Value: TestResult[];
  };
}

export interface QueueInfo {
  key: string;
  duration: string;
  executedByUserName?: string;
  executionStartTimeStamp: string;
  executionEndTimeStamp: string;
  environment?: string | null;
}
