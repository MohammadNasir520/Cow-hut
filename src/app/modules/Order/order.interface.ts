import { IUser } from "../user/user.interface";
import { ICow } from "../cow/cow.interface";
import { Model, Types } from "mongoose";

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};
