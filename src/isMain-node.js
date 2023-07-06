import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * @param {ImportMeta} importMeta
 * @returns {boolean}
 */
export default function isMain(importMeta) {
  if ("main" in importMeta) {
    return importMeta.main;
  }
  if (!process.argv[1]) {
    return false;
  }
  const require = createRequire("/");
  const mainPath = require.resolve(process.argv[1]);
  const importMetaPath = fileURLToPath(importMeta.url);
  if (mainPath === importMetaPath) {
    return true;
  }
  return false;
}
