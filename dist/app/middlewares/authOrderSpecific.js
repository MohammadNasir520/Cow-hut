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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const authOrderSpecific = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token from headers
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        // setting user into Express Request. for this must declare an enum which is in global enums folder
        req.user = verifiedUser;
        console.log(verifiedUser);
        // guard by role
        if (requiredRoles.length &&
            requiredRoles.includes("specific_buyer") &&
            verifiedUser.role === "buyer") {
            console.log("specific buyer");
            return next();
        }
        if (requiredRoles.length &&
            requiredRoles.includes("specific_seller") &&
            verifiedUser.role === "seller") {
            console.log("specific seller");
            return next();
        }
        if (requiredRoles.length &&
            requiredRoles.includes("admin") &&
            verifiedUser.role === "admin") {
            console.log("specific admin");
            return next();
        }
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "unauthorized access");
        //   next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authOrderSpecific;