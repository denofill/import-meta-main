import isMainAsync from "#isMainAsync.js";

/**
 * @param {ImportMeta} importMeta
 */
export default async function polyfill(importMeta) {
  if (!("main" in importMeta)) {
    importMeta.main = await isMainAsync(importMeta);
  }
}
