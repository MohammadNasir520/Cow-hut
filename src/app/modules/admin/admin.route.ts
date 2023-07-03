import express from "express";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
