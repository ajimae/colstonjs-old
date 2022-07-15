"use strict";
exports.__esModule = true;
function parse(url) {
    var i, j = 0;
    var str = "";
    var isQuery = false;
    var delimiters = [":", "?", "&"];
    for (i = 0; i < url.length; i++) {
        var c = url.charAt(i);
        isQuery = url.charAt(i) === "&" || url.charAt(i) === "?";
        if (delimiters.indexOf(c) > -1) {
            // eat all characters
            var param = "";
            for (j = (i + 1); j < url.length; j++) {
                if (/\w/.test(url.charAt(j))) {
                    param += url.charAt(j);
                }
                else {
                    break;
                }
            }
            if (isQuery) {
                str += "([?&]" + param + "=([^&]+))";
            }
            else {
                str += "(?<" + param + ">\\w+)";
            }
            i = j - 1;
        }
        else {
            str += c;
        }
    }
    /**
     * TODO:
     * fix issue with route not matching exact value
    */
    if (isQuery) {
        return str;
    }
    // add end border to query string
    str += "$";
    return str;
}
exports["default"] = parse;
