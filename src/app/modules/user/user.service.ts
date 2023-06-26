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

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
};
