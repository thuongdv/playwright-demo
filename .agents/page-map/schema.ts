import { toJSONSchema, z } from "zod";

/**
 * Zod schema for a single element in a Page Map.
 */
export const PageMapElementSchema = z.object({
  key: z.string().min(1, "Element key must not be empty"),
  role: z.string().min(1, "Role must not be empty"),
  accessibleName: z.string().optional(),
  accessibleNamePattern: z.string().optional(),
  testId: z.string().optional(),
  locator: z.string().min(1, "Locator expression is required"),
  fallbackLocators: z.array(z.string()).optional(),
  scope: z.string().optional(),
  count: z.number().int().nonnegative().default(1),
  requiresScoping: z.boolean().default(false),
  visible: z.boolean().default(true),
  enabled: z.boolean().default(true),
  firstSeenBuild: z.string().min(1, "firstSeenBuild must be provided"),
});

export type PageMapElement = z.infer<typeof PageMapElementSchema>;

/**
 * Zod schema for authentication context in a Page Map.
 */
export const PageMapAuthSchema = z.object({
  roleKey: z.string().min(1, "roleKey is required"),
  stateGeneratedAt: z.string().datetime({ offset: true }).optional(),
});

export type PageMapAuth = z.infer<typeof PageMapAuthSchema>;

/**
 * Zod schema for state variant context in a Page Map.
 */
export const PageMapStateSchema = z.object({
  variantKey: z.string().min(1, "variantKey is required"),
  fixture: z.string().optional(),
  openers: z.array(z.string()).optional(),
});

export type PageMapState = z.infer<typeof PageMapStateSchema>;

/**
 * Zod schema for the full Page Map document.
 */
export const PageMapSchema = z.object({
  $schema: z.string().optional(),
  route: z.string().min(1, "Route is required"),
  pageKey: z.string().min(1, "pageKey is required"),
  capturedAt: z.string().datetime({ offset: true }),
  appBuild: z.string().min(1, "appBuild is required"),
  harvesterVersion: z.string().min(1, "harvesterVersion is required"),
  auth: PageMapAuthSchema,
  state: PageMapStateSchema,
  elements: z.array(PageMapElementSchema),
  ariaDigest: z.string().regex(/^sha256:[a-f0-9]{64}$/, "ariaDigest must be sha256 hex string"),
  notes: z.array(z.string()).default([]),
});

export type PageMap = z.infer<typeof PageMapSchema>;

/**
 * Schema for page-level index mapping variants to elements.
 */
export const PageMapIndexSchema = z.object({
  pageKey: z.string(),
  route: z.string(),
  roles: z.array(z.string()),
  variants: z.array(z.string()),
  commonElementKeys: z.array(z.string()),
  variantSpecificElementKeys: z.record(z.string(), z.array(z.string())),
  lastUpdated: z.string().datetime({ offset: true }),
});

export type PageMapIndex = z.infer<typeof PageMapIndexSchema>;

/**
 * Validates a raw JSON object against the PageMap schema.
 */
export function validatePageMap(data: unknown): PageMap {
  return PageMapSchema.parse(data);
}

/**
 * Safe validation returning success flag and issues.
 */
export function safeValidatePageMap(data: unknown) {
  return PageMapSchema.safeParse(data);
}

/**
 * Returns the JSON Schema specification derived from the PageMap Zod schema.
 */
export function getPageMapJsonSchema() {
  return toJSONSchema(PageMapSchema);
}
