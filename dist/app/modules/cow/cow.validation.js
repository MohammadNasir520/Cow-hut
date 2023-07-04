"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const CowSignUpZodSchema = zod_1.z.object({
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
        budget: zod_1.z.number({ required_error: "budget is required" }),
        income: zod_1.z.number({ required_error: "income is required" }),
    }),
});
exports.CowValidation = {
    CowSignUpZodSchema,
};
