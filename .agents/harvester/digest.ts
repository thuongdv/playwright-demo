import { createHash } from "crypto";
import { PageMapElement } from "../page-map/schema";

/**
 * Computes a deterministic SHA-256 digest of the aria tree and extracted canonical elements.
 * Volatile fields (capturedAt, bounding boxes, dynamic session tokens, dates, emails, timestamps) are excluded.
 */
export function computeAriaDigest(ariaSnapshotText: string, elements: PageMapElement[]): string {
  // Canonical representation of elements
  const canonicalElements = elements.map((el) => ({
    key: el.key,
    role: el.role,
    accessibleName: el.accessibleName,
    accessibleNamePattern: el.accessibleNamePattern,
    testId: el.testId,
    locator: el.locator,
    scope: el.scope,
    count: el.count,
    requiresScoping: el.requiresScoping,
    visible: el.visible,
    enabled: el.enabled,
  }));

  // Clean snapshot text (normalize whitespace, line endings, volatile nonces, tokens, dates, emails, timestamps, and internal refs)
  let normalizedAria = ariaSnapshotText
    .replace(/\r\n/g, "\n")
    .replace(/\[ref=[^\]]+\]/g, "")
    .replace(/([?&])(_wpnonce|_token|token|nonce|csrf|session|timestamp|_)=[a-zA-Z0-9_-]+/gi, "$1$2=<DYNAMIC>")
    .replace(/_wpnonce=[a-zA-Z0-9]+/gi, "_wpnonce=<DYNAMIC>")
    .replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, "<UUID>")
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "<EMAIL>")
    .replace(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:,)?\s+\d{4}\b/gi,
      "<DATE>",
    )
    .replace(
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:st|nd|rd|th)?(?:,)?\s+\d{4}\b/gi,
      "<DATE>",
    )
    .replace(/\b\d{4}[-/.]\d{1,2}[-/.]\d{1,2}\b|\b\d{1,2}[-/.]\d{1,2}[-/.]\d{4}\b/g, "<DATE>")
    .replace(/[$¥€£]\s?\d+(?:,\d{3})*(?:\.\d{2})?/g, "<CURRENCY>")
    .replace(/\b(INV|ORD|Order|Invoice)[- #:]+\d+([-\w]*)\b/gi, "<ID>")
    .replace(/\b\d{10,13}\b/g, "<TIMESTAMP>");

  // Line-by-line whitespace normalization (trailing spaces and multiple spaces)
  normalizedAria = normalizedAria
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, "").replace(/[ \t]{2,}/g, " "))
    .join("\n")
    .trim();

  const payload = JSON.stringify({
    aria: normalizedAria,
    elements: canonicalElements,
  });

  const hash = createHash("sha256").update(payload, "utf8").digest("hex");
  return `sha256:${hash}`;
}
