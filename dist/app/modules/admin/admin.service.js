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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (AdminData) => __awaiter(void 0, void 0, void 0, function* () {
    const createAdmin = yield admin_model_1.Admin.create(AdminData);
    const _a = createAdmin.toObject(), { password } = _a, others = __rest(_a, ["password"]);
    return others;
});
// : Promise<Partial<ILoginAdminResponse>>
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.Admin.findOne({ phoneNumber }, { phoneNumber: 1, password: 1, role: 1 }).lean();
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "admin does not exist");
    }
    const isPassWordMatched = yield bcrypt_1.default.compare(password, isAdminExist.password);
    if (!isPassWordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "invalid password");
    }
    // creating accessToken
    const { _id, role } = isAdminExist;
    const accessToken = jsonwebtoken_1.default.sign({ _id, role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ _id, role }, config_1.default.jwt.refresh_secret, { expiresIn: config_1.default.jwt.refresh_expires_in });
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
};
