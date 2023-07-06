/** @type {WeakMap<HTMLScriptElement, string | null>} */
const finalURL = new WeakMap();

/**
 * @param {ImportMeta} importMeta
 * @returns {Promise<boolean>}
 */
export default async function isMainAsync(importMeta) {
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
    const controller = new AbortController();
    const signal = controller.signal;
    const promises = [];
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
        const p = fetch(script.src, { method: "HEAD", signal }).then((r) => {
          finalURL.set(script, r.url);
          if (r.url === importMeta.url) {
            controller.abort();
            return true;
          } else {
            throw null;
          }
        });
        promises.push(p);
      }
    }
    const x = await Promise.any(promises).catch(() => false);
    if (x) {
      return x;
    }
  }
  return false;
}
