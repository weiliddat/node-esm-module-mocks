import assert from "node:assert";
import test from "node:test";
import lib from "./lib.js";
import { greet } from "./tested.js";

test("greeting calls addHello", (t) => {
  t.mock.method(lib, "addHello", () => "Hello mock");
  const actual = greet("World");
  const expected = "Hello mock";
  assert.equal(actual, expected);
});
