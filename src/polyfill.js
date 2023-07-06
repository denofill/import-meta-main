import isMain from "#isMain.js";

export default function polyfill(importMeta) {
  if (!("main" in importMeta)) {
    Object.defineProperty(importMeta, "main", {
      configurable: true,
      enumerable: true,
      get: () => isMain(importMeta),
    });
  }
  return importMeta;
}
