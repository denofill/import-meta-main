import isMain from "#isMain.js";

/**
 * @param {ImportMeta} importMeta
 * @returns {Promise<boolean>}
 */
export default async function isMainAsync(importMeta) {
  return isMain(importMeta);
}
