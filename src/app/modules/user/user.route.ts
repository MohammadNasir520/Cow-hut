import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(userValidation.UserSignUpZodSchema),
  UserController.signUp
);
router.get("/:id", UserController.getSingleUser);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteSingleUser);

export const UserRoutes = router;
