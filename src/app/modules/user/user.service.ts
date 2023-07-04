import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createUser = async (userData: IUser): Promise<IUser> => {
  const createUser = await User.create(userData);
  return createUser;
};

const getAllUsers = async () => {
  const getAllUsers = await User.find({});
  return getAllUsers;
};
const getSingleUser = async (id: string) => {
  const getAllUsers = await User.findById(id);
  return getAllUsers;
};
const deleteSingleUser = async (id: string) => {
  const deleteSingleUser = await User.findByIdAndDelete(id);
  return deleteSingleUser;
};
const updateUser = async (id: string, payload: Partial<IUser>) => {
  const { name, ...userData } = payload;

  const userUpdatedData = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (userUpdatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: id,
    },
    userUpdatedData,
    { new: true }
  );
  return updatedUser;
};

const getProfile = async (user: JwtPayload) => {
  const id = user._id;
  const role = user.role;

  const findUer = await User.findOne({ _id: id });

  return findUer;
};

const updateMyProfile = async (id: string, payload: Partial<IUser>) => {
  const { name, ...userData } = payload;

  const userUpdatedData = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (userUpdatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: id,
    },
    userUpdatedData,
    { new: true }
  );
  return updatedUser;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  getProfile,
  updateMyProfile,
};
