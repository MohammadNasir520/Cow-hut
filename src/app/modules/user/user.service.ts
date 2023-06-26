import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser) => {
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

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
