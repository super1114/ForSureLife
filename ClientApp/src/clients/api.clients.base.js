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
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpWithTokenInHeader = void 0;
var cookie_util_1 = require("../utilities/cookie_util");
var fetchSendCookieAsAuth = function (cookieName, headerName) { return function (url, init) {
    var customInit = __assign({}, init);
    var cookieValue = cookie_util_1.accessCookie(cookieName);
    if (cookieValue) {
        customInit.headers = customInit.headers ? new Headers(customInit.headers) : new Headers();
        customInit.headers.append(headerName, "Bearer " + cookieValue);
    }
    return fetch(url, customInit);
}; };
exports.httpWithTokenInHeader = { fetch: fetchSendCookieAsAuth('fsl_jwt', 'Authorization') };
//# sourceMappingURL=api.clients.base.js.map