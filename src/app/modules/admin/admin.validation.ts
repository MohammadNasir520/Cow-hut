import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "phone number is required" }),
    role: z.enum(["admin"], {
      required_error: "role is required and must admin",
    }),
    password: z.string({ required_error: "password is required" }),
    name: z.object({
      firstName: z.string({ required_error: "First Name is required" }),
      lastName: z.string({ required_error: "Last Name is required" }),
    }),
    address: z.string({ required_error: "address is required" }),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "phone number is required" }),

    password: z.string({ required_error: "password is required" }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  loginZodSchema,
};
