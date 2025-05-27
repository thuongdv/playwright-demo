require("dotenv").config();

const validatedEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Invalid env ${name}`);

  return value;
};

const settings = {
  RP_API_KEY: validatedEnv("RP_API_KEY"),
  RP_ENDPOINT: validatedEnv("RP_ENDPOINT"),
};

export default settings;
