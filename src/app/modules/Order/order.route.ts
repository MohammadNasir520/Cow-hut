import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE, ENUM_USER_SPECIFIC } from "../../../enums/user";
import authOrderSpecific from "../../middlewares/authOrderSpecific";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getAllOrders
);
router.get(
  "/:id",
  // auth(ENUM_USER_ROLE.ADMIN),
  authOrderSpecific(
    ENUM_USER_SPECIFIC.SPECIFIC_BUYER,
    ENUM_USER_SPECIFIC.SPECIFIC_SELLER,
    ENUM_USER_ROLE.ADMIN
  ),
  OrderController.getSpecificOrder
);

export const OrderRoutes = router;
