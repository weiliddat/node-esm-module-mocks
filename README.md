Various ways to do ES module interception in Node to create testing seams.

## Motivation

Rewire, proxyquire, sinon all don't work with ESM non-default non-object exports, e.g. `export function doSomething (args) { ... }`

Jest/Vitest currently creates a node:vm context and replaces the mocked modules. Requires --experimental-vm-modules.

## Approaches

0. If your libraries always export default objects, the node test runner's mock feature can override the object methods.
1. Use Node's ESM loader hooks to intercept the module loading and return a mock. Needs a separate file and `await import()` to load the module due to import hoisting.
2. Jest/Vitest approach by running the script in a node:vm context [[1](https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/runtime/execute.ts), [2](https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/runtime/mocker.ts)].
