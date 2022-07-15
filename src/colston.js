"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var params_1 = require("./params");
var query_1 = require("./query");
var body_1 = require("./body");
var context_1 = require("./context");
var routeRegister_1 = require("./routeRegister");
var middlewares_1 = require("./middlewares");
/**
 * @class Jade
 * @description add route to routeTable, match and process request
 * @method use
 * @method fetch
 */
var Colston = /** @class */ (function () {
    /**
     * @description overloaded constructor
     * @param {object} options
     */
    function Colston(options) {
        this.options = {};
        this.routeTable = {};
        this.middleware = [];
        this.cache = new Map();
        this.options = options;
    }
    /**
     * @description internal error handler
     * @param error
     * @returns response
     */
    Colston.prototype.error = function (error) {
        console.error(error);
        var err = JSON.stringify(error);
        return new Response(JSON.stringify(new Error(error.message || "An error occurred\n\r" + err)), { status: 500 });
    };
    /**
     *
     * @param key
     * @param value
     */
    Colston.prototype.set = function (key, value) {
        this.cache.set(key, value);
    };
    /**
     *
     * @param {string} key
     * @return {boolean} true | false
     */
    Colston.prototype.has = function (key) {
        return this.cache.has(key);
    };
    Colston.prototype.get = function (path) {
        var cb = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cb[_i - 1] = arguments[_i];
        }
        if (!cb.length)
            return this.cache.get(path);
        (0, routeRegister_1["default"])(path, "GET", cb, this.routeTable);
        return this;
    };
    /**
     * @description HTTP POST method
     * @param path
     * @param cb
     * @returns {this}
     */
    Colston.prototype.post = function (path) {
        var cb = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cb[_i - 1] = arguments[_i];
        }
        (0, routeRegister_1["default"])(path, "POST", cb, this.routeTable);
        return this;
    };
    /**
     * @description HTTP PATCH method
     * @param path
     * @param cb
     * @returns {this}
     */
    Colston.prototype.patch = function (path) {
        var cb = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cb[_i - 1] = arguments[_i];
        }
        (0, routeRegister_1["default"])(path, "PATCH", cb, this.routeTable);
        return this;
    };
    /**
     * @description HTTP PUT method
     * @param path
     * @param cb
     * @returns {this}
     */
    Colston.prototype.put = function (path) {
        var cb = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cb[_i - 1] = arguments[_i];
        }
        (0, routeRegister_1["default"])(path, "PUT", cb, this.routeTable);
        return this;
    };
    /**
     *
     */
    Colston.prototype["delete"] = function (path) {
        var cb = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cb[_i - 1] = arguments[_i];
        }
        (0, routeRegister_1["default"])(path, "DELETE", cb, this.routeTable);
        return this;
    };
    /**
     * @description add level route
     * @param {string} path
     * @param {Function} handler
     */
    Colston.prototype.use = function () {
        var _a;
        var cb = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cb[_i] = arguments[_i];
        }
        (_a = this.middleware).push.apply(_a, cb);
    };
    /**
     * @description bun fetch function
     * @param {Request} request bun request object
     * @returns {Response} bun response object
     */
    Colston.prototype.fetch = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var context, exists, routes, index, i, route, parsedRoute, middleware, m, _middleware, cb;
            return __generator(this, function (_a) {
                context = new context_1["default"](request);
                /**
                 * invoke all app level middlewares
                 */
                this.middleware.forEach(function (cb, _) {
                    if (typeof cb == "function") {
                        cb(context);
                    }
                });
                exists = false;
                routes = [];
                routes = Object.keys(this.routeTable);
                index = routes.indexOf("/");
                if (index > -1)
                    routes.push(routes.splice(index, 1)[0]);
                for (i = 0; i < routes.length; i++) {
                    route = routes[i];
                    parsedRoute = (0, params_1["default"])(route);
                    if (new RegExp(parsedRoute).test(request.url) &&
                        this.routeTable[route][request.method.toLowerCase()]) {
                        middleware = this.routeTable[route][request.method.toLowerCase()];
                        m = request.url.match(new RegExp(parsedRoute));
                        _middleware = middleware.slice();
                        cb = _middleware.pop();
                        request.params = m.groups;
                        request.query = (0, query_1["default"])(request.url);
                        request.body = (0, body_1["default"])(request);
                        exists = true;
                        (0, middlewares_1["default"])(context, middleware);
                        return [2 /*return*/, cb(context)];
                    }
                }
                if (!exists) {
                    return [2 /*return*/, Response.json({
                            status: 404,
                            statusText: "Not Found"
                        }, { status: 404, statusText: "Not Found" })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description bun http server entry point
     * @returns bun server instance
     */
    Colston.prototype.start = function (port, cb) {
        var _a, _b, _c;
        var self = this;
        if (typeof cb == "function")
            cb(this);
        return Bun.serve({
            fetch: self.fetch.bind(self),
            port: port || ((_a = self.options) === null || _a === void 0 ? void 0 : _a.port),
            development: ((_b = self.options) === null || _b === void 0 ? void 0 : _b.env) == "development",
            hostname: (_c = self.options) === null || _c === void 0 ? void 0 : _c.hostname,
            error: self.error
        });
    };
    return Colston;
}());
exports["default"] = Colston;
