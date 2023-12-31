import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getMyProfile
);
router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateMyProfile
);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);

export const UserRoutes = router;
