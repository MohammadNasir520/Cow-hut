import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (OrderData: IOrder): Promise<IOrder> => {
  const createOrder = (
    await (await Order.create(OrderData)).populate("cow")
  ).populate("buyer");
  return createOrder;
};

const getAllOrders = async () => {
  const getAllOrders = await Order.find();
  return getAllOrders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
