import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cow/cow.models";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";

import { ICow } from "../cow/cow.interface";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (OrderAllData) {
    OrderAllData = await Order.findOne({ _id: OrderAllData._id })

      .populate("buyer")
      .populate({
        path: "cow",
        populate: [
          {
            path: "seller",
          },
        ],
      });
  }
  return OrderAllData;
};

const getAllOrders = async (user: JwtPayload) => {
  const id = user._id;

  console.log(id);
  let findCondition = {};

  if (user.role === "buyer") {
    findCondition = { buyer: id };
  }

  if (user.role === "seller") {
    console.log("seller");
    const findAllOrders = await Order.find()
      .populate("buyer")
      .populate({
        path: "cow",
        populate: [
          {
            path: "seller",
          },
        ],
      });

    const loggedInSellersOrders = findAllOrders.filter(
      (order) => (order.cow as ICow).seller._id.toString() === id
    );

    return loggedInSellersOrders;
  }

  const getAllOrdersData = await Order.find(findCondition)
    .populate({
      path: "buyer",
    })
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    });

  return getAllOrdersData;
};

const getSpecificOrder = async (user: JwtPayload, id: string) => {
  const userId = user._id;

  console.log(id);
  let findCondition = {};

  if (user.role === "buyer") {
    findCondition = { buyer: userId, _id: new ObjectId(id) };
  }

  if (user.role === "seller") {
    console.log("seller");
    const findAllOrders = await Order.find()
      .populate("buyer")
      .populate({
        path: "cow",
        populate: [
          {
            path: "seller",
          },
        ],
      });

    const loggedInSellersOrders = findAllOrders.filter(
      (order) => (order.cow as ICow).seller._id.toString() === userId
    );

    return loggedInSellersOrders;
  }

  const getAllOrdersData = await Order.find(findCondition)
    .populate({
      path: "buyer",
    })
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    });

  return getAllOrdersData;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSpecificOrder,
};
