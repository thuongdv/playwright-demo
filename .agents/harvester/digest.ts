import { createHash } from "crypto";
import { PageMapElement } from "../page-map/schema";

/**
 * Computes a deterministic SHA-256 digest of the aria tree and extracted canonical elements.
 * Volatile fields (capturedAt, bounding boxes, dynamic session tokens) are excluded.
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

  // Clean snapshot text (normalize whitespace / line endings)
  const normalizedAria = ariaSnapshotText.replace(/\r\n/g, "\n").trim();

  const payload = JSON.stringify({
    aria: normalizedAria,
    elements: canonicalElements,
  });

  const hash = createHash("sha256").update(payload, "utf8").digest("hex");
  return `sha256:${hash}`;
}
