import express from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { CowController } from "./cow.controller";
import { CowValidation } from "./cow.validation";

const router = express.Router();

router.post(
  "/",
  // validateRequest(CowValidation.CowSignUpZodSchema),
  CowController.createCow
);
router.get("/:id", CowController.getSingleCow);
router.get("/", CowController.getAllCows);
router.delete("/:id", CowController.deleteSingleCow);
router.patch("/:id", CowController.updateCow);
export const CowRoutes = router;
