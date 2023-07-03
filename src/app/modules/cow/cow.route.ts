import express from "express";
import { CowController } from "./cow.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE, ENUM_USER_SPECIFIC } from "../../../enums/user";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.SELLER), CowController.createCow);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows
);
router.delete(
  "/:id",
  auth(ENUM_USER_SPECIFIC.SPECIFIC_SELLER),
  CowController.deleteSingleCow
);
router.patch(
  "/:id",
  auth(ENUM_USER_SPECIFIC.SPECIFIC_SELLER),
  CowController.updateCow
);
export const CowRoutes = router;
