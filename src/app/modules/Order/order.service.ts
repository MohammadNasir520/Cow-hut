import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cow/cow.models";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose, { startSession } from "mongoose";

// : Promise<IOrder>
const createOrder = async (OrderData: IOrder) => {
  const buyerId = OrderData.buyer;
  const buyer = await User.findById(buyerId);
  const buyerBudget = buyer?.budget as number;

  if (!buyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Buyer`);
  }

  const cowId = OrderData.cow;
  const cow = await Cow.findById(cowId);
  const cowPrice = cow?.price as number;

  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `cow is not available`);
  }

  const budgetDeficit = cowPrice - buyerBudget;

  if (buyerBudget < cowPrice) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `You have not enough money. You need more ${budgetDeficit} taka`
    );
  }
  if (cow?.label === "sold out") {
    throw new ApiError(httpStatus.BAD_REQUEST, `this cow has already sold out`);
  }

  const newBudget = buyerBudget - cowPrice;

  const sellerId = cow?.seller;
  const seller = await User.findById(sellerId);
  const sellerIncome = seller?.income as number;

  const sellersNewIncome = sellerIncome + cowPrice;

  let OrderAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateCowLabel = await Cow.findOneAndUpdate(
      { _id: cowId },
      { label: "sold out" },
      { new: true, session }
    );
    const updateBuyersBudget = await User.findOneAndUpdate(
      { _id: buyerId },
      { budget: newBudget },
      { new: true, session }
    );
    console.log(updateBuyersBudget);

    const updateSellersIncome = await User.findOneAndUpdate(
      { _id: sellerId },
      { income: sellersNewIncome },
      { new: true, session }
    );

    const createOrder = await Order.create([OrderData], { session });

    if (!createOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, "failed to create order");
    }
    OrderAllData = createOrder[0];
    await session.commitTransaction();
    await session.endSession();
    console.log(updateCowLabel?.label, updateBuyersBudget?.budget);
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (OrderAllData) {
    OrderAllData = await Order.findOne({ _id: OrderAllData._id })
      .populate("cow")
      .populate("buyer");
  }
  return OrderAllData;
};

const getAllOrders = async () => {
  const getAllOrders = await Order.find().populate("cow").populate("buyer");
  return getAllOrders;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
