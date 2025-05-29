import fs from "fs";
import path from "path";

import settings from "settings";

export const currentPath = path.join(settings.APP_ROOT_PATH, "assets");
export const tempPath = (): string => {
  const tempPath = path.join(settings.APP_ROOT_PATH, "temp");
  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath);
  }
  return tempPath;
};
