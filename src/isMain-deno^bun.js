export default function isMain(importMeta) {
  if (importMeta && "main" in importMeta) {
    return importMeta.main;
  }
  return false;
}
