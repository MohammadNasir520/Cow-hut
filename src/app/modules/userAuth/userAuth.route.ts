import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "../user/user.validation";
import { userAuthController } from "./userAuth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.UserSignUpZodSchema),
  userAuthController.signUp
);

export const auth = router;
