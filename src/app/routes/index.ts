import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CowRoutes } from "../modules/cow/cow.route";
import { auth } from "../modules/userAuth/userAuth.route";
import { OrderRoutes } from "../modules/Order/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";

// app.ts --> index.ts-->user.route.ts

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/auth",
    route: auth,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route)
);

export default router;
