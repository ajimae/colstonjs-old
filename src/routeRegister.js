"use strict";
exports.__esModule = true;
var methods_1 = require("./methods");
function register(path, method, callback, routeTable) {
    if (routeTable === void 0) { routeTable = {}; }
    routeTable[path] = validate(path, method, callback);
}
exports["default"] = register;
function validate(path, method, callback) {
    var _a;
    if (methods_1.methods.indexOf(method) === -1)
        throw new Error("Invalid HTTP method, Accepted methods are: " + methods_1.methods.join(" "));
    if (path.charAt(0) !== "/")
        throw new Error("Invalid path, path must start with '/'");
    for (var i in callback)
        if (typeof callback[i] !== "function")
            throw new Error("Invalid handler function, handler must be a function");
    return _a = {}, _a[method.toLowerCase()] = callback, _a;
}
