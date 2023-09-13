import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function initialize(data) {
  console.log("[initialize] data:", data);
  return true;
}

export async function resolve(specifier, context, nextResolve) {
  console.log("[resolve] specifier:", specifier);
  console.log("[resolve] context:", context);

  const parentUrlDir = path.dirname(fileURLToPath(context.parentURL));

  // getting the original module from mock
  if (context.parentURL.includes("lib.mock.js") && specifier === "./lib.js") {
    const ogLib = path.resolve(parentUrlDir, "./lib.js");
    const ogLibUrl = pathToFileURL(ogLib);
    return {
      shortCircuit: true,
      url: ogLibUrl.toString(),
    };
  }

  // getting the mock module for lib
  if (specifier === "./lib.js") {
    const mockLib = path.resolve(parentUrlDir, "./lib.mock.js");
    const mockLibUrl = pathToFileURL(mockLib);
    return {
      shortCircuit: true,
      url: mockLibUrl.toString(),
    };
  }

  return nextResolve(specifier);
}

export async function load(url, context, nextLoad) {
  console.log("[load] url:", url);
  console.log("[load] context:", context);

  return nextLoad(url);
}
