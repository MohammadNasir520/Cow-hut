import { z } from "zod";

const CowSignUpZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "phone number is required" }),
    role: z.enum(["seller", "buyer"], {
      required_error: "role is required and must be seller or buyer",
    }),
    password: z.string({ required_error: "password is required" }),
    name: z.object({
      firstName: z.string({ required_error: "First Name is required" }),
      lastName: z.string({ required_error: "Last Name is required" }),
    }),
    address: z.string({ required_error: "address is required" }),
    budget: z.number({ required_error: "budget is required" }),
    income: z.number({ required_error: "income is required" }),
  }),
});

export const CowValidation = {
  CowSignUpZodSchema,
};
