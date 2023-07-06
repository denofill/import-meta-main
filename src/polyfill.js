import isMain from "#isMain.js";

/**
 * @param {ImportMeta} importMeta
 */
export default function polyfill(importMeta) {
  if (!("main" in importMeta)) {
    importMeta.main = isMain(importMeta);
  }
}
