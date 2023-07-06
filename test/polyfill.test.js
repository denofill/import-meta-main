import test from "node:test";
import assert from "node:assert";
import polyfill from "../src/polyfill.js";
polyfill(import.meta);

test("polyfill works", () => {
  console.log(import.meta.main);
});
