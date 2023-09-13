import assert from "node:assert";
import test from "node:test";
import { register } from "node:module";

register("./loader.js", import.meta.url);

const { greet } = await import("./tested.js");

const { addHello } = await import("./lib.js");

test("greeting calls addHello returns hello mock", async () => {
  addHello.mock.mockImplementation(() => "Hello mock");
  const actual = greet("World");
  const expected = "Hello mock";
  assert.equal(actual, expected);
});

test("greeting calls addHello returns hello john", async () => {
  addHello.mock.mockImplementation(() => "Hello john");
  const actual = greet("World");
  const expected = "Hello john";
  assert.equal(actual, expected);
});

test("greeting calls addHello returns restored behavior", async () => {
  addHello.mock.restore();
  const actual = greet("World");
  const expected = "Hello World";
  assert.equal(actual, expected);
});
