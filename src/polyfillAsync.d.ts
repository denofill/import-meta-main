declare global {
  interface ImportMeta {
    main?: boolean;
  }
}

declare function polyfillAsync(importMeta: ImportMeta): void;
export default polyfillAsync;
