import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";
import { Project, Scope } from "ts-morph";
import { PageMap, PageMapElement, PageMapIndex } from "../page-map/schema";

interface CodegenOptions {
  pageMapDir?: string;
  outputBaseDir?: string;
  only?: string;
}

function parseArgs(): CodegenOptions {
  const args = process.argv.slice(2);
  let only: string | undefined;
  let pageMapDir: string | undefined;
  let outputBaseDir: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--only" && args[i + 1]) {
      only = args[i + 1];
      i++;
    } else if (args[i] === "--pageMapDir" && args[i + 1]) {
      pageMapDir = args[i + 1];
      i++;
    } else if (args[i] === "--outputBaseDir" && args[i + 1]) {
      outputBaseDir = args[i + 1];
      i++;
    }
  }

  return { only, pageMapDir, outputBaseDir };
}

function getAreaFromPageKey(pageKey: string): string {
  if (pageKey.startsWith("Hotel")) return "hotel";
  if (pageKey.startsWith("TA")) return "ta";
  if (pageKey.startsWith("AE") || pageKey.startsWith("AutomationExercise")) return "automationexercise";
  return "common";
}

function capitalize(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generatePoms(options?: CodegenOptions): Promise<string[]> {
  const cliOpts = parseArgs();
  const pageMapDir = path.resolve(process.cwd(), options?.pageMapDir || cliOpts.pageMapDir || ".agents/page-map");
  const outputBaseDir = path.resolve(process.cwd(), options?.outputBaseDir || cliOpts.outputBaseDir || "src/pages");
  const only = options?.only || cliOpts.only;

  if (!fs.existsSync(pageMapDir)) {
    throw new Error(`Page map directory not found: ${pageMapDir}`);
  }

  const project = new Project({
    useInMemoryFileSystem: false,
  });

  const files = fs.readdirSync(pageMapDir);
  const indexFiles = files.filter((f) => f.endsWith(".index.json"));

  let targetIndexFiles = indexFiles;
  if (only) {
    targetIndexFiles = targetIndexFiles.filter((f) =>
      f.toLowerCase().startsWith(only.toLowerCase().replace(".index.json", "")),
    );
  }

  console.log(`[POM Codegen] Generating Page Objects for ${targetIndexFiles.length} page(s)...`);
  const generatedFiles: string[] = [];

  for (const indexFile of targetIndexFiles) {
    const indexPath = path.join(pageMapDir, indexFile);
    const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8")) as PageMapIndex;
    const pageKey = indexData.pageKey;

    // Load all variant maps for this page
    const variantFiles = files.filter(
      (f) => f.startsWith(`${pageKey}.`) && f.endsWith(".json") && !f.endsWith(".index.json"),
    );

    const elementMap = new Map<string, PageMapElement>();
    const elementOrigins = new Map<string, string[]>();

    for (const vFile of variantFiles) {
      const vPath = path.join(pageMapDir, vFile);
      const vData = JSON.parse(fs.readFileSync(vPath, "utf8")) as PageMap;
      const vName = `${vData.auth.roleKey}.${vData.state.variantKey}`;

      for (const el of vData.elements) {
        if (!elementMap.has(el.key)) {
          elementMap.set(el.key, el);
        }
        const origins = elementOrigins.get(el.key) || [];
        origins.push(vName);
        elementOrigins.set(el.key, origins);
      }
    }

    const elements = Array.from(elementMap.values()).sort((a, b) => a.key.localeCompare(b.key));
    const area = getAreaFromPageKey(pageKey);
    const targetDir = path.join(outputBaseDir, area, "generated");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const outFilePath = path.join(targetDir, `${pageKey}.generated.ts`);
    const sourceFile = project.createSourceFile(outFilePath, "", { overwrite: true });

    // Imports
    sourceFile.addImportDeclaration({
      moduleSpecifier: "fixtures/base-fixture",
      namedImports: ["Locator", "Page"],
    });

    const className = `${pageKey}GeneratedPage`;
    const classDecl = sourceFile.addClass({
      name: className,
      isExported: true,
    });

    // Constructor
    classDecl.addConstructor({
      parameters: [
        {
          name: "page",
          type: "Page",
          scope: Scope.Protected,
          isReadonly: true,
        },
      ],
    });

    // Getters for elements
    for (const el of elements) {
      const origins = elementOrigins.get(el.key)?.join(", ") || "all";
      const cleanName = el.accessibleName
        ?.replace(/[\s\u00a0\u1680\u180e\u2000-\u200b\u202f\u205f\u3000\ufeff]+/g, " ")
        .trim();
      const cleanLocator = el.locator.replace(/[\u00a0\u1680\u180e\u2000-\u200b\u202f\u205f\u3000\ufeff]/g, " ");
      const docComment = [
        `Role: \`${el.role}\`${cleanName ? ` | Accessible Name: "${cleanName}"` : ""}`,
        `Variants: [${origins}]`,
        `Locator: \`${cleanLocator}\``,
      ].join("\n");

      classDecl.addGetAccessor({
        name: el.key,
        returnType: "Locator",
        statements: `return this.page.${cleanLocator};`,
        docs: [docComment],
      });

      // Scoped helper method for repeated elements
      if (el.requiresScoping || el.scope) {
        classDecl.addMethod({
          name: `getScoped${capitalize(el.key)}`,
          parameters: [{ name: "scope", type: "Locator" }],
          returnType: "Locator",
          statements: `return scope.${cleanLocator};`,
          docs: [`Scoped accessor for \`${el.key}\` within a parent container (${el.scope || "Container"})`],
        });
      }
    }

    sourceFile.addExportAssignment({
      expression: className,
      isExportEquals: false,
    });

    // Format output with Prettier
    const rawContent = sourceFile.getFullText();
    let formattedContent: string;
    try {
      const prettierConfig = await prettier.resolveConfig(outFilePath);
      formattedContent = await prettier.format(rawContent, {
        ...prettierConfig,
        filepath: outFilePath,
        parser: "typescript",
      });
    } catch {
      formattedContent = rawContent;
    }

    fs.writeFileSync(outFilePath, formattedContent, "utf8");
    generatedFiles.push(outFilePath);
    console.log(
      `  - [GENERATED] ${pageKey} -> ${path.relative(process.cwd(), outFilePath)} (${elements.length} locators)`,
    );
  }

  console.log(`[POM Codegen] Completed. ${generatedFiles.length} file(s) generated.`);
  return generatedFiles;
}

// Direct execution
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  generatePoms().catch((err) => {
    console.error("[POM Codegen] Error:", err);
    process.exit(1);
  });
}
