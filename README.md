Various ways to do module interception in Node to create testing seams.

## Motivation

Rewire, proxyquire, sinon all don't work with ESM non-default non-object exports, e.g. `export function doSomething (args) { ... }`

Jest currently has an experimental feature to do it via the experimental vm module flag.

## Approaches

0. If your libraries always export default objects, the node test runner's mock feature can override the object methods.
1. Use Node's ESM loader hooks to intercept the module loading and return a mock. Needs a separate file and `await import()` to load the module due to import hoisting.
