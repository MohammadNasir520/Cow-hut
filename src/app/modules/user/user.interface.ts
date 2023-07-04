import { Model, Types } from "mongoose";

export type IUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "_id" | "role">>;
} & Model<IUser>;
