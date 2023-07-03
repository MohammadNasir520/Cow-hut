import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CowRoutes } from "../modules/cow/cow.route";

import { OrderRoutes } from "../modules/Order/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { UserAuth } from "../modules/userAuth/userAuth.route";

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
    route: UserAuth,
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
