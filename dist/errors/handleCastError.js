"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "in valid _id. please check again",
        errorMessage: errors,
    };
};
exports.handleCastError = handleCastError;
