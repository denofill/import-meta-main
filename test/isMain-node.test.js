import test from "node:test";
import assert from "node:assert";
import isMain from "../src/isMain-node.js";

test("isMain", () => {
  console.log(isMain(import.meta));
});
