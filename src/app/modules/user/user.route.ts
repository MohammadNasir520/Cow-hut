import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/:id", UserController.getSingleUser);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteSingleUser);

export const UserRoutes = router;
