/**
 * Secret Sanitizer module
 * Inspects emitted JSON objects and strings to ensure no credentials, tokens, cookies, or secrets are leaked.
 */

const SECRET_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  {
    name: "JWT Token",
    regex: /\beyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g,
  },
  {
    name: "Bearer Authorization Header",
    regex: /bearer\s+[a-zA-Z0-9_\-.]{20,}/gi,
  },
  {
    name: "Basic Auth Header",
    regex: /basic\s+[a-zA-Z0-9+/=]{15,}/gi,
  },
  {
    name: "Session ID / Cookie Value",
    regex: /\b(sessionid|sess_id|jsessionid|phpsessid|connect\.sid)=[a-zA-Z0-9_-]{16,}\b/gi,
  },
  {
    name: "Generic Private Key or Secret Token",
    regex: /\b(ghp|gho|github_pat|xoxb|xoxp|sk_live|secret_key)_[a-zA-Z0-9_]{16,}\b/gi,
  },
];

export class SecretSanitizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecretSanitizationError";
  }
}

/**
 * Validates that a string or JSON object contains zero leaked secrets or tokens.
 * Throws a SecretSanitizationError if any secret pattern is matched.
 */
export function assertNoSecrets(content: string | object, knownSecrets: string[] = []): void {
  const text = typeof content === "string" ? content : JSON.stringify(content, null, 2);

  // 1. Check known runtime environment secrets
  for (const secret of knownSecrets) {
    if (secret && secret.length >= 6 && text.includes(secret)) {
      throw new SecretSanitizationError(
        `Secret Leak Detected: Output contains an active secret value matching environment credentials!`,
      );
    }
  }

  // 2. Check regex patterns for generic secrets / tokens / JWTs
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.regex.test(text)) {
      throw new SecretSanitizationError(`Secret Leak Detected: Output matched forbidden pattern [${pattern.name}]!`);
    }
  }
}
