import dotenv from "dotenv";
dotenv.config();

const validatedEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Invalid env ${name}`);

  return value;
};

const settings = {
  REPORT_PORTAL_URL: validatedEnv("RP_ENDPOINT"),
  REPORT_PORTAL_PROJECT: validatedEnv("RP_PROJECT"),
  REPORT_PORTAL_TOKEN: validatedEnv("RP_API_KEY"),
  GEMINI_API_KEY: validatedEnv("GEMINI_API_KEY"),
  TA_EMAIL: validatedEnv("TA_EMAIL"),
  TA_PASSWORD: validatedEnv("TA_PASSWORD"),
  SLACK_BOT_TOKEN: validatedEnv("SLACK_BOT_TOKEN"),
  BASE_URL: validatedEnv("BASE_URL"),
  APP_ROOT_PATH: __dirname,
  REPORT_ID: process.env.REPORT_ID,
  SLACK_REPORT_CHANNEL_ID: process.env.SLACK_REPORT_CHANNEL_ID ?? "",
  SLACK_REPORT_THREAD_TIMESTAMP: process.env.SLACK_REPORT_THREAD_TIMESTAMP ?? "",
  DWS_URL: validatedEnv("DWS_URL"),
  DWS_EMAIL: validatedEnv("DWS_EMAIL"),
  DWS_PASSWORD: validatedEnv("DWS_PASSWORD"),
  REPORTS_PATH: validatedEnv("REPORTS_PATH"),
};

export default settings;
