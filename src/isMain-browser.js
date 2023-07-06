/** @type {WeakMap<HTMLScriptElement, string | null>} */
const finalURL = new WeakMap();

/**
 * @param {ImportMeta} importMeta
 * @returns {boolean}
 */
function isMain(importMeta) {
  if ("main" in importMeta) {
    return importMeta.main;
  }
  if (typeof document !== "undefined" && document.baseURI === importMeta.url) {
    return true;
  } else if (
    typeof location !== "undefined" &&
    location.href === importMeta.url
  ) {
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
      if (script.src === importMeta.url) {
        finalURL.set(script, importMeta.url);
        return true;
      }
      if (/^https?:/.test(script.src) && !finalURL.has(script)) {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open("HEAD", script.src, false);
          xhr.send(null);
          finalURL.set(script, xhr.responseURL);
        } catch {}
      }
      if (finalURL.get(script) && finalURL.get(script) === importMeta.url) {
        return true;
      }
    }
  }
  return false;
}

export default isMain;
