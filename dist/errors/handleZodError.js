"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    const errors = error.issues.map((el) => {
        return {
            path: el.path[el.path.length - 1],
            message: el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "validation error",
        errorMessage: errors,
    };
};
exports.handleZodError = handleZodError;
