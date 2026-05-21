import dotenv from "dotenv";

dotenv.config();

const validatedEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

const settings = {
  TA_EMAIL: validatedEnv("TA_EMAIL"),
  TA_PASSWORD: validatedEnv("TA_PASSWORD"),
  SLACK_BOT_TOKEN: validatedEnv("SLACK_BOT_TOKEN"),
  BASE_URL: validatedEnv("BASE_URL"),
  APP_ROOT_PATH: process.cwd(),
  REPORT_ID: process.env.REPORT_ID,
  SLACK_REPORT_CHANNEL_ID: process.env.SLACK_REPORT_CHANNEL_ID ?? "",
  SLACK_REPORT_THREAD_TIMESTAMP: process.env.SLACK_REPORT_THREAD_TIMESTAMP ?? "",
  DWS_URL: validatedEnv("DWS_URL"),
  DWS_EMAIL: validatedEnv("DWS_EMAIL"),
  DWS_PASSWORD: validatedEnv("DWS_PASSWORD"),
  REPORTS_PATH: validatedEnv("REPORTS_PATH"),
  JIRA_BASE_URL: validatedEnv("JIRA_BASE_URL"),
  JIRA_API_TOKEN: validatedEnv("JIRA_API_TOKEN"),
  JIRA_EMAIL: validatedEnv("JIRA_EMAIL"),
  JIRA_PROJECT: validatedEnv("JIRA_PROJECT"),
};

export default settings;
