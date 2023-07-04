"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleValidationError = void 0;
const HandleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "mongoose validation error",
        errorMessage: errors,
    };
};
exports.HandleValidationError = HandleValidationError;
