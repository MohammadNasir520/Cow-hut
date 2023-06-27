import { z } from "zod";

const UserSignUpZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "phone number is required" }),
    role: z.string({ required_error: "role is required" }),
  }),
});

export const userValidation = {
  UserSignUpZodSchema,
};
