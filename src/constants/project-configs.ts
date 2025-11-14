/**
 * Project configuration interface for DWS test projects
 */
export interface ProjectConfig {
  name: string;
  standardName: string;
  storeStatusFile: string;
}

/**
 * Creates a project configuration with consistent naming patterns
 * @param index - Project number (1, 2, 3, etc.)
 * @param name - Project name (e.g., "Finance", "Sales & Distribution")
 * @param standardName - Standard abbreviation (e.g., "FIN", "S_D", "MFG")
 * @returns ProjectConfig object with auto-generated file names
 */
export const createProjectConfig = (index: number, name: string, standardName: string): ProjectConfig => ({
  name: `${String(index).padStart(2, '0')}.) JDEdwards ${name}`,
  standardName,
  storeStatusFile: `${standardName.toLowerCase().replace('_', '')}-automated-queue-results.txt`,
});

/**
 * All DWS test projects in order
 */
export const PROJECTS: ProjectConfig[] = [
  createProjectConfig(1, "Finance", "FIN"),
  createProjectConfig(2, "Sales & Distribution", "S_D"),
  createProjectConfig(3, "Manufacturing", "MFG"),
];
