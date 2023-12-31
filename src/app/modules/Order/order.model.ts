import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import { ObjectId } from "mongodb";

const OrderSchema = new Schema(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: "Cow",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
