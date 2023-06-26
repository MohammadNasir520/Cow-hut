import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["seller", "buyer"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
