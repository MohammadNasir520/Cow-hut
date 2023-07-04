"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const UserSignUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: "phone number is required" }),
        role: zod_1.z.enum(["seller", "buyer"], {
            required_error: "role is required and must be seller or buyer",
        }),
        password: zod_1.z.string({ required_error: "password is required" }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: "First Name is required" }),
            lastName: zod_1.z.string({ required_error: "Last Name is required" }),
        }),
        address: zod_1.z.string({ required_error: "address is required" }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.userValidation = {
    UserSignUpZodSchema,
};
