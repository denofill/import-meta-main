import { Bench } from "tinybench";
import isMain from "../src/isMain-node.js";

const bench = new Bench({ time: 1000 });

bench.add("isMain()", () => {
  isMain(import.meta);
});

await bench.run();
console.table(bench.table());
