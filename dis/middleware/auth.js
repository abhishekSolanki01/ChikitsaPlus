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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const enums_1 = require("../enums");
const errorHandler_1 = require("../errorHandler");
const admin_1 = require("../models/admin");
const patient_1 = require("../models/patient");
const receptionist_1 = require("../models/receptionist");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
const auth = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userDB;
        switch (role) {
            case enums_1.UserRoles.ADMIN:
                userDB = admin_1.Admin;
                break;
            case enums_1.UserRoles.PATIENT:
                userDB = patient_1.Patient;
                break;
            case enums_1.UserRoles.RECEPTIONIST:
                userDB = receptionist_1.Receptionist;
                break;
        }
        const authorization = req.headers.authorization;
        if (!authorization) {
            (0, errorHandler_1.sendResponse)(res, { status: enums_1.HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" });
            return;
        }
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET || "");
        if (!decodedToken || typeof decodedToken === "string") {
            (0, errorHandler_1.sendResponse)(res, { status: enums_1.HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" });
            return;
        }
        const userDetails = (yield userDB) && userDB.findOne({ userName: decodedToken.id }).lean();
        if (!userDetails) {
            (0, errorHandler_1.sendResponse)(res, { status: enums_1.HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" });
            return;
        }
        req.user = userDetails;
        next();
    }
    catch (e) {
        (0, errorHandler_1.sendResponse)(res, { status: enums_1.HTTPStatusCode.INTERNALSERVERERROR, error: true, message: "Internal server error" });
        return;
    }
});
exports.auth = auth;
