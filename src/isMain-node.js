import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

if (!import.meta.resolve || import.meta.resolve("data:,").then) {
  const { default: resolve } = await import("@nodefill/import-meta-resolve");
  import.meta.resolve = resolve;
}

export default function isMain(importMeta) {
  // if (importMeta && "main" in importMeta) {
  //   return importMeta.main;
  // }
  const importMetaURL = `${importMeta.url}`;
  const importMetaPath = fileURLToPath(importMetaURL);

  if (!process.argv[1]) {
    return false;
  }

  let importResolvedMain;
  try {
    importResolvedMain = import.meta.resolve(process.argv[1]);
  } catch {}
  if (importResolvedMain === importMetaURL) {
    return true;
  }

  const require = createRequire(process.argv[1]);
  let requireResolvedMain;
  try {
    requireResolvedMain = require.resolve(process.argv[1]);
  } catch {}
  if (requireResolvedMain === importMetaPath) {
    return true;
  }

  return false;
}
