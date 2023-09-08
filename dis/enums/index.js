"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.APIStatus = exports.HTTPStatusCode = void 0;
var HTTPStatusCode;
(function (HTTPStatusCode) {
    HTTPStatusCode[HTTPStatusCode["OK"] = 200] = "OK";
    HTTPStatusCode[HTTPStatusCode["NOTFOUND"] = 404] = "NOTFOUND";
    HTTPStatusCode[HTTPStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPStatusCode[HTTPStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPStatusCode[HTTPStatusCode["BADREQUEST"] = 400] = "BADREQUEST";
    HTTPStatusCode[HTTPStatusCode["INTERNALSERVERERROR"] = 500] = "INTERNALSERVERERROR";
})(HTTPStatusCode || (exports.HTTPStatusCode = HTTPStatusCode = {}));
var APIStatus;
(function (APIStatus) {
    APIStatus["SUCCESS"] = "SUCCESS";
    APIStatus["FAILED"] = "FAILED";
})(APIStatus || (exports.APIStatus = APIStatus = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["RECEPTIONIST"] = "RECEPTIONIST";
    UserRoles["PATIENT"] = "PATIENT";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
