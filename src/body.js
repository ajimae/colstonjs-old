"use strict";
exports.__esModule = true;
function readBody(request, encoding) {
    if (encoding == "text") {
        return request.text();
    }
    return request.json();
}
exports["default"] = readBody;
