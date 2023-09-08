"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, obj) => {
    res.status(obj.status).json(obj);
    return;
};
exports.sendResponse = sendResponse;
