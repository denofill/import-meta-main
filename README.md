# `import.meta.main` for Node.js

## Installation

```sh
npm install @denofill/import-meta-main
```

```js
import {} from "https://esm.sh/@denofill/import-meta-main";
```

## Usage

```js
import polyfill from "@denofill/import-meta-main";
polyfill(import.meta);

if (import.meta.main) {
  console.log("Hello from the CLI!");
} else {
  console.debug("Hello from a module!");
}
```

Don't worry about cross-environment compatibility. This polyfill is a no-op in
Deno and Bun (which already have native support for `import.meta.main`).

### Caveats

This works in Node.js main thread, Node.js worker threads, Node.js `--loader`
threads, window, `Worker`, `SharedWorker`, and service worker contexts. That
notably **omits `Worklet` contexts** (from the CSS worklet and audio worklet
APIs). Why? Because these contexts don't expose any hints as to what the
top-level script was (no `location`).

When operating in a window context with a `document`, the `isMain()` check will
**properly resolve** all `<script src="https://...">` URLs to their final
post-3XX redirected URL. This comes at the cost of doing this **synchronously**.
There is an alternative `isMainAsync()` function that can be used if you so
desire.

## Development

```sh
npm install
npm test
npm test:browser
```
