import { NextFunction, Request, RequestHandler, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./order.service";
import { JwtPayload } from "jsonwebtoken";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const OrderData = req.body;

    const createOrder = await OrderServices.createOrder(OrderData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order created successfully",
      data: createOrder,
    });
  }
);

const getAllOrders = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const getAllOrders = await OrderServices.getAllOrders(user);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
    data: getAllOrders,
  });
};

const getSpecificOrder = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const id = req.params.id;
  const result = await OrderServices.getSpecificOrder(user, id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getSpecificOrder,
};
