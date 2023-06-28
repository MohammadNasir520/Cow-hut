import { ICow } from "./cow.interface";
import { Schema, model, connect } from "mongoose";
const CowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,

    enum: [
      "Dhaka",
      "Chattogram",
      "Barishal",
      "Rajshahi",
      "Sylhet",
      "Comilla",
      "Rangpur",
      "Mymensingh",
    ],
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },

  weight: {
    type: Number,
    required: true,
  },
  lebel: {
    type: String,
    enum: ["for sale", "sold out"],
  },
  category: {
    type: String,
    enum: ["Dairy", "Beef", "Seller"],
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Cow = model<ICow>("Cow", CowSchema);
