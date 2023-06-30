import { NextFunction, Request, RequestHandler, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./Order.service";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const OrderData = req.body;

    const createOrder = await OrderService.createOrder(OrderData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order created successfully",
      data: createOrder,
    });
  }
);

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getAllOrders = await OrderService.getAllOrders();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
    data: getAllOrders,
  });
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
