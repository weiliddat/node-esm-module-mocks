import { expect, test, vi } from "vitest";
import { addHello } from "./lib.js";
import { greet } from "./tested.js";

vi.mock("./lib.js", async () => {
  const { addHello } = await vi.importActual("./lib.js");
  return {
    addHello: vi.fn(addHello),
  };
});

test("greeting calls addHello returns hello mock", async () => {
  addHello.mockReturnValue("Hello mock");
  const actual = greet("World");
  const expected = "Hello mock";
  expect(actual).toEqual(expected);
});

test("greeting calls addHello returns hello john", async () => {
  addHello.mockImplementation(() => "Hello john");
  const actual = greet("World");
  const expected = "Hello john";
  expect(actual).toEqual(expected);
});

test("greeting calls addHello returns restored behavior", async () => {
  addHello.mockRestore();
  const actual = greet("World");
  const expected = "Hello World";
  expect(actual).toEqual(expected);
});
