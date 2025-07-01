require("dotenv").config();

const validatedEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Invalid env ${name}`);

  return value;
};

const settings = {
  RP_API_KEY: validatedEnv("RP_API_KEY"),
  RP_ENDPOINT: validatedEnv("RP_ENDPOINT"),
  GEMINI_API_KEY: validatedEnv("GEMINI_API_KEY"),
  TA_EMAIL: validatedEnv("TA_EMAIL"),
  TA_PASSWORD: validatedEnv("TA_PASSWORD"),
  SLACK_BOT_TOKEN: validatedEnv("SLACK_BOT_TOKEN"),
  BASE_URL: validatedEnv("BASE_URL"),
  APP_ROOT_PATH: __dirname,
  REPORT_ID: process.env.REPORT_ID,
  SLACK_REPORT_CHANNEL_ID: process.env.SLACK_REPORT_CHANNEL_ID ?? "",
  SLACK_REPORT_THREAD_TIMESTAMP:
    process.env.SLACK_REPORT_THREAD_TIMESTAMP ?? "",
};

export default settings;
