import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "../user/user.validation";
import { userAuthController } from "./userAuth.controller";
import { userAuthValidation } from "./userAuth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.UserSignUpZodSchema),
  userAuthController.signUp
);
router.post(
  "/login",
  validateRequest(userAuthValidation.loginZodSchema),
  userAuthController.loginUser
);
router.post(
  "/refresh-token",
  // validateRequest(userAuthValidation.refreshTokenZodSchema),
  userAuthController.refreshToken
);

export const auth = router;
