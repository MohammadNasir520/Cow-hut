"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("../user/user.validation");
const userAuth_controller_1 = require("./userAuth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.validateRequest)(user_validation_1.userValidation.UserSignUpZodSchema), userAuth_controller_1.userAuthController.signUp);
exports.auth = router;
