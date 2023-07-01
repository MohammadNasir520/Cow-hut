"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderData = req.body;
    const createOrder = yield order_service_1.OrderServices.createOrder(OrderData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Order created successfully",
        data: createOrder,
    });
}));
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllOrders = yield order_service_1.OrderServices.getAllOrders();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: getAllOrders,
    });
});
exports.OrderController = {
    createOrder,
    getAllOrders,
};
