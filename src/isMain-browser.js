import fetchSync from "./lib/fetchSync.js";

export default function isMain(importMeta) {
  const importMetaURL = `${importMeta.url}`;
  if (importMetaURL === location.href) {
    return true;
  }
  if (typeof document !== "undefined") {
    for (const script of document.scripts) {
      if (script.type !== "module") {
        continue;
      }
      if (!script.src) {
        continue;
      }

      if (script.src === importMetaURL) {
        return true;
      }

      let resolvedURL;
      try {
        resolvedURL = fetchSync(script.src).url;
      } catch {}
      if (resolvedURL === importMetaURL) {
        return true;
      }
    }
  }
  return false;
}
