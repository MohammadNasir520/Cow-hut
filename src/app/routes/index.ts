import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CowRoutes } from "../modules/cow/cow.route";

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
];

moduleRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route)
);

export default router;
