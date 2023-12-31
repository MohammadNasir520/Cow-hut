"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalerrorHandlar_1 = require("./app/middlewares/globalerrorHandlar");
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
/// use router
// app.ts --> index.ts-->user.route.ts
app.use("/api/v1/", routes_1.default);
app.use(globalerrorHandlar_1.globalErrorHandler);
app.get("/", (req, res) => {
    res.send("cow hut server is running");
});
// handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "not found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "route not found",
            },
        ],
    });
    next();
});
exports.default = app;
