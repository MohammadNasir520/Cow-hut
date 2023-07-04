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
exports.globalErrorHandler = void 0;
const HandleValidationError_1 = require("../../errors/HandleValidationError");
const handleCastError_1 = require("../../errors/handleCastError");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodError_1 = require("../../errors/handleZodError");
const globalErrorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let message = "something went wrong";
    let statusCode = 500;
    let errorMessage = [];
    if (error.name === "ValidationError") {
        const simplifiedError = (0, HandleValidationError_1.HandleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(400).json({
        message,
        statusCode,
        errorMessage,
        stack: error === null || error === void 0 ? void 0 : error.stack,
    });
    next();
});
exports.globalErrorHandler = globalErrorHandler;
