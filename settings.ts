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
};

export default settings;
