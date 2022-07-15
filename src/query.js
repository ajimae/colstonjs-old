"use strict";
exports.__esModule = true;
function queryParse(url) {
    var results = url.match(/\?(?<query>.*)/);
    if (!results) {
        return {};
    }
    var query = results.groups.query;
    var pairs = query.match(/(?<param>\w+)=(?<value>\w+)/g);
    var params = pairs.reduce(function (acc, curr) {
        var _a = curr.split(("=")), key = _a[0], value = _a[1];
        acc[key] = value;
        return acc;
    }, {});
    return params;
}
exports["default"] = queryParse;
