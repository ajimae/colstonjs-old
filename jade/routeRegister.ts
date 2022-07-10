import { methods } from "./methods";

export default function register(path: string, method: string, callback: Function, routeTable: object = {}): void | never {
  routeTable[path] = validate(path, method, callback);
}

function validate(path: string, method: string, callback: Function): { [path: string]: Function } {
  if (methods.indexOf(method) === -1) throw new Error("Invalid HTTP method, Accepted methods are: " + methods.join(" "));
  if (path.charAt(0) !== "/") throw new Error("Invalid path, path must start with '/'");
  if (typeof callback !== "function") throw new Error("Invalid handler function, handler must be a function");

  return { [method.toLowerCase()]: callback }
}
