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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUsers = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "users retrieved successfully",
        data: getAllUsers,
    });
});
const getSingleUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getAllUsers = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user retrieved successfully",
        data: getAllUsers,
    });
}));
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedDAta = req.body;
    const updatedUser = yield user_service_1.UserService.updateUser(id, updatedDAta);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user updated successfully",
        data: updatedUser,
    });
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteSingleUser = yield user_service_1.UserService.deleteSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user deleted successfully",
        data: deleteSingleUser,
    });
});
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.getProfile(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "your profile successfully",
        data: result,
    });
});
const updateMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const updatedDAta = req.body;
    const result = yield user_service_1.UserService.updateMyProfile(id, updatedDAta);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user updated successfully",
        data: result,
    });
});
exports.UserController = {
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    getMyProfile,
    updateMyProfile,
};
