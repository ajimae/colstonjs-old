"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Context = /** @class */ (function () {
    function Context(request) {
        this.locals = {};
        this.request = request;
        this.url = request.url;
        this.method = request.method;
        this.host = new URL(request.url).host;
        this.headers = request.headers;
    }
    Context.prototype.status = function (code) {
        this.code = code;
        return this;
    };
    /**
     * @warning method might behave unexpectedly
     * @param raw
     * @returns
     */
    Context.prototype.raw = function (raw) {
        return raw;
    };
    Context.prototype.head = function (options) {
        if (options === void 0) { options = { headers: __assign({}, this.headers) }; }
        options.status = 204;
        options.statusText = "No Content";
        return new Response(null, options);
    };
    Context.prototype.json = function (json, options) {
        if (options === void 0) { options = { headers: __assign({}, this.headers) }; }
        options.headers["Content-Type"] = "application/json";
        options.status = this.code || options.status;
        options.statusText = options.statusText || "OK";
        return new Response(JSON.stringify(json), options);
    };
    Context.prototype.text = function (text, options) {
        if (options === void 0) { options = { headers: __assign({}, this.headers) }; }
        options.headers["Content-Type"] = "text/plain";
        options.status = this.code || options.status;
        options.statusText = options.statusText || "OK";
        return new Response(text.toString(), options);
    };
    return Context;
}());
exports["default"] = Context;
