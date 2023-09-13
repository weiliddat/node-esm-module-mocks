import { mock } from "node:test";
const { addHello: ogAddHello } = await import("./lib.js");

export const addHello = mock.fn(ogAddHello, () => "Hello");
