import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUser = async (userData: IUser): Promise<IUser> => {
  const createUser = await User.create(userData);
  return createUser;
};

export const UserAuthService = {
  createUser,
};
