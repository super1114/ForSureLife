"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessCookie = exports.removeCookie = exports.setCookie = void 0;
var universal_cookie_1 = require("universal-cookie");
function getParentDomain() {
    var hostnamePieces = window.location.hostname.split('.');
    return hostnamePieces.length > 2
        ? "." + hostnamePieces[hostnamePieces.length - 2] + ".com"
        : 'localhost';
}
function setCookie(cookieName, cookieValue, expireDate) {
    var domain = getParentDomain();
    if (domain !== 'localhost') {
        (new universal_cookie_1.default()).set(cookieName, cookieValue, {
            domain: "americanseniordirect.com",
            path: '/',
            expires: expireDate
        });
    }
    else {
        (new universal_cookie_1.default()).set(cookieName, cookieValue, {
            domain: undefined,
            path: '/',
            expires: expireDate
        });
    }
}
exports.setCookie = setCookie;
function removeCookie(cookieName) {
    var domain = getParentDomain();
    (new universal_cookie_1.default()).remove(cookieName, { domain: domain, path: '/' });
}
exports.removeCookie = removeCookie;
function accessCookie(cookieName) {
    return (new universal_cookie_1.default()).get(cookieName);
}
exports.accessCookie = accessCookie;
//# sourceMappingURL=cookie_util.js.map