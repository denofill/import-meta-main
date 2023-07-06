declare global {
  interface ImportMeta {
    main?: boolean;
  }
}

declare function polyfill(importMeta: ImportMeta): void;
export default polyfill;
