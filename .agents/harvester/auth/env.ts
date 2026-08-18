import dotenv from "dotenv";

dotenv.config();

function getRequiredEnv(key: string): string {
  const val = process.env[key];
  if (!val || val === "null" || val === "undefined") {
    throw new Error(
      `Missing required environment variable: [${key}]. Please ensure it is defined in .env or CI secrets.`,
    );
  }
  return val;
}

function getOptionalEnv(key: string, defaultVal: string = ""): string {
  return process.env[key] || defaultVal;
}

export interface AuthRoleCredentials {
  email: string;
  password?: string;
  token?: string;
}

/**
 * Returns role credentials based on roleKey without exposing secrets in logs.
 */
export function getRoleCredentials(roleKey: string): AuthRoleCredentials {
  switch (roleKey) {
    case "standardUser":
      return {
        email: getRequiredEnv("TA_EMAIL"),
        password: getRequiredEnv("TA_PASSWORD"),
      };
    case "dwsUser":
      return {
        email: getRequiredEnv("DWS_EMAIL"),
        password: getRequiredEnv("DWS_PASSWORD"),
      };
    case "hotelUser":
      return {
        email: getOptionalEnv("HOTEL_EMAIL", "clark@example.com"),
        password: getOptionalEnv("HOTEL_PASSWORD", "password"),
      };
    default:
      throw new Error(`Unknown auth role: '${roleKey}'`);
  }
}

/**
 * Returns a list of all active secret strings to be supplied to the secret sanitizer.
 */
export function getAllKnownSecrets(): string[] {
  const secrets: string[] = [];
  const keys = [
    "TA_PASSWORD",
    "TA_EMAIL",
    "DWS_PASSWORD",
    "DWS_EMAIL",
    "SLACK_BOT_TOKEN",
    "JIRA_API_TOKEN",
    "HOTEL_PASSWORD",
  ];

  for (const k of keys) {
    const val = process.env[k];
    if (val && val !== "null" && val !== "undefined" && val.length >= 4) {
      secrets.push(val);
    }
  }

  return secrets;
}
