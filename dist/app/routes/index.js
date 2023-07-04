"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const cow_route_1 = require("../modules/cow/cow.route");
const order_route_1 = require("../modules/Order/order.route");
const admin_route_1 = require("../modules/admin/admin.route");
const userAuth_route_1 = require("../modules/userAuth/userAuth.route");
// app.ts --> index.ts-->user.route.ts
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/cows",
        route: cow_route_1.CowRoutes,
    },
    {
        path: "/auth",
        route: userAuth_route_1.UserAuth,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/admins",
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
